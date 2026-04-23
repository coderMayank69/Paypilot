import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  PlayCircle, 
  CheckCircle2, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Clock, 
  AlertCircle,
  Menu,
  X,
  CreditCard,
  Zap,
  TrendingUp,
  Play
} from "lucide-react";
import { useState, useEffect } from "react";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/70 backdrop-blur-2xl border-b border-gray-200/30 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-2xl shadow-black/20">
            <motion.div 
              animate={{ rotate: [45, 225, 45] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 bg-white" 
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-on-surface">PayPilot</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-10">
          {["Product", "Features", "Case Studies", "Pricing"].map((item, i) => (
            <motion.a 
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href="#" 
              className={`text-sm font-medium transition-colors ${i === 0 ? "text-black" : "text-gray-400 hover:text-black"}`}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="hidden md:block text-sm font-medium text-gray-400 hover:text-black transition-colors">Login</button>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-7 py-3 rounded-full font-medium text-sm shadow-xl shadow-black/10 transition-all"
          >
            Get Started
          </motion.button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden"
          >
            <div className="p-12 flex flex-col gap-6">
              {["Product", "Features", "Case Studies", "Pricing"].map((item) => (
                <a key={item} href="#" className="text-2xl font-semibold text-black">{item}</a>
              ))}
              <hr className="border-gray-100" />
              <button className="text-left text-2xl font-semibold text-gray-500">Login</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="hero-gradient pt-56 pb-24 px-6 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-block px-4 py-1.5 bg-white border border-gray-100 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-10 text-gray-400 shadow-sm"
          >
            Intelligence Protocol 2.4
          </motion.span>
          <h1 className="text-7xl md:text-[88px] leading-[0.95] font-semibold tracking-tighter mb-10 text-on-surface">
            The future of <br /> <span className="text-gray-300">automated capital.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
            Streamline your accounts receivable with cinematic precision and intelligent risk scoring.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-black text-white rounded-2xl font-medium shadow-2xl shadow-black/20 flex items-center gap-3 group"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white border border-gray-100 text-gray-900 rounded-2xl font-medium shadow-sm hover:shadow-lg transition-all"
            >
              View System Demo
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative"
        >
          {/* Decorative Floaters */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 w-48 h-48 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col p-6 text-left hidden lg:flex"
          >
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Confidence Score</div>
            <div className="text-3xl font-bold mb-4">98.4%</div>
            <div className="mt-auto h-1 w-full bg-gray-50 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "98%" }} transition={{ delay: 2, duration: 1 }} className="h-full bg-black" />
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-12 -left-12 w-56 h-32 bg-black rounded-3xl shadow-2xl flex flex-col p-6 text-left text-white hidden lg:flex"
          >
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Daily Liquidity</div>
            <div className="text-2xl font-bold tracking-tight">+$12,480.00</div>
          </motion.div>

          {/* Main Dashboard UI */}
          <div className="relative bg-white rounded-[48px] shadow-2xl border border-gray-100 p-6">
             <div className="aspect-video bg-gray-50 rounded-[32px] overflow-hidden relative border border-gray-100/50">
                <div className="p-10 flex gap-10 h-full">
                  <div className="w-20 flex flex-col gap-6">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                        className={`w-full aspect-square rounded-2xl ${i === 1 ? "bg-black" : "bg-gray-200"}`} 
                      />
                    ))}
                  </div>
                  <div className="flex-1 space-y-10">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-6 w-48 bg-gray-200 rounded-md" />
                        <div className="h-3 w-32 bg-gray-100 rounded-md" />
                      </div>
                      <div className="h-14 w-40 bg-black rounded-2xl" />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="h-48 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <div className="h-2 w-1/2 bg-gray-100 rounded mb-4" />
                            <div className="h-8 w-2/3 bg-gray-200 rounded" />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const cards = [
    { title: "Manual Tracking", desc: "Say goodbye to spreadsheets. Auto-sync your ledger with cinematic flow.", icon: <Clock /> },
    { title: "Smart Liquidity", desc: "Predictive capital management for high-growth modern business units.", icon: <TrendingUp /> },
    { title: "Pulse Analysis", desc: "Real-time risk scoring across your entire client base automatically.", icon: <AlertCircle /> }
  ];

  return (
    <section className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, borderColor: "#000" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-surface p-12 rounded-[40px] border border-gray-50 shadow-sm group cursor-default"
            >
              <div className="w-14 h-14 bg-white rounded-2xl mb-8 flex items-center justify-center text-gray-400 group-hover:text-black transition-colors shadow-sm">
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.6 }}>
                  {card.icon}
                </motion.div>
              </div>
              <h3 className="font-semibold text-2xl mb-4 tracking-tight">{card.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid = () => {
  return (
    <section className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:col-span-12 lg:col-span-8 bg-surface p-16 rounded-[48px] border border-gray-100 relative overflow-hidden group h-[550px]"
          >
             <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-black text-white text-[10px] rounded-full mb-8 uppercase tracking-widest font-bold">Node 01 // Input</span>
                <h3 className="text-4xl font-semibold mb-6 text-black tracking-tighter">Unified Invoice Stack</h3>
                <p className="text-gray-400 max-w-sm font-light text-lg">Generate hyper-accurate, tax-compliant records using our proprietary neural data extraction protocol.</p>
             </div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[130%] lg:w-3/4 h-3/4 bg-white rounded-t-[48px] p-12 shadow-[0_-20px_80px_rgba(0,0,0,0.05)] transform group-hover:translate-y-[-20px] transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]">
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                    <div className="h-6 w-32 bg-gray-100 rounded" />
                    <div className="h-6 w-12 bg-gray-50 rounded" />
                  </div>
                  <div className="h-4 w-full bg-gray-50 rounded" />
                  <div className="h-4 w-5/6 bg-gray-50 rounded" />
                  <div className="h-4 w-full bg-gray-50 rounded" />
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:col-span-12 lg:col-span-4 bg-black text-white p-16 rounded-[48px] flex flex-col items-center text-center justify-center h-[550px]"
          >
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-20 h-20 bg-white/10 rounded-full mb-12 flex items-center justify-center p-4 border border-white/10"
             >
               <ShieldCheck className="w-10 h-10 text-white" />
             </motion.div>
             <h3 className="text-3xl font-semibold mb-6 tracking-tighter italic">Deep Scanning Protocol</h3>
             <p className="text-gray-500 font-light leading-relaxed">Real-time credit analysis and payment history monitoring across the global SME network.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Workflow = () => {
  const steps = [
    { num: "01", title: "Ingestion", sub: "Neural data parsing." },
    { num: "02", title: "Validation", sub: "Rule-based analysis." },
    { num: "03", title: "Distribution", sub: "Omni-channel delivery." },
    { num: "04", title: "Resolution", sub: "Automated closing." },
  ];

  return (
    <section className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col gap-6 group cursor-default"
            >
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] group-hover:text-black transition-colors">{step.num} // Protocol</div>
              <h4 className="text-2xl font-semibold tracking-tight">{step.title}</h4>
              <p className="text-base text-gray-400 font-light leading-relaxed">{step.sub}</p>
              <motion.div 
                className="h-1 bg-gray-100 rounded-full w-0" 
                whileInView={{ width: "40%" }}
                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-48 px-12 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-surface p-20 rounded-[64px] relative"
        >
          <div className="absolute top-0 right-10 -translate-y-1/2 p-6 bg-black rounded-[32px] text-white shadow-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest">Verified Case</span>
          </div>
          <p className="text-3xl text-black font-light leading-[1.3] mb-12 tracking-tight italic">
            "PayPilot hasn't just fixed our cashflow; it has shifted our entire operational velocity. The cinematic automation is truly transformative."
          </p>
          <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-gray-200 mb-2 border-4 border-white shadow-lg" />
             <div className="text-lg font-semibold">James Forge</div>
             <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Logistics Executive // R&D</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-48 px-12 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto bg-black rounded-[64px] p-24 md:p-40 text-center relative overflow-hidden"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" 
        />
        
        <div className="relative z-10">
          <h2 className="text-6xl md:text-[88px] font-semibold text-white mb-12 tracking-tighter leading-none italic">Experience the <br /> displacement.</h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto mb-16 font-light leading-relaxed">Join the high-integrity commercial elite who have evolved their liquidity processing with PayPilot.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-black rounded-[32px] font-bold text-lg shadow-2xl hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </motion.button>
            <motion.button 
              whileHover={{ opacity: 0.8 }}
              className="px-12 py-6 bg-transparent text-white border border-white/20 rounded-[32px] font-bold text-lg transition-all"
            >
              Request Briefing
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="px-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex gap-10 text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black">
          {["Intelligence", "GitHub", "Relay", "Briefing"].map(item => (
             <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
          ))}
        </div>
        <div className="text-[10px] text-gray-300 uppercase tracking-[0.4em] font-bold">
          © 2024 PayPilot Laboratory // All Protocols Reserved.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-on-secondary-container">
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesGrid />
        <Workflow />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
