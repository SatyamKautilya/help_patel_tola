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
  Sparkles,
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
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
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
    title: "एक-मुश्त जमा",
    desc: "एंट्री",
    icon: FileText,
    href: "lump-sum",
    color: "text-pink-700",
    bg: "bg-pink-50",
    border: "border-pink-200",
    upcoming: false,
  },
  {
    title: "खर्चा",
    desc: "एंट्री",
    icon: FileText,
    href: "expenses",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    upcoming: false,
  },
  // {
  //   title: "सदस्य",
  //   desc: "मैनेजमेंट",
  //   icon: Users,
  //   href: "members",
  //   color: "text-rose-600",
  //   bg: "bg-rose-50",
  //   border: "border-rose-200",
  //   upcoming: true,
  // },
  // {
  //   title: "नियम",
  //   desc: "सेटिंग्स",
  //   icon: Settings,
  //   href: "settings",
  //   color: "text-purple-600",
  //   bg: "bg-purple-50",
  //   border: "border-purple-200",
  //   upcoming: true,
  // },
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
    <div className="h-screen overflow-y-auto bg-[#fafafa] relative flex flex-col">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 mt-8 mb-8"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl shadow-indigo-200">
          {/* Animated Background Gradients */}
          <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[150%] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-40 blur-[60px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-emerald-500/30 blur-[80px] rounded-full" />

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

          {/* Content Container */}
          <div className="relative z-10 p-8 flex flex-col justify-between min-h-[180px]">
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-md">
                    मुख्य डैशबोर्ड
                  </span>
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight leading-none">
                  नमस्ते,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200">
                    एडमिन
                  </span>
                </h2>
                <p className="text-indigo-100/80 text-sm font-medium mt-2 leading-relaxed max-w-[80%]">
                  आपके समूह की वित्तीय स्थिति और रिपोर्ट यहाँ देखें।
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
            </div>

            {/* Bottom Action Section */}
            <div className="mt-8">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  router.push(`/shg/shg-details/${shgid}/manage/dashboard`)
                }
                className="group w-full bg-white text-slate-900 p-1.5 pr-2 rounded-[1.8rem] flex items-center justify-between shadow-lg shadow-indigo-900/20"
              >
                <div className="flex items-center gap-3 px-4">
                  <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                    <TrendingUp size={18} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black">डैशबोर्ड खोलें</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      वित्तीय सारांश
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <ArrowRight size={18} />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      <main className="relative z-10 flex-1 flex flex-col px-6 py-4">
        {/* Greeting & Subtitle */}

        {/* Glassmorphism Financial Card (Light & Colorful) */}

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
