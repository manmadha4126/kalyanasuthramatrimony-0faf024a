import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import wedding2 from "@/assets/wedding-2.jpeg";
import wedding3 from "@/assets/wedding-3.jpeg";
import wedding4 from "@/assets/wedding-4.jpeg";
import wedding6 from "@/assets/wedding-6.jpeg";
import wedding8 from "@/assets/wedding-8.jpeg";

const stories = [
  { image: wedding2, groom: "Rajesh Kumar", bride: "Priya Devi", city: "Tirupati", text: "We found our soulmate through Kalyanasuthra. Forever grateful!" },
  { image: wedding3, groom: "Vikram Reddy", bride: "Lakshmi Naidu", city: "Hyderabad", text: "A perfect match made with traditional values and modern care." },
  { image: wedding4, groom: "Suresh Babu", bride: "Anjali Sharma", city: "Chennai", text: "Kalyanasuthra made our dream wedding come true!" },
  { image: wedding6, groom: "Aravind Rao", bride: "Divya Krishnan", city: "Bangalore", text: "Trusted, verified, and truly personalized matchmaking." },
  { image: wedding8, groom: "Karthik Nair", bride: "Meera Iyer", city: "Vizag", text: "Our families are so happy. Thank you Kalyanasuthra!" },
];

const SuccessStories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 340, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="stories" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(var(--burgundy)), hsl(var(--burgundy-deep)))" }}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-3">Success Stories</h2>
          <div className="h-[1px] w-16 mx-auto" style={{ background: "hsl(var(--gold-accent))" }} />
        </motion.div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {stories.map((s, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[300px] rounded-xl overflow-hidden bg-card border border-border"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img src={s.image} alt={`${s.groom} & ${s.bride}`} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h4 className="font-serif text-base font-bold text-primary">{s.groom} & {s.bride}</h4>
                <p className="text-xs text-muted-foreground mt-1">{s.city}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">"{s.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
