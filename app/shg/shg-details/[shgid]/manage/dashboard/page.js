"use client";

import { useEffect, useState } from "react";
import { 
  RefreshCcw, 
  TrendingUp, 
  PiggyBank, 
  Wallet, 
  AlertCircle, 
  HandCoins, 
  Receipt, 
  LayoutDashboard,
  ChevronLeft,
  Loader2,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SHGDashboardPage({ params }) {
  const { shgid } = params;
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/shg?name=dashboard-summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shgId: shgid }),
        cache: "no-store",
      });

      if (!res.ok) throw new Error("डेटा लोड करने में विफल");

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [shgid]);

  const formatMoney = (amount) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="min-h-screen bg-[#fafafa] relative flex flex-col overflow-x-hidden font-sans text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[30%] bg-indigo-200/20 rounded-full blur-[100px]" />
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[40%] bg-emerald-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[60%] h-[30%] bg-orange-200/20 rounded-full blur-[100px]" />

      {/* Header */}
      <nav className="relative z-20 px-6 pt-6 flex items-center justify-between bg-white/40 backdrop-blur-md pb-4 sticky top-0 border-b border-white/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tighter">
              वित्तीय सारांश
            </h1>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              SHG डैशबोर्ड
            </span>
          </div>
        </div>
        <div className="flex gap-2">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={fetchDashboard}
                disabled={loading}
                className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm disabled:opacity-50"
            >
                <RefreshCcw className={`w-5 h-5 text-indigo-600 ${loading ? "animate-spin" : ""}`} />
            </motion.button>
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => router.back()}
                className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm"
            >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
            </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 px-6 pt-6 pb-24 space-y-6">
        
        {/* Loading State */}
        {loading && !data && (
             <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-400">
                <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
                <p className="text-xs font-bold uppercase tracking-widest">डेटा अपडेट हो रहा है...</p>
             </div>
        )}

        {/* Error State */}
        {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-red-50/80 border border-red-200 rounded-[2rem] text-center space-y-2">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
                <p className="text-red-800 font-bold">डेटा लोड करने में त्रुटि</p>
                <p className="text-xs text-red-600">{error}</p>
                <button onClick={fetchDashboard} className="text-xs bg-white py-2 px-4 rounded-xl font-bold shadow-sm mt-2">पुनः प्रयास करें</button>
            </motion.div>
        )}

        {/* Dashboard Data */}
        {!loading && data && (
            <AnimatePresence>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Hero Card: Available Cash */}
                    <div className="relative overflow-hidden p-6 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-slate-300">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center space-y-1">
                            <p className="opacity-70 text-[10px] font-black uppercase tracking-[0.2em]">उपलब्ध नकद (Cash in Hand)</p>
                            <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                                {formatMoney(data.totalAvailableCash)}
                            </h2>
                            <div className="pt-4 flex items-center gap-1.5 opacity-60">
                                <Clock size={12} />
                                <span className="text-[10px] font-bold">
                                    अपडेटेड: {new Date(data.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard 
                            label="मासिक बचत" 
                            sub="Monthly Savings"
                            amount={data.totalMonthlySavings} 
                            icon={PiggyBank} 
                            theme="emerald"
                            delay={0.1}
                        />
                        <StatCard 
                            label="लंप सम राशि" 
                            sub="Lump Sum"
                            amount={data.totalLumpSum} 
                            icon={Wallet} 
                            theme="blue"
                            delay={0.15}
                        />
                        <StatCard 
                            label="ब्याज संग्रह" 
                            sub="Interest"
                            amount={data.totalInterestCollected} 
                            icon={TrendingUp} 
                            theme="violet"
                            delay={0.2}
                        />
                        <StatCard 
                            label="पेनल्टी" 
                            sub="Penalty"
                            amount={data.totalPenalty} 
                            icon={AlertCircle} 
                            theme="amber"
                            delay={0.25}
                        />
                    </div>

                    {/* Outflow Section */}
                    <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">खर्च और वितरण (Outflow)</p>
                        
                        <WideStatCard 
                             label="ऋण वितरण (Loan Given)"
                             amount={data.totalLoanGiven}
                             icon={HandCoins}
                             theme="orange"
                             delay={0.3}
                        />
                        
                        <WideStatCard 
                             label="कुल खर्च (Total Expense)"
                             amount={data.totalExpense}
                             icon={Receipt}
                             theme="rose"
                             delay={0.35}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        )}
      </main>
    </div>
  );
}

/* ---------------- Sub-Components ---------------- */

function StatCard({ label, sub, amount, icon: Icon, theme, delay }) {
    const colors = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        violet: "bg-violet-50 text-violet-600 border-violet-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="bg-white/70 backdrop-blur-md p-4 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between h-36"
        >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${colors[theme]} border mb-2`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-lg font-black text-slate-800 tracking-tight">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)}
                </p>
                <p className="text-xs font-bold text-slate-600 leading-none mt-1">{label}</p>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">{sub}</p>
            </div>
        </motion.div>
    );
}

function WideStatCard({ label, amount, icon: Icon, theme, delay }) {
    const colors = {
        orange: "bg-orange-50 text-orange-600 border-orange-100",
        rose: "bg-rose-50 text-rose-600 border-rose-100",
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white/70 backdrop-blur-md p-4 rounded-[2rem] border border-white shadow-sm flex items-center justify-between"
        >
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${colors[theme]} border`}>
                    <Icon size={20} />
                </div>
                <p className="font-bold text-slate-700 text-sm">{label}</p>
            </div>
            <p className="font-black text-lg text-slate-800 tracking-tight">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)}
            </p>
        </motion.div>
    );
}