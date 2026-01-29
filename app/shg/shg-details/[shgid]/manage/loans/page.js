"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IndianRupee,
  CheckCircle2,
  ChevronLeft,
  Percent,
  Search,
  Users,
  X,
  HandCoins,
  ArrowRight,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BulkLoanPage({ params }) {
  const { shgid } = params;
  const router = useRouter();

  const [step, setStep] = useState("select"); // "select" | "details" | "review"
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [loanSettings, setLoanSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uiMessage, setUiMessage] = useState(null);

  /* ---------------- FETCH MEMBERS ---------------- */
  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/shg?name=list-members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shgId: shgid }),
        });
        const data = await res.json();
        setMembers(data.members || []);
      } catch (err) {
        setUiMessage({ type: "error", text: "सदस्य लोड करने में विफल" });
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, [shgid]);

  /* ---------------- HELPERS ---------------- */
  const toggleMember = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((p) => p.filter((x) => x !== id));
    } else {
      setSelectedIds((p) => [...p, id]);
      if (!loanSettings[id]) {
        setLoanSettings((p) => ({
          ...p,
          [id]: { principal: "", interestRate: "1" },
        }));
      }
    }
  };

  const updateLoan = (id, field, value) => {
    setLoanSettings((p) => ({
      ...p,
      [id]: { ...p[id], [field]: value },
    }));
  };

  const filteredMembers = members.filter((m) =>
    m?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateDetailsStep = () => {
    for (const id of selectedIds) {
      const l = loanSettings[id];
      if (!l || !l.principal || Number(l.principal) <= 0 || !l.interestRate || Number(l.interestRate) <= 0) 
        return false;
    }
    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const submitLoans = async () => {
    if (!validateDetailsStep()) {
      setUiMessage({ type: "error", text: "कृपया सभी विवरण सही से भरें" });
      return;
    }

    const payloads = selectedIds.map((id) => ({
      memberId: id,
      principal: Number(loanSettings[id].principal),
      interestRate: Number(loanSettings[id].interestRate),
    }));

    try {
      setSaving(true);
      await Promise.all(
        payloads.map((p) =>
          fetch("/api/shg?name=create-loan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shgId: shgid, ...p }),
          })
        )
      );
      setUiMessage({ type: "success", text: "ऋण सफलतापूर्वक जारी" });
      setTimeout(() => router.back(), 2000);
    } catch {
      setUiMessage({ type: "error", text: "त्रुटि हुई" });
    } finally {
      setSaving(false);
    }
  };

  const stepIndex = step === "select" ? 0 : step === "details" ? 1 : 2;

  return (
    <div className="min-h-screen bg-[#fafafa] relative flex flex-col overflow-x-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[30%] bg-indigo-200/40 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[60%] h-[30%] bg-pink-200/30 rounded-full blur-[100px]" />

      {/* Header Section */}
      <nav className="relative z-40 px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <HandCoins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none">ऋण वितरण</h1>
            <div className="flex gap-1 mt-1.5">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${i <= stepIndex ? "w-4 bg-indigo-500" : "w-1 bg-slate-200"}`} 
                />
              ))}
            </div>
          </div>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => step === "select" ? router.back() : setStep(step === "review" ? "details" : "select")}
          className="p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </motion.button>
      </nav>

      <main className="relative z-10 flex-1 px-6 pt-8 pb-36">
        <AnimatePresence mode="wait">
          {/* STEP 1: MEMBER SELECTION */}
          {step === "select" && (
            <motion.div 
              key="select"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  placeholder="सदस्य खोजें..."
                  className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] bg-white/70 backdrop-blur-sm border border-white shadow-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Loader2 className="animate-spin mb-2" />
                  <p className="text-sm font-bold uppercase tracking-widest">लोड हो रहा है...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredMembers.map((m) => {
                    const isSelected = selectedIds.includes(m._id);
                    return (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        key={m._id}
                        onClick={() => toggleMember(m._id)}
                        className={`relative p-4 rounded-[2rem] border-2 transition-all text-left flex flex-col justify-between h-32 ${
                          isSelected
                            ? "bg-indigo-50/80 border-indigo-200 shadow-indigo-100/50 shadow-lg"
                            : "bg-white/60 backdrop-blur-sm border-white shadow-sm"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold mb-2 ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                          {m.name.charAt(0)}
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <p className={`text-sm font-black tracking-tight leading-none ${isSelected ? "text-indigo-900" : "text-slate-700"}`}>{m.name}</p>
                          {isSelected && <CheckCircle2 size={16} className="text-indigo-600" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: DETAILS ENTRY */}
          {step === "details" && (
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-1">ऋण विवरण भरें</p>
              {selectedIds.map((id) => {
                const m = members.find((x) => x._id === id);
                const l = loanSettings[id] || {};
                return (
                  <div key={id} className="relative group overflow-hidden">
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white shadow-sm" />
                    <div className="relative p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="font-black text-slate-800 text-lg tracking-tight">{m?.name}</p>
                        <button onClick={() => toggleMember(id)} className="p-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 transition-colors">
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 ml-1 uppercase">राशि (Principal)</label>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" size={14} />
                            <input
                              type="number"
                              placeholder="0"
                              className="w-full pl-8 pr-3 py-3 bg-white/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm transition-all"
                              value={l.principal}
                              onChange={(e) => updateLoan(id, "principal", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 ml-1 uppercase">ब्याज % (Monthly)</label>
                          <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={14} />
                            <input
                              type="number"
                              className="w-full pl-8 pr-3 py-3 bg-white/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm transition-all"
                              value={l.interestRate}
                              onChange={(e) => updateLoan(id, "interestRate", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* STEP 3: FINAL REVIEW */}
          {step === "review" && (
            <motion.div 
              key="review"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="relative overflow-hidden p-6 rounded-[2.5rem] bg-slate-900 text-white shadow-xl mb-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                <p className="opacity-60 text-[10px] font-black uppercase tracking-widest">सारांश</p>
                <h2 className="text-3xl font-black tracking-tighter mt-1">{selectedIds.length} सदस्य चयनित</h2>
              </div>
              
              {selectedIds.map((id) => {
                const m = members.find((x) => x._id === id);
                const l = loanSettings[id];
                return (
                  <div key={id} className="bg-white/70 backdrop-blur-sm p-5 rounded-[2rem] border border-white flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-black text-slate-800 tracking-tight">{m?.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ब्याज: {l.interestRate}% प्रति माह</p>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-600 font-black text-xl tracking-tighter">₹{l.principal}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 p-6 z-50">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border-t border-white/50" />
        <div className="max-w-2xl mx-auto relative">
          {step === "select" && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={!selectedIds.length}
              onClick={() => setStep("details")}
              className="w-full bg-slate-900 text-white py-4 rounded-[1.8rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 transition-all disabled:opacity-30 group"
            >
              आगे बढ़ें ({selectedIds.length})
              <div className="p-1 bg-white/20 rounded-lg group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          )}

          {step === "details" && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => validateDetailsStep() ? setStep("review") : setUiMessage({ type: "error", text: "विवरण भरें" })}
              className="w-full bg-indigo-600 text-white py-4 rounded-[1.8rem] font-black text-lg shadow-xl shadow-indigo-100"
            >
              रिव्यू करें
            </motion.button>
          )}

          {step === "review" && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={saving}
              onClick={submitLoans}
              className="w-full bg-emerald-600 text-white py-4 rounded-[1.8rem] font-black text-lg flex justify-center items-center gap-3 shadow-xl shadow-emerald-100 disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" /> : <>ऋण जारी करें <HandCoins size={22} /></>}
            </motion.button>
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
              uiMessage.type === "error" ? "bg-red-50/90 border-red-200 text-red-800" : "bg-emerald-50/90 border-emerald-200 text-emerald-800"
            }`}
          >
            {uiMessage.type === "error" ? <X className="bg-red-500 text-white rounded-full p-1" size={18} /> : <CheckCircle2 size={18} className="text-emerald-500" />}
            <p className="font-bold text-xs uppercase tracking-wider">{uiMessage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}