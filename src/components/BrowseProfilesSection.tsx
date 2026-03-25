import { motion } from "framer-motion";
import { useState } from "react";
import { Users, ShieldCheck, Lock } from "lucide-react";

const ACCENT = "hsl(220, 65%, 48%)";
const ACCENT_LIGHT = "hsl(220, 65%, 95%)";

const features = [
  {
    icon: Users,
    title: "100% Screened Profiles",
    description: "Search by location, community, profession & more from thousands of active profiles",
  },
  {
    icon: ShieldCheck,
    title: "Verifications by Personal Visit",
    description: "Special listing for profiles verified by our agents through personal visits",
  },
  {
    icon: Lock,
    title: "Control over Privacy",
    description: "Restrict unwanted access to contact details & photos/videos",
  },
];

const categories: Record<string, string[]> = {
  "Mother Tongue": ["Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "Oriya", "Rajasthani", "Urdu"],
  "Caste": ["Brahmin", "Reddy", "Kamma", "Kapu", "Naidu", "Velama", "Vysya", "Yadav", "Mudaliar", "Chettiar"],
  "Religion": ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi"],
  "City": ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi", "Pune", "Kolkata", "Vizag", "Vijayawada", "Tirupati"],
  "Occupation": ["Software Engineer", "Doctor", "Business", "Government", "Teacher", "Lawyer", "CA", "Manager"],
  "State": ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Maharashtra", "Kerala", "Delhi", "Gujarat"],
};

const BrowseProfilesSection = () => {
  const [activeTab, setActiveTab] = useState("Mother Tongue");

  return (
    <section className="py-20 relative" style={{ background: "hsl(0, 0%, 98%)" }}>
      <div className="container mx-auto px-4">
        {/* Bringing People Together */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: ACCENT }}>
            More Than 25 Years Of
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "hsl(220, 30%, 18%)" }}>
            Bringing People{" "}
            <span style={{ color: ACCENT }}>Together</span>
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-[3px] mx-auto rounded-full mb-14" style={{ background: ACCENT }} />

        {/* 3 Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: ACCENT_LIGHT }}>
                <f.icon size={28} style={{ color: ACCENT }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "hsl(220, 30%, 18%)" }}>{f.title}</h3>
              <div className="w-10 h-[3px] mx-auto rounded-full mb-3" style={{ background: ACCENT }} />
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 45%)" }}>{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Browse Matrimonial Profiles By */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: ACCENT }}>
            Browse
          </p>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "hsl(220, 30%, 18%)" }}>
            <span style={{ color: ACCENT }}>Matrimonial</span> Profiles by
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === cat ? ACCENT : "hsl(220, 20%, 92%)",
                color: activeTab === cat ? "white" : "hsl(220, 20%, 40%)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tags */}
        <motion.div
          key={activeTab}
          className="flex flex-wrap justify-center gap-x-1 gap-y-2 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {categories[activeTab].map((item, i) => (
            <span key={item} className="text-sm" style={{ color: "hsl(220, 20%, 35%)" }}>
              {item}
              {i < categories[activeTab].length - 1 && (
                <span className="mx-2" style={{ color: "hsl(0, 0%, 75%)" }}>|</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrowseProfilesSection;
