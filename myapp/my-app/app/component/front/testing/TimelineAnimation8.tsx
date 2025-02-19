"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const years = [2000, 2010, 2012, 2020, 2021, 2022, 2023, 2024, 2025];

export function TimelineAnimation8({ onComplete }: { onComplete?: () => void }) {
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
    
    const vertHeight = windowWidth > 768 ? 370 : 440;
    const dotheight = windowWidth > 768 ? 15 : 15;
    
    const circleSize = 60;
    const circleheight = windowWidth > 768 ? -12 : -12;

    const circleSizeDashed = 300; // Increase for a bigger circle
    const dashLength = 10;  // Adjust dash height
    const dashCount = 25;   // More dashes for a smoother effect


  // 🔥 Responsive: Adjust horizontal line position
  const horizontalLineTop = windowWidth < 768 ? "top-3/4" : "top-1/2"; // Lower for mobile
  const horizontalLineHeight = windowWidth < 768 ? "mt-[0px]" : "mt-[70px]";
  
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-x-hidden bg-[#56021F]">
      {/* Container with horizontal padding */}
      <div className="relative w-full">
        {/* 🔥 Animated Ultra-Thin Dotted Line (Horizontal) */}
        <svg className={`absolute ${horizontalLineTop} ${horizontalLineHeight} left-0 w-full`} height="2">
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
  const isLast = index === years.length - 1; // Check if it's the last year

  return (
    <motion.div
      key={index}
      className="relative flex flex-col items-center"
      style={{ marginRight: `${gap}px` }}
    >
      {/* 🔥 Vertical Dashed Line */}
      <motion.div
        className="absolute w-[0.5px] border-r border-[#F4CCE9] border-dashed"
        initial={{ height: 0 }}
        animate={{ height: `${vertHeight}px` }}
        transition={{ duration: 2, delay: delay, ease: "easeOut" }}
        style={{ bottom: "20px" }}
      />

      {/* 🔥 Small Dot at the Intersection (For the Last Year) */}
      {isLast && (
                  <>
                    {/* Static Dot */}
                    <motion.div
                      className="absolute w-[7px] h-[7px] bg-[#F4CCE9] rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, delay: delay + 1, ease: "easeOut" }}
                      style={{ bottom: `${dotheight}px`, transform: "translateY(-50%)" }}
                    />

                    {/* Rotating Dashed Circle */}
                    <motion.div
                      className="absolute border border-dashed border-[#F4CCE9] rounded-full"
                      style={{
                        width: `${circleSize}px`,
                        height: `${circleSize}px`,
                        bottom: `${circleheight}px`,
                        transform: "translateY(-50%)",
                      }}
                      initial={{ opacity: 0 }} // 🔥 Starts invisible
                      animate={{ opacity: 1, rotate: 360 }} // 🔥 Instantly appears and starts rotating
                      transition={{
                        opacity: { duration: 0.1, delay: delay + 1 },
                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      }}
                    />

                    {/* 🔥 Rotating Dashed Circle */}
                    <motion.div
                    className="absolute flex items-center justify-center"
                    style={{
                      width: `${circleSizeDashed}px`,
                      height: `${circleSizeDashed}px`,
                      bottom: `${dotheight - 145}px`,  // Adjust as needed
                      
                      transform: "translateX(-50%) translateY(-50%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: -360 }}
                    transition={{
                      opacity: { duration: 0.1, delay: delay + 1 },
                      rotate: { duration: 7, repeat: Infinity, ease: "linear" },
                    }}
>                   
                    {/* 🔥 Dashes arranged in a circular pattern */}
                    {Array.from({ length: dashCount }).map((_, i) => {
                      const angle = (360 / dashCount) * i;
                      return (
                        <div
                          key={i}
                          className="absolute w-[1px] bg-[#F4CCE9]"
                          style={{
                            height: `${dashLength}px`,
                            transform: `rotate(${angle}deg) translateY(-${circleSizeDashed / 2}px)`,
                            transformOrigin: "center",

                          }}
                        />
                      );
                    })}
                    </motion.div>
                  </>
                )}

      {/* Year Label */}
      <div className="mt-[60px] md:mt-[162px] text-[#F4CCE9] text-[10px] font-bold">{year}</div>
    </motion.div>
  );
})}

        </motion.div>
      </div>
      <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-[#F4CCE9] text-6xl md:text-8xl font-extrabold tracking-wide">
          UJX STUDIO
        </h1>
      </div>

      <div className="block md:hidden absolute top-32 right-6 text-[#F4CCE9]">
          <h1 className="text-5xl font-extrabold tracking-wide leading-tight text-right">
            <span className="block">UJX</span>
            <span className="block">STUDIO</span>
          </h1>
      </div>



    </div>
  );
}
