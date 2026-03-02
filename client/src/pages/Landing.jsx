/* eslint-disable */
import React from "react";
import { motion } from "framer-motion";

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
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-lemon selection:text-black">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-lemon rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(227,255,0,0.3)]">
                <span className="text-black font-black text-xl tracking-tighter">QT</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Query<span className="text-lemon">Tracker</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-10"
            >
              <a href="#features" className="text-sm font-medium text-gray-400 hover:text-lemon transition-colors uppercase tracking-widest">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-lemon transition-colors uppercase tracking-widest">Process</a>
              <a href="/user/login" className="text-sm font-medium text-gray-400 hover:text-lemon transition-colors uppercase tracking-widest">Sign In</a>
              <a href="/user/register" className="bg-lemon text-black px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(227,255,0,0.2)]">
                Get Started
              </a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-lemon/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-10"
            >
              <motion.div variants={fadeUp()} className="space-y-6">
                <div className="inline-flex items-center px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-lemon text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 bg-lemon rounded-full mr-2 animate-pulse"></span>
                  Next-Gen Hackathon OS
                </div>

                <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                  SOLVE <br />
                  <span className="text-lemon">FASTER.</span><br />
                  <span className="text-white">BUILD BIGGER.</span>
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed max-w-lg font-medium">
                  The ultimate command center for hackathon athletes. Real-time mentor routing with zero friction.
                </p>
              </motion.div>

              <motion.div variants={fadeUp()} className="flex flex-col sm:flex-row gap-6">
                <a
                  href="/user/register"
                  className="group bg-lemon text-black px-10 py-5 rounded-full font-black text-lg uppercase tracking-wider transition-all hover:bg-white hover:scale-105 shadow-[0_20px_40px_rgba(227,255,0,0.15)] flex items-center justify-center"
                >
                  Join the Mission
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a
                  href="/user/login"
                  className="border-2 border-white/10 hover:border-lemon text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-wider transition-all hover:text-lemon flex items-center justify-center"
                >
                  Dashboard
                </a>
              </motion.div>

              <motion.div variants={fadeUp()} className="flex items-center space-x-12">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-gray-900 flex items-center justify-center overflow-hidden">
                      <div className={`w-full h-full bg-gradient-to-br ${i % 2 === 0 ? 'from-lemon to-yellow-500' : 'from-gray-700 to-gray-800'}`}></div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-black text-white leading-none">5,000+</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Developers Active</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative perspective-1000"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-lemon/20 rounded-[40px] blur-2xl group-hover:bg-lemon/30 transition-all"></div>
                <div className="relative bg-black border border-white/10 rounded-[40px] p-10 shadow-2xl overflow-hidden hover:border-lemon/50 transition-colors">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="w-20 h-20 bg-lemon/10 rounded-full blur-2xl animate-pulse"></div>
                  </div>

                  <div className="space-y-10 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <div className="w-4 h-4 bg-lemon rounded-full shadow-[0_0_10px_rgba(227,255,0,0.8)]"></div>
                        <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                        <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">System Status: Optimal</div>
                    </div>

                    <div className="space-y-6">
                      <div className="h-3 bg-white/5 rounded-full w-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "70%" }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-lemon"
                        />
                      </div>
                      <div className="h-3 bg-white/5 rounded-full w-4/5"></div>
                      <div className="h-3 bg-white/5 rounded-full w-3/5"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="aspect-square bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:bg-lemon/5 hover:border-lemon/20 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-lemon/20 flex items-center justify-center text-lemon">⚡</div>
                        <div className="text-xl font-black">24ms</div>
                      </div>
                      <div className="aspect-square bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:bg-lemon/5 hover:border-lemon/20 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">⦿</div>
                        <div className="text-xl font-black">99.9%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              CORE INFRASTRUCTURE
            </h2>
            <div className="w-20 h-1.5 bg-lemon mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "HYPER-SUPPORT",
                desc: "Instant mentor routing with automated triage for complex blockers.",
                tag: "Real-time"
              },
              {
                title: "QUANTUM TRACK",
                desc: "Every ticket indexed and monitored with precision resolution metrics.",
                tag: "Analytics"
              },
              {
                title: "GLOBAL NETWORK",
                desc: "Access the highest concentration of specialized engineering talent.",
                tag: "Mentors"
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-lemon/5 hover:border-lemon/20 transition-all"
              >
                <div className="text-xs font-black text-lemon tracking-[0.3em] mb-4">{f.tag}</div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-lemon transition-colors">{f.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-lemon rounded flex items-center justify-center">
                  <span className="text-black font-black text-xs">QT</span>
                </div>
                <span className="text-xl font-black text-white tracking-tighter">QueryTracker</span>
              </div>
              <p className="text-gray-500 font-medium max-w-sm">
                Architecting the future of hackathon intelligence.
              </p>
            </div>

            <div className="flex flex-wrap gap-12 text-sm font-bold uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-lemon transition-colors">Privacy</a>
              <a href="#" className="hover:text-lemon transition-colors">Terms</a>
              <a href="#" className="hover:text-lemon transition-colors">Twitter</a>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">
            © {new Date().getFullYear()} QUERYTRACKER LABS // ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
