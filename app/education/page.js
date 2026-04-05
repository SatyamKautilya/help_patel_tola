'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	GraduationCap,
	School,
	BookOpenCheck,
	ChevronRight,
	Sparkles,
} from 'lucide-react';

const sections = [
	{
		title: 'करियर मार्गदर्शन',
		tag: 'रोडमैप',
		description: '10वीं से नौकरी तक — चरण, टिप्स और AI से सवाल',
		icon: GraduationCap,
		href: '/education/career',
		gradient: 'from-sky-500 to-blue-600',
		cardBg: 'from-sky-50/90 via-white to-blue-50/70',
		cardBorder: 'border-sky-200/75',
		glow: 'from-sky-400/25 to-blue-500/20',
	},
	{
		title: 'MP कॉलेज',
		tag: 'डायरेक्टरी',
		description: 'ज़िला और प्रकार के हिसाब से कॉलेज खोजें',
		icon: School,
		href: '/education/colleges',
		gradient: 'from-violet-500 to-indigo-600',
		cardBg: 'from-violet-50/90 via-white to-indigo-50/70',
		cardBorder: 'border-violet-200/75',
		glow: 'from-violet-400/25 to-indigo-500/20',
	},
	{
		title: 'प्रवेश परीक्षा',
		tag: 'तैयारी',
		description: 'NEET, JEE, CUET जैसी परीक्षाओं की जानकारी',
		icon: BookOpenCheck,
		href: '/education/entrance-exams',
		upcoming: true,
		gradient: 'from-amber-500 to-orange-600',
		cardBg: 'from-amber-50/90 via-white to-orange-50/70',
		cardBorder: 'border-amber-200/75',
		glow: 'from-amber-400/25 to-orange-500/20',
	},
];

export default function EducationPage() {
	const router = useRouter();

	return (
		<div className='relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-white to-sky-50/50 text-slate-800 pb-14'>
			{/* Background decoration */}
			<div
				className='pointer-events-none absolute inset-0 overflow-hidden'
				aria-hidden>
				<div className='absolute -top-24 right-[-20%] h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/40 to-blue-400/25 blur-3xl' />
				<div className='absolute top-[28%] -left-[15%] h-64 w-64 rounded-full bg-gradient-to-br from-violet-300/30 to-indigo-400/20 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-48 w-[120%] bg-gradient-to-t from-sky-100/60 to-transparent' />
			</div>

			<header className='sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl'>
				<div className='mx-auto flex max-w-lg items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={() => router.back()}
						className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-transform active:scale-95'>
						<ArrowLeft size={18} />
					</button>
					<div className='min-w-0'>
						<h1 className='text-lg font-bold tracking-tight text-slate-900'>
							शिक्षा
						</h1>
						<p className='text-[11px] font-medium text-slate-500'>
							मध्य प्रदेश · एक ही जगह
						</p>
					</div>
				</div>
			</header>

			<main className='relative mx-auto max-w-lg px-4 pb-8 pt-6'>
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className='relative mb-10'>
					<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-50/90 to-orange-50/60 px-3 py-1.5 shadow-sm ring-1 ring-white/80'>
						<Sparkles
							className='h-3.5 w-3.5 text-amber-600'
							strokeWidth={2.5}
						/>
						<span className='text-[11px] font-semibold text-amber-900/80'>
							गाइड · MP फोकस
						</span>
					</div>
					<h2 className='text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-[1.75rem]'>
						सही{' '}
						<span className='bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'>
							शिक्षा
						</span>{' '}
						और करियर की दिशा
					</h2>
					<p className='mt-3 max-w-[22rem] text-[15px] leading-relaxed text-slate-600'>
						करियर रोडमैप, राज्य के कॉलेज और प्रवेश परीक्षाएँ — तीन
						रास्ते, एक साफ़ अनुभव।
					</p>
					<div className='mt-5 flex flex-wrap gap-2'>
						{['करियर', 'कॉलेज', 'परीक्षा'].map((chip, i) => (
							<span
								key={chip}
								className='rounded-lg border border-slate-200/90 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-sm'>
								{i + 1}. {chip}
							</span>
						))}
					</div>
				</motion.div>

				<p className='mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400'>
					शुरू करें
				</p>
				<div className='flex flex-col gap-4'>
					{sections.map((section, index) => {
						const SectionIcon = section.icon;
						return (
							<motion.button
								type='button'
								key={section.href}
								disabled={section.upcoming}
								initial={{ opacity: 0, y: 22 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.08 + index * 0.07,
									type: 'spring',
									stiffness: 280,
									damping: 24,
								}}
								whileTap={!section.upcoming ? { scale: 0.985 } : undefined}
								onClick={() => {
									if (!section.upcoming) router.push(section.href);
								}}
								className={`group relative w-full overflow-hidden rounded-2xl border bg-gradient-to-br ${section.cardBg} ${section.cardBorder} p-4 text-left ring-1 ring-white/70 transition-all duration-300 ${
									section.upcoming 
										? 'opacity-70 grayscale-[0.25] cursor-not-allowed shadow-sm shadow-slate-900/[0.02]' 
										: 'hover:shadow-lg hover:shadow-slate-900/[0.07] shadow-md shadow-slate-900/[0.04]'
								}`}>
								<div
									className={`pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${section.glow} blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
								/>
								<div
									className={`pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${section.gradient} opacity-[0.35]`}
								/>
								<div className='relative flex gap-4'>
									<div
										className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} shadow-lg shadow-black/10 ring-2 ring-white/50`}>
										<SectionIcon
											className='h-7 w-7 text-white'
											strokeWidth={2.25}
										/>
									</div>
									<div className='min-w-0 flex-1 pt-0.5'>
										<div className='flex items-center gap-2'>
											<span
												className={`inline-flex rounded-md bg-gradient-to-r ${section.gradient} px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm`}>
												{section.tag}
											</span>
											<span className='text-[10px] font-medium text-slate-400'>
												0{index + 1}
											</span>
										</div>
										<p className='mt-1.5 text-base font-bold leading-snug text-slate-900'>
											{section.title}
										</p>
										<p className='mt-1 text-[13px] leading-relaxed text-slate-600'>
											{section.description}
										</p>
									</div>
									<div className='flex shrink-0 flex-col items-center justify-center self-center pl-2'>
										{section.upcoming ? (
											<span className='inline-flex items-center rounded-lg border border-slate-200/90 bg-white/80 px-2.5 py-1 text-[10px] font-bold tracking-tight text-slate-500 shadow-sm'>
												Coming Soon
											</span>
										) : (
											<span
												className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-400 shadow-sm transition-all duration-300 group-hover:border-slate-300 group-hover:text-slate-700`}>
												<ChevronRight className='h-5 w-5' />
											</span>
										)}
									</div>
								</div>
							</motion.button>
						);
					})}
				</div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.55 }}
					className='mt-10 text-center text-[11px] leading-relaxed text-slate-400'>
					जानकारी मार्गदर्शन के लिए है। आधिकारिक नियमों के लिए संस्था की
					वेबसाइट देखें।
				</motion.p>
			</main>
		</div>
	);
}
