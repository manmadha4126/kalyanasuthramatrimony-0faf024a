import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Heart, MapPin, Briefcase, GraduationCap, Phone, Star, Calendar, Users, Lock, ArrowLeft, MessageCircle, User, BookOpen, CheckCircle, XCircle } from "lucide-react";

type Profile = {
  id: string; full_name: string; gender: string; religion: string; caste: string | null;
  sub_caste: string | null; city: string | null; state: string | null; country: string;
  occupation: string | null; education: string | null; date_of_birth: string;
  profile_photo_url: string | null; additional_photos: string[] | null;
  annual_income: string | null; is_featured: boolean; marital_status: string;
  mother_tongue: string | null; height_cm: number | null; weight_kg: number | null;
  company_name: string | null; family_status: string | null; family_type: string | null;
  father_name: string | null; father_occupation: string | null;
  mother_name: string | null; mother_occupation: string | null; siblings: string | null;
  gothra: string | null; raasi: string | null; star: string | null; dosham: string | null;
  about_me: string | null; partner_expectations: string | null;
  education_detail: string | null; native_place: string | null;
  phone: string | null; email: string | null; whatsapp: string | null;
  complexion: string | null; blood_group: string | null; profile_id: string | null;
  profile_status: string; citizenship: string | null; visa_type: string | null;
  residence_type: string | null; working_city: string | null; district: string | null;
  horoscope_url: string | null;
};

const InfoRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="flex justify-between py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className={`text-sm font-semibold text-right max-w-[60%] ${value ? "text-gray-800" : "text-gray-300"}`}>
      {value || "—"}
    </span>
  </div>
);

const SectionHeading = ({ icon: Icon, label, bgColor, textColor }: { icon: any; label: string; bgColor: string; textColor: string }) => (
  <div className="flex items-center gap-2 px-4 py-3 rounded-t-2xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-4" style={{ background: bgColor }}>
    <Icon size={17} style={{ color: textColor }} />
    <h3 className="font-bold text-base" style={{ color: textColor, fontFamily: "'Noto Sans', sans-serif", letterSpacing: "0.3px" }}>{label}</h3>
  </div>
);

