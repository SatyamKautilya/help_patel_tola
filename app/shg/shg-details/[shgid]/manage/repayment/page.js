"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IndianRupee,
  ChevronLeft,
  HandCoins,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  FileText,
  Edit2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoanRepaymentPage({ params }) {
  const { shgid } = params;
  const router = useRouter();

  const [step, setStep] = useState("entry"); // "entry" | "review"
  const [loans, setLoans] = useState([]);
  const [repayments, setRepayments] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uiMessage, setUiMessage] = useState(null);

  /* ---------------- FETCH ACTIVE LOANS ---------------- */
  useEffect(() => {
    const loadLoans = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/shg?name=list-active-loans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shgId: shgid }),
        });
        const data = await res.json();
        setLoans(data.loans || []);

        const initial = {};
        data.loans?.forEach((loan) => {
          initial[loan._id] = {
            principal: "",
            interest: loan.monthlyInterest || "",
          };
        });
        setRepayments(initial);
      } catch {
        setUiMessage({ type: "error", text: "लोन लोड करने में विफल" });
      } finally {
        setLoading(false);
      }
    };
    loadLoans();
  }, [shgid]);

  const updatePayment = (loanId, field, value) => {
    setRepayments((p) => ({
      ...p,
      [loanId]: { ...p[loanId], [field]: value },
    }));
  };

  /* ---------------- HELPERS ---------------- */
  const getValidationErrors = (loan) => {
    const pay = repayments[loan._id] || {};
    const pVal = Number(pay.principal || 0);
    const iVal = Number(pay.interest || 0);

    if ((pVal > 0 || iVal > 0) && iVal < loan.monthlyInterest) {
      return "मासिक ब्याज पूरा भरना अनिवार्य है";
    }
    if (pVal > loan.outstandingPrincipal) {
      return "मूलधन बकाया से अधिक है";
    }
    return null;
  };

  const hasAnyValidationError = () => {
    return loans.some((loan) => {
      const err = getValidationErrors(loan);
      const pay = repayments[loan._id];
      const total = Number(pay?.principal || 0) + Number(pay?.interest || 0);
      return err && total > 0;
    });
  };

  // Calculate grand total
  const grandTotal = Object.values(repayments).reduce((acc, curr) => {
    return acc + Number(curr.principal || 0) + Number(curr.interest || 0);
  }, 0);

  // Get only the loans that have payments for the review step
  const activeRepayments = loans.filter((loan) => {
    const pay = repayments[loan._id];
    return (Number(pay?.principal || 0) + Number(pay?.interest || 0)) > 0;
  });

  /* ---------------- HANDLERS ---------------- */
  const handleReview = () => {
    if (hasAnyValidationError()) {
      setUiMessage({ type: "error", text: "कृपया लाल रंग की त्रुटियां सुधारें" });
      return;
    }
    if (grandTotal <= 0) {
      setUiMessage({ type: "error", text: "कम से कम एक राशि भरें" });
      return;
    }
    setStep("review");
  };

  const submitRepayments = async () => {
    const payloads = activeRepayments.map((loan) => {
      const pay = repayments[loan._id] || {};
      const principal = Number(pay.principal || 0);
      const interest = Number(pay.interest || 0);
      return {
        loanId: loan._id,
        memberId: loan.memberId,
        principal,
        interest,
        amount: principal + interest,
      };
    });

    try {
      setSaving(true);
      await Promise.all(
        payloads.map((p) =>
          fetch("/api/shg?name=collect-repayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shgId: shgid, ...p }),
          })
        )
      );
      setUiMessage({ type: "success", text: "वसूली सफल" });
      setTimeout(() => router.back(), 2000);
    } catch {
      setUiMessage({ type: "error", text: "त्रुटि हुई" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative flex flex-col overflow-x-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[30%] bg-emerald-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[60%] h-[30%] bg-orange-200/20 rounded-full blur-[100px]" />

      {/* Header */}
      <nav className="relative z-20 px-6 pt-6 flex items-center justify-between bg-white/40 backdrop-blur-md pb-4 sticky top-0 border-b border-white/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <HandCoins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tighter">ऋण वसूली</h1>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              {step === "entry" ? `कुल संग्रह: ₹${grandTotal}` : "पुष्टि करें (Review)"}
            </span>
          </div>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => step === "review" ? setStep("entry") : router.back()} 
          className="p-3 bg-white rounded-2xl border shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </motion.button>
      </nav>

      {/* Main Content */}
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
              {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-500" /></div>
              ) : (
                loans.map((loan, i) => {
                  const pay = repayments[loan._id] || {};
                  const error = getValidationErrors(loan);
                  const total = Number(pay.principal || 0) + Number(pay.interest || 0);
                  const remainingBalance = loan.outstandingPrincipal - Number(pay.principal || 0);

                  return (
                    <motion.div
                      key={loan._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-[2.2rem] border border-white shadow-sm group-hover:shadow-md transition-all" />
                      <div className="relative p-6 space-y-4">
                        {/* Member Info Card */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">{loan.memberName}</h3>
                            <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1">
                              बकाया मूलधन: <span className="text-slate-800 font-black">₹{loan.outstandingPrincipal}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black border border-emerald-100 uppercase">
                              {loan.interestRate}% Interest
                            </span>
                          </div>
                        </div>

                        {/* Input Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tight ml-1">ब्याज (Interest)</label>
                            <div className="relative">
                              <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" />
                              <input
                                type="number"
                                className="pl-9 w-full py-3.5 bg-white/50 border border-slate-100 rounded-2xl font-black text-sm focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                                value={pay.interest}
                                placeholder={`Due ${loan.monthlyInterest}`}
                                onChange={(e) => updatePayment(loan._id, "interest", e.target.value)}
                              />
                            </div>
                            <p className="text-[9px] font-bold text-orange-600 ml-1">देय: ₹{loan.monthlyInterest}</p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tight ml-1">मूलधन (Principal)</label>
                            <div className="relative">
                              <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
                              <input
                                type="number"
                                className="pl-9 w-full py-3.5 bg-white/50 border border-slate-100 rounded-2xl font-black text-sm focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                                value={pay.principal}
                                placeholder="0"
                                onChange={(e) => updatePayment(loan._id, "principal", e.target.value)}
                              />
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 ml-1">किस्त जमा करें</p>
                          </div>
                        </div>

                        {/* Dynamic Summary Section */}
                        <div className="pt-2 border-t border-dashed border-slate-200 space-y-2">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-500">संग्रह के बाद शेष (Balance):</span>
                            <span className={`tracking-tight ${remainingBalance === 0 ? "text-emerald-600" : "text-slate-800"}`}>
                              ₹{remainingBalance}
                            </span>
                          </div>
                          {total > 0 && (
                            <div className="flex justify-between text-xs font-black bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/50">
                              <span className="text-emerald-700 uppercase tracking-tighter">कुल जमा राशि</span>
                              <span className="text-emerald-700 font-black tracking-tight">₹{total}</span>
                            </div>
                          )}
                        </div>

                        {error && (
                          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-red-600 text-[10px] font-black bg-red-50 p-3 rounded-xl border border-red-100">
                            <AlertCircle size={14} />
                            {error.toUpperCase()}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
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
              {/* Grand Total Summary Card */}
              <div className="relative overflow-hidden p-6 rounded-[2.5rem] bg-slate-900 text-white shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                <p className="opacity-60 text-[10px] font-black uppercase tracking-widest">आज का कुल संग्रह</p>
                <h2 className="text-4xl font-black tracking-tighter mt-1">₹{grandTotal}</h2>
                <div className="mt-4 flex gap-4 text-xs font-bold opacity-80">
                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"/> {activeRepayments.length} सदस्य</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">विवरण (Details)</p>
                {activeRepayments.map((loan) => {
                  const pay = repayments[loan._id];
                  return (
                    <div key={loan._id} className="bg-white/70 backdrop-blur-md p-5 rounded-[2rem] border border-white shadow-sm flex justify-between items-center">
                       <div>
                          <p className="font-black text-slate-800">{loan.memberName}</p>
                          <div className="flex gap-2 mt-1">
                             <span className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100 font-bold">ब्याज: ₹{pay.interest || 0}</span>
                             <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-bold">मूलधन: ₹{pay.principal || 0}</span>
                          </div>
                       </div>
                       <p className="font-black text-lg text-slate-800">₹{Number(pay.principal || 0) + Number(pay.interest || 0)}</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Floating Footer Button */}
      <div className="fixed bottom-0 inset-x-0 p-6 z-50">
       
        <div className="max-w-2xl mx-auto">
          {step === "entry" ? (
             <motion.button
             whileTap={{ scale: 0.96 }}
             disabled={loading || grandTotal === 0 || hasAnyValidationError()}
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
                 <Edit2 size={18} /> बदलाव करें
               </motion.button>
               <motion.button
                whileTap={{ scale: 0.96 }}
                disabled={saving}
                onClick={submitRepayments}
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-[1.8rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 disabled:opacity-50"
              >
                 {saving ? <Loader2 className="animate-spin" /> : <>जमा करें (Confirm) <CheckCircle2 size={20} /></>}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
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
            {uiMessage.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <p className="font-bold text-xs uppercase tracking-wider">{uiMessage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}