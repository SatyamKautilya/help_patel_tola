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
	LayoutDashboard,
} from 'lucide-react';

const actions = [
	{
		title: 'सदस्य',
		desc: 'मैनेजमेंट',
		icon: Users,
		href: 'members',
		color: 'text-rose-600',
		bg: 'bg-rose-50',
		border: 'border-rose-200',
	},
	{
		title: 'बचत',
		desc: 'एंट्री',
		icon: IndianRupee,
		href: 'monthly-entry',
		color: 'text-indigo-600',
		bg: 'bg-indigo-50',
		border: 'border-indigo-200',
	},
	{
		title: 'ऋण दें',
		desc: 'वितरण',
		icon: HandCoins,
		href: 'loans',
		color: 'text-emerald-600',
		bg: 'bg-emerald-50',
		border: 'border-emerald-200',
	},
	{
		title: 'भुगतान',
		desc: 'किस्त',
		icon: FileText,
		href: 'repayment',
		color: 'text-orange-600',
		bg: 'bg-orange-50',
		border: 'border-orange-200',
	},
	{
		title: 'नियम',
		desc: 'सेटिंग्स',
		icon: Settings,
		href: 'settings',
		color: 'text-purple-600',
		bg: 'bg-purple-50',
		border: 'border-purple-200',
	},
	{
		title: 'रिपोर्ट',
		desc: 'विवरण',
		icon: TrendingUp,
		href: 'reports',
		color: 'text-sky-600',
		bg: 'bg-sky-50',
		border: 'border-sky-200',
	},
];

export default function ShgManagerHome({ params }) {
	const { shgId } = params;
	const router = useRouter();

	return (
		<div className='h-screen overflow-hidden bg-[#fafafa] relative flex flex-col'>
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
							Tamohar
						</h1>
						<span className='text-[10px] font-bold text-indigo-500 uppercase tracking-widest'>
							SHG Platform
						</span>
					</div>
				</div>

				<motion.button
					whileTap={{ scale: 0.8 }}
					onClick={() => router.back()}
					className='absolute  right-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white z-20'>
					<ChevronLeft className='w-5 h-5 text-slate-600' />
				</motion.button>
			</nav>

			<main className='relative z-10 flex-1 flex flex-col px-6 py-4 justify-between'>
				{/* Greeting & Subtitle */}
				<header>
					<h2 className='text-2xl font-black text-slate-900 tracking-tight leading-tight'>
						समूह <span className='text-indigo-600'>प्रबंधन</span>
					</h2>
					<p className='text-xs font-semibold text-slate-500'>
						ID: {shgId?.slice(-6).toUpperCase() || 'MASTER'}
					</p>
				</header>

				{/* Glassmorphism Financial Card (Light & Colorful) */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className='relative group'>
					<div className='absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]' />
					<div className='relative p-6 flex justify-between items-center'>
						<div className='space-y-1'>
							<p className='text-[10px] font-black text-indigo-400 uppercase tracking-widest'>
								कुल उपलब्ध कोष
							</p>
							<h3 className='text-4xl font-black text-slate-800 tracking-tighter'>
								₹45,280
							</h3>
						</div>
						<div className='flex flex-col items-center bg-indigo-600 px-4 py-3 rounded-3xl shadow-lg shadow-indigo-100'>
							<p className='text-[8px] font-bold text-indigo-100 uppercase'>
								इस माह
							</p>
							<p className='text-white font-black text-sm'>+₹2,400</p>
						</div>
					</div>
				</motion.div>

				{/* Grid Section - Optimized for height */}
				<div className='grid grid-cols-2 gap-3 h-full max-h-[52vh]'>
					{actions.map((a, i) => (
						<motion.button
							key={a.href}
							onClick={() =>
								router.push(`/shg/shg-details/${shgId}/manage/${a.href}`)
							}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.05 }}
							whileTap={{ scale: 0.95 }}
							className={`group relative flex flex-col justify-center bg-white/70 backdrop-blur-sm border-2 ${a.border} rounded-[2rem] p-4 text-left hover:bg-white transition-all overflow-hidden shadow-sm`}>
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
					))}
				</div>

				{/* Mini Footer */}
				<div className='flex justify-between items-center px-2 opacity-60'>
					<div className='flex items-center gap-2'>
						<div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
						<span className='text-[9px] font-black text-slate-400 uppercase tracking-widest'>
							Live Management
						</span>
					</div>
					<p className='text-[9px] font-black text-indigo-600 uppercase tracking-widest'>
						Version 2.6.0
					</p>
				</div>
			</main>

			{/* Back Button - Fixed Bottom Left */}
		</div>
	);
}
