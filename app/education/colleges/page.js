'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	MapPin,
	School,
	ChevronRight,
	ChevronDown,
	Phone,
	Mail,
	Globe,
	Building2,
	CalendarDays,
	Info,
	GraduationCap
} from 'lucide-react';
import { collegeCategories, typeLabelHi } from './collegeData';

const springTrans = { type: 'spring', stiffness: 300, damping: 25 };

export default function CollegesPage() {
	const router = useRouter();
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [expandedCollegeId, setExpandedCollegeId] = useState(null);

	const selectedCategory = collegeCategories.find((c) => c.id === selectedCategoryId);

	const handleBack = () => {
		if (selectedCategoryId) {
			setSelectedCategoryId(null);
			setExpandedCollegeId(null);
			return;
		}
		router.back();
	};

	const toggleCollege = (id) => {
		setExpandedCollegeId((prev) => (prev === id ? null : id));
	};

	return (
		<div className='min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 overflow-hidden relative'>
			{/* Decorative Orbs */}
			<div className='absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-3xl pointer-events-none' />
			<div className='absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-3xl pointer-events-none' />
			<div className='absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none' />

			{/* Sticky Header */}
			<div className='sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm'>
				<div className='flex items-center gap-4 px-5 py-4'>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleBack}
						className='w-11 h-11 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors'>
						<ArrowLeft size={20} />
					</motion.button>
					<div className='min-w-0 flex-1'>
						<h1 className='text-xl font-black tracking-tight text-slate-900 truncate'>
							{selectedCategory ? selectedCategory.name : 'महाविद्यालय (Colleges)'}
						</h1>
						<p className='text-xs text-slate-500 font-semibold tracking-wide uppercase mt-0.5'>
							{selectedCategory ? 'संस्थानों की सूची' : 'मध्य प्रदेश के शीर्ष संस्थान'}
						</p>
					</div>
				</div>
			</div>

			<div className='relative z-10 px-5 pt-6'>
				<AnimatePresence mode='wait'>
					{!selectedCategory && (
						<motion.div
							key='categories'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={springTrans}>
							<div className='mb-6'>
								<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 mb-3'>
									<GraduationCap size={16} />
									<span className='text-xs font-bold uppercase tracking-wider'>MP Education</span>
								</div>
								<h2 className='text-3xl font-black leading-tight text-slate-900'>
									अपना क्षेत्र <br />
									<span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500'>चुनें</span>
								</h2>
							</div>

							<div className='grid gap-4'>
								{collegeCategories.map((category, index) => {
									const CategoryIcon = category.icon;
									return (
										<motion.button
											type='button'
											key={category.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.1 + index * 0.05, ...springTrans }}
											whileHover={{ scale: 1.02, y: -2 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => {
												setSelectedCategoryId(category.id);
												setExpandedCollegeId(null);
											}}
											className='group flex items-center gap-5 p-5 rounded-3xl bg-white/80 backdrop-blur-lg border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-left'>
											<div
												className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg ${category.shadow} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
												<CategoryIcon className='w-7 h-7 text-white' strokeWidth={2} />
											</div>
											<div className='flex-1 min-w-0'>
												<p className='text-lg font-bold text-slate-900 leading-snug'>
													{category.name}
												</p>
												<div className='flex items-center gap-2 mt-1'>
													<span className='text-xs font-semibold text-slate-500'>
														{category.colleges.length} शीर्ष संस्थान
													</span>
													<div className='w-1 h-1 rounded-full bg-slate-300' />
													<span className='text-xs font-semibold text-slate-500'>MP</span>
												</div>
											</div>
											<div className='w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-violet-50 transition-colors'>
												<ChevronRight className='w-4 h-4 text-slate-400 group-hover:text-violet-600' />
											</div>
										</motion.button>
									);
								})}
							</div>
						</motion.div>
					)}

					{selectedCategory && (
						<motion.div
							key='list'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={springTrans}>
							<div className='space-y-4'>
								{selectedCategory.colleges.map((college, index) => {
									const isOpen = expandedCollegeId === college.id;
									const c = college.contact || {};
									return (
										<motion.div
											key={college.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: Math.min(index * 0.05, 0.4), ...springTrans }}
											className={`rounded-3xl border ${isOpen ? 'border-violet-200/60 bg-white shadow-xl shadow-violet-100/50' : 'border-white/80 bg-white/70 shadow-sm'} backdrop-blur-xl overflow-hidden transition-all duration-300`}>
											<button
												type='button'
												onClick={() => toggleCollege(college.id)}
												className='w-full flex items-start gap-4 p-5 text-left transition-colors'>
												<div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-500'}`}>
													<School className='w-6 h-6' strokeWidth={1.5} />
												</div>
												<div className='flex-1 min-w-0 pt-0.5'>
													<p className='text-[16px] font-bold text-slate-900 leading-tight pr-4'>
														{college.name}
													</p>
													<p className='text-[13px] font-semibold text-slate-500 mt-1.5 flex items-center gap-1.5'>
														<MapPin className='w-3.5 h-3.5 text-violet-400' />
														{college.city}
													</p>
												</div>
												<div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'border-violet-200 bg-violet-50 text-violet-600 rotate-180' : 'border-slate-200 bg-white text-slate-400'}`}>
													<ChevronDown className='w-4 h-4' />
												</div>
											</button>

											<AnimatePresence initial={false}>
												{isOpen && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: 'auto', opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.3, ease: 'easeInOut' }}>
														<div className='px-5 pb-5 pt-1 space-y-5'>
															{/* Badges */}
															<div className='flex flex-wrap gap-2.5'>
																<div className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-xs font-bold'>
																	<CalendarDays className='w-4 h-4 text-slate-400' />
																	स्थापना: {college.established}
																</div>
																<div
																	className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
																		college.type === 'govt'
																			? 'bg-emerald-50/80 text-emerald-700 border border-emerald-100'
																			: 'bg-amber-50/80 text-amber-700 border border-amber-100'
																	}`}>
																	<Building2 className='w-4 h-4 opacity-70' />
																	{typeLabelHi(college.type)}
																</div>
															</div>

															{/* About Section */}
															<div className='space-y-2'>
																<h4 className='text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'>
																	<Info className='w-3.5 h-3.5' /> विवरण (About)
																</h4>
																<p className='text-slate-600 text-sm font-medium leading-relaxed bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100/50'>
																	{college.description}
																</p>
															</div>

															{/* Contact Section */}
															<div className='space-y-3'>
																<h4 className='text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'>
																	<Phone className='w-3.5 h-3.5' /> संपर्क (Contact)
																</h4>
																<div className='grid gap-2.5'>
																	{c.address && (
																		<div className='flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm'>
																			<div className='p-2 rounded-xl bg-rose-50 text-rose-500'>
																				<MapPin className='w-4 h-4' />
																			</div>
																			<div className='flex-1 pt-0.5'>
																				<p className='text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5'>पता</p>
																				<p className='text-sm font-semibold text-slate-700'>{c.address}</p>
																			</div>
																		</div>
																	)}
																	{c.phone && (
																		<a href={`tel:${c.phone.replace(/\s/g, '')}`} className='flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-transform'>
																			<div className='p-2 rounded-xl bg-sky-50 text-sky-500'>
																				<Phone className='w-4 h-4' />
																			</div>
																			<div className='flex-1'>
																				<p className='text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5'>फ़ोन</p>
																				<p className='text-sm font-semibold text-sky-700'>{c.phone}</p>
																			</div>
																		</a>
																	)}
																	{c.email && (
																		<a href={`mailto:${c.email}`} className='flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-transform'>
																			<div className='p-2 rounded-xl bg-orange-50 text-orange-500'>
																				<Mail className='w-4 h-4' />
																			</div>
																			<div className='flex-1 min-w-0'>
																				<p className='text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5'>ईमेल</p>
																				<p className='text-sm font-semibold text-orange-700 truncate'>{c.email}</p>
																			</div>
																		</a>
																	)}
																	{c.website && (
																		<a href={c.website} target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-transform'>
																			<div className='p-2 rounded-xl bg-violet-50 text-violet-500'>
																				<Globe className='w-4 h-4' />
																			</div>
																			<div className='flex-1 min-w-0'>
																				<p className='text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5'>वेबसाइट</p>
																				<p className='text-sm font-semibold text-violet-700 truncate'>{c.website.replace(/^https?:\/\//, '')}</p>
																			</div>
																		</a>
																	)}
																	{!c.address && !c.phone && !c.email && !c.website && (
																		<p className='text-slate-400 text-xs italic p-2 text-center bg-slate-50 rounded-xl'>
																			संपर्क विवरण उपलब्ध नहीं है
																		</p>
																	)}
																</div>
															</div>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>
									);
								})}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
