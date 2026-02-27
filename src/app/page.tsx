import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Career from "@/components/Career";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AiChat from "@/components/AiChat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative noise">
        <Hero />
        <About />
        <Career />
        <Publications />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <AiChat />
    </>
  );
}
