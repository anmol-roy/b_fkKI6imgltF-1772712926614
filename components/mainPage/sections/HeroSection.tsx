"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Sparkles, Cpu, ArrowDown } from "lucide-react";

const reveal = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function HeroSection() {
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-syne    { font-family: 'Syne', sans-serif; }
        .font-dm      { font-family: 'DM Sans', sans-serif; }
        .font-mono-jb { font-family: 'JetBrains Mono', monospace; }
        @keyframes shimmer {
          from { background-position: 0% center; }
          to   { background-position: 200% center; }
        }
      `}</style>

      <section
        className="font-dm relative flex min-h-screen flex-col items-center justify-center px-6 sm:px-10 lg:px-16 overflow-hidden"
        style={{ paddingTop: "96px" }}
      >
        {/* Corner rules — theme-aware */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-[100px] left-10 h-10 w-px" style={{ background: "linear-gradient(to bottom, var(--card-border), transparent)" }} />
          <div className="absolute top-[100px] left-10 h-px w-10" style={{ background: "linear-gradient(to right, var(--card-border), transparent)" }} />
          <div className="absolute bottom-10 right-10 h-10 w-px" style={{ background: "linear-gradient(to top, var(--card-border), transparent)" }} />
          <div className="absolute bottom-10 right-10 h-px w-10" style={{ background: "linear-gradient(to left, var(--card-border), transparent)" }} />
        </div>

        <div className="container mx-auto flex max-w-6xl flex-col items-center gap-16 md:flex-row md:items-center md:gap-20 relative z-10">

          {/* LEFT */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">

            {/* Status pill */}
            <motion.div
              {...reveal(0)}
              className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{ 
                background: "rgba(52,211,153,0.09)", 
                border: "1px solid rgba(52,211,153,0.28)" 
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono-jb text-[10px] font-medium tracking-[0.16em] text-emerald-600 dark:text-emerald-400/80 uppercase">
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...reveal(0.08)} className="mb-5">
              <p className="font-mono-jb mb-2 text-[10px] font-normal tracking-[0.35em] uppercase" style={{ color: "var(--text-faint)" }}>
                Hello, I&apos;m
              </p>
              <h1 className="font-syne text-[clamp(3.2rem,7.8vw,5.4rem)] font-black leading-[0.92] tracking-[-0.02em]" style={{ color: "var(--text-primary)" }}>
                Anmol
              </h1>
              <div className="flex flex-wrap items-baseline gap-3 mt-1">
                <h1
                  className="font-syne text-[clamp(3.2rem,7.8vw,5.4rem)] font-black leading-[0.92] tracking-[-0.02em] bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(112deg, #60a5fa 0%, #818cf8 30%, #c084fc 62%, #e879f9 100%)" }}
                >
                  Roy
                </h1>
                <motion.span
                  {...reveal(0.26)}
                  className="hidden sm:inline-flex items-center gap-1.5 self-center rounded-lg px-2.5 py-1"
                  style={{ 
                    background: "rgba(129,140,248,0.12)", 
                    border: "1px solid rgba(129,140,248,0.28)" 
                  }}
                >
                  <Sparkles className="h-2.5 w-2.5" style={{ color: "#a5b4fc" }} />
                  <span className="font-mono-jb text-[9px] tracking-[0.14em] uppercase" style={{ color: "rgba(165,180,252,0.9)" }}>
                    AI Engineer
                  </span>
                </motion.span>
              </div>
            </motion.div>

            {/* Role line */}
            <motion.div {...reveal(0.17)} className="mb-5 flex items-center gap-3">
              <div className="h-px w-5" style={{ background: "var(--divider)" }} />
              <p className="font-dm text-sm sm:text-[15px] font-light italic tracking-wide" style={{ color: "var(--text-muted)" }}>
                AI &amp; ML &nbsp;·&nbsp; Mobile &amp; Web
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              {...reveal(0.23)}
              className="font-dm mb-8 max-w-[400px] text-sm sm:text-[14.5px] leading-[1.9] font-light"
              style={{ color: "var(--text-tertiary)" }}
            >
              I build intelligent systems and craft the interfaces people use to
              interact with them — from training models to shipping the products,
              end to end, with attention to every detail.
            </motion.p>

            {/* CTAs */}
            <motion.div {...reveal(0.3)} className="flex flex-wrap gap-3 justify-center md:justify-start mb-9">
              <button
                onClick={() => scrollTo("projects")}
                className="font-dm group relative overflow-hidden rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(192,132,252,0.18))",
                  border: "1px solid rgba(129,140,248,0.35)",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "linear-gradient(135deg, rgba(96,165,250,0.32), rgba(192,132,252,0.28))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(192,132,252,0.18))";
                }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)" }} />
                View Projects
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="font-dm rounded-xl px-6 py-2.5 text-sm font-light transition-all duration-300"
                style={{
                  border: "1px solid var(--card-border)",
                  background: "transparent",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--card-surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                Get in touch
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div {...reveal(0.37)} className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
              {[
                { icon: Github,   href: "https://github.com/anmol-roy",           label: "GitHub",   ic: "#64748b", bg: "rgba(100,116,139,0.08)", bd: "rgba(100,116,139,0.2)" },
                { icon: Linkedin, href: "https://linkedin.com/in/anmol-kumar-roy", label: "LinkedIn", ic: "#60a5fa", bg: "rgba(96,165,250,0.08)",  bd: "rgba(96,165,250,0.22)" },
                { icon: Mail,     href: "mailto:anmol@email.com",                  label: "Email",    ic: "#f472b6", bg: "rgba(244,114,182,0.08)", bd: "rgba(244,114,182,0.22)" },
              ].map(({ icon: Icon, href, label, ic, bg, bd }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
                  style={{ background: bg, border: `1px solid ${bd}` }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 + i * 0.07 }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = `${ic}55`;
                    el.style.boxShadow = `0 0 12px ${ic}20`;
                    const svg = el.querySelector("svg") as SVGElement | null;
                    if (svg) svg.style.color = ic;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = bd;
                    el.style.boxShadow = "none";
                    const svg = el.querySelector("svg") as SVGElement | null;
                    if (svg) svg.style.color = `${ic}70`;
                  }}
                >
                  <Icon className="h-3.5 w-3.5 transition-colors duration-200" style={{ color: `${ic}70` }} />
                </motion.a>
              ))}

              <div className="h-4 w-px mx-1" style={{ background: "var(--divider)" }} />

              <div className="font-mono-jb flex items-center gap-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                <MapPin className="h-2.5 w-2.5" style={{ color: "var(--text-muted)" }} />
                <span style={{ color: "var(--text-secondary)" }}>India · Remote</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: photo */}
          <motion.div
            className="relative flex flex-shrink-0 justify-center"
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 m-auto -z-10 rounded-3xl pointer-events-none"
              style={{
                width: "260px", height: "260px",
                background: "radial-gradient(ellipse, rgba(96,165,250,0.16) 0%, rgba(192,132,252,0.09) 55%, transparent 75%)",
                filter: "blur(32px)",
              }}
            />
            <div className="relative" style={{ width: "clamp(210px,18vw,265px)", height: "clamp(255px,22vw,315px)" }}>
              <div className="absolute -inset-[1.5px] rounded-2xl z-0 pointer-events-none"
                style={{ background: "linear-gradient(148deg, rgba(96,165,250,0.55) 0%, rgba(129,140,248,0.3) 35%, rgba(192,132,252,0.45) 65%, rgba(232,121,249,0.28) 100%)" }}
              />
              <div
                className="relative z-10 w-full h-full overflow-hidden rounded-2xl"
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
              >
                <Image
                  src="/images/githubdp.jpg"
                  alt="Anmol Roy"
                  fill
                  className="object-cover"
                  style={{
                    filter: imgHovered ? "grayscale(0%) brightness(1.05) saturate(1.08)" : "grayscale(10%) brightness(0.92)",
                    transform: imgHovered ? "scale(1.03)" : "scale(1)",
                    transition: "filter 0.5s ease, transform 0.5s ease",
                  }}
                />
                {/* Bottom vignette — always dark over photo */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, transparent 45%, rgba(3,1,20,0.88) 100%)" }}
                />
                {/* Name tag — always dark glass since it's over photo */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <div className="rounded-lg px-3 py-2"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <p className="font-syne text-[11px] font-bold text-white leading-none mb-0.5">Anmol Roy</p>
                    <p className="font-mono-jb text-[9px] text-white/50 tracking-wide">AI &amp; ML Developer</p>
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                className="absolute rounded-xl backdrop-blur-md z-20"
                style={{
                  top: "-16px", right: "-68px",
                  background: "var(--card-surface)",
                  border: "1px solid var(--card-border)",
                  boxShadow: "0 4px 24px var(--shadow-color)",
                }}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ 
                      background: "rgba(251,191,36,0.14)", 
                      border: "1px solid rgba(251,191,36,0.3)" 
                    }}
                  >
                    <Cpu className="h-4 w-4" style={{ color: "#f59e0b" }} />
                  </div>
                  <div>
                    <p className="font-syne text-sm font-bold leading-none mb-0.5" style={{ color: "var(--text-primary)" }}>20+</p>
                    <p className="font-mono-jb text-[9px] tracking-wide uppercase" style={{ color: "var(--text-muted)" }}>Projects shipped</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.button
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono-jb text-[9px] tracking-[0.3em] uppercase transition-colors" style={{ color: "var(--text-faint)" }}>
              Scroll
            </span>
            <ArrowDown className="h-3.5 w-3.5 transition-colors" style={{ color: "var(--text-faint)" }} />
          </motion.div>
        </motion.button>
      </section>
    </>
  );
}