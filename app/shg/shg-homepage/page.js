'use client';

import { useEffect, useState } from 'react';
import {
	Users,
	MapPin,
	ChevronLeft,
	BookOpen,
	Settings2,
	Users2,
	LayoutDashboard,
	CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import mongoose from 'mongoose';

export const MemberRole = Object.freeze({
	PRESIDENT: 'अध्यक्ष',
	SECRETARY: 'सचिव',
	TREASURER: 'कोषाध्यक्ष',
	MEMBER: 'सदस्य',
});

const ROLE_CONFIG = {
	PRESIDENT: {
		gradient: 'from-blue-600 to-indigo-700',
		badge: 'bg-blue-500/20 text-blue-100 border-blue-400/30',
		dot: 'bg-blue-300',
		icon: 'bg-blue-500/30',
	},
	SECRETARY: {
		gradient: 'from-purple-600 to-violet-700',
		badge: 'bg-purple-500/20 text-purple-100 border-purple-400/30',
		dot: 'bg-purple-300',
		icon: 'bg-purple-500/30',
	},
	TREASURER: {
		gradient: 'from-emerald-600 to-teal-700',
		badge: 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30',
		dot: 'bg-emerald-300',
		icon: 'bg-emerald-500/30',
	},
	MEMBER: {
		gradient: 'from-slate-700 to-indigo-800',
		badge: 'bg-white/10 text-slate-100 border-white/20',
		dot: 'bg-slate-300',
		icon: 'bg-white/20',
	},
};

const getRoleConfig = (role) => ROLE_CONFIG[role] || ROLE_CONFIG.MEMBER;

export default function UserHomePage() {
	const [shgs, setShgs] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	// const user_id = new mongoose.Types.ObjectId(
	// 	'6970954eaadbfedf49fb4d69',
	// );

	const thisUser = useSelector((state) => state.appContext.user);
	const user_id = thisUser._id;
	const getShgByUserId = async () => {
		const data = await fetch('/api/shg?name=get-shg-by-user-id', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: user_id }),
		});
		return data.json();
	};

	useEffect(() => {
		const load = async () => {
			try {
				const data = await getShgByUserId();
				setShgs(data);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	return (
		<div className='min-h-screen bg-[#f0f4ff] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-rose-50 pb-24'>
			{/* Header */}
			<div className='sticky top-0 z-20 px-6 pt-8 pb-4 backdrop-blur-md bg-white/40 border-b border-white/30'>
				<div className='flex items-center justify-between max-w-xl mx-auto'>
					<div>
						<p className='text-[10px] font-black tracking-[0.2em] text-indigo-500 uppercase'>
							तमोहर
						</p>
						<h1 className='text-2xl font-extrabold text-slate-900 tracking-tight'>
							मेरे{' '}
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
								समूह
							</span>
						</h1>
					</div>
					<motion.button
						whileTap={{ scale: 0.85 }}
						onClick={() => router.back()}
						className='p-3 bg-white/80 backdrop-blur rounded-2xl shadow border border-white/60'>
						<ChevronLeft className='w-5 h-5 text-slate-600' />
					</motion.button>
				</div>
			</div>

			<main className='max-w-xl mx-auto px-4 pt-6'>
				{!loading && shgs.length > 0 && (
					<p className='text-xs text-slate-500 mb-5 font-semibold tracking-wide uppercase'>
						{shgs.length} सक्रिय समूह
					</p>
				)}

				<div className='flex flex-col gap-5'>
					<AnimatePresence>
						{loading ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className='flex flex-col items-center justify-center py-20 gap-4'>
								<motion.div
									animate={{ rotate: 360 }}
									transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
									className='w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full'
								/>
								<p className='text-slate-500 font-semibold text-sm'>
									आपके समूह लोड हो रहे हैं...
								</p>
							</motion.div>
						) : (
							shgs.map((shg, index) => {
								const cfg = getRoleConfig(shg.role);
								const isAdmin = ['PRESIDENT', 'SECRETARY', 'TREASURER'].includes(shg.role);

								return (
									<motion.div
										key={shg.shgId}
										initial={{ opacity: 0, y: 24 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
										className='rounded-3xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(0,0,0,0.14)] border border-white/60'>

										{/* Banner */}
										<div className={`relative bg-gradient-to-br ${cfg.gradient} px-5 pt-5 pb-6 overflow-hidden`}>
											<div className='absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none' />
											<div className='absolute top-4 right-10 w-12 h-12 rounded-full bg-white/5 pointer-events-none' />

											<div className='relative z-10 flex items-start justify-between'>
												<div className='flex items-center gap-3'>
													<div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cfg.icon} shrink-0`}>
														<Users2 className='w-6 h-6 text-white' />
													</div>
													<div>
														<h2 className='text-[17px] font-black text-white leading-snug tracking-tight'>
															{shg.name}
														</h2>
														<div className='flex items-center gap-1 mt-0.5'>
															<MapPin className='w-3 h-3 text-white/60' />
															<span className='text-[11px] font-semibold text-white/70 uppercase tracking-wider'>
																{shg.village}
															</span>
														</div>
													</div>
												</div>

												<div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[10px] font-black uppercase tracking-wider shrink-0 ${cfg.badge}`}>
													<div className={`w-1.5 h-1.5 rounded-full animate-pulse ${cfg.dot}`} />
													{MemberRole[shg.role]}
												</div>
											</div>

											<div className='relative z-10 flex items-center gap-1.5 mt-4'>
												<CheckCircle2 className='w-3.5 h-3.5 text-emerald-300' />
												<span className='text-[11px] font-bold text-emerald-200 tracking-wide'>
													सक्रिय समूह
												</span>
											</div>
										</div>

										{/* Body */}
										<div className='bg-white px-4 pt-4 pb-5 space-y-2.5'>
											<div className='grid grid-cols-2 gap-2.5'>
												<motion.button
													whileTap={{ scale: 0.95 }}
													onClick={() => router.push(`/shg/shg-details/${shg.shgId}/dashboard`)}
													className='flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-wider shadow-sm shadow-indigo-200 hover:shadow-indigo-300 transition-shadow'>
													<LayoutDashboard className='w-4 h-4' />
													डैशबोर्ड
												</motion.button>
												<motion.button
													whileTap={{ scale: 0.95 }}
													onClick={() =>
														router.push(`/shg/shg-details/${shg.shgId}/member/${shg.memberId}/passbook`)
													}
													className='flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-slate-100 transition-colors'>
													<BookOpen className='w-4 h-4' />
													पासबुक
												</motion.button>
											</div>

											{isAdmin && (
												<motion.button
													whileTap={{ scale: 0.97 }}
													onClick={() => router.push(`/shg/shg-details/${shg.shgId}/manage`)}
													className='w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-slate-300 text-slate-500 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all'>
													<Settings2 className='w-3.5 h-3.5' />
													समूह संचालन
												</motion.button>
											)}
										</div>
									</motion.div>
								);
							})
						)}
					</AnimatePresence>

					{!loading && shgs.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-center mt-20 py-12 px-6'>
							<div className='w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6'>
								<Users className='w-10 h-10 text-slate-300' />
							</div>
							<h3 className='text-lg font-bold text-slate-800'>
								कोई समूह नहीं मिला
							</h3>
							<ul className='mt-3 space-y-1'>
								<li className='text-slate-500 text-sm'>
									• आपका समूह अभी{' '}
									<b className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500'>
										तमोहर
									</b>{' '}
									पर नहीं है।
								</li>
								<li className='text-slate-500 text-sm'>
									• या आप अभी तक किसी भी समूह का हिस्सा नहीं हैं।
								</li>
							</ul>
						</motion.div>
					)}
				</div>
			</main>
		</div>
	);
}