const themeAccent = "hsl(160, 35%, 38%)";
const themeDark = "hsl(160, 30%, 25%)";
const themeLight = "hsl(160, 40%, 94%)";

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [userSubscription, setUserSubscription] = useState<string>("free");
  const [interestSent, setInterestSent] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => { if (id) fetchProfile(); }, [id]);

  const fetchProfile = async () => {
    const { data } = await supabase.from("profiles").select("*").eq("id", id!).maybeSingle();
    if (data) setProfile(data as unknown as Profile);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      const { data: myProfile } = await supabase.from("profiles").select("subscription_type").eq("user_id", user.id).maybeSingle();
      if (myProfile) setUserSubscription((myProfile as any).subscription_type || "free");
      const { data: existing } = await supabase.from("profile_interests").select("id").eq("from_user_id", user.id).eq("to_profile_id", id!).maybeSingle();
      if (existing) setInterestSent(true);
    }
    setLoading(false);
  };

  const sendInterest = async () => {
    if (!currentUserId || !id) return;
    const { error } = await supabase.from("profile_interests").insert({ from_user_id: currentUserId, to_profile_id: id });
    if (!error) setInterestSent(true);
  };

  const getAge = (dob: string) => Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  const getHeightFt = (cm: number | null) => {
    if (!cm) return null;
    const totalInches = Math.round(cm / 2.54);
    return `${Math.floor(totalInches / 12)}'${totalInches % 12}"`;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(160, 15%, 97%)" }}>
      <div className="animate-pulse text-gray-400">Loading profile...</div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "hsl(160, 15%, 97%)" }}>
      <p className="text-gray-500">Profile not found</p>
      <button onClick={() => navigate(-1)} className="text-sm font-semibold px-5 py-2 rounded-xl text-white" style={{ background: themeAccent }}>Go Back</button>
    </div>
  );

  const allPhotos = [profile.profile_photo_url, ...(profile.additional_photos || [])].filter(Boolean) as string[];
  const isVerified = profile.profile_status === "active";

  return (
    <div className="min-h-screen" style={{ background: "hsl(160, 15%, 97%)" }}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: themeAccent }}>
            <ArrowLeft size={18} /> Back
          </button>
          <div className="ml-3">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-gray-800 text-sm sm:text-base">{profile.full_name}</h1>
              {isVerified ? (
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "hsl(145, 50%, 90%)", color: "hsl(145, 50%, 30%)" }}>
                  <CheckCircle size={10} className="fill-current" /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "hsl(38, 90%, 92%)", color: "hsl(38, 70%, 40%)" }}>
                  <XCircle size={10} /> Not Verified
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">{profile.profile_id || ""} • {getAge(profile.date_of_birth)} yrs • {profile.religion}</p>
          </div>
          {profile.is_featured && (
            <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "hsl(42, 42%, 90%)", color: "hsl(42, 42%, 40%)" }}>
              <Star size={10} className="fill-current" /> Featured
            </div>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN - Photo + Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-4">
              {/* Photo Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {allPhotos.length > 0 ? (
                  <>
                    <div className="aspect-[3/4] relative">
                      <img src={allPhotos[activePhoto]} alt={profile.full_name} className="w-full h-full object-cover" />
                    </div>
                    {allPhotos.length > 1 && (
                      <div className="flex gap-1.5 p-3 overflow-x-auto">
                        {allPhotos.map((url, i) => (
                          <button key={i} onClick={() => setActivePhoto(i)} className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all" style={{ borderColor: i === activePhoto ? themeAccent : "transparent" }}>
                            <img src={url} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="aspect-[3/4] flex items-center justify-center" style={{ background: themeLight }}>
                    <span className="text-6xl font-bold" style={{ color: themeAccent }}>{profile.full_name[0]}</span>
                  </div>
                )}
              </div>

              {/* Expert Talk - Phone Call */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <MessageCircle size={16} style={{ color: themeAccent }} /> Expert Talk
                </h3>
                <p className="text-xs text-gray-500 mb-3">Talk to our relationship expert about this profile</p>
                <a href="tel:+919553306667" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.01]" style={{ background: themeAccent }}>
                  <Phone size={15} /> Call Expert
                </a>
              </div>

              {/* Interest Button */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2">
                {interestSent ? (
                  <div className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm" style={{ background: themeLight, color: themeDark }}>
                    <Heart size={15} className="fill-current" /> Interest Sent ✓
                  </div>
                ) : (
                  <button onClick={sendInterest} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.01]" style={{ background: "hsl(348, 60%, 45%)" }}>
                    <Heart size={15} /> Express Interest
                  </button>
                )}
                <a href={`https://wa.me/919553306667?text=${encodeURIComponent(`Hi, I'm interested in the profile of ${profile.full_name} (${profile.profile_id || ""}). Please share more details.`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all" style={{ background: themeLight, color: themeDark }}>
                  <Phone size={15} /> Contact via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Full Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-8 space-y-4">

            {/* About Me */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeading icon={BookOpen} label="About Me" bgColor="hsl(200, 50%, 92%)" textColor="hsl(200, 50%, 30%)" />
              <p className={`text-sm leading-relaxed ${profile.about_me ? "text-gray-700" : "text-gray-300"}`}>{profile.about_me || "—"}</p>
            </div>

            {/* Personal Details */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeading icon={User} label="Personal Details" bgColor="hsl(260, 45%, 92%)" textColor="hsl(260, 45%, 35%)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InfoRow label="Full Name" value={profile.full_name} />
                <InfoRow label="Date of Birth" value={profile.date_of_birth} />
                <InfoRow label="Age" value={`${getAge(profile.date_of_birth)} years`} />
                <InfoRow label="Gender" value={profile.gender} />
                <InfoRow label="Height" value={getHeightFt(profile.height_cm)} />
                <InfoRow label="Weight" value={profile.weight_kg ? `${profile.weight_kg} kg` : null} />
                <InfoRow label="Complexion" value={profile.complexion} />
                <InfoRow label="Blood Group" value={profile.blood_group} />
                <InfoRow label="Marital Status" value={profile.marital_status} />
                <InfoRow label="Mother Tongue" value={profile.mother_tongue} />
                <InfoRow label="Religion" value={profile.religion} />
                <InfoRow label="Caste" value={profile.caste} />
                <InfoRow label="Sub Caste" value={profile.sub_caste} />
                <InfoRow label="Location" value={[profile.city, profile.state, profile.country].filter(Boolean).join(", ") || null} />
                <InfoRow label="District" value={profile.district} />
                <InfoRow label="Native Place" value={profile.native_place} />
                <InfoRow label="Citizenship" value={profile.citizenship} />
                <InfoRow label="Visa Type" value={profile.visa_type} />
                <InfoRow label="Residence Type" value={profile.residence_type} />
              </div>
            </div>

            {/* Contact Details - Gated */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeading icon={Phone} label="Contact Details" bgColor="hsl(38, 70%, 90%)" textColor="hsl(38, 60%, 30%)" />
              {userSubscription === "assisted" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <InfoRow label="Phone" value={profile.phone} />
                  <InfoRow label="Email" value={profile.email} />
                  <InfoRow label="WhatsApp" value={profile.whatsapp} />
                </div>
              ) : (
                <div className="text-center py-6 rounded-xl" style={{ background: "hsl(38, 90%, 96%)" }}>
                  <Lock size={24} className="mx-auto mb-2" style={{ color: "hsl(38, 70%, 45%)" }} />
                  <p className="text-sm font-semibold" style={{ color: "hsl(38, 70%, 35%)" }}>Contact details are hidden</p>
                  <p className="text-xs mt-1" style={{ color: "hsl(38, 50%, 45%)" }}>Upgrade to Assisted Matrimony to view phone, email & WhatsApp</p>
                  <a href="https://wa.me/919553306667?text=Hi%2C%20I%20want%20to%20upgrade%20to%20Assisted%20Matrimony%20services" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-5 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: themeAccent }}>
                    Contact Us to Upgrade
                  </a>
                </div>
              )}
            </div>

            {/* Horoscope Details */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeading icon={Star} label="Horoscope Details" bgColor="hsl(310, 40%, 92%)" textColor="hsl(310, 40%, 35%)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InfoRow label="Gothram" value={profile.gothra} />
                <InfoRow label="Rashi" value={profile.raasi} />
                <InfoRow label="Star" value={profile.star} />
                <InfoRow label="Dosham" value={profile.dosham} />
                <InfoRow label="Horoscope" value={profile.horoscope_url ? "Uploaded" : null} />
              </div>
            </div>

            {/* Education & Professional Details */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeading icon={GraduationCap} label="Education & Professional Details" bgColor="hsl(160, 40%, 90%)" textColor="hsl(160, 40%, 28%)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InfoRow label="Education" value={profile.education} />
                <InfoRow label="Education Details" value={profile.education_detail} />
                <InfoRow label="Occupation" value={profile.occupation} />
                <InfoRow label="Company" value={profile.company_name} />
                <InfoRow label="Annual Income" value={profile.annual_income} />
                <InfoRow label="Working City" value={profile.working_city} />
              </div>
            </div>

            {/* Family Details */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeading icon={Users} label="Family Details" bgColor="hsl(20, 60%, 92%)" textColor="hsl(20, 50%, 32%)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InfoRow label="Family Status" value={profile.family_status} />
                <InfoRow label="Family Type" value={profile.family_type} />
                <InfoRow label="Father's Name" value={profile.father_name} />
                <InfoRow label="Father's Occupation" value={profile.father_occupation} />
                <InfoRow label="Mother's Name" value={profile.mother_name} />
                <InfoRow label="Mother's Occupation" value={profile.mother_occupation} />
                <InfoRow label="Siblings" value={profile.siblings} />
              </div>
            </div>

            {/* Partner Expectations */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeading icon={Heart} label="Partner Expectations" bgColor="hsl(348, 50%, 92%)" textColor="hsl(348, 50%, 35%)" />
              <p className={`text-sm leading-relaxed ${profile.partner_expectations ? "text-gray-700" : "text-gray-300"}`}>{profile.partner_expectations || "—"}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
