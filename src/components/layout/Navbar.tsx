"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Home, LayoutGrid, Sun, Moon, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import "./navbar.css";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const navItems: NavItem[] = [
  { label: "About", href: "#", icon: User },
  { label: "Project", href: "#", icon: LayoutGrid },
  { label: "Contact", href: "#", icon: BookOpen },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50" ref={ref}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="navbar-container flex items-center border shadow-2xl backdrop-blur-md overflow-hidden"
        style={{ borderRadius: 9999 }}
      >
        <AnimatePresence mode="popLayout">
          {!expanded ? (
            <motion.button
              key="toggle-closed"
              layout="position"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              onClick={() => setExpanded(true)}
              className="navbar-toggle flex items-center justify-center gap-2 px-8 sm:px-16 py-3 sm:py-4 transition-colors duration-200 rounded-full"
              aria-label="Open menu"
            >
              <span className="relative flex right-0 sm:right-11 h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full navbar-dot-ping opacity-50"></span>
                <span className="absolute inline-flex rounded-full h-2 w-2 navbar-dot"></span>
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="nav-content"
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2"
            >
              <div className="flex items-center gap-3 pl-1 pr-1.5 sm:pr-2 border-r navbar-divider">
                <Link
                  href="/"
                  className="navbar-home p-2 sm:p-2.5 transition-colors duration-200 rounded-full"
                  aria-label="Home"
                >
                  <Home size={16} className="sm:hidden" />
                  <Home size={18} className="hidden sm:block" />
                </Link>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="navbar-link flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-colors duration-200 font-medium text-sm font-display"
                    >
                      <Icon size={16} className="navbar-icon" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-3 pl-1.5 sm:pl-2 pr-1 border-l navbar-divider">
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="navbar-button p-2 sm:p-2.5 rounded-full transition-all duration-200 font-display"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={16} className="sm:hidden" />
                      <Sun size={20} className="hidden sm:block" />
                    </>
                  ) : (
                    <>
                      <Moon size={16} className="sm:hidden" />
                      <Moon size={20} className="hidden sm:block" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="navbar-button p-2 sm:p-2.5 rounded-full transition-all duration-200 font-display"
                  aria-label="Close menu"
                >
                  <X size={16} className="sm:hidden" />
                  <X size={20} className="hidden sm:block" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
