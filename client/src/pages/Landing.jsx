/* eslint-disable */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCpu, FiMessageSquare, FiShield, FiZap, FiLayers, 
  FiCheckCircle, FiSearch, FiFileText, FiPlus, 
  FiArrowRight, FiActivity, FiUsers, FiClock 
} from "react-icons/fi";

const Tooltip = ({ target, content }) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCoords({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="relative inline-block w-full h-full"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMouseMove}
    >
      {target}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed z-[10000] pointer-events-none"
            style={{ 
              left: coords.x + 15, 
              top: coords.y + 15
            }}
          >
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-2xl border border-white/10 backdrop-blur-xl max-w-[250px] leading-relaxed">
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Landing() {
  const warmUpBackend = async () => {
    try {
      await fetch("https://query-tracker-server.onrender.com/health");
    } catch (error) {}
  };

  useEffect(() => {
    warmUpBackend();
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep text-text-main selection:bg-primary selection:text-white font-sans flex flex-col relative overflow-x-hidden">
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <Navbar />

      <main className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-25 text-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white border border-border rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-sm transform hover:scale-105 transition-transform cursor-default">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              The Next Evolution in Tech Support
            </div>

            <h1 className="text-6xl md:text-8xl xl:text-9xl font-black leading-none tracking-tighter italic font-tech text-slate-900 uppercase">
              TRACK <span className="text-primary drop-shadow-sm">QUERIES</span> <br />
              <span className="text-slate-400">SYNC</span> SOLUTIONS.
            </h1>

            <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl mx-auto font-medium uppercase tracking-tight">
              A high-performance centralized hub for developers to raise technical queries, 
              track resolution progress, and collaborate on software and hardware blockers.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Tooltip 
                content="Create your operational profile and join the resolution network."
                target={
                  <a
                    href="/user/register"
                    className="group bg-primary text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all hover:bg-secondary hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    Initialize Account <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                }
              />
              <Tooltip 
                content="Log in to your command center to manage active queries."
                target={
                  <a
                    href="/user/login"
                    className="border-2 border-border bg-white text-text-main px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all hover:bg-slate-50 hover:border-primary/30 flex items-center justify-center shadow-sm w-full sm:w-auto"
                  >
                    Access Terminal
                  </a>
                }
              />
            </div>
          </motion.div>

          {/* Centered Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-text-muted">Explore System</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </section>

        {/* Section 2: What is QueryTracker? */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase italic">System Core</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 font-tech uppercase leading-none">
                Zero Blockers. <br />
                Total <span className="text-primary italic">Control.</span>
              </h3>
              <p className="text-lg text-text-muted font-medium leading-relaxed uppercase tracking-tight">
                QueryTracker isn't just a ticketing tool; it's a centralized nervous system for 
                technical problem-solving. We bridge the gap between individual developers, 
                peer contributors, and administrative specialists to ensure every technical enigma has a resolution.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <HighlightCard icon={<FiCheckCircle />} text="100% Query Transparency" />
                <HighlightCard icon={<FiActivity />} text="Real-time Status Sync" />
                <HighlightCard icon={<FiUsers />} text="Peer-Led Analysis" />
                <HighlightCard icon={<FiShield />} text="Admin-Verified Solutions" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative p-8 bg-white border border-border rounded-[48px] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <div className="space-y-6 opacity-80">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-text-main uppercase tracking-widest font-tech">Active Transmission</span>
                  </div>
                  <span className="text-[10px] font-black text-primary font-tech tracking-tighter">REF: 88-X99</span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-slate-100 rounded-full" />
                  <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
                </div>
                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                  <div className="flex items-center gap-2 mb-2 text-primary font-black text-[9px] tracking-widest uppercase">
                    <FiZap /> Resolution Pipeline
                  </div>
                  <div className="h-3 w-5/6 bg-white rounded-full mb-2" />
                  <div className="h-3 w-4/6 bg-white rounded-full" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />)}
                  </div>
                  <div className="px-4 py-2 bg-success text-white text-[9px] font-black uppercase tracking-widest rounded-xl">RESOLVED</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Operational Workflow */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase italic">The Lifecycle</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter font-tech uppercase leading-none">
                How It <span className="text-primary">Works</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px border-t border-dashed border-white/20 -translate-y-1/2 z-0" />
              
              <Step icon={<FiFileText />} num="01" title="Initialize" desc="Create and deploy a detailed query packet outlining your technical blocker." />
              <Step icon={<FiSearch />} num="02" title="Triage" desc="System peers and admins analyze your transmission and suggest logical solutions." />
              <Step icon={<FiZap />} num="03" title="Resolve" desc="Review verified solutions and finalize the query to archive the successful protocol." />
            </div>
          </div>
        </section>

        {/* Section 4: Features Grid */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Tooltip 
              content="Connect with every active specialist in the network for instant feedback."
              target={
                <FeatureCard 
                  icon={<FiMessageSquare />} 
                  title="Peer Mesh" 
                  desc="Sync with the collective intelligence of the network."
                  label="Network"
                />
              }
            />
            <Tooltip 
              content="Proprietary security layers ensuring your data packets are safe and encrypted."
              target={
                <FeatureCard 
                  icon={<FiShield />} 
                  title="Log Privacy" 
                  desc="Enterprise-grade security for your internal protocols."
                  label="Secured"
                />
              }
            />
            <Tooltip 
              content="Ultra-low latency query processing for lightning fast updates."
              target={
                <FeatureCard 
                  icon={<FiZap />} 
                  title="Rapid Sync" 
                  desc="Milliseconds between problem report and triage."
                  label="Speed"
                />
              }
            />
            <Tooltip 
              content="Access a complete historical ledger of every query ever resolved."
              target={
                <FeatureCard 
                  icon={<FiLayers />} 
                  title="Archive Hub" 
                  desc="Persistent storage for all successful solutions."
                  label="History"
                />
              }
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase italic">Clarifications</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 font-tech uppercase leading-none">FAQ</h3>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              q="What exactly is a 'Query'?" 
              a="A Query is any technical blocker—be it a software bug, a hardware malfunction, or a general development doubt—that requires input or resolution from peers or administrators." 
            />
            <FAQItem 
              q="Who can provide solutions?" 
              a="The system is collaborative. Registered peers can suggest solutions, while verified administrators have the authority to provide official, verified resolutions." 
            />
            <FAQItem 
              q="Is it free for developers?" 
              a="QueryTracker is designed to empower developers within organization networks. Registration provides full access to the operational console." 
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-secondary p-12 md:p-24 rounded-[64px] text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
              <FiActivity size={200} />
            </div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 space-y-8"
            >
              <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase font-tech leading-none">
                Ready to <br /> Initialize?
              </h3>
              <p className="text-lg md:text-xl font-bold uppercase tracking-tight max-w-2xl mx-auto opacity-90">
                Join the fastest growing tech resolution network and never let a blocker stop your progress again.
              </p>
              <div className="pt-8">
                <a href="/user/register" className="inline-flex items-center gap-4 bg-white text-primary px-12 py-6 rounded-[32px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                  Deploy Account <FiArrowRight />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom Bar / Footer */}
        <footer className="shrink-0 p-12 border-t border-border mt-20 text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-tech text-white font-black text-[9px]">QT</div>
                <span className="font-tech text-text-main">QUERYTRACKER</span>
              </div>
              <span>© {new Date().getFullYear()} QT LABS</span>
            </div>
            <div className="flex items-center gap-10">
              <a href="#" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">Privacy Protocol</a>
              <a href="#" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">Rules of Engagement</a>
              <div className="flex items-center gap-2 text-success opacity-80">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                v1.2.0-STABLE
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
    <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-white/70 backdrop-blur-xl border border-border p-4 rounded-3xl shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-primary-glow font-tech text-white font-black text-xs">QT</div>
        <span className="text-sm font-black tracking-[0.2em] font-tech uppercase hidden sm:inline text-slate-900">Query<span className="text-primary italic">Tracker</span></span>
      </div>
      <div className="flex items-center space-x-4 md:space-x-8">
        <a href="/user/login" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all">Sign In</a>
        <a href="/user/register" className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:shadow-lg transition-all">Join Network</a>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ title, desc, label, icon }) => (
  <div className="p-8 bg-white border border-border rounded-[32px] group hover:border-primary/50 transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden flex flex-col items-center text-center">
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
      {React.cloneElement(icon, { size: 100 })}
    </div>
    <div className="w-14 h-14 bg-bg-deep rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em] mb-4">{label}</span>
    <h4 className="text-xl font-black text-slate-900 font-tech uppercase mb-3">{title}</h4>
    <p className="text-sm text-text-muted font-medium uppercase tracking-tight leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ icon, num, title, desc }) => (
  <div className="space-y-6 relative z-10 group text-center md:text-left">
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary relative group-hover:bg-primary group-hover:text-white transition-colors">
        {React.cloneElement(icon, { size: 28 })}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-[10px] font-black font-tech text-white">
          {num}
        </div>
      </div>
      <h4 className="text-2xl font-black font-tech uppercase tracking-tighter">{title}</h4>
    </div>
    <p className="text-sm text-slate-400 font-medium uppercase tracking-tight leading-relaxed">{desc}</p>
  </div>
);

const HighlightCard = ({ icon, text }) => (
  <div className="flex items-center gap-4 p-4 bg-bg-deep border border-border/50 rounded-2xl hover:bg-white transition-all cursor-default">
    <div className="w-10 h-10 bg-white border border-border rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
      {icon}
    </div>
    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{text}</span>
  </div>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border bg-white rounded-3xl overflow-hidden shadow-sm transition-all hover:border-primary/30">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
      >
        <span className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight font-tech group-hover:text-primary transition-colors">{q}</span>
        <div className={`p-2 rounded-full bg-slate-50 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <FiPlus className="text-text-muted" />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-sm md:text-base text-text-muted font-medium uppercase tracking-tight leading-relaxed border-t border-slate-50 pt-6">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
