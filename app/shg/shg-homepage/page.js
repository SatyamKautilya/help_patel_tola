'use client';

import { useEffect, useState } from 'react';
import {
	Users,
	ChevronLeft,
	BookOpen,
	Settings2,
	LayoutDashboard,
	Lock,
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
									transition={{
										duration: 1.6,
										repeat: Infinity,
										ease: 'linear',
									}}
									className='w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full'
								/>
								<p className='text-slate-500 font-semibold text-sm'>
									आपके समूह लोड हो रहे हैं...
								</p>
							</motion.div>
						) : (
							shgs.map((shg, index) => {
								const isAdmin = [
									'PRESIDENT',
									'SECRETARY',
									'TREASURER',
								].includes(shg.role);

								return (
									<motion.div
										key={shg.shgId}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: index * 0.06,
											type: 'spring',
											stiffness: 280,
											damping: 24,
										}}
										className='rounded-[1.35rem] bg-white border border-slate-200/90 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.12)] overflow-hidden'>
										{/* Name + role */}
										<div className='px-5 pt-5 pb-4 border-b border-slate-100'>
											<h2 className='text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug break-words'>
												{shg.name || 'समूह'}
											</h2>
											<p className='mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest'>
												{MemberRole[shg.role] || MemberRole.MEMBER}
												{shg.village ? (
													<span className='text-slate-300 font-semibold normal-case tracking-normal'>
														{' '}
														· {shg.village}
													</span>
												) : null}
											</p>
										</div>

										{/* Three actions */}
										<div className='p-4 grid grid-cols-3 gap-2'>
											<motion.button
												type='button'
												whileTap={{ scale: 0.96 }}
												onClick={() =>
													router.push(`/shg/shg-details/${shg.shgId}/dashboard`)
												}
												className='flex flex-col items-center justify-center gap-1.5 py-3.5 px-1 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200/60 hover:shadow-lg hover:shadow-indigo-300/50 transition-shadow'>
												<LayoutDashboard className='w-5 h-5 shrink-0 opacity-95' />
												<span className='text-[10px] font-black uppercase tracking-wide leading-tight text-center'>
													डैशबोर्ड
												</span>
											</motion.button>
											<motion.button
												type='button'
												whileTap={{ scale: 0.96 }}
												onClick={() =>
													router.push(
														`/shg/shg-details/${shg.shgId}/member/${shg.memberId}/passbook`,
													)
												}
												className='flex flex-col items-center justify-center gap-1.5 py-3.5 px-1 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition-colors'>
												<BookOpen className='w-5 h-5 shrink-0 text-indigo-600' />
												<span className='text-[10px] font-black uppercase tracking-wide leading-tight text-center'>
													पासबुक
												</span>
											</motion.button>
											{isAdmin ? (
												<motion.button
													type='button'
													whileTap={{ scale: 0.96 }}
													onClick={() =>
														router.push(`/shg/shg-details/${shg.shgId}/manage`)
													}
													className='flex flex-col items-center justify-center gap-1.5 py-3.5 px-1 rounded-2xl bg-white border-2 border-emerald-200 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300 transition-colors'>
													<Settings2 className='w-5 h-5 shrink-0 text-emerald-600' />
													<span className='text-[10px] font-black uppercase tracking-wide leading-tight text-center'>
														संचालन
													</span>
												</motion.button>
											) : (
												<button
													type='button'
													disabled
													title='केवल पदाधिकारी (अध्यक्ष / सचिव / कोषाध्यक्ष)'
													className='flex flex-col items-center justify-center gap-1.5 py-3.5 px-1 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 cursor-not-allowed opacity-80'>
													<Lock className='w-5 h-5 shrink-0' />
													<span className='text-[10px] font-black uppercase tracking-wide leading-tight text-center'>
														संचालन
													</span>
												</button>
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
