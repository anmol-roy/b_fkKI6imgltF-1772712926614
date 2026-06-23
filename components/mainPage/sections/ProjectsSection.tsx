"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  ExternalLink, Github, ArrowUpRight, ChevronRight,
  Cpu, Globe, Smartphone, Terminal, Database, Layers
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

type Category = "All" | "AI/ML" | "Web" | "Mobile" | "Tool";

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  category: Category;
  tags: string[];
  tagColors: string[];
  accent: string;
  accentMuted: string;
  icon: React.ElementType;
  iconColor: string;
  year: string;
  status: "Live" | "WIP" | "Open Source";
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string; color: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NeuralChat",
    tagline: "Conversational AI with memory",
    description: "A production-grade chatbot platform with long-term memory, RAG-powered knowledge retrieval, and a real-time streaming UI. Handles 10k+ daily conversations.",
    category: "AI/ML",
    tags: ["Python", "FastAPI", "React", "pgvector", "LangChain"],
    tagColors: ["#60a5fa", "#34d399", "#67e8f9", "#c084fc", "#fbbf24"],
    accent: "#93c5fd",
    accentMuted: "rgba(147,197,253,0.06)",
    icon: Cpu,
    iconColor: "#93c5fd",
    year: "2024",
    status: "Live",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    metrics: [
      { label: "Daily users",  value: "10k+",  color: "#60a5fa" },
      { label: "Avg latency",  value: "320ms", color: "#34d399" },
      { label: "Accuracy",     value: "94%",   color: "#c084fc" },
    ],
  },
  {
    id: 2,
    title: "FlowDash",
    tagline: "Real-time analytics dashboard",
    description: "A Next.js dashboard for monitoring ML model performance in production. Live metrics, drift detection alerts, and one-click rollback.",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    tagColors: ["#e2e8f0", "#60a5fa", "#f472b6", "#34d399"],
    accent: "#c4b5fd",
    accentMuted: "rgba(196,181,253,0.06)",
    icon: Globe,
    iconColor: "#c4b5fd",
    year: "2024",
    status: "Open Source",
    liveUrl: "#",
    githubUrl: "#",
    metrics: [
      { label: "GitHub stars", value: "340+", color: "#fbbf24" },
      { label: "Forks",        value: "52",   color: "#c4b5fd" },
    ],
  },
  {
    id: 3,
    title: "Pocketlens",
    tagline: "On-device image recognition",
    description: "Flutter app that runs a MobileNet model entirely on-device — no API calls. Classifies 1000+ objects in under 80ms.",
    category: "Mobile",
    tags: ["Flutter", "TensorFlow Lite", "Dart"],
    tagColors: ["#67e8f9", "#fb923c", "#60a5fa"],
    accent: "#67e8f9",
    accentMuted: "rgba(103,232,249,0.06)",
    icon: Smartphone,
    iconColor: "#67e8f9",
    year: "2023",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    metrics: [
      { label: "Inference",   value: "<80ms", color: "#67e8f9" },
      { label: "Model size",  value: "4.2MB", color: "#fb923c" },
    ],
  },
  {
    id: 4,
    title: "Synthia CLI",
    tagline: "LLM-powered dev terminal",
    description: "A terminal assistant that understands your codebase context and suggests shell commands, explains errors, and writes boilerplate.",
    category: "Tool",
    tags: ["Python", "Click", "OpenAI API", "Tree-sitter"],
    tagColors: ["#60a5fa", "#fbbf24", "#c084fc", "#34d399"],
    accent: "#86efac",
    accentMuted: "rgba(134,239,172,0.06)",
    icon: Terminal,
    iconColor: "#86efac",
    year: "2024",
    status: "Open Source",
    githubUrl: "#",
    metrics: [
      { label: "Stars",     value: "180+", color: "#fbbf24" },
      { label: "Languages", value: "12",   color: "#86efac" },
    ],
  },
  {
    id: 5,
    title: "VectorStore",
    tagline: "Lightweight vector database",
    description: "An embedded vector DB for Python with HNSW indexing, metadata filtering, and zero external dependencies. Designed for edge inference.",
    category: "AI/ML",
    tags: ["Python", "C extensions", "HNSW", "NumPy"],
    tagColors: ["#60a5fa", "#fca5a5", "#fbbf24", "#86efac"],
    accent: "#fca5a5",
    accentMuted: "rgba(252,165,165,0.06)",
    icon: Database,
    iconColor: "#fca5a5",
    year: "2023",
    status: "Open Source",
    githubUrl: "#",
    metrics: [
      { label: "Query speed",    value: "0.4ms",  color: "#fca5a5" },
      { label: "PyPI downloads", value: "8k/mo",  color: "#fbbf24" },
    ],
  },
  {
    id: 6,
    title: "LayerViz",
    tagline: "Neural network layer inspector",
    description: "Interactive visualiser for PyTorch model internals — attention maps, activation patterns, and gradient flow in a browser UI.",
    category: "AI/ML",
    tags: ["React", "D3.js", "PyTorch", "WebSockets"],
    tagColors: ["#67e8f9", "#fbbf24", "#fb923c", "#c084fc"],
    accent: "#fcd34d",
    accentMuted: "rgba(252,211,77,0.06)",
    icon: Layers,
    iconColor: "#fcd34d",
    year: "2023",
    status: "WIP",
    githubUrl: "#",
  },
];

