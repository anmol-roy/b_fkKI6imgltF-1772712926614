"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  Clock, Users, TrendingUp, AlertCircle, Lightbulb,
  CheckCircle2, ChevronDown,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

interface Metric {
  label: string; before: string; after: string; delta: string;
  positive: boolean; afterColor: string;
}
interface Phase { title: string; summary: string; bullets: string[]; }
interface CaseStudy {
  id: number; index: string; title: string; subtitle: string;
  role: string; duration: string; team: string; year: string;
  accent: string; accentMuted: string;
  problem: string; approach: string; outcome: string;
  tags: string[]; tagColors: string[];
  metrics: Metric[]; phases: Phase[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1, index: "01",
    title: "Reducing ML inference latency by 68%",
    subtitle: "Production optimisation for a real-time recommendation engine",
    role: "ML Engineer · Backend", duration: "3 months", team: "4 engineers", year: "2024",
    accent: "#93c5fd", accentMuted: "rgba(147,197,253,0.07)",
    problem:  "A recommendation engine serving 50k daily users was averaging 1.4s per inference — causing visible UI lag and a 22% drop-off at the recommendation carousel.",
    approach: "Profiled the full request path. Found 60% of latency in tokenisation, not the model. Applied ONNX export, INT8 quantisation, and batched async preprocessing.",
    outcome:  "Latency dropped from 1.4s to 450ms. Carousel engagement +31%. Infrastructure cost fell 40% after right-sizing.",
    tags: ["PyTorch", "ONNX", "FastAPI", "CUDA", "Redis"],
    tagColors: ["#fb923c", "#60a5fa", "#34d399", "#c084fc", "#f472b6"],
    metrics: [
      { label: "Inference latency",   before: "1,400ms", after: "450ms",  delta: "−68%",  positive: true,  afterColor: "#34d399" },
      { label: "Carousel engagement", before: "34%",     after: "44.5%",  delta: "+31%",  positive: true,  afterColor: "#60a5fa" },
      { label: "Infra cost / month",  before: "$1,200",  after: "$720",   delta: "−40%",  positive: true,  afterColor: "#86efac" },
      { label: "Model accuracy",      before: "91.2%",   after: "90.8%",  delta: "−0.4%", positive: false, afterColor: "#fca5a5" },
    ],
    phases: [
      { title: "Profiling & diagnosis",
        summary: "Mapped every millisecond of the request pipeline.",
        bullets: ["Used py-spy and CUDA profiler to trace CPU/GPU utilisation","Found tokenisation accounted for 820ms of total latency","Identified redundant JSON serialisation at inference boundary"] },
      { title: "Model optimisation",
        summary: "Converted and quantised without meaningful accuracy loss.",
        bullets: ["Exported fine-tuned BERT to ONNX format","Applied dynamic INT8 quantisation via ONNX Runtime","Benchmarked 50 production payloads — 0.4% accuracy delta accepted"] },
      { title: "Serving layer rewrite",
        summary: "Rebuilt the API to handle concurrency properly.",
        bullets: ["Replaced Flask sync server with async FastAPI + uvicorn","Implemented request batching with 20ms window, max batch 32","Added Redis layer for embedding cache on repeat user IDs"] },
    ],
  },
  {
    id: 2, index: "02",
    title: "Building an offline-first mobile AI app",
    subtitle: "End-to-end design and engineering of Pocketlens",
    role: "Full-stack · ML · Mobile", duration: "6 weeks", team: "Solo project", year: "2023",
    accent: "#c4b5fd", accentMuted: "rgba(196,181,253,0.07)",
    problem:  "Existing image recognition apps require a network round-trip — unusable in low-connectivity environments like agriculture or wildlife monitoring fieldwork.",
    approach: "Selected MobileNetV3-Small, fine-tuned on 12k domain images, converted to TFLite with full-integer quantisation. Built Flutter UI for one-handed use.",
    outcome:  "Shipped to Play Store and App Store. 4.7★ across 800+ reviews. Adopted by two agricultural NGOs in India for crop disease identification.",
    tags: ["Flutter", "TensorFlow Lite", "Python", "Dart", "Firebase"],
    tagColors: ["#67e8f9", "#fb923c", "#60a5fa", "#c4b5fd", "#fbbf24"],
    metrics: [
      { label: "Inference time",   before: "—", after: "74ms",    delta: "On-device",    positive: true, afterColor: "#67e8f9" },
      { label: "Model size",       before: "—", after: "4.2 MB",  delta: "No server",    positive: true, afterColor: "#86efac" },
      { label: "App store rating", before: "—", after: "4.7 ★",   delta: "800+ reviews", positive: true, afterColor: "#fbbf24" },
      { label: "Top-5 accuracy",   before: "—", after: "94.1%",   delta: "1000 classes", positive: true, afterColor: "#c4b5fd" },
    ],
    phases: [
      { title: "Model selection & training",
        summary: "Chose the smallest model that met the accuracy bar.",
        bullets: ["Benchmarked MobileNetV2, V3-Small, V3-Large, EfficientNet-Lite0","MobileNetV3-Small hit 93.8% top-5 at 4.2MB — best trade-off","Fine-tuned on 12k domain images with aggressive augmentation"] },
      { title: "On-device conversion",
        summary: "Quantised to INT8 without hitting the accuracy floor.",
        bullets: ["Used TFLite converter with representative dataset calibration","Full-integer quantisation brought model to 4.2MB from 16MB","Validated on 500 held-out samples — 94.1% top-5 achieved"] },
      { title: "UX & Flutter build",
        summary: "Designed for one-handed fieldwork use.",
        bullets: ["Camera auto-focuses on subject — no tap required","Results appear in <100ms after shutter with confidence bar","Offline-first: zero network calls, all inference local"] },
    ],
  },
  {
    id: 3, index: "03",
    title: "Designing a zero-drop-rate data pipeline",
    subtitle: "Reliable event ingestion for a real-time analytics platform",
    role: "Backend Engineer", duration: "8 weeks", team: "3 engineers", year: "2024",
    accent: "#86efac", accentMuted: "rgba(134,239,172,0.07)",
    problem:  "A dashboard product was silently dropping 3–8% of incoming events during traffic spikes, corrupting analytics data. No queue — any downstream slowness caused dropped writes.",
    approach: "Introduced a Kafka-based event bus between HTTP endpoint and DB writers. Designed dead-letter queue strategy. Rewrote consumer in Go. Added end-to-end event tracing.",
    outcome:  "Event drop rate fell from 5.2% to 0.0% over 60 days. Peak throughput increased 8×. Audit trail enables post-hoc replay of any 30-day window.",
    tags: ["Kafka", "Go", "PostgreSQL", "Redis", "Prometheus"],
    tagColors: ["#fbbf24", "#86efac", "#818cf8", "#f472b6", "#fb923c"],
    metrics: [
      { label: "Event drop rate",   before: "5.2%",   after: "0.0%",     delta: "−100%",         positive: true,  afterColor: "#34d399" },
      { label: "Peak throughput",   before: "1.2k/s", after: "9.8k/s",   delta: "+716%",          positive: true,  afterColor: "#86efac" },
      { label: "P99 write latency", before: "840ms",  after: "95ms",     delta: "−89%",           positive: true,  afterColor: "#60a5fa" },
      { label: "Infra overhead",    before: "—",       after: "+$180/mo", delta: "Kafka cluster",  positive: false, afterColor: "#fca5a5" },
    ],
    phases: [
      { title: "Failure analysis",
        summary: "Traced exactly where and why events were being lost.",
        bullets: ["Added request-ID headers and correlated with DB write logs","Confirmed drops happened during P99 DB latency spikes","Quantified drop rate at 3–8% using 72h of production logs"] },
      { title: "Queue architecture",
        summary: "Decoupled ingestion from writes with Kafka.",
        bullets: ["3-broker Kafka cluster with replication factor 3","Partitioned by user_id for ordered per-user event streams","Dead-letter topic for schema-invalid events with alert trigger"] },
      { title: "Consumer rewrite & observability",
        summary: "Rebuilt consumers in Go with full tracing.",
        bullets: ["Go consumer with worker pool — 8 workers per partition","Prometheus metrics: consumer lag, throughput, DLQ rate","Grafana SLO alert at >0.01% drop rate"] },
    ],
  },
];

