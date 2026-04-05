'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { careers, careerOrder } from '../careerData';

export default function CareerPage() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-gradient-to-b from-slate-100 via-white to-sky-50/30 text-slate-800 pb-16'>
			<div className='sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={() => router.push('/education')}
						className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center justify-center active:scale-90 transition-transform shadow-sm'>
						<ArrowLeft size={18} />
					</button>
					<div>
						<h1 className='text-lg font-bold leading-tight text-slate-900'>करियर मार्गदर्शन</h1>
						<p className='text-[11px] text-slate-500 font-medium'>10वीं के बाद रोडमैप</p>
					</div>
				</div>
			</div>

			<div className='px-5 pt-6 pb-3'>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}>
					<div className='flex items-center gap-2 mb-2'>
						<Sparkles size={16} className='text-amber-500' />
						<span className='text-xs font-medium text-slate-500'>मध्य प्रदेश</span>
					</div>
					<h2 className='text-xl font-bold leading-snug text-slate-900'>
						करियर चुनें
					</h2>
				</motion.div>
			</div>

			<div className='px-4 pb-8'>
				<div className='grid grid-cols-2 gap-3'>
					{careerOrder.map((key, index) => {
						const career = careers[key];
						return (
							<motion.div
								key={career.id}
								initial={{ opacity: 0, y: 20, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									duration: 0.35,
									delay: index * 0.05,
									ease: 'easeOut',
								}}
								whileTap={{ scale: 0.96 }}
								onClick={() => router.push(`/education/${career.id}`)}
								className='group relative cursor-pointer'>
								<div
									className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${career.cardBg} border ${career.cardBorder ?? 'border-slate-200/90'} shadow-sm ring-1 ring-white/60 p-4 h-[152px] flex flex-col justify-between transition-all duration-300 group-active:border-slate-300/90 group-hover:shadow-md`}>
									<div
										className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${career.gradient} opacity-[0.22] blur-2xl group-hover:opacity-[0.32] transition-opacity`}
									/>
									<div className='text-3xl relative z-[1]'>{career.emoji}</div>
									<div className='relative z-[1]'>
										<h3 className='text-[15px] font-bold text-slate-900 leading-tight'>
											{career.title}
										</h3>
									</div>
									<div className='flex items-center gap-1 mt-1 relative z-[1]'>
										{career.milestones.slice(0, 5).map((_, i) => (
											<div
												key={i}
												className={`h-1 rounded-full bg-gradient-to-r ${career.gradient}`}
												style={{
													width: `${100 / Math.min(career.milestones.length, 5)}%`,
													opacity: 0.35 + i * 0.12,
												}}
											/>
										))}
										{career.milestones.length > 5 && (
											<span className='text-[9px] text-slate-400 ml-0.5'>
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

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className='px-6 pb-8 text-center text-[11px] text-slate-400'>
				हर करियर में AI सहायता
			</motion.p>
		</div>
	);
}
