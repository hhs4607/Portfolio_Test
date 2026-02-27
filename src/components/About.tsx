"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const researchInterests = [
  "Multiscale fatigue & durability of fiber-reinforced polymer composites",
  "Mechanical and fatigue testing under multi-environmental conditions",
  "Thermoplastic & thermoset composite processing (VARTM, filament winding, AFP/ATL)",
  "Integrated workflow: testing → micromechanics → structural analysis → design → manufacturing",
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-line w-full" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">01 — About</p>
          <h2 className="section-title text-white">
            Engineering the Future of{" "}
            <span className="text-gradient">Composite Materials</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column - Bio */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-white/60 leading-relaxed text-lg">
              I am a composite structural engineer and Ph.D. candidate at
              Hanyang University, specializing in the multiscale fatigue
              behavior of fiber-reinforced polymer composites. My research
              focuses on developing predictive methodologies that bridge the gap
              between microscale material behavior and full-scale structural
              performance.
            </p>
            <p className="text-white/50 leading-relaxed">
              With over 7 years of research experience spanning 15+ industry
              collaborations — including partnerships with Hyundai Motor,
              TechnipFMC, ARKEMA, Embraer, and Hanwha Ocean — I bring a
              deep understanding of both the scientific fundamentals and
              practical engineering demands of advanced composite systems.
            </p>
            <p className="text-white/50 leading-relaxed">
              My dissertation, &ldquo;Multiscale Fatigue Modeling of Composite
              Structures and Its Application to Hydrogen Storage Tanks and
              Distribution Pipes,&rdquo; represents the culmination of work
              connecting constituent-level fatigue to structural-level
              durability prediction.
            </p>

            {/* Education badges */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <div className="glass rounded-xl px-5 py-4 flex-1 card-hover">
                <div className="text-xs font-mono text-accent/70 mb-1 uppercase tracking-wider">
                  Integrated M.S./Ph.D.
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Hanyang University
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Convergence Mechanical Engineering · 2018–2025
                </div>
              </div>
              <div className="glass rounded-xl px-5 py-4 flex-1 card-hover">
                <div className="text-xs font-mono text-accent/70 mb-1 uppercase tracking-wider">
                  B.S. Mechanical Engineering
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Jeonbuk National University
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Mechanical Engineering · 2010–2018
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Research Interests */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-mono text-accent/80 uppercase tracking-wider mb-6">
                Research Interests
              </h3>
              <div className="space-y-4">
                {researchInterests.map((interest, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex gap-3 group"
                  >
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(0,212,255,0.5)] transition-all flex-shrink-0" />
                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                      {interest}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Fellowship highlight */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 font-medium">
                      BK21 FOUR Fellowship
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">
                      Korea National Competitive Fellowship · 27.6M KRW
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
