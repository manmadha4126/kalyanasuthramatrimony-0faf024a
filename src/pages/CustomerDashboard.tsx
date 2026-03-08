import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Bell, Heart, Search, Star, LogOut, Home, Users, Settings, ChevronRight, ChevronDown, X, BookHeart, CheckCircle, Edit, Eye, HelpCircle, Phone, User, ArrowLeft, MessageCircle, MapPin, Clock, Filter, XCircle } from "lucide-react";
import BackButton from "@/components/BackButton";

type Profile = {
  id: string;full_name: string;gender: string;religion: string;caste: string | null;
  city: string | null;state: string | null;occupation: string | null;education: string | null;
  date_of_birth: string;profile_photo_url: string | null;annual_income: string | null;is_featured: boolean;
  profile_status?: string;phone?: string | null;email?: string | null;whatsapp?: string | null;
  marital_status?: string;mother_tongue?: string | null;height_cm?: number | null;
};

type UserProfileFull = {
  id: string;full_name: string;email: string | null;gender: string;profile_status?: string;
  profile_photo_url: string | null;subscription_type?: string;profile_id?: string | null;
};

type Preferences = {
  ageMin: string;ageMax: string;religion: string;caste: string;city: string;
  education: string;maritalStatus: string;motherTongue: string;
};

const defaultPreferences: Preferences = {
  ageMin: "", ageMax: "", religion: "", caste: "", city: "",
  education: "", maritalStatus: "", motherTongue: ""
};

const NAV = [
{ icon: Home, label: "Home" },
{ icon: Users, label: "Matches" },
{ icon: Search, label: "Preferences" },
{ icon: Heart, label: "Interests" },
{ icon: Settings, label: "Settings" }];


