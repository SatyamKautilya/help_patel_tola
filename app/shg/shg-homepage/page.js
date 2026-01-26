"use client";

import { useEffect, useState } from "react";
import { Users, MapPin, ChevronLeft } from "lucide-react";
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
  // const user_id = new mongoose.Types.ObjectId(
  //   "6972263aaadbfedf49fba70c", // 👈 must be 24-char hex
  // );

  const user_id = thisUser?._id;

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
  console.log(shgs)

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
                key={shg._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                      router.push(
                        `/shg/shg-details/${shg.shgId}/member/passbook`,
                      );
                    }}
                    className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all cursor-pointer"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-2 ${getRoleColor(shg.role).side}`}
                    />

                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {shg.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <div className="p-1 bg-slate-100 rounded-md">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-medium">
                            {shg.village}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border ${getRoleColor(MemberRole[shg.role]).bg} ${getRoleColor(MemberRole[shg.role]).text} ${getRoleColor(MemberRole[shg.role]			).border}`}
                      >
                        {MemberRole[shg.role]	}
                      </span>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                      

                      <div className="flex gap-2 justify-between w-full">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/shg/shg-details/${shg.shgId}/member/passbook`,
                            );
                          }}
                          className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          पासबुक देखें
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/shg/shg-details/${shg.shgId}/manage`);
                          }}
                          className="px-5 py-3 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors"
                        >
						  समूह संचालन
                        </motion.button>
                      </div>
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
