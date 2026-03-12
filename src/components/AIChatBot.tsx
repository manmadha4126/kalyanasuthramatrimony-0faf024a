import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Something went wrong. Please try again.");
    return;
  }

  if (!resp.body) { onError("No response"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

const quickQuestions = [
  "What services do you offer?",
  "How to register?",
  "Pricing & plans",
  "Contact details",
];

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (msg) => {
          setMessages(prev => [...prev, { role: "assistant", content: `⚠️ ${msg}` }]);
          setIsLoading(false);
        },
      });
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Please try again." }]);
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
            style={{
              background: "linear-gradient(135deg, hsl(280, 60%, 45%), hsl(320, 70%, 50%))",
              border: "2px solid hsl(40, 70%, 65%)",
            }}
            aria-label="Open AI Chat"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              height: "500px",
              border: "1px solid hsl(280, 30%, 30%)",
              background: "hsl(280, 25%, 8%)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                background: "linear-gradient(135deg, hsl(280, 60%, 30%), hsl(320, 60%, 35%))",
                borderBottom: "1px solid hsl(280, 40%, 40%)",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "hsl(280, 50%, 50% / 0.3)", border: "1.5px solid hsl(40, 70%, 65%)" }}
              >
                <Bot className="w-5 h-5" style={{ color: "hsl(40, 70%, 65%)" }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "hsl(0, 0%, 95%)" }}>Kalyanasuthra AI</p>
                <p className="text-[10px]" style={{ color: "hsl(280, 40%, 75%)" }}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "hsl(140, 70%, 50%)" }} />
                  Online • Ask me anything
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:scale-110 transition-transform" aria-label="Close chat">
                <X className="w-5 h-5" style={{ color: "hsl(0, 0%, 70%)" }} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollBehavior: "smooth" }}>
              {messages.length === 0 && (
                <div className="text-center space-y-4 pt-4">
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, hsl(280, 60%, 45%), hsl(320, 70%, 50%))",
                      boxShadow: "0 0 30px hsl(280, 60%, 45% / 0.3)",
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "hsl(0, 0%, 90%)" }}>
                      Welcome to Kalyanasuthra AI! ✨
                    </p>
                    <p className="text-xs mt-1" style={{ color: "hsl(0, 0%, 60%)" }}>
                      How can I help you find your perfect match?
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-[11px] px-3 py-2 rounded-lg text-left transition-all hover:scale-[1.02]"
                        style={{
                          background: "hsl(280, 30%, 18%)",
                          color: "hsl(280, 40%, 80%)",
                          border: "1px solid hsl(280, 30%, 28%)",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, hsl(280, 60%, 45%), hsl(320, 60%, 45%))",
                            color: "white",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            background: "hsl(280, 25%, 15%)",
                            color: "hsl(0, 0%, 88%)",
                            border: "1px solid hsl(280, 25%, 22%)",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-xs [&_strong]:text-purple-300">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl" style={{ background: "hsl(280, 25%, 15%)" }}>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ background: "hsl(280, 50%, 60%)" }}
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 shrink-0" style={{ borderTop: "1px solid hsl(280, 25%, 18%)", background: "hsl(280, 25%, 10%)" }}>
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-sm px-4 py-2.5 rounded-xl outline-none"
                  style={{
                    background: "hsl(280, 25%, 15%)",
                    color: "hsl(0, 0%, 90%)",
                    border: "1px solid hsl(280, 25%, 25%)",
                  }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40"
                  style={{
                    background: "linear-gradient(135deg, hsl(280, 60%, 45%), hsl(320, 60%, 45%))",
                  }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
