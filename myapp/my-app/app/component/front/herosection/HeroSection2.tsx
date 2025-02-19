"use client";

import { useEffect, useMemo, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from "@/components/ui/button";
import {
        type Container,
        type ISourceOptions, 
        MoveDirection, OutMode } from "@tsparticles/engine";

const words = ["Innovator.", "Developer.", "Creator.", "Visionary."];

export function HeroSection2() {
  const [init, setInit] = useState(false);
  const [index, setIndex] = useState(0);

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Initialize particle engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0f172a", // Tailwind slate-900
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <section className="relative flex flex-col items-center justify-center h-screen text-center px-6">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute inset-0"
        />
      )}

      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Welcome to <span className="text-blue-500">Revmedsync</span>
        </h1>
        <h2 className="mt-4 text-xl md:text-3xl text-gray-200">
          I am <span className="font-semibold text-blue-400">{words[index]}</span>
        </h2>
        <Button className="mt-6 px-6 py-3 text-lg">
          Explore More
        </Button>
      </div>
    </section>
  );
}