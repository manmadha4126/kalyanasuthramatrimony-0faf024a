import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, CheckCircle, Clock, LogOut, Menu, X, Home, ArrowLeft, CalendarCheck, Eye, Edit3, ChevronLeft, Save, UserCheck, UserX, Plus, Trash2, Search, Upload, FileText, Heart, UserPlus } from "lucide-react";
import adminLogo from "@/assets/kalyanasuthra-logo.png";
import AdminAddProfile from "@/components/AdminAddProfile";
import { useSessionSecurity } from "@/hooks/useSessionSecurity";

// Dropdown options (same as AdminDashboard)
const genderOptions = ["Male", "Female"];
const profileForOptions = ["Self", "Son", "Daughter", "Brother", "Sister", "Friend", "Relative"];
const motherTongueOptions = ["Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "English", "Marathi", "Bengali", "Gujarati", "Punjabi", "Urdu", "Odia", "Assamese", "Konkani", "Sindhi", "Sanskrit", "Other"];
const maritalStatusOptions = ["Never Married", "Divorced", "Widowed", "Separated"];
const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi / Zoroastrian", "Jewish", "Bahai", "No Religion", "Spiritual", "Other"];
const casteMappings: Record<string, string[]> = {
  "Hindu": ["Brahmin","Kshatriya","Vaishya","Shudra","Agarwal","Arora","Bania","Chettiar","Devanga","Ezhava","Goud","Gounder","Iyer","Iyengar","Jat","Kamma","Kapu","Kayastha","Khandayat","Khatri","Kongu Vellalar","Kurmi","Lingayat","Maratha","Meena","Mudaliar","Nadar","Naidu","Nair","Padmashali","Patel","Pillai","Rajput","Reddy","Saini","Sengunthar","Thevar","Vanniyar","Velama","Vishwakarma","Vokkaliga","Yadav","SC / ST","OBC","Other","No Caste Preference"],
  "Muslim": ["Ansari","Hanafi","Jat Muslim","Khoja","Lebbai","Malik","Mappila","Memon","Mughal","Pathan","Qureshi","Rajput Muslim","Rowther","Sayyid","Shafi","Sheikh","Siddiqui","Sunni","Shia","Other","No Caste Preference"],
  "Christian": ["Anglo-Indian","Born Again","Catholic","CNI","CSI","Jacobite","Knanaya","Latin Catholic","Marthoma","Nadar Christian","Orthodox","Pentecostal","Protestant","Roman Catholic","Syrian Catholic","Syrian Orthodox","Other","No Caste Preference"],
  "Sikh": ["Arora","Bhatia","Ghumar","Jat Sikh","Kamboj","Khatri","Labana","Mazhabi","Ramgarhia","Ravidasia","Saini","Other","No Caste Preference"],
  "Jain": ["Agarwal","Digamber","Jaiswal","KVO","Oswal","Porwal","Shwetamber","Visa Oswal","Other","No Caste Preference"],
  "Buddhist": ["Mahar","Neo-Buddhist","Theravada","Mahayana","Vajrayana","Other","No Caste Preference"],
  "Parsi / Zoroastrian": ["Irani","Parsi","Other","No Caste Preference"],
  "Jewish": ["Bene Israel","Cochin Jews","Baghdadi","Other","No Caste Preference"],
  "Bahai": ["Bahai","Other"],
  "No Religion": ["Not Applicable"],
  "Spiritual": ["Not Applicable"],
  "Other": ["Other","No Caste Preference"]
};
const countryOptions = ["India","USA","UK","Canada","Australia","UAE","Singapore","Germany","New Zealand","Malaysia","South Africa","Saudi Arabia","Qatar","Kuwait","Bahrain","Oman","Japan","South Korea","France","Italy","Netherlands","Sweden","Switzerland","Ireland","Other"];
const indianStates = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
const educationOptions = ["High School","Diploma","Bachelor's Degree","Master's Degree","PhD","Professional Degree (CA/CS/ICWA)","Other"];
const graduationDetailsOptions = ["B.Tech / B.E.","B.Sc","B.Com","B.A.","B.B.A","B.C.A","B.Arch","B.Des","B.Ed","B.Pharm","B.L / LLB","MBBS","BDS","BAMS","BHMS","M.Tech / M.E.","M.Sc","M.Com","M.A.","MBA","MCA","M.Ed","M.Pharm","MD","MS","CA","CS","ICWA / CMA","Ph.D","Post Doctoral","Diploma / ITI","Other Degree"];
const employmentOptions = ["Private Sector","Government","Self Employed / Business","Public Sector","Defence","Civil Services","Not Working","Student","Freelancer","Other"];
const familyStatusOptions = ["Middle Class","Upper Middle Class","Rich","Affluent"];
const familyTypeOptions = ["Joint Family","Nuclear Family","Extended Family"];
const siblingsOptions = ["No Siblings","1 Brother","2 Brothers","3+ Brothers","1 Sister","2 Sisters","3+ Sisters","1 Brother 1 Sister","Multiple Siblings"];
const gothramOptions = ["Kashyapa","Bharadwaja","Vasistha","Atri","Viswamitra","Agastya","Garga","Jamadagni","Shandilya","Koundinya","Dhananjaya","Haritasa","Other","Not Applicable"];
const raashiOptions = ["Mesha (Aries)","Vrishabha (Taurus)","Mithuna (Gemini)","Karka (Cancer)","Simha (Leo)","Kanya (Virgo)","Tula (Libra)","Vrishchika (Scorpio)","Dhanu (Sagittarius)","Makara (Capricorn)","Kumbha (Aquarius)","Meena (Pisces)"];
const starOptions = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
const doshamOptions = ["No Dosham","Chevvai Dosham","Rahu Dosham","Kethu Dosham","Shani Dosham","Not Known"];
const citizenshipOptions = ["Indian Citizen","NRI","PIO","OCI","US Citizen","UK Citizen","Canadian Citizen","Australian Citizen","UAE Resident","Singapore Citizen / PR","German Citizen","Dual Citizenship","Foreign National","Other"];
const residenceOptions = ["Own House","Rented House","Rented Apartment","Own Apartment / Flat","With Family / Parents","Company Provided","PG / Hostel","Co-Living","Independent Villa","Other"];
const visaOptions = ["Not Applicable","H1-B","H4","L1","L2","F1","OPT / CPT","Green Card / PR (US)","US Citizen","Tier 2 (UK)","ILR (UK PR)","PR (Canada)","Work Permit (Canada)","PR (Australia)","Employment Pass (Singapore)","Work Visa (UAE)","Golden Visa (UAE)","Blue Card (EU)","Other"];
const heightOptions = Array.from({ length: 26 }, (_, i) => { const t = 54 + i; return `${Math.floor(t/12)}'${t%12}"`; });
const incomeByCountry: Record<string, string[]> = {
  "INR (₹)": ["Below ₹1 Lakh","₹1-2 Lakhs","₹2-3 Lakhs","₹3-5 Lakhs","₹5-7 Lakhs","₹7-10 Lakhs","₹10-15 Lakhs","₹15-20 Lakhs","₹20-30 Lakhs","₹30-50 Lakhs","₹50-75 Lakhs","₹75 Lakhs-1 Crore","₹1 Crore+"],
};

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
  subscription_type?: string; horoscope_url: string | null; profile_id: string | null;
  district: string | null; complexion: string | null; blood_group: string | null;
  weight_kg: number | null; working_city: string | null; partner_expectations: string | null;
  citizenship: string | null; visa_type: string | null; residence_type: string | null;
};