function useDirectionalBorder(accent: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [grad, setGrad] = useState("none");
  const [opacity, setOpacity] = useState(0);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const min = Math.min(x, 1-x, y, 1-y);
    const angle = min===x ? 270 : min===1-x ? 90 : min===y ? 0 : 180;
    const s = 55;
    setGrad(`conic-gradient(from ${angle-s}deg at ${x*100}% ${y*100}%, transparent 0deg, ${accent}cc ${s*.6}deg, ${accent} ${s}deg, ${accent}cc ${s*1.4}deg, transparent ${s*2}deg, transparent 360deg)`);
    setOpacity(1);
  }, [accent]);
  const onMouseLeave = useCallback(() => setOpacity(0), []);
  return { ref, grad, opacity, onMouseMove, onMouseLeave };
}

function GlowBorderCard({ children, accent, className }: { children: React.ReactNode; accent: string; className?: string }) {
  const { ref, grad, opacity, onMouseMove, onMouseLeave } = useDirectionalBorder(accent);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl backdrop-blur-sm ${className??""}`}
      style={{
        border: "1px solid var(--card-border)",
        background: "var(--card-surface, rgba(255,255,255,0.7))",
        boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
      }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <span aria-hidden style={{
        position:"absolute",inset:0,borderRadius:"inherit",padding:"1px",background:grad,
        WebkitMask:"linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite:"xor",maskComposite:"exclude",
        opacity,transition:"opacity 0.3s ease",pointerEvents:"none",zIndex:20,
      }}/>
      {children}
    </div>
  );
}

function MetricPill({ metric }: { metric: Metric }) {
  return (
    <div className="flex items-center justify-between py-2 last:border-0 gap-2"
      style={{ borderBottom: "1px solid var(--divider)" }}>
      <span className="font-dm truncate" style={{ fontSize:"12px", color:"var(--text-tertiary)", minWidth:0, flex:1 }}>
        {metric.label}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        {metric.before !== "—" && (
          <span className="font-mono line-through hidden sm:inline"
            style={{ fontSize:"11px", color:"var(--text-faint)" }}>{metric.before}</span>
        )}
        <span className="font-syne font-bold" style={{ fontSize:"13px", color:metric.afterColor }}>
          {metric.after}
        </span>
        <span className="font-mono rounded px-1.5 py-px whitespace-nowrap"
          style={{ fontSize:"10px", color:metric.positive ? metric.afterColor : "#fca5a5", background:metric.positive ? `${metric.afterColor}14` : "rgba(252,165,165,0.08)" }}>
          {metric.delta}
        </span>
      </div>
    </div>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  const summaryItems = [
    { icon: AlertCircle,  label: "Problem",  text: study.problem,  ic: "#fca5a5", bg: "rgba(252,165,165,0.06)",  bd: "rgba(252,165,165,0.14)" },
    { icon: Lightbulb,    label: "Approach", text: study.approach, ic: "#fbbf24", bg: "rgba(251,191,36,0.06)",   bd: "rgba(251,191,36,0.14)"  },
    { icon: CheckCircle2, label: "Outcome",  text: study.outcome,  ic: "#86efac", bg: "rgba(134,239,172,0.06)",  bd: "rgba(134,239,172,0.14)" },
  ];

  return (
    <motion.div {...fadeUp(0.05 * index)}>
      <GlowBorderCard accent={study.accent}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background:`linear-gradient(90deg,transparent,${study.accent}55,transparent)` }}/>

        <div className="p-4 sm:p-6">

          {/* ── Title row ── */}
          <div className="mb-3">
            <div className="flex items-start gap-2 mb-1">
              <span className="font-syne font-black tracking-tighter shrink-0 leading-none"
                style={{ fontSize:"22px", color:`${study.accent}2e`, marginTop:"2px" }}>
                {study.index}
              </span>
              <div className="min-w-0">
                <h3 className="font-syne font-bold tracking-tight leading-snug"
                  style={{ fontSize:"clamp(14px, 3.5vw, 17px)", color:"var(--text-primary)" }}>
                  {study.title}
                </h3>
                <p className="font-dm mt-0.5 leading-snug"
                  style={{ fontSize:"12px", color:`${study.accent}78` }}>
                  {study.subtitle}
                </p>
              </div>
            </div>

            {/* Meta row — wraps gracefully on mobile */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 ml-8">
              <span className="font-mono flex items-center gap-1"
                style={{ fontSize:"11px", color:`${study.accent}65` }}>
                <Clock className="h-2.5 w-2.5 shrink-0"/>{study.duration}
              </span>
              <span className="font-mono flex items-center gap-1"
                style={{ fontSize:"11px", color:"var(--text-muted)" }}>
                <Users className="h-2.5 w-2.5 shrink-0"/>{study.team}
              </span>
              <span className="font-mono"
                style={{ fontSize:"11px", color:"var(--text-faint)" }}>
                {study.year}
              </span>
            </div>
          </div>

          {/* ── Tags ── */}
          <div className="flex flex-wrap gap-1 mb-4">
            {study.tags.slice(0, 4).map((t, i) => (
              <span key={t} className="font-mono rounded border px-2 py-px"
                style={{ fontSize:"10px", color:`${study.tagColors[i % study.tagColors.length]}d9`, background:`${study.tagColors[i % study.tagColors.length]}0d`, borderColor:`${study.tagColors[i % study.tagColors.length]}28` }}>
                {t}
              </span>
            ))}
            {study.tags.length > 4 && (
              <span className="font-mono px-1" style={{ fontSize:"10px", color:"var(--text-faint)" }}>
                +{study.tags.length - 4}
              </span>
            )}
          </div>

          {/* ── Summary — stacked on mobile, 3-col on sm+ ── */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 mb-4">
            {summaryItems.map(({ icon: Icon, label, text, ic, bg, bd }) => (
              <div key={label} className="rounded-lg px-3 py-2.5"
                style={{ background: bg, border:`1px solid ${bd}` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="h-3 w-3 shrink-0" style={{ color: ic }}/>
                  <span className="font-mono tracking-[0.18em] uppercase"
                    style={{ fontSize:"9px", color: ic }}>{label}</span>
                </div>
                <p className="font-dm leading-[1.65]"
                  style={{ fontSize:"12px", color:"var(--text-secondary)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* ── Toggle ── */}
          <button onClick={() => setExpanded(v => !v)}
            className="font-dm flex items-center gap-1.5 transition-colors duration-200 py-1"
            style={{ fontSize:"13px", color:"var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = study.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
            <TrendingUp className="h-3.5 w-3.5 shrink-0"/>
            {expanded ? "Hide" : "View"} metrics &amp; process
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
              <ChevronDown className="h-3.5 w-3.5"/>
            </motion.span>
          </button>
        </div>

        {/* ── Expanded panel ── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease:[0.25,0.46,0.45,0.94] }}
              className="overflow-hidden">
              {/* stacked on mobile, side-by-side on lg */}
              <div className="border-t grid grid-cols-1 lg:grid-cols-2"
                style={{ borderColor:"var(--divider)" }}>

                {/* Metrics */}
                <div className="p-4 sm:p-6 border-b lg:border-b-0 lg:border-r"
                  style={{ borderColor:"var(--divider)" }}>
                  <p className="font-mono mb-3 tracking-[0.25em] uppercase"
                    style={{ fontSize:"10px", color:`${study.accent}55` }}>Results</p>
                  {study.metrics.map(m => <MetricPill key={m.label} metric={m}/>)}
                </div>

                {/* Process */}
                <div className="p-4 sm:p-6">
                  <p className="font-mono mb-3 tracking-[0.25em] uppercase"
                    style={{ fontSize:"10px", color:`${study.accent}55` }}>Process</p>

                  {/* Phase tabs — scrollable on mobile */}
                  <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
                    {study.phases.map((phase, i) => (
                      <button key={i} onClick={() => setActivePhase(i)}
                        className="font-mono rounded px-2.5 py-1 transition-all duration-200 shrink-0"
                        style={{ fontSize:"11px", background:activePhase===i ? study.accentMuted : "transparent", border:`1px solid ${activePhase===i ? study.accent+"30" : "var(--card-border)"}`, color:activePhase===i ? study.accent : "var(--text-muted)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={activePhase}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                      <p className="font-syne font-bold mb-0.5"
                        style={{ fontSize:"14px", color: study.accent }}>
                        {study.phases[activePhase].title}
                      </p>
                      <p className="font-dm leading-relaxed mb-2.5"
                        style={{ fontSize:"12px", color:`${study.accent}62` }}>
                        {study.phases[activePhase].summary}
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {study.phases[activePhase].bullets.map((b, i) => (
                          <motion.li key={i}
                            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="font-dm flex items-start gap-2 leading-[1.7]"
                            style={{ fontSize:"12px", color:"var(--text-tertiary)" }}>
                            <span className="mt-2 h-1 w-1 rounded-full shrink-0"
                              style={{ background:`${study.accent}80` }}/>
                            {b}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowBorderCard>
    </motion.div>
  );
}

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-32"
      style={{ background: "transparent" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer { from { background-position: 0% center; } to { background-position: 200% center; } }
      `}</style>

      <div className="container mx-auto max-w-5xl">

        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-8 flex items-center gap-3 flex-wrap">
          <span className="font-mono tracking-[0.3em] uppercase"
            style={{ fontSize:"12px", color:"var(--section-num)" }}>04 —</span>
          <span className="font-syne tracking-[0.2em] uppercase"
            style={{ fontSize:"12px", color:"var(--section-label)" }}>Case Studies</span>
          <span className="h-px w-10 hidden sm:block" style={{ background:"var(--divider)" }}/>
        </motion.div>

        {/* Heading */}
        <motion.div {...fadeUp(0.05)} className="mb-3">
          <h2 className="font-syne font-bold tracking-tight leading-[1.08]"
            style={{ fontSize:"clamp(1.75rem, 6vw, 3.5rem)", color:"var(--text-primary)" }}>
            How I solve{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage:"linear-gradient(120deg,#93c5fd 0%,#c4b5fd 45%,#f472b6 100%)", backgroundSize:"200% auto", animation:"shimmer 6s linear infinite" }}>
              hard problems.
            </span>
          </h2>
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="font-dm mb-8 max-w-lg leading-[1.85]"
          style={{ fontSize:"clamp(13px, 3vw, 15px)", color:"var(--text-muted)" }}>
          Real engineering challenges — the problem, the decisions, and the measurable outcome.
        </motion.p>

        <div className="flex flex-col gap-3">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i}/>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 shrink-0" style={{ background:"var(--divider)" }}/>
          <p className="font-mono" style={{ fontSize:"11px", color:"var(--text-faint)" }}>
            All metrics from production data. Some details anonymised.
          </p>
        </motion.div>

      </div>
    </section>
  );
}