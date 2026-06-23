"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, ExternalLink, Trophy, Star, Zap, Medal, CheckCircle } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

// ── Cert data ─────────────────────────────────────────────────
const CERTS = [
  {
    title: "Machine Learning Specialisation",
    issuer: "DeepLearning.AI",
    date: "Aug 2023",
    credentialUrl: "#",
    accent: "#60a5fa",       // blue
    glow: "rgba(96,165,250,",
    iconBg: "#1e3a5f",
  },
  {
    title: "Google Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "Jan 2024",
    credentialUrl: "#",
    accent: "#34d399",       // emerald
    glow: "rgba(52,211,153,",
    iconBg: "#0f3325",
  },
];

const WINS = [
  { icon: Trophy, label: "1st Place",  event: "HackIndia 2024",  detail: "AI track · 800 teams",     color: "#fbbf24", bg: "#3d2e00" },
  { icon: Medal,  label: "Runner Up",  event: "MLHacks Winter",  detail: "Best ML project",            color: "#f472b6", bg: "#3b0a25" },
  { icon: Zap,    label: "Top 10",     event: "Google DevFest",  detail: "Open source",                color: "#c084fc", bg: "#2a1045" },
];

// ── Cert Card ─────────────────────────────────────────────────
function CertCard({ cert, delay }: { cert: typeof CERTS[number]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = (e: React.MouseEvent) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => setVerified(false), 1800);
  };

  return (
    <motion.div {...fadeUp(delay)}
      className="relative overflow-hidden rounded-2xl flex flex-col cursor-default"
      style={{ 
        border: `1px solid ${cert.accent}28`, 
        background: "var(--card-surface)",
        boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ duration: 0.28 }}>

      {/* Animated top border */}
      <motion.div className="absolute top-0 left-0 right-0 h-[1.5px]"
        animate={{ background: hovered
          ? `linear-gradient(90deg, transparent 0%, ${cert.accent}ff 50%, transparent 100%)`
          : `linear-gradient(90deg, transparent 0%, ${cert.accent}44 50%, transparent 100%)` }}
        transition={{ duration: 0.4 }}/>

      {/* Glow */}
      <motion.div className="absolute inset-0 -z-10"
        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(ellipse 80% 55% at 50% -10%, ${cert.glow}18), transparent)` }}/>

      {/* Visual tile */}
      <div className="relative mx-3.5 mt-3.5 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ 
          height: "120px", 
          background: `linear-gradient(140deg, ${cert.iconBg} 0%, rgba(0,0,0,0.4) 100%)`, 
          border: `1px solid ${cert.accent}18` 
        }}>

        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "18px 18px" }}/>

        {/* Corner brackets */}
        {[["top-2 left-2","border-t border-l"],["top-2 right-2","border-t border-r"],
          ["bottom-2 left-2","border-b border-l"],["bottom-2 right-2","border-b border-r"]].map(([pos, cls], i) => (
          <div key={i} className={`absolute ${pos} h-3.5 w-3.5 ${cls} rounded-sm`}
            style={{ borderColor: `${cert.accent}55` }}/>
        ))}

        {/* Icon */}
        <motion.div animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 8 : 0 }} transition={{ duration: 0.32 }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ 
            background: `${cert.accent}20`, 
            border: `1.5px solid ${cert.accent}40`, 
            boxShadow: hovered ? `0 0 24px ${cert.accent}40` : "none" 
          }}>
          <Award className="h-6 w-6" style={{ color: cert.accent }}/>
        </motion.div>

        {/* Pulse ring on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div className="absolute h-12 w-12 rounded-2xl"
              initial={{ scale: 1, opacity: 0.4 }} animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.7, repeat: Infinity }}
              style={{ border: `1px solid ${cert.accent}60` }}/>
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 px-4 py-3.5">
        <span className="font-mono mb-0.5 uppercase tracking-[0.22em]"
          style={{ fontSize: "9.75px", color: `${cert.accent}99` }}>{cert.issuer}</span>
        <h3 className="font-syne font-bold leading-snug mb-1"
          style={{ fontSize: "14.95px", color: "var(--text-primary)" }}>{cert.title}</h3>
        <span className="font-mono mb-3" style={{ fontSize: "11.05px", color: "var(--text-muted)" }}>{cert.date}</span>

        {/* Verify CTA */}
        <motion.button onClick={handleVerify}
          className="mt-auto self-start font-dm flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all duration-250"
          style={{ 
            fontSize: "12.35px", 
            border: `1px solid ${hovered ? cert.accent+"45" : "var(--card-border)"}`, 
            color: hovered ? cert.accent : "var(--text-muted)", 
            background: hovered ? `${cert.accent}10` : "transparent" 
          }}
          whileTap={{ scale: 0.94 }}>
          <AnimatePresence mode="wait">
            {verified ? (
              <motion.span key="ok" initial={{ opacity:0,scale:0.6 }} animate={{ opacity:1,scale:1 }} exit={{ opacity:0 }}
                className="flex items-center gap-1.5" style={{ color: cert.accent }}>
                <CheckCircle className="h-3 w-3"/> Verified!
              </motion.span>
            ) : (
              <motion.span key="go" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                className="flex items-center gap-1.5">
                <ExternalLink className="h-3 w-3"/> View credential
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Wins Card ─────────────────────────────────────────────────
function WinsCard({ delay }: { delay: number }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <motion.div {...fadeUp(delay)}
      className="relative overflow-hidden rounded-2xl flex flex-col"
      style={{ 
        border: "1px solid rgba(251,191,36,0.2)", 
        background: "var(--card-surface)",
        boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
      }}>

      <div className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)" }}/>

      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono uppercase tracking-[0.28em]"
            style={{ fontSize: "15.75px", color: "rgba(251,191,36,0.5)" }}>Wins</span>
          <span className="font-syne font-black" style={{ fontSize: "22.1px", color: "var(--text-faint)" }}>7+</span>
        </div>

        {/* Win rows */}
        {WINS.map((win, i) => {
          const Icon = win.icon;
          const on = active === i;
          return (
            <motion.div key={i}
              className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-default overflow-hidden"
              style={{ 
                border: `1px solid ${on ? win.color+"35" : "var(--card-border)"}`, 
                background: on ? `${win.color}0b` : "var(--card-surface)" 
              }}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>

              {/* Shimmer sweep */}
              <AnimatePresence>
                {on && (
                  <motion.div className="absolute inset-0 -z-10 pointer-events-none"
                    initial={{ x: "-110%" }} animate={{ x: "110%" }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    style={{ background: `linear-gradient(90deg, transparent, ${win.color}18, transparent)` }}/>
                )}
              </AnimatePresence>

              {/* Icon tile */}
              <motion.div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ 
                  background: on ? `${win.color}20` : win.bg, 
                  border: `1px solid ${on ? win.color+"40" : win.color+"18"}`, 
                  boxShadow: on ? `0 0 14px ${win.color}30` : "none" 
                }}
                animate={{ rotate: on ? [0,-10,10,0] : 0 }} transition={{ duration: 0.38 }}>
                <Icon className="h-4 w-4" style={{ color: on ? win.color : `${win.color}90` }}/>
              </motion.div>

              {/* Text */}
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-syne font-bold" style={{ fontSize: "13.65px", color: on ? win.color : "var(--text-primary)" }}>{win.label}</span>
                  <span className="font-dm truncate" style={{ fontSize: "12.35px", color: "var(--text-tertiary)" }}>{win.event}</span>
                </div>
                <span className="font-mono" style={{ fontSize: "10.4px", color: on ? `${win.color}80` : "var(--text-muted)" }}>{win.detail}</span>
              </div>

              {/* Right arrow */}
              <motion.span className="ml-auto font-mono shrink-0"
                animate={{ opacity: on ? 1 : 0, x: on ? 0 : -4 }} transition={{ duration: 0.18 }}
                style={{ fontSize: "11.7px", color: win.color }}>→</motion.span>
            </motion.div>
          );
        })}

        {/* Bottom stat */}
        <div className="mt-auto pt-3" style={{ borderTop: "1px solid var(--divider)" }}>
          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5" style={{ color: "#fbbf24" }}/>
            <span className="font-dm" style={{ fontSize: "12.35px", color: "var(--text-muted)" }}>
              hackathons &amp; competitions
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────
export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative px-6 sm:px-10 lg:px-16 py-14 sm:py-20"
      style={{ background: "transparent" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-syne { font-family:'Syne',sans-serif; }
        .font-dm   { font-family:'DM Sans',sans-serif; }
        .font-mono { font-family:'JetBrains Mono',monospace; }
      `}</style>

      <div className="container mx-auto max-w-6xl">
        {/* Label */}
        <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-4">
          <span className="font-mono tracking-[0.3em] uppercase" style={{ fontSize: "18.35px", color: "var(--section-num)" }}>06 —</span>
          <span className="font-syne tracking-[0.2em] uppercase" style={{ fontSize: "18.35px", color: "var(--section-label)" }}>Achievements</span>
          <span className="h-px w-[60px]" style={{ background: "var(--divider)" }}/>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.issuer} cert={cert} delay={0.05 + i * 0.07}/>
          ))}
          <WinsCard delay={0.2}/>
        </div>
      </div>
    </section>
  );
}