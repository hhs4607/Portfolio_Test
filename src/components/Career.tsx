"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  period: string;
  title: string;
  org: string;
  location: string;
  description: string[];
  tags?: string[];
  type: "work" | "project";
}

const workExperience: TimelineItem[] = [
  {
    period: "Jun 2025 — Present",
    title: "Composite Structural Engineer",
    org: "3P.COM",
    location: "Seoul, South Korea",
    description: [
      "Design and analyze composite pressure pipes under combined loads",
      "Optimize layup and joint configurations and support verification through testing",
    ],
    tags: ["FEM", "Composite Design", "Pressure Pipes"],
    type: "work",
  },
  {
    period: "Jun 2019 — Aug 2019",
    title: "Composite Research Intern",
    org: "CHOMARAT",
    location: "France",
    description: [
      "Studied non-crimp fabric (NCF) manufacturing processes",
      "Conducted fiber mechanical property testing and characterization",
    ],
    tags: ["NCF", "Material Testing", "Manufacturing"],
    type: "work",
  },
];

const researchProjects: TimelineItem[] = [
  {
    period: "Apr 2024 — Present",
    title: "Non-metallic Flexible Hydrogen Pipes Development",
    org: "KETEP",
    location: "",
    description: [
      "Designed layups and performed static/dynamic FEM analysis of non-metallic flexible hydrogen pipes",
      "Evaluated structural stability under combined MBR, internal pressure, and bending loads",
    ],
    tags: ["Hydrogen", "FEM", "KETEP"],
    type: "project",
  },
  {
    period: "Jan 2023 — Present",
    title: "Experimental Uncertainty Quantification for Composites",
    org: "Embraer",
    location: "",
    description: [
      "Performed buckling analysis with OAT sensitivity analysis and uncertainty quantification",
      "Developed an analytical buckling solver and delivered the E3B tool with theory + user manuals",
    ],
    tags: ["Embraer", "Buckling", "UQ", "E3B Tool"],
    type: "project",
  },
  {
    period: "Aug 2022 — Jun 2025",
    title: "Recyclable PMMA Resin for Large Wind Blades",
    org: "KETEP",
    location: "",
    description: [
      "Led PMMA reactive resin formulation, infusion process validation, and static/fatigue testing",
      "Contributed to two patent applications and one journal publication",
    ],
    tags: ["Wind Energy", "PMMA", "Patents", "KETEP"],
    type: "project",
  },
  {
    period: "Sep 2021 — Dec 2023",
    title: "HyFlex2® TCP/HFP Development & Technology Transfer",
    org: "TechnipFMC",
    location: "",
    description: [
      "Conducted static and fatigue tests on thermoplastic composite pipe laminates",
      "Developed HyBC for constituent-level property back-calculation and hybrid fatigue-creep models",
    ],
    tags: ["TechnipFMC", "TCP", "Fatigue-Creep"],
    type: "project",
  },
  {
    period: "Jun 2020 — Feb 2021",
    title: "Thermoplastic Composite Molding & Characterization",
    org: "Hyundai Motor",
    location: "",
    description: [
      "Predicted stiffness and strength of thermoplastic and thermoset winding systems for hydrogen pressure vessels",
      "Applied micromechanics and optimization to back-calculate fiber/matrix properties",
    ],
    tags: ["Hyundai Motor", "Hydrogen Vessels", "Micromechanics"],
    type: "project",
  },
  {
    period: "Jan 2020 — Dec 2022",
    title: "Center of Excellence for Elium® Composites",
    org: "ARKEMA",
    location: "",
    description: [
      "Conducted 2.5 m sub-scale blade static and fatigue tests comparing Elium® and epoxy systems",
      "Developed a 4-point bending compression fatigue method for stable compressive testing",
    ],
    tags: ["ARKEMA", "Wind Blades", "Elium®"],
    type: "project",
  },
  {
    period: "Jul 2018 — Sep 2020",
    title: "Glass/Elium® Composite Fatigue for Wind Applications",
    org: "ARKEMA",
    location: "",
    description: [
      "Conducted static and fatigue tests per DNV-ST-0376 and ISO 13003 standards",
      "Generated 11 S-N curves and supported ARKEMA's DNV certification (DNV-CP-0083)",
    ],
    tags: ["ARKEMA", "DNV Certification", "S-N Curves"],
    type: "project",
  },
  {
    period: "Jun 2022 — Mar 2023",
    title: "3D-Printed Ship Model Structural Design",
    org: "Hanwha Ocean",
    location: "",
    description: [
      "Evaluated anisotropic mechanical properties of ABSCF20 3D-printed materials",
      "Proposed optimized layup angles and thickness distributions to reduce deflection",
    ],
    tags: ["Hanwha Ocean", "3D Printing", "Optimization"],
    type: "project",
  },
  {
    period: "Apr 2020 — Mar 2021",
    title: "Composite Radar Mast Structural Design",
    org: "DSME",
    location: "",
    description: [
      "Performed FEM-based static/dynamic analysis of composite truss structures",
      "Designed vibration tests and proposed optimized joints for improved NVH",
    ],
    tags: ["DSME", "Naval", "NVH"],
    type: "project",
  },
  {
    period: "Feb 2019 — Apr 2020",
    title: "CFRP Fatigue for Automotive Durability",
    org: "Hyundai Motor",
    location: "",
    description: [
      "Developed a multiscale fatigue analysis methodology across four automotive structural domains",
      "Performed static and fatigue testing of glass FRP laminates",
    ],
    tags: ["Hyundai Motor", "Automotive", "Multiscale"],
    type: "project",
  },
];

