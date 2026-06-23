"use client";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

interface Tech {
  name: string;
  icon: string;
  color: string;
}

const STACK: { category: string; items: Tech[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "Python",     icon: "devicon-python-plain",                    color: "#3b82f6" },
      { name: "TypeScript", icon: "devicon-typescript-plain",                color: "#60a5fa" },
      { name: "Dart",       icon: "devicon-dart-plain",                      color: "#67e8f9" },
      { name: "Go",         icon: "devicon-go-plain",                        color: "#86efac" },
      { name: "C++",        icon: "devicon-cplusplus-plain",                 color: "#c4b5fd" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React",    icon: "devicon-react-original",                    color: "#67e8f9" },
      { name: "Next.js",  icon: "devicon-nextjs-plain",                      color: "#64748b" },
      { name: "Flutter",  icon: "devicon-flutter-plain",                     color: "#60a5fa" },
      { name: "Tailwind", icon: "devicon-tailwindcss-plain",                 color: "#38bdf8" },
      { name: "Figma",    icon: "devicon-figma-plain",                       color: "#f472b6" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "PyTorch",    icon: "devicon-pytorch-plain",                   color: "#fb923c" },
      { name: "TensorFlow", icon: "devicon-tensorflow-original",             color: "#f97316" },
      { name: "NumPy",      icon: "devicon-numpy-plain",                     color: "#93c5fd" },
      { name: "OpenCV",     icon: "devicon-opencv-plain",                    color: "#86efac" },
      { name: "Jupyter",    icon: "devicon-jupyter-plain",                   color: "#fbbf24" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "FastAPI",    icon: "devicon-fastapi-plain",                   color: "#10b981" },
      { name: "Node.js",    icon: "devicon-nodejs-plain",                    color: "#22c55e" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain",                color: "#818cf8" },
      { name: "Redis",      icon: "devicon-redis-plain",                     color: "#f87171" },
      { name: "MongoDB",    icon: "devicon-mongodb-plain",                   color: "#4ade80" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: "devicon-docker-plain",                        color: "#38bdf8" },
      { name: "Git",    icon: "devicon-git-plain",                           color: "#fb923c" },
      { name: "Linux",  icon: "devicon-linux-plain",                         color: "#fbbf24" },
      { name: "AWS",    icon: "devicon-amazonwebservices-plain-wordmark",     color: "#fb923c" },
      { name: "GitHub", icon: "devicon-github-original",                     color: "#64748b" },
    ],
  },
];

function TechIcon({ tech, delay }: { tech: Tech; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className="group flex flex-col items-center gap-1.5 cursor-default"
    >
      <div
        className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
        style={{
          background: `${tech.color}14`,
          border: `1px solid ${tech.color}35`,
          boxShadow: `inset 0 1px 0 ${tech.color}18`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = `${tech.color}22`;
          el.style.border = `1px solid ${tech.color}70`;
          el.style.boxShadow = `0 0 18px ${tech.color}30, inset 0 1px 0 ${tech.color}30`;
          const icon = el.querySelector("i") as HTMLElement;
          if (icon) icon.style.color = tech.color;
          const label = el.parentElement?.querySelector("span") as HTMLElement;
          if (label) label.style.color = `${tech.color}cc`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = `${tech.color}14`;
          el.style.border = `1px solid ${tech.color}35`;
          el.style.boxShadow = `inset 0 1px 0 ${tech.color}18`;
          const icon = el.querySelector("i") as HTMLElement;
          if (icon) icon.style.color = `${tech.color}80`;
          const label = el.parentElement?.querySelector("span") as HTMLElement;
          if (label) label.style.color = "var(--text-muted)";
        }}
      >
        <i
          className={`${tech.icon} text-lg transition-colors duration-300`}
          style={{ color: `${tech.color}80` }}
        />
      </div>

      <span
        className="text-[10px] tracking-wide transition-colors duration-300"
        style={{ color: "var(--text-muted)" }}
      >
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative px-6 sm:px-10 lg:px-16 py-14 sm:py-20"
      style={{ background: "transparent" }}
    >
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

      <div className="container mx-auto max-w-6xl">

        <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-4">
          <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--section-num)" }}>
            05 — Tech Stack
          </span>
          <span className="h-px w-[60px]" style={{ background: "var(--divider)" }} />
        </motion.div>

        <motion.p {...fadeUp(0.05)} className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
          Tools I reach for daily.
        </motion.p>

        <div className="flex flex-col" style={{ borderColor: "var(--divider)" }}>
          {STACK.map((group, gi) => (
            <motion.div
              key={group.category}
              {...fadeUp(0.05 + gi * 0.04)}
              className="flex items-center gap-6 py-4"
              style={{ borderBottom: gi < STACK.length - 1 ? "1px solid var(--divider)" : "none" }}
            >
              <span className="w-24 shrink-0 text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--text-faint)" }}>
                {group.category}
              </span>
              <div className="flex flex-wrap gap-3">
                {group.items.map((tech, ti) => (
                  <TechIcon key={tech.name} tech={tech} delay={0.05 + gi * 0.04 + ti * 0.03} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
