"use client";

import { motion } from "framer-motion";

const years = [2000, 2005, 2010, 2015, 2020, 2021, 2022, 2023, 2025];

export function TimelineAnimation2({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#56021F]">
      {/* Animated Dotted Line (Horizontal) */}
      <svg className="absolute top-1/3 left-0 w-full" height="10">
        <motion.line
          x1="0"
          y1="5"
          x2="100%"
          y2="5"
          stroke="#F4CCE9"
          strokeWidth="1"
          strokeDasharray="2000" // Total length
          strokeDashoffset="2000" // Initially hidden
          animate={{ strokeDashoffset: 0 }} // Reveals over time
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      </svg>

      {/* Timeline + Vertical Lines (Synced) */}
      <motion.div
        className="flex space-x-16 text-[#F4CCE9] text-sm font-bold"
        initial={{ x: "100%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 4, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      >
        {years.map((year, index) => {
          const delay = (index / years.length) * 5; // Sync each vertical line with horizontal progress

          return (
            <motion.div key={index} className="min-w-[200px] relative flex flex-col items-center">
              {/* Vertical Line (Now Animates with Timeline!) */}
              <motion.div
                className="absolute bottom-full w-0.5 bg-[#F4CCE9]"
                initial={{ height: 0 }}
                animate={{ height: "200px" }} // Adjust as needed
                transition={{ duration: 1, delay: delay, ease: "easeOut" }} // Now perfectly synced!
              />
              {/* Year Label */}
              <div className="mt-2">{year}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
