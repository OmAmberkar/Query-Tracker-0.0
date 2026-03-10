/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiCpu } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Landing() {
  const container = useRef();
  const cursorRef = useRef();
  const cursorGlowRef = useRef();

  const warmUpBackend = async () => {
    try {
      await fetch("https://query-tracker-server.onrender.com/health");
      console.log("Backend warm-up triggered");
    } catch (error) {
      console.log("Warm-up request sent");
    }
  };

  useEffect(() => {
    warmUpBackend();
  }, []);

  useGSAP(() => {
    // Mouse follower
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });
    const gxTo = gsap.quickTo(cursorGlowRef.current, "x", { duration: 0.8, ease: "power2" });
    const gyTo = gsap.quickTo(cursorGlowRef.current, "y", { duration: 0.8, ease: "power2" });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gxTo(e.clientX);
      gyTo(e.clientY);
    });

    // Hero Text Parallax & Entrance
    gsap.from(".hero-title span", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.to(".hero-title", {
      yPercent: -20,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Background Orbs Animation
    gsap.to(".bg-orb", {
      x: "random(-100, 100)",
      y: "random(-100, 100)",
      duration: "random(10, 20)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Scroll Animations
    const sections = gsap.utils.toArray(".reveal-section");
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Hero & Grid Entrance
    const tl = gsap.timeline();

    tl.from(".nav-anim", { y: -20, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".hero-title", { x: -40, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.6")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .from(".hero-btns", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.6")
      .from(".about-card", { scale: 0.9, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8")
      .from(".mini-card", { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
      .from(".footer-anim", { opacity: 0, duration: 1 }, "-=0.4");

    // Background Orbs Breathing
    gsap.to(".bg-orb", {
      scale: 1.1,
      opacity: 0.2,
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

  }, { scope: container });

  return (
    <div ref={container} className="h-screen bg-bg-deep text-text-main overflow-hidden selection:bg-primary selection:text-white font-sans cursor-none flex flex-col relative">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" style={{ transform: 'translate(-50%, -50%)' }} />
      <div ref={cursorGlowRef} className="fixed w-64 h-64 bg-primary/10 rounded-full pointer-events-none z-[9998] blur-[80px] hidden md:block" style={{ transform: 'translate(-50%, -50%)' }} />

      {/* Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="bg-orb absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="bg-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10 p-6 pt-24 max-w-[1600px] mx-auto w-full flex flex-col gap-6 overflow-hidden">
        {/* Top Section: Hero + Summary */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">

          {/* Hero: Left Side (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 h-full">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-1.5 bg-white border border-border rounded-full text-primary text-[9px] font-black uppercase tracking-[0.3em] shadow-sm w-fit">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                Protocol v1.0.4 Online
              </div>

              <h1 className="hero-title text-6xl xl:text-8xl font-black leading-none tracking-tighter italic font-tech text-text-main uppercase">
                SOLVE <span className="text-primary">DOUBTS</span> <br />
                <span className="text-text-muted">LIGHTNING</span> FASTER.
              </h1>

              <p className="hero-desc text-sm xl:text-base text-text-muted leading-relaxed max-w-xl font-medium uppercase tracking-tight">
                The ultimate centralized nervous system for developers. Deploy queries, clear blockers, and sync with peer-led solutions in real-time.
              </p>
            </div>

            <div className="hero-btns flex flex-col sm:flex-row gap-4">
              <a
                href="/user/register"
                onClick={warmUpBackend}
                className="group bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-secondary shadow-primary-glow flex items-center justify-center"
              >
                Initialize Account →
              </a>
              <a
                href="/user/login"
                className="border border-border bg-white text-text-main px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-bg-deep flex items-center justify-center shadow-sm"
              >
                Access Terminal
              </a>
            </div>
          </div>

          {/* Right Side: Features/About (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4 overflow-hidden">
            {/* About Card */}
            <div className="about-card bg-white border border-border p-6 rounded-[32px] shadow-sm relative overflow-hidden group flex-1 flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiCpu size={60} />
              </div>
              <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-4 italic">Core Objective</h2>
              <h3 className="text-xl font-black tracking-tighter mb-4 text-text-main font-tech uppercase">Bridge the Gap</h3>
              <p className="text-[11px] text-text-muted font-bold leading-relaxed uppercase tracking-tight">
                Raise queries instantly as an employee or participant. Leverage peer suggestions or direct admin intervention to clear hardware and software blockers.
              </p>
            </div>

            {/* Features Mini-Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
              <MiniCard
                title="Peer Solutions"
                desc="Crowdsourced expertise"
                label="Sync"
              />
              <MiniCard
                title="Admin Support"
                desc="Expert resolution"
                label="Auth"
              />
              <MiniCard
                title="Live Tracking"
                desc="Real-time status"
                label="Ping"
              />
              <MiniCard
                title="Secure Logs"
                desc="Archived history"
                label="Safe"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quick Info / Footer */}
        <footer className="footer-anim shrink-0 flex items-center justify-between border-t border-border pt-4 text-[8px] font-black uppercase tracking-[0.4em] text-text-muted">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} QT LABS</span>
            <span className="hidden sm:inline">// ENCRYPTED NODE 44-X</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
              NETWORK READY
            </div>
            <a href="#" className="hover:text-primary transition-colors">v1.0.0-Stable</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

const Navbar = () => (
  <nav className="nav-anim fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-border">
    <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-primary-glow font-tech text-white font-black text-xs">QT</div>
        <span className="text-sm font-black tracking-[0.2em] font-tech uppercase">Query<span className="text-primary">Tracker</span></span>
      </div>
      <div className="flex items-center space-x-6">
        <a href="/user/login" className="text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-primary">Sign In</a>
        <a href="/user/register" className="bg-primary text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-secondary shadow-sm">Join</a>
      </div>
    </div>
  </nav>
);

const MiniCard = ({ title, desc, label }) => (
  <div className="mini-card bg-surface border border-border p-5 rounded-2xl group hover:border-primary/50 transition-all shadow-sm flex flex-col justify-center h-full relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
    <span className="text-[7px] font-black text-primary uppercase tracking-[0.4em] mb-2">{label}</span>
    <h4 className="text-[11px] font-black text-text-main font-tech uppercase mb-1">{title}</h4>
    <p className="text-[9px] text-text-muted font-bold uppercase tracking-tighter leading-none">{desc}</p>
  </div>
);

export default Landing;
