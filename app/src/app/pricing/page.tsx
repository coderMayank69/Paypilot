"use client";

import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for hobbyists and individual developers.",
    features: ["5 Projects", "Community Support", "Basic Analytics", "1GB Storage"],
    cta: "Start for Free",
    featured: false
  },
  {
    name: "Pro",
    price: "$29",
    description: "Ideal for growing startups and professional teams.",
    features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "10GB Storage", "Custom Domains", "API Access"],
    cta: "Get Started",
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale organizations with mission-critical needs.",
    features: ["Unlimited Everything", "Dedicated Account Manager", "SSO & SAML", "99.9% Up-time SLA", "White-glove Onboarding"],
    cta: "Contact Sales",
    featured: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-zinc-950 py-32 px-6">
       {/* Navigation */}
       <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="text-zinc-950 w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight">SOLARIS</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Back Home</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            TRANSPARENT <br /> <span className="text-orange-500">PRICING</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-xl mx-auto"
          >
            Choose the plan that's right for you. No hidden fees, no surprises. Just pure performance.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className={`p-10 rounded-[32px] border ${plan.featured ? 'bg-zinc-900 border-orange-500 shadow-2xl shadow-orange-500/10' : 'bg-zinc-900/40 border-zinc-800'} relative flex flex-col`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-zinc-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-10">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-zinc-500 text-lg">/mo</span>}
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-orange-500" />
                    </div>
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${plan.featured ? 'bg-orange-500 text-zinc-950 hover:bg-orange-400' : 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700'}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
