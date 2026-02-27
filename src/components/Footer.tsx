"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="section-container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-dark to-accent flex items-center justify-center text-white font-bold text-[10px]">
            H
          </div>
          <span className="text-xs text-white/30 font-mono">
            Hyeonseok Han
          </span>
        </div>

        <div className="text-xs text-white/20 font-mono">
          Designed & Built with Next.js + Tailwind CSS
        </div>

        <div className="text-xs text-white/20 font-mono">
          &copy; {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
}
