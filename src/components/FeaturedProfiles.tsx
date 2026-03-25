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

const ACCENT = "hsl(220, 65%, 48%)";

const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState<FeaturedProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("featured_profiles" as any).select("*").order("created_at", { ascending: false });
      if (data) setProfiles(data as any);
      setLoading(false);
    };
    fetchData();
  }, []);

  const grooms = profiles.filter(p => p.gender === "Groom");
  const brides = profiles.filter(p => p.gender === "Bride");

  const ProfileCard = ({ profile, index }: { profile: FeaturedProfile; index: number }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <motion.div
        className="w-full aspect-square rounded-full overflow-hidden shadow-lg border-4"
        style={{ borderColor: "hsl(220, 60%, 85%)" }}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 30px hsla(220, 65%, 48%, 0.25)" }}
        transition={{ duration: 0.3 }}
      >
        {profile.profile_photo_url ? (
          <img src={profile.profile_photo_url} alt={profile.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "hsl(220, 30%, 92%)" }}>
            <span className="text-4xl font-bold" style={{ color: ACCENT }}>{profile.name[0]}</span>
          </div>
        )}
      </motion.div>
      {/* Info below photo */}
      <div className="mt-3 text-center">
        <h4 className="text-base font-bold" style={{ color: "hsl(220, 30%, 18%)" }}>{profile.name}</h4>
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
        style={{ background: "hsl(220, 30%, 95%)", borderColor: "hsl(220, 40%, 88%)" }}
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: "hsl(220, 25%, 88%)" }} />
          <p className="text-xs font-semibold" style={{ color: ACCENT }}>Coming Soon</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "hsl(0, 0%, 100%)" }}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "hsl(220, 30%, 18%)" }}>
            Featured <span style={{ color: ACCENT }}>Profiles</span>
          </h2>
          <div className="h-[3px] w-16 mx-auto rounded-full" style={{ background: ACCENT }} />
        </motion.div>

        {/* Groom Profiles */}
        <div className="mb-14">
          <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: ACCENT, fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Groom Profiles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {grooms.length > 0
              ? grooms.map((p, i) => <ProfileCard key={p.id} profile={p} index={i} />)
              : Array.from({ length: 5 }).map((_, i) => <PlaceholderCard key={`gp${i}`} index={i} />)
            }
          </div>
        </div>

        {/* Bride Profiles */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: ACCENT, fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Bride Profiles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {brides.length > 0
              ? brides.map((p, i) => <ProfileCard key={p.id} profile={p} index={i} />)
              : Array.from({ length: 5 }).map((_, i) => <PlaceholderCard key={`bp${i}`} index={i} />)
            }
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 py-4 px-6 text-center rounded-2xl border" style={{ background: "hsl(220, 60%, 97%)", borderColor: "hsl(220, 50%, 80%)" }}>
          <p className="text-sm font-medium" style={{ color: "hsl(220, 30%, 30%)" }}>
            Contact for more profiles: <span className="font-bold">📞 9553306667</span> | <span className="font-bold">📞 9866288767</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
