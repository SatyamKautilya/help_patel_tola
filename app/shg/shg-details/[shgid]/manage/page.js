'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	Users,
	IndianRupee,
	HandCoins,
	FileText,
	ArrowRight,
	ChevronLeft,
	TrendingUp,
	ShieldCheck,
	LayoutDashboard,
	Lock,
	PiggyBank,
	ReceiptText,
	AlertCircle,
} from 'lucide-react';
import { useSelector } from 'react-redux';

const sections = [
	{
		label: 'बचत',
		labelEn: 'Monthly Saving & Lumpsum',
		accentColor: 'text-indigo-700',
		accentBg: 'bg-indigo-50',
		accentBorder: 'border-indigo-200',
		icon: PiggyBank,
		actions: [
			{
				title: 'बचत',
				desc: 'एंट्री',
				icon: IndianRupee,
				href: 'monthly-entry',
				color: 'text-indigo-600',
				bg: 'bg-indigo-50',
				border: 'border-indigo-200',
				upcoming: false,
			},
			{
				title: 'एक-मुश्त जमा',
				desc: 'एंट्री',
				icon: FileText,
				href: 'lump-sum',
				color: 'text-pink-700',
				bg: 'bg-pink-50',
				border: 'border-pink-200',
				upcoming: false,
			},
		],
	},
	{
		label: 'ऋण',
		labelEn: 'Loans',
		accentColor: 'text-emerald-700',
		accentBg: 'bg-emerald-50',
		accentBorder: 'border-emerald-200',
		icon: HandCoins,
		actions: [
			{
				title: 'ऋण दें',
				desc: 'वितरण',
				icon: HandCoins,
				href: 'loans',
				color: 'text-emerald-600',
				bg: 'bg-emerald-50',
				border: 'border-emerald-200',
				upcoming: false,
			},
			{
				title: 'भुगतान',
				desc: 'किस्त',
				icon: FileText,
				href: 'repayment',
				color: 'text-orange-600',
				bg: 'bg-orange-50',
				border: 'border-orange-200',
				upcoming: false,
			},
		],
	},
	{
		label: 'पेनल्टी & खर्चा',
		labelEn: 'Penalty & Expense',
		accentColor: 'text-red-700',
		accentBg: 'bg-red-50',
		accentBorder: 'border-red-200',
		icon: AlertCircle,
		actions: [
			{
				title: 'पेनल्टी',
				desc: 'एंट्री',
				icon: IndianRupee,
				href: 'penalty-entry',
				color: 'text-red-600',
				bg: 'bg-red-50',
				border: 'border-red-200',
				upcoming: false,
			},
			{
				title: 'खर्चा',
				desc: 'एंट्री',
				icon: ReceiptText,
				href: 'expenses',
				color: 'text-blue-700',
				bg: 'bg-blue-50',
				border: 'border-blue-200',
				upcoming: false,
			},
		],
	},
	{
		label: 'अन्य प्रबंधन',
		labelEn: 'Other Management',
		accentColor: 'text-violet-700',
		accentBg: 'bg-violet-50',
		accentBorder: 'border-violet-200',
		icon: LayoutDashboard,
		actions: [
			{
				title: 'Member Link',
				desc: 'App Account',
				icon: Users,
				href: 'member-link',
				color: 'text-violet-700',
				bg: 'bg-violet-50',
				border: 'border-violet-200',
				upcoming: false,
			},
			{
				title: 'Revert Txn',
				desc: 'Undo Entry',
				icon: ShieldCheck,
				href: 'revert-transactions',
				color: 'text-rose-700',
				bg: 'bg-rose-50',
				border: 'border-rose-200',
				upcoming: false,
			},
			{
				title: 'रिपोर्ट',
				desc: 'विवरण',
				icon: TrendingUp,
				href: 'reports',
				color: 'text-sky-600',
				bg: 'bg-sky-50',
				border: 'border-sky-200',
				upcoming: false,
			},
		],
	},
];

