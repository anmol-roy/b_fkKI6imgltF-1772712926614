"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  Mail, Github, Linkedin, Twitter, Send,
  CheckCircle2, MapPin, Clock, Copy, Check
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const SOCIALS = [
  { icon: Github,   label: "GitHub",   sub: "@anmol-roy",       href: "https://github.com/anmol-roy",           color: "#64748b", hoverBg: "rgba(100,116,139," },
  { icon: Linkedin, label: "LinkedIn", sub: "anmol-kumar-roy",   href: "https://linkedin.com/in/anmol-kumar-roy", color: "#60a5fa", hoverBg: "rgba(96,165,250,"  },
  { icon: Twitter,  label: "Twitter",  sub: "@anmolroy_dev",     href: "https://twitter.com/anmolroy_dev",        color: "#67e8f9", hoverBg: "rgba(103,232,249," },
  { icon: Mail,     label: "Email",    sub: "anmol@example.com", href: "mailto:anmol@example.com",               color: "#c4b5fd", hoverBg: "rgba(196,181,253," },
];

const INFO_ITEMS = [
  { icon: Mail,   color: "#c4b5fd", text: "anmol@example.com",           copyable: true  },
  { icon: MapPin, color: "#f472b6", text: "India · Remote worldwide",    copyable: false },
  { icon: Clock,  color: "#fbbf24", text: "IST (GMT +5:30) · <24h reply", copyable: false },
];

type Status = "idle" | "sending" | "sent" | "error";

function CopyButton({ text, color }: { text: string; color: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      whileTap={{ scale: 0.88 }}
      className="p-1.5 rounded-lg transition-colors"
      style={{ color: copied ? color : "var(--text-faint)", background: copied ? `${color}14` : "transparent" }}
      title="Copy"
    >
      <AnimatePresence mode="wait">
        {copied
          ? <motion.div key="y" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="h-3.5 w-3.5" /></motion.div>
          : <motion.div key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy className="h-3.5 w-3.5" /></motion.div>}
      </AnimatePresence>
    </motion.button>
  );
}