function TimelineCard({
  item,
  index,
  isInView,
}: {
  item: TimelineItem;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className="group relative"
    >
      <div className="glass rounded-xl p-5 sm:p-6 card-hover relative overflow-hidden">
        {/* Accent bar */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/40 via-accent-dark/20 to-transparent" />

        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
          {/* Period */}
          <div className="sm:w-40 flex-shrink-0">
            <span className="text-xs font-mono text-accent/60 tracking-wider">
              {item.period}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Title & Org */}
            <h4 className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-accent/60 font-medium mt-0.5">
              {item.org}
              {item.location && (
                <span className="text-white/30"> · {item.location}</span>
              )}
            </p>

            {/* Description */}
            <ul className="mt-3 space-y-1.5">
              {item.description.map((desc, i) => (
                <li
                  key={i}
                  className="text-sm text-white/40 group-hover:text-white/55 transition-colors flex gap-2"
                >
                  <span className="text-accent/30 mt-1 flex-shrink-0">▸</span>
                  {desc}
                </li>
              ))}
            </ul>

            {/* Tags */}
            {item.tags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-accent/5 text-accent/50 border border-accent/10 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Career() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-line w-full" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">02 — Career Journey</p>
          <h2 className="section-title text-white">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-white/40 max-w-2xl mt-2 mb-12">
            A track record of industry collaborations with global leaders in
            composites, automotive, energy, and maritime engineering.
          </p>
        </motion.div>

        {/* Work Experience */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/20" />
            Industry Positions
          </motion.h3>
          <div className="space-y-4">
            {workExperience.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Research Projects */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/20" />
            Research & Industry Projects
          </motion.h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {researchProjects.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Professional Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 glass rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-xs font-mono text-accent/60 uppercase tracking-[0.2em] mb-6">
            Professional Activities & Conferences
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                event: "JEC World",
                location: "Paris, France",
                years: "2019, 2022–2025",
                detail: "5 consecutive years — composite manufacturing & hydrogen trends",
              },
              {
                event: "Hydrogen Summit 2025",
                location: "Netherlands",
                years: "May 2025",
                detail: "Visited Strohm TCP manufacturing lines",
              },
              {
                event: "Composites Design Workshop XXV",
                location: "Stanford University",
                years: "Jun 2023",
                detail: "Professional training — Prof. Stephen W. Tsai",
              },
            ].map((act, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all"
              >
                <div className="text-sm font-medium text-white/80">
                  {act.event}
                </div>
                <div className="text-xs text-accent/50 mt-0.5">
                  {act.location} · {act.years}
                </div>
                <div className="text-xs text-white/30 mt-2">{act.detail}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
