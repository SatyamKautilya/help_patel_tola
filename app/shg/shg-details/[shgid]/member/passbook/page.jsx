'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	Users,
	IndianRupee,
	HandCoins,
	FileText,
	Settings,
	ArrowRight,
	ChevronLeft,
	TrendingUp,
	ShieldCheck,
	Calendar,
	ArrowUpRight,
} from 'lucide-react';

const actions = [
	{
		title: 'सदस्य प्रबंधन',
		desc: 'नए सदस्य जोड़ें या विवरण बदलें',
		icon: Users,
		href: 'members',
		color: 'text-rose-600',
		bg: 'bg-rose-50',
		border: 'border-rose-100',
	},
	{
		title: 'मासिक बचत',
		desc: 'बचत और उपस्थिति दर्ज करें',
		icon: IndianRupee,
		href: 'savings',
		color: 'text-indigo-600',
		bg: 'bg-indigo-50',
		border: 'border-indigo-100',
	},
	{
		title: 'सदस्य ऋण',
		desc: 'ऋण स्वीकृति और वितरण',
		icon: HandCoins,
		href: 'loans',
		color: 'text-emerald-600',
		bg: 'bg-emerald-50',
		border: 'border-emerald-100',
	},
	{
		title: 'ऋण भुगतान',
		desc: 'किस्त और ब्याज जमा करें',
		icon: FileText,
		href: 'repayment',
		color: 'text-amber-600',
		bg: 'bg-amber-50',
		border: 'border-amber-100',
	},
	{
		title: 'SHG नियम',
		desc: 'ब्याज और दंड सेटिंग्स',
		icon: Settings,
		href: 'settings',
		color: 'text-purple-600',
		bg: 'bg-purple-50',
		border: 'border-purple-100',
	},
];

export default function ShgManagerHome({ params }) {
	const { shgId } = params;
	const router = useRouter();

	return (
		<div className='min-h-screen bg-[#F8FAFC] pb-20'>
			{/* Glassmorphic Top Nav */}
			<nav className='sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-slate-200/50 px-6 py-4'>
				<div className='max-w-2xl mx-auto flex items-center justify-between'>
					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={() => router.back()}
						className='p-2 hover:bg-slate-100 rounded-xl transition-colors'>
						<ChevronLeft className='w-6 h-6 text-slate-600' />
					</motion.button>

					<div className='flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-2xl shadow-lg shadow-slate-200'>
						<ShieldCheck className='w-4 h-4 text-emerald-400' />
						<span className='text-[11px] font-black text-white uppercase tracking-widest'>
							Admin Panel
						</span>
					</div>
				</div>
			</nav>

			<main className='max-w-2xl mx-auto p-6'>
				{/* Header Section */}
				<header className='mb-8 flex justify-between items-end'>
					<div>
						<div className='flex items-center gap-2 text-indigo-600 mb-1'>
							<Calendar className='w-4 h-4' />
							<span className='text-xs font-bold uppercase tracking-tight'>
								जनवरी 2026
							</span>
						</div>
						<h1 className='text-3xl font-black text-slate-900 tracking-tighter'>
							समूह{' '}
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
								प्रबंधन
							</span>
						</h1>
					</div>
					<div className='text-right'>
						<p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none'>
							ID: {shgId?.slice(-6) || 'N/A'}
						</p>
					</div>
				</header>

				{/* Refined Financial Summary Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='relative group mb-10'>
					<div className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-700 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity' />
					<div className='relative bg-slate-950 rounded-[2.5rem] p-8 overflow-hidden'>
						<div className='flex justify-between items-start mb-8'>
							<div>
								<p className='text-slate-400 text-xs font-bold uppercase tracking-widest mb-1'>
									कुल उपलब्ध कोष
								</p>
								<h2 className='text-5xl font-black text-white tracking-tighter'>
									₹45,280
								</h2>
							</div>
							<div className='bg-white/10 p-3 rounded-2xl backdrop-blur-md'>
								<TrendingUp className='w-6 h-6 text-emerald-400' />
							</div>
						</div>

						<div className='grid grid-cols-2 gap-3'>
							<div className='bg-white/5 border border-white/10 p-4 rounded-3xl'>
								<p className='text-[10px] text-slate-500 font-bold uppercase mb-1'>
									इस माह की बचत
								</p>
								<p className='text-white font-bold text-lg'>₹2,400</p>
							</div>
							<div className='bg-white/5 border border-white/10 p-4 rounded-3xl'>
								<p className='text-[10px] text-slate-500 font-bold uppercase mb-1'>
									बकाया ऋण
								</p>
								<p className='text-white font-bold text-lg'>₹12,800</p>
							</div>
						</div>

						{/* Abstract Background Shapes */}
						<div className='absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[60px]' />
						<div className='absolute bottom-0 left-0 w-24 h-24 bg-violet-500/20 rounded-full blur-[50px]' />
					</div>
				</motion.div>

				{/* Command Center Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
					{actions.map((a, i) => (
						<motion.button
							key={a.href}
							onClick={() => router.push(`/shg/${shgId}/manage/${a.href}`)}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: i * 0.05 }}
							whileHover={{ y: -8, scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='group relative flex flex-col bg-white border border-slate-200 rounded-[2.2rem] p-6 text-left shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all'>
							{/* Icon & Action Arrow */}
							<div className='flex justify-between items-start mb-6'>
								<div
									className={`w-14 h-14 rounded-2xl ${a.bg} flex items-center justify-center ${a.color} shadow-inner`}>
									<a.icon className='w-7 h-7' />
								</div>
								<div className='p-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300'>
									<ArrowUpRight className={`w-5 h-5 ${a.color}`} />
								</div>
							</div>

							{/* Text Content */}
							<div>
								<h3 className='text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors'>
									{a.title}
								</h3>
								<p className='text-sm font-medium text-slate-500 mt-1 leading-relaxed'>
									{a.desc}
								</p>
							</div>

							{/* Bottom Label */}
							<div
								className={`mt-6 w-fit px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${a.border} ${a.bg} ${a.color}`}>
								Manage
							</div>
						</motion.button>
					))}
				</div>
			</main>
		</div>
	);
}
