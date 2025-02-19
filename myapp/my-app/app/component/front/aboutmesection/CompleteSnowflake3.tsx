"use client";

import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

const iterationsMain = 4; // More detail for the big snowflake
const iterationsSmall = 3; // Keep smaller ones simpler
const size = 300;

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
const generateSnowflake = (iterations: number): string => {
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

// Function to position smaller snowflakes
const getSnowflakePositions = (): { x: number; y: number }[] => {
  const center = { x: size / 2, y: size / 2 };
  const radius = size / 3;

  return Array(6)
    .fill(0)
    .map((_, i) => {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
    });
};

// Snowflake Component
export function CompleteSnowflake3() {
  const smallFlakeSize = size / 3;
  const positions = getSnowflakePositions();

  return (
    <div className="flex justify-center items-center h-screen bg-[#2C3930]">
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-[400px] h-[400px]"
      >
        {/* Smaller Snowflakes (Static, Iterations = 3) */}
        {positions.map((pos, i) => (
          <motion.g
            
            key={i}
            transform={`translate(${pos.x - smallFlakeSize / 2}, ${pos.y - smallFlakeSize / 2}) scale(0.25)`}
          >
            <path d={generateSnowflake(iterationsSmall)} fill="none" stroke="#DCD7C9" strokeWidth="2" />
          </motion.g>
        ))}

        {/* Main Snowflake (Rotating, Iterations = 4) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          <path d={generateSnowflake(iterationsMain)} fill="none" stroke="#60A5FA" strokeWidth="1" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
