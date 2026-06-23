"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin, Dumbbell, Code2, Zap, BookOpen, Music,
  Globe, Terminal, Cpu, Layers, Heart, Sparkles
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const cardBase =
  "relative overflow-hidden rounded-2xl backdrop-blur-sm transition-shadow duration-300";

const techStack = [
  { name: "Python",     color: "#3b82f6" },
  { name: "TypeScript", color: "#8b5cf6" },
  { name: "React",      color: "#06b6d4" },
  { name: "Next.js",    color: "#a3a3a3" },
  { name: "PyTorch",    color: "#ef4444" },
  { name: "TensorFlow", color: "#f97316" },
  { name: "Flutter",    color: "#60a5fa" },
  { name: "Node.js",    color: "#22c55e" },
  { name: "FastAPI",    color: "#10b981" },
  { name: "PostgreSQL", color: "#818cf8" },
  { name: "Docker",     color: "#38bdf8" },
  { name: "Git",        color: "#fb923c" },
];

// Interests with individual accent colors
const interests = [
  { icon: Code2,    label: "Open Source", color: "#60a5fa", bg: "rgba(96,165,250,0.08)",   border: "rgba(96,165,250,0.12)"   },
  { icon: Cpu,      label: "AI Research", color: "#c084fc", bg: "rgba(192,132,252,0.08)",  border: "rgba(192,132,252,0.12)"  },
  { icon: Globe,    label: "Web Perf",    color: "#34d399", bg: "rgba(52,211,153,0.08)",   border: "rgba(52,211,153,0.12)"   },
  { icon: BookOpen, label: "Reading",     color: "#fbbf24", bg: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.12)"   },
  { icon: Music,    label: "Music",       color: "#f472b6", bg: "rgba(244,114,182,0.08)",  border: "rgba(244,114,182,0.12)"  },
  { icon: Dumbbell, label: "Workout",     color: "#fb923c", bg: "rgba(251,146,60,0.08)",   border: "rgba(251,146,60,0.12)"   },
];

// Stats with accent colors
const stats = [
  { value: "3+",  label: "Years coding",      color: "#60a5fa" },
  { value: "20+", label: "Projects shipped",  color: "#c084fc" },
  { value: "5+",  label: "Open source PRs",   color: "#34d399" },
  { value: "2",   label: "Languages spoken",  color: "#fbbf24" },
];

const cardGradients = [
  "linear-gradient(135deg, rgba(147,197,253,0.45), rgba(167,139,250,0.3), transparent 70%)",
  "linear-gradient(120deg, rgba(96,165,250,0.4), rgba(52,211,153,0.25), transparent 70%)",
  "linear-gradient(160deg, rgba(52,211,153,0.4), rgba(147,197,253,0.2), transparent 65%)",
  "linear-gradient(110deg, rgba(167,139,250,0.4), rgba(96,165,250,0.25), transparent 70%)",
  "linear-gradient(145deg, rgba(251,191,36,0.3), rgba(248,113,113,0.2), transparent 70%)",
  "linear-gradient(90deg, rgba(147,197,253,0.35), rgba(167,139,250,0.2), transparent 60%)",
  "linear-gradient(130deg, rgba(251,191,36,0.3), rgba(248,113,113,0.3), transparent 70%)",
  "linear-gradient(115deg, rgba(96,165,250,0.35), rgba(167,139,250,0.3), transparent 70%)",
  "linear-gradient(150deg, rgba(251,191,36,0.35), rgba(52,211,153,0.2), transparent 70%)",
];

function GlowCard({ children, className, gradientIndex, style }: {
  children: React.ReactNode; className?: string; gradientIndex: number; style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const gradient = cardGradients[gradientIndex % cardGradients.length];
  return (
    <div
      className={`${cardBase} ${className ?? ""}`}
      style={{
        ...style,
        background: "var(--card-surface, rgba(255,255,255,0.7))",
        border: "1px solid var(--card-border, rgba(99,102,241,0.12))",
        boxShadow: hovered
          ? `0 0 0 1px rgba(129,140,248,0.2), 0 8px 32px -8px var(--shadow-color, rgba(0,0,0,0.1))`
          : `0 0 0 1px transparent, 0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))`,
        transition: "box-shadow 0.35s ease, background 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "inherit", padding: "1px",
        background: gradient,
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease",
        pointerEvents: "none", zIndex: 10,
      }} />
      <span aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        background: gradient.replace(/0\.\d+\)/g, (m) => `${parseFloat(m) * 0.12})`),
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease",
        pointerEvents: "none", zIndex: 0,
      }} />
      {children}
    </div>
  );
}

