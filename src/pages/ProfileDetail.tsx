import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Heart, MapPin, Briefcase, GraduationCap, Phone, Star, Calendar, Users, Lock } from "lucide-react";
import BackButton from "@/components/BackButton";

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
};

const InfoRow = ({ icon: Icon, label, value }: { icon?: any; label: string; value: string | null | undefined }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2">
      {Icon && <Icon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{label}</p>
        <p className="text-sm text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [userSubscription, setUserSubscription] = useState<string>("free");

  useEffect(() => { if (id) fetchProfile(); }, [id]);

  const fetchProfile = async () => {
    const { data } = await supabase.from("profiles").select("*").eq("id", id!).maybeSingle();
    if (data) setProfile(data as Profile);
    // Check current user's subscription
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: myProfile } = await supabase.from("profiles").select("subscription_type").eq("user_id", user.id).maybeSingle();
      if (myProfile) setUserSubscription((myProfile as any).subscription_type || "free");
    }
    setLoading(false);
  };

  const getAge = (dob: string) => Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  const getHeightFt = (cm: number | null) => {
    if (!cm) return null;
    const totalInches = Math.round(cm / 2.54);
    return `${Math.floor(totalInches / 12)}'${totalInches % 12}"`;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(30, 33%, 97%)" }}>
      <div className="animate-pulse text-gray-400">Loading profile...</div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "hsl(30, 33%, 97%)" }}>
      <p className="text-gray-500">Profile not found</p>
      <button onClick={() => navigate(-1)} className="btn-burgundy text-sm">Go Back</button>
    </div>
  );

  const allPhotos = [profile.profile_photo_url, ...(profile.additional_photos || [])].filter(Boolean) as string[];

  return (
    <div className="min-h-screen" style={{ background: "hsl(30, 33%, 97%)" }}>
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-3 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <BackButton label="Back" />
          <div className="ml-2">
            <h1 className="font-serif font-bold text-gray-800 text-sm sm:text-base">{profile.full_name}</h1>
            <p className="text-xs text-gray-400">{getAge(profile.date_of_birth)} yrs • {profile.religion}</p>
          </div>
          {profile.is_featured && (
            <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "hsl(42, 42%, 90%)", color: "hsl(42, 42%, 40%)" }}>
              <Star size={10} className="fill-current" /> Featured
            </div>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {allPhotos.length > 0 ? (
                <>
                  <div className="aspect-[3/4] relative">
                    <img src={allPhotos[activePhoto]} alt={profile.full_name} className="w-full h-full object-cover" />
                  </div>
                  {allPhotos.length > 1 && (
                    <div className="flex gap-1.5 p-3 overflow-x-auto">
                      {allPhotos.map((url, i) => (
                        <button key={i} onClick={() => setActivePhoto(i)} className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all" style={{ borderColor: i === activePhoto ? "hsl(var(--burgundy))" : "transparent" }}>
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center" style={{ background: "hsl(var(--burgundy-light))" }}>
                  <span className="text-6xl font-serif font-bold" style={{ color: "hsl(var(--burgundy))" }}>{profile.full_name[0]}</span>
                </div>
              )}
              <div className="p-4 space-y-2">
                <a href={`https://wa.me/919553306667?text=${encodeURIComponent(`Hi, I'm interested in the profile of ${profile.full_name}. Please share more details.`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.01]" style={{ background: "hsl(var(--burgundy))" }}>
                  <Phone size={15} /> Express Interest
                </a>
                <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all" style={{ background: "hsl(var(--burgundy-light))", color: "hsl(var(--burgundy))" }}>
                  <Heart size={15} /> Shortlist Profile
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-gray-800 mb-1">{profile.full_name}</h2>
              <p className="text-sm text-gray-500 mb-4">{getAge(profile.date_of_birth)} years • {profile.marital_status} • {profile.religion}{profile.caste ? ` - ${profile.caste}` : ""}</p>
              {profile.about_me && (
                <div className="mb-4 p-3 rounded-xl bg-gray-50">
                  <p className="text-sm text-gray-700 leading-relaxed">{profile.about_me}</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <InfoRow icon={Calendar} label="Date of Birth" value={profile.date_of_birth} />
                <InfoRow icon={MapPin} label="Location" value={[profile.city, profile.state, profile.country].filter(Boolean).join(", ")} />
                <InfoRow label="Height" value={getHeightFt(profile.height_cm)} />
                <InfoRow label="Mother Tongue" value={profile.mother_tongue} />
                <InfoRow label="Native Place" value={profile.native_place} />
                <InfoRow label="Marital Status" value={profile.marital_status} />
              </div>
            </div>
            {/* Contact Details - gated */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="font-serif font-bold text-gray-800 mb-3 flex items-center gap-2"><Phone size={16} className="text-gray-400" /> Contact Details</h3>
              {userSubscription === "assisted" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <InfoRow icon={Phone} label="Phone" value={(profile as any).phone} />
                  <InfoRow label="Email" value={(profile as any).email} />
                  <InfoRow label="WhatsApp" value={(profile as any).whatsapp} />
                </div>
              ) : (
                <div className="text-center py-6 rounded-xl" style={{ background: "hsl(38, 90%, 96%)" }}>
                  <Lock size={24} className="mx-auto mb-2" style={{ color: "hsl(38, 70%, 45%)" }} />
                  <p className="text-sm font-semibold" style={{ color: "hsl(38, 70%, 35%)" }}>Contact details are hidden</p>
                  <p className="text-xs mt-1" style={{ color: "hsl(38, 50%, 45%)" }}>Upgrade to Assisted Matrimony to view phone, email & WhatsApp</p>
                  <a href="https://wa.me/919553306667?text=Hi%2C%20I%20want%20to%20upgrade%20to%20Assisted%20Matrimony%20services" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-5 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "hsl(280, 65%, 55%)" }}>
                    Contact Us to Upgrade
                  </a>
                </div>
              )}
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="font-serif font-bold text-gray-800 mb-3 flex items-center gap-2"><Briefcase size={16} className="text-gray-400" /> Professional Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <InfoRow icon={GraduationCap} label="Education" value={profile.education} />
                <InfoRow label="Education Details" value={profile.education_detail} />
                <InfoRow label="Occupation" value={profile.occupation} />
                <InfoRow label="Company" value={profile.company_name} />
                <InfoRow label="Annual Income" value={profile.annual_income} />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="font-serif font-bold text-gray-800 mb-3 flex items-center gap-2"><Users size={16} className="text-gray-400" /> Family Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <InfoRow label="Family Status" value={profile.family_status} />
                <InfoRow label="Family Type" value={profile.family_type} />
                <InfoRow label="Father's Name" value={profile.father_name} />
                <InfoRow label="Father's Occupation" value={profile.father_occupation} />
                <InfoRow label="Mother's Name" value={profile.mother_name} />
                <InfoRow label="Mother's Occupation" value={profile.mother_occupation} />
                <InfoRow label="Siblings" value={profile.siblings} />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="font-serif font-bold text-gray-800 mb-3">🔮 Horoscope Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <InfoRow label="Gothram" value={profile.gothra} />
                <InfoRow label="Rashi" value={profile.raasi} />
                <InfoRow label="Star" value={profile.star} />
                <InfoRow label="Dosham" value={profile.dosham} />
              </div>
            </div>
            {profile.partner_expectations && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="font-serif font-bold text-gray-800 mb-3">💍 Partner Expectations</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{profile.partner_expectations}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
