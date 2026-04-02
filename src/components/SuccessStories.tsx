import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Award, Users, Star } from "lucide-react";

import success1 from "@/assets/success-1.png";
import success2 from "@/assets/success-2.png";
import success3 from "@/assets/success-3.png";
import success4 from "@/assets/success-4.png";
import success5 from "@/assets/success-5.png";
import success6 from "@/assets/success-6.png";
import success7 from "@/assets/success-7.png";
import success8 from "@/assets/success-8.png";

const successImages = [success1, success2, success3, success4, success5, success6, success7, success8];

type Story = {
  id: string;
  bride_name: string;
  groom_name: string;
  city: string;
  story: string;
  image_url: string | null;
};

const fallbackStories: Story[] = [
  { id: "1", bride_name: "Ananya", groom_name: "Raghav", city: "Hyderabad", story: "From a simple profile match to a beautiful wedding, our journey began here. We are grateful forever!", image_url: success1 },
  { id: "2", bride_name: "Divya", groom_name: "Karthik", city: "Tirupati", story: "Our families connected instantly and today we are happily married with two beautiful kids.", image_url: success2 },
  { id: "3", bride_name: "Meghana", groom_name: "Arjun", city: "Bangalore", story: "Kalyanasuthra made our search easy and trustworthy. Best decision we ever made!", image_url: success3 },
  { id: "4", bride_name: "Sravani", groom_name: "Nikhil", city: "Chennai", story: "A perfect blend of tradition and compatibility. Our parents are so happy with this match.", image_url: success4 },
  { id: "5", bride_name: "Lakshmi", groom_name: "Harsha", city: "Vijayawada", story: "Grateful for the genuine profiles and personal guidance from the relationship managers.", image_url: success5 },
  { id: "6", bride_name: "Priya", groom_name: "Vikram", city: "Mumbai", story: "We found each other through trust and transparency. Celebrating 3 years of togetherness!", image_url: success6 },
  { id: "7", bride_name: "Sneha", groom_name: "Ravi", city: "Pune", story: "A beautiful match that our families loved instantly. The team was very supportive throughout.", image_url: success7 },
  { id: "8", bride_name: "Kavya", groom_name: "Suresh", city: "Delhi", story: "Our love story started with a simple hello here. Now we can't imagine life without each other.", image_url: success8 },
];

const stats = [
  { icon: Heart, value: "10,000+", label: "Happy Couples" },
  { icon: Users, value: "1,00,000+", label: "Verified Profiles" },
  { icon: Award, value: "25+", label: "Years of Trust" },
  { icon: Star, value: "4.8/5", label: "User Rating" },
];

const SuccessStories = () => {
  const [stories, setStories] = useState<Story[]>(fallbackStories);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await supabase
        .from("success_stories")
        .select("id,bride_name,groom_name,city,story,image_url")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) setStories(data as Story[]);
    };
    fetchStories();
  }, []);

  return (
    <section id="stories" className="py-28 relative overflow-hidden" style={{ background: "hsl(0, 0%, 8%)" }}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "hsl(0, 0%, 95%)" }}>
            Success Stories by{" "}
            <span style={{ color: "hsl(40, 85%, 55%)" }}>Kalyanasuthra</span>
          </h2>
          <div className="h-[3px] w-16 mx-auto rounded-full mb-3" style={{ background: "hsl(40, 85%, 55%)" }} />
          <p className="text-base" style={{ color: "hsl(0, 0%, 60%)" }}>
            Celebrating the beautiful unions made possible through Kalyanasuthra Matrimony
          </p>
        </motion.div>

        {/* Stats - Horizontal after heading */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl px-5 py-3"
              style={{
                background: "hsl(0, 0%, 15%)",
                boxShadow: "0 4px 16px hsla(0, 0%, 0%, 0.3)",
                border: "1px solid hsl(0, 0%, 22%)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <stat.icon size={24} style={{ color: "hsl(40, 85%, 55%)" }} />
              <div>
                <p className="text-lg font-extrabold leading-tight" style={{ color: "hsl(0, 0%, 95%)" }}>{stat.value}</p>
                <p className="text-xs font-medium" style={{ color: "hsl(0, 0%, 60%)" }}>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scrolling Cards - Full Width */}
        <div className="w-full overflow-hidden">
          <style>{`
            @keyframes storiesMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <div
            className="flex gap-5"
            style={{
              animation: isPaused ? "none" : "storiesMarquee 35s linear infinite",
              width: "max-content",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...stories.slice(0, 8), ...stories.slice(0, 8)].map((story, idx) => (
              <div
                key={`story-${story.id}-${idx}`}
                className="flex-shrink-0 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
                style={{
                  width: 240,
                  background: "hsl(0, 0%, 14%)",
                  boxShadow: "0 6px 24px hsla(0, 0%, 0%, 0.4)",
                  border: "2px solid hsl(0, 0%, 22%)",
                }}
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={story.image_url || success1}
                    alt={`${story.bride_name} & ${story.groom_name}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-[11px] mt-1 leading-snug italic" style={{ color: "hsl(0, 0%, 50%)" }}>
                    "{story.story}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
