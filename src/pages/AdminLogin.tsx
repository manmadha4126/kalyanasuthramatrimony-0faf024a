import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Shield } from "lucide-react";
import BackButton from "@/components/BackButton";

const ADMIN_EMAILS = [
  "menda.manmadha21@gmail.com",
  "drakshayani@gmail.com",
  "kalyanasuthra@gmail.com",
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
      // Check if admin email
      if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
        setError("Access denied. Not an authorized admin email.");
        setLoading(false);
        return;
      }

      // Try to sign in with Supabase - if account doesn't exist, create it
      let { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (signInError) {
        // If invalid credentials, try signing up (first-time admin)
        if (signInError.message.includes("Invalid login credentials")) {
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: "Admin", role: "admin" } }
          });
          if (signUpError) throw signUpError;
          // After auto-confirm, sign in
          const { error: retryError } = await supabase.auth.signInWithPassword({ email, password });
          if (retryError) throw retryError;
        } else {
          throw signInError;
        }
      }

      sessionStorage.setItem("admin_auth", JSON.stringify({ email, loggedIn: true }));
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, hsl(348, 56%, 12%) 0%, hsl(348, 50%, 18%) 40%, hsl(340, 45%, 15%) 100%)" }}>
      {/* Left Panel */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:flex flex-col items-start justify-center w-1/2 px-16 py-12 relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(42, 42%, 57%)" }}>
              <span className="font-serif text-xl font-bold text-white">K</span>
            </div>
            <span className="font-serif text-xl text-white font-semibold">Kalyanasuthra Matrimony</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Welcome to the<br /><span style={{ color: "hsl(42, 42%, 70%)" }}>Admin Portal</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm mb-10">Manage profiles, success stories, service requests, and platform activity from your secure administrative dashboard.</p>
          <div className="space-y-4">
            {[
              { icon: "👥", label: "Profile Management", desc: "Review and activate submitted profiles" },
              { icon: "💍", label: "Success Stories", desc: "Curate and publish couple testimonials" },
              { icon: "📋", label: "Service Requests", desc: "Handle consultation and callback requests" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "hsl(0, 0%, 100% / 0.07)", border: "1px solid hsl(0, 0%, 100% / 0.1)" }}>
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-sm">
          <div className="mb-4">
            <BackButton to="/" label="Back to Home" className="text-white/60 hover:text-white" />
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--burgundy-light))" }}>
                <Shield size={16} style={{ color: "hsl(var(--burgundy))" }} />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold" style={{ color: "hsl(var(--burgundy))" }}>Admin Access</h2>
                <p className="text-xs text-gray-400">Authorized personnel only</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</motion.div>
              )}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: "hsl(var(--burgundy))" }}>
                {loading ? "Verifying..." : "Sign In to Dashboard"}
              </button>
            </form>
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <a href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">← Back to Website</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
