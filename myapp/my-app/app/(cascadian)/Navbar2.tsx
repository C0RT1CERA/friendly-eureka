"use client";

import Link from "next/link";

export default function Navbar2() {
  return (
    <nav className="fixed top-8 right-12 z-50">
      <ul className="flex flex-col space-y-4 text-[#F4CCE9] text-xl font-medium">
        {["WORK", "ABOUT", "CONTACT"].map((item, index) => (
          <li key={index} className="relative group">
            <Link href={`#${item.toLowerCase()}`} className="transition-all duration-300 hover:opacity-70">
              {item}
            </Link>
            {/* Underline animation */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4CCE9] transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
