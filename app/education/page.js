'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	GraduationCap,
	School,
	BookOpenCheck,
	ChevronRight,
} from 'lucide-react';

const sections = [
	{
		title: 'करियर मार्गदर्शन',
		tag: 'रोडमैप',
		icon: GraduationCap,
		href: '/education/career',
		gradient: 'from-sky-500 to-blue-600',
		ring: 'ring-sky-100',
	},
	{
		title: 'MP कॉलेज',
		tag: 'सूची',
		icon: School,
		href: '/education/colleges',
		gradient: 'from-violet-500 to-indigo-600',
		ring: 'ring-violet-100',
	},
	{
		title: 'प्रवेश परीक्षा',
		tag: 'तैयारी',
		icon: BookOpenCheck,
		href: '/education/entrance-exams',
		gradient: 'from-amber-500 to-orange-600',
		ring: 'ring-amber-100',
	},
];

export default function EducationPage() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-gradient-to-b from-slate-100 via-white to-sky-50/40 text-slate-800 pb-12'>
			<header className='sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={() => router.back()}
						className='w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center active:scale-95 transition-transform shadow-sm border border-slate-200/80'>
						<ArrowLeft size={18} />
					</button>
					<div>
						<h1 className='text-lg font-bold text-slate-900 tracking-tight'>शिक्षा</h1>
						<p className='text-[11px] text-slate-500 font-medium'>करियर · कॉलेज · परीक्षा</p>
					</div>
				</div>
			</header>

			<main className='max-w-lg mx-auto px-4 pt-8 pb-6'>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35 }}
					className='mb-8'>
					<p className='text-sm text-slate-500 font-medium'>मध्य प्रदेश</p>
					<h2 className='text-2xl font-bold text-slate-900 mt-1 tracking-tight'>
						अपना रास्ता चुनें
					</h2>
				</motion.div>

				<div className='space-y-3'>
					{sections.map((section, index) => {
						const SectionIcon = section.icon;
						return (
							<motion.button
								type='button'
								key={section.href}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.06 + index * 0.06,
									type: 'spring',
									stiffness: 260,
									damping: 22,
								}}
								whileTap={{ scale: 0.98 }}
								onClick={() => router.push(section.href)}
								className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm shadow-slate-200/50 text-left 
									hover:border-slate-300 hover:shadow-md transition-all ring-1 ${section.ring}`}>
								<div
									className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-md shrink-0`}>
									<SectionIcon className='w-6 h-6 text-white' strokeWidth={2.25} />
								</div>
								<div className='flex-1 min-w-0'>
									<p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'>
										{section.tag}
									</p>
									<p className='text-base font-bold text-slate-900 leading-snug'>
										{section.title}
									</p>
								</div>
								<ChevronRight className='w-5 h-5 text-slate-300 shrink-0' />
							</motion.button>
						);
					})}
				</div>
			</main>
		</div>
	);
}
