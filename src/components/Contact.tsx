"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contactMethods = [
  {
    label: "Email",
    value: "hhs4607@gmail.com",
    href: "mailto:hhs4607@gmail.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+82-10-3951-4424",
    href: "tel:+821039514424",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Seoul, South Korea",
    href: null,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-line w-full" />
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-dark/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="section-subtitle">06 — Contact</p>
          <h2 className="section-title text-white">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-white/40 mt-4 leading-relaxed">
            Interested in composite engineering, research collaboration, or
            industrial partnerships? I&apos;m always open to discussing new
            opportunities and challenges.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {contactMethods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              {method.href ? (
                <a
                  href={method.href}
                  className="glass rounded-xl p-5 flex flex-col items-center text-center card-hover block group"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent/50 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/10 transition-all mb-3">
                    {method.icon}
                  </div>
                  <div className="text-xs font-mono text-accent/50 uppercase tracking-wider mb-1">
                    {method.label}
                  </div>
                  <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                    {method.value}
                  </div>
                </a>
              ) : (
                <div className="glass rounded-xl p-5 flex flex-col items-center text-center group">
                  <div className="w-11 h-11 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent/50 mb-3">
                    {method.icon}
                  </div>
                  <div className="text-xs font-mono text-accent/50 uppercase tracking-wider mb-1">
                    {method.label}
                  </div>
                  <div className="text-sm text-white/60">{method.value}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a href="mailto:hhs4607@gmail.com" className="btn-primary">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send Me a Message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