const CATEGORIES: Category[] = ["All", "AI/ML", "Web", "Mobile", "Tool"];

const statusConfig: Record<Project["status"], { color: string; border: string; bg: string }> = {
  Live:          { color: "#34d399", border: "rgba(52,211,153,0.28)",  bg: "rgba(52,211,153,0.09)"  },
  "Open Source": { color: "#93c5fd", border: "rgba(147,197,253,0.28)", bg: "rgba(147,197,253,0.09)" },
  WIP:           { color: "#fbbf24", border: "rgba(251,191,36,0.28)",  bg: "rgba(251,191,36,0.09)"  },
};

// ─── Directional glow border ──────────────────────────────────────────────────
function useDirectionalBorder(accent: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [grad, setGrad] = useState("none");
  const [opacity, setOpacity] = useState(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const dL = x, dR = 1-x, dT = y, dB = 1-y;
    const min = Math.min(dL, dR, dT, dB);
    let angle = min===dL ? 270 : min===dR ? 90 : min===dT ? 0 : 180;
    const s = 55;
    setGrad(`conic-gradient(from ${angle-s}deg at ${x*100}% ${y*100}%, transparent 0deg, ${accent}cc ${s*.6}deg, ${accent} ${s}deg, ${accent}cc ${s*1.4}deg, transparent ${s*2}deg, transparent 360deg)`);
    setOpacity(1);
  }, [accent]);

  const onMouseLeave = useCallback(() => setOpacity(0), []);
  return { ref, grad, opacity, onMouseMove, onMouseLeave };
}

