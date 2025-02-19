"use client";

import { useEffect, useMemo, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from "@/components/ui/button";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { WordSwitcher } from "./WordSwitched";

const words = ["Innovator.", "Developer.", "Creator.", "Visionary."];

export function HeroSection5() {
  const [init, setInit] = useState(false);


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
          value: "#F2B28C",
        },
      },
      fpsLimit: 20,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "bubble",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          repulse: {
            distance: 40,
            duration: 0.2,
          },
        },
      },
      particles: {
        life: {
          duration: 0, // Makes particles live indefinitely
          count: 0,    // Ensures they don’t respawn after disappearing
        },
        color: {
          value: "#F6DED8",
        },
        links: {
          color: "#F6DED8",
          distance: 120,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out, // Changed from 'out' to 'bounce'
            top: OutMode.out,
            bottom: OutMode.out,
            left: OutMode.out,
            right: OutMode.out
          },
          random: false,
          speed: 2,
          straight: false,
          bounce: true    // Added bounce property
        },
        number: {
          density: {
            enable: true,
            area: 800    // Added area control
          },
          value: 50,
        },
        opacity: {
          value: 0.5,
          animation: {    // Added opacity animation
            enable: true,
            speed: 1,
            minimumValue: 0.2,
            sync: false
          }
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
          I am <span className="font-semibold text-blue-400">
            <WordSwitcher/>
          </span>
        </h2>
        <Button className="mt-6 px-6 py-3 text-lg">
          Explore More
        </Button>
      </div>
    </section>
  );
}