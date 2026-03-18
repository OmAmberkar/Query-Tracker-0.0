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
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="fixed z-[10000] pointer-events-none"
            style={{ left: coords.x + 15, top: coords.y + 15 }}
          >
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-2xl border border-white/10 backdrop-blur-xl max-w-[250px] leading-relaxed relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur-xl" />
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
              <span className="relative z-10">{content}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
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
    <div className="min-h-screen bg-bg-deep text-text-main selection:bg-primary selection:text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <Navbar />

      <main className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-25 text-center max-w-7xl mx-auto relative">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8 relative z-10"
          >
            <motion.div variants={fadeUpItem} className="inline-flex items-center px-5 py-2.5 bg-white border border-slate-200 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/10 transform hover:scale-105 transition-transform cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
              <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-ping absolute"></span>
              <span className="w-2 h-2 bg-primary rounded-full mr-3 relative z-10"></span>
              <span className="relative z-10">Your Event's Digital Help Desk</span>
            </motion.div>

            <motion.h1 variants={fadeUpItem} className="text-6xl md:text-8xl xl:text-9xl font-black leading-none tracking-tighter italic font-tech text-slate-900 uppercase">
              STUCK? <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 drop-shadow-sm">GET HELP</span> <br />
              <span className="text-slate-300 relative">
                SUPER <span className="absolute -bottom-4 left-0 w-full h-2 bg-primary/20 -z-10 transform -rotate-2"></span>
              </span> FAST.
            </motion.h1>

            <motion.p variants={fadeUpItem} className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-bold uppercase tracking-tight">
              Raise your hand digitally. Tell us where you are, what’s broken, and let organizers come straight to your desk.
            </motion.p>

            <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Tooltip 
                content="Create an account and get ready for the event!"
                target={
                  <a href="/user/register" className="group relative bg-primary text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 flex items-center justify-center gap-3 w-full sm:w-auto overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-2">Register Your Team <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" /></span>
                  </a>
                }
              />
              <Tooltip 
                content="Already registered? Jump back in!"
                target={
                  <a href="/user/login" className="bg-white text-slate-800 border-2 border-slate-100 px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all hover:border-primary/30 hover:bg-slate-50 hover:-translate-y-1 flex items-center justify-center shadow-lg shadow-slate-200/50 w-full sm:w-auto">
                    Log In
                  </a>
                }
              />
            </motion.div>
          </motion.div>

          {/* Centered Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.span 
              animate={{ y: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400"
            >
              Scroll Down
            </motion.span>
            <div className="w-px h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
          </motion.div>
        </section>

        {/* Section 2: What is QueryTracker? */}
        <section className="py-32 px-6 max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black text-primary tracking-[0.5em] uppercase italic border border-primary/20">The Big Idea</div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 font-tech uppercase leading-none">
                Don't Wander. <br />
                Keep <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 italic">Building.</span>
              </h3>
              <p className="text-lg text-slate-500 font-bold leading-relaxed uppercase tracking-tight">
                Think of Query-Tracker like raising your hand in class. You don't need to waste time walking around looking for an organizer. Just post your problem, and help comes straight to your table!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <HighlightCard icon={<FiCheckCircle />} text="Pinpoint Your Location" />
                <HighlightCard icon={<FiActivity />} text="Live Status Updates" />
                <HighlightCard icon={<FiUsers />} text="Help From Other Teams" />
                <HighlightCard icon={<FiShield />} text="Organizer Verified" />
              </div>
            </motion.div>

            {/* Floating 3D Mockup Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
              className="relative perspective-1000"
            >
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative p-8 bg-white border border-slate-200 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-500" />
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest font-tech">Help Request</span>
                    </div>
                    <span className="text-[11px] font-black text-primary font-tech tracking-wider bg-primary/10 px-3 py-1 rounded-full">TABLE 12</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-slate-100 rounded-full overflow-hidden relative">
                      <motion.div initial={{x: '-100%'}} animate={{x: '100%'}} transition={{repeat: Infinity, duration: 2, ease: "linear"}} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    </div>
                    <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
                  </div>
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-3xl border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-2 mb-3 text-primary font-black text-[10px] tracking-widest uppercase">
                      <FiZap className="animate-bounce" /> Fixing Issue...
                    </div>
                    <div className="h-3 w-5/6 bg-white/80 rounded-full mb-2 shadow-inner" />
                    <div className="h-3 w-4/6 bg-white/80 rounded-full shadow-inner" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-md flex items-center justify-center text-[10px] font-bold text-slate-400">U{i}</div>)}
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} className="px-5 py-2.5 bg-success text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-[0_5px_15px_rgba(16,185,129,0.3)] cursor-pointer">
                      SOLVED
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Operational Workflow */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden rounded-[48px] mx-4 md:mx-6 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24 space-y-4">
              <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black text-primary tracking-[0.5em] uppercase border border-white/10 backdrop-blur-md">Easy as 1-2-3</span>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter font-tech uppercase leading-none mt-4">
                How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Works</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Animated Connecting Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ originX: 0 }}
                className="hidden md:block absolute top-8 left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-primary/10 via-primary to-primary/10 z-0" 
              />
              
              <Step icon={<FiFileText />} num="01" title="Ask for Help" desc="Post your problem and tell us exactly where you are sitting (e.g., 'Table 4: No Wi-Fi')." delay={0} />
              <Step icon={<FiSearch />} num="02" title="People Jump In" desc="Event admins are alerted immediately. Other teams can also reply if they know the fix!" delay={0.2} />
              <Step icon={<FiZap />} num="03" title="Back to Work" desc="Once the issue is fixed, the request is marked as 'Resolved'. Simple as that." delay={0.4} />
            </div>
          </div>
        </section>

        {/* Section 4: Features Grid */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Tooltip content="Admins busy? Other participants can jump in with solutions to keep the event moving." target={<FeatureCard icon={<FiMessageSquare />} title="Teamwork" desc="Get help from organizers or other hackers in the room." label="Community" delay={0.1}/>} />
            <Tooltip content="Don't wander around looking for an organizer. We come straight to your desk." target={<FeatureCard icon={<FiShield />} title="Stay Focused" desc="Keep coding while we bring the solution to you." label="No Wandering" delay={0.2}/>} />
            <Tooltip content="See exactly when your query goes from 'Pending' to 'Resolved'." target={<FeatureCard icon={<FiZap />} title="Live Tracking" desc="No guessing if help is on the way. Watch your ticket update live." label="Real-Time" delay={0.3}/>} />
            <Tooltip content="Look at old queries to see if someone already solved your problem." target={<FeatureCard icon={<FiLayers />} title="Help History" desc="Browse past solutions to fix things even faster." label="Archive" delay={0.4}/>} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-primary tracking-[0.5em] uppercase">Got Questions?</div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 font-tech uppercase leading-none">FAQ</h3>
          </div>
          
          <div className="space-y-4">
            <FAQItem q="What kind of problems can I post?" a="Anything that stops you from working! Whether the Wi-Fi is down, your software is acting up, or you just need an extension cord, post it here." />
            <FAQItem q="Who will actually help me?" a="Event organizers (admins) monitor the dashboard and will come to your table. Plus, if other hackers see your issue and know how to fix it, they can reply with tips!" />
            <FAQItem q="Do I need to download an app?" a="Nope! Query-Tracker runs right in your browser. Just log in, post your issue, and get right back to building your project." />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-slate-900 p-12 md:p-24 rounded-[64px] text-center text-white relative overflow-hidden shadow-2xl"
          >
            {/* Animated Glow inside CTA */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(var(--primary-rgb),0.3)_360deg)] opacity-50"
            />
            <div className="absolute inset-1 bg-slate-900 rounded-[60px] z-0" /> {/* Inner mask */}
            
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 z-10 pointer-events-none">
              <FiActivity size={250} />
            </div>

            <div className="relative z-20 space-y-8">
              <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase font-tech leading-none">
                Ready to <br /> Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Building?</span>
              </h3>
              <p className="text-lg md:text-xl font-bold uppercase tracking-tight max-w-2xl mx-auto text-slate-400">
                Join the event, register your team, and never let a technical glitch slow you down again.
              </p>
              <div className="pt-8">
                <a href="/user/register" className="group relative inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-[32px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(var(--primary-rgb),0.4)] overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-3">Register Your Team <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" /></span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="shrink-0 p-12 border-t border-slate-100 mt-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 bg-white relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-tech text-white font-black text-[9px]">QT</div>
                <span className="font-tech text-slate-800">QUERYTRACKER</span>
              </div>
              <span>© {new Date().getFullYear()} QT LABS</span>
            </div>
            <div className="flex items-center gap-10">
              <a href="#" className="hover:text-primary transition-colors underline decoration-slate-200 underline-offset-4">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors underline decoration-slate-200 underline-offset-4">Terms of Use</a>
              <div className="flex items-center gap-2 text-success bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                v1.0-LIVE
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
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-white/80 backdrop-blur-xl border border-slate-200/50 p-4 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center space-x-3 group cursor-pointer">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_5px_15px_rgba(var(--primary-rgb),0.3)] font-tech text-white font-black text-sm group-hover:rotate-12 transition-transform duration-300">QT</div>
        <span className="text-sm font-black tracking-[0.2em] font-tech uppercase hidden sm:inline text-slate-900">Query<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 italic">Tracker</span></span>
      </div>
      <div className="flex items-center space-x-4 md:space-x-6">
        <a href="/user/login" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Log In</a>
        <a href="/user/register" className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:shadow-[0_5px_15px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-0.5 transition-all duration-300">Register Team</a>
      </div>
    </motion.div>
  </nav>
);

