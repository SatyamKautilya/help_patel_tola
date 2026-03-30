'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { careers, careerOrder } from '../careerData';

export default function CareerPage() {
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
						<h1 className='text-lg font-bold leading-tight'>करियर मार्गदर्शन</h1>
						<p className='text-[10px] text-white/40 font-medium'>Career Counseling & Roadmaps</p>
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
						<Sparkles size={18} className='text-amber-400' />
						<span className='text-xs font-medium text-amber-400 uppercase tracking-wider'>
							मध्य प्रदेश के छात्रों के लिए
						</span>
					</div>
					<h2 className='text-2xl font-bold leading-tight'>
						कक्षा 10वीं के बाद
						<br />
						<span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
							अपना करियर चुनें
						</span>
					</h2>
					<p className='text-sm text-white/50 mt-2 leading-relaxed'>
						हर profession का complete roadmap — 10वीं से लेकर नौकरी तक। AI assistant से पूछें कोई भी सवाल।
					</p>
				</motion.div>
			</div>

			{/* Career Cards Grid */}
			<div className='px-4 pb-8'>
				<div className='grid grid-cols-2 gap-3'>
					{careerOrder.map((key, index) => {
						const career = careers[key];
						return (
							<motion.div
								key={career.id}
								initial={{ opacity: 0, y: 30, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									duration: 0.4,
									delay: index * 0.07,
									ease: 'easeOut',
								}}
								whileTap={{ scale: 0.96 }}
								onClick={() => router.push(`/education/${career.id}`)}
								className='group relative cursor-pointer'>
								<div
									className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${career.cardBg} border border-white/10 p-4 h-[160px] flex flex-col justify-between transition-all duration-300 group-active:border-white/20`}>
									{/* Glow */}
									<div
										className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${career.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`}
									/>
									{/* Emoji */}
									<div className='text-3xl'>{career.emoji}</div>
									{/* Info */}
									<div>
										<h3 className='text-base font-bold text-white'>
											{career.title}
										</h3>
										<p className='text-[11px] text-white/40 font-medium mt-0.5'>
											{career.titleEn}
										</p>
									</div>
									{/* Steps indicator */}
									<div className='flex items-center gap-1 mt-1'>
										{career.milestones
											.slice(0, 5)
											.map((_, i) => (
												<div
													key={i}
													className={`h-1 rounded-full bg-gradient-to-r ${career.gradient}`}
													style={{
														width: `${100 / Math.min(career.milestones.length, 5)}%`,
														opacity: 0.3 + i * 0.15,
													}}
												/>
											))}
										{career.milestones.length > 5 && (
											<span className='text-[9px] text-white/30 ml-0.5'>
												+{career.milestones.length - 5}
											</span>
										)}
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>

			{/* Footer */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className='px-6 pb-10 text-center'>
				<p className='text-xs text-white/25'>
					प्रत्येक करियर में AI assistant उपलब्ध है आपके सवालों के लिए
				</p>
			</motion.div>
		</div>
	);
}