export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Profile[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfileFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [showUpgradePage, setShowUpgradePage] = useState(false);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [storyForm, setStoryForm] = useState({ bride_name: "", groom_name: "", city: "", story: "" });
  const [storyLoading, setStoryLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showHeaderDropdown, setShowHeaderDropdown] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [interests, setInterests] = useState<Profile[]>([]);
  const [interestsLoading, setInterestsLoading] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const saved = localStorage.getItem("matchPreferences");
    return saved ? JSON.parse(saved) : defaultPreferences;
  });
  const [prefApplied, setPrefApplied] = useState(() => {
    const saved = localStorage.getItem("matchPreferences");
    return !!saved;
  });
  const settingsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {checkAuth();}, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setShowSettingsDropdown(false);
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setShowHeaderDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {navigate("/login");return;}
    setUserId(user.id);
    const { data: pData } = await supabase.from("profiles").select("id,full_name,email,gender,profile_status,profile_photo_url,subscription_type,profile_id").eq("user_id", user.id).maybeSingle();
    if (pData) setUserProfile(pData as UserProfileFull);
    fetchMatches(pData?.gender || "Male");
    fetchInterests(user.id);
  };

  const fetchMatches = async (userGender: string) => {
    const targetGender = userGender === "Male" ? "Female" : "Male";
    const { data } = await supabase.from("profiles").select("id,full_name,gender,religion,caste,city,state,occupation,education,date_of_birth,profile_photo_url,annual_income,is_featured,phone,email,whatsapp,marital_status,mother_tongue,height_cm").eq("profile_status", "active").eq("gender", targetGender).limit(50);
    if (data) setMatches(data);
    setLoading(false);
  };

  const fetchInterests = async (uid: string) => {
    setInterestsLoading(true);
    const { data: interestData } = await supabase.
    from("profile_interests").
    select("to_profile_id").
    eq("from_user_id", uid);
    if (interestData && interestData.length > 0) {
      const profileIds = interestData.map((i) => i.to_profile_id);
      const { data: profilesData } = await supabase.
      from("profiles").
      select("id,full_name,gender,religion,caste,city,state,occupation,education,date_of_birth,profile_photo_url,annual_income,is_featured,phone,email,whatsapp").
      in("id", profileIds);
      if (profilesData) setInterests(profilesData);
    }
    setInterestsLoading(false);
  };

  const logout = async () => {await supabase.auth.signOut();navigate("/login");};
  const toggleShortlist = (id: string) => {setShortlisted((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);};
  const getAge = (dob: string) => Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const submitStory = async () => {
    if (!userId || !storyForm.bride_name || !storyForm.groom_name || !storyForm.city || !storyForm.story) return;
    setStoryLoading(true);
    const { error } = await supabase.from("success_stories").insert({
      bride_name: storyForm.bride_name, groom_name: storyForm.groom_name,
      city: storyForm.city, story: storyForm.story, created_by: userId
    });
    setStoryLoading(false);
    if (!error) {setShowStoryForm(false);setStoryForm({ bride_name: "", groom_name: "", city: "", story: "" });}
  };

  // Apply preferences filter
  const applyPreferences = () => {
    localStorage.setItem("matchPreferences", JSON.stringify(preferences));
    setPrefApplied(true);
    setActiveNav("Matches");
  };

  const clearPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem("matchPreferences");
    setPrefApplied(false);
  };

  const getFilteredMatches = () => {
    if (!prefApplied) return matches;
    return matches.filter((p) => {
      const age = getAge(p.date_of_birth);
      if (preferences.ageMin && age < parseInt(preferences.ageMin)) return false;
      if (preferences.ageMax && age > parseInt(preferences.ageMax)) return false;
      if (preferences.religion && p.religion.toLowerCase() !== preferences.religion.toLowerCase()) return false;
      if (preferences.caste && p.caste && !p.caste.toLowerCase().includes(preferences.caste.toLowerCase())) return false;
      if (preferences.city && p.city && !p.city.toLowerCase().includes(preferences.city.toLowerCase())) return false;
      if (preferences.education && p.education && !p.education.toLowerCase().includes(preferences.education.toLowerCase())) return false;
      if (preferences.maritalStatus && p.marital_status && p.marital_status.toLowerCase() !== preferences.maritalStatus.toLowerCase()) return false;
      if (preferences.motherTongue && p.mother_tongue && !p.mother_tongue.toLowerCase().includes(preferences.motherTongue.toLowerCase())) return false;
      return true;
    });
  };

  const filteredMatches = getFilteredMatches();

  const themeAccent = "hsl(160, 35%, 38%)";
  const themeDark = "hsl(160, 30%, 25%)";
  const themeLight = "hsl(160, 40%, 94%)";
  const themeMid = "hsl(160, 30%, 50%)";

  const profileId = userProfile?.profile_id || userProfile?.id?.slice(0, 8).toUpperCase() || "—";

  const settingsItems = [
  { icon: Edit, label: "Edit Profile", action: () => navigate(`/profile/${userProfile?.id}`) },
  { icon: Eye, label: "View Profile", action: () => navigate(`/profile/${userProfile?.id}`) },
  { icon: HelpCircle, label: "Help Us", action: () => window.location.href = "tel:+919553306667" },
  { icon: Phone, label: "Contact Us", action: () => setShowContactModal(true) },
  { icon: BookHeart, label: "Add Success Story", action: () => setShowStoryForm(true) },
  { icon: LogOut, label: "Logout", action: logout }];


  const headerMenuItems = [
  { icon: Edit, label: "Edit Profile", action: () => navigate(`/profile/${userProfile?.id}`) },
  { icon: Eye, label: "View Profile", action: () => navigate(`/profile/${userProfile?.id}`) },
  { icon: BookHeart, label: "Add Success Story", action: () => setShowStoryForm(true) },
  { icon: Search, label: "Preferences", action: () => setActiveNav("Preferences") },
  { icon: LogOut, label: "Logout", action: logout }];


  const renderProfileCard = (profile: Profile, i: number) =>
  <motion.div key={profile.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group">
      <div className="relative h-48 bg-gray-100">
        {profile.profile_photo_url ?
      <img src={profile.profile_photo_url} alt={profile.full_name} className="w-full h-full object-cover" /> :

      <div className="w-full h-full flex items-center justify-center" style={{ background: themeLight }}>
            <span className="text-4xl font-bold" style={{ color: themeAccent }}>{profile.full_name[0]}</span>
          </div>
      }
        {profile.is_featured &&
      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "hsl(42, 42%, 57%)", color: "white" }}>
            <Star size={9} className="fill-white" /> Featured
          </div>
      }
        <button onClick={() => toggleShortlist(profile.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all" style={{ background: "hsl(0, 0%, 100% / 0.9)" }}>
          <Heart size={15} style={{ color: shortlisted.includes(profile.id) ? themeAccent : "#ccc" }} className={shortlisted.includes(profile.id) ? "fill-current" : ""} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm">{profile.full_name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{getAge(profile.date_of_birth)} yrs • {profile.religion}{profile.caste ? ` • ${profile.caste}` : ""}</p>
        <div className="mt-2 space-y-0.5">
          {profile.occupation && <p className="text-xs text-gray-600">💼 {profile.occupation}</p>}
          {(profile.city || profile.state) && <p className="text-xs text-gray-500">📍 {[profile.city, profile.state].filter(Boolean).join(", ")}</p>}
          {profile.annual_income && <p className="text-xs text-gray-500">💰 {profile.annual_income}</p>}
          {userProfile?.subscription_type === "assisted" && profile.phone && <p className="text-xs text-gray-600">📞 {profile.phone}</p>}
          {userProfile?.subscription_type === "assisted" && profile.email && <p className="text-xs text-gray-600">✉️ {profile.email}</p>}
          {userProfile?.subscription_type !== "assisted" &&
        <p className="text-[10px] mt-1 px-2 py-1 rounded-md" style={{ background: "hsl(38, 90%, 95%)", color: "hsl(38, 70%, 35%)" }}>🔒 Upgrade to see contact details</p>
        }
        </div>
        <button onClick={() => navigate(`/profile/${profile.id}`)} className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: themeLight, color: themeDark }}>
          View Profile
        </button>
      </div>
    </motion.div>;


  // Sidebar component (reused in upgrade page)
  const renderSidebar = () =>
  <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 py-5 px-4 fixed top-0 left-0 h-screen overflow-hidden z-30" style={{ background: "linear-gradient(180deg, hsl(160, 25%, 93%) 0%, hsl(155, 20%, 95%) 100%)", borderRight: "1px solid hsl(160, 20%, 88%)" }}>
      {/* Brand Name */}
      <div className="text-center mb-3">
        <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.5rem", background: "linear-gradient(135deg, hsl(340, 65%, 47%), hsl(280, 50%, 50%), hsl(210, 70%, 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kalyanasuthra</h2>
      </div>
      {/* Profile Photo 3.5x3.5 size + Name + ID */}
      <div className="flex flex-col items-center gap-2 mb-5 px-2 py-4 rounded-xl" style={{ background: "hsl(160, 20%, 90%)" }}>
        <div className="w-[140px] h-[140px] rounded-xl overflow-hidden flex-shrink-0 border-2" style={{ borderColor: themeAccent }}>
          {userProfile?.profile_photo_url ?
        <img src={userProfile.profile_photo_url} alt="" className="w-full h-full object-cover" /> :

        <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl" style={{ background: themeAccent }}>
              {userProfile?.full_name?.[0] || "U"}
            </div>
        }
        </div>
        <p className="text-sm font-semibold text-center truncate w-full" style={{ color: themeDark }}>{userProfile?.full_name || "User"}</p>
        <p className="text-sm font-bold tracking-wide" style={{ color: themeDark }}>ID: {profileId}</p>
        {userProfile?.profile_status === "active" ?
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "hsl(145, 50%, 90%)", color: "hsl(145, 50%, 30%)" }}>
            <CheckCircle size={12} /> Verified
          </span> :

      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "hsl(38, 90%, 92%)", color: "hsl(38, 70%, 40%)" }}>
            <XCircle size={12} /> Not Verified
          </span>
      }
      </div>

      <nav className="space-y-1 flex-1">
        {NAV.map(({ icon: Icon, label }) => {
        if (label === "Settings") {
          return (
            <div key={label} ref={settingsRef} className="relative">
                <motion.button whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} onClick={() => setShowSettingsDropdown((p) => !p)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all" style={showSettingsDropdown ? { background: themeAccent, color: "white" } : { color: themeDark, background: "transparent" }}>
                  <Icon size={16} /> {label}
                  <ChevronDown size={14} className={`ml-auto transition-transform ${showSettingsDropdown ? "rotate-180" : ""}`} />
                </motion.button>
                <AnimatePresence>
                  {showSettingsDropdown &&
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden ml-3 mt-1">
                      {settingsItems.map((item) =>
                  <button key={item.label} onClick={() => {item.action();setShowSettingsDropdown(false);}} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors hover:bg-white/60" style={{ color: item.label === "Logout" ? "hsl(0, 60%, 50%)" : themeDark }}>
                          <item.icon size={13} /> {item.label}
                        </button>
                  )}
                    </motion.div>
                }
                </AnimatePresence>
              </div>);

        }
        return (
          <motion.button key={label} whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} onClick={() => setActiveNav(label)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all" style={activeNav === label ? { background: themeAccent, color: "white", boxShadow: `0 4px 12px hsl(160, 35%, 38% / 0.3)` } : { color: themeDark, background: "transparent" }}>
              <Icon size={16} /> {label}
              {label === "Preferences" && prefApplied &&
            <span className="ml-auto w-2 h-2 rounded-full" style={{ background: "hsl(38, 90%, 50%)" }} />
            }
            </motion.button>);

      })}
      </nav>

      <motion.button whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} onClick={() => setShowUpgradePage(true)} className="mt-4 w-full rounded-xl p-3 text-left" style={{ background: `linear-gradient(135deg, ${themeAccent}, hsl(170, 40%, 35%))` }}>
        <div className="flex items-center gap-2 mb-1">
          <Star size={13} className="text-yellow-300 fill-yellow-300" />
          <span className="text-white text-[11px] font-bold uppercase tracking-wide">Upgrade</span>
        </div>
        <p className="text-white/80 text-[10px] leading-snug">Assisted Matrimony Services</p>
      </motion.button>
    </aside>;


  // If upgrade page is shown, render full page
  if (showUpgradePage) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "hsl(160, 15%, 97%)" }}>
        {renderSidebar()}
        <div className="flex-1 lg:ml-64 overflow-auto">
          <div className="fixed top-0 right-0 left-0 lg:left-64 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
            <button onClick={() => setShowUpgradePage(false)} className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: themeAccent }}>
              <ArrowLeft size={18} /> Back to Dashboard
            </button>
          </div>
          <div className="p-6 pt-20 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <h1 className="text-2xl font-bold text-gray-800">Assisted Matrimony Services</h1>
              </div>
              <p className="text-sm text-gray-500">Choose the plan that suits you best</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
              { title: "Support Matrimony", plans: [{ price: "₹13,000", period: "3 Months" }, { price: "₹20,000", period: "6 Months" }], features: ["Unlimited profiles", "Weekly mail updates", "Profile processing"], highlight: false },
              { title: "Affluent Matrimony", plans: [{ price: "₹38,000", period: "Premium" }], features: ["Unlimited profiles", "Dedicated Relationship Manager", "Daily feedback", "Personal enquiry", "Up to settlement", "Well-settled profiles"], highlight: true },
              { title: "Online Services", plans: [{ price: "₹7,000", period: "3 Months" }, { price: "₹10,000", period: "6 Months" }, { price: "₹15,000", period: "1 Year" }], features: ["Full online access", "Profile browsing", "Direct connect"], highlight: false }].
              map((pkg, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-6 border-2 transition-all hover:shadow-lg" style={pkg.highlight ? { borderColor: themeAccent, background: themeLight } : { borderColor: "hsl(0,0%,90%)", background: "white" }}>
                  {pkg.highlight && <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: themeAccent }}>★ Most Popular</div>}
                  <h3 className="font-bold text-lg text-gray-800 mb-4">{pkg.title}</h3>
                  <div className="space-y-1 mb-5">
                    {pkg.plans.map((p, j) =>
                  <div key={j} className="flex items-baseline gap-1">
                        <span className="font-bold text-xl" style={{ color: themeDark }}>{p.price}</span>
                        <span className="text-xs text-gray-400">/ {p.period}</span>
                      </div>
                  )}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f) =>
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: themeAccent }}></span>
                        {f}
                      </li>
                  )}
                  </ul>
                  <a href={`https://wa.me/919553306667?text=${encodeURIComponent(`Hello! I'm interested in the ${pkg.title} plan. Please provide more details.`)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-all hover:scale-[1.02]" style={pkg.highlight ? { background: themeAccent, color: "white" } : { background: themeLight, color: themeDark }}>
                    Get Consultation
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "hsl(160, 15%, 97%)" }}>
      {renderSidebar()}

      {/* Main */}
      <div className="flex-1 lg:ml-64 overflow-auto">
        {/* Fixed header */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <BackButton to="/" label="Home" />
            </div>
            <nav className="hidden lg:flex items-center gap-1 mx-auto">
              {["Home", "Matches", "Preferences"].map((item) =>
              <button key={item} onClick={() => setActiveNav(item)} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all" style={activeNav === item ? { color: themeDark, background: themeLight } : { color: "#888" }}>
                  {item}
                </button>
              )}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell size={16} className="text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: themeAccent }}></span>
              </button>
              <div ref={headerRef} className="relative">
                <button onClick={() => setShowHeaderDropdown((p) => !p)} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full pl-1 pr-3 py-1 hover:bg-gray-100 transition-colors">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    {userProfile?.profile_photo_url ?
                    <img src={userProfile.profile_photo_url} alt="" className="w-full h-full object-cover" /> :

                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{ background: themeAccent }}>
                        {userProfile?.full_name?.[0] || "U"}
                      </div>
                    }
                  </div>
                  <span className="text-xs font-semibold text-gray-700 hidden sm:block">{userProfile?.full_name?.split(" ")[0] || "User"}</span>
                  <ChevronDown size={12} className="text-gray-400" />
                </button>
                <AnimatePresence>
                  {showHeaderDropdown &&
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-3 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs font-semibold text-gray-800">{userProfile?.full_name}</p>
                        <p className="text-[10px] text-gray-400">ID: {profileId}</p>
                      </div>
                      {headerMenuItems.map((item) =>
                    <button key={item.label} onClick={() => {item.action();setShowHeaderDropdown(false);}} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50" style={{ color: item.label === "Logout" ? "hsl(0, 60%, 50%)" : "#444" }}>
                          <item.icon size={13} /> {item.label}
                        </button>
                    )}
                    </motion.div>
                  }
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 pt-20">
          {/* Profile Status Banner */}
          {userProfile?.profile_status && userProfile.profile_status !== "active" &&
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-xl p-4 my-[29px] mx-[230px] px-[16px] flex-col flex items-center justify-center gap-[15px]" style={
          userProfile.profile_status === "pending" ?
          { background: "hsl(38, 90%, 95%)", border: "1px solid hsl(38, 80%, 85%)" } :
          { background: "hsl(0, 65%, 96%)", border: "1px solid hsl(0, 55%, 88%)" }
          }>
              <div className="w-3 h-3 rounded-full animate-pulse flex-shrink-0 text-destructive" style={{ background: userProfile.profile_status === "pending" ? "hsl(38, 90%, 50%)" : "hsl(0, 65%, 50%)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: userProfile.profile_status === "pending" ? "hsl(38, 70%, 30%)" : "hsl(0, 55%, 35%)" }}>
                  {userProfile.profile_status === "pending" ? "Profile Status: Pending Verification" : `Profile Status: ${userProfile.profile_status.charAt(0).toUpperCase() + userProfile.profile_status.slice(1)}`}
                </p>
                <p className="text-xs mt-0.5" style={{ color: userProfile.profile_status === "pending" ? "hsl(38, 50%, 40%)" : "hsl(0, 40%, 45%)" }}>
                  {userProfile.profile_status === "pending" ? "Our team is reviewing your profile. You will be notified once verified." : "Please contact support for more information."}
                </p>
              </div>
            </motion.div>
          }

          {userProfile?.profile_status === "active" &&
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-xl p-3 flex items-center gap-2" style={{ background: "hsl(145, 55%, 95%)", border: "1px solid hsl(145, 45%, 85%)" }}>
              <CheckCircle size={16} style={{ color: "hsl(145, 65%, 38%)" }} />
              <span className="text-xs font-semibold" style={{ color: "hsl(145, 50%, 28%)" }}>Profile Verified ✓</span>
            </motion.div>
          }

          {/* Interests Section */}
          {activeNav === "Interests" &&
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <Heart size={22} style={{ color: themeAccent }} className="fill-current" /> My Interests
              </h1>
              <p className="text-sm text-gray-500 mb-6">Profiles you've shown interest in</p>
              {interestsLoading ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />)}
                </div> :
            interests.length === 0 ?
            <div className="text-center py-16 text-gray-400">
                  <Heart size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No interests yet</p>
                  <p className="text-sm mt-1">Browse matches and express interest in profiles you like</p>
                </div> :

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {interests.map((profile, i) => renderProfileCard(profile, i))}
                </div>
            }
            </motion.div>
          }

          {/* Home content */}
          {activeNav === "Home" &&
          <>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Welcome back, <span style={{ color: themeDark }}>{userProfile?.full_name?.split(" ")[0] || "Friend"}</span> 👋
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {prefApplied ? "Showing matches based on your preferences" : "Here are your recommended matches"}
                </p>
              </motion.div>

              {/* Subscription Details or Upgrade CTA */}
              {userProfile?.subscription_type === "assisted" ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 rounded-2xl overflow-hidden" style={{ border: "2px solid hsl(160, 35%, 38%)" }}>
                  <div className="p-4 sm:p-5" style={{ background: `linear-gradient(135deg, ${themeAccent}, hsl(170, 40%, 35%))` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Star size={16} className="text-yellow-300 fill-yellow-300" />
                      <span className="text-yellow-200 text-xs font-bold uppercase tracking-wider">Active Subscription</span>
                    </div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Assisted Matrimony Service</h3>
                  </div>
                  <div className="p-4 sm:p-5 space-y-3" style={{ background: "hsl(160, 30%, 97%)" }}>
                    <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "hsl(160, 20%, 88%)" }}>
                      <span className="text-sm font-medium" style={{ color: "hsl(0, 0%, 45%)" }}>Plan Status</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "hsl(145, 55%, 90%)", color: "hsl(145, 55%, 28%)" }}>Active</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "hsl(160, 20%, 88%)" }}>
                      <span className="text-sm font-medium" style={{ color: "hsl(0, 0%, 45%)" }}>Access Type</span>
                      <span className="text-sm font-bold" style={{ color: themeDark }}>Assisted Access</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium" style={{ color: "hsl(0, 0%, 45%)" }}>Benefits</span>
                      <span className="text-sm font-bold" style={{ color: themeDark }}>Full Contact Details Visible</span>
                    </div>
                    <div className="mt-2 rounded-xl p-3 flex items-center gap-2" style={{ background: "hsl(145, 50%, 93%)" }}>
                      <CheckCircle size={14} style={{ color: "hsl(145, 55%, 35%)" }} />
                      <span className="text-xs font-semibold" style={{ color: "hsl(145, 50%, 25%)" }}>You can view phone, email & WhatsApp of all profiles</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onClick={() => setShowUpgradePage(true)} className="mb-6 rounded-2xl p-4 sm:p-5 cursor-pointer hover:scale-[1.01] transition-transform" style={{ background: `linear-gradient(135deg, ${themeAccent}, hsl(170, 40%, 35%))` }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={16} className="text-yellow-300 fill-yellow-300" />
                        <span className="text-yellow-200 text-xs font-bold uppercase tracking-wider">Premium Service</span>
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">Upgrade Assisted Matrimony Services</h3>
                      <p className="text-white/70 text-xs mt-1">Get a dedicated Relationship Manager, daily feedback & faster matches</p>
                    </div>
                    <ChevronRight size={24} className="text-white/60 hidden sm:block" />
                  </div>
                </motion.div>
              )}

              {/* Matches - show only 5 on Home */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <Heart size={18} style={{ color: themeAccent }} className="fill-current" />
                      Your Matches
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {prefApplied ? `${filteredMatches.length} matches based on your preferences` : userProfile?.gender === "Male" ? "Showing female profiles for you" : "Showing male profiles for you"}
                    </p>
                  </div>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveNav("Matches")} className="text-xs font-bold px-4 py-2 rounded-xl transition-colors border-2" style={{ color: themeAccent, background: themeLight, borderColor: themeAccent }}>
                    View All →
                  </motion.button>
                </div>

                {loading ?
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, i) => <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />)}
                  </div> :
              filteredMatches.length === 0 ?
              <div className="text-center py-16 text-gray-400">
                    <Users size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No matches found</p>
                    <p className="text-sm mt-1">{prefApplied ? "Try adjusting your preferences" : "Our team is curating profiles for you"}</p>
                    {prefApplied &&
                <button onClick={() => setActiveNav("Preferences")} className="mt-3 text-xs font-semibold px-4 py-2 rounded-lg" style={{ background: themeLight, color: themeDark }}>
                        Edit Preferences
                      </button>
                }
                  </div> :

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {filteredMatches.slice(0, 5).map((profile, i) => renderProfileCard(profile, i))}
                  </div>
              }
              </motion.div>

              {/* Submit Success Story Button */}
              <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowStoryForm(true)}
              className="mb-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{ background: "hsl(170, 45%, 92%)", color: "hsl(170, 50%, 30%)", border: "1px solid hsl(170, 40%, 80%)" }}>
              
                <BookHeart size={16} /> Share Your Success Story
              </motion.button>
            </>
          }

          {/* Matches tab - show all */}
          {activeNav === "Matches" &&
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">All Matches</h1>
                {prefApplied &&
              <button onClick={() => setActiveNav("Preferences")} className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ background: themeLight, color: themeDark }}>
                    <Filter size={12} /> Edit Preferences
                  </button>
              }
              </div>
              <p className="text-sm text-gray-500 mb-6">
                {prefApplied ? `${filteredMatches.length} matches based on your preferences` : userProfile?.gender === "Male" ? "Showing female profiles for you" : "Showing male profiles for you"}
              </p>
              {loading ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />)}
                </div> :
            filteredMatches.length === 0 ?
            <div className="text-center py-16 text-gray-400">
                  <Users size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No matches found</p>
                  {prefApplied && <p className="text-sm mt-1">Try adjusting your preferences</p>}
                </div> :

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredMatches.map((profile, i) => renderProfileCard(profile, i))}
                </div>
            }
            </motion.div>
          }

          {/* Preferences tab */}
          {activeNav === "Preferences" &&
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <Filter size={22} style={{ color: themeAccent }} /> Match Preferences
              </h1>
              <p className="text-sm text-gray-500 mb-6">Set your preferences to find the perfect match</p>

              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Min Age</label>
                    <input type="number" value={preferences.ageMin} onChange={(e) => setPreferences((p) => ({ ...p, ageMin: e.target.value }))} placeholder="e.g. 21" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Max Age</label>
                    <input type="number" value={preferences.ageMax} onChange={(e) => setPreferences((p) => ({ ...p, ageMax: e.target.value }))} placeholder="e.g. 30" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Religion</label>
                    <select value={preferences.religion} onChange={(e) => setPreferences((p) => ({ ...p, religion: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white">
                      <option value="">Any</option>
                      <option>Hindu</option>
                      <option>Muslim</option>
                      <option>Christian</option>
                      <option>Sikh</option>
                      <option>Jain</option>
                      <option>Buddhist</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Caste</label>
                    <input type="text" value={preferences.caste} onChange={(e) => setPreferences((p) => ({ ...p, caste: e.target.value }))} placeholder="e.g. Reddy, Kamma" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                    <input type="text" value={preferences.city} onChange={(e) => setPreferences((p) => ({ ...p, city: e.target.value }))} placeholder="e.g. Hyderabad" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Education</label>
                    <select value={preferences.education} onChange={(e) => setPreferences((p) => ({ ...p, education: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white">
                      <option value="">Any</option>
                      <option>B.Tech / B.E</option>
                      <option>M.Tech / M.E</option>
                      <option>MBA / PGDM</option>
                      <option>MBBS / MD</option>
                      <option>B.Com / M.Com</option>
                      <option>CA / ICWA</option>
                      <option>B.Sc / M.Sc</option>
                      <option>PhD</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Marital Status</label>
                    <select value={preferences.maritalStatus} onChange={(e) => setPreferences((p) => ({ ...p, maritalStatus: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white">
                      <option value="">Any</option>
                      <option>Never Married</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                      <option>Separated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Mother Tongue</label>
                    <select value={preferences.motherTongue} onChange={(e) => setPreferences((p) => ({ ...p, motherTongue: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white">
                      <option value="">Any</option>
                      <option>Telugu</option>
                      <option>Tamil</option>
                      <option>Kannada</option>
                      <option>Malayalam</option>
                      <option>Hindi</option>
                      <option>Urdu</option>
                      <option>Marathi</option>
                      <option>Bengali</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button onClick={applyPreferences} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]" style={{ background: themeAccent }}>
                    Apply Preferences & View Matches
                  </button>
                  {prefApplied &&
                <button onClick={clearPreferences} className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all" style={{ background: "hsl(0, 65%, 95%)", color: "hsl(0, 55%, 45%)" }}>
                      Clear
                    </button>
                }
                </div>

                {prefApplied &&
              <p className="text-xs text-center mt-3" style={{ color: themeMid }}>
                    ✓ Preferences saved — {filteredMatches.length} matching profiles found
                  </p>
              }
              </div>
            </motion.div>
          }
        </div>
      </div>

      {/* Contact Details Modal */}
      {showContactModal &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "hsl(0, 0%, 0% / 0.5)" }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-sm w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">Contact Us</h2>
              <button onClick={() => setShowContactModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><X size={16} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <a href="tel:+919553306667" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors" style={{ border: "1px solid hsl(0,0%,90%)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: themeLight }}>
                  <Phone size={18} style={{ color: themeAccent }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Call Us</p>
                  <p className="text-xs text-gray-500">+91 95533 06667</p>
                </div>
              </a>
              <a href="https://wa.me/919553306667" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors" style={{ border: "1px solid hsl(0,0%,90%)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(134, 60%, 93%)" }}>
                  <MessageCircle size={18} style={{ color: "hsl(134, 60%, 35%)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">WhatsApp</p>
                  <p className="text-xs text-gray-500">+91 95533 06667</p>
                </div>
              </a>
              <a href="mailto:kalyanasuthra@gmail.com" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors" style={{ border: "1px solid hsl(0,0%,90%)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(210, 60%, 93%)" }}>
                  <Eye size={18} style={{ color: "hsl(210, 60%, 40%)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Email</p>
                  <p className="text-xs text-gray-500">kalyanasuthra@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ border: "1px solid hsl(0,0%,90%)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(30, 60%, 93%)" }}>
                  <Clock size={18} style={{ color: "hsl(30, 60%, 40%)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Working Hours</p>
                  <p className="text-xs text-gray-500">Mon - Sat: 9 AM - 7 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      }

      {/* Success Story Modal */}
      {showStoryForm &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "hsl(0, 0%, 0% / 0.5)" }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">Share Your Success Story</h2>
              <button onClick={() => setShowStoryForm(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><X size={16} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Bride Name</label>
                <input value={storyForm.bride_name} onChange={(e) => setStoryForm((p) => ({ ...p, bride_name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Groom Name</label>
                <input value={storyForm.groom_name} onChange={(e) => setStoryForm((p) => ({ ...p, groom_name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                <input value={storyForm.city} onChange={(e) => setStoryForm((p) => ({ ...p, city: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Your Story</label>
                <textarea value={storyForm.story} onChange={(e) => setStoryForm((p) => ({ ...p, story: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none resize-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <button onClick={submitStory} disabled={storyLoading} className="w-full py-2.5 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-60" style={{ background: themeAccent }}>
                {storyLoading ? "Submitting..." : "Submit Story"}
              </button>
              <p className="text-[10px] text-gray-400 text-center">Your story will be reviewed before publishing.</p>
            </div>
          </motion.div>
        </div>
      }
    </div>);

}