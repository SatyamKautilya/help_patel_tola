"use client";

import { useEffect, useState } from "react";
import {
  IndianRupee,
  CheckCircle2,
  ChevronLeft,
  Wallet,
  Calendar,
  Zap,
  ArrowRight,
  Edit2,
  Loader2,
  FileText,
  AlertCircle,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LumpSumDepositEntry({ params }) {
  const { shgid } = params;
  const router = useRouter();

  const [step, setStep] = useState("entry"); // "entry" | "review"
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [purpose, setPurpose] = useState("");
  const [bulkAmount, setBulkAmount] = useState(""); // State for custom bulk amount
  const [members, setMembers] = useState([]);
  const [entries, setEntries] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uiMessage, setUiMessage] = useState(null);

  /* ---------------- FETCH MEMBERS ---------------- */
  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      try {
        const resp = await fetch("/api/shg?name=list-members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shgId: shgid }),
        });
        const data = await resp.json();
        setMembers(data.members || []);
      } catch {
        setUiMessage({ type: "error", text: "सदस्य लोड नहीं हुए" });
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, [shgid]);

  /* ---------------- HELPERS ---------------- */
  const applyBulkAmount = () => {
    if (!bulkAmount || Number(bulkAmount) <= 0) {
      setUiMessage({ type: "error", text: "कृपया एक मान्य राशि भरें" });
      return;
    }

    const map = {};
    members.forEach((m) => (map[m._id] = Number(bulkAmount)));
    setEntries(map);
    setUiMessage({
      type: "success",
      text: `सभी के लिए ₹${bulkAmount} लागू किया गया`,
    });
  };

  const handleChange = (memberId, value) => {
    if (value === "") {
      const newEntries = { ...entries };
      delete newEntries[memberId];
      setEntries(newEntries);
      return;
    }
    setEntries((p) => ({ ...p, [memberId]: Number(value) }));
  };

  const totalActual = Object.values(entries).reduce(
    (acc, val) => acc + (Number(val) || 0),
    0
  );

  // Filter members who are actually depositing
  const activeDeposits = members.filter((m) => (entries[m._id] || 0) > 0);

  /* ---------------- HANDLERS ---------------- */
  const handleReview = () => {
    if (totalActual <= 0) {
      setUiMessage({ type: "error", text: "कम से कम एक राशि भरें" });
      return;
    }
    setStep("review");
  };

  const handleConfirmSave = async () => {
    const deposits = activeDeposits.map((m) => ({
      memberId: m._id,
      amount: entries[m._id],
    }));

    setSaving(true);
    try {
      const resp = await fetch("/api/shg?name=collect-lump-sum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shgId: shgid,
          date,
          purpose: purpose || "Lump Sum Deposit",
          deposits,
        }),
      });

      if (!resp.ok) throw new Error();

      setUiMessage({ type: "success", text: "जमा राशि सुरक्षित हो गई" });
      setEntries({});
      setBulkAmount("");
      setTimeout(() => router.back(), 2000);
    } catch {
      setUiMessage({ type: "error", text: "त्रुटि हुई, पुनः प्रयास करें" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative flex flex-col overflow-x-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[30%] bg-emerald-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[60%] h-[30%] bg-blue-200/20 rounded-full blur-[100px]" />

      {/* Header */}
      <nav className="relative z-20 px-6 pt-6 flex items-center justify-between bg-white/40 backdrop-blur-md pb-4 sticky top-0 border-b border-white/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tighter">
              एकमुश्त जमा
            </h1>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              {step === "entry" ? "विवरण भरें" : "पुष्टि करें (समीक्षा)"}
            </span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => (step === "review" ? setStep("entry") : router.back())}
          className="p-3 bg-white rounded-2xl border shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </motion.button>
      </nav>

      <main className="relative z-10 flex-1 px-6 pt-6 pb-40">
        <AnimatePresence mode="wait">
          {/* STEP 1: ENTRY */}
          {step === "entry" && (
            <motion.div
              key="entry"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Date & Purpose Card */}
              <div className="bg-white/70 backdrop-blur-md p-5 rounded-[2rem] border border-white shadow-sm space-y-4">
                <div className="flex gap-4 items-center bg-white/50 p-3 rounded-2xl border border-slate-100">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-700 outline-none"
                  />
                </div>
                <div className="flex gap-4 items-center bg-white/50 p-3 rounded-2xl border border-slate-100">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <FileText size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="उद्देश्य (वैकल्पिक)"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* NEW: Smart Bulk Input */}
              <div className="bg-white/60 backdrop-blur-md p-2 rounded-[1.8rem] border border-white shadow-sm flex items-center gap-2">
                <div className="relative flex-1">
                  <IndianRupee
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                  />
                  <input
                    type="number"
                    placeholder="सभी के लिए राशि भरें"
                    value={bulkAmount}
                    onChange={(e) => setBulkAmount(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl py-3 pl-10 pr-4 font-black text-emerald-900 outline-none placeholder:text-emerald-400/70 placeholder:font-bold"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={applyBulkAmount}
                  disabled={!bulkAmount}
                  className="bg-emerald-600 text-white p-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none"
                >
                  <Zap size={20} fill="currentColor" />
                </motion.button>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-emerald-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {members.map((m, i) => (
                    <motion.div
                      key={m._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`relative p-5 rounded-[2rem] border transition-all ${
                        entries[m._id]
                          ? "bg-emerald-50/60 border-emerald-200 shadow-emerald-100/50"
                          : "bg-white/70 border-white shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white text-slate-700 flex items-center justify-center font-black text-xs shadow-sm border">
                          {m.name.charAt(0)}
                        </div>
                        <h3 className="font-bold text-slate-800">{m.name}</h3>
                      </div>

                      <div className="relative">
                        <IndianRupee
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="number"
                          value={entries[m._id] || ""}
                          onChange={(e) => handleChange(m._id, e.target.value)}
                          placeholder="0"
                          className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-lg font-black text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: REVIEW */}
          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Summary Card */}
              <div className="relative overflow-hidden p-6 rounded-[2.5rem] bg-slate-900 text-white shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                <p className="opacity-60 text-[10px] font-black uppercase tracking-widest">
                  कुल जमा राशि
                </p>
                <h2 className="text-4xl font-black tracking-tighter mt-1">
                  ₹{totalActual}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    {date}
                  </span>
                  {purpose && (
                    <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {purpose}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                  जमाकर्ता ({activeDeposits.length})
                </p>
                {activeDeposits.map((m) => (
                  <div
                    key={m._id}
                    className="bg-white/70 backdrop-blur-md p-4 rounded-[2rem] border border-white shadow-sm flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        {m.name.charAt(0)}
                      </div>
                      <p className="font-bold text-slate-800">{m.name}</p>
                    </div>
                    <p className="font-black text-lg text-emerald-600">
                      ₹{entries[m._id]}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 inset-x-0 p-6 z-50">
        <div className="absolute -z-50 inset-0 bg-white/40 backdrop-blur-xl border-t border-white/50" />
        <div className="max-w-2xl z-50 mx-auto">
          {step === "entry" ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={loading || totalActual === 0}
              onClick={handleReview}
              className="relative w-full bg-slate-900 text-white py-4 rounded-[1.8rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 transition-all disabled:opacity-30 active:bg-black group"
            >
              रिव्यू करें (Review)
              <div className="p-1.5 bg-white/10 rounded-lg group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          ) : (
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setStep("entry")}
                className="flex-1 bg-white text-slate-900 border border-slate-200 py-4 rounded-[1.8rem] font-black text-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <Edit2 size={18} /> सुधारें
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                disabled={saving}
                onClick={handleConfirmSave}
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-[1.8rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    जमा करें <CheckCircle2 size={20} />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {uiMessage && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-28 inset-x-10 z-[60] p-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
              uiMessage.type === "error"
                ? "bg-red-50/90 border-red-200 text-red-800"
                : "bg-emerald-50/90 border-emerald-200 text-emerald-800"
            }`}
          >
            {uiMessage.type === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <p className="font-bold text-xs uppercase tracking-wider">
              {uiMessage.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}