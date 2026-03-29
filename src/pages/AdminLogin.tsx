import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Shield, Heart, Users, Star, Gem, ArrowLeft } from "lucide-react";
import logo from "@/assets/kalyanasuthra-logo.png";
import { loginSchema, sanitizeInput, checkRateLimit } from "@/lib/security";

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

    if (!checkRateLimit("admin_login", 5, 300000)) {
      setError("Too many login attempts. Please wait 5 minutes.");
      return;
    }

    const validation = loginSchema.safeParse({ identifier: email, password });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || "Invalid input");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // Check if admin
      const adminCred = ADMIN_CREDENTIALS.find(
        (c) => c.email === email.toLowerCase() && c.password === password
      );

      if (adminCred) {
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
        return;
      }

      // Staff must sign in first because staff_members is only readable by authenticated users
      const { data: staffSignInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (!signInError) {
        const { data: staffData, error: staffError } = await supabase
          .from("staff_members" as any)
          .select("email, is_active")
          .eq("email", email.toLowerCase())
          .eq("is_active", true)
          .limit(1);

        if (!staffError && staffData && (staffData as any[]).length > 0) {
          sessionStorage.setItem("staff_auth", JSON.stringify({ email: email.toLowerCase(), loggedIn: true }));
          navigate("/staff/dashboard");
          return;
        }

        await supabase.auth.signOut();
        setError("Access denied. This account is not an active staff account.");
        setLoading(false);
        return;
      }

      if (signInError.message.includes("Invalid login credentials")) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      setError("Invalid email or password. Access denied.");
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
    <div className="min-h-screen flex" style={{ background: "linear-gradient(160deg, hsl(270, 60%, 45%) 0%, hsl(280, 55%, 35%) 40%, hsl(260, 50%, 28%) 100%)" }}>
      {/* Left Panel - Desktop only */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:flex flex-col items-start justify-center w-1/2 px-14 py-10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, hsl(280,60%,60% / 0.15), transparent 70%)" }} />
        <div className="absolute bottom-16 left-0 w-56 h-56 rounded-full" style={{ background: "radial-gradient(circle, hsl(42,70%,55% / 0.12), transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, hsl(200,60%,50% / 0.08), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(42,60%,70%) 1px, transparent 0)", backgroundSize: "36px 36px" }} />

        <div className="relative z-10 w-full">
          <div className="flex items-center gap-4 mb-10">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-20 w-auto object-contain" />
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem", color: "hsl(0, 0%, 100%)" }}>Kalyanasuthra Matrimony</span>
          </div>
          <h1 style={{ fontFamily: "'Kaushan Script', cursive", fontSize: "3.2rem", lineHeight: "1.2" }} className="mb-3">
            <span style={{ color: "hsl(0, 0%, 100%)", textShadow: "0 2px 8px hsl(180, 50%, 25% / 0.4)" }}>Welcome to the</span><br />
            <span style={{ color: "hsl(45, 100%, 90%)", fontSize: "3.6rem", textShadow: "0 2px 12px hsl(180, 50%, 20% / 0.5)" }}>Admin Portal</span>
          </h1>
          <p className="text-base leading-relaxed max-w-md mb-10" style={{ fontFamily: "'Open Sans', sans-serif", color: "hsl(180, 10%, 98%)" }}>
            Managing South India's most trusted matrimonial platform. Every match we make writes a new chapter of love.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3.5 p-4 rounded-xl"
                style={{ background: "hsl(180, 40%, 30% / 0.35)", border: "1px solid hsl(0, 0%, 100% / 0.15)", backdropFilter: "blur(8px)" }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                 <p className="font-bold text-base" style={{ fontFamily: "'Open Sans', sans-serif", color: "hsl(0, 0%, 100%)" }}>{item.label}</p>
                  <p className="mt-1 leading-snug text-sm font-normal" style={{ fontFamily: "'Open Sans', sans-serif", color: "hsl(180, 15%, 90%)" }}>{item.desc}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden flex-col items-center w-full min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(270, 60%, 45%) 0%, hsl(280, 55%, 35%) 40%, hsl(260, 50%, 28%) 100%)" }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle, hsl(40, 80%, 60%), transparent 70%)" }} />
        <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(280, 70%, 70%), transparent 70%)" }} />
        
        <div className="relative z-10 w-full px-6 py-8 flex flex-col items-center">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-16 w-auto object-contain" />
          </motion.div>
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.4rem", color: "hsl(0, 0%, 100%)" }} className="mb-5">Kalyanasuthra Matrimony</span>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-3">
            <h1 style={{ fontFamily: "'Kaushan Script', cursive", fontSize: "2rem", lineHeight: "1.3" }}>
              <span style={{ color: "hsl(0, 0%, 100%)" }}>Welcome to the</span><br />
              <span style={{ color: "hsl(45, 100%, 88%)", fontSize: "2.3rem" }}>Admin Portal</span>
            </h1>
          </motion.div>
          <p className="text-center text-sm leading-relaxed mb-6 max-w-xs" style={{ fontFamily: "'Open Sans', sans-serif", color: "hsl(270, 20%, 90%)" }}>
            Managing South India's most trusted matrimonial platform. Every match we make writes a new chapter of love.
          </p>

          {/* Login Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full max-w-sm">
            <div className="rounded-2xl p-6 shadow-2xl" style={{ background: "hsl(0, 0%, 100% / 0.12)", backdropFilter: "blur(20px)", border: "1px solid hsl(0, 0%, 100% / 0.2)" }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(0, 0%, 100% / 0.2)" }}>
                  <Shield size={16} style={{ color: "hsl(0, 0%, 100%)" }} />
                </div>
                <div>
                  <h2 className="text-base font-bold" style={{ color: "hsl(0, 0%, 100%)", fontFamily: "'Open Sans', sans-serif" }}>Admin Access</h2>
                  <p className="text-xs" style={{ color: "hsl(270, 20%, 80%)" }}>Authorized personnel only</p>
                </div>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(270, 20%, 85%)" }}>Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" style={{ background: "hsl(0, 0%, 100% / 0.15)", border: "1px solid hsl(0, 0%, 100% / 0.2)", color: "hsl(0, 0%, 100%)" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(270, 20%, 85%)" }}>Password</label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 pr-10" style={{ background: "hsl(0, 0%, 100% / 0.15)", border: "1px solid hsl(0, 0%, 100% / 0.2)", color: "hsl(0, 0%, 100%)" }} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(270, 20%, 75%)" }}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                {error &&
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs rounded-lg px-3 py-2" style={{ background: "hsl(0, 60%, 50% / 0.3)", color: "hsl(0, 80%, 85%)", border: "1px solid hsl(0, 60%, 50% / 0.4)" }}>{error}</motion.div>
                }
                <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: "linear-gradient(135deg, hsl(270, 55%, 50%), hsl(280, 60%, 40%))" }}>
                  {loading ? "Verifying..." : "Sign In to Dashboard"}
                </button>
              </form>
              <div className="mt-5 pt-3 border-t text-center" style={{ borderColor: "hsl(0, 0%, 100% / 0.15)" }}>
                <a href="/" className="text-xs transition-colors" style={{ color: "hsl(270, 20%, 75%)" }}>← Back to Website</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop Right Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-sm">
          <div className="mb-5">
            <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 shadow-lg"
              style={{ background: "hsl(0, 0%, 100%)", color: "hsl(0, 0%, 10%)", fontFamily: "'Open Sans', sans-serif" }}>
              <ArrowLeft size={16} /> Back to Home
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(220, 45%, 92%)" }}>
                <Shield size={16} style={{ color: "hsl(220, 45%, 35%)" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "hsl(220, 45%, 25%)", fontFamily: "'Open Sans', sans-serif" }}>Admin & Staff Access</h2>
                <p className="text-xs text-gray-400">Authorized personnel only</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {error &&
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</motion.div>
              }
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
