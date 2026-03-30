'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	Store,
	Phone,
	MapPin,
	ChevronDown,
	ChevronUp,
	Package,
	Users,
	Truck,
	ArrowUpRight,
} from 'lucide-react';

const businesses = [
	{
		id: 'kirana',
		title: 'किराना / जनरल स्टोर',
		emoji: '🏪',
		gradient: 'from-emerald-500 to-green-600',
		shadow: 'shadow-emerald-500/25',
		desc: 'दैनिक उपभोग की वस्तुएं — चावल, दाल, तेल, मसाले आदि',
		investment: '₹50,000 - ₹2,00,000',
		margin: '10-20%',
		wholesalers: [
			{ name: 'इंडिया मार्ट', type: 'ऑनलाइन', contact: 'indiamart.com' },
			{ name: 'मेट्रो कैश एंड कैरी', type: 'होलसेल', contact: 'निकटतम शहर' },
			{ name: 'स्थानीय मंडी', type: 'थोक बाजार', contact: 'जिला मंडी' },
		],
		tips: ['GST रजिस्ट्रेशन कराएं', 'UPI/ डिजिटल पेमेंट रखें', 'स्टॉक रजिस्टर बनाएं'],
	},
	{
		id: 'kapda',
		title: 'कपड़ा / गारमेंट',
		emoji: '👔',
		gradient: 'from-pink-500 to-rose-600',
		shadow: 'shadow-pink-500/25',
		desc: 'रेडीमेड गारमेंट, सिलाई का कपड़ा, साड़ी, सूट पीस',
		investment: '₹1,00,000 - ₹5,00,000',
		margin: '25-40%',
		wholesalers: [
			{ name: 'सूरत मार्केट', type: 'होलसेल हब', contact: 'सूरत, गुजरात' },
			{ name: 'इंदौर कपड़ा मार्केट', type: 'होलसेल', contact: 'इंदौर, MP' },
			{ name: 'MT Market Bhopal', type: 'थोक बाजार', contact: 'भोपाल, MP' },
		],
		tips: ['सीज़न के अनुसार स्टॉक रखें', 'सोशल मीडिया पर प्रमोट करें', 'ट्रायल रूम बनाएं'],
	},
	{
		id: 'hardware',
		title: 'हार्डवेयर / बिल्डिंग',
		emoji: '🔩',
		gradient: 'from-slate-500 to-zinc-600',
		shadow: 'shadow-slate-500/25',
		desc: 'सीमेंट, सरिया, पेंट, पाइप, इलेक्ट्रिकल सामान',
		investment: '₹2,00,000 - ₹10,00,000',
		margin: '8-15%',
		wholesalers: [
			{ name: 'UltraTech / ACC', type: 'सीमेंट डीलर', contact: 'कंपनी संपर्क' },
			{ name: 'Finolex / Astral', type: 'पाइप डीलर', contact: 'ज़ोनल ऑफिस' },
			{ name: 'Asian Paints Depot', type: 'पेंट', contact: 'डिस्ट्रीब्यूटर' },
		],
		tips: ['डिलीवरी सर्विस रखें', 'क्रेडिट बुक maintain करें', 'बिल्डर्स से संपर्क बनाएं'],
	},
	{
		id: 'mobile-shop',
		title: 'मोबाइल / इलेक्ट्रॉनिक्स',
		emoji: '📱',
		gradient: 'from-violet-500 to-purple-600',
		shadow: 'shadow-violet-500/25',
		desc: 'मोबाइल, चार्जर, ईयरफोन, रिपेयर सर्विस',
		investment: '₹1,00,000 - ₹5,00,000',
		margin: '5-15%',
		wholesalers: [
			{ name: 'Gaffar Market Delhi', type: 'होलसेल', contact: 'दिल्ली' },
			{ name: 'Amazon / Flipkart', type: 'ऑनलाइन', contact: 'ऑनलाइन' },
			{ name: 'स्थानीय डिस्ट्रीब्यूटर', type: 'कंपनी', contact: 'जिला स्तर' },
		],
		tips: ['रिपेयर सर्विस जोड़ें', 'एक्सेसरीज़ भी रखें', 'Demo phone रखें'],
	},
	{
		id: 'medical',
		title: 'मेडिकल स्टोर',
		emoji: '💊',
		gradient: 'from-red-500 to-rose-600',
		shadow: 'shadow-red-500/25',
		desc: 'दवाइयां, सर्जिकल सामान, बेबी प्रोडक्ट्स',
		investment: '₹3,00,000 - ₹8,00,000',
		margin: '20-30%',
		wholesalers: [
			{ name: 'PharmEasy / 1mg', type: 'ऑनलाइन', contact: 'ऐप से ऑर्डर' },
			{ name: 'स्थानीय दवा वितरक', type: 'होलसेल', contact: 'जिला स्तर' },
			{ name: 'Cipla / Sun Pharma', type: 'कंपनी', contact: 'स्टॉकिस्ट' },
		],
		tips: ['फार्मेसी लाइसेंस ज़रूरी', 'फ्रिज में दवाई रखें', 'एक्सपायरी चेक करें'],
	},
	{
		id: 'khad-beej',
		title: 'खाद / बीज / कीटनाशक',
		emoji: '🌾',
		gradient: 'from-lime-600 to-green-700',
		shadow: 'shadow-lime-500/25',
		desc: 'खेती के लिए खाद, बीज, दवाई और कृषि उपकरण',
		investment: '₹1,00,000 - ₹5,00,000',
		margin: '10-20%',
		wholesalers: [
			{ name: 'IFFCO / NFL', type: 'खाद', contact: 'सरकारी डीलरशिप' },
			{ name: 'Bayer / Syngenta', type: 'कीटनाशक', contact: 'कंपनी डिस्ट्रीब्यूटर' },
			{ name: 'जिला कृषि केंद्र', type: 'सरकारी', contact: 'ब्लॉक ऑफिस' },
		],
		tips: ['फसल सीज़न में स्टॉक रखें', 'सरकारी सब्सिडी की जानकारी दें', 'किसानों से सीधा संपर्क'],
	},
];

