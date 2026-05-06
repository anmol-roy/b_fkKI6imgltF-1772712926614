// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   ArrowDown,
//   Star,
//   MapPin,
//   Clock,
//   Users,
//   Folder,
//   ExternalLink,
// } from "lucide-react";
// import HeroSection from "./sections/HeroSection";

// // Typing Animation Component
// interface TypingAnimationProps {
//   text: string;
//   delay?: number;
//   onComplete?: () => void;
// }

// const TypingAnimation = ({
//   text,
//   delay = 130,
//   onComplete,
// }: TypingAnimationProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const hasCompletedRef = useRef(false);

//   useEffect(() => {
//     if (currentIndex >= text.length) {
//       if (!hasCompletedRef.current) {
//         hasCompletedRef.current = true;
//         onComplete?.();
//       }
//       return;
//     }

//     const timer = setTimeout(() => {
//       setCurrentIndex((prev) => prev + 1);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [currentIndex, text.length, delay, onComplete]);

//   const isComplete = currentIndex >= text.length;

//   return (
//     <span>
//       {text.slice(0, currentIndex)}
//       {!isComplete && <span className="animate-pulse ml-1">|</span>}
//     </span>
//   );
// };


// export default function Overview() {
//   const [mounted, setMounted] = useState(false);
//   const [typingComplete, setTypingComplete] = useState(false);
//   const heroRef = useRef<HTMLDivElement>(null);

