"use client";

import { useEffect, useState } from "react";
import {
  IndianRupee,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Save,
  AlertCircle,
  Wallet,
  Users,
  X,
  AlertTriangle,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const PENALTY_TYPES = [
  "देर से भुगतान",
  "बैठक में अनुपस्थिति",
  "नियम उल्लंघन",
  "अन्य",
];

export default function PenaltyEntryPage({ params }) {
  const { shgid } = params;
  const router = useRouter();

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [members, setMembers] = useState([]);
  const [entries, setEntries] = useState({});
  const [saving, setSaving] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [uiMessage, setUiMessage] = useState(null);

  const fetchMembers = async () => {
    const resp = await fetch("/api/shg?name=list-members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shgId: shgid }),
    });
    const data = await resp.json();
    setMembers(data.members || []);
  };

  useEffect(() => {
    fetchMembers();
  }, [shgid]);

  const updateEntry = (memberId, patch) => {
    setEntries((prev) => ({
      ...prev,
      [memberId]: {
        amount: "",
        type: "",
        otherReason: "",
        ...prev[memberId],
        ...patch,
      },
    }));
  };

  const activeEntries = Object.entries(entries).filter(([_, e]) => Number(e?.amount) > 0);
  const totalPenalty = activeEntries.reduce((acc, [_, e]) => acc + (Number(e?.amount) || 0), 0);

  const handleConfirmSave = async () => {
    setShowSummary(false);
    const penalties = activeEntries.map(([memberId, e]) => ({
      memberId,
      amount: Number(e.amount),
      penaltyType: e.type === "अन्य" ? e.otherReason : (e.type || "सामान्य"),
    }));

    setSaving(true);
    try {
      const resp = await fetch("/api/shg?name=save-penalty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shgId: shgid, month, penalties }),
      });

      if (!resp.ok) throw new Error();
      setUiMessage({ type: "success", text: "पेनल्टी सफलतापूर्वक सुरक्षित!" });
      setEntries({});
    } catch {
      setUiMessage({ type: "error", text: "त्रुटि हुई, फिर प्रयास करें" });
    } finally {
      setSaving(false);
      setTimeout(() => setUiMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2F2] pb-32 relative font-sans">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[70%] h-[40%] bg-rose-200/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-10%] w-[60%] h-[40%] bg-amber-100/50 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-40 px-6 py-5 bg-white/70 backdrop-blur-lg border-b border-rose-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
            <AlertTriangle className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl text-slate-800 tracking-tight">तमोहर</h1>
            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">पेनल्टी पोर्टल</p>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.back()} className="p-3 bg-white border border-rose-50 rounded-2xl shadow-sm text-slate-600">
          <ChevronLeft size={20} />
        </motion.button>
      </nav>

      {/* Selector Area */}
      <div className="px-6 mt-6">
        <div className="bg-white/80 border border-white rounded-[2.5rem] p-5 shadow-xl shadow-rose-100/50 flex justify-between items-center">
          <div className="flex items-center gap-3 bg-rose-50 px-4 py-2 rounded-2xl">
            <Calendar className="text-rose-500 w-4 h-4" />
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="font-black text-rose-900 bg-transparent outline-none text-sm"
            />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">सदस्य संख्या</p>
            <p className="text-xl font-black text-slate-800">{members.length}</p>
          </div>
        </div>
      </div>

      {/* Member Cards */}
      <div className="px-6 mt-8 space-y-6">
        {members.map((m, idx) => {
          const entry = entries[m._id] || {};
          const isActive = Number(entry.amount) > 0;

          return (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-[2.5rem] border-2 transition-all shadow-sm ${
                isActive ? "bg-white border-rose-500 ring-4 ring-rose-500/5" : "bg-white/60 border-white"
              }`}
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${idx % 2 === 0 ? 'bg-rose-100 text-rose-600' : 'bg-orange-100 text-orange-600'}`}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{m.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">ID: {m.role || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Amount Input */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors">
                    <IndianRupee size={20} />
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={entry.amount || ""}
                    onChange={(e) => updateEntry(m._id, { amount: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-2xl font-black text-slate-900 outline-none focus:border-rose-400 focus:bg-white transition-all"
                  />
                </div>

                {/* Reason Select */}
                {isActive && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
                    <div className="relative">
                       <select
                        value={entry.type || ""}
                        onChange={(e) => updateEntry(m._id, { type: e.target.value })}
                        className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-2xl py-3 px-4 font-bold text-rose-900 outline-none appearance-none"
                      >
                        <option value="">पेनल्टी का कारण चुनें</option>
                        {PENALTY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {entry.type === "अन्य" && (
                      <input
                        type="text"
                        placeholder="कारण का विवरण लिखें..."
                        value={entry.otherReason || ""}
                        onChange={(e) => updateEntry(m._id, { otherReason: e.target.value })}
                        className="w-full bg-white border-2 border-rose-200 rounded-2xl py-3 px-4 font-bold text-slate-700 outline-none focus:border-rose-400"
                      />
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Action Footer */}
      
      <div className="fixed bottom-10 left-0 right-0 p-6 bg-gradient-to-t from-[#FDF2F2] via-[#FDF2F2]/90 to-transparent">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          disabled={totalPenalty === 0 || saving}
          onClick={() => setShowSummary(true)}
          className="w-full bg-slate-900 text-white py-5 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 disabled:opacity-40"
        >
          {saving ? "प्रतीक्षा करें..." : "पेनल्टी सुरक्षित करें"}
          <Save size={22} />
        </motion.button>
      </div>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSummary(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3.5rem] z-50 p-8 pb-16 shadow-2xl">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600"><Info size={20} /></div>
                <h2 className="text-2xl font-black text-slate-800">पेनल्टी सारांश</h2>
              </div>

              <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-6 mb-8 text-center">
                <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">कुल पेनल्टी राशि</p>
                <p className="text-5xl font-black text-rose-600 tracking-tighter">₹{totalPenalty}</p>
                <div className="mt-4 flex justify-center gap-2">
                   <div className="px-4 py-1 bg-white rounded-full text-[10px] font-bold text-rose-500 border border-rose-100 shadow-sm">
                      {activeEntries.length} सदस्यों पर पेनल्टी
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowSummary(false)} className="flex-1 py-4 font-bold text-slate-500 bg-slate-100 rounded-2xl">संशोधन करें</button>
                <button onClick={handleConfirmSave} className="flex-[2] py-4 font-black text-white bg-rose-600 rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95">पुष्टि करें</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {uiMessage && (
          <motion.div initial={{ y: -100 }} animate={{ y: 30 }} exit={{ y: -100 }} className={`fixed top-0 left-6 right-6 z-[60] p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white font-bold border-2 border-white/20 ${uiMessage.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'}`}>
            {uiMessage.type === 'error' ? <AlertCircle /> : <CheckCircle2 />}
            {uiMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}