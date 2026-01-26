"use client";

import { useEffect, useState } from "react";
import { Users, MapPin, ChevronLeft, BookOpen, Settings2, Sprout, Users2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";
import { useSelector } from "react-redux";

export const MemberRole = Object.freeze({
  PRESIDENT: "अध्यक्ष",
  SECRETARY: "सचिव",
  TREASURER: "कोषाध्यक्ष",
  MEMBER: "सदस्य",
});
const getRoleColor = (role) => {
  const roleColors = {
    प्रबंधक: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      side: "bg-rose-400",
    },
    अध्यक्ष: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
      side: "bg-blue-400",
    },
    सचिव: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
      side: "bg-purple-400",
    },
    कोषाध्यक्ष: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-100",
      side: "bg-green-400",
    },
    सदस्य: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-100",
      side: "bg-indigo-400",
    },
  };
  return roleColors[role] || roleColors["सदस्य"];
};
export default function UserHomePage() {
  const [shgs, setShgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const thisUser = useSelector((state) => state.appContext.user);
  const user_id = new mongoose.Types.ObjectId(
    "6972263aaadbfedf49fba70c", // 👈 must be 24-char hex
  );

  // const user_id = thisUser?._id;

  const getShgByUserId = async () => {
    // Placeholder for actual API call
    const data = await fetch("/api/shg?name=get-shg-by-user-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user_id }),
    });
    const shgs = await data.json();
    return shgs;
  };
  console.log(shgs);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getShgByUserId();

        setShgs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-teal-50 pb-24">
      {/* Header Section */}
      <div className="sticky top-0 z-20 px-6 pt-8 pb-4 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h1 className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              तमोहर
            </h1>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              मेरे{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">
                समूह
              </span>
            </h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => router.back()}
            className="absolute  right-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white z-20"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </motion.button>
        </div>
      </div>

      <main className="max-w-2xl mx-auto p-6">
        {/* Search/Filter (Visual Placeholder) */}
        {!loading && shgs.length > 0 && (
          <p className="text-sm text-slate-500 mb-6 font-medium">
            कुल {shgs.length} समूह सक्रिय हैं
          </p>
        )}

        <div className="grid gap-4">
          <AnimatePresence>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-32 rounded-3xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse border border-slate-300 shadow-md"
                  />
                ))
              : shgs.map((shg, index) => (
                  <motion.div
                    key={shg.shgId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden bg-white rounded-[2.5rem] p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 transition-all cursor-pointer"
                  >
                    {/* Decorative Background Pattern */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] transition-transform group-hover:scale-110 ${getRoleColor(shg.role).bg}`}
                    />

                    {/* Side Role Indicator */}
                    <div
                      className={`absolute left-0 top-8 bottom-8 w-1.5 rounded-r-full shadow-[0_0_15px_rgba(0,0,0,0.1)] ${getRoleColor(shg.role).side}`}
                    />

                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {/* Dynamic Avatar based on SHG Name first letter */}
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${getRoleColor(shg.role).bg} ${getRoleColor(shg.role).text}`}
                        >
                        <Users2  className="w-7 h-7" />
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                            {shg.name}
                          </h3>
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1 text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                              <MapPin className="w-3 h-3" />
                              <span className="text-[11px] font-bold uppercase tracking-wider">
                                {shg.village}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Role Badge */}
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 font-black text-[10px] tracking-tighter uppercase shadow-sm ${getRoleColor(shg.role).bg} ${getRoleColor(shg.role).text} ${getRoleColor(shg.role).border}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full animate-pulse ${getRoleColor(shg.role).side}`}
                        />
                        {MemberRole[shg.role]}
                      </div>
                    </div>

                    {/* Quick Stats or Info (Optional addition for visual balance) */}
                    <div className="mt-6 flex gap-4 text-slate-400">
                      <div className="flex-1 bg-slate-50/50 rounded-2xl p-3 border border-slate-50">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                          स्थिति
                        </p>
                        <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full" />{" "}
                          सक्रिय समूह
                        </div>
                      </div>
                     
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex gap-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/shg/shg-details/${shg.shgId}/member/${shg.memberId}/passbook`,
                          );
                        }}
                        className="flex-1 px-4 py-3.5 border-2 border-slate-100 text-slate-600 text-[11px] font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter"
                      >
                        <BookOpen className="w-4 h-4" />
                        पासबुक देखें
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/shg/shg-details/${shg.shgId}/manage`);
                        }}
                        className="flex-[1.2] px-4 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-black rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter"
                      >
                        <Settings2 className="w-4 h-4" />
                        समूह संचालन
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!loading && shgs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20 py-12 px-6"
          >
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              कोई समूह नहीं मिला
            </h3>
            <ul>
              <li className="text-slate-500 mt-2">
                • आपका समूह अभी{" "}
                <b className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">
                  {" "}
                  तमोहर
                </b>{" "}
                पर नहीं है।
              </li>
              <li className="text-slate-500 mt-2">
                • या आप अभी तक किसी भी समूह का हिस्सा नहीं हैं।
              </li>
            </ul>
          </motion.div>
        )}
      </main>

      {/* Floating Action Button */}
    </div>
  );
}
