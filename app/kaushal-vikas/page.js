'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';
import { kaushalSkillOrder, kaushalSkills } from './kaushalData';

export default function KaushalVikasPage() {
	const router = useRouter();

	return (
		<div className='relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-white to-amber-50/40 pb-16 text-slate-800'>
			<div
				className='pointer-events-none absolute inset-0 overflow-hidden'
				aria-hidden>
				<div className='absolute -right-[20%] -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-amber-300/45 to-orange-400/25 blur-3xl' />
				<div className='absolute bottom-[15%] -left-[10%] h-56 w-56 rounded-full bg-gradient-to-br from-sky-300/35 to-blue-400/20 blur-3xl' />
			</div>

			<header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl'>
				<div className='mx-auto flex max-w-lg items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={() => router.push('/')}
						className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-transform active:scale-95'>
						<ArrowLeft size={18} />
					</button>
					<div className='min-w-0'>
						<h1 className='text-lg font-bold tracking-tight text-slate-900'>
							कौशल विकास
						</h1>
					</div>
				</div>
			</header>

			<main className='relative mx-auto max-w-lg px-4 pb-8 pt-6'>
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}>
					<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-gradient-to-r from-amber-50 to-orange-50/80 px-3 py-1.5 shadow-sm ring-1 ring-white/80'>
						<Sparkles
							className='h-3.5 w-3.5 text-amber-600'
							strokeWidth={2.5}
						/>
						<span className='text-[11px] font-semibold text-amber-900/85'>
							हाथ का हुनर, रोजगार का सफर
						</span>
					</div>
					<h2 className='text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-[1.75rem]'>
						सीखें{' '}
						<span className='bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent'>
							कौशल
						</span>
					</h2>
					<p className='mt-3 max-w-[22rem] text-[15px] leading-relaxed text-slate-600'>
						कौशल चुनें — वीडियो, सामग्री और बाकी विवरण अंदर के पेज पर मिलेंगे।
					</p>
				</motion.div>

				<div className='flex flex-col gap-4'>
					{kaushalSkillOrder.map((key, index) => {
						const skill = kaushalSkills[key];
						return (
							<motion.button
								type='button'
								key={skill.id}
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.06 + index * 0.05,
									type: 'spring',
									stiffness: 280,
									damping: 24,
								}}
								whileTap={{ scale: 0.985 }}
								onClick={() => router.push(`/kaushal-vikas/${skill.id}`)}
								className={`group relative w-full overflow-hidden rounded-2xl border bg-gradient-to-br ${skill.cardBg} ${skill.cardBorder} p-4 text-left shadow-md shadow-slate-900/[0.04] ring-1 ring-white/70 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/[0.08]`}>
								<div
									className={`pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${skill.glow} blur-2xl`}
								/>
								<div className='relative flex items-center gap-4'>
									<div
										className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.gradient} text-2xl shadow-lg shadow-black/10 ring-2 ring-white/60`}>
										{skill.emoji}
									</div>
									<div className='min-w-0 flex-1'>
										<p className='text-[10px] font-semibold uppercase tracking-wider text-slate-500'>
											{skill.titleEn}
										</p>
										<h3 className='text-base font-bold text-slate-900'>
											{skill.title}
										</h3>
									</div>
									<span
										className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-400 shadow-sm transition-colors group-hover:border-slate-300 group-hover:text-slate-700`}>
										<ChevronRight className='h-5 w-5' />
									</span>
								</div>
							</motion.button>
						);
					})}
				</div>
			</main>
		</div>
	);
}
