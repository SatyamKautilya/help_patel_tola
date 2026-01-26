"use client";

import { useEffect, useState, useMemo } from "react";
import {
  IndianRupee,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Save,
  AlertCircle,
  Wallet,
  Users,
  Zap,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MonthlySavingsEntry({ params }) {
  const { shgid } = params;
  const router = useRouter();

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [members, setMembers] = useState([]);
  const [entries, setEntries] = useState({});
  const [memberDueMap, setMemberDueMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [uiMessage, setUiMessage] = useState(null);

  /* ---------------- FETCH DATA ---------------- */
  const fetchMonthlyData = async () => {
    const resp = await fetch("/api/shg?name=monthly-contribution-due", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shgId: shgid, month }),
    });
    const data = await resp.json();
    const list = data.members || [];
    setMembers(list);

    const dueMap = {};
    list.forEach((m) => (dueMap[m.memberId] = m.due));
    setMemberDueMap(dueMap);
  };

  useEffect(() => {
    fetchMonthlyData();
  }, [shgid, month]);

  /* ---------------- BULK LOGIC ---------------- */
  // Check if all active dues are the same value
  const commonDueValue = useMemo(() => {
    const activeDues = members.filter((m) => m.due > 0).map((m) => m.due);
    if (activeDues.length === 0) return null;
    const first = activeDues[0];
    return activeDues.every((d) => d === first) ? first : null;
  }, [members]);

  const applyBulkSavings = () => {
    const newEntries = {};
    members.forEach((m) => {
      if (m.due > 0) newEntries[m.memberId] = m.due;
    });
    setEntries(newEntries);
    setUiMessage({ type: "success", text: "सभी सदस्यों की राशि भरी गई" });
    setTimeout(() => setUiMessage(null), 2000);
  };

  /* ---------------- CALCULATIONS ---------------- */
  const totalExpected = members.reduce((acc, m) => acc + (m.due || 0), 0);
  const totalActual = Object.values(entries).reduce(
    (acc, val) => acc + (Number(val) || 0),
    0,
  );

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (memberId, value) => {
    if (value === "") {
      setEntries((p) => ({ ...p, [memberId]: "" }));
      return;
    }
    let num = Number(value);
    const maxDue = memberDueMap[memberId] ?? 0;
    if (num > maxDue) {
      num = maxDue;
      setUiMessage({ type: "error", text: "अधिकतम राशि ₹" + maxDue });
      setTimeout(() => setUiMessage(null), 2000);
    }
    setEntries((p) => ({ ...p, [memberId]: num }));
  };

  const handleConfirmSave = async () => {
    setShowSummary(false);
    const contributions = Object.entries(entries)
      .filter(([_, amt]) => amt && amt > 0)
      .map(([memberId, amount]) => ({ memberId, amount }));

    setSaving(true);
    try {
      const resp = await fetch("/api/shg?name=save-monthly-savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shgId: shgid, month, contributions }),
      });
      if (!resp.ok) throw new Error();
      setUiMessage({ type: "success", text: "डाटा सुरक्षित हो गया!" });
      setEntries({});
      fetchMonthlyData();
    } catch {
      setUiMessage({ type: "error", text: "त्रुटि हुई, फिर प्रयास करें" });
    } finally {
      setSaving(false);
      setTimeout(() => setUiMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-teal-50 pb-24">
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-indigo-200/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-rose-200/40 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-40 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Wallet className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-xl text-slate-800 tracking-tight">
              तमोहर
            </h1>
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
              मासिक बचत प्रविष्टि
            </span>
          </div>{" "}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.back()}
          className="p-2.5 bg-slate-100 rounded-xl text-slate-600"
        >
          <ChevronLeft size={20} />
        </motion.button>
      </nav>

      {/* Stats & Actions */}
      <div className="px-6 mt-6 space-y-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Calendar className="text-indigo-500 w-5 h-5" />
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="font-bold text-slate-700 outline-none bg-transparent"
            />
          </div>
          <div className="h-8 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-rose-500" />
            <span className="font-black text-slate-800 text-lg">
              {members.length}
            </span>
          </div>
        </div>

        {/* BULK BUTTON */}
        <AnimatePresence>
          {commonDueValue && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={applyBulkSavings}
              className="w-full bg-indigo-50 border border-indigo-200 py-3 rounded-2xl flex items-center justify-center gap-2 text-indigo-700 font-bold text-sm shadow-sm"
            >
              <Zap size={16} fill="currentColor" />
              सभी का एक साथ ₹{commonDueValue} जमा करें
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Member Cards */}
      <div className="px-6 mt-6 space-y-4">
        {members.map((m, idx) => (
          <motion.div
            key={m.memberId}
            className={`p-5 rounded-[2rem] shadow-md border ${
              idx % 2 === 0
                ? "bg-white border-indigo-50"
                : "bg-white border-rose-50"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${idx % 2 === 0 ? "bg-indigo-100 text-indigo-600" : "bg-rose-100 text-rose-600"}`}
                >
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{m.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    बकाया: ₹{m.due}
                  </p>
                </div>
              </div>
              {m.due === 0 && (
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full">
                  <CheckCircle2 size={12} /> पूर्ण
                </div>
              )}
            </div>

            {m.due > 0 && (
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <IndianRupee size={18} />
                </div>
                <input
                  type="number"
                  value={entries[m.memberId] || ""}
                  onChange={(e) => handleChange(m.memberId, e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-xl font-black text-slate-900 outline-none focus:border-indigo-400 focus:bg-white transition-all"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F1F5F9] via-[#F1F5F9]/90 to-transparent">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={totalActual === 0 || saving}
          onClick={() => setShowSummary(true)}
          className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {saving ? "प्रतीक्षा करें..." : "डाटा सुरक्षित करें"}
          <Save size={20} />
        </motion.button>
      </div>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSummary(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              exit={{ y: 500 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] z-50 p-8 shadow-2xl"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
              <h2 className="text-2xl font-black text-slate-800 mb-6">
                पुष्टि करें
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-slate-500 font-bold">
                    कुल अपेक्षित राशि
                  </span>
                  <span className="text-slate-900 font-black">
                    ₹{totalExpected}
                  </span>
                </div>
                <div className="flex justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <span className="text-indigo-600 font-bold">
                    कुल जमा राशि
                  </span>
                  <span className="text-indigo-700 font-black text-xl">
                    ₹{totalActual}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSummary(false)}
                  className="flex-1 py-4 font-bold text-slate-500 bg-slate-100 rounded-2xl"
                >
                  रद्द करें
                </button>
                <button
                  onClick={handleConfirmSave}
                  className="flex-[2] py-4 font-black text-white bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200"
                >
                  हाँ, सुरक्षित करें
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {uiMessage && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 20 }}
            exit={{ y: -100 }}
            className={`fixed top-4 left-6 right-6 z-[60] p-4 rounded-2xl shadow-xl flex items-center gap-3 text-white font-bold ${uiMessage.type === "error" ? "bg-rose-500" : "bg-emerald-500"}`}
          >
            {uiMessage.type === "error" ? <AlertCircle /> : <CheckCircle2 />}
            {uiMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
