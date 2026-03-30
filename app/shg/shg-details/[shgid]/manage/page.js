'use client';

import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import {
	Users,
	IndianRupee,
	HandCoins,
	FileText,
	ChevronLeft,
	TrendingUp,
	ShieldCheck,
	LayoutDashboard,
	PiggyBank,
	ReceiptText,
	AlertCircle,
	ArrowUpRight,
} from 'lucide-react';

const sections = [
	{
		label: 'बचत',
		labelEn: 'Savings & Share',
		gradient: 'from-indigo-500 to-blue-600',
		lightBg: 'bg-indigo-50',
		lightText: 'text-indigo-600',
		icon: PiggyBank,
		actions: [
			{
				title: 'मासिक बचत',
				desc: 'एंट्री',
				icon: IndianRupee,
				href: 'monthly-entry',
				gradient: 'from-indigo-500 to-indigo-600',
				shadow: 'shadow-indigo-200',
			},
			{
				title: 'शेयर राशि',
				desc: 'जमा एंट्री',
				icon: FileText,
				href: 'lump-sum',
				gradient: 'from-pink-500 to-rose-600',
				shadow: 'shadow-pink-200',
			},
		],
	},
	{
		label: 'ऋण',
		labelEn: 'Loans',
		gradient: 'from-emerald-500 to-teal-600',
		lightBg: 'bg-emerald-50',
		lightText: 'text-emerald-600',
		icon: HandCoins,
		actions: [
			{
				title: 'ऋण दें',
				desc: 'वितरण',
				icon: HandCoins,
				href: 'loans',
				gradient: 'from-emerald-500 to-emerald-600',
				shadow: 'shadow-emerald-200',
			},
			{
				title: 'किस्त',
				desc: 'भुगतान',
				icon: FileText,
				href: 'repayment',
				gradient: 'from-orange-400 to-amber-500',
				shadow: 'shadow-orange-200',
			},
		],
	},
	{
		label: 'पेनल्टी & खर्चा',
		labelEn: 'Penalty & Expense',
		gradient: 'from-red-500 to-rose-600',
		lightBg: 'bg-red-50',
		lightText: 'text-red-600',
		icon: AlertCircle,
		actions: [
			{
				title: 'पेनल्टी',
				desc: 'एंट्री',
				icon: IndianRupee,
				href: 'penalty-entry',
				gradient: 'from-red-500 to-rose-600',
				shadow: 'shadow-red-200',
			},
			{
				title: 'खर्चा',
				desc: 'एंट्री',
				icon: ReceiptText,
				href: 'expenses',
				gradient: 'from-blue-500 to-indigo-600',
				shadow: 'shadow-blue-200',
			},
		],
	},
	{
		label: 'अन्य',
		labelEn: 'Management',
		gradient: 'from-violet-500 to-purple-600',
		lightBg: 'bg-violet-50',
		lightText: 'text-violet-600',
		icon: LayoutDashboard,
		actions: [
			{
				title: 'Member Link',
				desc: 'App Account',
				icon: Users,
				href: 'member-link',
				gradient: 'from-violet-500 to-violet-600',
				shadow: 'shadow-violet-200',
			},
			{
				title: 'Revert Entry',
				desc: 'Undo Txn',
				icon: ShieldCheck,
				href: 'revert-transactions',
				gradient: 'from-rose-500 to-rose-600',
				shadow: 'shadow-rose-200',
			},
			{
				title: 'रिपोर्ट',
				desc: 'विवरण',
				icon: TrendingUp,
				href: 'reports',
				gradient: 'from-sky-500 to-cyan-500',
				shadow: 'shadow-sky-200',
			},
		],
	},
];

export default function ShgManagerHome({ params }) {
	const { shgid } = params;
	const router = useRouter();

	let cardIndex = 0;

	return (
		<div className='min-h-screen overflow-x-hidden bg-[#f1f5fb] pb-24'>
			{/* Subtle background blobs */}
			<div className='fixed top-[-15%] left-[-15%] w-[55%] h-[45%] bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none' />
			<div className='fixed bottom-[-15%] right-[-15%] w-[55%] h-[45%] bg-violet-200/30 rounded-full blur-[100px] pointer-events-none' />

			{/* Header */}
			<div className='sticky top-0 z-20 backdrop-blur-md bg-white/50 border-b border-white/40 px-5 pt-7 pb-4'>
				<div className='max-w-xl mx-auto flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200'>
							<LayoutDashboard className='w-5 h-5 text-white' />
						</div>
						<div>
							<p className='text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase leading-none'>
								तमोहर
							</p>
							<h1 className='text-xl font-extrabold text-slate-900 tracking-tight leading-tight'>
								समूह{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
									प्रबंधन
								</span>
							</h1>
						</div>
					</div>
					<motion.button
						whileTap={{ scale: 0.85 }}
						onClick={() => router.back()}
						className='p-2.5 bg-white/80 backdrop-blur rounded-2xl shadow border border-white/60'>
						<ChevronLeft className='w-5 h-5 text-slate-600' />
					</motion.button>
				</div>
			</div>

			{/* Sections */}
			<main className='max-w-xl mx-auto px-4 pt-6 space-y-7'>
				{sections.map((section) => {
					const SectionIcon = section.icon;
					return (
						<div key={section.labelEn}>
							{/* Section label */}
							<div className='flex items-center gap-2.5 mb-3'>
								<div className={`w-7 h-7 rounded-xl ${section.lightBg} flex items-center justify-center shrink-0`}>
									<SectionIcon className={`w-4 h-4 ${section.lightText}`} />
								</div>
								<div>
									<p className={`text-sm font-black tracking-tight leading-none ${section.lightText}`}>
										{section.label}
									</p>
									<p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5'>
										{section.labelEn}
									</p>
								</div>
								<div className='flex-1 h-px bg-slate-200/80 ml-1' />
							</div>

							{/* Action cards */}
							<div className={`grid gap-3 ${section.actions.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
								{section.actions.map((a) => {
									const idx = cardIndex++;
									const ActionIcon = a.icon;
									return (
										<motion.button
											key={a.href}
											onClick={() =>
												router.push(`/shg/shg-details/${shgid}/manage/${a.href}`)
											}
											initial={{ opacity: 0, y: 16 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: idx * 0.04,
												type: 'spring',
												stiffness: 280,
												damping: 22,
											}}
											whileTap={{ scale: 0.94 }}
											className='group relative flex flex-col items-start bg-white rounded-3xl p-4 shadow-sm border border-slate-100/80 hover:shadow-md hover:-translate-y-0.5 transition-all text-left overflow-hidden'>

											{/* Subtle corner accent */}
											<div className={`absolute -top-4 -right-4 w-14 h-14 rounded-full bg-gradient-to-br ${a.gradient} opacity-[0.08] group-hover:opacity-[0.14] transition-opacity`} />

											{/* Icon */}
											<div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-md ${a.shadow} mb-3`}>
												<ActionIcon className='w-5 h-5 text-white' />
											</div>

											{/* Text */}
											<p className='text-[13px] font-black text-slate-800 leading-snug tracking-tight'>
												{a.title}
											</p>
											<p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5'>
												{a.desc}
											</p>

											{/* Arrow */}
											<div className='absolute bottom-3 right-3 opacity-30 group-hover:opacity-70 transition-opacity'>
												<ArrowUpRight className='w-3.5 h-3.5 text-slate-500' />
											</div>
										</motion.button>
									);
								})}
							</div>
						</div>
					);
				})}
			</main>
		</div>
	);
}
