import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type FeaturedProfile = {
  id: string;
  name: string;
  age: number;
  profession: string;
  city: string;
  gender: string;
  profile_photo_url: string | null;
};

const HEADING_COLOR = "hsl(190, 85%, 45%)";

const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState<FeaturedProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("featured_profiles").select("*").order("created_at", { ascending: false });
      if (data) setProfiles(data as any);
      setLoading(false);
    };
    fetchData();
  }, []);

  const grooms = profiles.filter(p => p.gender === "Groom");
  const brides = profiles.filter(p => p.gender === "Bride");

  const ProfileCard = ({ profile, index }: { profile: FeaturedProfile; index: number }) => (
    <motion.div
      className="flex flex-col items-center group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <motion.div
        className="w-full aspect-square rounded-full overflow-hidden border-4 relative"
        style={{ borderColor: "hsl(190, 60%, 85%)" }}
        whileHover={{ scale: 1.12, boxShadow: "0 0 30px hsla(190, 85%, 45%, 0.4), 0 0 60px hsla(190, 85%, 45%, 0.15)" }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsla(190, 85%, 70%, 0.2) 0%, transparent 70%)" }} />
        {profile.profile_photo_url ? (
          <img src={profile.profile_photo_url} alt={profile.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-hover:brightness-110" style={{ background: "hsl(190, 30%, 92%)" }}>
            <span className="text-4xl font-bold" style={{ color: HEADING_COLOR }}>{profile.name[0]}</span>
          </div>
        )}
      </motion.div>
      <div className="mt-3 text-center transition-all duration-300 group-hover:translate-y-[-2px]">
        <h4 className="text-base font-bold transition-colors duration-300 group-hover:text-[hsl(190,85%,40%)]" style={{ color: "hsl(220, 30%, 18%)" }}>{profile.name}</h4>
        <p className="text-sm" style={{ color: "hsl(0, 0%, 50%)" }}>{profile.age} yrs • {profile.profession}</p>
        <p className="text-xs" style={{ color: "hsl(0, 0%, 60%)" }}>{profile.city}</p>
      </div>
    </motion.div>
  );

  const PlaceholderCard = ({ index }: { index: number }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div
        className="w-full aspect-square rounded-full overflow-hidden shadow-md border-4 flex items-center justify-center"
        style={{ background: "hsl(190, 30%, 95%)", borderColor: "hsl(190, 40%, 88%)" }}
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: "hsl(190, 25%, 88%)" }} />
          <p className="text-xs font-semibold" style={{ color: HEADING_COLOR }}>Coming Soon</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "hsl(0, 0%, 100%)" }}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: HEADING_COLOR }}>
            Featured Profiles
          </h2>
          <div className="h-[3px] w-16 mx-auto rounded-full mb-3" style={{ background: HEADING_COLOR }} />
          <p className="text-base md:text-lg font-medium" style={{ color: "hsl(220, 15%, 40%)" }}>
            Over Lakhs of Premium Members Looking for Partner
          </p>
        </motion.div>

        {/* Groom Profiles */}
        <div className="mb-14 mt-10">
          <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: HEADING_COLOR, fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Groom Profiles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {grooms.length > 0
              ? grooms.slice(0, 10).map((p, i) => <ProfileCard key={p.id} profile={p} index={i} />)
              : Array.from({ length: 10 }).map((_, i) => <PlaceholderCard key={`gp${i}`} index={i} />)
            }
          </div>
        </div>

        {/* Bride Profiles */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: HEADING_COLOR, fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Bride Profiles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {brides.length > 0
              ? brides.slice(0, 10).map((p, i) => <ProfileCard key={p.id} profile={p} index={i} />)
              : Array.from({ length: 10 }).map((_, i) => <PlaceholderCard key={`bp${i}`} index={i} />)
            }
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 py-4 px-6 text-center rounded-2xl border" style={{ background: "hsl(190, 60%, 97%)", borderColor: "hsl(190, 50%, 80%)" }}>
          <p className="text-sm font-medium" style={{ color: "hsl(220, 30%, 30%)" }}>
            Contact for more profiles: <span className="font-bold">📞 9553306667</span> | <span className="font-bold">📞 9866288767</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