function StackTicker() {
  const doubled = [...techStack, ...techStack];
  return (
    <div className="relative overflow-hidden">
      {/* Fade gradients on left and right */}
      <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--ticker-fade), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--ticker-fade), transparent)" }} />
      
      <div className="flex gap-2 whitespace-nowrap" style={{ animation: "ticker 30s linear infinite" }}>
        {doubled.map((tech, i) => (
          <span key={i}
            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium shrink-0"
            style={{
              borderColor: `${tech.color}25`,
              background: `${tech.color}0d`,
              color: `${tech.color}cc`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: tech.color, boxShadow: `0 0 6px ${tech.color}80` }} />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[11px] tracking-wide font-medium" style={{ color: `${color}cc` }}>{label}</span>
        <span className="text-[11px] font-mono" style={{ color: `${color}70` }}>{pct}%</span>
      </div>
      <div className="h-px w-full rounded-full" style={{ background: `${color}18` }}>
        <motion.div className="h-px rounded-full" style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }} />
      </div>
    </div>
  );
}

// Section label style
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[14px] tracking-[0.28em] uppercase" style={{ color: "var(--section-label)" }}>{children}</span>
);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="about"
      className="relative px-6 sm:px-10 lg:px-16 py-24 sm:py-32"
      style={{ background: "transparent" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <div className="container mx-auto max-w-6xl">

        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--section-num)" }}>02 —</span>
          <span className="font-syne text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--section-label)" }}>About</span>
          <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--divider)" }} />
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 auto-rows-auto">

          {/* ── CARD 1: Bio ── */}
          <motion.div {...fadeUp(0.05)} className="lg:col-span-5 lg:row-span-2">
            <GlowCard gradientIndex={0} className="p-7 flex flex-col justify-between min-h-[320px] h-full">
              <div>
                <div className="mb-5"><SectionLabel>Who I am</SectionLabel></div>
                <h2 className="font-syne mb-4 text-2xl sm:text-5xl font-bold leading-[1.2] tracking-tight">
                  <span style={{ color: "var(--text-primary)" }}>I build things</span><br />
                  <span className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(110deg, #60a5fa, #c084fc)" }}>
                    that think.
                  </span>
                </h2>
                <p className="font-dm text-m leading-[1.9] mb-4" style={{ color: "var(--text-secondary)" }}>
                  I&apos;m an AI &amp; ML developer from India, focused on
                  building intelligent systems — from training models to shipping
                  the products people use to interact with them.
                </p>
                <p className="font-dm text-sm leading-[1.9]" style={{ color: "var(--text-muted)" }}>
                  I care about the full stack: clean architecture, fast
                  interfaces, and models that actually work in production.
                  Not just demos.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <MapPin className="h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
                <span className="font-mono text-[15px]" style={{ color: "var(--text-muted)" }}>
                  India &nbsp;·&nbsp; Available remote
                </span>
              </div>
              <div className="absolute inset-0 -z-10 opacity-[0.025]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }} />
            </GlowCard>
          </motion.div>

          {/* ── CARD 2: Stats ── */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4">
            <GlowCard gradientIndex={1} className="p-6 h-full">
              <div className="mb-5"><SectionLabel>By the numbers</SectionLabel></div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col gap-0.5 cursor-default"
                    onMouseEnter={() => setHoveredStat(i)}
                    onMouseLeave={() => setHoveredStat(null)}>
                    <span className="font-syne text-3xl font-bold tracking-tight transition-all duration-300"
                      style={{ color: hoveredStat === i ? s.color : "var(--text-primary)" }}>
                      {s.value}
                    </span>
                    <span className="font-dm text-[11px] leading-tight transition-colors duration-300"
                      style={{ color: hoveredStat === i ? `${s.color}80` : "var(--text-muted)" }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* ── CARD 3: Status ── */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-3">
            <GlowCard gradientIndex={2} className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="mb-4"><SectionLabel>Current status</SectionLabel></div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-dm text-xs" style={{ color: "rgba(52,211,153,0.8)" }}>Open to work</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-3.5 w-3.5" style={{ color: "rgba(251,191,36,0.7)" }} />
                    <span className="font-dm text-xs" style={{ color: "rgba(251,191,36,0.55)" }}>Building side projects</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="h-3.5 w-3.5" style={{ color: "rgba(96,165,250,0.7)" }} />
                    <span className="font-dm text-xs" style={{ color: "rgba(147,197,253,0.55)" }}>Learning LLM fine-tuning</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-lg px-3 py-2.5 text-center"
                style={{ background: "rgba(147,197,253,0.08)", border: "1px solid rgba(147,197,253,0.18)" }}>
                <span className="font-mono text-[10px]" style={{ color: "rgba(147,197,253,0.7)" }}>GMT +5:30 · IST</span>
              </div>
            </GlowCard>
          </motion.div>

          {/* ── CARD 4: Skills ── */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-4">
            <GlowCard gradientIndex={3} className="p-6 h-full">
              <div className="mb-5"><SectionLabel>Core skills</SectionLabel></div>
              <div className="flex flex-col gap-3.5">
                <SkillBar label="Machine Learning" pct={88} color="#93c5fd" delay={0.3} />
                <SkillBar label="React / Next.js"  pct={82} color="#c4b5fd" delay={0.4} />
                <SkillBar label="Mobile (Flutter)" pct={75} color="#67e8f9" delay={0.5} />
                <SkillBar label="Backend / APIs"   pct={79} color="#86efac" delay={0.6} />
                <SkillBar label="UI / UX Design"   pct={70} color="#fca5a5" delay={0.7} />
              </div>
            </GlowCard>
          </motion.div>

          {/* ── CARD 5: Interests ── */}
          <motion.div {...fadeUp(0.25)} className="lg:col-span-3">
            <GlowCard gradientIndex={4} className="p-6 h-full">
              <div className="mb-5"><SectionLabel>Interests</SectionLabel></div>
              <div className="grid grid-cols-2 gap-2">
                {interests.map(({ icon: Icon, label, color, bg, border }) => (
                  <motion.div key={label}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 cursor-default transition-all duration-200"
                    style={{ background: bg, border: `1px solid ${border}` }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.15 }}>
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                    <span className="font-dm text-[11px] truncate font-medium" style={{ color: `${color}cc` }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* ── CARD 6: Tech ticker ── */}
          <motion.div {...fadeUp(0.3)} className="lg:col-span-12">
            <GlowCard gradientIndex={5} className="py-5 px-6">
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0"
                  style={{ color: "var(--text-faint)" }}>Stack</span>
                <div className="flex-1 overflow-hidden"><StackTicker /></div>
              </div>
            </GlowCard>
          </motion.div>

          {/* ── CARD 7: Quote ── */}
          <motion.div {...fadeUp(0.35)} className="lg:col-span-5">
            <GlowCard gradientIndex={6} className="p-7 flex flex-col justify-between h-full">
              <Sparkles className="h-5 w-5 mb-4" style={{ color: "rgba(251,191,36,0.35)" }} />
              <blockquote>
                <p className="font-dm text-lg font-light leading-[1.65] italic"
                  style={{ color: "var(--text-secondary)" }}>
                  &ldquo;Good software is invisible — it just works, and people
                  don&apos;t have to think about it.&rdquo;
                </p>
              </blockquote>
              <div className="mt-5 flex items-center gap-2">
                <Heart className="h-3 w-3" style={{ color: "rgba(244,114,182,0.55)" }} />
                <span className="font-mono text-[10px] tracking-wide" style={{ color: "rgba(244,114,182,0.4)" }}>
                  Design philosophy
                </span>
              </div>
            </GlowCard>
          </motion.div>

          {/* ── CARD 8: Currently ── */}
          <motion.div {...fadeUp(0.4)} className="lg:col-span-4">
            <GlowCard gradientIndex={7} className="p-6 h-full">
              <div className="mb-5"><SectionLabel>Currently</SectionLabel></div>
              <div className="flex flex-col gap-4">
                {[
                  { Icon: BookOpen, iconColor: "#60a5fa", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.12)",  labelColor: "#60a5fa", label: "Reading",   text: "Designing ML Systems — Chip Huyen",    textColor: "var(--text-muted)" },
                  { Icon: Terminal, iconColor: "#c084fc", bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.12)", labelColor: "#c084fc", label: "Building",  text: "AI-powered mobile assistant app",      textColor: "var(--text-muted)" },
                  { Icon: Layers,   iconColor: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.12)",  labelColor: "#34d399", label: "Exploring", text: "RAG architectures & vector DBs",        textColor: "var(--text-muted)" },
                ].map(({ Icon, iconColor, bg, border, labelColor, label, text, textColor }) => (
                  <div key={label} className="flex gap-3 items-start">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <Icon className="h-3.5 w-3.5" style={{ color: iconColor }} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-wide mb-0.5 uppercase" style={{ color: labelColor }}>{label}</p>
                      <p className="font-dm text-[11px] leading-snug" style={{ color: textColor }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* ── CARD 9: Fun fact ── */}
          <motion.div {...fadeUp(0.45)} className="lg:col-span-3">
            <GlowCard gradientIndex={8} className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="mb-4"><SectionLabel>Fun fact</SectionLabel></div>
                <p className="font-dm text-m leading-[1.85]" style={{ color: "var(--text-tertiary)" }}>
                  I&apos;ve started more projects than I&apos;ve completed 😒.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <Dumbbell className="h-4 w-4" style={{ color: "rgba(251,146,60,0.55)" }} />
                <span className="font-dm text-[11px]" style={{ color: "rgba(251,146,60,0.4)" }}>
                  Fuelled by coffee &amp; curiosity
                </span>
              </div>
            </GlowCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}