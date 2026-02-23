import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Bell, Heart, Search, Star, LogOut, Home, Users, Settings, ChevronRight, X, BookHeart, CheckCircle } from "lucide-react";
import BackButton from "@/components/BackButton";

type Profile = {
  id: string; full_name: string; gender: string; religion: string; caste: string | null;
  city: string | null; state: string | null; occupation: string | null; education: string | null;
  date_of_birth: string; profile_photo_url: string | null; annual_income: string | null; is_featured: boolean;
  profile_status?: string;
};

type UserProfile = { full_name: string; email: string | null; gender: string; profile_status?: string };

const NAV = [
  { icon: Home, label: "Home" },
  { icon: Users, label: "Matches" },
  { icon: Search, label: "Preferences" },
  { icon: Settings, label: "Settings" },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Profile[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [storyForm, setStoryForm] = useState({ bride_name: "", groom_name: "", city: "", story: "" });
  const [storyLoading, setStoryLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => { checkAuth(); }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/login"); return; }
    setUserId(user.id);
    const { data: pData } = await supabase.from("profiles").select("full_name,email,gender,profile_status").eq("user_id", user.id).maybeSingle();
    if (pData) setUserProfile(pData);
    fetchMatches(pData?.gender || "Male");
  };

  const fetchMatches = async (userGender: string) => {
    const targetGender = userGender === "Male" ? "Female" : "Male";
    const { data } = await supabase.from("profiles").select("id,full_name,gender,religion,caste,city,state,occupation,education,date_of_birth,profile_photo_url,annual_income,is_featured").eq("profile_status", "active").eq("gender", targetGender).limit(20);
    if (data) setMatches(data);
    setLoading(false);
  };

  const logout = async () => { await supabase.auth.signOut(); navigate("/login"); };
  const toggleShortlist = (id: string) => { setShortlisted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); };
  const getAge = (dob: string) => Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const submitStory = async () => {
    if (!userId || !storyForm.bride_name || !storyForm.groom_name || !storyForm.city || !storyForm.story) return;
    setStoryLoading(true);
    const { error } = await supabase.from("success_stories").insert({
      bride_name: storyForm.bride_name,
      groom_name: storyForm.groom_name,
      city: storyForm.city,
      story: storyForm.story,
      created_by: userId,
    });
    setStoryLoading(false);
    if (!error) {
      setShowStoryForm(false);
      setStoryForm({ bride_name: "", groom_name: "", city: "", story: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "hsl(220, 20%, 97%)" }}>
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 py-6 px-4" style={{ background: "linear-gradient(180deg, hsl(300, 15%, 88%) 0%, hsl(310, 20%, 92%) 100%)", borderRight: "1px solid hsl(300, 15%, 82%)" }}>
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--burgundy))" }}>
            <span className="text-white font-serif font-bold text-sm">K</span>
          </div>
          <span className="font-serif text-sm font-bold leading-tight" style={{ color: "hsl(var(--burgundy))" }}>Kalyanasuthra</span>
        </div>
        <nav className="space-y-1 flex-1">
          {NAV.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => setActiveNav(label)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all" style={activeNav === label ? { background: "hsl(var(--burgundy))", color: "white", boxShadow: "0 4px 12px hsl(var(--burgundy) / 0.3)" } : { color: "hsl(var(--burgundy))", background: "transparent" }}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <button onClick={() => setShowUpgrade(true)} className="mt-4 w-full rounded-xl p-3 text-left transition-all hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, hsl(var(--burgundy)), hsl(var(--deep-rose, 348 50% 37%)))" }}>
          <div className="flex items-center gap-2 mb-1">
            <Star size={13} className="text-yellow-300 fill-yellow-300" />
            <span className="text-white text-[11px] font-bold uppercase tracking-wide">Upgrade</span>
          </div>
          <p className="text-white/80 text-[10px] leading-snug">Assisted Matrimony Services</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-white text-[10px] font-semibold">Explore Plans</span>
            <ChevronRight size={12} className="text-white/60" />
          </div>
        </button>
        <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-xs font-medium mt-3 rounded-lg transition-colors" style={{ color: "hsl(var(--burgundy) / 0.7)" }}>
          <LogOut size={14} /> Sign Out
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <BackButton to="/" label="Home" />
            </div>
            <div className="lg:hidden flex items-center gap-2 ml-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--burgundy))" }}>
                <span className="text-white font-serif font-bold text-xs">K</span>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-1 mx-auto">
              {["Home", "Matches", "Preferences"].map(item => (
                <button key={item} onClick={() => setActiveNav(item)} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all" style={activeNav === item ? { color: "hsl(var(--burgundy))", background: "hsl(var(--burgundy-light))" } : { color: "#888" }}>
                  {item}
                </button>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell size={16} className="text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400"></span>
              </button>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full pl-1 pr-3 py-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "hsl(var(--burgundy))" }}>
                  {userProfile?.full_name?.[0] || "U"}
                </div>
                <span className="text-xs font-semibold text-gray-700 hidden sm:block">{userProfile?.full_name?.split(" ")[0] || "User"}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Profile Status Banner */}
          {userProfile?.profile_status && userProfile.profile_status !== "active" && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-xl p-4 flex items-center gap-3" style={
              userProfile.profile_status === "pending"
                ? { background: "hsl(38, 90%, 95%)", border: "1px solid hsl(38, 80%, 85%)" }
                : { background: "hsl(0, 65%, 96%)", border: "1px solid hsl(0, 55%, 88%)" }
            }>
              <div className="w-3 h-3 rounded-full animate-pulse flex-shrink-0" style={{ background: userProfile.profile_status === "pending" ? "hsl(38, 90%, 50%)" : "hsl(0, 65%, 50%)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: userProfile.profile_status === "pending" ? "hsl(38, 70%, 30%)" : "hsl(0, 55%, 35%)" }}>
                  {userProfile.profile_status === "pending" ? "Profile Status: Pending Verification" : `Profile Status: ${userProfile.profile_status.charAt(0).toUpperCase() + userProfile.profile_status.slice(1)}`}
                </p>
                <p className="text-xs mt-0.5" style={{ color: userProfile.profile_status === "pending" ? "hsl(38, 50%, 40%)" : "hsl(0, 40%, 45%)" }}>
                  {userProfile.profile_status === "pending" ? "Our team is reviewing your profile. You will be notified once verified." : "Please contact support for more information."}
                </p>
              </div>
            </motion.div>
          )}

          {userProfile?.profile_status === "active" && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-xl p-3 flex items-center gap-2" style={{ background: "hsl(145, 55%, 95%)", border: "1px solid hsl(145, 45%, 85%)" }}>
              <CheckCircle size={16} style={{ color: "hsl(145, 65%, 38%)" }} />
              <span className="text-xs font-semibold" style={{ color: "hsl(145, 50%, 28%)" }}>Profile Verified ✓</span>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-800">
              Welcome back, <span style={{ color: "hsl(var(--burgundy))" }}>{userProfile?.full_name?.split(" ")[0] || "Friend"}</span> 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">Here are your recommended matches</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onClick={() => setShowUpgrade(true)} className="mb-6 rounded-2xl p-4 sm:p-5 cursor-pointer hover:scale-[1.01] transition-transform" style={{ background: "linear-gradient(135deg, hsl(var(--burgundy)), hsl(340, 50%, 35%))" }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star size={16} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-yellow-200 text-xs font-bold uppercase tracking-wider">Premium Service</span>
                </div>
                <h3 className="text-white font-serif font-bold text-base sm:text-lg">Upgrade Assisted Matrimony Services</h3>
                <p className="text-white/70 text-xs mt-1">Get a dedicated Relationship Manager, daily feedback & faster matches</p>
              </div>
              <ChevronRight size={24} className="text-white/60 hidden sm:block" />
            </div>
          </motion.div>

          {/* Submit Success Story Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => setShowStoryForm(true)}
            className="mb-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "hsl(170, 45%, 92%)", color: "hsl(170, 50%, 30%)", border: "1px solid hsl(170, 40%, 80%)" }}
          >
            <BookHeart size={16} /> Share Your Success Story
          </motion.button>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />)}
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No matches found yet</p>
              <p className="text-sm mt-1">Our team is curating profiles for you</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {matches.map((profile, i) => (
                <motion.div key={profile.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="relative h-48 bg-gray-100">
                    {profile.profile_photo_url ? (
                      <img src={profile.profile_photo_url} alt={profile.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: "hsl(var(--burgundy-light))" }}>
                        <span className="text-4xl font-serif font-bold" style={{ color: "hsl(var(--burgundy))" }}>{profile.full_name[0]}</span>
                      </div>
                    )}
                    {profile.is_featured && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "hsl(42, 42%, 57%)", color: "white" }}>
                        <Star size={9} className="fill-white" /> Featured
                      </div>
                    )}
                    <button onClick={() => toggleShortlist(profile.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all" style={{ background: "hsl(0, 0%, 100% / 0.9)" }}>
                      <Heart size={15} style={{ color: shortlisted.includes(profile.id) ? "hsl(var(--burgundy))" : "#ccc" }} className={shortlisted.includes(profile.id) ? "fill-current" : ""} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-gray-800 text-sm">{profile.full_name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{getAge(profile.date_of_birth)} yrs • {profile.religion}{profile.caste ? ` • ${profile.caste}` : ""}</p>
                    <div className="mt-2 space-y-0.5">
                      {profile.occupation && <p className="text-xs text-gray-600">💼 {profile.occupation}</p>}
                      {(profile.city || profile.state) && <p className="text-xs text-gray-500">📍 {[profile.city, profile.state].filter(Boolean).join(", ")}</p>}
                      {profile.annual_income && <p className="text-xs text-gray-500">💰 {profile.annual_income}</p>}
                    </div>
                    <button onClick={() => navigate(`/profile/${profile.id}`)} className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: "hsl(var(--burgundy-light))", color: "hsl(var(--burgundy))" }}>
                      View Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "hsl(0, 0%, 0% / 0.5)" }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="font-serif font-bold text-gray-800">Assisted Matrimony Services</h2>
                <p className="text-xs text-gray-400">Choose the plan that suits you best</p>
              </div>
              <button onClick={() => setShowUpgrade(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Support Matrimony", plans: [{ price: "₹13,000", period: "3 Months" }, { price: "₹20,000", period: "6 Months" }], features: ["Unlimited profiles", "Weekly mail updates", "Profile processing"], highlight: false },
                { title: "Affluent Matrimony", plans: [{ price: "₹38,000", period: "Premium" }], features: ["Unlimited profiles", "Dedicated Relationship Manager", "Daily feedback", "Personal enquiry", "Up to settlement", "Well-settled profiles"], highlight: true },
                { title: "Online Services", plans: [{ price: "₹7,000", period: "3 Months" }, { price: "₹10,000", period: "6 Months" }, { price: "₹15,000", period: "1 Year" }], features: ["Full online access", "Profile browsing", "Direct connect"], highlight: false },
              ].map((pkg, i) => (
                <div key={i} className="rounded-xl p-5 border-2 transition-all" style={pkg.highlight ? { borderColor: "hsl(var(--burgundy))", background: "hsl(var(--burgundy-light))" } : { borderColor: "hsl(var(--border))", background: "white" }}>
                  {pkg.highlight && <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--burgundy))" }}>★ Most Popular</div>}
                  <h3 className="font-serif font-bold text-gray-800 mb-3">{pkg.title}</h3>
                  <div className="space-y-1 mb-4">
                    {pkg.plans.map((p, j) => (
                      <div key={j} className="flex items-baseline gap-1">
                        <span className="font-bold text-lg" style={{ color: "hsl(var(--burgundy))" }}>{p.price}</span>
                        <span className="text-xs text-gray-400">/ {p.period}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-1.5 mb-5">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "hsl(var(--burgundy))" }}></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={`https://wa.me/919553306667?text=${encodeURIComponent(`Hello! I'm interested in the ${pkg.title} plan. Please provide more details.`)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-2 rounded-lg text-center text-xs font-semibold transition-all" style={pkg.highlight ? { background: "hsl(var(--burgundy))", color: "white" } : { background: "hsl(var(--burgundy-light))", color: "hsl(var(--burgundy))" }}>
                    Get Consultation
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Story Submission Modal */}
      {showStoryForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "hsl(0, 0%, 0% / 0.5)" }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-serif font-bold text-gray-800">Share Your Success Story</h2>
              <button onClick={() => setShowStoryForm(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><X size={16} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Bride Name</label>
                <input value={storyForm.bride_name} onChange={e => setStoryForm(p => ({ ...p, bride_name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Groom Name</label>
                <input value={storyForm.groom_name} onChange={e => setStoryForm(p => ({ ...p, groom_name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                <input value={storyForm.city} onChange={e => setStoryForm(p => ({ ...p, city: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Your Story</label>
                <textarea value={storyForm.story} onChange={e => setStoryForm(p => ({ ...p, story: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none resize-none focus:ring-2 focus:ring-teal-300" required />
              </div>
              <button onClick={submitStory} disabled={storyLoading} className="w-full py-2.5 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-60" style={{ background: "#3FA7A3" }}>
                {storyLoading ? "Submitting..." : "Submit Story"}
              </button>
              <p className="text-[10px] text-gray-400 text-center">Your story will be reviewed before publishing.</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
