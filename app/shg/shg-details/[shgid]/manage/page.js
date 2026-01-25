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
} from 'lucide-react';

const actions = [
	{
		title: 'सदस्य प्रबंधन',
		desc: 'नए सदस्य जोड़ें या हटाएं',
		icon: Users,
		href: 'members',
		color: 'text-rose-600',
		bg: 'bg-rose-50',
	},
	{
		title: 'मासिक बचत',
		desc: 'बचत और उपस्थिति',
		icon: IndianRupee,
		href: 'savings',
		color: 'text-indigo-600',
		bg: 'bg-indigo-50',
	},
	{
		title: 'सदस्य ऋण',
		desc: 'ऋण स्वीकृति और वितरण',
		icon: HandCoins,
		href: 'loans',
		color: 'text-emerald-600',
		bg: 'bg-emerald-50',
	},
	{
		title: 'ऋण भुगतान',
		desc: 'किस्त और ब्याज दर्ज करें',
		icon: FileText,
		href: 'repayment',
		color: 'text-amber-600',
		bg: 'bg-amber-50',
	},
	{
		title: 'SHG नियम',
		desc: 'ब्याज दर और दंड अपडेट',
		icon: Settings,
		href: 'settings',
		color: 'text-purple-600',
		bg: 'bg-purple-50',
	},
];

export default function ShgManagerHome({ params }) {
	const { shgId } = params;
	const router = useRouter();

	return (
		<div className='min-h-screen bg-[#FDFEFF] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-100 via-white to-blue-50 pb-12'>
			{/* Minimal Header */}
			<div className='px-6 pt-8 flex items-center justify-between max-w-2xl mx-auto'>
				<button
					onClick={() => router.back()}
					className='p-2 bg-white rounded-xl shadow-sm border border-slate-100'>
					<ChevronLeft className='w-6 h-6 text-slate-600' />
				</button>
				<div className='flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100'>
					<ShieldCheck className='w-4 h-4 text-emerald-600' />
					<span className='text-[10px] font-bold text-emerald-700 uppercase tracking-wider'>
						अध्यक्ष एक्सेस
					</span>
				</div>
			</div>

			<main className='max-w-2xl mx-auto p-6'>
				{/* Title Section */}
				<header className='mb-8'>
					<h1 className='text-3xl font-black text-slate-900 tracking-tight'>
						समूह <span className='text-indigo-600'>प्रबंधन</span>
					</h1>
					<p className='text-slate-500 font-medium mt-1'>
						मैनेजमेंट डैशबोर्ड में आपका स्वागत है
					</p>
				</header>

				{/* Quick Financial Summary Card */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className='bg-slate-900 rounded-[2.5rem] p-8 mb-10 relative overflow-hidden shadow-2xl shadow-slate-200'>
					<div className='relative z-10'>
						<div className='flex items-center gap-2 text-slate-400 mb-2'>
							<TrendingUp className='w-4 h-4' />
							<span className='text-xs font-bold uppercase tracking-widest'>
								कुल उपलब्ध कोष
							</span>
						</div>
						<h2 className='text-4xl font-black text-white'>₹45,280</h2>
						<div className='mt-6 flex gap-4'>
							<div className='px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-md'>
								<p className='text-[10px] text-slate-400 font-bold uppercase'>
									इस महीने
								</p>
								<p className='text-white font-bold text-sm'>+ ₹2,400</p>
							</div>
						</div>
					</div>
					{/* Decorative Background Elements */}
					<div className='absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl' />
					<div className='absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl' />
				</motion.div>

				{/* Actions Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{actions.map((a, i) => (
						<motion.button
							key={a.href}
							onClick={() => router.push(`/shg/${shgId}/manage/${a.href}`)}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.05 }}
							whileHover={{ y: -5 }}
							whileTap={{ scale: 0.97 }}
							className='group relative flex flex-col bg-white border border-slate-100 rounded-[2rem] p-6 text-left shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all overflow-hidden'>
							{/* Visual Background Decoration */}
							<div
								className={`absolute -right-4 -top-4 w-20 h-20 ${a.bg} opacity-30 rounded-full group-hover:scale-150 transition-transform duration-500`}
							/>

							<div
								className={`w-14 h-14 rounded-2xl ${a.bg} flex items-center justify-center ${a.color} mb-6 transition-colors`}>
								<a.icon className='w-7 h-7' />
							</div>

							<div className='mt-auto'>
								<h3 className='text-xl font-bold text-slate-800 tracking-tight'>
									{a.title}
								</h3>
								<p className='text-sm font-medium text-slate-500 mt-1 leading-snug'>
									{a.desc}
								</p>
							</div>

							<div
								className={`mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-tighter ${a.color}`}>
								शुरू करें{' '}
								<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
							</div>
						</motion.button>
					))}
				</div>
			</main>
		</div>
	);
}
