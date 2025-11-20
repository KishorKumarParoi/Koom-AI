"use client";

import { Button } from "@/components/ui/button";
import { Menu, User, Video, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Studio", href: "/studio" },
  { name: "Demo", href: "/demo" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Status", href: "/status" },
  { name: "Contact", href: "/contact" },
];

const LandingPageNavbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full relative z-50">
      <div className="flex w-full justify-between items-center py-2.5 px-4 sm:px-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition">
            KoomAI
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-950/60 p-1.5 rounded-full border border-neutral-800">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`py-1.5 px-4 font-medium text-sm rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Login & CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/sign-in">
            <Button variant="ghost" className="text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl px-4">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="text-sm font-semibold bg-white hover:bg-neutral-200 text-black rounded-xl px-4 shadow-sm">
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`py-2 px-4 rounded-xl text-sm font-medium ${
                pathname === item.href ? "bg-purple-600 text-white" : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <Link href="/auth/sign-in" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full text-sm border-neutral-700 text-neutral-200">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <Button className="w-full text-sm bg-purple-600 hover:bg-purple-500 text-white">
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavbar;
