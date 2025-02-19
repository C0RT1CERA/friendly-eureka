"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const links = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar3() {
  return (
    <nav className="fixed top-6 right-12 z-50 flex items-center">
      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-col space-y-4 text-[#F4CCE9] text-lg font-medium">
        {links.map((link) => (
          <li key={link.name} className="relative group">
            <Link href={link.href} className="transition-all duration-300 hover:opacity-70">
              {link.name}
            </Link>
            {/* Underline animation */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4CCE9] transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-6 left-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6 text-[#F4CCE9]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="bg-[#56021F]">
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
            <DialogDescription className="hidden">
              This action is irreversible. Are you sure you want to proceed?
            </DialogDescription>
            <div className="flex justify-between items-center px-4 py-4">
              <span className="text-xl font-bold text-[#F4CCE9]">Menu</span>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-6 h-6 text-[#F4CCE9]" />
                </Button>
              </SheetTrigger>
            </div>

            <div className="mt-4 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-lg text-[#F4CCE9] hover:opacity-70 transition-colors px-4 py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
