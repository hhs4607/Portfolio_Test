import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hyeonseok Han | Composite Structural Engineer & Researcher",
  description:
    "Portfolio of Hyeonseok Han — Composite Structural Engineer specializing in multiscale fatigue modeling, fiber-reinforced polymer composites, and hydrogen infrastructure.",
  keywords: [
    "composite engineering",
    "fatigue analysis",
    "polymer composites",
    "hydrogen storage",
    "structural engineer",
    "Hyeonseok Han",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050507] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