type Consultation = {
  id: string; name: string; phone: string; preferred_date: string;
  preferred_time: string; status: string; created_at: string; notes: string | null;
};

// Staff-specific theme colors
const THEME = {
  sidebar: "hsl(200, 40%, 28%)",
  sidebarActive: "hsl(200, 70%, 55% / 0.25)",
  sidebarActiveText: "hsl(200, 70%, 80%)",
  accent: "hsl(200, 70%, 50%)",
  accentBg: "hsl(200, 70%, 96%)",
  accentText: "hsl(200, 70%, 35%)",
  chipActive: "hsl(200, 40%, 28%)",
  chipActiveText: "hsl(45, 60%, 78%)",
  chipInactive: "hsl(200, 25%, 92%)",
  chipInactiveText: "hsl(200, 32%, 35%)",
  headerBadge: "hsl(45, 55%, 55%)",
  headerBadgeText: "hsl(200, 40%, 12%)",
};

const STAFF_TABS = ["Profile Requests", "All Profiles", "Consultations", "Add Profiles", "Interests"];

const DetailRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="flex justify-between py-3 border-b border-gray-100 last:border-0">
    <span className="text-base font-semibold w-2/5" style={{ color: "hsl(0, 0%, 35%)" }}>{label}</span>
    <span className="text-base font-medium text-right w-3/5" style={{ color: "hsl(0, 0%, 15%)" }}>{value || "—"}</span>
  </div>
);

const DetailSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h4 className="text-lg font-bold mb-3 px-4 py-3 rounded-xl" style={{ background: "hsl(200, 50%, 92%)", color: "hsl(200, 45%, 25%)", fontFamily: "'Roboto', system-ui, sans-serif" }}>{title}</h4>
    <div className="px-3">{children}</div>
  </div>
);

export default function StaffDashboard() {
  useSessionSecurity("/admin");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Profile Requests");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [staffEmail, setStaffEmail] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Profile>>({});
  const [savingEdit, setSavingEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Interests
  const [interests, setInterests] = useState<any[]>([]);
  const [interestNoteText, setInterestNoteText] = useState("");
  const [savingInterestNote, setSavingInterestNote] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<any>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("staff_auth");
    if (!auth) { navigate("/admin"); return; }
    const { email } = JSON.parse(auth);
    setStaffEmail(email);
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate("/admin"); return; }
      fetchAll();
    });
  }, []);

  const fetchAll = () => {
    fetchProfiles();
    fetchConsultations();
    fetchInterests();
  };

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

  const fetchInterests = async () => {
    const { data } = await supabase.from("profile_interests").select("*, profiles!profile_interests_to_profile_id_fkey(full_name, profile_photo_url, city, gender, phone)").order("created_at", { ascending: false });
    if (data) {
      const userIds = [...new Set(data.map((d: any) => d.from_user_id))];
      const { data: fromProfiles } = await supabase.from("profiles").select("user_id, full_name, phone").in("user_id", userIds);
      const fromMap: Record<string, { full_name: string; phone: string | null }> = {};
      (fromProfiles || []).forEach((p: any) => { if (p.user_id) fromMap[p.user_id] = { full_name: p.full_name, phone: p.phone }; });
      setInterests(data.map((d: any) => ({ ...d, from_profile: fromMap[d.from_user_id] || null })));
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

  const updateConsultationStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
    if (!error) {
      setConsultations(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      toast({ title: `Consultation ${status}!` });
    }
  };

  const deleteProfile = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this profile?")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (!error) {
      setProfiles(prev => prev.filter(p => p.id !== id));
      if (selectedProfile?.id === id) setSelectedProfile(null);
      toast({ title: "Profile permanently deleted" });
    } else {
      toast({ title: "Error deleting profile", description: error.message, variant: "destructive" });
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

  const logout = async () => { sessionStorage.removeItem("staff_auth"); await supabase.auth.signOut(); navigate("/admin"); };

  const pendingProfiles = profiles.filter(p => p.profile_status === "pending");
  const activeProfiles = profiles.filter(p => p.profile_status === "active");
  const getAge = (dob: string) => {
    if (!dob) return "—";
    return Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  };

  const filteredAllProfiles = activeProfiles.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.full_name.toLowerCase().includes(q) || (p.city?.toLowerCase().includes(q)) || (p.occupation?.toLowerCase().includes(q)) || (p.phone?.includes(q)) || (p.email?.toLowerCase().includes(q));
  });

  const StatusBadge = ({ status }: { status: string }) => {
    const cfg = status === "active" ? { bg: "hsl(145, 65%, 93%)", color: "hsl(145, 65%, 32%)", label: "Verified" }
      : status === "pending" ? { bg: "hsl(38, 90%, 93%)", color: "hsl(38, 90%, 35%)", label: "Pending" }
      : status === "contacted" ? { bg: "hsl(200, 70%, 93%)", color: "hsl(200, 70%, 35%)", label: "Contacted" }
      : status === "completed" ? { bg: "hsl(145, 65%, 93%)", color: "hsl(145, 65%, 32%)", label: "Completed" }
      : { bg: "hsl(0, 65%, 93%)", color: "hsl(0, 65%, 40%)", label: status.charAt(0).toUpperCase() + status.slice(1) };
    return <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>;
  };

  const EditField = ({ label, field, type = "text" }: { label: string; field: string; type?: string }) => (
    <div className="mb-3">
      <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>
      <input type={type} value={(editForm as any)[field] || ""} onChange={e => setEditField(field, e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
    </div>
  );

  const EditSelect = ({ label, field, options }: { label: string; field: string; options: string[] }) => (
    <div className="mb-3">
      <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>
      <select value={(editForm as any)[field] || ""} onChange={e => setEditField(field, e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white">
        <option value="">Select {label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const editCasteOptions = useMemo(() => {
    const rel = (editForm as any).religion || "";
    return casteMappings[rel] || ["Other", "No Caste Preference"];
  }, [(editForm as any).religion]);

  // Full-screen profile view
  if (selectedProfile) {
    const p = editMode ? (editForm as Profile) : selectedProfile;
    return (
      <div className="min-h-screen" style={{ background: "#F5F8FA", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
          <button onClick={() => { setSelectedProfile(null); setEditMode(false); }} className="flex items-center gap-2 text-base font-semibold text-gray-600 hover:text-gray-800 transition-colors">
            <ChevronLeft size={20} /> Back
          </button>
          <div className="ml-auto flex items-center gap-2 flex-wrap justify-end">
            {!editMode ? (
              <>
                <button onClick={startEdit} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">
                  <Edit3 size={14} /> <span className="hidden sm:inline">Edit Profile</span><span className="sm:hidden">Edit</span>
                </button>
                {selectedProfile.profile_status !== "active" && (
                  <button onClick={() => updateStatus(selectedProfile.id, "active")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>
                    <UserCheck size={14} /> Verify
                  </button>
                )}
                {selectedProfile.profile_status !== "rejected" && (
                  <button onClick={() => updateStatus(selectedProfile.id, "rejected")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white" style={{ background: "hsl(0, 65%, 50%)" }}>
                    <UserX size={14} /> Reject
                  </button>
                )}
              </>
            ) : (
              <>
                <button onClick={() => setEditMode(false)} className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={saveEdit} disabled={savingEdit} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white disabled:opacity-60" style={{ background: THEME.accent }}>
                  <Save size={14} /> {savingEdit ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-100">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl flex-shrink-0 overflow-hidden shadow-md" style={{ background: "#E8ECF0" }}>
              {p.profile_photo_url ? <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-5xl font-bold text-gray-400">{p.full_name?.[0]}</span></div>}
            </div>
            <div className="flex-1 text-center sm:text-left">
              {selectedProfile.profile_id && <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: THEME.accentBg, color: THEME.accentText }}>ID: {selectedProfile.profile_id}</span>}
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1"><StatusBadge status={selectedProfile.profile_status} /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{p.full_name}</h2>
              <p className="text-lg text-gray-600 mt-1">{getAge(p.date_of_birth)} years • {p.city || "—"}</p>
            </div>
          </div>

          {editMode ? (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">📋 Basic Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditField label="Full Name" field="full_name" />
                  <EditSelect label="Gender" field="gender" options={genderOptions} />
                  <EditField label="Date of Birth" field="date_of_birth" type="date" />
                  <EditField label="Email" field="email" />
                  <EditField label="Phone" field="phone" />
                  <EditField label="WhatsApp" field="whatsapp" />
                  <EditSelect label="Profile Created By" field="profile_created_by" options={profileForOptions} />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">👤 Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditSelect label="Mother Tongue" field="mother_tongue" options={motherTongueOptions} />
                  <EditSelect label="Height" field="height_cm" options={heightOptions} />
                  <EditSelect label="Marital Status" field="marital_status" options={maritalStatusOptions} />
                  <EditSelect label="Religion" field="religion" options={religionOptions} />
                  <EditSelect label="Caste" field="caste" options={editCasteOptions} />
                  <EditField label="Sub Caste" field="sub_caste" />
                  <EditSelect label="Country" field="country" options={countryOptions} />
                  <EditSelect label="State" field="state" options={(editForm as any).country === "India" ? indianStates : []} />
                  <EditField label="City" field="city" />
                  <EditField label="Native Place" field="native_place" />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">🎓 Education & Career</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditSelect label="Education" field="education" options={educationOptions} />
                  <EditSelect label="Graduation Detail" field="education_detail" options={graduationDetailsOptions} />
                  <EditSelect label="Employment Type" field="occupation" options={employmentOptions} />
                  <EditField label="Company Name" field="company_name" />
                  <EditSelect label="Annual Income" field="annual_income" options={incomeByCountry["INR (₹)"] || []} />
                  <EditSelect label="Citizenship" field="citizenship" options={citizenshipOptions} />
                  <EditSelect label="Visa Type" field="visa_type" options={visaOptions} />
                  <EditSelect label="Residence Type" field="residence_type" options={residenceOptions} />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">👨‍👩‍👧‍👦 Family Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditSelect label="Family Status" field="family_status" options={familyStatusOptions} />
                  <EditSelect label="Family Type" field="family_type" options={familyTypeOptions} />
                  <EditField label="Father's Name" field="father_name" />
                  <EditField label="Father's Occupation" field="father_occupation" />
                  <EditField label="Mother's Name" field="mother_name" />
                  <EditField label="Mother's Occupation" field="mother_occupation" />
                  <EditSelect label="Siblings" field="siblings" options={siblingsOptions} />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">🔮 Horoscope Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <EditSelect label="Gothram" field="gothra" options={gothramOptions} />
                  <EditSelect label="Raasi" field="raasi" options={raashiOptions} />
                  <EditSelect label="Star" field="star" options={starOptions} />
                  <EditSelect label="Dosham" field="dosham" options={doshamOptions} />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="About Me"><p className="text-base text-gray-700 leading-relaxed">{p.about_me || "—"}</p></DetailSection>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Personal Details">
                  <DetailRow label="Full Name" value={p.full_name} />
                  <DetailRow label="Date of Birth" value={p.date_of_birth} />
                  <DetailRow label="Age" value={p.date_of_birth ? `${getAge(p.date_of_birth)} years` : null} />
                  <DetailRow label="Gender" value={p.gender} />
                  <DetailRow label="Height" value={p.height_cm ? `${p.height_cm} cm` : null} />
                  <DetailRow label="Mother Tongue" value={p.mother_tongue} />
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
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Contact Details">
                  <DetailRow label="Email" value={p.email} />
                  <DetailRow label="Phone" value={p.phone} />
                  <DetailRow label="WhatsApp" value={p.whatsapp} />
                </DetailSection>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Education & Career">
                  <DetailRow label="Education" value={p.education} />
                  <DetailRow label="Occupation" value={p.occupation} />
                  <DetailRow label="Company" value={p.company_name} />
                  <DetailRow label="Annual Income" value={p.annual_income} />
                </DetailSection>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Family Details">
                  <DetailRow label="Family Status" value={p.family_status} />
                  <DetailRow label="Family Type" value={p.family_type} />
                  <DetailRow label="Father's Name" value={p.father_name} />
                  <DetailRow label="Mother's Name" value={p.mother_name} />
                  <DetailRow label="Siblings" value={p.siblings} />
                </DetailSection>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Horoscope Details">
                  <DetailRow label="Gothram" value={p.gothra} />
                  <DetailRow label="Raasi" value={p.raasi} />
                  <DetailRow label="Star" value={p.star} />
                  <DetailRow label="Dosham" value={p.dosham} />
                </DetailSection>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "#F5F8FA" }}>
      {/* Sidebar - teal/ocean theme */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden flex-shrink-0 hidden lg:block h-screen sticky top-0"
        style={{ background: THEME.sidebar }}
      >
        <div className="w-[240px] h-full flex flex-col py-6 px-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2 px-1">
            <img src={adminLogo} alt="Kalyanasuthra" className="h-12 w-auto object-contain" />
          </div>
          <div className="px-1 mb-8">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: "hsl(200, 70%, 45%)", color: "white" }}>STAFF PANEL</span>
          </div>

          <nav className="space-y-1 flex-1">
            {STAFF_TABS.map(t => (
              <motion.button
                key={t}
                onClick={() => setTab(t)}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                style={tab === t
                  ? { background: THEME.sidebarActive, color: THEME.sidebarActiveText, fontWeight: 600 }
                  : { color: "hsl(0, 0%, 70%)" }
                }
              >
                {t}
              </motion.button>
            ))}
          </nav>

          <div className="space-y-1 border-t border-white/10 pt-4 mb-2">
            <motion.button onClick={() => navigate("/")} whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-white/60 hover:text-white text-xs px-3 py-2 w-full transition-colors rounded-lg hover:bg-white/5">
              <Home size={14} /> Back to Home
            </motion.button>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-[10px] px-1 mb-1 truncate">{staffEmail}</p>
            <button onClick={logout} className="flex items-center gap-2 text-white/60 hover:text-white text-xs px-1 py-1 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 shadow-md lg:hidden" style={{ background: THEME.sidebar }}>
          <div className="flex items-center gap-3 px-4 py-3">
            <img src={adminLogo} alt="Kalyanasuthra" className="h-9 w-auto object-contain" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold leading-tight" style={{ color: THEME.chipActiveText }}>Staff Panel</p>
              <p className="text-[10px] truncate" style={{ color: "hsl(0,0%,60%)" }}>{staffEmail}</p>
            </div>
            <button onClick={() => navigate("/")} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: THEME.headerBadge, color: THEME.headerBadgeText }}>
              <Home size={12} /> Home
            </button>
            <button onClick={logout} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: "hsl(0, 65%, 50%)", color: "white" }}>
              <LogOut size={12} /> Out
            </button>
          </div>
        </header>

        {/* Desktop header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 items-center gap-4 sticky top-0 z-10 shadow-sm hidden lg:flex">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div>
            <h1 className="text-lg font-bold" style={{ color: THEME.sidebar }}>Staff Dashboard</h1>
            <p className="text-sm text-gray-400">Kalyanasuthra Matrimony — Staff Access</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold" style={{ background: THEME.accentBg, color: THEME.accentText }}>Staff</span>
            <span className="text-sm font-medium" style={{ color: "hsl(0, 0%, 10%)" }}>{staffEmail}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm font-semibold text-white transition-colors px-4 py-2 rounded-xl" style={{ background: "hsl(0, 55%, 50%)" }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Mobile tabs */}
          <div className="flex mb-6 gap-1.5 overflow-x-auto lg:hidden pb-2 scrollbar-hide">
            {STAFF_TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex-shrink-0"
                style={tab === t
                  ? { background: THEME.chipActive, color: THEME.chipActiveText, boxShadow: `0 2px 8px hsl(200,40%,28%/0.3)` }
                  : { background: THEME.chipInactive, color: THEME.chipInactiveText }
                }>
                {t}
              </button>
            ))}
          </div>

          {/* Profile Requests */}
          {tab === "Profile Requests" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Profile Requests ({pendingProfiles.length})</h3>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="text-center py-10 text-gray-400">Loading...</div>
                ) : pendingProfiles.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">No pending profile requests</div>
                ) : (
                  <div className="space-y-3">
                    {pendingProfiles.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-md cursor-pointer"
                        style={{ borderLeft: `4px solid hsl(38, 90%, 55%)` }}
                        onClick={() => openProfile(p)}>
                        <div className="flex items-center gap-3 px-4 py-3">
                          <div className="w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                            {p.profile_photo_url ? <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-lg font-bold text-gray-400">{p.full_name[0]}</span></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">{p.full_name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">{p.gender} • {getAge(p.date_of_birth)} yrs • {[p.city, p.state].filter(Boolean).join(", ") || "—"}</p>
                          </div>
                          <StatusBadge status={p.profile_status} />
                        </div>
                        <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
                          <button onClick={(e) => { e.stopPropagation(); updateStatus(p.id, "active"); }} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>Verify</button>
                          <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: THEME.accentBg, color: THEME.accentText }}><Eye size={12} /> View</span>
                          <button onClick={(e) => { e.stopPropagation(); deleteProfile(p.id); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: "hsl(0, 65%, 95%)", color: "hsl(0, 65%, 45%)" }}><Trash2 size={12} /> Delete</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Profiles */}
          {tab === "All Profiles" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
                <h3 className="text-lg font-bold text-gray-800">All Verified Profiles ({filteredAllProfiles.length})</h3>
                <div className="sm:ml-auto relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search by name, city, phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="text-center py-10 text-gray-400">Loading...</div>
                ) : filteredAllProfiles.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">{searchQuery ? "No profiles match your search" : "No verified profiles yet"}</div>
                ) : (
                  <div className="space-y-3">
                    {filteredAllProfiles.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-md cursor-pointer"
                        style={{ borderLeft: `4px solid hsl(145, 65%, 45%)` }}
                        onClick={() => openProfile(p)}>
                        <div className="flex items-center gap-3 px-4 py-3">
                          <div className="w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                            {p.profile_photo_url ? <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-lg font-bold text-gray-400">{p.full_name[0]}</span></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">{p.full_name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">{p.gender} • {getAge(p.date_of_birth)} yrs • {[p.city, p.state].filter(Boolean).join(", ") || "—"}</p>
                          </div>
                          <StatusBadge status={p.profile_status} />
                        </div>
                        <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
                          {(p as any).profile_id && <span className="px-2 py-1 rounded-lg text-xs font-bold" style={{ background: THEME.accentBg, color: THEME.accentText }}>{(p as any).profile_id}</span>}
                          <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: THEME.accentBg, color: THEME.accentText }}><Eye size={12} /> View</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Consultations */}
          {tab === "Consultations" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Consultations ({consultations.length})</h3>
              </div>
              <div className="p-4">
                {consultations.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">No consultations yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-gray-400 uppercase tracking-wider">
                          <th className="text-left py-3 px-4 font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-semibold">Phone</th>
                          <th className="text-left py-3 px-4 font-semibold">Date</th>
                          <th className="text-left py-3 px-4 font-semibold">Time</th>
                          <th className="text-left py-3 px-4 font-semibold">Notes</th>
                          <th className="text-left py-3 px-4 font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {consultations.map((c) => (
                          <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-gray-800">{c.name}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm">{c.phone}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm">{c.preferred_date}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm">{c.preferred_time}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm max-w-[200px]">{c.notes || <span className="text-gray-300">—</span>}</td>
                            <td className="py-4 px-4"><StatusBadge status={c.status} /></td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {c.status === "pending" && <button onClick={() => updateConsultationStatus(c.id, "contacted")} className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white" style={{ background: THEME.accent }}>Contacted</button>}
                                {c.status !== "completed" && <button onClick={() => updateConsultationStatus(c.id, "completed")} className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>Complete</button>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add Profiles */}
          {tab === "Add Profiles" && <AdminAddProfile onProfileAdded={fetchProfiles} />}

          {/* Interests */}
          {tab === "Interests" && (() => {
            const interestSearch = searchQuery.toLowerCase();
            const filteredInterests = interests.filter((interest: any) => {
              const fromName = interest.from_profile?.full_name || "";
              const toName = interest.profiles?.full_name || "";
              const fromPhone = interest.from_profile?.phone || "";
              return fromName.toLowerCase().includes(interestSearch) || toName.toLowerCase().includes(interestSearch) || fromPhone.includes(interestSearch);
            });
            return (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-800">Profile Interests ({filteredInterests.length})</h3>
                    <div className="relative w-full sm:w-72">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name or phone..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                  </div>
                  <div className="p-4">
                    {filteredInterests.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">No interests found</div>
                    ) : (
                      <div className="space-y-3">
                        {filteredInterests.map((interest: any) => {
                          const fromName = interest.from_profile?.full_name || interest.from_user_id?.slice(0, 8) + "...";
                          const fromPhone = interest.from_profile?.phone || "";
                          const toName = interest.profiles?.full_name || "Unknown";
                          const isCompleted = interest.interest_type === "completed";
                          const isNotCompleted = interest.interest_type === "not_completed";
                          return (
                            <motion.div key={interest.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                              className="rounded-xl border border-gray-200 cursor-pointer hover:shadow-md transition-all"
                              style={{ background: isCompleted ? "hsl(145, 55%, 90%)" : isNotCompleted ? "hsl(0, 55%, 92%)" : "hsl(0, 0%, 100%)" }}
                              onClick={() => { setSelectedInterest(interest); setInterestNoteText(interest.admin_notes || ""); }}>
                              <div className="flex items-center gap-3 px-4 py-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  {interest.profiles?.profile_photo_url ? <img src={interest.profiles.profile_photo_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-400">{interest.profiles?.full_name?.[0] || "?"}</div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-800 truncate">{fromName} → {toName}</p>
                                  <p className="text-xs text-gray-500">{new Date(interest.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                                </div>
                                <span className="px-2 py-1 rounded-full text-xs font-bold flex-shrink-0" style={{
                                  background: isCompleted ? "hsl(145, 60%, 90%)" : isNotCompleted ? "hsl(0, 60%, 90%)" : interest.interest_type === "shortlist" ? "hsl(38, 90%, 93%)" : "hsl(340, 65%, 93%)",
                                  color: isCompleted ? "hsl(145, 60%, 25%)" : isNotCompleted ? "hsl(0, 60%, 25%)" : interest.interest_type === "shortlist" ? "hsl(38, 90%, 35%)" : "hsl(340, 65%, 40%)"
                                }}>
                                  {isCompleted ? "Completed" : isNotCompleted ? "Not Completed" : interest.interest_type === "shortlist" ? "Shortlisted" : "Interested"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
                                {fromPhone ? (
                                  <a href={`https://wa.me/${fromPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${fromName}, you shortlisted the profile of ${toName}. Would you like more details? - Kalyanasuthra Matrimony`)}`}
                                    target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                                    style={{ background: "hsl(142, 70%, 93%)", color: "hsl(142, 70%, 30%)" }}>📱 {fromPhone}</a>
                                ) : <span className="text-xs text-gray-400">No phone</span>}
                                <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                                  {!isCompleted && (
                                    <button onClick={async () => {
                                      const { error } = await supabase.from("profile_interests").update({ interest_type: "completed" } as any).eq("id", interest.id);
                                      if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "completed" } : i)); toast({ title: "Marked as completed!" }); }
                                    }} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: "hsl(145, 65%, 88%)", color: "hsl(145, 65%, 25%)" }}>Completed</button>
                                  )}
                                  {!isNotCompleted && (
                                    <button onClick={async () => {
                                      const { error } = await supabase.from("profile_interests").update({ interest_type: "not_completed" } as any).eq("id", interest.id);
                                      if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "not_completed" } : i)); toast({ title: "Marked as not completed!" }); }
                                    }} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: "hsl(0, 65%, 90%)", color: "hsl(0, 65%, 30%)" }}>Not Completed</button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Interest Detail Modal */}
                {selectedInterest && (() => {
                  const interest = selectedInterest;
                  const fromName = interest.from_profile?.full_name || interest.from_user_id?.slice(0, 8) + "...";
                  const fromPhone = interest.from_profile?.phone || "";
                  const toName = interest.profiles?.full_name || "Unknown";
                  return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "hsla(0, 0%, 0%, 0.5)" }}>
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-800">Interest Details</h3>
                          <button onClick={() => setSelectedInterest(null)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl p-4 border border-gray-200" style={{ background: THEME.accentBg }}>
                              <p className="text-xs font-semibold text-gray-500 mb-1">From User</p>
                              <p className="text-sm font-bold text-gray-800">{fromName}</p>
                              {fromPhone && <p className="text-xs text-gray-500 mt-1">📱 {fromPhone}</p>}
                            </div>
                            <div className="rounded-xl p-4 border border-gray-200" style={{ background: "hsl(340, 50%, 97%)" }}>
                              <p className="text-xs font-semibold text-gray-500 mb-1">Interested In</p>
                              <p className="text-sm font-bold text-gray-800">{toName}</p>
                            </div>
                          </div>
                          {fromPhone && (
                            <a href={`https://wa.me/${fromPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${fromName}, regarding your interest in ${toName}. - Kalyanasuthra Matrimony`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: "hsl(142, 65%, 42%)" }}>📱 Contact on WhatsApp</a>
                          )}
                          <div className="flex gap-2">
                            <button onClick={async () => {
                              const { error } = await supabase.from("profile_interests").update({ interest_type: "completed" } as any).eq("id", interest.id);
                              if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "completed" } : i)); setSelectedInterest({ ...interest, interest_type: "completed" }); toast({ title: "Marked as completed!" }); }
                            }} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>Completed</button>
                            <button onClick={async () => {
                              const { error } = await supabase.from("profile_interests").update({ interest_type: "not_completed" } as any).eq("id", interest.id);
                              if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "not_completed" } : i)); setSelectedInterest({ ...interest, interest_type: "not_completed" }); toast({ title: "Marked as not completed!" }); }
                            }} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "hsl(0, 55%, 50%)" }}>Not Completed</button>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">📝 Admin Note</label>
                            <textarea value={interestNoteText} onChange={e => setInterestNoteText(e.target.value)} placeholder="Add a note..." rows={3}
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                            <button disabled={savingInterestNote} onClick={async () => {
                              setSavingInterestNote(true);
                              const { error } = await supabase.from("profile_interests").update({ admin_notes: interestNoteText } as any).eq("id", interest.id);
                              if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, admin_notes: interestNoteText } : i)); toast({ title: "Note saved!" }); }
                              setSavingInterestNote(false);
                            }} className="mt-2 px-5 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-60" style={{ background: THEME.accent }}>
                              {savingInterestNote ? "Saving..." : "Save Note"}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })()}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
