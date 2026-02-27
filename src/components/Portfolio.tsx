"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const futureItems = [
  {
    title: "Multiscale Fatigue Analysis Suite",
    description:
      "Interactive tool for composite fatigue prediction from constituent to structural level",
    status: "In Development",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "Composite Design Handbook",
    description:
      "Comprehensive guide to composite layup optimization and analysis methodologies",
    status: "Coming Soon",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Research Publications Archive",
    description:
      "Curated collection of research papers, data, and supplementary materials",
    status: "Coming Soon",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-line w-full" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">05 — Portfolio</p>
          <h2 className="section-title text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/40 max-w-2xl mt-2 mb-12">
            A curated showcase of engineering projects and tools — expanding
            soon with interactive demos and detailed case studies.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {futureItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col items-center text-center card-hover relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-accent/10 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-accent/10 rounded-bl-2xl" />

                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent/40 group-hover:text-accent/70 group-hover:border-accent/30 group-hover:bg-accent/10 transition-all mb-5">
                  {item.icon}
                </div>

                <h4 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-white/35 leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-accent/5 text-accent/50 border border-accent/15 uppercase tracking-[0.15em]">
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/25 font-mono">
            More projects coming soon — stay tuned for updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