const FeatureCard = ({ title, desc, label, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    viewport={{ once: true }}
    className="p-8 bg-white border border-slate-100 rounded-[32px] group hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.1)] hover:-translate-y-2 relative overflow-hidden flex flex-col items-center text-center"
  >
    <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500">
      {React.cloneElement(icon, { size: 120 })}
    </div>
    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300 shadow-inner">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em] mb-4 bg-primary/10 px-3 py-1 rounded-full">{label}</span>
    <h4 className="text-xl font-black text-slate-900 font-tech uppercase mb-3">{title}</h4>
    <p className="text-sm text-slate-500 font-bold uppercase tracking-tight leading-relaxed">{desc}</p>
  </motion.div>
);

const Step = ({ icon, num, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true }}
    className="space-y-6 relative z-10 group text-center md:text-left bg-slate-800/50 p-8 rounded-[32px] border border-white/5 backdrop-blur-sm hover:bg-slate-800 transition-colors"
  >
    <div className="flex flex-col md:flex-row items-center gap-5">
      <div className="w-16 h-16 bg-slate-700/50 border border-white/10 rounded-2xl flex items-center justify-center text-primary relative group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
        {React.cloneElement(icon, { size: 28 })}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 border border-primary/30 rounded-full flex items-center justify-center text-[10px] font-black font-tech text-white shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">
          {num}
        </div>
      </div>
      <h4 className="text-2xl font-black font-tech uppercase tracking-tighter text-white">{title}</h4>
    </div>
    <p className="text-sm text-slate-400 font-bold uppercase tracking-tight leading-relaxed">{desc}</p>
  </motion.div>
);

const HighlightCard = ({ icon, text }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-default group">
    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-colors shadow-sm shrink-0">
      {icon}
    </div>
    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest group-hover:text-primary transition-colors">{text}</span>
  </div>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border bg-white rounded-3xl overflow-hidden transition-all duration-300 ${open ? 'border-primary/30 shadow-[0_10px_30px_rgba(var(--primary-rgb),0.1)]' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}>
      <button 
        onClick={() => setOpen(!open)}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
      >
        <span className={`text-sm md:text-base font-black uppercase tracking-tight font-tech transition-colors ${open ? 'text-primary' : 'text-slate-900 group-hover:text-primary'}`}>{q}</span>
        <div className={`p-2 rounded-full transition-all duration-300 ${open ? 'bg-primary text-white rotate-45' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
          <FiPlus />
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
            <div className="px-8 pb-8 text-sm md:text-base text-slate-500 font-bold uppercase tracking-tight leading-relaxed border-t border-slate-50 pt-6">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;