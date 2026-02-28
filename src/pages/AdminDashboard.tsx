import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Star, CheckCircle, Clock, LogOut, Menu, X, Home, ArrowLeft, CalendarCheck, BookHeart, Eye, Edit3, ChevronLeft, Save, UserCheck, UserX } from "lucide-react";
import adminLogo from "@/assets/kalyanasuthra-logo.png";

type Profile = {
  id: string; full_name: string; gender: string; religion: string; city: string | null;
  state: string | null; profile_status: string; is_featured: boolean; created_at: string;
  email: string | null; phone: string | null; occupation: string | null;
  date_of_birth: string; profile_photo_url: string | null;
  caste: string | null; sub_caste: string | null; mother_tongue: string | null;
  marital_status: string; country: string; height_cm: number | null;
  education: string | null; education_detail: string | null; company_name: string | null;
  annual_income: string | null; family_status: string | null; family_type: string | null;
  father_name: string | null; father_occupation: string | null;
  mother_name: string | null; mother_occupation: string | null; siblings: string | null;
  gothra: string | null; raasi: string | null; star: string | null; dosham: string | null;
  native_place: string | null; about_me: string | null; whatsapp: string | null;
  profile_created_by: string | null; additional_photos: string[] | null;
};

type Consultation = {
  id: string; name: string; phone: string; preferred_date: string;
  preferred_time: string; status: string; created_at: string; notes: string | null;
};

type SuccessStory = {
  id: string; bride_name: string; groom_name: string; city: string;
  story: string; image_url: string | null; status: string; created_at: string;
};

const TABS = ["Profile Requests", "Featured Profiles", "All Profiles", "Consultations", "Success Stories"];

const DetailRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="flex justify-between py-2 border-b border-gray-50 last:border-0">
    <span className="text-xs font-semibold text-gray-500 w-2/5">{label}</span>
    <span className="text-xs text-gray-800 text-right w-3/5">{value || "—"}</span>
  </div>
);

const DetailSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <h4 className="text-sm font-bold mb-2 px-3 py-2 rounded-lg" style={{ background: "hsl(348, 60%, 96%)", color: "hsl(348, 50%, 35%)" }}>{title}</h4>
    <div className="px-2">{children}</div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Profile Requests");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Profile>>({});
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) { navigate("/admin"); return; }
    const { email } = JSON.parse(auth);
    setAdminEmail(email);
    // Ensure we have a valid Supabase session
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate("/admin"); return; }
      fetchProfiles();
      fetchConsultations();
      fetchSuccessStories();
    });
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (!error && data) setProfiles(data as Profile[]);
    setLoading(false);
  };

  const fetchConsultations = async () => {
    const { data } = await supabase.from("consultations").select("*").order("created_at", { ascending: false });
    if (data) setConsultations(data as Consultation[]);
  };

  const fetchSuccessStories = async () => {
    const { data } = await supabase.from("success_stories").select("*").order("created_at", { ascending: false });
    if (data) setSuccessStories(data as SuccessStory[]);
  };

  const updateStoryStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("success_stories").update({ status }).eq("id", id);
    if (!error) {
      setSuccessStories(prev => prev.map(s => s.id === id ? { ...s, status } : s));
      toast({ title: `Story ${status}!` });
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("profiles").update({ profile_status: status }).eq("id", id);
    if (!error) {
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, profile_status: status } : p));
      if (selectedProfile?.id === id) setSelectedProfile(prev => prev ? { ...prev, profile_status: status } : null);
      toast({ title: `Profile ${status === "active" ? "verified" : status}!` });
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

  const openProfile = (p: Profile) => {
    setSelectedProfile(p);
    setEditMode(false);
    setEditForm({});
  };

  const startEdit = () => {
    if (!selectedProfile) return;
    setEditForm({ ...selectedProfile });
    setEditMode(true);
  };

  const saveEdit = async () => {
    if (!selectedProfile) return;
    setSavingEdit(true);
    const { id, created_at, ...updateData } = editForm as any;
    const { error } = await supabase.from("profiles").update(updateData).eq("id", selectedProfile.id);
    if (!error) {
      const updated = { ...selectedProfile, ...updateData };
      setSelectedProfile(updated);
      setProfiles(prev => prev.map(p => p.id === selectedProfile.id ? updated : p));
      setEditMode(false);
      toast({ title: "Profile updated successfully!" });
    } else {
      toast({ title: "Error updating profile", description: error.message, variant: "destructive" });
    }
    setSavingEdit(false);
  };

  const setEditField = (field: string, value: any) => setEditForm(prev => ({ ...prev, [field]: value }));

  const logout = async () => { sessionStorage.removeItem("admin_auth"); await supabase.auth.signOut(); navigate("/admin"); };

  const pendingProfiles = profiles.filter(p => p.profile_status === "pending");
  const featuredProfiles = profiles.filter(p => p.is_featured);
  const getAge = (dob: string) => {
    if (!dob) return "—";
    return Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  };

  const activeProfiles = profiles.filter(p => p.profile_status === "active");
  const displayProfiles = tab === "Profile Requests" ? pendingProfiles
    : tab === "Featured Profiles" ? featuredProfiles
    : activeProfiles;

  const stats = [
    { label: "Total Profiles", value: profiles.length, icon: Users, color: "hsl(210, 80%, 55%)", bg: "hsl(210, 80%, 96%)" },
    { label: "Pending Review", value: pendingProfiles.length, icon: Clock, color: "hsl(38, 90%, 50%)", bg: "hsl(38, 90%, 96%)" },
    { label: "Active Profiles", value: profiles.filter(p => p.profile_status === "active").length, icon: CheckCircle, color: "hsl(145, 65%, 42%)", bg: "hsl(145, 65%, 95%)" },
    { label: "Consultations", value: consultations.length, icon: CalendarCheck, color: "hsl(280, 65%, 55%)", bg: "hsl(280, 65%, 96%)" },
    { label: "Success Stories", value: successStories.length, icon: BookHeart, color: "hsl(340, 65%, 50%)", bg: "hsl(340, 65%, 96%)" },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const cfg = status === "active" ? { bg: "hsl(145, 65%, 93%)", color: "hsl(145, 65%, 32%)", label: "Verified" }
      : status === "pending" ? { bg: "hsl(38, 90%, 93%)", color: "hsl(38, 90%, 35%)", label: "Pending" }
      : status === "contacted" ? { bg: "hsl(210, 80%, 93%)", color: "hsl(210, 80%, 35%)", label: "Contacted" }
      : status === "completed" ? { bg: "hsl(145, 65%, 93%)", color: "hsl(145, 65%, 32%)", label: "Completed" }
      : status === "approved" ? { bg: "hsl(145, 65%, 93%)", color: "hsl(145, 65%, 32%)", label: "Approved" }
      : { bg: "hsl(0, 65%, 93%)", color: "hsl(0, 65%, 40%)", label: status.charAt(0).toUpperCase() + status.slice(1) };
    return <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>;
  };

  const EditField = ({ label, field, type = "text" }: { label: string; field: string; type?: string }) => (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={(editForm as any)[field] || ""}
        onChange={e => setEditField(field, e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );

  // Profile Detail View
  if (selectedProfile) {
    const p = editMode ? (editForm as Profile) : selectedProfile;
    return (
      <div className="min-h-screen" style={{ background: "hsl(210, 20%, 97%)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => { setSelectedProfile(null); setEditMode(false); }} className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
          <div className="ml-auto flex items-center gap-2">
            {!editMode ? (
              <>
                <button onClick={startEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Edit3 size={13} /> Edit Profile
                </button>
                {selectedProfile.profile_status !== "active" && (
                  <button onClick={() => updateStatus(selectedProfile.id, "active")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors" style={{ background: "hsl(145, 65%, 42%)" }}>
                    <UserCheck size={13} /> Verify Profile
                  </button>
                )}
                {selectedProfile.profile_status !== "rejected" && (
                  <button onClick={() => updateStatus(selectedProfile.id, "rejected")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors" style={{ background: "hsl(0, 65%, 50%)" }}>
                    <UserX size={13} /> Reject
                  </button>
                )}
              </>
            ) : (
              <>
                <button onClick={() => setEditMode(false)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={saveEdit} disabled={savingEdit} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors disabled:opacity-60" style={{ background: "hsl(210, 80%, 50%)" }}>
                  <Save size={13} /> {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5 flex flex-col sm:flex-row items-start gap-5">
            <div className="w-24 h-24 rounded-xl flex-shrink-0 overflow-hidden" style={{ background: "hsl(210, 20%, 93%)" }}>
              {p.profile_photo_url ? (
                <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-500">{p.full_name?.[0]}</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-gray-800">{p.full_name}</h2>
                <StatusBadge status={selectedProfile.profile_status} />
              </div>
              <p className="text-sm text-gray-500">{p.gender} • {getAge(p.date_of_birth)} yrs • {p.religion}{p.caste ? ` - ${p.caste}` : ""}</p>
              <p className="text-xs text-gray-400 mt-1">{[p.city, p.state, p.country].filter(Boolean).join(", ")}</p>
              <p className="text-xs text-gray-400">Registered: {new Date(selectedProfile.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
          </div>

          {editMode ? (
            /* Edit Mode - Organized by sections */
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">📋 Basic Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditField label="Full Name" field="full_name" />
                  <EditField label="Gender" field="gender" />
                  <EditField label="Date of Birth" field="date_of_birth" type="date" />
                  <EditField label="Email" field="email" />
                  <EditField label="Phone" field="phone" />
                  <EditField label="WhatsApp" field="whatsapp" />
                  <EditField label="Profile Created By" field="profile_created_by" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">👤 Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditField label="Mother Tongue" field="mother_tongue" />
                  <EditField label="Marital Status" field="marital_status" />
                  <EditField label="Religion" field="religion" />
                  <EditField label="Caste" field="caste" />
                  <EditField label="Sub Caste" field="sub_caste" />
                  <EditField label="Country" field="country" />
                  <EditField label="State" field="state" />
                  <EditField label="City" field="city" />
                  <EditField label="Native Place" field="native_place" />
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">About Me</label>
                  <textarea
                    value={editForm.about_me || ""}
                    onChange={e => setEditField("about_me", e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">🎓 Education & Career</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditField label="Education" field="education" />
                  <EditField label="Education Detail" field="education_detail" />
                  <EditField label="Occupation" field="occupation" />
                  <EditField label="Company" field="company_name" />
                  <EditField label="Annual Income" field="annual_income" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">👨‍👩‍👧‍👦 Family Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditField label="Family Status" field="family_status" />
                  <EditField label="Family Type" field="family_type" />
                  <EditField label="Father's Name" field="father_name" />
                  <EditField label="Father's Occupation" field="father_occupation" />
                  <EditField label="Mother's Name" field="mother_name" />
                  <EditField label="Mother's Occupation" field="mother_occupation" />
                  <EditField label="Siblings" field="siblings" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">🔮 Horoscope Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditField label="Gothram" field="gothra" />
                  <EditField label="Raasi" field="raasi" />
                  <EditField label="Star" field="star" />
                  <EditField label="Dosham" field="dosham" />
                </div>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <DetailSection title="📋 Basic Details">
                  <DetailRow label="Full Name" value={p.full_name} />
                  <DetailRow label="Profile Created By" value={p.profile_created_by} />
                  <DetailRow label="Gender" value={p.gender} />
                  <DetailRow label="Email" value={p.email} />
                  <DetailRow label="Phone" value={p.phone} />
                  <DetailRow label="WhatsApp" value={p.whatsapp} />
                </DetailSection>
                <DetailSection title="👤 Personal Details">
                  <DetailRow label="Date of Birth" value={p.date_of_birth} />
                  <DetailRow label="Age" value={`${getAge(p.date_of_birth)} years`} />
                  <DetailRow label="Mother Tongue" value={p.mother_tongue} />
                  <DetailRow label="Height" value={p.height_cm ? `${p.height_cm} cm` : null} />
                  <DetailRow label="Marital Status" value={p.marital_status} />
                  <DetailRow label="Religion" value={p.religion} />
                  <DetailRow label="Caste" value={p.caste} />
                  <DetailRow label="Sub Caste" value={p.sub_caste} />
                  <DetailRow label="Country" value={p.country} />
                  <DetailRow label="State" value={p.state} />
                  <DetailRow label="City" value={p.city} />
                  <DetailRow label="Native Place" value={p.native_place} />
                </DetailSection>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <DetailSection title="🎓 Education & Career">
                  <DetailRow label="Education" value={p.education} />
                  <DetailRow label="Education Detail" value={p.education_detail} />
                  <DetailRow label="Occupation" value={p.occupation} />
                  <DetailRow label="Company" value={p.company_name} />
                  <DetailRow label="Annual Income" value={p.annual_income} />
                </DetailSection>
                <DetailSection title="👨‍👩‍👧‍👦 Family Details">
                  <DetailRow label="Family Status" value={p.family_status} />
                  <DetailRow label="Family Type" value={p.family_type} />
                  <DetailRow label="Father's Name" value={p.father_name} />
                  <DetailRow label="Father's Occupation" value={p.father_occupation} />
                  <DetailRow label="Mother's Name" value={p.mother_name} />
                  <DetailRow label="Mother's Occupation" value={p.mother_occupation} />
                  <DetailRow label="Siblings" value={p.siblings} />
                </DetailSection>
                <DetailSection title="🔮 Horoscope">
                  <DetailRow label="Gothram" value={p.gothra} />
                  <DetailRow label="Raasi" value={p.raasi} />
                  <DetailRow label="Star" value={p.star} />
                  <DetailRow label="Dosham" value={p.dosham} />
                </DetailSection>
              </div>
              {/* Photos */}
              {(p.profile_photo_url || (p.additional_photos && p.additional_photos.length > 0)) && (
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <DetailSection title="📷 Photos">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {p.profile_photo_url && (
                        <div className="relative">
                          <img src={p.profile_photo_url} alt="Profile" className="w-full aspect-square object-cover rounded-lg" />
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style={{ background: "hsl(var(--burgundy))" }}>Primary</span>
                        </div>
                      )}
                      {p.additional_photos?.map((url, i) => (
                        <img key={i} src={url} alt={`Photo ${i + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                      ))}
                    </div>
                  </DetailSection>
                </div>
              )}
              {p.about_me && (
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <DetailSection title="💬 About Me">
                    <p className="text-sm text-gray-700 leading-relaxed">{p.about_me}</p>
                  </DetailSection>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

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
            <img src={adminLogo} alt="Kalyanasuthra" className="h-12 w-auto object-contain" />
          </div>

          <nav className="space-y-1 flex-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all" style={tab === t ? { background: "hsl(210, 80%, 55% / 0.25)", color: "hsl(210, 80%, 80%)", fontWeight: 600 } : { color: "hsl(0, 0%, 70%)" }}>
                {t}
              </button>
            ))}
          </nav>

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
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => navigate("/")} className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 flex items-center gap-1">
              <Home size={12} /> Home
            </button>
            <button onClick={() => navigate("/admin")} className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 flex items-center gap-1">
              <ArrowLeft size={12} /> Login
            </button>
          </div>
          <img src={adminLogo} alt="Kalyanasuthra" className="h-10 w-auto object-contain hidden sm:block lg:hidden" />
          <div className="hidden lg:block">
            <h1 className="font-bold text-gray-800">Admin Dashboard</h1>
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
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
              {tab === "Success Stories" ? (
                successStories.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm">No success stories yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-gray-400 uppercase tracking-wider">
                          <th className="text-left py-2 px-3 font-semibold">Couple</th>
                          <th className="text-left py-2 px-3 font-semibold">City</th>
                          <th className="text-left py-2 px-3 font-semibold">Story</th>
                          <th className="text-left py-2 px-3 font-semibold">Status</th>
                          <th className="text-left py-2 px-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {successStories.map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-3 font-semibold text-gray-800 text-sm">{s.bride_name} ♥ {s.groom_name}</td>
                            <td className="py-3 px-3 text-gray-600 text-xs">{s.city}</td>
                            <td className="py-3 px-3 text-gray-600 text-xs max-w-[200px] truncate">{s.story}</td>
                            <td className="py-3 px-3"><StatusBadge status={s.status} /></td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-1.5">
                                {s.status !== "approved" && (
                                  <button onClick={() => updateStoryStatus(s.id, "approved")} className="text-[10px] px-2 py-1 rounded-md font-semibold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>Approve</button>
                                )}
                                {s.status !== "rejected" && (
                                  <button onClick={() => updateStoryStatus(s.id, "rejected")} className="text-[10px] px-2 py-1 rounded-md font-semibold text-white" style={{ background: "hsl(0, 65%, 50%)" }}>Reject</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : tab === "Consultations" ? (
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
                /* Profile Tabs - Card Layout */
                loading ? (
                  <div className="text-center py-10 text-gray-400 text-sm">Loading profiles...</div>
                ) : displayProfiles.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    {tab === "Profile Requests" ? "No pending profile requests" : "No profiles found"}
                  </div>
                ) : (
                  tab === "All Profiles" ? (
                    /* Horizontal row layout for All Profiles */
                    <div className="space-y-3">
                      {displayProfiles.map((p, i) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-md flex items-center gap-4 px-4 py-3"
                          style={{ borderLeft: "3px solid hsl(145, 65%, 45%)" }}
                        >
                          <div className="w-11 h-11 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: "hsl(210, 20%, 93%)" }}>
                            {p.profile_photo_url ? (
                              <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-base font-bold text-gray-500">{p.full_name[0]}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm truncate">{p.full_name}</h3>
                            <p className="text-xs text-gray-500">{p.gender} • {getAge(p.date_of_birth)} yrs • {[p.city, p.state].filter(Boolean).join(", ") || "—"}</p>
                          </div>
                          <div className="flex-shrink-0 hidden sm:block">
                            <p className="text-xs text-gray-400">{p.occupation || "—"}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <StatusBadge status={p.profile_status} />
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button onClick={() => openProfile(p)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all" style={{ background: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 45%)" }}>
                              <Eye size={11} /> View
                            </button>
                            <button onClick={() => toggleFeatured(p.id, p.is_featured)} className="py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all" style={p.is_featured ? { background: "hsl(280, 65%, 93%)", color: "hsl(280, 65%, 40%)" } : { background: "hsl(38, 90%, 93%)", color: "hsl(38, 90%, 35%)" }}>
                              {p.is_featured ? "★" : "☆"}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* Card layout for Profile Requests & Featured */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {displayProfiles.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-md group"
                        style={{ borderLeft: "3px solid " + (p.profile_status === "pending" ? "hsl(38, 90%, 55%)" : p.profile_status === "active" ? "hsl(145, 65%, 45%)" : "hsl(0, 65%, 55%)") }}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: "hsl(210, 20%, 93%)" }}>
                              {p.profile_photo_url ? (
                                <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-lg font-bold text-gray-500">{p.full_name[0]}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-800 text-sm truncate">{p.full_name}</h3>
                              <p className="text-xs text-gray-500">{p.gender} • {getAge(p.date_of_birth)} yrs</p>
                              <p className="text-xs text-gray-400 truncate">{[p.city, p.state].filter(Boolean).join(", ") || "—"}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <StatusBadge status={p.profile_status} />
                            <span className="text-[10px] text-gray-400">{new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button onClick={() => openProfile(p)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all" style={{ background: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 45%)" }}>
                              <Eye size={11} /> View
                            </button>
                            {p.profile_status === "pending" && (
                              <button onClick={() => updateStatus(p.id, "active")} className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold text-white transition-all" style={{ background: "hsl(145, 65%, 42%)" }}>
                                Verify
                              </button>
                            )}
                            <button onClick={() => toggleFeatured(p.id, p.is_featured)} className="py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all" style={p.is_featured ? { background: "hsl(280, 65%, 93%)", color: "hsl(280, 65%, 40%)" } : { background: "hsl(38, 90%, 93%)", color: "hsl(38, 90%, 35%)" }}>
                              {p.is_featured ? "★" : "☆"}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
