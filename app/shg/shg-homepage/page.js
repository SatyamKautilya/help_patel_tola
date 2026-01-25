'use client';

import { useEffect, useState } from 'react';
import { Users, ArrowRight, MapPin, Plus, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function UserHomePage() {
	const [shgs, setShgs] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const load = async () => {
			try {
				// Simulated API Call
				const data = [
					{
						_id: '648a1f2b5f3c2a0012345678',
						name: 'सहयोगी महिला समूह',
						village: 'पटेल टोला',
						role: 'सदस्य',
						membersCount: 15,
					},
					{
						_id: '648a1f2b5f3c2a0098765432',
						name: 'प्रगति महिला मंडल',
						village: 'रामपुर',
						role: 'प्रबंधक',
						membersCount: 20,
					},
				];
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
		<div className='min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-teal-50 pb-24'>
			{/* Header Section */}
			<div className='sticky top-0 z-20 px-6 pt-8 pb-4 backdrop-blur-md bg-white/30 border-b border-white/20'>
				<div className='flex items-center justify-between max-w-2xl mx-auto'>
					<div>
						<h1 className='text-xs font-bold tracking-widest text-indigo-600 uppercase'>
							Tamohar
						</h1>
						<h2 className='text-2xl font-extrabold text-slate-900 tracking-tight'>
							मेरे{' '}
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500'>
								समूह
							</span>
						</h2>
					</div>
					<div className='h-10 w-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center'>
						<LayoutGrid className='w-5 h-5 text-slate-600' />
					</div>
				</div>
			</div>

			<main className='max-w-2xl mx-auto p-6'>
				{/* Search/Filter (Visual Placeholder) */}
				{!loading && shgs.length > 0 && (
					<p className='text-sm text-slate-500 mb-6 font-medium'>
						कुल {shgs.length} समूह सक्रिय हैं
					</p>
				)}

				{/* Loading State */}
				<div className='grid gap-4'>
					<AnimatePresence>
						{loading
							? Array.from({ length: 3 }).map((_, i) => (
									<motion.div
										key={`skeleton-${i}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='h-32 rounded-3xl bg-white/40 animate-pulse border border-white'
									/>
								))
							: shgs.map((shg, index) => (
									<motion.div
										key={shg._id}
										initial={{ opacity: 0, y: 15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											if (index === 1) {
												router.push(
													`/shg/shg-details/${shg._id}/member/passbook`,
												);
											} else router.push(`/shg/shg-details/${shg._id}/manage`);
										}}
										className='group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all cursor-pointer'>
										{/* Role Accent Line */}
										<div
											className={`absolute left-0 top-0 bottom-0 w-2 ${shg.role === 'प्रबंधक' ? 'bg-rose-400' : 'bg-indigo-400'}`}
										/>

										<div className='flex justify-between items-start'>
											<div className='space-y-1'>
												<h3 className='text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors'>
													{shg.name}
												</h3>
												<div className='flex items-center gap-1.5 text-slate-500'>
													<div className='p-1 bg-slate-100 rounded-md'>
														<MapPin className='w-3.5 h-3.5' />
													</div>
													<span className='text-sm font-medium'>
														{shg.village}
													</span>
												</div>
											</div>

											<span
												className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border ${
													shg.role === 'प्रबंधक'
														? 'bg-rose-50 text-rose-600 border-rose-100'
														: 'bg-indigo-50 text-indigo-600 border-indigo-100'
												}`}>
												{shg.role}
											</span>
										</div>

										<div className='mt-6 pt-4 border-t border-slate-50 flex items-center justify-between'>
											<div className='flex items-center gap-3'>
												<div className='flex -space-x-2'>
													{[1, 2, 3].map((i) => (
														<div
															key={i}
															className='w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden'>
															<Users className='w-3 h-3 text-slate-400' />
														</div>
													))}
												</div>
												<span className='text-sm font-semibold text-slate-600'>
													{shg.membersCount} सदस्य
												</span>
											</div>

											<div className='flex items-center gap-1 text-indigo-600 font-bold text-sm'>
												खोलें
												<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
											</div>
										</div>
									</motion.div>
								))}
					</AnimatePresence>
				</div>

				{/* Empty State */}
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
						<p className='text-slate-500 mt-2 max-w-[200px] mx-auto'>
							आप अभी तक किसी भी समूह का हिस्सा नहीं हैं।
						</p>
					</motion.div>
				)}
			</main>

			{/* Floating Action Button */}
		</div>
	);
}
