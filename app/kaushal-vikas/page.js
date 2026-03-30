'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	Wrench,
	Zap,
	Droplets,
	PaintBucket,
	Hammer,
	Cpu,
	Scissors,
	ChefHat,
	Play,
	BookOpen,
	ArrowUpRight,
} from 'lucide-react';

const skills = [
	{
		id: 'electrician',
		title: 'इलेक्ट्रीशियन',
		titleEn: 'Electrician',
		emoji: '⚡',
		icon: Zap,
		gradient: 'from-amber-500 to-yellow-600',
		shadow: 'shadow-amber-500/25',
		desc: 'घरेलू वायरिंग, MCB, स्विच बोर्ड, और इलेक्ट्रिकल सेफ्टी',
		videos: 12,
		tools: ['टेस्टर', 'प्लायर', 'ड्रिल मशीन', 'वायर स्ट्रिपर'],
	},
	{
		id: 'plumber',
		title: 'प्लंबर',
		titleEn: 'Plumber',
		emoji: '🔧',
		icon: Droplets,
		gradient: 'from-blue-500 to-cyan-600',
		shadow: 'shadow-blue-500/25',
		desc: 'पाइप फिटिंग, नल मरम्मत, टंकी कनेक्शन, लीकेज ठीक करना',
		videos: 10,
		tools: ['पाइप कटर', 'रिंच', 'सील टेप', 'सोल्डरिंग किट'],
	},
	{
		id: 'painter',
		title: 'पेंटर',
		titleEn: 'Painter',
		emoji: '🎨',
		icon: PaintBucket,
		gradient: 'from-rose-500 to-pink-600',
		shadow: 'shadow-rose-500/25',
		desc: 'दीवार पुट्टी, प्राइमर, डिस्टेंपर, टेक्सचर पेंटिंग',
		videos: 8,
		tools: ['रोलर', 'ब्रश सेट', 'स्प्रे गन', 'पुट्टी ब्लेड'],
	},
	{
		id: 'carpenter',
		title: 'बढ़ई',
		titleEn: 'Carpenter',
		emoji: '🪚',
		icon: Hammer,
		gradient: 'from-orange-600 to-amber-700',
		shadow: 'shadow-orange-500/25',
		desc: 'फर्नीचर बनाना, दरवाजे-खिड़कियां, लकड़ी पॉलिश',
		videos: 9,
		tools: ['आरी', 'बरमा', 'रंदा', 'हथौड़ा'],
	},
	{
		id: 'mobile-repair',
		title: 'मोबाइल रिपेयर',
		titleEn: 'Mobile Repair',
		emoji: '📱',
		icon: Cpu,
		gradient: 'from-violet-500 to-purple-600',
		shadow: 'shadow-violet-500/25',
		desc: 'स्क्रीन बदलना, बैटरी चेंज, सॉफ्टवेयर रिपेयर',
		videos: 14,
		tools: ['स्क्रूड्राइवर किट', 'हीट गन', 'मल्टीमीटर', 'सक्शन कप'],
	},
	{
		id: 'tailoring',
		title: 'सिलाई / दर्जी',
		titleEn: 'Tailoring',
		emoji: '🧵',
		icon: Scissors,
		gradient: 'from-pink-500 to-fuchsia-600',
		shadow: 'shadow-pink-500/25',
		desc: 'कपड़े सिलना, कटिंग, डिज़ाइनिंग, मशीन रखरखाव',
		videos: 11,
		tools: ['सिलाई मशीन', 'कैंची', 'इंच टेप', 'बोबिन'],
	},
	{
		id: 'welding',
		title: 'वेल्डिंग',
		titleEn: 'Welding',
		emoji: '🔥',
		icon: Wrench,
		gradient: 'from-slate-500 to-gray-600',
		shadow: 'shadow-slate-500/25',
		desc: 'आर्क वेल्डिंग, गैस कटिंग, ग्रिल और गेट बनाना',
		videos: 7,
		tools: ['वेल्डिंग मशीन', 'हेलमेट', 'ग्राइंडर', 'इलेक्ट्रोड'],
	},
	{
		id: 'cooking',
		title: 'खानपान / कैटरिंग',
		titleEn: 'Cooking & Catering',
		emoji: '🍳',
		icon: ChefHat,
		gradient: 'from-emerald-500 to-green-600',
		shadow: 'shadow-emerald-500/25',
		desc: 'बड़े स्तर पर खाना बनाना, मेन्यू प्लानिंग, हाइजीन',
		videos: 6,
		tools: ['बड़ी कढ़ाई', 'गैस बर्नर', 'चाकू सेट', 'सर्विंग ट्रे'],
	},
];

