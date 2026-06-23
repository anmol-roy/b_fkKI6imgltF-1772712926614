"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";

const LINKS = {
  nav: [
    { label: "Overview",     href: "#overview" },
    { label: "Projects",     href: "#projects" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Tech Stack",   href: "#tech-stack" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact",      href: "#contact" },
  ],
  social: [
    { icon: Github,   label: "GitHub",   href: "https://github.com/anmol-roy",            color: "#64748b" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/anmol-kumar-roy",  color: "#60a5fa" },
    { icon: Twitter,  label: "Twitter",  href: "https://twitter.com/anmolroy_dev",         color: "#67e8f9" },
    { icon: Mail,     label: "Email",    href: "mailto:anmol@example.com",                color: "#c4b5fd" },
  ],
};

function BigName() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["15%", "-4%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1]);

  return (
    <div ref={ref} className="mb-0 overflow-hidden pointer-events-none">
      <motion.h2
        className="select-none whitespace-nowrap font-bold tracking-tighter leading-none"
        style={{
          fontSize: "clamp(52px, 12vw, 140px)",
          color: "transparent",
          WebkitTextStroke: "1px var(--text-faint)",
          x,
          opacity,
        }}
      >
        Anmol Roy
      </motion.h2>
    </div>
  );
}

function AvailabilityOrb() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm"
      style={{ 
        border: "1px solid var(--card-border)", 
        background: "var(--card-surface)",
        boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
      }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.01 }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[11px] tracking-wide" style={{ color: "rgba(52,211,153,0.85)" }}>Open to opportunities</span>
    </motion.div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-sm transition-colors duration-200"
          style={{ 
            border: "1px solid var(--card-border)", 
            background: "var(--card-surface)", 
            color: "var(--text-muted)",
            boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
          }}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function AnimatedTagline() {
  const words = ["AI Engineer.", "Mobile Dev.", "Web Builder.", "Problem Solver."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 h-5 overflow-hidden">
      <span className="text-sm" style={{ color: "var(--text-muted)" }}>I&apos;m an</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-m font-medium"
          style={{
            background: "linear-gradient(120deg,#93c5fd,#c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 sm:px-10 lg:px-16 pt-16 pb-8 overflow-hidden" style={{ background: "transparent" }}>
      {/* Top divider */}
      <div className="mb-12 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--divider) 30%, var(--divider) 70%, transparent)" }} />

      <div className="container mx-auto max-w-6xl">

        {/* Big parallax name */}
        <div className="mb-8 -mx-6 sm:-mx-10 lg:-mx-16">
          <BigName />
        </div>

        {/* Main footer row */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-10 sm:gap-16 mb-12">

          {/* Left — identity */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <AvailabilityOrb />
            <AnimatedTagline />
            <p className="text-s leading-relaxed max-w-xs" style={{ color: "var(--text-muted)" }}>
              Building intelligent systems and crafting the interfaces people
              use to interact with them. Based in India, working worldwide.
            </p>
          </motion.div>

          {/* Center — nav links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <p className="mb-4 text-[12px] tracking-[0.25em] uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {LINKS.nav.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-xs transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    <motion.span
                      className="h-px transition-all duration-200"
                      style={{ background: "var(--divider)", width: 0 }}
                      whileHover={{ width: 12 }}
                    />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — socials */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            <p className="mb-4 text-[12px] tracking-[0.25em] uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>Connect</p>
            <ul className="flex flex-col gap-2.5">
              {LINKS.social.map(({ icon: Icon, label, href, color }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-xs transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    whileHover={{ x: 3, color }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 transition-colors duration-200" style={{ color: "var(--text-muted)" }} />
                    {label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5" style={{ borderTop: "1px solid var(--divider)" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[13px] flex items-center gap-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            © {year} Anmol Roy &nbsp;·&nbsp; Made with
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Heart className="h-3 w-3 text-rose-400/60 fill-rose-400/60" />
            </motion.span>
            in India
          </motion.p>

          <div className="flex items-center gap-3">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-[13px]"
              style={{ color: "var(--text-muted)" }}
            >
              Built with Next.js &amp; Tailwind CSS
            </motion.p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}