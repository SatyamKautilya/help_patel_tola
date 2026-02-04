"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  Download,
  Wallet,
  Scale,
  History,
  TrendingDown,
  ArrowRightLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MemberPassbook({ params }) {
  const { shgid, memberId } = params;
  const router = useRouter();

  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PASSBOOK ---------------- */
  useEffect(() => {
    const fetchPassbook = async () => {
      try {
        setLoading(true);
        const resp = await fetch("/api/shg?name=member-passbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shgid, memberId }),
        });

        if (!resp.ok) throw new Error("Failed to fetch");

        const data = await resp.json();
        setRows(data.transactions || []);
        
        setSummary(data.summary || {
          totalSavings: 800,
          totalLoansDisbursed: 200,
          totalLoanRepayments: 0,
          totalPenalties: 20
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPassbook();
  }, [shgid, memberId]);

  const getTxDetails = (type) => {
    const types = {
      OPENING_BALANCE: { label: "प्रारंभिक शेष", color: "text-slate-600", bg: "bg-slate-50", direction: "credit" },
      MONTHLY_DEPOSIT: { label: "मासिक बचत", color: "text-emerald-600", bg: "bg-emerald-50", direction: "credit" },
      SAVINGS: { label: "मासिक बचत", color: "text-emerald-600", bg: "bg-emerald-50", direction: "credit" },
      LUMP_SUM_CONTRIBUTION: { label: "एकमुश्त योगदान", color: "text-emerald-700", bg: "bg-emerald-50", direction: "credit" },
      LOAN_DISBURSEMENT: { label: "ऋण प्राप्त", color: "text-indigo-600", bg: "bg-indigo-50", direction: "credit" },
      BANK_LOAN_RECEIVED: { label: "बैंक ऋण प्राप्त", color: "text-indigo-600", bg: "bg-indigo-50", direction: "credit" },
      LOAN_REPAYMENT: { label: "ऋण वापसी", color: "text-blue-600", bg: "bg-blue-50", direction: "debit" },
      BANK_LOAN_REPAYMENT: { label: "बैंक ऋण वापसी", color: "text-blue-600", bg: "bg-blue-50", direction: "debit" },
      INTEREST_PAYMENT: { label: "ब्याज भुगतान", color: "text-purple-600", bg: "bg-purple-50", direction: "debit" },
      PENALTY_CHARGE: { label: "दंड लगाया गया", color: "text-amber-700", bg: "bg-amber-50", direction: "debit" },
      PENALTY_PAYMENT: { label: "दंड भुगतान", color: "text-amber-600", bg: "bg-amber-50", direction: "debit" },
    };

    return types[type] || {
      label: type,
      color: "text-slate-600",
      bg: "bg-slate-50",
      direction: "debit",
    };
  };

  return (
    <div className="h-screen overflow-hidden bg-white relative flex flex-col font-sans">
      
      {/* --- VIBRANT COLORFUL BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[40%] bg-indigo-200/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[40%] bg-emerald-100/40 blur-[100px] rounded-full" />
        <div className="absolute top-[30%] right-[-20%] w-[50%] h-[30%] bg-rose-100/30 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <nav className="relative z-10 px-6 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">तमोहर</h1>
            <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mt-1">डिजिटल पासबुक</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.back()}
          className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl border border-white shadow-sm text-slate-600"
        >
          <ChevronLeft size={20} />
        </motion.button>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col px-6 pt-4 overflow-hidden">
        
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/60 relative overflow-hidden mb-6"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/20 blur-3xl rounded-full -z-0" />

          <div className="relative z-10">
            <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">कुल बचत बैलेंस</p>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-slate-800 tracking-tighter">
                ₹{summary?.totalSavings || 0}
              </h2>
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Wallet className="text-white w-6 h-6" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/40">
              <div className="bg-emerald-500/10 rounded-2xl p-3 border border-emerald-200/30">
                <p className="text-[8px] font-bold text-emerald-700 uppercase tracking-wider mb-1">ऋण</p>
                <p className="text-lg font-black text-emerald-600">₹{summary?.totalLoansDisbursed || 0}</p>
              </div>
              <div className="bg-blue-500/10 rounded-2xl p-3 border border-blue-200/30">
                <p className="text-[8px] font-bold text-blue-700 uppercase tracking-wider mb-1">वापसी</p>
                <p className="text-lg font-black text-blue-600">₹{summary?.totalLoanRepayments || 0}</p>
              </div>
              <div className="bg-amber-500/10 rounded-2xl p-3 border border-amber-200/30">
                <p className="text-[8px] font-bold text-amber-700 uppercase tracking-wider mb-1">पेनल्टी</p>
                <p className="text-lg font-black text-amber-600">₹{summary?.totalPenalties || 0}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loan Summary Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-3xl flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Scale size={16} />
            </div>
            <div>
              <p className="text-[8px] font-black text-emerald-600 uppercase">ऋण वापसी</p>
              <p className="text-sm font-black text-emerald-800 leading-none mt-1">₹{summary?.totalLoanRepayments || 0}</p>
            </div>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-3xl flex items-center gap-3 text-right justify-end">
            <div>
              <p className="text-[8px] font-black text-rose-600 uppercase">बकाया ऋण</p>
              <p className="text-sm font-black text-rose-800 leading-none mt-1">
                ₹{(summary?.totalLoansDisbursed || 0) - (summary?.totalLoanRepayments || 0)}
              </p>
            </div>
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <TrendingDown size={16} />
            </div>
          </div>
        </div>

        {/* List Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-500" />
            <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
              लेन-देने का इतिहास
            </h2>
          </div>
          <ArrowRightLeft className="w-4 h-4 text-slate-300" />
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-32 pr-1 scrollbar-hide">
          {loading ? (
            <div className="text-center py-10 italic text-xs text-slate-400">पासबुक लोड हो रही है...</div>
          ) : (
            <AnimatePresence>
              {rows.map((tx, i) => {
                const d = getTxDetails(tx.type);
                const isCredit = d.direction === "credit";

                return (
                  <motion.div
                    key={tx._id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 bg-white/70 backdrop-blur-sm border border-slate-100 p-4 rounded-[2rem] shadow-sm active:scale-95 transition-transform"
                  >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${d.bg} ${d.color} shadow-sm`}>
                      {isCredit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 leading-tight">{d.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                        {new Date(tx.date).toLocaleDateString("hi-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>

                    <p className={`text-base font-black ${d.color}`}>
                      {isCredit ? "+" : "-"} ₹{tx.amount}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* --- FLOATING DOWNLOAD BUTTON --- */}
      <div className="absolute z-50 bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/80 to-transparent">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full bg-slate-900 text-white flex items-center justify-center gap-3 py-4 rounded-[2rem] shadow-2xl font-black text-xs tracking-widest uppercase"
        >
          <Download className="w-5 h-5 text-emerald-400" />
          पासबुक डाउनलोड करें
        </motion.button>
      </div>
    </div>
  );
}