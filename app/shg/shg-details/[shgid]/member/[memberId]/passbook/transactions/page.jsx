"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const TYPE_LABELS = {
  OPENING_BALANCE: "प्रारंभिक शेष",
  MONTHLY_DEPOSIT: "मासिक बचत",
  SAVINGS: "बचत",
  LUMP_SUM_CONTRIBUTION: "लंपसम योगदान",
  LOAN_DISBURSEMENT: "ऋण प्राप्त",
  BANK_LOAN_RECEIVED: "बैंक ऋण प्राप्त",
  LOAN_REPAYMENT: "ऋण वापसी",
  BANK_LOAN_REPAYMENT: "बैंक ऋण वापसी",
  INTEREST_PAYMENT: "ब्याज भुगतान",
  PENALTY_CHARGE: "दंड लगाया गया",
  PENALTY_PAYMENT: "दंड भुगतान",
};

const CREDIT_TYPES = new Set([
  "OPENING_BALANCE",
  "MONTHLY_DEPOSIT",
  "SAVINGS",
  "LUMP_SUM_CONTRIBUTION",
  "LOAN_DISBURSEMENT",
  "BANK_LOAN_RECEIVED",
]);

export default function MemberPassbookTransactions({ params }) {
  const { shgid, memberId } = params;
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        setLoading(true);
        const resp = await fetch("/api/shg?name=member-passbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shgid, memberId }),
        });
        if (!resp.ok) throw new Error("failed");
        const data = await resp.json();
        setRows(Array.isArray(data.transactions) ? data.transactions : []);
      } catch (err) {
        console.error(err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRows();
  }, [shgid, memberId]);

  const groupedRows = useMemo(() => {
    const grouped = {};
    rows.forEach((tx) => {
      const key = tx.type || "UNKNOWN";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(tx);
    });
    return grouped;
  }, [rows]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-8 py-6">
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              पिछले 6 महीने के लेन-देन (प्रकार अनुसार)
            </h1>
            <p className="text-xs text-slate-500">
              लेन-देन अब प्रकार के अनुसार समूहित हैं
            </p>
          </div>
          <button
            onClick={() =>
              router.push(`/shg/shg-details/${shgid}/member/${memberId}/passbook`)
            }
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-500">
            लेन-देन लोड हो रहे हैं...
          </div>
        ) : Object.keys(groupedRows).length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-500">
            कोई लेन-देन नहीं मिला।
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedRows).map(([type, txs]) => (
              <section
                key={type}
                className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5"
              >
                <h2 className="text-sm font-bold text-slate-700 mb-3">
                  {TYPE_LABELS[type] || type} ({txs.length})
                </h2>
                <div className="space-y-2">
                  {txs.map((tx, index) => {
                    const isCredit = CREDIT_TYPES.has(tx.type);
                    return (
                      <div
                        key={tx._id || `${type}-${index}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isCredit
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {isCredit ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-700 font-medium">
                            {new Date(tx.date).toLocaleDateString("hi-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <p
                          className={`text-sm font-bold ${
                            isCredit ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {isCredit ? "+" : "-"} ₹{tx.amount}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
