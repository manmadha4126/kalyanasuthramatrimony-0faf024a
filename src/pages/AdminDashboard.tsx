import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Star, CheckCircle, Clock, LogOut, Menu, X, Home, ArrowLeft, CalendarCheck, BookHeart, Eye, Edit3, ChevronLeft, Save, UserCheck, UserX, Plus, Trash2, Search, Upload, FileText, Heart, UserPlus, CreditCard } from "lucide-react";
import adminLogo from "@/assets/kalyanasuthra-logo.png";
import AdminAddProfile from "@/components/AdminAddProfile";

// ---- Dropdown options (mirrored from Register page) ----
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
const currencyOptions = ["INR (₹)","USD ($)","GBP (£)","EUR (€)","CAD (C$)","AUD (A$)","AED (د.إ)","SGD (S$)","Other"];
const incomeByCountry: Record<string, string[]> = {
  "INR (₹)": ["Below ₹1 Lakh","₹1-2 Lakhs","₹2-3 Lakhs","₹3-5 Lakhs","₹5-7 Lakhs","₹7-10 Lakhs","₹10-15 Lakhs","₹15-20 Lakhs","₹20-30 Lakhs","₹30-50 Lakhs","₹50-75 Lakhs","₹75 Lakhs-1 Crore","₹1 Crore+"],
  "USD ($)": ["Below $10,000","$10,000-$20,000","$20,000-$30,000","$30,000-$50,000","$50,000-$70,000","$70,000-$100,000","$100,000-$150,000","$150,000-$200,000","$200,000+"],
  "GBP (£)": ["Below £10,000","£10,000-£20,000","£20,000-£30,000","£30,000-£50,000","£50,000-£80,000","£80,000-£100,000","£100,000+"],
  "EUR (€)": ["Below €10,000","€10,000-€20,000","€20,000-€30,000","€30,000-€50,000","€50,000-€80,000","€80,000-€100,000","€100,000+"],
};
const MATRIMONY_PACKAGES = [
  {
    category: "Support Matrimony",
    color: "hsl(210, 70%, 50%)",
    options: [
      { label: "3 Months", value: "support_3m", price: "₹13,000", months: 3 },
      { label: "6 Months", value: "support_6m", price: "₹20,000", months: 6 },
    ],
  },
  {
    category: "Affluent Matrimony",
    color: "hsl(280, 65%, 55%)",
    options: [
      { label: "Premium", value: "affluent_premium", price: "₹38,000", months: 12 },
    ],
  },
  {
    category: "Online Services",
    color: "hsl(160, 50%, 42%)",
    options: [
      { label: "3 Months", value: "online_3m", price: "₹7,000", months: 3 },
      { label: "6 Months", value: "online_6m", price: "₹10,000", months: 6 },
      { label: "1 Year", value: "online_1y", price: "₹15,000", months: 12 },
    ],
  },
];

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
  subscription_type?: string;
  horoscope_url: string | null;
  profile_id: string | null;
  district: string | null;
  complexion: string | null;
  blood_group: string | null;
  weight_kg: number | null;
  working_city: string | null;
  partner_expectations: string | null;
  citizenship: string | null;
  visa_type: string | null;
  residence_type: string | null;
};

type Consultation = {
  id: string; name: string; phone: string; preferred_date: string;
  preferred_time: string; status: string; created_at: string; notes: string | null;
};

type SuccessStory = {
  id: string; bride_name: string; groom_name: string; city: string;
  story: string; image_url: string | null; status: string; created_at: string;
};

type FeaturedProfileEntry = {
  id: string; name: string; age: number; profession: string; city: string;
  gender: string; profile_photo_url: string | null; created_at: string;
};

const TABS = ["Dashboard", "Profile Requests", "All Profiles", "Subscription Access", "Consultations", "Featured Profiles", "Success Stories", "Add Profiles", "Interests"];

const DetailRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="flex justify-between py-3 border-b border-gray-100 last:border-0">
    <span className="text-sm font-semibold text-gray-500 w-2/5">{label}</span>
    <span className="text-sm text-gray-800 text-right w-3/5">{value || "—"}</span>
  </div>
);

const DetailSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h4 className="text-base font-bold mb-3 px-4 py-3 rounded-xl" style={{ background: "hsl(130, 50%, 92%)", color: "hsl(130, 45%, 28%)", fontFamily: "'Roboto', system-ui, sans-serif" }}>{title}</h4>
    <div className="px-3">{children}</div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [featuredEntries, setFeaturedEntries] = useState<FeaturedProfileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Profile>>({});
  const [savingEdit, setSavingEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Featured profile form
  const [showFeaturedForm, setShowFeaturedForm] = useState(false);
  const [featuredForm, setFeaturedForm] = useState({ name: "", age: "", profession: "", city: "", gender: "Groom" });
  const [featuredPhoto, setFeaturedPhoto] = useState<File | null>(null);
  const [savingFeatured, setSavingFeatured] = useState(false);

  // Success story form
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [storyForm, setStoryForm] = useState({ bride_name: "", groom_name: "", city: "", story: "" });
  const [storyPhoto, setStoryPhoto] = useState<File | null>(null);
  const [savingStory, setSavingStory] = useState(false);

  // Interests
  const [interests, setInterests] = useState<any[]>([]);
  const [interestNoteText, setInterestNoteText] = useState("");
  const [savingInterestNote, setSavingInterestNote] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<any>(null);
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) { navigate("/admin"); return; }
    const { email } = JSON.parse(auth);
    setAdminEmail(email);
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate("/admin"); return; }
      fetchAll();
    });
  }, []);

  const fetchAll = () => {
    fetchProfiles();
    fetchConsultations();
    fetchSuccessStories();
    fetchFeaturedProfiles();
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

  const fetchSuccessStories = async () => {
    const { data } = await supabase.from("success_stories").select("*").order("created_at", { ascending: false });
    if (data) setSuccessStories(data as SuccessStory[]);
  };

  const fetchFeaturedProfiles = async () => {
    const { data } = await supabase.from("featured_profiles" as any).select("*").order("created_at", { ascending: false });
    if (data) setFeaturedEntries(data as any);
  };

  const fetchInterests = async () => {
    const { data } = await supabase.from("profile_interests").select("*, profiles!profile_interests_to_profile_id_fkey(full_name, profile_photo_url, city, gender, phone)").order("created_at", { ascending: false });
    if (data) {
      // Fetch from_user profile info
      const userIds = [...new Set(data.map((d: any) => d.from_user_id))];
      const { data: fromProfiles } = await supabase.from("profiles").select("user_id, full_name, phone").in("user_id", userIds);
      const fromMap: Record<string, { full_name: string; phone: string | null }> = {};
      (fromProfiles || []).forEach((p: any) => { if (p.user_id) fromMap[p.user_id] = { full_name: p.full_name, phone: p.phone }; });
      setInterests(data.map((d: any) => ({ ...d, from_profile: fromMap[d.from_user_id] || null })));
    }
  };

  const addSuccessStory = async () => {
    if (!storyForm.bride_name || !storyForm.groom_name || !storyForm.city || !storyForm.story) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSavingStory(true);
    let imageUrl: string | null = null;
    if (storyPhoto) {
      const ext = storyPhoto.name.split(".").pop();
      const path = `stories/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, storyPhoto, { upsert: true });
      if (!upErr) {
        const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }
    }
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("success_stories").insert({
      bride_name: storyForm.bride_name,
      groom_name: storyForm.groom_name,
      city: storyForm.city,
      story: storyForm.story,
      image_url: imageUrl,
      status: "approved",
      created_by: user?.id || null,
    });
    if (!error) {
      toast({ title: "Success story added!" });
      setStoryForm({ bride_name: "", groom_name: "", city: "", story: "" });
      setStoryPhoto(null);
      setShowStoryForm(false);
      fetchSuccessStories();
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setSavingStory(false);
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

  // Featured profile CRUD
  const addFeaturedProfile = async () => {
    if (!featuredForm.name || !featuredForm.age || !featuredForm.profession || !featuredForm.city) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSavingFeatured(true);
    let photoUrl: string | null = null;

    if (featuredPhoto) {
      const ext = featuredPhoto.name.split(".").pop();
      const path = `featured/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, featuredPhoto, { upsert: true });
      if (!upErr) {
        const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
        photoUrl = urlData.publicUrl;
      }
    }

    const { error } = await supabase.from("featured_profiles" as any).insert({
      name: featuredForm.name,
      age: parseInt(featuredForm.age),
      profession: featuredForm.profession,
      city: featuredForm.city,
      gender: featuredForm.gender,
      profile_photo_url: photoUrl,
    } as any);

    if (!error) {
      toast({ title: "Featured profile added!" });
      setFeaturedForm({ name: "", age: "", profession: "", city: "", gender: "Groom" });
      setFeaturedPhoto(null);
      setShowFeaturedForm(false);
      fetchFeaturedProfiles();
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setSavingFeatured(false);
  };

  const deleteFeaturedProfile = async (id: string) => {
    const { error } = await supabase.from("featured_profiles" as any).delete().eq("id", id);
    if (!error) {
      setFeaturedEntries(prev => prev.filter(p => p.id !== id));
      toast({ title: "Featured profile removed" });
    }
  };

  const deleteProfile = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this profile? This action cannot be undone.")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (!error) {
      setProfiles(prev => prev.filter(p => p.id !== id));
      if (selectedProfile?.id === id) setSelectedProfile(null);
      toast({ title: "Profile permanently deleted" });
    } else {
      toast({ title: "Error deleting profile", description: error.message, variant: "destructive" });
    }
  };

  const logout = async () => { sessionStorage.removeItem("admin_auth"); await supabase.auth.signOut(); navigate("/admin"); };

  const pendingProfiles = profiles.filter(p => p.profile_status === "pending");
  const getAge = (dob: string) => {
    if (!dob) return "—";
    return Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  };

  const activeProfiles = profiles.filter(p => p.profile_status === "active");

  // Filter profiles for All Profiles tab with search
  const filteredAllProfiles = activeProfiles.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.full_name.toLowerCase().includes(q) ||
      (p.city?.toLowerCase().includes(q)) ||
      (p.occupation?.toLowerCase().includes(q)) ||
      (p.religion?.toLowerCase().includes(q)) ||
      (p.caste?.toLowerCase().includes(q)) ||
      (p.phone?.includes(q)) ||
      (p.email?.toLowerCase().includes(q))
    );
  });

  const stats = [
    { label: "Total Profiles", value: profiles.length, icon: Users, color: "hsl(210, 80%, 55%)", bg: "hsl(210, 80%, 96%)" },
    { label: "Pending Review", value: pendingProfiles.length, icon: Clock, color: "hsl(38, 90%, 50%)", bg: "hsl(38, 90%, 96%)" },
    { label: "Active Profiles", value: activeProfiles.length, icon: CheckCircle, color: "hsl(145, 65%, 42%)", bg: "hsl(145, 65%, 95%)" },
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
    return <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>;
  };

  const EditField = ({ label, field, type = "text" }: { label: string; field: string; type?: string }) => (
    <div className="mb-3">
      <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={(editForm as any)[field] || ""}
        onChange={e => setEditField(field, e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );

  const EditSelect = ({ label, field, options }: { label: string; field: string; options: string[] }) => (
    <div className="mb-3">
      <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>
      <select
        value={(editForm as any)[field] || ""}
        onChange={e => setEditField(field, e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
      >
        <option value="">Select {label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const editCasteOptions = useMemo(() => {
    const rel = (editForm as any).religion || "";
    return casteMappings[rel] || ["Other", "No Caste Preference"];
  }, [(editForm as any).religion]);

  // Subscription access state
  const [subSelectedProfile, setSubSelectedProfile] = useState<Profile | null>(null);
  const [subPackage, setSubPackage] = useState("");
  const [subAmount, setSubAmount] = useState("");
  const [subNotes, setSubNotes] = useState("");
  const [subShowSummary, setSubShowSummary] = useState(false);
  const [subSaving, setSubSaving] = useState(false);

  // ========================
  // FULL-SCREEN PROFILE VIEW
  // ========================
  if (selectedProfile) {
    const p = editMode ? (editForm as Profile) : selectedProfile;
    return (
      <div className="min-h-screen" style={{ background: "#FAFAFA", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
          <button onClick={() => { setSelectedProfile(null); setEditMode(false); }} className="flex items-center gap-2 text-base font-semibold text-gray-600 hover:text-gray-800 transition-colors">
            <ChevronLeft size={20} /> Back
          </button>
          <div className="ml-auto flex items-center gap-3">
            {!editMode ? (
              <>
                <button onClick={startEdit} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Edit3 size={15} /> Edit Profile
                </button>
                {selectedProfile.profile_status !== "active" && (
                  <button onClick={() => updateStatus(selectedProfile.id, "active")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors" style={{ background: "hsl(145, 65%, 42%)" }}>
                    <UserCheck size={15} /> Verify
                  </button>
                )}
                {selectedProfile.profile_status !== "rejected" && (
                  <button onClick={() => updateStatus(selectedProfile.id, "rejected")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors" style={{ background: "hsl(0, 65%, 50%)" }}>
                    <UserX size={15} /> Reject
                  </button>
                )}
              </>
            ) : (
              <>
                <button onClick={() => setEditMode(false)} className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={saveEdit} disabled={savingEdit} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60" style={{ background: "hsl(210, 80%, 50%)" }}>
                  <Save size={15} /> {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          {/* Top Section: Photo + ID + Status + Name + Age + City */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-100">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl flex-shrink-0 overflow-hidden shadow-md" style={{ background: "#E8ECF0" }}>
              {p.profile_photo_url ? (
                <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-400">{p.full_name?.[0]}</span>
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              {selectedProfile.profile_id && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: "hsl(210, 80%, 93%)", color: "hsl(210, 80%, 35%)" }}>
                  ID: {selectedProfile.profile_id}
                </span>
              )}
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                <StatusBadge status={selectedProfile.profile_status} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{p.full_name}</h2>
              <p className="text-lg text-gray-600 mt-1">{getAge(p.date_of_birth)} years • {p.city || "—"}</p>
              <p className="text-sm text-gray-400 mt-2">Registered: {new Date(selectedProfile.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
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
                <div className="mt-3">
                  <label className="block text-sm font-semibold text-gray-500 mb-1">About Me</label>
                  <textarea value={editForm.about_me || ""} onChange={e => setEditField("about_me", e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
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
            /* View Mode - About Me first, then Personal Details with all fields */
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="About Me">
                  <p className="text-base text-gray-700 leading-relaxed">{p.about_me || "—"}</p>
                </DetailSection>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Personal Details">
                  <DetailRow label="Full Name" value={p.full_name} />
                  <DetailRow label="Date of Birth" value={p.date_of_birth} />
                  <DetailRow label="Age" value={p.date_of_birth ? `${getAge(p.date_of_birth)} years` : null} />
                  <DetailRow label="Gender" value={p.gender} />
                  <DetailRow label="Height" value={p.height_cm ? `${p.height_cm} cm` : null} />
                  <DetailRow label="Weight" value={p.weight_kg ? `${p.weight_kg} kg` : null} />
                  <DetailRow label="Complexion" value={p.complexion} />
                  <DetailRow label="Blood Group" value={p.blood_group} />
                  <DetailRow label="Mother Tongue" value={p.mother_tongue} />
                  <DetailRow label="Marital Status" value={p.marital_status} />
                  <DetailRow label="Religion" value={p.religion} />
                  <DetailRow label="Caste" value={p.caste} />
                  <DetailRow label="Sub Caste" value={p.sub_caste} />
                  <DetailRow label="Country" value={p.country} />
                  <DetailRow label="State" value={p.state} />
                  <DetailRow label="District" value={p.district} />
                  <DetailRow label="City" value={p.city} />
                  <DetailRow label="Native Place" value={p.native_place} />
                  <DetailRow label="Working City" value={p.working_city} />
                  <DetailRow label="Profile Created By" value={p.profile_created_by} />
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
                  {(() => {
                    const parts = (p.education_detail || "").split(", ").reduce((acc: any, part: string) => {
                      if (part.startsWith("10th:")) acc.tenth = part.replace("10th: ", "");
                      else if (part.startsWith("12th:")) acc.twelfth = part.replace("12th: ", "");
                      else if (part.startsWith("Degree:")) acc.degree = part.replace("Degree: ", "");
                      return acc;
                    }, { tenth: null, twelfth: null, degree: null });
                    return (
                      <>
                        <DetailRow label="10th Standard" value={parts.tenth} />
                        <DetailRow label="12th / Intermediate" value={parts.twelfth} />
                        <DetailRow label="Graduation / Degree" value={parts.degree || p.education} />
                      </>
                    );
                  })()}
                  <DetailRow label="Occupation" value={p.occupation} />
                  <DetailRow label="Company" value={p.company_name} />
                  <DetailRow label="Annual Income" value={p.annual_income} />
                  <DetailRow label="Citizenship" value={p.citizenship} />
                  <DetailRow label="Visa Type" value={p.visa_type} />
                  <DetailRow label="Residence Type" value={p.residence_type} />
                </DetailSection>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Family Details">
                  <DetailRow label="Family Status" value={p.family_status} />
                  <DetailRow label="Family Type" value={p.family_type} />
                  <DetailRow label="Father's Name" value={p.father_name} />
                  <DetailRow label="Father's Occupation" value={p.father_occupation} />
                  <DetailRow label="Mother's Name" value={p.mother_name} />
                  <DetailRow label="Mother's Occupation" value={p.mother_occupation} />
                  <DetailRow label="Siblings" value={p.siblings} />
                </DetailSection>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <DetailSection title="Horoscope Details">
                  <DetailRow label="Gothram" value={p.gothra} />
                  <DetailRow label="Raasi" value={p.raasi} />
                  <DetailRow label="Star" value={p.star} />
                  <DetailRow label="Dosham" value={p.dosham} />
                  {p.horoscope_url ? (
                    <div className="mt-4">
                      <span className="text-sm font-semibold text-gray-500 mb-2 block">Horoscope File</span>
                      <a href={p.horoscope_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-md" style={{ background: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 45%)" }}>
                        <FileText size={16} /> View Horoscope
                      </a>
                      {(p.horoscope_url.endsWith('.jpg') || p.horoscope_url.endsWith('.jpeg') || p.horoscope_url.endsWith('.png') || p.horoscope_url.endsWith('.webp')) && (
                        <img src={p.horoscope_url} alt="Horoscope" className="mt-3 max-w-sm rounded-xl border border-gray-200" />
                      )}
                    </div>
                  ) : (
                    <DetailRow label="Horoscope File" value={null} />
                  )}
                </DetailSection>
              </div>


              {(p.profile_photo_url || (p.additional_photos && p.additional_photos.length > 0)) && (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                  <DetailSection title="Photos">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                      {p.profile_photo_url && (
                        <div className="relative">
                          <img src={p.profile_photo_url} alt="Profile" className="w-full aspect-square object-cover rounded-xl" />
                          <span className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ background: "hsl(210, 80%, 50%)" }}>Primary</span>
                        </div>
                      )}
                      {p.additional_photos?.map((url, i) => (
                        <img key={i} src={url} alt={`Photo ${i + 1}`} className="w-full aspect-square object-cover rounded-xl" />
                      ))}
                    </div>
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
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "#FAFAFA" }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden flex-shrink-0 hidden lg:block h-screen sticky top-0"
        style={{ background: "hsl(213, 32%, 22%)" }}
      >
        <div className="w-[240px] h-full flex flex-col py-6 px-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-8 px-1">
            <img src={adminLogo} alt="Kalyanasuthra" className="h-12 w-auto object-contain" />
          </div>

          <nav className="space-y-1 flex-1">
            {TABS.map(t => (
              <motion.button
                key={t}
                onClick={() => setTab(t)}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                style={tab === t
                  ? { background: "hsl(210, 80%, 55% / 0.25)", color: "hsl(210, 80%, 80%)", fontWeight: 600 }
                  : { color: "hsl(0, 0%, 70%)" }
                }
              >
                {t}
              </motion.button>
            ))}
          </nav>

          <div className="space-y-1 border-t border-white/10 pt-4 mb-2">
            <motion.button
              onClick={() => navigate("/admin")}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 text-white/60 hover:text-white text-xs px-3 py-2 w-full transition-colors rounded-lg hover:bg-white/5"
            >
              <ArrowLeft size={14} /> Back to Staff Login
            </motion.button>
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 text-white/60 hover:text-white text-xs px-3 py-2 w-full transition-colors rounded-lg hover:bg-white/5"
            >
              <Home size={14} /> Back to Home
            </motion.button>
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
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600 hidden lg:block">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => navigate("/")} className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 flex items-center gap-1">
              <Home size={12} /> Home
            </button>
          </div>
          <img src={adminLogo} alt="Kalyanasuthra" className="h-10 w-auto object-contain hidden sm:block lg:hidden" />
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Kalyanasuthra Matrimony Management</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{adminEmail}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors border border-gray-200 px-4 py-2 rounded-xl">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Mobile tabs */}
          <div className="flex border-b border-gray-200 mb-6 gap-2 overflow-x-auto lg:hidden pb-2">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className="px-3 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all" style={tab === t ? { background: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 45%)" } : { color: "#aaa" }}>
                {t}
              </button>
            ))}
          </div>

          {/* Dashboard tab - Stats */}
          {tab === "Dashboard" && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                        <s.icon size={18} style={{ color: s.color }} />
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{s.value}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent profile requests preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Profile Requests</h3>
                {pendingProfiles.length === 0 ? (
                  <p className="text-gray-400 text-sm py-6 text-center">No pending requests</p>
                ) : (
                  <div className="space-y-3">
                    {pendingProfiles.slice(0, 5).map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100">
                          {p.profile_photo_url ? <img src={p.profile_photo_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">{p.full_name[0]}</div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{p.full_name}</p>
                          <p className="text-xs text-gray-500">{p.gender} • {getAge(p.date_of_birth)} yrs</p>
                        </div>
                        <StatusBadge status={p.profile_status} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

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
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-md flex items-center gap-4 px-5 py-4 cursor-pointer"
                        style={{ borderLeft: "4px solid hsl(38, 90%, 55%)" }}
                        onClick={() => openProfile(p)}
                      >
                        <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                          {p.profile_photo_url ? <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-lg font-bold text-gray-400">{p.full_name[0]}</span></div>}
                        </div>
                         <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-base truncate">{p.full_name}</h3>
                          <p className="text-sm text-gray-500">{p.gender} • {getAge(p.date_of_birth)} yrs • {[p.city, p.state].filter(Boolean).join(", ") || "—"}</p>
                        </div>
                        <div className="flex-shrink-0 hidden sm:block">
                          <p className="text-sm text-gray-500">{p.occupation || "—"}</p>
                        </div>
                        {(p as any).profile_id && (
                          <span className="px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0" style={{ background: "hsl(210, 80%, 93%)", color: "hsl(210, 80%, 35%)" }}>{(p as any).profile_id}</span>
                        )}
                        <StatusBadge status={p.profile_status} />
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={(e) => { e.stopPropagation(); updateStatus(p.id, "active"); }} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all" style={{ background: "hsl(145, 65%, 42%)" }}>Verify</button>
                          <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 45%)" }}>
                            <Eye size={12} /> View
                          </span>
                          <button onClick={(e) => { e.stopPropagation(); deleteProfile(p.id); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all" style={{ background: "hsl(0, 65%, 95%)", color: "hsl(0, 65%, 45%)" }}>
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Profiles with search */}
          {tab === "All Profiles" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
                <h3 className="text-lg font-bold text-gray-800">All Verified Profiles ({filteredAllProfiles.length})</h3>
                <div className="sm:ml-auto relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, city, phone..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
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
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-md flex items-center gap-4 px-5 py-4 cursor-pointer"
                        style={{ borderLeft: "4px solid hsl(145, 65%, 45%)" }}
                        onClick={() => openProfile(p)}
                      >
                        <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                          {p.profile_photo_url ? <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-lg font-bold text-gray-400">{p.full_name[0]}</span></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-base truncate">{p.full_name}</h3>
                          <p className="text-sm text-gray-500">{p.gender} • {getAge(p.date_of_birth)} yrs • {[p.city, p.state].filter(Boolean).join(", ") || "—"}</p>
                        </div>
                        <div className="flex-shrink-0 hidden sm:block">
                          <p className="text-sm text-gray-500">{p.occupation || "—"}</p>
                        </div>
                        {(p as any).profile_id && (
                          <span className="px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0" style={{ background: "hsl(210, 80%, 93%)", color: "hsl(210, 80%, 35%)" }}>{(p as any).profile_id}</span>
                        )}
                        <StatusBadge status={p.profile_status} />
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 45%)" }}>
                            <Eye size={12} /> View
                          </span>
                          <button onClick={(e) => { e.stopPropagation(); deleteProfile(p.id); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all" style={{ background: "hsl(0, 65%, 95%)", color: "hsl(0, 65%, 45%)" }}>
                            <Trash2 size={12} /> Delete
                          </button>
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
                          <th className="text-left py-3 px-4 font-semibold">Message / Notes</th>
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
                            <td className="py-4 px-4 text-gray-600 text-sm max-w-[200px]">
                              {c.notes ? (
                                <div className="whitespace-pre-line text-xs leading-relaxed">{c.notes}</div>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4"><StatusBadge status={c.status} /></td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {c.status === "pending" && <button onClick={() => updateConsultationStatus(c.id, "contacted")} className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white" style={{ background: "hsl(210, 80%, 50%)" }}>Contacted</button>}
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

          {/* Featured Profiles Management */}
          {tab === "Featured Profiles" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Featured Profiles ({featuredEntries.length})</h3>
                <button onClick={() => setShowFeaturedForm(!showFeaturedForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: "hsl(210, 80%, 50%)" }}>
                  <Plus size={16} /> Add Profile
                </button>
              </div>

              {showFeaturedForm && (
                <div className="p-6 border-b border-gray-100" style={{ background: "#F8FAFC" }}>
                  <h4 className="text-base font-bold text-gray-800 mb-4">Add Featured Profile</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name *</label>
                      <input type="text" value={featuredForm.name} onChange={e => setFeaturedForm(p => ({ ...p, name: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Age *</label>
                      <input type="number" value={featuredForm.age} onChange={e => setFeaturedForm(p => ({ ...p, age: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Profession *</label>
                      <input type="text" value={featuredForm.profession} onChange={e => setFeaturedForm(p => ({ ...p, profession: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">City *</label>
                      <input type="text" value={featuredForm.city} onChange={e => setFeaturedForm(p => ({ ...p, city: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Gender *</label>
                      <select value={featuredForm.gender} onChange={e => setFeaturedForm(p => ({ ...p, gender: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                        <option value="Groom">Groom</option>
                        <option value="Bride">Bride</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Profile Photo</label>
                      <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-gray-50">
                        <Upload size={16} className="text-gray-400" />
                        <span className="text-gray-500 truncate">{featuredPhoto ? featuredPhoto.name : "Choose photo"}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={e => setFeaturedPhoto(e.target.files?.[0] || null)} />
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addFeaturedProfile} disabled={savingFeatured} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60" style={{ background: "hsl(145, 65%, 42%)" }}>
                      {savingFeatured ? "Saving..." : "Add Profile"}
                    </button>
                    <button onClick={() => setShowFeaturedForm(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                  </div>
                </div>
              )}

              <div className="p-4">
                {featuredEntries.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">No featured profiles yet. Add some to showcase on the homepage.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {featuredEntries.map((fp) => (
                      <div key={fp.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                          {fp.profile_photo_url ? (
                            <img src={fp.profile_photo_url} alt={fp.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-4xl font-bold text-gray-300">{fp.name[0]}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 text-base">{fp.name}</h4>
                          <p className="text-sm text-gray-500">{fp.age} yrs • {fp.profession}</p>
                          <p className="text-sm text-gray-400">{fp.city} • {fp.gender}</p>
                          <button onClick={() => deleteFeaturedProfile(fp.id)} className="mt-3 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all" style={{ background: "hsl(0, 65%, 95%)", color: "hsl(0, 65%, 45%)" }}>
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subscription Access */}
          {tab === "Subscription Access" && (
            <div className="space-y-6">
              {/* Profile list */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Subscription Access</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Select a profile to manage subscription</p>
                  </div>
                  <div className="sm:ml-auto relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search by name, phone, email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                  </div>
                </div>
                <div className="p-4">
                  {loading ? (
                    <div className="text-center py-10 text-gray-400">Loading...</div>
                  ) : (
                    <div className="space-y-3">
                      {profiles.filter(p => {
                        if (!searchQuery) return p.profile_status === "active";
                        const q = searchQuery.toLowerCase();
                        return p.full_name.toLowerCase().includes(q) || (p.phone?.includes(q)) || (p.email?.toLowerCase().includes(q)) || (p.city?.toLowerCase().includes(q));
                      }).map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                          className={`bg-white rounded-xl border overflow-hidden transition-all hover:shadow-md flex items-center gap-4 px-5 py-4 cursor-pointer ${subSelectedProfile?.id === p.id ? "ring-2 ring-purple-400 border-purple-200" : "border-gray-100"}`}
                          style={{ borderLeft: `4px solid ${(p as any).subscription_type === "assisted" ? "hsl(280, 65%, 55%)" : "hsl(210, 20%, 80%)"}` }}
                          onClick={() => { setSubSelectedProfile(p); setSubPackage(""); setSubAmount(""); setSubNotes(""); setSubShowSummary(false); }}
                        >
                          <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                            {p.profile_photo_url ? <img src={p.profile_photo_url} alt={p.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-lg font-bold text-gray-400">{p.full_name[0]}</span></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 text-base truncate">{p.full_name}</h3>
                            <p className="text-sm text-gray-500">{p.gender} • {getAge(p.date_of_birth)} yrs • {p.phone || "—"}</p>
                          </div>
                          {(p as any).profile_id && (
                            <span className="px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0" style={{ background: "hsl(210, 80%, 93%)", color: "hsl(210, 80%, 35%)" }}>{(p as any).profile_id}</span>
                          )}
                          <div className="flex-shrink-0">
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={
                              (p as any).subscription_type === "assisted"
                                ? { background: "hsl(280, 65%, 93%)", color: "hsl(280, 65%, 40%)" }
                                : { background: "hsl(0, 0%, 95%)", color: "hsl(0, 0%, 50%)" }
                            }>
                              {(p as any).subscription_type === "assisted" ? "✦ Assisted" : "Free"}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                      {profiles.filter(p => p.profile_status === "active").length === 0 && !searchQuery && (
                        <div className="text-center py-10 text-gray-400">No active profiles to manage</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected profile subscription panel */}
              {subSelectedProfile && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                      {subSelectedProfile.profile_photo_url ? <img src={subSelectedProfile.profile_photo_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">{subSelectedProfile.full_name[0]}</div>}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{subSelectedProfile.full_name}</h3>
                      <p className="text-sm text-gray-500">{(subSelectedProfile as any).profile_id || "—"} • {subSelectedProfile.phone || "—"} • Current: <span className="font-semibold" style={{ color: (subSelectedProfile as any).subscription_type === "assisted" ? "hsl(280, 65%, 50%)" : "hsl(0, 0%, 50%)" }}>{(subSelectedProfile as any).subscription_type === "assisted" ? "Assisted" : "Free"}</span></p>
                    </div>
                    <button onClick={() => setSubSelectedProfile(null)} className="ml-auto text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>

                  {(subSelectedProfile as any).subscription_type === "assisted" ? (
                    <div className="p-6">
                      <p className="text-sm text-gray-600 mb-4">This profile currently has <span className="font-bold" style={{ color: "hsl(280, 65%, 50%)" }}>Assisted Access</span>.</p>
                      <button
                        onClick={async () => {
                          const { error } = await supabase.from("profiles").update({ subscription_type: "free" } as any).eq("id", subSelectedProfile.id);
                          if (!error) {
                            setProfiles(prev => prev.map(pr => pr.id === subSelectedProfile.id ? { ...pr, subscription_type: "free" } as any : pr));
                            setSubSelectedProfile(null);
                            toast({ title: "Reverted to free account" });
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: "hsl(0, 55%, 50%)" }}
                      >
                        Revoke Assisted Access
                      </button>
                    </div>
                  ) : !subShowSummary ? (
                    <div className="p-6 space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-3">📦 Select Package</label>
                        <div className="space-y-4">
                          {MATRIMONY_PACKAGES.map(cat => (
                            <div key={cat.category}>
                              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: cat.color }}>{cat.category}</p>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {cat.options.map(pkg => (
                                  <button key={pkg.value} onClick={() => { setSubPackage(pkg.value); setSubAmount(pkg.price.replace(/[₹,]/g, "")); }}
                                    className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all text-left ${subPackage === pkg.value ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                                    <span className="block font-bold">{pkg.price}</span>
                                    <span className="text-xs opacity-70">/ {pkg.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-600 mb-1.5">💰 Amount Paid (₹)</label>
                          <input type="number" value={subAmount} onChange={e => setSubAmount(e.target.value)} placeholder="Enter amount"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-600 mb-1.5">📝 Admin Notes</label>
                          <textarea value={subNotes} onChange={e => setSubNotes(e.target.value)} placeholder="Payment reference, notes..." rows={2}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => {
                            if (!subPackage) { toast({ title: "Please select a package", variant: "destructive" }); return; }
                            if (!subAmount) { toast({ title: "Please enter amount paid", variant: "destructive" }); return; }
                            setSubShowSummary(true);
                          }}
                          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: "hsl(280, 65%, 55%)" }}
                        >
                          Review & Confirm
                        </button>
                        <button onClick={() => setSubSelectedProfile(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 space-y-5">
                      <h4 className="text-base font-bold text-gray-800 flex items-center gap-2"><CreditCard size={18} /> Subscription Summary</h4>
                      <div className="rounded-xl p-5 space-y-3" style={{ background: "hsl(280, 65%, 97%)", border: "1px solid hsl(280, 65%, 90%)" }}>
                        <div className="flex justify-between py-2 border-b" style={{ borderColor: "hsl(280, 65%, 90%)" }}>
                          <span className="text-sm text-gray-600 font-medium">Profile</span>
                          <span className="text-sm font-bold text-gray-800">{subSelectedProfile.full_name} ({(subSelectedProfile as any).profile_id || "—"})</span>
                        </div>
                        <div className="flex justify-between py-2 border-b" style={{ borderColor: "hsl(280, 65%, 90%)" }}>
                          <span className="text-sm text-gray-600 font-medium">Package</span>
                          <span className="text-sm font-bold text-gray-800">{MATRIMONY_PACKAGES.flatMap(c => c.options).find(p => p.value === subPackage)?.label} — {MATRIMONY_PACKAGES.find(c => c.options.some(o => o.value === subPackage))?.category}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b" style={{ borderColor: "hsl(280, 65%, 90%)" }}>
                          <span className="text-sm text-gray-600 font-medium">Amount Paid</span>
                          <span className="text-sm font-bold text-gray-800">₹{subAmount}</span>
                        </div>
                        {subNotes && (
                          <div className="flex justify-between py-2 border-b" style={{ borderColor: "hsl(280, 65%, 90%)" }}>
                            <span className="text-sm text-gray-600 font-medium">Admin Notes</span>
                            <span className="text-sm text-gray-800 text-right max-w-[60%]">{subNotes}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-2">
                          <span className="text-sm text-gray-600 font-medium">Access Type</span>
                          <span className="text-sm font-bold" style={{ color: "hsl(280, 65%, 50%)" }}>✦ Assisted Access</span>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          disabled={subSaving}
                          onClick={async () => {
                            setSubSaving(true);
                            const { error } = await supabase.from("profiles").update({ subscription_type: "assisted" } as any).eq("id", subSelectedProfile.id);
                            if (!error) {
                              setProfiles(prev => prev.map(pr => pr.id === subSelectedProfile.id ? { ...pr, subscription_type: "assisted" } as any : pr));
                              toast({ title: "Assisted access granted successfully!" });
                              setSubSelectedProfile(null);
                              setSubShowSummary(false);
                            } else {
                              toast({ title: "Error", description: error.message, variant: "destructive" });
                            }
                            setSubSaving(false);
                          }}
                          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60" style={{ background: "hsl(145, 65%, 42%)" }}
                        >
                          {subSaving ? "Granting..." : "✓ Grant Assisted Access"}
                        </button>
                        <button onClick={() => setSubShowSummary(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">Back</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* Success Stories */}
          {tab === "Success Stories" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Success Stories ({successStories.length})</h3>
                <button onClick={() => setShowStoryForm(!showStoryForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: "hsl(210, 80%, 50%)" }}>
                  <Plus size={16} /> Add Story
                </button>
              </div>

              {showStoryForm && (
                <div className="p-6 border-b border-gray-100" style={{ background: "#F8FAFC" }}>
                  <h4 className="text-base font-bold text-gray-800 mb-4">Add Success Story</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Bride Name *</label>
                      <input type="text" value={storyForm.bride_name} onChange={e => setStoryForm(p => ({ ...p, bride_name: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Groom Name *</label>
                      <input type="text" value={storyForm.groom_name} onChange={e => setStoryForm(p => ({ ...p, groom_name: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">City *</label>
                      <input type="text" value={storyForm.city} onChange={e => setStoryForm(p => ({ ...p, city: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Story *</label>
                      <textarea value={storyForm.story} onChange={e => setStoryForm(p => ({ ...p, story: e.target.value }))} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Photo</label>
                      <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-gray-50">
                        <Upload size={16} className="text-gray-400" />
                        <span className="text-gray-500 truncate">{storyPhoto ? storyPhoto.name : "Choose photo"}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={e => setStoryPhoto(e.target.files?.[0] || null)} />
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addSuccessStory} disabled={savingStory} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60" style={{ background: "hsl(145, 65%, 42%)" }}>
                      {savingStory ? "Saving..." : "Add Story"}
                    </button>
                    <button onClick={() => setShowStoryForm(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                  </div>
                </div>
              )}

              <div className="p-4">
                {successStories.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">No success stories yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-gray-400 uppercase tracking-wider">
                          <th className="text-left py-3 px-4 font-semibold">Couple</th>
                          <th className="text-left py-3 px-4 font-semibold">City</th>
                          <th className="text-left py-3 px-4 font-semibold">Story</th>
                          <th className="text-left py-3 px-4 font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {successStories.map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-gray-800">{s.bride_name} ♥ {s.groom_name}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm">{s.city}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm max-w-[200px] truncate">{s.story}</td>
                            <td className="py-4 px-4"><StatusBadge status={s.status} /></td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {s.status !== "approved" && <button onClick={() => updateStoryStatus(s.id, "approved")} className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>Approve</button>}
                                {s.status !== "rejected" && <button onClick={() => updateStoryStatus(s.id, "rejected")} className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white" style={{ background: "hsl(0, 65%, 50%)" }}>Reject</button>}
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
          {tab === "Add Profiles" && (
            <AdminAddProfile onProfileAdded={fetchProfiles} />
          )}

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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredInterests.map((interest: any) => {
                        const fromName = interest.from_profile?.full_name || interest.from_user_id?.slice(0, 8) + "...";
                        const fromPhone = interest.from_profile?.phone || "";
                        const toName = interest.profiles?.full_name || "Unknown";
                        const isCompleted = interest.interest_type === "completed";
                        const isNotCompleted = interest.interest_type === "not_completed";
                        return (
                          <motion.div key={interest.id}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all"
                            style={{ background: isCompleted ? "hsl(145, 50%, 97%)" : isNotCompleted ? "hsl(0, 50%, 97%)" : "hsl(0, 0%, 100%)" }}
                            onClick={() => setSelectedProfile({ ...interest, _isInterestDetail: true } as any)}
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                {interest.profiles?.profile_photo_url ? (
                                  <img src={interest.profiles.profile_photo_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-400">{interest.profiles?.full_name?.[0] || "?"}</div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-800 truncate">{fromName} → {toName}</p>
                                <p className="text-xs text-gray-500">{new Date(interest.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                              </div>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0" style={{
                                background: isCompleted ? "hsl(145, 60%, 90%)" : isNotCompleted ? "hsl(0, 60%, 90%)" : interest.interest_type === "shortlist" ? "hsl(38, 90%, 93%)" : "hsl(340, 65%, 93%)",
                                color: isCompleted ? "hsl(145, 60%, 30%)" : isNotCompleted ? "hsl(0, 60%, 30%)" : interest.interest_type === "shortlist" ? "hsl(38, 90%, 35%)" : "hsl(340, 65%, 40%)"
                              }}>
                                {isCompleted ? "✓ Done" : isNotCompleted ? "✗ Not Done" : interest.interest_type === "shortlist" ? "⭐ Shortlist" : "❤️ Interest"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {fromPhone ? (
                                <a href={`https://wa.me/${fromPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${fromName}, you shortlisted the profile of ${toName}. Would you like more details about this profile? We can help you connect. - Kalyanasuthra Matrimony`)}`}
                                  target="_blank" rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                                  style={{ background: "hsl(142, 70%, 93%)", color: "hsl(142, 70%, 30%)" }}>
                                  📱 {fromPhone}
                                </a>
                              ) : <span className="text-xs text-gray-400">No phone</span>}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap" onClick={e => e.stopPropagation()}>
                              {!isCompleted && (
                                <button onClick={async () => {
                                  const { error } = await supabase.from("profile_interests").update({ interest_type: "completed" } as any).eq("id", interest.id);
                                  if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "completed" } : i)); toast({ title: "Marked as completed!" }); }
                                }} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "hsl(145, 65%, 92%)", color: "hsl(145, 65%, 30%)" }}>
                                  ✓ Completed
                                </button>
                              )}
                              {!isNotCompleted && (
                                <button onClick={async () => {
                                  const { error } = await supabase.from("profile_interests").update({ interest_type: "not_completed" } as any).eq("id", interest.id);
                                  if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "not_completed" } : i)); toast({ title: "Marked as not completed!" }); }
                                }} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "hsl(0, 65%, 93%)", color: "hsl(0, 65%, 35%)" }}>
                                  ✗ Not Completed
                                </button>
                              )}
                            </div>
                            {interest.admin_notes && (
                              <div className="mt-2 text-xs text-gray-500 italic border-t border-gray-100 pt-2">📝 {interest.admin_notes}</div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Interest Detail Modal */}
              {selectedProfile && (selectedProfile as any)._isInterestDetail && (() => {
                const interest = selectedProfile as any;
                const fromName = interest.from_profile?.full_name || interest.from_user_id?.slice(0, 8) + "...";
                const fromPhone = interest.from_profile?.phone || "";
                const toName = interest.profiles?.full_name || "Unknown";
                const [noteText, setNoteText] = useState(interest.admin_notes || "");
                const [savingNote, setSavingNote] = useState(false);
                return (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "hsla(0, 0%, 0%, 0.5)" }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
                      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800">Interest Details</h3>
                        <button onClick={() => setSelectedProfile(null)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-xl p-4 border border-gray-200" style={{ background: "hsl(210, 50%, 97%)" }}>
                            <p className="text-xs font-semibold text-gray-500 mb-1">From User</p>
                            <p className="text-sm font-bold text-gray-800">{fromName}</p>
                            {fromPhone && <p className="text-xs text-gray-500 mt-1">📱 {fromPhone}</p>}
                          </div>
                          <div className="rounded-xl p-4 border border-gray-200" style={{ background: "hsl(340, 50%, 97%)" }}>
                            <p className="text-xs font-semibold text-gray-500 mb-1">Interested In</p>
                            <p className="text-sm font-bold text-gray-800">{toName}</p>
                            <p className="text-xs text-gray-500 mt-1">{interest.profiles?.city || "—"} • {interest.profiles?.gender || "—"}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-xl p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Interest Type</p>
                            <p className="text-sm font-bold text-gray-800">{interest.interest_type === "shortlist" ? "⭐ Shortlisted" : interest.interest_type === "completed" ? "✓ Completed" : interest.interest_type === "not_completed" ? "✗ Not Completed" : "❤️ Interested"}</p>
                          </div>
                          <div className="rounded-xl p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Date</p>
                            <p className="text-sm font-bold text-gray-800">{new Date(interest.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                          </div>
                        </div>
                        {fromPhone && (
                          <a href={`https://wa.me/${fromPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${fromName}, you shortlisted the profile of ${toName}. Would you like more details about this profile? We can help you connect. - Kalyanasuthra Matrimony`)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                            style={{ background: "hsl(142, 65%, 42%)", color: "white" }}>
                            📱 Contact on WhatsApp
                          </a>
                        )}
                        <div className="flex gap-2">
                          <button onClick={async () => {
                            const { error } = await supabase.from("profile_interests").update({ interest_type: "completed" } as any).eq("id", interest.id);
                            if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "completed" } : i)); setSelectedProfile(null); toast({ title: "Marked as completed!" }); }
                          }} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "hsl(145, 65%, 42%)" }}>✓ Completed</button>
                          <button onClick={async () => {
                            const { error } = await supabase.from("profile_interests").update({ interest_type: "not_completed" } as any).eq("id", interest.id);
                            if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, interest_type: "not_completed" } : i)); setSelectedProfile(null); toast({ title: "Marked as not completed!" }); }
                          }} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "hsl(0, 55%, 50%)" }}>✗ Not Completed</button>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-600 mb-1.5">📝 Admin Note</label>
                          <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note about this interest..." rows={3}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                          <button disabled={savingNote} onClick={async () => {
                            setSavingNote(true);
                            const { error } = await supabase.from("profile_interests").update({ admin_notes: noteText } as any).eq("id", interest.id);
                            if (!error) { setInterests(prev => prev.map(i => i.id === interest.id ? { ...i, admin_notes: noteText } : i)); toast({ title: "Note saved!" }); }
                            setSavingNote(false);
                          }} className="mt-2 px-5 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-60" style={{ background: "hsl(210, 80%, 50%)" }}>
                            {savingNote ? "Saving..." : "Save Note"}
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
