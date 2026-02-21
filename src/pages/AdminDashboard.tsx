import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Star, CheckCircle, Clock, LogOut, Menu, X, Home, ArrowLeft, CalendarCheck } from "lucide-react";

type Profile = {
  id: string; full_name: string; gender: string; religion: string; city: string | null;
  state: string | null; profile_status: string; is_featured: boolean; created_at: string;
  email: string | null; phone: string | null; occupation: string | null;
};

type Consultation = {
  id: string; name: string; phone: string; preferred_date: string;
  preferred_time: string; status: string; created_at: string; notes: string | null;
};

const TABS = ["Profile Requests", "Featured Profiles", "All Profiles", "Consultations"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Profile Requests");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) { navigate("/admin"); return; }
    const { email } = JSON.parse(auth);
    setAdminEmail(email);
    fetchProfiles();
    fetchConsultations();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("id,full_name,gender,religion,city,state,profile_status,is_featured,created_at,email,phone,occupation").order("created_at", { ascending: false });
    if (!error && data) setProfiles(data);
    setLoading(false);
  };

  const fetchConsultations = async () => {
    const { data } = await supabase.from("consultations").select("*").order("created_at", { ascending: false });
    if (data) setConsultations(data as Consultation[]);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("profiles").update({ profile_status: status }).eq("id", id);
    if (!error) {
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, profile_status: status } : p));
      toast({ title: `Profile ${status}!` });
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    const { error } = await supabase.from("profiles").update({ is_featured: !current }).eq("id", id);
    if (!error) {
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, is_featured: !current } : p));
      toast({ title: !current ? "Added to featured!" : "Removed from featured" });
    }
  };

  const updateConsultationStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
    if (!error) {
      setConsultations(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      toast({ title: `Consultation ${status}!` });
    }
  };

  const logout = () => { sessionStorage.removeItem("admin_auth"); navigate("/admin"); };

  const pendingProfiles = profiles.filter(p => p.profile_status === "pending");
  const featuredProfiles = profiles.filter(p => p.is_featured);

  const displayProfiles = tab === "Profile Requests" ? pendingProfiles
    : tab === "Featured Profiles" ? featuredProfiles
    : profiles;

  const stats = [
    { label: "Total Profiles", value: profiles.length, icon: Users, color: "hsl(210, 80%, 55%)", bg: "hsl(210, 80%, 96%)" },
    { label: "Pending Review", value: pendingProfiles.length, icon: Clock, color: "hsl(38, 90%, 50%)", bg: "hsl(38, 90%, 96%)" },
    { label: "Active Profiles", value: profiles.filter(p => p.profile_status === "active").length, icon: CheckCircle, color: "hsl(145, 65%, 42%)", bg: "hsl(145, 65%, 95%)" },
    { label: "Consultations", value: consultations.length, icon: CalendarCheck, color: "hsl(280, 65%, 55%)", bg: "hsl(280, 65%, 96%)" },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const cfg = status === "active" ? { bg: "hsl(145, 65%, 93%)", color: "hsl(145, 65%, 32%)", label: "Active" }
      : status === "pending" ? { bg: "hsl(38, 90%, 93%)", color: "hsl(38, 90%, 35%)", label: "Pending" }
      : status === "contacted" ? { bg: "hsl(210, 80%, 93%)", color: "hsl(210, 80%, 35%)", label: "Contacted" }
      : status === "completed" ? { bg: "hsl(145, 65%, 93%)", color: "hsl(145, 65%, 32%)", label: "Completed" }
      : { bg: "hsl(0, 65%, 93%)", color: "hsl(0, 65%, 40%)", label: status.charAt(0).toUpperCase() + status.slice(1) };
    return <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "hsl(210, 20%, 97%)" }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 220 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden flex-shrink-0 hidden lg:block"
        style={{ background: "hsl(213, 32%, 22%)" }}
      >
        <div className="w-[220px] h-full flex flex-col py-6 px-4">
          <div className="flex items-center gap-2 mb-8 px-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(42, 42%, 57%)" }}>
              <span className="text-white font-serif font-bold text-sm">K</span>
            </div>
            <span className="text-white font-serif font-semibold text-sm leading-tight">Kalyanasuthra<br /><span className="text-xs font-normal opacity-60">Admin Panel</span></span>
          </div>

          <nav className="space-y-1 flex-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all" style={tab === t ? { background: "hsl(210, 80%, 55% / 0.25)", color: "hsl(210, 80%, 80%)", fontWeight: 600 } : { color: "hsl(0, 0%, 70%)" }}>
                {t}
              </button>
            ))}
          </nav>

          {/* Navigation buttons */}
          <div className="space-y-1 border-t border-white/10 pt-4 mb-2">
            <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-white/60 hover:text-white text-xs px-3 py-2 w-full transition-colors rounded-lg hover:bg-white/5">
              <ArrowLeft size={14} /> Back to Staff Login
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/60 hover:text-white text-xs px-3 py-2 w-full transition-colors rounded-lg hover:bg-white/5">
              <Home size={14} /> Back to Home
            </button>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-[10px] px-1 mb-1 truncate">{adminEmail}</p>
            <button onClick={logout} className="flex items-center gap-2 text-white/60 hover:text-white text-xs px-1 py-1 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600 hidden lg:block">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {/* Mobile nav buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => navigate("/")} className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 flex items-center gap-1">
              <Home size={12} /> Home
            </button>
            <button onClick={() => navigate("/admin")} className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 flex items-center gap-1">
              <ArrowLeft size={12} /> Login
            </button>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-serif font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-xs text-gray-400">Kalyanasuthra Matrimony Management</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">{adminEmail}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors border border-gray-200 px-3 py-1.5 rounded-lg">
              <LogOut size={13} /> Logout
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                    <s.icon size={16} style={{ color: s.color }} />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">{s.value}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 px-4 sm:px-6 pt-4 gap-2 sm:gap-4 overflow-x-auto">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)} className="pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap" style={tab === t ? { color: "hsl(210, 80%, 50%)", borderColor: "hsl(210, 80%, 50%)" } : { color: "#aaa", borderColor: "transparent" }}>
                  {t}
                </button>
              ))}
            </div>

            <div className="p-4">
              {tab === "Consultations" ? (
                /* Consultations Tab */
                loading ? (
                  <div className="text-center py-10 text-gray-400 text-sm">Loading...</div>
                ) : consultations.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm">No consultations yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-gray-400 uppercase tracking-wider">
                          <th className="text-left py-2 px-3 font-semibold">Name</th>
                          <th className="text-left py-2 px-3 font-semibold">Phone</th>
                          <th className="text-left py-2 px-3 font-semibold">Date</th>
                          <th className="text-left py-2 px-3 font-semibold">Time</th>
                          <th className="text-left py-2 px-3 font-semibold">Status</th>
                          <th className="text-left py-2 px-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {consultations.map((c) => (
                          <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-3 font-semibold text-gray-800 text-sm">{c.name}</td>
                            <td className="py-3 px-3 text-gray-600 text-xs">{c.phone}</td>
                            <td className="py-3 px-3 text-gray-600 text-xs">{c.preferred_date}</td>
                            <td className="py-3 px-3 text-gray-600 text-xs">{c.preferred_time}</td>
                            <td className="py-3 px-3"><StatusBadge status={c.status} /></td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-1.5">
                                {c.status === "pending" && (
                                  <button onClick={() => updateConsultationStatus(c.id, "contacted")} className="text-[10px] px-2 py-1 rounded-md font-semibold text-white" style={{ background: "hsl(210, 80%, 50%)" }}>Mark Contacted</button>
                                )}
                                {c.status !== "completed" && (
                                  <button onClick={() => updateConsultationStatus(c.id, "completed")} className="text-[10px] px-2 py-1 rounded-md font-semibold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>Complete</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                /* Profile Tabs */
                loading ? (
                  <div className="text-center py-10 text-gray-400 text-sm">Loading profiles...</div>
                ) : displayProfiles.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm">No profiles found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-gray-400 uppercase tracking-wider">
                          <th className="text-left py-2 px-3 font-semibold">Name</th>
                          <th className="text-left py-2 px-3 font-semibold">Gender</th>
                          <th className="text-left py-2 px-3 font-semibold">Location</th>
                          <th className="text-left py-2 px-3 font-semibold">Contact</th>
                          <th className="text-left py-2 px-3 font-semibold">Status</th>
                          <th className="text-left py-2 px-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {displayProfiles.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-3">
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">{p.full_name}</p>
                                <p className="text-xs text-gray-400">{p.occupation || p.religion}</p>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-gray-600 text-xs">{p.gender}</td>
                            <td className="py-3 px-3 text-gray-600 text-xs">{[p.city, p.state].filter(Boolean).join(", ") || "—"}</td>
                            <td className="py-3 px-3 text-gray-600 text-xs">
                              <div>{p.email || "—"}</div>
                              <div>{p.phone || "—"}</div>
                            </td>
                            <td className="py-3 px-3"><StatusBadge status={p.profile_status} /></td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {p.profile_status !== "active" && (
                                  <button onClick={() => updateStatus(p.id, "active")} className="text-[10px] px-2 py-1 rounded-md font-semibold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>Approve</button>
                                )}
                                {p.profile_status !== "rejected" && (
                                  <button onClick={() => updateStatus(p.id, "rejected")} className="text-[10px] px-2 py-1 rounded-md font-semibold text-white" style={{ background: "hsl(0, 65%, 50%)" }}>Reject</button>
                                )}
                                <button onClick={() => toggleFeatured(p.id, p.is_featured)} className="text-[10px] px-2 py-1 rounded-md font-semibold" style={p.is_featured ? { background: "hsl(280, 65%, 93%)", color: "hsl(280, 65%, 40%)" } : { background: "hsl(38, 90%, 93%)", color: "hsl(38, 90%, 35%)" }}>
                                  {p.is_featured ? "★ Featured" : "☆ Feature"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
