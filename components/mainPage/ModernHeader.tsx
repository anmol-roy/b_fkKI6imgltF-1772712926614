"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/contexts/ThemeContext";

// Define the props interface
interface ModernHeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function ModernHeader({ activeSection, setActiveSection }: ModernHeaderProps) {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Enhanced scroll handling with smoother animation
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 100);
      
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
        lastScrollY = currentScrollY;
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".connect-dropdown")) {
        setIsConnectOpen(false);
      }
      if (!target.closest(".more-dropdown")) {
        setIsMoreOpen(false);
      }
      if (!target.closest(".theme-dropdown")) {
        setIsThemeOpen(false);
      }
    };

    if (isConnectOpen || isMoreOpen || isThemeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isConnectOpen, isMoreOpen, isThemeOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: "case-studies",
      label: "Case Studies",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "tech-stack",
      label: "Tech Stack",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const moreItems = [
    {
      id: "bucketlist",
      label: "BucketList",
      href: "/bucketlist",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      id: "gallery",
      label: "Gallery",
      href: "/gallery",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "timeline",
      label: "TimeLine",
      href: "/timeline",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/anmol-roy",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "hover:bg-gray-500/20",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anmol-kumar-roy/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "hover:bg-blue-500/20",
    },
    {
      name: "Email",
      url: "mailto:royalanmol113@gmail.com",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "hover:bg-red-500/20",
    },
  ];

  const handleResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Anmol_Roy_Resume.pdf";
    link.click();
  }, []);

  const toggleConnectMenu = useCallback(() => {
    setIsConnectOpen((prev) => !prev);
  }, []);

  const toggleMoreMenu = useCallback(() => {
    setIsMoreOpen((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleThemeMenu = useCallback(() => {
    setIsThemeOpen((prev) => !prev);
  }, []);

  const themeOptions = [
    {
      id: "light" as const,
      label: "Light",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ),
    },
    {
      id: "dark" as const,
      label: "Dark",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
    {
      id: "system" as const,
      label: "System",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const handleMoreItemClick = useCallback(() => {
    setIsMoreOpen(false);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleMobileNavClick = useCallback((section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    scrollToSection(section);
  }, [setActiveSection, scrollToSection]);

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hidden ? -100 : 0, 
          opacity: 1
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-2xl transition-colors duration-300"
        style={{
          background: `linear-gradient(to bottom, var(--header-bg-from), var(--header-bg-to))`,
          borderColor: "var(--header-border)",
          boxShadow: `0 4px 32px var(--header-shadow)`,
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:block">
          <div className="flex justify-between mx-3 lg:mx-5 my-3">
            <div>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 to-purple-500 opacity-20 blur-sm"></div>
                  <div className="relative flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#0a0339] border border-white/20">
                    <Link href="/" className="flex items-center justify-center">
                      <Image
                        src="https://anuragsinghbam.com/images/name-logo-white.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="w-6 h-6 lg:w-8 lg:h-8 brightness-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base lg:text-lg tracking-tight bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Anmol Roy
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                {/* Resume Download Button */}
                <motion.button
                  onClick={handleResumeDownload}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium transition-all duration-300 flex items-center space-x-1 lg:space-x-2 shadow-lg hover:shadow-blue-500/10 rounded-lg border"
                  style={{
                    color: "var(--nav-active)",
                    borderColor: "var(--header-border)",
                    background: "transparent",
                  }}
                >
                  <span>Resume</span>
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </motion.button>

                {/* Connect Button with Dropdown */}
                <div className="relative connect-dropdown">
                  <motion.button
                    onClick={toggleConnectMenu}
                    aria-haspopup="menu"
                    aria-expanded={isConnectOpen}
                    aria-controls="connect-menu"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium transition-all duration-300 flex items-center space-x-1 lg:space-x-2 shadow-lg hover:shadow-blue-500/10 rounded-lg border"
                    style={{
                      color: "var(--nav-active)",
                      borderColor: "var(--header-border)",
                      background: "transparent",
                    }}
                  >
                    <span>Connect</span>
                    <motion.div
                      animate={{ rotate: isConnectOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-3 h-3 lg:w-4 lg:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isConnectOpen && (
                      <motion.div
                        id="connect-menu"
                        role="menu"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 lg:w-56 border rounded-lg shadow-2xl backdrop-blur-xl z-50 transition-colors duration-300"
                        style={{
                          background: "var(--dropdown-bg)",
                          borderColor: "var(--dropdown-border)",
                          boxShadow: `0 8px 32px var(--dropdown-shadow)`,
                        }}
                        onMouseLeave={() => setIsConnectOpen(false)}
                      >
                        <div className="p-2 lg:p-3">
                          <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-2" style={{ color: "var(--text-muted)" }}>
                            Connect with me
                          </div>
                          {socialLinks.map((social, index) => (
                            <motion.a
                              key={social.name}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02, x: 5 }}
                              className={`flex items-center space-x-3 w-full px-2 py-2 lg:px-3 lg:py-3 text-xs lg:text-sm rounded-lg transition-all duration-200 border border-transparent hover:border-white/10`}
                              style={{
                                color: "var(--text-primary)",
                              }}
                              role="menuitem"
                            >
                              <div className="flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5" style={{ color: "var(--text-secondary)" }}>
                                {social.icon}
                              </div>
                              <span className="font-medium">{social.name}</span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Toggle Dropdown */}
                <div className="relative theme-dropdown">
                  <motion.button
                    onClick={toggleThemeMenu}
                    aria-haspopup="menu"
                    aria-expanded={isThemeOpen}
                    aria-label="Toggle theme"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium transition-all duration-300 flex items-center space-x-1 lg:space-x-2 shadow-lg hover:shadow-blue-500/10 rounded-lg border"
                    style={{
                      color: "var(--nav-active)",
                      borderColor: "var(--header-border)",
                      background: "transparent",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {resolvedTheme === "dark" ? (
                        <motion.svg
                          key="dark-icon"
                          initial={{ rotate: -30, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 30, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-3 h-3 lg:w-4 lg:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="light-icon"
                          initial={{ rotate: 30, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -30, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-3 h-3 lg:w-4 lg:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <motion.div
                      animate={{ rotate: isThemeOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isThemeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-40 border rounded-lg shadow-2xl backdrop-blur-xl z-50"
                        style={{
                          background: "var(--dropdown-bg)",
                          borderColor: "var(--dropdown-border)",
                          boxShadow: `0 8px 32px var(--dropdown-shadow)`,
                        }}
                        onMouseLeave={() => setIsThemeOpen(false)}
                      >
                        <div className="p-2">
                          <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-2" style={{ color: "var(--text-muted)" }}>
                            Appearance
                          </div>
                          {themeOptions.map((option, index) => (
                            <motion.button
                              key={option.id}
                              onClick={() => { setTheme(option.id); setIsThemeOpen(false); }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.07 }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              className={`flex items-center space-x-3 w-full px-3 py-2.5 text-xs lg:text-sm rounded-lg transition-all duration-200 border ${
                                theme === option.id
                                  ? "border-white/20"
                                  : "border-transparent hover:border-white/10"
                              }`}
                              style={{
                                color: theme === option.id ? "var(--text-primary)" : "var(--text-secondary)",
                                background: theme === option.id ? "var(--hover-bg)" : "transparent",
                              }}
                            >
                              <div className="flex items-center justify-center w-4 h-4" style={{ color: "var(--text-secondary)" }}>
                                {option.icon}
                              </div>
                              <span className="font-medium">{option.label}</span>
                              {theme === option.id && (
                                <motion.div
                                  layoutId="activeTheme"
                                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* More Dropdown */}
                <div className="relative more-dropdown">
                  <motion.button
                    onClick={toggleMoreMenu}
                    aria-haspopup="menu"
                    aria-expanded={isMoreOpen}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium transition-all duration-300 flex items-center space-x-1 lg:space-x-2 shadow-lg hover:shadow-blue-500/10 rounded-lg border"
                    style={{
                      color: "var(--nav-active)",
                      borderColor: "var(--header-border)",
                      background: "transparent",
                    }}
                  >
                    <span>More</span>
                    <motion.div
                      animate={{ rotate: isMoreOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-3 h-3 lg:w-4 lg:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </motion.button>

                  {/* More Dropdown Menu */}
                  <AnimatePresence>
                    {isMoreOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-44 lg:w-48 border rounded-lg shadow-2xl backdrop-blur-xl z-50 transition-colors duration-300"
                        style={{
                          background: "var(--dropdown-bg)",
                          borderColor: "var(--dropdown-border)",
                          boxShadow: `0 8px 32px var(--dropdown-shadow)`,
                        }}
                        onMouseLeave={() => setIsMoreOpen(false)}
                      >
                        <div className="p-2 lg:p-3">
                          <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-2" style={{ color: "var(--text-muted)" }}>
                            More Pages
                          </div>
                          {moreItems.map((item, index) => (
                            <Link key={item.id} href={item.href}>
                              <motion.div
                                onClick={handleMoreItemClick}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className={`flex items-center space-x-3 w-full px-2 py-2 lg:px-3 lg:py-3 text-xs lg:text-sm rounded-lg transition-all duration-200 border border-transparent hover:border-white/10 cursor-pointer ${
                                  activeSection === item.id
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                                }`}
                                style={{
                                  color: activeSection === item.id ? "var(--text-primary)" : "var(--text-secondary)",
                                }}
                              >
                                <div className="flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5" style={{ color: "var(--text-secondary)" }}>
                                  {item.icon}
                                </div>
                                <span className="font-medium">{item.label}</span>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Always visible on desktop */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-items-start mx-3 h-10">
              <nav aria-label="Main navigation">
                <ul className="flex items-center space-x-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <motion.button
                        onClick={() => { setActiveSection(item.id); scrollToSection(item.id); }}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-2 lg:px-3 py-2.5 text-xs lg:text-sm font-medium transition-all duration-300 flex items-center space-x-1 rounded-lg mx-0 ${
                          activeSection === item.id
                            ? "text-(--nav-active)"
                            : "text-(--nav-inactive) hover:text-(--nav-active) hover:bg-(--nav-hover-bg)"
                        }`}
                        aria-current={activeSection === item.id ? "page" : undefined}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 shadow-[0_0_6px_rgba(139,92,246,0.6)]"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Tablet Navigation - Show on tablets, hide on mobile and desktop */}
          <div className="lg:hidden">
            <div className="flex items-center justify-start mx-3 overflow-x-auto scrollbar-hide">
              <nav aria-label="Main navigation" className="w-full">
                <ul className="flex items-center space-x-1 py-2">
                  {navItems.map((item) => (
                    <li key={item.id} className="shrink-0">
                      <motion.button
                        onClick={() => { setActiveSection(item.id); scrollToSection(item.id); }}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-2 py-2 text-xs font-medium transition-all duration-300 flex items-center space-x-1 rounded-lg ${
                          activeSection === item.id
                            ? "text-(--nav-active)"
                            : "text-(--nav-inactive) hover:text-(--nav-active) hover:bg-(--nav-hover-bg)"
                        }`}
                        aria-current={activeSection === item.id ? "page" : undefined}
                      >
                        {item.icon}
                        <span className="font-medium whitespace-nowrap">{item.label}</span>
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeSectionTablet"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 shadow-[0_0_6px_rgba(139,92,246,0.6)]"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mx-3 my-3">
            {/* Logo and Name */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 to-purple-500 opacity-20 blur-sm"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0339] border border-white/20">
                  <Link href="/" className="flex items-center justify-center">
                    <Image
                      src="https://anuragsinghbam.com/images/name-logo-white.svg"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6 brightness-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Anmol Roy
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg transition-all duration-300"
              style={{ color: "var(--nav-active)" }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-[73px] right-0 bottom-0 w-[85%] max-w-sm border-l z-50 md:hidden overflow-y-auto transition-colors duration-300"
              style={{
                background: `linear-gradient(to bottom, var(--header-bg-from), var(--dropdown-bg))`,
                borderColor: "var(--header-border)",
              }}
            >
              <div className="p-4 space-y-6">
                {/* Navigation Items */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: "var(--text-muted)" }}>
                    Navigation
                  </h3>
                  <nav>
                    <ul className="space-y-1">
                      {navItems.map((item, index) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => handleMobileNavClick(item.id)}
                            className={`flex items-center space-x-3 w-full px-3 py-3 text-sm rounded-lg transition-all duration-200 border ${
                              activeSection === item.id
                                ? "border-white/20"
                                : "border-transparent"
                            }`}
                            style={{
                              color: activeSection === item.id ? "var(--text-primary)" : "var(--text-secondary)",
                              background: activeSection === item.id ? "var(--hover-bg)" : "transparent",
                            }}
                          >
                            <div className="flex items-center justify-center w-5 h-5" style={{ color: "var(--text-secondary)" }}>
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* More Pages */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: "var(--text-muted)" }}>
                    More Pages
                  </h3>
                  <div className="space-y-1">
                    {moreItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + index) * 0.05 }}
                      >
                        <Link href={item.href}>
                          <div
                            onClick={toggleMobileMenu}
                            className="flex items-center space-x-3 w-full px-3 py-3 text-sm rounded-lg transition-all duration-200 hover:bg-white/5"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <div className="flex items-center justify-center w-5 h-5" style={{ color: "var(--text-secondary)" }}>
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: "var(--text-muted)" }}>
                    Connect
                  </h3>
                  <div className="space-y-1">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + moreItems.length + index) * 0.05 }}
                        className={`flex items-center space-x-3 w-full px-3 py-3 text-sm rounded-lg transition-all duration-200 ${social.color}`}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <div className="flex items-center justify-center w-5 h-5" style={{ color: "var(--text-secondary)" }}>
                          {social.icon}
                        </div>
                        <span className="font-medium">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Theme Selector */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: "var(--text-muted)" }}>
                    Appearance
                  </h3>
                  <div className="space-y-1">
                    {themeOptions.map((option, index) => (
                      <motion.button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + moreItems.length + socialLinks.length + index) * 0.05 }}
                        className={`flex items-center space-x-3 w-full px-3 py-3 text-sm rounded-lg transition-all duration-200 border ${
                          theme === option.id
                            ? "border-white/20"
                            : "border-transparent"
                        }`}
                        style={{
                          color: theme === option.id ? "var(--text-primary)" : "var(--text-secondary)",
                          background: theme === option.id ? "var(--hover-bg)" : "transparent",
                        }}
                      >
                        <div className="flex items-center justify-center w-5 h-5" style={{ color: "var(--text-secondary)" }}>
                          {option.icon}
                        </div>
                        <span className="font-medium">{option.label}</span>
                        {theme === option.id && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-blue-400" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Resume Button */}
                <motion.button
                  onClick={handleResumeDownload}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + moreItems.length + socialLinks.length) * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  style={{
                    color: "white",
                    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  }}
                >
                  <span>Download Resume</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}