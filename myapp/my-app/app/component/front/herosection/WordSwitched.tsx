import { useEffect, useState } from "react";

export function WordSwitcher (){
    const [index, setIndex] = useState(0);
    const words = ["Innovator.", "Developer.", "Creator.", "Visionary."];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 2000);
      return () => clearInterval(interval);
    }, []);
  
    return <span className="font-semibold text-blue-400">{words[index]}</span>;
  };
  