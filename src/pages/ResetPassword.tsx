import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      navigate("/login");
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 8) { setError("Minimum 8 characters"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(var(--cream))" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="mb-4">
          <BackButton to="/login" label="Back to Login" />
        </div>
        {done ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="font-serif font-bold text-gray-800 mb-1">Password Reset!</h2>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "hsl(var(--burgundy-light))" }}>
                <span className="text-xl">🔐</span>
              </div>
              <h2 className="font-serif text-xl font-bold" style={{ color: "hsl(var(--burgundy))" }}>Set New Password</h2>
              <p className="text-xs text-gray-400 mt-1">Create a strong password for your account</p>
            </div>
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">New Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: "hsl(var(--burgundy))" }}>
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