export default function VyaparPage() {
	const router = useRouter();
	const [expandedId, setExpandedId] = useState(null);

	const toggleExpand = (id) => {
		setExpandedId(expandedId === id ? null : id);
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white pb-16'>
			{/* Header */}
			<div className='sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						onClick={() => router.back()}
						className='w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform'>
						<ArrowLeft size={18} />
					</button>
					<div>
						<h1 className='text-lg font-bold leading-tight'>व्यापार</h1>
						<p className='text-[10px] text-white/40 font-medium'>Business Directory</p>
					</div>
				</div>
			</div>

			{/* Hero */}
			<div className='px-5 pt-6 pb-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					<div className='flex items-center gap-2 mb-2'>
						<Store size={18} className='text-emerald-400' />
						<span className='text-xs font-medium text-emerald-400 uppercase tracking-wider'>
							अपना व्यापार शुरू करें
						</span>
					</div>
					<h2 className='text-2xl font-bold leading-tight'>
						व्यापार की
						<br />
						<span className='bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
							पूरी जानकारी
						</span>
					</h2>
					<p className='text-sm text-white/40 mt-2 leading-relaxed'>
						निवेश, मार्जिन, होलसेल डीलर और व्यापार टिप्स — एक ही जगह
					</p>
				</motion.div>
			</div>

			{/* Business Cards */}
			<div className='px-4 pt-2 space-y-4'>
				{businesses.map((biz, index) => {
					const isExpanded = expandedId === biz.id;
					return (
						<motion.div
							key={biz.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.08 + index * 0.05 }}
							className='bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden'>

							{/* Card header — always visible */}
							<div
								className='p-5 cursor-pointer'
								onClick={() => toggleExpand(biz.id)}>
								<div className='flex items-start gap-4'>
									<div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${biz.gradient} flex items-center justify-center text-2xl shadow-lg ${biz.shadow} shrink-0`}>
										{biz.emoji}
									</div>
									<div className='flex-1 min-w-0'>
										<div className='flex items-start justify-between'>
											<div>
												<h3 className='text-base font-black text-white'>{biz.title}</h3>
												<p className='text-[11px] text-white/40 mt-0.5'>{biz.desc}</p>
											</div>
											<div className='p-1 rounded-lg bg-white/10 shrink-0'>
												{isExpanded ? (
													<ChevronUp className='w-4 h-4 text-white/60' />
												) : (
													<ChevronDown className='w-4 h-4 text-white/60' />
												)}
											</div>
										</div>

										{/* Quick meta */}
										<div className='flex flex-wrap gap-x-4 gap-y-1 mt-3'>
											<span className='text-[10px] text-white/50'>
												💰 निवेश: <span className='text-white/70 font-semibold'>{biz.investment}</span>
											</span>
											<span className='text-[10px] text-white/50'>
												📊 मार्जिन: <span className='text-emerald-400 font-semibold'>{biz.margin}</span>
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Expanded details */}
							<AnimatePresence>
								{isExpanded && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className='overflow-hidden'>
										<div className='px-5 pb-5 space-y-4 border-t border-white/5 pt-4'>
											{/* Wholesale Dealers */}
											<div>
												<div className='flex items-center gap-2 mb-2'>
													<Truck className='w-3.5 h-3.5 text-cyan-400' />
													<p className='text-[11px] font-black text-cyan-400 uppercase tracking-wider'>
														होलसेल डीलर
													</p>
												</div>
												<div className='space-y-2'>
													{biz.wholesalers.map((w) => (
														<div
															key={w.name}
															className='flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5'>
															<div>
																<p className='text-xs font-bold text-white'>{w.name}</p>
																<p className='text-[10px] text-white/40 mt-0.5'>{w.type}</p>
															</div>
															<div className='flex items-center gap-1 text-[10px] text-white/40'>
																<MapPin className='w-3 h-3' />
																{w.contact}
															</div>
														</div>
													))}
												</div>
											</div>

											{/* Tips */}
											<div>
												<div className='flex items-center gap-2 mb-2'>
													<Users className='w-3.5 h-3.5 text-amber-400' />
													<p className='text-[11px] font-black text-amber-400 uppercase tracking-wider'>
														व्यापार टिप्स
													</p>
												</div>
												<div className='flex flex-wrap gap-2'>
													{biz.tips.map((tip) => (
														<span
															key={tip}
															className='text-[10px] font-medium text-white/60 bg-white/[0.06] border border-white/10 px-3 py-1.5 rounded-xl'>
															✅ {tip}
														</span>
													))}
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					);
				})}
			</div>

			{/* Footer note */}
			<div className='px-4 pt-4'>
				<div className='flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10'>
					<Package className='w-4 h-4 text-emerald-400 shrink-0' />
					<p className='text-[11px] text-white/50 leading-relaxed'>
						अधिक व्यापार विकल्प और विस्तृत डीलर डेटा जल्द ही जोड़ा जाएगा।
					</p>
				</div>
			</div>
		</div>
	);
}