function InputField({ label, name, type = "text", placeholder, value, onChange, required, rows }: {
  label: string; name: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-mono uppercase tracking-[0.18em]"
        style={{ fontSize: "11.05px", color: focused ? "rgba(147,197,253,0.8)" : "var(--text-muted)" }}
      >
        {label}{required && <span className="ml-1" style={{ color: "#60a5fa" }}>*</span>}
      </label>
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: focused
              ? "0 0 0 1.5px rgba(147,197,253,0.35), 0 0 20px rgba(147,197,253,0.07)"
              : "0 0 0 1px var(--card-border)",
          }}
          transition={{ duration: 0.2 }}
          style={{ borderRadius: "0.75rem" }}
        />
        <Tag
          name={name} type={type} placeholder={placeholder} value={value} rows={rows}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          required={required}
          className="font-dm w-full rounded-xl px-4 py-3 outline-none resize-none transition-colors"
          style={{
            fontSize: "14.95px",
            color: "var(--text-primary)",
            background: "var(--card-surface)",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const set = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1400));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative px-6 sm:px-10 lg:px-16 py-14 sm:py-20" style={{ background: "transparent" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes shimmer { from { background-position: 0% center; } to { background-position: 200% center; } }
      `}</style>

      <div className="container mx-auto max-w-6xl">

        {/* Label */}
        <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-4">
          <span className="font-mono tracking-[0.3em] uppercase" style={{ fontSize: "12.35px", color: "var(--section-num)" }}>07 —</span>
          <span className="font-syne tracking-[0.2em] uppercase" style={{ fontSize: "12.35px", color: "var(--section-label)" }}>Contact</span>
          <span className="h-px w-[60px]" style={{ background: "var(--divider)" }} />
        </motion.div>

        {/* Heading */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <h2 className="font-syne font-bold tracking-tight leading-[1.08]" style={{ fontSize: "clamp(1.9rem,4.5vw,3.4rem)", color: "var(--text-primary)" }}>
            Let&apos;s build something{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(120deg,#93c5fd 0%,#c4b5fd 50%,#f472b6 100%)", backgroundSize: "200% auto", animation: "shimmer 6s linear infinite" }}>
              together.
            </span>
          </h2>
          <p className="font-dm mt-3 max-w-md leading-relaxed" style={{ fontSize: "15.6px", color: "var(--text-tertiary)" }}>
            A project, a role, or just a conversation — my inbox is open.
          </p>
        </motion.div>

        {/* Two-col */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-4 items-start">

          {/* FORM */}
          <motion.div {...fadeUp(0.08)}
            className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 sm:p-8"
            style={{ 
              border: "1px solid var(--card-border)", 
              background: "var(--card-surface)",
              boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
            }}>
            <div className="absolute top-0 left-0 right-0 h-[1.5px]"
              style={{ background: "linear-gradient(90deg,transparent,rgba(147,197,253,0.5),transparent)" }} />

            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-14 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
                    <CheckCircle2 className="h-14 w-14" style={{ color: "#34d399" }} />
                  </motion.div>
                  <div>
                    <p className="font-syne font-bold mb-1" style={{ fontSize: "18.85px", color: "var(--text-primary)" }}>
                      Message sent!
                    </p>
                    <p className="font-dm" style={{ fontSize: "14.95px", color: "var(--text-tertiary)" }}>
                      I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" ref={formRef} onSubmit={handleSubmit}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Name"    name="name"  placeholder="Anmol Roy"         value={form.name}    onChange={set("name")}    required />
                    <InputField label="Email"   name="email" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required />
                  </div>
                  <InputField label="Subject"  name="subject"  placeholder="What's this about?" value={form.subject}  onChange={set("subject")} />
                  <InputField label="Message"  name="message"  placeholder="Tell me about the project, role, or idea…" value={form.message} onChange={set("message")} required rows={5} />

                  <motion.button type="submit" disabled={status === "sending"}
                    whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.97 }}
                    className="font-dm mt-1 flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition-all duration-300"
                    style={{ 
                      fontSize: "15.6px", 
                      color: "var(--text-primary)", 
                      background: "linear-gradient(135deg,rgba(147,197,253,0.18),rgba(196,181,253,0.15))", 
                      border: "1px solid rgba(147,197,253,0.28)" 
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg,rgba(147,197,253,0.3),rgba(196,181,253,0.25))"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg,rgba(147,197,253,0.18),rgba(196,181,253,0.15))"; }}>
                    <AnimatePresence mode="wait">
                      {status === "sending" ? (
                        <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5">
                          <motion.div className="h-4 w-4 rounded-full border-2 border-t-blue-400"
                            style={{ borderColor: "var(--card-border)", borderTopColor: "#60a5fa" }}
                            animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                          Sending…
                        </motion.div>
                      ) : (
                        <motion.div key="go" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5">
                          <Send className="h-4 w-4" style={{ color: "#93c5fd" }} />
                          Send message
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3">

            {/* Info card */}
            <motion.div {...fadeUp(0.12)}
              className="rounded-2xl backdrop-blur-sm p-5"
              style={{ 
                border: "1px solid var(--card-border)", 
                background: "var(--card-surface)",
                boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
              }}>
              <p className="font-mono mb-4 tracking-[0.28em] uppercase" style={{ fontSize: "10.4px", color: "var(--text-faint)" }}>Info</p>
              <div className="flex flex-col gap-3">
                {INFO_ITEMS.map(({ icon: Icon, color, text, copyable }) => (
                  <div key={text} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ background: `${color}14`, border: `1px solid ${color}28` }}>
                        <Icon className="h-3.5 w-3.5" style={{ color }} />
                      </div>
                      <span className="font-dm" style={{ fontSize: "13.65px", color: "var(--text-secondary)" }}>{text}</span>
                    </div>
                    {copyable && <CopyButton text={text} color={color} />}
                  </div>
                ))}

                <div className="mt-1 flex items-center gap-2.5 pt-3" style={{ borderTop: "1px solid var(--divider)" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "#34d399" }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#34d399" }} />
                  </span>
                  <span className="font-dm" style={{ fontSize: "13.65px", color: "rgba(52,211,153,0.85)" }}>
                    Available for new projects
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Socials card */}
            <motion.div {...fadeUp(0.16)}
              className="rounded-2xl backdrop-blur-sm p-5"
              style={{ 
                border: "1px solid var(--card-border)", 
                background: "var(--card-surface)",
                boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
              }}>
              <p className="font-mono mb-4 tracking-[0.28em] uppercase" style={{ fontSize: "10.4px", color: "var(--text-faint)" }}>Elsewhere</p>
              <div className="flex flex-col gap-1">
                {SOCIALS.map(({ icon: Icon, label, sub, href, color, hoverBg }, i) => {
                  const [hov, setHov] = useState(false);
                  return (
                    <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
                      style={{ 
                        border: `1px solid ${hov ? color + "28" : "transparent"}`, 
                        background: hov ? `${hoverBg}0.08)` : "transparent" 
                      }}
                      initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.18 + i * 0.06 }}
                      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      whileHover={{ x: 4 }}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200"
                        style={{ 
                          background: hov ? `${color}18` : "var(--card-surface)", 
                          border: `1px solid ${hov ? color + "30" : "var(--card-border)"}`, 
                          boxShadow: hov ? `0 0 12px ${color}30` : "none" 
                        }}>
                        <Icon className="h-3.5 w-3.5 transition-colors duration-200" style={{ color: hov ? color : "var(--text-muted)" }} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-dm font-medium leading-none mb-0.5 transition-colors duration-200"
                          style={{ fontSize: "14.3px", color: hov ? color : "var(--text-secondary)" }}>{label}</span>
                        <span className="font-mono truncate transition-colors duration-200"
                          style={{ fontSize: "11.05px", color: hov ? `${color}70` : "var(--text-muted)" }}>{sub}</span>
                      </div>
                      <motion.span className="ml-auto font-mono" animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -4 }} transition={{ duration: 0.18 }}
                        style={{ fontSize: "13px", color }}>→</motion.span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}