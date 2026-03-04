import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Shield, Heart, Users, Star, Gem, Sparkles, Crown } from "lucide-react";
import logo from "@/assets/kalyanasuthra-logo.png";

const ADMIN_CREDENTIALS = [
  { email: "menda.manmadha21@gmail.com", password: "0*MAha21" },
  { email: "drakshayani@gmail.com", password: "admin@987" },
  { email: "kalyanasuthra@gmail.com", password: "admin@123" },
];

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const adminCred = ADMIN_CREDENTIALS.find(
        c => c.email === email.toLowerCase() && c.password === password
      );
      if (!adminCred) {
        setError("Invalid email or password. Access denied.");
        setLoading(false);
        return;
      }
      let { error: signInError } = await supabase.auth.signInWithPassword({ email: adminCred.email, password: adminCred.password });
      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          const { error: signUpError } = await supabase.auth.signUp({
            email: adminCred.email,
            password: adminCred.password,
            options: { data: { full_name: "Admin", role: "admin" } }
          });
          if (signUpError && !signUpError.message.includes("already registered")) throw signUpError;
          const { error: retryError } = await supabase.auth.signInWithPassword({ email: adminCred.email, password: adminCred.password });
          if (retryError) throw retryError;
        } else {
          throw signInError;
        }
      }
      sessionStorage.setItem("admin_auth", JSON.stringify({ email: adminCred.email, loggedIn: true }));
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    { icon: "🏛️", label: "15,000+ Profiles", desc: "Verified Telugu, Tamil & Kannada brides and grooms" },
    { icon: "💍", label: "3,500+ Weddings", desc: "Successfully matched since 2018" },
    { icon: "👨‍👩‍👧‍👦", label: "Family-First Approach", desc: "Traditional values meet modern matchmaking" },
    { icon: "🌟", label: "Dedicated Managers", desc: "Personal relationship managers for premium clients" },
    { icon: "📋", label: "Profile Management", desc: "Review and activate submitted profiles" },
    { icon: "🎯", label: "Smart Matching", desc: "Horoscope, caste & preference-based matching" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(155deg, hsl(205, 60%, 18%) 0%, hsl(210, 55%, 25%) 30%, hsl(200, 50%, 30%) 60%, hsl(215, 65%, 20%) 100%)" }}>
      {/* Left Panel */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:flex flex-col items-start justify-center w-1/2 px-14 py-10 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, hsl(200,70%,55% / 0.12), transparent 70%)" }} />
        <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(42,50%,60% / 0.1), transparent 70%)" }} />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, hsl(190,60%,50% / 0.08), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(200,80%,70%) 1px, transparent 0)", backgroundSize: "45px 45px" }} />
        {/* Diagonal lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 80px, hsl(200,80%,70%) 80px, hsl(200,80%,70%) 81px)" }} />
        {/* Floating shapes */}
        <div className="absolute top-20 right-32 w-3 h-3 rounded-full animate-pulse" style={{ background: "hsl(42,50%,65%)", opacity: 0.3 }} />
        <div className="absolute bottom-32 right-20 w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(200,70%,60%)", opacity: 0.25, animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-16 w-4 h-4 rounded-full animate-pulse" style={{ background: "hsl(42,50%,65%)", opacity: 0.2, animationDelay: "2s" }} />

        <div className="relative z-10 w-full">
          {/* Logo - Double size */}
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-40 w-auto object-contain" />
          </div>

          {/* Welcome message - attractive with different colors */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-3">
              <Crown size={22} style={{ color: "hsl(42, 50%, 65%)" }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "hsl(42, 50%, 70%)", fontFamily: "'Noto Sans', sans-serif" }}>Administration</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", lineHeight: "1.1" }} className="font-bold mb-3">
              <span style={{ color: "hsl(200, 80%, 85%)" }}>Welcome to</span><br />
              <span style={{ background: "linear-gradient(135deg, hsl(42, 60%, 70%), hsl(35, 70%, 80%), hsl(42, 50%, 65%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "3.8rem" }}>Admin Portal</span>
            </h1>
            <p className="text-base leading-relaxed max-w-md mb-10" style={{ color: "hsl(200, 40%, 75%)", fontFamily: "'Noto Sans', sans-serif" }}>
              Managing South India's most trusted matrimonial platform. Every match we make writes a new chapter of love.
            </p>
          </motion.div>

          {/* Highlights Grid - Larger */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "hsl(200, 50%, 90% / 0.08)", border: "1px solid hsl(200, 60%, 70% / 0.12)", backdropFilter: "blur(10px)" }}
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "'Noto Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-sm mt-1 leading-snug" style={{ color: "hsl(200, 30%, 65%)" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom quote */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 flex items-center gap-3">
            <Heart size={16} style={{ color: "hsl(42, 50%, 65%)" }} className="fill-current" />
            <span className="text-sm" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "hsl(200, 40%, 70%)" }}>
              "Where tradition meets technology in every match"
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 py-12 relative">
        {/* Background decorations for right panel */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(200,70%,60%), transparent 70%)" }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, hsl(42,50%,60%), transparent 70%)" }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-sm relative z-10">
          {/* Buttons row */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-lg"
              style={{ background: "white", color: "hsl(210, 55%, 25%)" }}
            >
              ← Back to Home
            </button>
            <a
              href="/"
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-lg"
              style={{ background: "hsl(215, 60%, 12%)", color: "white", border: "1px solid hsl(200, 50%, 30%)" }}
            >
              ← Back to Website
            </a>
          </div>

          {/* Mobile logo */}
          <div className="flex items-center justify-center mb-6 lg:hidden">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-28 w-auto object-contain" />
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8" style={{ boxShadow: "0 20px 60px hsl(210, 60%, 10% / 0.3)" }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(205, 60%, 88%), hsl(200, 50%, 92%))" }}>
                <Shield size={18} style={{ color: "hsl(210, 55%, 30%)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "hsl(210, 55%, 22%)", fontFamily: "'Noto Sans', sans-serif" }}>Admin Access</h2>
                <p className="text-xs" style={{ color: "hsl(210, 10%, 55%)", fontFamily: "'Noto Sans', sans-serif" }}>Authorized personnel only</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(210, 15%, 40%)", fontFamily: "'Noto Sans', sans-serif" }}>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" required className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "hsl(210, 20%, 88%)", fontFamily: "'Noto Sans', sans-serif" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(210, 15%, 40%)", fontFamily: "'Noto Sans', sans-serif" }}>Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 pr-10 transition-all" style={{ borderColor: "hsl(210, 20%, 88%)" }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(210, 10%, 60%)" }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</motion.div>
              )}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-bold text-sm text-white transition-all disabled:opacity-60 hover:scale-[1.01]" style={{ background: "linear-gradient(135deg, hsl(205, 55%, 28%), hsl(210, 50%, 35%), hsl(200, 55%, 32%))", fontFamily: "'Noto Sans', sans-serif" }}>
                {loading ? "Verifying..." : "Sign In to Dashboard"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