//   // Removed useScroll hook - it was causing hydration errors and wasn't being used
//   // If you need scroll progress, add it back after component mounts:
//   // const [scrollProgress, setScrollProgress] = useState(0);
//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     if (heroRef.current) {
//   //       const rect = heroRef.current.getBoundingClientRect();
//   //       const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
//   //       setScrollProgress(progress);
//   //     }
//   //   };
//   //   window.addEventListener('scroll', handleScroll);
//   //   return () => window.removeEventListener('scroll', handleScroll);
//   // }, [mounted]);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleTypingComplete = () => {
//     setTypingComplete(true);
//   };

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   interface WavePoint {
//     key: number;
//     posX: number;
//     posY: number;
//   }

//   const [wavePoints, setWavePoints] = useState<WavePoint[]>([]);
//   const [lastMouseMove, setLastMouseMove] = useState(0);
//   const waveCounterRef = useRef(0);

//   const createWave = (posX: number, posY: number) => {
//     const wave = { key: Date.now() + waveCounterRef.current++, posX, posY };
//     setWavePoints((prev) => [...prev, wave]);

//     setTimeout(() => {
//       setWavePoints((prev) => prev.filter((w) => w.key !== wave.key));
//     }, 1000);
//   };

//   const triggerWave = (event: React.MouseEvent<HTMLDivElement>) => {
//     const bounds = event.currentTarget.getBoundingClientRect();
//     const posX = event.clientX - bounds.left;
//     const posY = event.clientY - bounds.top;
//     createWave(posX, posY);
//   };

//   const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
//     const bounds = event.currentTarget.getBoundingClientRect();
//     const touch = event.touches[0];
//     if (touch) {
//       const posX = touch.clientX - bounds.left;
//       const posY = touch.clientY - bounds.top;
//       createWave(posX, posY);
//     }
//   };

//   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
//     const now = Date.now();
//     if (now - lastMouseMove > 100) {
//       setLastMouseMove(now);
//       triggerWave(event);
//     }
//   };

//   const quickStats = [
//     { icon: Users, label: "Followers", value: "120" },
//     { icon: Folder, label: "Projects", value: "25" },
//     { icon: Star, label: "Stars", value: "80" },
//     { icon: Clock, label: "Experience", value: "2+ years" },
//     { icon: MapPin, label: "Location", value: "Raipur, India" },
//   ];

//   const pinnedProjects = [
//     {
//       title: "Blood Pressure Estimation App",
//       description:
//         "AI-powered mobile app for non-invasive blood pressure estimation using PPG signals.",
//       tech: ["Flutter", "TensorFlow", "Dart"],
//       link: "https://github.com/anmol-roy/SBP_DBP-prediction-model-with-flutter-application",
//       icon: "🩺",
//     },
//     {
//       title: "STEM Education Platform",
//       description:
//         "A comprehensive educational platform that makes STEM education engaging and accessible through gamification",
//       tech: ["HTML5", "CSS3", "JavaScript", "firebase", "Phaser.js"],
//       link: "https://github.com/anmol-roy/SIH2025",
//       icon: "📚",
//     },
//     {
//       title: "AI Resume Analyzer",
//       description:
//         "AI-powered resume analyzer providing instant feedback, ATS scores, and job-specific improvement tips for better applications.",
//       tech: ["React", "TailwindCSS", "Puter.js", "Pdf.js"],
//       link: "https://github.com/anmol-roy/Resume-Analyzer",
//       icon: "📋",
//     },
//   ];

//   const currentFocus = [
//     "Learning backend development with Node.js and Express.js",
//     "Exploring advanced AI/ML techniques and frameworks",
//     "Building more full-stack web applications",
//     "Contributing to open-source projects",
//   ];

//   const techStack = [
//     { name: "C++", icon: "⚡", category: "language" },
//     { name: "Python", icon: "🐍", category: "language" },
//     { name: "JavaScript", icon: "🟨", category: "language" },
//     { name: "TypeScript", icon: "🔷", category: "language" },
//     { name: "HTML", icon: "🌐", category: "frontend" },
//     { name: "CSS", icon: "🎨", category: "frontend" },
//     { name: "TailwindCSS", icon: "💨", category: "frontend" },
//     { name: "React", icon: "⚛️", category: "frontend" },
//     { name: "Next.js", icon: "▲", category: "frontend" },
//     { name: "Node.js", icon: "🟢", category: "backend" },
//     { name: "Express.js", icon: "🚂", category: "backend" },
//     { name: "MongoDB", icon: "🍃", category: "backend" },
//     { name: "MySQL", icon: "🐬", category: "backend" },
//     { name: "AWS", icon: "☁️", category: "tools" },
//     { name: "Git", icon: "📚", category: "tools" },
//     { name: "GitHub", icon: "🐙", category: "tools" },
//     { name: "Figma", icon: "🎨", category: "tools" },
//     { name: "Flutter", icon: "🦋", category: "mobile" },
//     { name: "Docker", icon: "🐳", category: "tools" },
//     { name: "TensorFlow", icon: "🤖", category: "ai" },
//     { name: "PyTorch", icon: "🔥", category: "ai" },
//     { name: "OpenCV", icon: "📷", category: "ai" },
//     { name: "Keras", icon: "🧠", category: "ai" },
//     { name: "LangChain", icon: "🧩", category: "ai" },
//     { name: "Firebase", icon: "🔥", category: "backend" },
//     { name: "Pandas", icon: "🐼", category: "ai" },
//     { name: "NumPy", icon: "🔢", category: "ai" },
//     { name: "Scikit-learn", icon: "📊", category: "ai" },
//     { name: "Dart", icon: "🎯", category: "mobile" },
//     { name: "Phaser.js", icon: "🎮", category: "frontend" },
//   ];

//   const activities = [
//     {
//       date: "Oct 2025",
//       description: "Started working on Voice Assistant using Transformers",
//     },
//     { date: "Sept 2025", description: "Completed Generative AI mini-project" },
//     { date: "Aug 2025", description: "Deployed Blood Pressure Estimation App" },
//   ];

//   const achievements = [
//     { icon: "🏆", title: "Built & published 3 apps", year: "2025" },
//     {
//       icon: "🌐",
//       title: "Completed 45-Day Vocational AI/ML Training",
//       year: "2025",
//     },
//     { icon: "🎓", title: "Presented ML Project at IIIT", year: "2024" },
//   ];

//   if (!mounted || !typingComplete) {
//     return (
//       <section
//         ref={heroRef}
//         className="relative flex min-h-[450px] justify-start px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
//       >
//         <div className="container mx-auto flex max-w-4xl flex-col justify-center">
//           <div className="flex flex-col items-center text-center w-full">
//             <h1 className="mb-0 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white">
//               <span className="block text-gray-300 mb-2">Hi, I&apos;m</span>
//               <span
//                 className="bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#60a5fa] 
//     bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text"
//               >
//                 <TypingAnimation
//                   text="Anmol Roy"
//                   delay={120}
//                   onComplete={handleTypingComplete}
//                 />
//               </span>
//             </h1>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <HeroSection />

//       {/* Content Sections */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
//         {/* Quick Stats */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
//             Overview
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
//             {quickStats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 className="text-center p-3 sm:p-4 rounded-md bg-gradient-to-br border border-[#2c235a] bg-[#1f096f70] hover:border-purple-500 transition-all duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mx-auto mb-2" />
//                 <div className="text-xl sm:text-2xl font-bold text-white">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-400">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Pinned Projects */}
//         <motion.section
//           id="projects"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
//             Featured Projects
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {pinnedProjects.map((project, index) => (
//               <motion.div
//                 key={project.title}
//                 className="border-[#2c235a] rounded-md p-4 sm:p-5 bg-gradient-to-br border bg-[#1f096f20] hover:border-purple-500 transition-all duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="flex items-center gap-2 sm:gap-3 mb-3">
//                   <span className="text-lg sm:text-xl">{project.icon}</span>
//                   <h3 className="font-semibold text-white text-base sm:text-lg">
//                     {project.title}
//                   </h3>
//                 </div>
//                 <p className="text-gray-400 text-xs sm:text-sm mb-3 leading-relaxed">
//                   {project.description}
//                 </p>
//                 <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
//                   {project.tech.map((tech) => (
//                     <span
//                       key={tech}
//                       className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//                 <a
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   href={project.link}
//                   className="text-blue-400 text-xs sm:text-sm hover:text-blue-300 transition-colors inline-flex items-center gap-1"
//                 >
//                   View Details
//                   <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
//                 </a>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Current Focus */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
//             Current Focus
//           </h2>
//           <div className="rounded-md p-6 bg-[#141024] border border-[#2c235a] hover:border-[#8b5cf6] transition-all duration-300">
//             <ul className="text-gray-300 space-y-2 sm:space-y-3">
//               {currentFocus.map((focus, index) => (
//                 <motion.li
//                   key={index}
//                   className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base"
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <span className="text-green-400 mt-1">•</span>
//                   <span>{focus}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </div>
//         </motion.section>

//         {/* Skills Section */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
//             Skills
//           </h2>
//           <div className="rounded-md p-4 sm:p-6 bg-gradient-to-br border border-[#2c235a] bg-[#1f096f20]">
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               {techStack.filter(Boolean).map((tech, index) => (
//                 <motion.div
//                   key={tech.name}
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#21215ad8] rounded-md text-white border border-gray-600 hover:border-purple-400 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-all duration-300"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3, delay: index * 0.03 }}
//                   viewport={{ once: true }}
//                 >
//                   <span>{tech.icon}</span>
//                   <span className="font-medium">{tech.name}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.section>

//         {/* Recent Activity */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
//             Recent Activity
//           </h2>
//           <div className="rounded-md p-4 sm:p-6 bg-gradient-to-br border border-[#2c235a] bg-[#1f096f20]">
//             <div className="space-y-3 sm:space-y-4">
//               {activities.map((activity, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex items-start gap-3 sm:gap-4 py-2"
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="flex-shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full mt-2"></div>
//                   <div>
//                     <p className="text-gray-300 text-sm sm:text-base">
//                       {activity.description}
//                     </p>
//                     <p className="text-gray-500 text-xs sm:text-sm mt-1">
//                       {activity.date}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.section>

//         {/* Achievements */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
//             Achievements
//           </h2>
//           <div className="rounded-md p-4 sm:p-6 bg-gradient-to-br border border-[#2c235a] bg-[#1f096f20]">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//               {achievements.map((achievement, index) => (
//                 <motion.div
//                   key={achievement.title}
//                   className="text-center p-4 sm:p-5 border border-gray-600 rounded-md bg-[#21215ad8] hover:border-purple-400 transition-all duration-300"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="text-2xl sm:text-3xl mb-2">
//                     {achievement.icon}
//                   </div>
//                   <h3 className="text-white font-medium mb-1 text-sm sm:text-base">
//                     {achievement.title}
//                   </h3>
//                   <p className="text-gray-400 text-xs sm:text-sm">
//                     {achievement.year}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.section>

//         {/* Get in Touch */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
//             Get in Touch
//           </h2>
//           <div className="rounded-md p-4 sm:p-6 bg-gradient-to-br border border-[#2c235a] bg-[#1f096f20]">
//             <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
//               I&apos;m always open to discussing new projects, creative ideas,
//               or opportunities to be part of your visions. Feel free to reach
//               out!
//             </p>
//             <div className="flex flex-wrap gap-3 sm:gap-4">
//               <motion.a
//                 href="mailto:anmolroy.dev@gmail.com"
//                 className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Email Me
//               </motion.a>
//               <motion.a
//                 href="https://github.com/anmol-roy"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white border border-gray-600 rounded-md hover:border-gray-500 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 GitHub
//               </motion.a>
//               <motion.a
//                 href="https://linkedin.com/in/anmol-roy"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white border border-gray-600 rounded-md hover:border-gray-500 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 LinkedIn
//               </motion.a>
//             </div>
//           </div>
//         </motion.section>
//       </div>
//     </div>
//   );
// }