function GlowBorderCard({ children, accent, className, onMouseEnter, onMouseLeave: ext }: {
  children: React.ReactNode; accent: string; className?: string;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
}) {
  const { ref, grad, opacity, onMouseMove, onMouseLeave } = useDirectionalBorder(accent);
  return (
    <div ref={ref}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-sm ${className ?? ""}`}
      style={{ 
        border: "1px solid var(--card-border)", 
        background: "var(--card-surface, rgba(255,255,255,0.7))",
        boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
      }}
      onMouseMove={onMouseMove} onMouseEnter={onMouseEnter}
      onMouseLeave={() => { onMouseLeave(); ext?.(); }}>
      <span aria-hidden style={{
        position:"absolute", inset:0, borderRadius:"inherit", padding:"1px",
        background: grad,
        WebkitMask:"linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite:"xor", maskComposite:"exclude",
        opacity, transition:"opacity 0.3s ease", pointerEvents:"none", zIndex:20,
      }}/>
      {children}
    </div>
  );
}

function TagPill({ tag, color }: { tag: string; color: string }) {
  return (
    <span className="font-mono rounded-md border px-2.5 py-0.5"
      style={{ fontSize:"11.7px", color:`${color}d9`, background:`${color}0e`, borderColor:`${color}28` }}>
      {tag}
    </span>
  );
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const [hovered, setHovered] = useState(false);
  const sc = statusConfig[project.status];

  return (
    <motion.div {...fadeUp(0.1)}>
      <GlowBorderCard accent={project.accent} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <motion.div className="absolute inset-0 -z-10" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ background:`radial-gradient(ellipse 60% 50% at 70% 50%, ${project.accentMuted.replace("0.06","0.13")}, transparent)` }}/>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left */}
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background:`${project.iconColor}15`, border:`1px solid ${project.iconColor}30` }}>
                  <Icon className="h-5 w-5" style={{ color: project.iconColor }} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono rounded-md border px-2 py-0.5 font-medium"
                    style={{ fontSize:"11.7px", color:sc.color, borderColor:sc.border, background:sc.bg }}>
                    {project.status}
                  </span>
                  <span className="font-mono" style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>{project.year}</span>
                </div>
                <span className="ml-auto font-mono rounded-md px-2 py-0.5 tracking-widest uppercase"
                  style={{ fontSize:"10.4px", color:`${project.accent}90`, background:`${project.accent}0d`, border:`1px solid ${project.accent}1f` }}>
                  Featured
                </span>
              </div>

              <h3 className="font-syne font-bold tracking-tight mb-1.5"
                style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", color:"var(--text-primary)" }}>{project.title}</h3>

              <p className="font-dm mb-4" style={{ fontSize:"15.6px", color:`${project.accent}b3` }}>{project.tagline}</p>

              <p className="font-dm mb-6 leading-[1.88] max-w-sm"
                style={{ fontSize:"14.3px", color:"var(--text-tertiary)" }}>{project.description}</p>

              <div className="mb-8 flex flex-wrap gap-1.5">
                {project.tags.map((tag,i) => <TagPill key={tag} tag={tag} color={project.tagColors[i%project.tagColors.length]} />)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="font-dm group flex items-center gap-1.5 rounded-lg px-4 py-2 font-medium transition-all duration-300"
                  style={{ fontSize:"14.3px", color:"var(--text-primary)", background:`${project.accent}18`, border:`1px solid ${project.accent}30` }}
                  onMouseEnter={(e)=>(e.currentTarget.style.background=`${project.accent}2e`)}
                  onMouseLeave={(e)=>(e.currentTarget.style.background=`${project.accent}18`)}>
                  <ExternalLink className="h-3.5 w-3.5" style={{ color:project.accent }}/>
                  Live demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="font-dm flex items-center gap-1.5 rounded-lg px-4 py-2 font-medium transition-all duration-300"
                  style={{ fontSize:"14.3px", color:"var(--text-muted)", border:"1px solid var(--card-border)" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color="var(--text-primary)")}
                  onMouseLeave={(e)=>(e.currentTarget.style.color="var(--text-muted)")}>
                  <Github className="h-3.5 w-3.5"/>
                  Source
                </a>
              )}
            </div>
          </div>

          {/* Right — metrics */}
          <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l p-8 lg:p-10" style={{ borderColor: "var(--divider)" }}>
            <p className="font-mono mb-6 tracking-[0.25em] uppercase"
              style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>Impact metrics</p>
            <div className="flex flex-col gap-6">
              {project.metrics?.map((m,i) => (
                <motion.div key={m.label}
                  initial={{ opacity:0, x:12 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:0.2+i*0.1 }}
                  className="flex flex-col gap-1">
                  <span className="font-syne font-bold tracking-tight" style={{ fontSize:"clamp(1.55rem,2.8vw,1.95rem)", color:m.color }}>
                    {m.value}
                  </span>
                  <span className="font-dm" style={{ fontSize:"14.3px", color:`${m.color}65` }}>{m.label}</span>
                  <div className="mt-1 h-px w-full" style={{ background:`${m.color}1a` }}/>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 right-0 h-32 w-32 opacity-[0.04]"
              style={{ backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize:"12px 12px" }}/>
          </div>
        </div>
      </GlowBorderCard>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const [hovered, setHovered] = useState(false);
  const sc = statusConfig[project.status];

  return (
    <motion.div {...fadeUp(0.05*index)}>
      <GlowBorderCard accent={project.accent} className="p-6 flex flex-col justify-between cursor-default h-full"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

        <motion.div className="absolute inset-0 -z-10" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration:0.35 }}
          style={{ background:`radial-gradient(ellipse 80% 60% at 50% 0%, ${project.accentMuted.replace("0.06","0.10")}, transparent)` }}/>

        <div>
          {/* Icon + links */}
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background:`${project.iconColor}18`, border:`1px solid ${project.iconColor}32` }}>
              <Icon className="h-4 w-4" style={{ color:project.iconColor }}/>
            </div>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${hovered?"opacity-100":"opacity-0"}`}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] transition-colors"
                  style={{ color:`${project.accent}80` }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color=project.accent)}
                  onMouseLeave={(e)=>(e.currentTarget.style.color=`${project.accent}80`)}
                  onClick={(e)=>e.stopPropagation()}>
                  <ExternalLink className="h-3 w-3"/>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                  style={{ color:`${project.accent}80`, border:"1px solid var(--card-border)", background:"var(--card-surface)" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color=project.accent)}
                  onMouseLeave={(e)=>(e.currentTarget.style.color=`${project.accent}80`)}
                  onClick={(e)=>e.stopPropagation()}>
                  <Github className="h-3 w-3"/>
                </a>
              )}
            </div>
          </div>

          {/* Title + badge */}
          <div className="mb-1.5 flex items-center gap-2 flex-wrap">
            <h3 className="font-syne font-bold tracking-tight" style={{ fontSize:"17.55px", color:"var(--text-primary)" }}>{project.title}</h3>
            <span className="font-mono rounded border px-1.5 py-px font-medium"
              style={{ fontSize:"10.4px", color:sc.color, borderColor:sc.border, background:sc.bg }}>
              {project.status}
            </span>
          </div>

          <p className="font-dm mb-3" style={{ fontSize:"14.3px", color:`${project.accent}99` }}>{project.tagline}</p>
          <p className="font-dm mb-5 leading-[1.78]" style={{ fontSize:"14.3px", color:"var(--text-tertiary)" }}>{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0,3).map((tag,i) => (
              <TagPill key={tag} tag={tag} color={project.tagColors[i%project.tagColors.length]}/>
            ))}
            {project.tags.length>3 && (
              <span className="font-mono px-2 py-0.5" style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>
                +{project.tags.length-3}
              </span>
            )}
          </div>
        </div>

        {project.metrics && (
          <div className="mt-5 flex gap-4 pt-4" style={{ borderTop:`1px solid ${project.accent}18` }}>
            {project.metrics.slice(0,2).map((m) => (
              <div key={m.label} className="flex flex-col gap-0.5">
                <span className="font-syne font-bold" style={{ fontSize:"17.55px", color:m.color }}>{m.value}</span>
                <span className="font-mono" style={{ fontSize:"11.7px", color:`${m.color}58` }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        <span className="font-mono absolute bottom-5 right-5" style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>{project.year}</span>
      </GlowBorderCard>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const featured = PROJECTS.find((p) => p.featured)!;
  const filtered = activeCategory === "All"
    ? PROJECTS.filter((p) => !p.featured)
    : PROJECTS.filter((p) => p.category === activeCategory && !p.featured);

  return (
    <section id="projects" className="relative px-6 sm:px-10 lg:px-16 py-24 sm:py-32" style={{ background:"transparent" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-syne { font-family:'Syne',sans-serif; }
        .font-dm   { font-family:'DM Sans',sans-serif; }
        .font-mono { font-family:'JetBrains Mono',monospace; }
        @keyframes shimmer { from { background-position:0% center; } to { background-position:200% center; } }
      `}</style>

      <div className="container mx-auto max-w-6xl">

        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono tracking-[0.3em] uppercase" style={{ fontSize:"13px", color:"var(--section-num)" }}>03 —</span>
            <span className="font-syne tracking-[0.2em] uppercase" style={{ fontSize:"13px", color:"var(--section-label)" }}>Projects</span>
            <span className="h-px w-[60px]" style={{ background:"var(--divider)" }}/>
          </div>
          <a href="#" className="group font-dm flex items-center gap-1.5 transition-colors"
            style={{ fontSize:"14.3px", color:"var(--text-muted)" }}
            onMouseEnter={(e)=>(e.currentTarget.style.color="rgba(147,197,253,0.9)")}
            onMouseLeave={(e)=>(e.currentTarget.style.color="var(--text-muted)")}>
            All work
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"/>
          </a>
        </motion.div>

        {/* Title */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <h2 className="font-syne font-bold tracking-tight leading-[1.08]" style={{ fontSize:"clamp(2rem,5vw,4rem)", color:"var(--text-primary)" }}>
            Things I&apos;ve{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage:"linear-gradient(120deg,#93c5fd 0%,#c4b5fd 45%,#f472b6 100%)", backgroundSize:"200% auto", animation:"shimmer 6s linear infinite" }}>
              shipped.
            </span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div {...fadeUp(0.1)} className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="font-mono rounded-lg border transition-all duration-250"
              style={{
                fontSize:"13px", padding:"6.5px 18.2px",
                borderColor: activeCategory===cat ? "rgba(147,197,253,0.45)" : "var(--card-border)",
                background:   activeCategory===cat ? "rgba(147,197,253,0.12)" : "var(--card-surface)",
                color:        activeCategory===cat ? "#93c5fd"                : "var(--text-muted)",
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured */}
        <AnimatePresence mode="wait">
          {(activeCategory==="All" || activeCategory===featured.category) && (
            <motion.div key="featured"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-10 }} transition={{ duration:0.4 }} className="mb-4">
              <FeaturedCard project={featured}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((project,i) => <ProjectCard key={project.id} project={project} index={i}/>)}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-14 flex flex-col items-center gap-3 text-center">
          <p className="font-dm" style={{ fontSize:"15.6px", color:"var(--text-muted)" }}>More projects on GitHub</p>
          <a href="https://github.com/anmol-roy" target="_blank" rel="noopener noreferrer"
            className="group font-mono inline-flex items-center gap-2 rounded-xl transition-all duration-300"
            style={{ fontSize:"15.6px", padding:"11.7px 26px", border:"1px solid var(--card-border)", background:"var(--card-surface)", color:"var(--text-muted)" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="rgba(147,197,253,0.35)"; e.currentTarget.style.color="#93c5fd"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="var(--card-border)"; e.currentTarget.style.color="var(--text-muted)"; }}>
            <Github className="h-4 w-4"/>
            github.com/anmol-roy
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </a>
        </motion.div>
      </div>
    </section>
  );
}