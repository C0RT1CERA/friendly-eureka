"use client";

import { motion } from "framer-motion";

const years = [2000, 2005, 2010, 2015, 2020, 2025];

export function TimelineAnimation1({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Animated Dashed Line (Draw Effect) */}
      <svg className="absolute top-1/3 left-0 w-full" height="10">
        <motion.line
          x1="0"
          y1="5"
          x2="100%"
          y2="5"
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="2000" // Total line length
          strokeDashoffset="2000" // Start fully hidden
          animate={{ strokeDashoffset: 0 }} // Gradually draws the line
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      </svg>

      {/* Timeline */}
      <motion.div
        className="flex space-x-16 text-white text-6xl font-bold"
        initial={{ x: "100%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 5, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      >
        {years.map((year, index) => (
          <motion.div key={index} className="min-w-[200px] relative">
            {/* Small vertical line connecting to the timeline */}
            <div className="absolute top-[-20px] left-1/2 w-0.5 h-5 bg-gray-500"></div>
            {year}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
