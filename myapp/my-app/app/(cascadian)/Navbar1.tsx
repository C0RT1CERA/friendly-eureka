"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar1() {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3",
        "backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 shadow-md"
      )}
    >
      {/* Logo */}
      <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
        Revmedsync
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white dark:bg-gray-900">
            {/* Accessibility title (Visually Hidden) */}
            <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
            <DialogDescription className="hidden">
              This action is irreversible. Are you sure you want to proceed?
            </DialogDescription>
            <div className="absolute top-4 right-4 hidden">
              {/* Hidden default close button */}
              <button className="hidden" />
            </div>
            <div className="flex justify-between items-center px-4 py-4">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-6 h-6" />
                </Button>
              </SheetTrigger>
            </div>

            <div className="mt-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-4 py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
