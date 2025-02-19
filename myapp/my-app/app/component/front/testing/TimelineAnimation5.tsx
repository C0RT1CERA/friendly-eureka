"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const years = [2000, 2005, 2010, 2015, 2020, 2021, 2022, 2023, 2025];

export function TimelineAnimation5({ onComplete }: { onComplete?: () => void }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total timeline width
  const baseGap = 50; // Fixed spacing
  const multiplier = 20; // Dynamic spacing factor

  // Calculate total width based on dynamic spacing
  const totalWidth = years.reduce((acc, year, index) => {
    if (index === 0) return baseGap;
    return acc + (year - years[index - 1]) * multiplier + baseGap;
  }, 0);

  // Calculate the offset to center the last year
  const finalOffset = windowWidth > 768 ? totalWidth - windowWidth / 2 : totalWidth - windowWidth / 10;

  const vertHeight = windowWidth > 768 ? 250 : 350;


  // 🔥 Responsive: Adjust horizontal line position
  const horizontalLineTop = windowWidth < 768 ? "top-3/4" : "top-1/2"; // Lower for mobile

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-x-hidden bg-[#56021F]">
      {/* Container with horizontal padding */}
      <div className="relative w-full">
        {/* 🔥 Animated Ultra-Thin Dotted Line (Horizontal) */}
        <svg className={`absolute ${horizontalLineTop} left-0 w-full`} height="2">
          <motion.line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="#F4CCE9"
            strokeWidth="0.3"
            strokeDasharray="2000"
            strokeDashoffset="2000"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </svg>

        {/* Timeline + Vertical Dashed Lines (Synced) */}
        <motion.div
          className="flex items-center relative"
          initial={{ x: "100%" }}
          animate={{ x: -finalOffset }}
          transition={{ duration: 5, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        >
          {years.map((year, index) => {
            const delay = (index / years.length) * 5;
            const gap = index > 0 ? (years[index] - years[index - 1]) * multiplier + baseGap : baseGap;

            return (
              <motion.div
                key={index}
                className="relative flex flex-col items-center"
                style={{ marginRight: `${gap}px` }}
              >
                {/* Vertical Dashed Line */}
                <motion.div
                  className="absolute w-[0.5px] border-r border-[#F4CCE9] border-dashed"
                  initial={{ height: 0 }}
                  animate={{ height: `${vertHeight}px` }}
                  transition={{ duration: 2, delay: delay, ease: "easeOut" }}
                  style={{ bottom: "20px" }}
                />
                {/* Year Label */}
                <div className="mt-[60px] md:mt-[22px] text-[#F4CCE9] text-[10px] font-bold">{year}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
