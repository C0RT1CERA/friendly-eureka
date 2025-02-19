"use client";

import { motion } from "framer-motion";

const years = [2000, 2005, 2010, 2015, 2020, 2025]; // Example years

export function TimelineAnimation({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-black">
      
      <motion.div
        className="flex space-x-16 text-white text-6xl font-bold"
        initial={{ x: "100%" }}
        animate={{ x: "-50%" }} // Moves to the left
        transition={{ duration: 5, ease: "easeInOut" }} // Adjust duration as needed
        onAnimationComplete={onComplete} // Trigger event after animation
      >
        {years.map((year, index) => (
          <motion.div key={index} className="min-w-[200px]">
            {year}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
