import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Shield, Heart, Users, Star, Gem } from "lucide-react";
import BackButton from "@/components/BackButton";

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

      // Try sign in first
      let { error: signInError } = await supabase.auth.signInWithPassword({ email: adminCred.email, password: adminCred.password });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          // Auto-create admin account silently
          const { error: signUpError } = await supabase.auth.signUp({
            email: adminCred.email,
            password: adminCred.password,
            options: { data: { full_name: "Admin", role: "admin" } }
          });
          if (signUpError && !signUpError.message.includes("already registered")) throw signUpError;
          // Sign in after creation
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
    <div className="min-h-screen flex" style={{ background: "linear-gradient(145deg, hsl(220, 45%, 15%) 0%, hsl(230, 40%, 22%) 50%, hsl(215, 50%, 18%) 100%)" }}>
      {/* Left Panel - Redesigned */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:flex flex-col items-start justify-center w-1/2 px-14 py-10 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-8" style={{ background: "radial-gradient(circle, hsl(42,50%,60% / 0.12), transparent 70%)" }} />
        <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-8" style={{ background: "radial-gradient(circle, hsl(200,60%,50% / 0.1), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(42, 50%, 55%), hsl(42, 60%, 45%))" }}>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-white">K</span>
            </div>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-white font-bold block leading-tight tracking-wide">Kalyanasuthra</span>
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "hsl(42, 50%, 65%)", fontFamily: "'Lato', sans-serif" }}>MATRIMONY</span>
            </div>
          </div>

          {/* Main heading - cursive style */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", lineHeight: "1.15" }} className="font-bold text-white mb-3">
            Welcome to the<br />
            <span style={{ color: "hsl(42, 50%, 70%)", fontStyle: "italic", fontSize: "3.2rem" }}>Admin Portal</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-10" style={{ fontFamily: "'Lato', sans-serif" }}>
            Managing South India's most trusted matrimonial platform. Every match we make writes a new chapter of love.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-3">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "hsl(0, 0%, 100% / 0.06)", border: "1px solid hsl(0, 0%, 100% / 0.08)" }}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>{item.label}</p>
                  <p className="text-white/40 text-[10px] mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom quote */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 flex items-center gap-2">
            <Heart size={14} style={{ color: "hsl(42, 50%, 60%)" }} className="fill-current" />
            <span className="text-white/40 text-xs" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              "Where tradition meets technology in every match"
            </span>
          </motion.div>
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(220, 45%, 92%)" }}>
                <Shield size={16} style={{ color: "hsl(220, 45%, 35%)" }} />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold" style={{ color: "hsl(220, 45%, 25%)" }}>Admin Access</h2>
                <p className="text-xs text-gray-400">Authorized personnel only</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</motion.div>
              )}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: "linear-gradient(135deg, hsl(220, 45%, 30%), hsl(230, 40%, 38%))" }}>
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
