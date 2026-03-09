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

const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState<FeaturedProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("featured_profiles" as any).select("*").order("created_at", { ascending: false });
      if (data) setProfiles(data as any);
      setLoading(false);
    };
    fetch();
  }, []);

  const grooms = profiles.filter(p => p.gender === "Groom");
  const brides = profiles.filter(p => p.gender === "Bride");

  const ProfileCard = ({ profile, index }: { profile: FeaturedProfile; index: number }) => (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <motion.div
        className="relative w-full aspect-[3/4] rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Front - Photo only */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {profile.profile_photo_url ? (
            <img src={profile.profile_photo_url} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "hsl(275, 25%, 25%)" }}>
              <span className="text-4xl font-bold" style={{ color: "hsl(42, 55%, 75%)" }}>{profile.name[0]}</span>
            </div>
          )}
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.3))" }} />
        </div>

        {/* Back - Info */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-center p-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, hsl(275, 35%, 20%), hsl(310, 30%, 25%))",
          }}
        >
          <div className="text-center">
            <h4 className="text-lg font-bold mb-2" style={{ color: "hsl(42, 55%, 85%)", fontFamily: "system-ui, sans-serif" }}>{profile.name}</h4>
            <p className="text-base mb-1" style={{ color: "hsl(310, 30%, 78%)" }}>{profile.age} years</p>
            <p className="text-base mb-1" style={{ color: "hsl(42, 40%, 70%)" }}>{profile.profession}</p>
            <p className="text-sm" style={{ color: "hsl(0, 0%, 70%)" }}>{profile.city}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const PlaceholderCard = ({ index }: { index: number }) => (
    <motion.div
      className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md"
      style={{ background: "hsl(275, 30%, 20%)", border: "1px solid hsl(42, 40%, 40%)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full mb-3" style={{ background: "hsl(275, 25%, 30%)" }} />
        <p className="text-sm font-semibold" style={{ color: "hsl(42, 55%, 75%)" }}>Coming Soon</p>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #E1989A 0%, #B4717A 100%)"
    }}>
      {/* Mandala-inspired geometric pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 120px 120px at 20% 20%, hsl(42, 60%, 65%) 1px, transparent 50%),
            radial-gradient(ellipse 80px 80px at 80% 30%, hsl(310, 50%, 55%) 1px, transparent 50%),
            radial-gradient(ellipse 100px 100px at 50% 80%, hsl(42, 60%, 65%) 1px, transparent 50%),
            radial-gradient(circle at 30% 60%, hsl(275, 40%, 50%) 2px, transparent 60px),
            radial-gradient(circle at 70% 50%, hsl(340, 40%, 45%) 2px, transparent 60px)
          `,
          backgroundSize: "200px 200px, 150px 150px, 180px 180px, 120px 120px, 160px 160px"
        }}
      />

      {/* Floating diamond shapes */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, hsl(42, 60%, 65%) 40%, hsl(42, 60%, 65%) 42%, transparent 42%),
            linear-gradient(-45deg, transparent 40%, hsl(42, 60%, 65%) 40%, hsl(42, 60%, 65%) 42%, transparent 42%)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(310, 60%, 45%), transparent 70%)" }} />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-[0.07] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(42, 70%, 55%), transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(275, 50%, 50%), transparent 60%)" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: "hsl(42, 55%, 75%)" }}>Featured Profiles</h2>
          <div className="h-[2px] w-20 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, transparent, hsl(42, 60%, 65%), transparent)" }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Groom */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-center" style={{ color: "hsl(310, 30%, 78%)" }}>Groom Profiles</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {grooms.length > 0
                ? grooms.map((p, i) => <ProfileCard key={p.id} profile={p} index={i} />)
                : Array.from({ length: 3 }).map((_, i) => <PlaceholderCard key={`gp${i}`} index={i} />)
              }
            </div>
          </div>

          {/* Bride */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-center" style={{ color: "hsl(310, 30%, 78%)" }}>Bride Profiles</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {brides.length > 0
                ? brides.map((p, i) => <ProfileCard key={p.id} profile={p} index={i} />)
                : Array.from({ length: 3 }).map((_, i) => <PlaceholderCard key={`bp${i}`} index={i} />)
              }
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-8 sm:mt-12 py-4 px-4 sm:px-6 text-center rounded-3xl border-2" style={{ background: "linear-gradient(135deg, hsl(275, 35%, 25%), hsl(310, 30%, 28%))", borderColor: "hsl(42, 50%, 50%)" }}>
          <p className="text-sm font-medium" style={{ color: "hsl(42, 55%, 80%)" }}>
            Contact for more profiles: <span className="font-bold">📞 9553306667</span> | <span className="font-bold">📞 9866288767</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
