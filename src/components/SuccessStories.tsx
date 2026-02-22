import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import successStoriesBg from "@/assets/success-stories-bg.png";

import wedding1 from "@/assets/wedding-1.jpeg";
import wedding2 from "@/assets/wedding-2.jpeg";
import wedding3 from "@/assets/wedding-3.jpeg";
import wedding4 from "@/assets/wedding-4.jpeg";
import wedding5 from "@/assets/wedding-5.jpeg";

type Story = {
  id: string;
  bride_name: string;
  groom_name: string;
  city: string;
  story: string;
  image_url: string | null;
};

const fallbackStories: Story[] = [
  { id: "1", bride_name: "Ananya", groom_name: "Raghav", city: "Hyderabad", story: "From a simple profile match to a beautiful wedding, our journey began here.", image_url: wedding1 },
  { id: "2", bride_name: "Divya", groom_name: "Karthik", city: "Tirupati", story: "Our families connected instantly and today we are happily married.", image_url: wedding2 },
  { id: "3", bride_name: "Meghana", groom_name: "Arjun", city: "Bangalore", story: "Kalyanasuthra made our search easy and trustworthy.", image_url: wedding3 },
  { id: "4", bride_name: "Sravani", groom_name: "Nikhil", city: "Chennai", story: "A perfect blend of tradition and compatibility.", image_url: wedding4 },
  { id: "5", bride_name: "Lakshmi", groom_name: "Harsha", city: "Vijayawada", story: "Grateful for the guidance and genuine profiles.", image_url: wedding5 },
];

const SuccessStories = () => {
  const [stories, setStories] = useState<Story[]>(fallbackStories);

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
    <section id="stories" className="relative w-full">
      <img
        src={successStoriesBg}
        alt="Success Stories"
        className="w-full h-auto block"
        style={{ display: "block" }}
      />
    </section>
  );
};

export default SuccessStories;
