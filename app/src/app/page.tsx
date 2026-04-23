"use client";

import { motion } from "motion/react";
import { ArrowRight, BarChart3, Globe, Shield, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="text-zinc-950 w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight">SOLARIS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-zinc-50 transition-colors">Features</Link>
            <Link href="/dashboard" className="hover:text-zinc-50 transition-colors">Dashboard</Link>
            <Link href="#pricing" className="hover:text-zinc-50 transition-colors">Pricing</Link>
            <Link href="#about" className="hover:text-zinc-50 transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Log in</button>
            <button className="px-5 py-2.5 bg-zinc-50 text-zinc-950 rounded-full text-sm font-bold hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-zinc-50/10">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-template-columns-[1.2fr_1fr] gap-12 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="space-y-8"
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-orange-400"
              >
                <Sparkles className="w-3 h-3" />
                <span>Now powered by Gemini 1.5 Pro</span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight"
              >
                THE FUTURE <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-50 via-zinc-400 to-zinc-50 animate-gradient-x">
                  OF INTELLIGENCE
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-lg lg:text-xl text-zinc-400 max-w-lg leading-relaxed"
              >
                Build faster, smarter, and more resilient applications with the world's most advanced AI-native development platform.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link 
                  href="/dashboard"
                  className="px-8 py-4 bg-orange-500 text-zinc-950 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-400 transition-all active:scale-95 group"
                >
                  Start Building
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-50 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
                  Book a Demo
                </button>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex items-center gap-6 pt-8 border-t border-zinc-800/50"
              >
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold">2,000+ developers</p>
                  <p className="text-zinc-500">already building today</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square lg:aspect-auto h-full min-h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-[40px] border border-zinc-800 overflow-hidden backdrop-blur-sm">
                {/* Mock UI */}
                <div className="absolute top-8 left-8 right-8 bottom-8 bg-zinc-950 rounded-3xl border border-zinc-800 shadow-2xl p-6 space-y-6 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    </div>
                    <div className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">System Operational</div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-12 bg-zinc-900/50 rounded-xl flex items-center px-4 justify-between border border-zinc-800/50">
                      <div className="w-24 h-2 bg-zinc-800 rounded" />
                      <Zap className="w-4 h-4 text-orange-500 fill-current" />
                    </div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="w-32 h-2.5 bg-zinc-800 rounded" />
                          <div className="w-12 h-2.5 bg-zinc-900 rounded" />
                        </div>
                        <div className="h-32 bg-zinc-900/30 rounded-xl relative overflow-hidden group">
                           {/* Animated Grid lines */}
                           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                           <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1.5 h-full pt-12">
                              {[0.4, 0.7, 0.5, 0.9, 0.3, 0.6, 0.8, 0.5, 1, 0.7].map((h, j) => (
                                <motion.div 
                                  key={j}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h*80}%` }}
                                  transition={{ delay: 0.5 + (j*0.05), duration: 0.8 }}
                                  className="flex-1 bg-gradient-to-t from-orange-500/50 to-orange-500/20 rounded-t-sm"
                                />
                              ))}
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider leading-none mb-1">Security</p>
                    <p className="text-xs font-bold leading-none">Enterprise Ready</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 p-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider leading-none mb-1">Analytics</p>
                    <p className="text-xs font-bold leading-none">Real-Time Data</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
