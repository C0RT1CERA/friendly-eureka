"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

const iterationsMain = 4;
const iterationsSmall = 3;

// Function to calculate Koch Curve
const generateKochCurve = (start: Point, end: Point, iteration: number): Point[] => {
  if (iteration === 0) return [start, end];

  const distance = (p1: Point, p2: Point): number =>
    Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

  const pointAtRatio = (p1: Point, p2: Point, ratio: number): Point => ({
    x: p1.x + (p2.x - p1.x) * ratio,
    y: p1.y + (p2.y - p1.y) * ratio,
  });

  const pointAt60Degrees = (p1: Point, p2: Point, dist: number): Point => {
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 3;
    return {
      x: p1.x + dist * Math.cos(angle),
      y: p1.y + dist * Math.sin(angle),
    };
  };

  const points: Point[] = [];
  const dist = distance(start, end) / 3;
  const p1 = start;
  const p2 = pointAtRatio(start, end, 1 / 3);
  const p3 = pointAt60Degrees(p2, pointAtRatio(start, end, 2 / 3), dist);
  const p4 = pointAtRatio(start, end, 2 / 3);
  const p5 = end;

  points.push(...generateKochCurve(p1, p2, iteration - 1));
  points.push(...generateKochCurve(p2, p3, iteration - 1));
  points.push(...generateKochCurve(p3, p4, iteration - 1));
  points.push(...generateKochCurve(p4, p5, iteration - 1));

  return points;
};

// Generate Snowflake Path
const generateSnowflake = (iterations: number, size: number): string => {
  const center = { x: size / 2, y: size / 2 };
  const radius = size / 3;

  const vertices: Point[] = Array(6)
    .fill(0)
    .map((_, i) => {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
    });

  let pathData = "M";
  for (let i = 0; i < 6; i++) {
    const start = vertices[i];
    const end = vertices[(i + 1) % 6];
    const curvePoints = generateKochCurve(start, end, iterations);

    if (i === 0) pathData += `${curvePoints[0].x},${curvePoints[0].y}`;
    curvePoints.forEach((point) => {
      pathData += ` L${point.x},${point.y}`;
    });
  }
  pathData += " Z";

  return pathData;
};

export function Kochplacing() {
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const snowflakeSize = screenSize.width / 6;

  // Position snowflakes evenly on the screen
  const getSnowflakePositions = (): { x: number; y: number }[] => {
    const cols = Math.floor(screenSize.width / snowflakeSize);
    const rows = Math.floor(screenSize.height / snowflakeSize);

    return Array.from({ length: cols * rows }, (_, i) => ({
      x: (i % cols) * snowflakeSize + snowflakeSize / 2,
      y: Math.floor(i / cols) * snowflakeSize + snowflakeSize / 2,
    }));
  };

  const positions = getSnowflakePositions();

  return (
    <div className="absolute inset-0 bg-[#2C3930] flex justify-center items-center">
      <motion.svg
        viewBox={`0 0 ${screenSize.width} ${screenSize.height}`}
        className="absolute w-full h-full"
      >
        {/* Render evenly distributed snowflakes */}
        {positions.map((pos, i) => (
          <motion.g
            key={i}
            transform={`translate(${pos.x - snowflakeSize / 2}, ${pos.y - snowflakeSize / 2})`}
          >
            <motion.path
              d={generateSnowflake(iterationsSmall, snowflakeSize)}
              fill="none"
              stroke="#DCD7C9"
              strokeWidth="2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
          </motion.g>
        ))}

        {/* Main Snowflake in the Center */}
        <motion.g
          transform={`translate(${screenSize.width / 2 - snowflakeSize / 2}, ${screenSize.height / 2 - snowflakeSize / 2})`}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          <motion.path
            d={generateSnowflake(iterationsMain, snowflakeSize)}
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