export default function KaushalVikasPage() {
	const router = useRouter();

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
						<h1 className='text-lg font-bold leading-tight'>कौशल विकास</h1>
						<p className='text-[10px] text-white/40 font-medium'>Skill Development</p>
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
						<Wrench size={18} className='text-amber-400' />
						<span className='text-xs font-medium text-amber-400 uppercase tracking-wider'>
							हाथ का हुनर, रोजगार का सफर
						</span>
					</div>
					<h2 className='text-2xl font-bold leading-tight'>
						कौशल सीखें
						<br />
						<span className='bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent'>
							आत्मनिर्भर बनें
						</span>
					</h2>
					<p className='text-sm text-white/40 mt-2 leading-relaxed'>
						वीडियो ट्यूटोरियल और टूल्स की जानकारी — हर कौशल के लिए
					</p>
				</motion.div>
			</div>

			{/* Skill Cards */}
			<div className='px-4 pt-2 space-y-4'>
				{skills.map((skill, index) => {
					const SkillIcon = skill.icon;
					return (
						<motion.div
							key={skill.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.08 + index * 0.05 }}
							className='bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden group cursor-pointer hover:bg-white/[0.07] transition-colors'>

							<div className='p-5'>
								<div className='flex items-start gap-4'>
									{/* Icon */}
									<div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center text-2xl shadow-lg ${skill.shadow} shrink-0`}>
										{skill.emoji}
									</div>

									{/* Content */}
									<div className='flex-1 min-w-0'>
										<div className='flex items-start justify-between'>
											<div>
												<h3 className='text-base font-black text-white'>{skill.title}</h3>
												<p className='text-[10px] text-white/35 font-medium uppercase tracking-wider mt-0.5'>
													{skill.titleEn}
												</p>
											</div>
											<div className='opacity-25 group-hover:opacity-60 transition-opacity'>
												<ArrowUpRight className='w-4 h-4 text-white' />
											</div>
										</div>

										<p className='text-[11px] text-white/40 mt-2 leading-relaxed'>
											{skill.desc}
										</p>

										{/* Meta */}
										<div className='flex items-center gap-3 mt-3'>
											<span className='inline-flex items-center gap-1 text-[10px] text-white/50'>
												<Play className='w-3 h-3' />
												{skill.videos} वीडियो
											</span>
											<span className='inline-flex items-center gap-1 text-[10px] text-white/50'>
												<BookOpen className='w-3 h-3' />
												{skill.tools.length} टूल्स
											</span>
										</div>

										{/* Tool chips */}
										<div className='flex flex-wrap gap-1.5 mt-2'>
											{skill.tools.map((tool) => (
												<span
													key={tool}
													className='text-[9px] font-medium text-white/50 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg'>
													{tool}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Footer note */}
			<div className='px-4 pt-4'>
				<div className='flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10'>
					<Play className='w-4 h-4 text-amber-400 shrink-0' />
					<p className='text-[11px] text-white/50 leading-relaxed'>
						वीडियो ट्यूटोरियल और विस्तृत गाइड जल्द ही उपलब्ध होंगे।
					</p>
				</div>
			</div>
		</div>
	);
}
