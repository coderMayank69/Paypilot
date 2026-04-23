"use client";

import { motion } from "motion/react";
import { 
  Activity, 
  ArrowUpRight, 
  ChevronDown, 
  Database, 
  LayoutGrid, 
  LogOut, 
  MessageSquare, 
  Search, 
  Settings, 
  Users 
} from "lucide-react";
import Link from "next/link";

const dataRows = [
  { id: "S-1092", user: "Alex Rivera", status: "Active", volume: "$12,402", latency: "14ms", date: "2024.03.12" },
  { id: "S-1093", user: "Sarah Chen", status: "Idle", volume: "$8,912", latency: "22ms", date: "2024.03.12" },
  { id: "S-1094", user: "John Wick", status: "Error", volume: "N/A", latency: "500ms", date: "2024.03.11" },
  { id: "S-1095", user: "Maria García", status: "Active", volume: "$24,100", latency: "12ms", date: "2024.03.11" },
  { id: "S-1096", user: "Ben Tennyson", status: "Active", volume: "$44,202", latency: "18ms", date: "2024.03.10" },
  { id: "S-1097", user: "Natasha Romanova", status: "Idle", volume: "$1,202", latency: "15ms", date: "2024.03.10" },
  { id: "S-1098", user: "Clint Barton", status: "Active", volume: "$12,402", latency: "14ms", date: "2024.03.09" },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-400 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-900 flex flex-col p-6 space-y-8">
        <Link href="/" className="flex items-center gap-3 px-2">
          <div className="w-7 h-7 bg-orange-500 rounded flex items-center justify-center">
            <Database className="w-4 h-4 text-zinc-950 fill-current" />
          </div>
          <span className="font-bold text-lg text-zinc-50 tracking-tight">SOLARIS</span>
        </Link>

        <div className="flex-1 space-y-1">
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 px-2 py-3">Navigation</p>
          <NavItem icon={LayoutGrid} label="Overview" active />
          <NavItem icon={Activity} label="Analytics" />
          <NavItem icon={Users} label="Customers" />
          <NavItem icon={MessageSquare} label="Feedback" />
          
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 px-2 py-3 mt-6">Settings</p>
          <NavItem icon={Settings} label="Configuration" />
          <NavItem icon={Database} label="System Log" />
        </div>

        <div className="pt-6 border-t border-zinc-900">
          <button className="flex items-center gap-3 px-2 w-full text-zinc-500 hover:text-zinc-200 transition-colors py-2 text-sm">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col uppercase-labels">
        {/* Header */}
        <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-6">
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input 
                  type="text" 
                  placeholder="SEARCH SYSTEM..." 
                  className="bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-zinc-700 w-64 transition-colors" 
                />
             </div>
             <div className="flex items-center gap-2 text-[10px] font-mono bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SERVER_US_EAST_01_OK
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-xs font-bold text-zinc-50">MAYANK B.</p>
                <p className="text-[10px] text-zinc-600">ADMIN_PREMIUM</p>
             </div>
             <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
             </div>
          </div>
        </header>

        {/* Dash Content */}
        <div className="p-10 space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard label="Total Assets" value="$1.2M" trend="+12.4%" />
            <StatCard label="Active Users" value="2.4K" trend="+4.1%" />
            <StatCard label="Network Load" value="14.2%" trend="-2.1%" />
            <StatCard label="Avg Latency" value="18ms" trend="STABLE" />
          </div>

          {/* Table Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
               <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Recent System Activity</h2>
               <button className="text-[10px] flex items-center gap-1 hover:text-zinc-50 transition-colors uppercase font-bold tracking-widest leading-none bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800">
                  Filter By <ChevronDown className="w-3 h-3" />
               </button>
            </div>

            <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-900/20">
              {/* Table Header */}
              <div className="grid grid-cols-[80px_1fr_100px_120px_80px_100px] gap-4 px-6 py-4 bg-zinc-900/50 border-b border-zinc-900 text-[10px] font-bold tracking-widest text-zinc-600 italic font-serif">
                <span>UID</span>
                <span>OPERATOR_IDENTITY</span>
                <span>STATUS</span>
                <span>TX_VOLUME</span>
                <span>RESP</span>
                <span className="text-right">ISO_DATE</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-zinc-900/50">
                {dataRows.map((row, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-[80px_1fr_100px_120px_80px_100px] gap-4 px-6 py-4 hover:bg-zinc-900/50 transition-colors cursor-pointer group text-sm items-center"
                  >
                    <span className="font-mono text-xs text-zinc-600">{row.id}</span>
                    <span className="text-zinc-50 font-medium">{row.user}</span>
                    <span className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-green-500' : row.status === 'Error' ? 'bg-red-500' : 'bg-zinc-600'}`} />
                       <span className="text-xs uppercase font-bold tracking-widest text-[10px]">{row.status}</span>
                    </span>
                    <span className="font-mono text-xs">{row.volume}</span>
                    <span className="font-mono text-xs text-zinc-500">{row.latency}</span>
                    <span className="text-xs text-zinc-600 text-right font-mono">{row.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <motion.button 
      whileHover={{ x: 4 }}
      className={`w-full flex items-center gap-3 px-2 py-3 rounded-lg transition-colors text-sm ${active ? 'bg-zinc-800/50 text-zinc-50' : 'text-zinc-500 hover:text-zinc-200'}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </motion.button>
  );
}

function StatCard({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-3">
      <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold">{value}</h3>
        <div className={`flex items-center gap-1 text-xs font-bold ${trend.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
          <ArrowUpRight className="w-4 h-4" />
          {trend}
        </div>
      </div>
    </div>
  );
}