export default function ShgManagerHome({ params }) {
	const { shgid } = params;
	const router = useRouter();
	const thisUser = useSelector((state) => state.appContext.user);

	let cardIndex = 0;

	return (
		<div className='h-screen overflow-y-auto bg-[#fafafa] relative flex flex-col'>
			{/* Background Decorative Gradients */}
			<div className='absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-pink-200/40 rounded-full blur-[80px]' />
			<div className='absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-sky-200/40 rounded-full blur-[80px]' />
			<div className='absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-indigo-200/30 rounded-full blur-[80px]' />

			{/* Header Section */}
			<nav className='relative z-10 px-6 pt-6 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200'>
						<LayoutDashboard className='w-6 h-6 text-white' />
					</div>
					<div>
						<h1 className='text-xl font-black text-slate-800 tracking-tighter leading-none'>
							तमोहर
						</h1>
						<span className='text-[10px] font-bold text-indigo-500 uppercase tracking-widest'>
							<h2 className='text-md font-black text-slate-900 tracking-tight leading-tight'>
								समूह <span className='text-indigo-600'>प्रबंधन</span>
							</h2>
						</span>
					</div>
				</div>

				<motion.button
					whileTap={{ scale: 0.8 }}
					onClick={() => router.back()}
					className='absolute right-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white z-20'>
					<ChevronLeft className='w-5 h-5 text-slate-600' />
				</motion.button>
			</nav>

			<main className='relative z-10 flex-1 flex flex-col px-6 py-4 gap-6 mb-16'>
				{sections.map((section) => {
					const SectionIcon = section.icon;
					return (
						<div key={section.labelEn}>
							{/* Section Header */}
							<div className='flex items-center gap-2 mb-3'>
								<div
									className={`w-7 h-7 rounded-xl ${section.accentBg} flex items-center justify-center`}>
									<SectionIcon className={`w-4 h-4 ${section.accentColor}`} />
								</div>
								<div>
									<h3
										className={`text-sm font-black tracking-tight ${section.accentColor}`}>
										{section.label}
									</h3>
									<p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none'>
										{section.labelEn}
									</p>
								</div>
								<div
									className={`flex-1 h-px ml-1 ${section.accentBg} border-t ${section.accentBorder}`}
								/>
							</div>

							{/* Cards Grid */}
							<div className='grid grid-cols-2 gap-4'>
								{section.actions.map((a) => {
									const idx = cardIndex++;
									return (
										<motion.button
											key={a.href}
											onClick={() =>
												!a.upcoming &&
												router.push(
													`/shg/shg-details/${shgid}/manage/${a.href}`,
												)
											}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.05 }}
											whileTap={{ scale: a.upcoming ? 1 : 0.95 }}
											disabled={a.upcoming}
											className={`group relative flex flex-col justify-center bg-white/70 backdrop-blur-sm border-2 ${a.border} rounded-[2rem] p-4 text-left hover:bg-white transition-all overflow-hidden shadow-sm ${a.upcoming ? 'opacity-50 bg-gray-300/50 cursor-not-allowed' : ''}`}>
											{a.upcoming && (
												<div className='absolute top-3 right-3 p-1.5 bg-slate-200 rounded-lg'>
													<Lock className='w-4 h-4 text-red-600' />
												</div>
											)}
											<div
												className={`w-11 h-11 rounded-2xl ${a.bg} flex items-center justify-center ${a.color} mb-3 shadow-sm`}>
												<a.icon className='w-6 h-6' />
											</div>
											<div>
												<h3 className='text-sm font-bold text-slate-800 tracking-tight leading-none'>
													{a.title}
												</h3>
												<p className='text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter'>
													{a.desc}
												</p>
											</div>
											<div
												className={`absolute right-4 bottom-4 p-1 rounded-lg ${a.bg}`}>
												<ArrowRight className={`w-3 h-3 ${a.color}`} />
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
