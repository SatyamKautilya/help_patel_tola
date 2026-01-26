"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Users,
  IndianRupee,
  HandCoins,
  FileText,
  Settings,
  ArrowRight,
  ChevronLeft,
  TrendingUp,
  ShieldCheck,
  LayoutDashboard,
  Lock,
} from "lucide-react";

const actions = [

  {
    title: "बचत",
    desc: "एंट्री",
    icon: IndianRupee,
    href: "monthly-entry",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    upcoming: false,
  },
  {
    title: "पेनल्टी",
    desc: "एंट्री",
    icon: IndianRupee,
    href: "penalty-entry",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    upcoming: false,
  },
  {
    title: "ऋण दें",
    desc: "वितरण",
    icon: HandCoins,
    href: "loans",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    upcoming: false,
  },
  {
    title: "भुगतान",
    desc: "किस्त",
    icon: FileText,
    href: "repayment",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    upcoming: false,
  },
    {
    title: "सदस्य",
    desc: "मैनेजमेंट",
    icon: Users,
    href: "members",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    upcoming: true,
  },
  {
    title: "नियम",
    desc: "सेटिंग्स",
    icon: Settings,
    href: "settings",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    upcoming: true,
  },
  {
    title: "रिपोर्ट",
    desc: "विवरण",
    icon: TrendingUp,
    href: "reports",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    upcoming: true,
  },
];

export default function ShgManagerHome({ params }) {
  const { shgid } = params;
  const router = useRouter();

  return (
    <div className="h-screen overflow-hidden bg-[#fafafa] relative flex flex-col">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-pink-200/40 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-sky-200/40 rounded-full blur-[80px]" />
      <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-indigo-200/30 rounded-full blur-[80px]" />

      {/* Header Section */}
      <nav className="relative z-10 px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none">
              तमोहर
            </h1>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
              <h2 className="text-md font-black text-slate-900 tracking-tight leading-tight">
                समूह <span className="text-indigo-600">प्रबंधन</span>
              </h2>
            </span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => router.back()}
          className="absolute  right-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white z-20"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </motion.button>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col px-6 py-4">
        {/* Greeting & Subtitle */}

		{/* Glassmorphism Financial Card (Light & Colorful) */}
			<motion.div
			  initial={{ opacity: 0, scale: 0.95 }}
			  animate={{ opacity: 1, scale: 1 }}
			  transition={{ duration: 0.4 }}
			  className="relative group mb-6"
			>
			  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-[2.5rem] border border-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]" />
			  <div className="relative p-6 flex justify-between items-end gap-4">
				<div className="space-y-2 flex-1">
				  <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
				कुल उपलब्ध कोष
				  </p>
				  <h3 className="text-3xl font-black text-slate-800 tracking-tighter bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
				₹45,280
				  </h3>
				</div>
				<div className="flex flex-col items-center bg-gradient-to-br from-pink-50 to-rose-50 px-5 py-4 border border-pink-200 rounded-2xl shadow-lg shadow-pink-100/50 hover:shadow-pink-200 transition-shadow">
				  <p className="text-xs font-bold text-pink-600 uppercase tracking-widest">
				कुल ऋण वितरण
				  </p>
				  <h3 className="text-2xl font-black text-red-400 tracking-tighter mt-1">
				₹4,280
				  </h3>
				</div>
			  </div>
			</motion.div>

			{/* Grid Section - Optimized for height */}
				<div className="grid grid-cols-2 gap-5 h-full mb-16">
				  {actions.map((a, i) => (
					<motion.button
					  key={a.href}
					  onClick={() =>
					!a.upcoming &&
					router.push(`/shg/shg-details/${shgid}/manage/${a.href}`)
					  }
					  initial={{ opacity: 0, y: 10 }}
					  animate={{ opacity: 1, y: 0 }}
					  transition={{ delay: i * 0.05 }}
					  whileTap={{ scale: a.upcoming ? 1 : 0.95 }}
					  disabled={a.upcoming}
					  className={`group relative flex flex-col justify-center bg-white/70 backdrop-blur-sm border-2 ${a.border} rounded-[2rem] p-4 text-left hover:bg-white transition-all overflow-hidden shadow-sm ${a.upcoming ? "opacity-50 bg-gray-300/50 cursor-not-allowed" : ""}`}
					>
					  {a.upcoming && (
					<div className="absolute top-3 right-3 p-1.5 bg-slate-200 rounded-lg">
					  <Lock className="w-4 h-4 text-red-600" />
					</div>
					  )}
					  <div
					className={`w-11 h-11 rounded-2xl ${a.bg} flex items-center justify-center ${a.color} mb-3 shadow-sm`}
					  >
					<a.icon className="w-6 h-6" />
					  </div>
					  <div>
					<h3 className="text-sm font-bold text-slate-800 tracking-tight leading-none">
					  {a.title}
					</h3>
					<p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
					  {a.desc}
					</p>
					  </div>
					  <div
					className={`absolute right-4 bottom-4 p-1 rounded-lg ${a.bg}`}
					  >
					<ArrowRight className={`w-3 h-3 ${a.color}`} />
					  </div>
					</motion.button>
				  ))}
				</div>

				{/* Mini Footer */}
       
      </main>

      {/* Back Button - Fixed Bottom Left */}
    </div>
  );
}
