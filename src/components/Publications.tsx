"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const publications = [
  {
    authors:
      "Jiming Sun, Hyeonseok Han, Sooyeon Ahn, Seongsu Jung, Sung Kyu Ha",
    title:
      "Development of Lightweight Thermoplastic Acrylic PMMA Composites and Characterization of Their Mechanical Properties",
    journal: "Polymers",
    volume: "17(11), 1563",
    date: "Jun 2025",
    type: "journal",
  },
  {
    authors: "Hyeonseok Han, Yuen Xia, Sung Kyu Ha",
    title:
      "Characterization of Fatigue Properties of Fiber-Reinforced Polymer Composites Based on a Multiscale Approach",
    journal: "Polymers",
    volume: "17(1), 157",
    date: "Jan 2025",
    type: "journal",
  },
  {
    authors:
      "Vaibhav Somaji Anuse, Shankar K, R. Velmurugan, Sung Kyu Ha, Hyeonseok Han",
    title:
      "Effect of Graphene Nano-platelets on the Low-Velocity Impact and Compression-after-Impact Strength of Glass Fiber/Epoxy Composite Laminates",
    journal: "Journal of Composite Materials",
    volume: "",
    date: "Jan 2024",
    type: "journal",
  },
];

const patents = [
  {
    title:
      "Method for Accelerating Physical Dissolution of PMMA Using Low-Temperature Ultrasonic Waves and Recovering Polymer Materials",
    number: "KR Patent Application No. 10-2025-0131335",
    status: "Patent Pending",
    date: "Sep 2025",
  },
  {
    title:
      "Recyclable PMMA Resin Composition and Composite Manufacturing Method",
    number: "KR Patent Application No. 10-2025-0120622",
    status: "Patent Pending",
    date: "Aug 2025",
  },
];

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="publications" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-line w-full" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">03 — Research Output</p>
          <h2 className="section-title text-white">
            Publications & <span className="text-gradient">Patents</span>
          </h2>
        </motion.div>

        {/* Publications */}
        <div className="mt-12 space-y-4">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/20" />
            Journal Publications
          </motion.h3>

          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="glass rounded-xl p-5 sm:p-6 card-hover group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent/40 to-accent-dark/20 rounded-l-xl" />

              <div className="pl-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-medium text-white/85 group-hover:text-white transition-colors leading-relaxed">
                      {pub.title}
                    </h4>
                    <p className="text-sm text-white/40 mt-2">
                      {pub.authors
                        .split("Hyeonseok Han")
                        .map((part, j, arr) =>
                          j < arr.length - 1 ? (
                            <span key={j}>
                              {part}
                              <span className="text-accent/70 font-medium">
                                Hyeonseok Han
                              </span>
                            </span>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                      <span className="text-xs font-medium text-accent/60 font-mono">
                        {pub.journal}
                      </span>
                      {pub.volume && (
                        <span className="text-xs text-white/30">
                          {pub.volume}
                        </span>
                      )}
                      <span className="text-xs text-white/25">{pub.date}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-accent/40"
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
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Patents */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/20" />
            Patent Applications
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {patents.map((patent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="glass rounded-xl p-5 sm:p-6 card-hover group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-amber-400/30 to-transparent" />

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-amber-400/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-relaxed">
                      {patent.title}
                    </h4>
                    <p className="text-xs font-mono text-white/30 mt-2">
                      {patent.number}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-amber-500/10 text-amber-400/60 border border-amber-500/15 uppercase tracking-wider">
                        {patent.status}
                      </span>
                      <span className="text-xs text-white/25">
                        {patent.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
