"use client";

import { setLoader } from "@/app/store/appSlice";
import { farmingBot } from "@/app/utils/botContext";
import ChatbotFloating from "@/components/ChatBotFloating";
import { Button, Card, CardBody } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Sprout, Wheat, Landmark, Calculator, ChevronLeft, ChevronDown, ChevronUp, Tractor, SprayCan, Bug } from "lucide-react";

const GrainsData = [
  {
    id: "dhan",
    name: "धान की खेती (Paddy)",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=400&auto=format&fit=crop",
    details: {
      jamin: "खेत की 2-3 बार गहरी जुताई करें। मिट्टी को भुरभुरा बनाएं और पानी रोककर गारा बनाएं। रोपाई के लिए खेत समतल होना चाहिए।",
      spray: "रोपाई के 20-25 दिन बाद 30 किग्रा यूरिया प्रति एकड़ दें। बालियां निकलने से पहले नीम आधारित कीटनाशक का पहला छिड़काव कर सकते हैं।",
      bimariya: [
        {
          name: "ब्लास्ट (झोंका) रोग",
          img: "https://images.unsplash.com/photo-1588614275150-1361c47019ef?q=80&w=200&auto=format&fit=crop", 
          treatment: "कार्बेंडाजिम 50% WP का 2 ग्राम/लीटर पानी में घोलकर 15 दिन के अंतराल पर छिड़काव करें।"
        }
      ]
    }
  },
  {
    id: "gehu",
    name: "गेहूं की खेती (Wheat)",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop",
    details: {
      jamin: "खेत की तैयारी के लिए 1-2 जुताई रोटावेटर से करें। बुवाई से पहले पर्याप्त नमी सुनिश्चित करें।",
      spray: "बुवाई के 30-35 दिन बाद पहला छिड़काव (खरपतवार नियंत्रण) और 60 दिन बाद जरूरत पड़ने पर फफूंदनाशक का छिड़काव करें।",
      bimariya: [
        {
          name: "पीला रतुआ (Yellow Rust)",
          img: "https://images.unsplash.com/photo-1601002220455-ce065b26ecbd?q=80&w=200&auto=format&fit=crop", 
          treatment: "प्रोपीकोनाजोल 25% EC (1 मिली/लीटर) या टेबुकोनाजोल (1 मिली/लीटर) पानी में मिलाकर तुरंत छिड़काव करें।"
        }
      ]
    }
  },
  {
    id: "makka",
    name: "मक्का की खेती (Maize)",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400&auto=format&fit=crop",
    details: {
      jamin: "खेत को समतल करें और जल भराव न होने दें। 2-3 जुताई कर खेत को भुरभुरा बनाएं।",
      spray: "बुवाई के बाद और अंकुरण से पहले एट्राजीन (1-1.5 किग्रा/हेक्टेयर) का उपयोग खरपतवार नियंत्रण के लिए करें।",
      bimariya: [
        {
          name: "तना छेदक (Fall Armyworm)",
          img: "https://images.unsplash.com/photo-1615810292857-0803c625ae70?q=80&w=200&auto=format&fit=crop", 
          treatment: "स्पाइनटोरम 11.7 SC (0.5 मिली/लीटर) या क्लोरानट्रानिलिप्रोल 18.5% SC का छिड़काव करें।"
        }
      ]
    }
  }
];

function GrainsCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [activeView, setActiveView] = useState(null); // 'jamin' | 'spray' | 'bimariya'

  return (
    <Card className="mb-4 shadow-md w-full border border-orange-100">
      <CardBody className="p-0">
        <div 
            onClick={() => setExpanded(!expanded)} 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-orange-50/50 transition-colors"
        >
            <div className="flex items-center space-x-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-sm border border-orange-200">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-bold text-orange-900">{item.name}</h3>
            </div>
            <div className="text-orange-500 bg-orange-100 p-1.5 rounded-full">
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
        </div>

        <AnimatePresence>
            {expanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white/50"
                >
                    <div className="p-4 border-t border-orange-100 space-y-4">
                        {/* Options Menu */}
                        <div className="grid grid-cols-3 gap-2">
                            <div 
                                onClick={() => setActiveView('jamin')}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border ${activeView === 'jamin' ? 'bg-orange-100 border-orange-400 text-orange-800' : 'bg-slate-50 border-slate-200 text-slate-600'} cursor-pointer hover:bg-orange-50 transition-colors text-center shadow-sm`}
                            >
                                <Tractor size={22} className="mb-1" />
                                <span className="text-[10px] font-bold">जमीन की<br/>तैयारी</span>
                            </div>
                            <div 
                                onClick={() => setActiveView('spray')}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border ${activeView === 'spray' ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-600'} cursor-pointer hover:bg-blue-50 transition-colors text-center shadow-sm`}
                            >
                                <SprayCan size={22} className="mb-1" />
                                <span className="text-[10px] font-bold">स्प्रे<br/>शेड्यूल</span>
                            </div>
                            <div 
                                onClick={() => setActiveView('bimariya')}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border ${activeView === 'bimariya' ? 'bg-red-100 border-red-400 text-red-800' : 'bg-slate-50 border-slate-200 text-slate-600'} cursor-pointer hover:bg-red-50 transition-colors text-center shadow-sm`}
                            >
                                <Bug size={22} className="mb-1" />
                                <span className="text-[10px] font-bold">बीमारियां व<br/>उपचार</span>
                            </div>
                        </div>

                        {/* Detail Panels */}
                        <AnimatePresence mode="wait">
                            {activeView === 'jamin' && (
                                <motion.div key="jamin" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-sm text-orange-950 font-medium leading-relaxed">
                                    <h4 className="font-bold flex items-center mb-2"><Tractor size={18} className="mr-2 text-orange-600"/> जमीन की तैयारी के निर्देश</h4>
                                    {item.details.jamin}
                                </motion.div>
                            )}
                            
                            {activeView === 'spray' && (
                                <motion.div key="spray" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-blue-950 font-medium leading-relaxed">
                                    <h4 className="font-bold flex items-center mb-2"><SprayCan size={18} className="mr-2 text-blue-600"/> छिड़काव (स्प्रे) का शेड्यूल</h4>
                                    {item.details.spray}
                                </motion.div>
                            )}

                            {activeView === 'bimariya' && (
                                <motion.div key="bimariya" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-4">
                                    {item.details.bimariya.map((disease, idx) => (
                                        <div key={idx} className="bg-red-50 border border-red-200 p-3 rounded-xl flex space-x-3 items-start">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-red-300 shadow-sm mt-1">
                                                <Image src={disease.img} alt={disease.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-red-900 text-sm mb-1">{disease.name}</h4>
                                                <p className="text-xs text-red-800 font-medium leading-relaxed bg-white/50 p-2 rounded">
                                                    <span className="font-bold block mb-1">उपचार:</span>
                                                    {disease.treatment}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </CardBody>
    </Card>
  );
}

export default function AgriculturePage() {
  const [search, setSearch] = useState("");
  const [cropList, setCropList] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();

  const filteredCrops = cropList.filter((crop) => crop.name.includes(search));

  const dispatch = useDispatch();
  const initializeApp = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetch(`/api/subcategory/crops`);
      if (response.ok) {
        const data = await response.json();
        setCropList(data.crops || []);
      }
    } catch (error) {
      console.error("Failed to initialize app:", error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const handleClick = (cropId) => {
    router.push(`/subcategory/farming/crop?name=${cropId}`);
  };

  const handleBack = () => {
    if (activeTab) {
      setActiveTab(null);
      setSearch("");
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, duration: 0.5 }}
        className="fixed top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-green-200 shadow-sm"
      >
        <div className="flex flex-col pt-4 relative px-4">
            <button 
                onClick={handleBack} 
                className="absolute left-4 top-4 p-1.5 bg-green-100/80 text-green-700 hover:bg-green-200 rounded-full transition-colors z-30"
            >
                <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col items-center">
                <Image
                    src="https://8dxblayock8syelc.public.blob.vercel-storage.com/farming/tamoharagr.png"
                    alt="Farming Logo"
                    width={200}
                    height={46}
                    priority
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-3 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                />
            </div>
        </div>
      </motion.header>

      <div className="pt-32 px-4 pb-24">
        <AnimatePresence mode="wait">
            {!activeTab && (
                <motion.div 
                    key="menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-3 mb-6"
                >
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClickCapture={() => setActiveTab('sabji')} 
                        className="relative overflow-hidden w-full h-28 rounded-[20px] bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer border border-emerald-300/40 flex flex-col justify-between group p-3"
                    >
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg inline-block shadow-inner w-fit relative z-10">
                            <Sprout size={20} className="text-emerald-100" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-sm leading-tight drop-shadow-md">सब्जी की खेती</h3>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClickCapture={() => setActiveTab('dhan')}
                        className="relative overflow-hidden w-full h-28 rounded-[20px] bg-gradient-to-br from-amber-600 to-orange-500 text-white shadow-[0_8px_20px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer border border-amber-300/40 flex flex-col justify-between group p-3"
                    >
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg inline-block shadow-inner w-fit relative z-10">
                            <Wheat size={20} className="text-amber-100" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-sm leading-tight drop-shadow-md">धान/गेहूं/मक्का</h3>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClickCapture={() => router.push('/govt-schemes')}
                        className="relative overflow-hidden w-full h-28 rounded-[20px] bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-[0_8px_20px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer border border-blue-300/40 flex flex-col justify-between group p-3"
                    >
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg inline-block shadow-inner w-fit relative z-10">
                            <Landmark size={20} className="text-blue-100" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-sm leading-tight drop-shadow-md">सरकारी योजनाएं</h3>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClickCapture={() => router.push('/village-help-guide')}
                        className="relative overflow-hidden w-full h-28 rounded-[20px] bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-[0_8px_20px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-pointer border border-purple-300/40 flex flex-col justify-between group p-3"
                    >
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg inline-block shadow-inner w-fit relative z-10">
                            <Calculator size={20} className="text-purple-100" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-sm leading-tight drop-shadow-md">खेती कैलकुलेटर</h3>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {activeTab === 'sabji' && (
                <motion.div
                    key="sabji-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="फसल खोजें (जैसे – टमाटर)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-full border border-green-300 bg-white px-5 py-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-md transition-all duration-300"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {filteredCrops.map((crop) => (
                            <motion.div
                                onClick={() => handleClick(crop.id)}
                                key={crop.id}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-2xl bg-white p-3 shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out"
                            >
                                <div className="relative h-36 w-full overflow-hidden rounded-xl">
                                    <Image
                                        src={crop.url}
                                        alt={crop.name}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="mt-3 text-center">
                                    <h3 className="text-lg font-bold text-gray-800">{crop.name}</h3>
                                </div>
                                <div className="mt-2 flex justify-around text-sm text-green-700 font-medium">
                                    <span>💧 पानी</span>
                                    <span>🧪 खाद</span>
                                    <span>🐛 कीट</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'dhan' && (
                <motion.div
                    key="dhan-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                >
                    <h2 className="text-2xl font-bold text-amber-900 mb-6 px-1">धान, गेहूं एवं मक्का <br/><span className="text-sm font-medium text-amber-700">प्रमुख फसल उत्पादन गाइड</span></h2>
                    
                    {GrainsData.map((item) => (
                        <GrainsCard key={item.id} item={item} />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>

        <ChatbotFloating
          context={farmingBot}
          buttonLabel="तमोहर- कृषि विशेषज्ञ से पूछें"
        />
      </div>
    </div>
  );
}
