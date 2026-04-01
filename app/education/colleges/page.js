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
} from 'lucide-react';
import { collegeCategories, typeLabelHi } from './collegeData';

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
		<div className='min-h-screen bg-gradient-to-b from-slate-100 via-white to-violet-50/20 text-slate-800 pb-24'>
			<div className='sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={handleBack}
						className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center justify-center active:scale-90 transition-transform shadow-sm'>
						<ArrowLeft size={18} />
					</button>
					<div className='min-w-0'>
						<h1 className='text-lg font-bold leading-tight text-slate-900 truncate'>
							{selectedCategory ? selectedCategory.name : 'MP कॉलेज'}
						</h1>
						<p className='text-[11px] text-slate-500 font-medium'>
							{selectedCategory ? 'संस्थान सूची' : 'श्रेणी चुनें'}
						</p>
					</div>
				</div>
			</div>

			<AnimatePresence mode='wait'>
				{!selectedCategory && (
					<motion.div
						key='categories'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}>
						<div className='px-5 pt-6 pb-2'>
							<div className='flex items-center gap-2 mb-2'>
								<School size={16} className='text-violet-600' />
								<span className='text-xs font-medium text-slate-500'>मध्य प्रदेश</span>
							</div>
							<h2 className='text-xl font-bold leading-snug text-slate-900'>
								श्रेणी चुनें
							</h2>
						</div>

						<div className='px-4 pt-3 space-y-3'>
							{collegeCategories.map((category, index) => {
								const CategoryIcon = category.icon;
								return (
									<motion.button
										type='button'
										key={category.id}
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.04 + index * 0.04 }}
										whileTap={{ scale: 0.99 }}
										onClick={() => {
											setSelectedCategoryId(category.id);
											setExpandedCollegeId(null);
										}}
										className='w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm shadow-slate-200/40 text-left hover:border-violet-200 hover:shadow-md transition-all'>
										<div
											className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-md ${category.shadow} shrink-0`}>
											<CategoryIcon className='w-6 h-6 text-white' strokeWidth={2.25} />
										</div>
										<div className='flex-1 min-w-0'>
											<p className='text-[15px] font-bold text-slate-900 leading-snug'>
												{category.name}
											</p>
											<p className='text-[11px] text-slate-500 mt-0.5'>
												{category.colleges.length} संस्थान
											</p>
										</div>
										<ChevronRight className='w-5 h-5 text-slate-300 shrink-0' />
									</motion.button>
								);
							})}
						</div>
					</motion.div>
				)}

				{selectedCategory && (
					<motion.div
						key='list'
						initial={{ opacity: 0, x: 16 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -16 }}
						transition={{ duration: 0.25 }}>
						<div className='px-4 pt-4 space-y-3'>
							{selectedCategory.colleges.map((college, index) => {
								const isOpen = expandedCollegeId === college.id;
								const c = college.contact || {};
								return (
									<motion.div
										key={college.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: Math.min(index * 0.04, 0.35) }}
										className='rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden'>
										<button
											type='button'
											onClick={() => toggleCollege(college.id)}
											className='w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50/80 transition-colors'>
											<div className='flex-1 min-w-0'>
												<p className='text-[15px] font-bold text-slate-900 leading-snug'>
													{college.name}
												</p>
												<p className='text-[13px] text-slate-500 mt-1 flex items-center gap-1.5'>
													<MapPin className='w-3.5 h-3.5 shrink-0 text-slate-400' />
													{college.city}
												</p>
											</div>
											<ChevronDown
												className={`w-5 h-5 text-slate-400 shrink-0 transition-transform mt-0.5 ${
													isOpen ? 'rotate-180' : ''
												}`}
											/>
										</button>

										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.22, ease: 'easeInOut' }}
													className='overflow-hidden border-t border-slate-100'>
													<div className='px-4 pb-4 pt-3 space-y-3 text-[13px]'>
														<div className='flex flex-wrap gap-2'>
															<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold'>
																<Building2 className='w-3.5 h-3.5' />
																स्थापना: {college.established}
															</span>
															<span
																className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-bold ${
																	college.type === 'govt'
																		? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
																		: 'bg-amber-50 text-amber-900 border border-amber-100'
																}`}>
																{typeLabelHi(college.type)}
															</span>
														</div>
														<p className='text-slate-600 leading-relaxed'>
															{college.description}
														</p>
														<div className='rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-2'>
															<p className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
																संपर्क
															</p>
															{c.address && (
																<p className='flex gap-2 text-slate-700'>
																	<MapPin className='w-4 h-4 text-violet-500 shrink-0 mt-0.5' />
																	<span>{c.address}</span>
																</p>
															)}
															{c.phone && (
																<a
																	href={`tel:${c.phone.replace(/\s/g, '')}`}
																	className='flex gap-2 text-slate-700 hover:text-violet-700'>
																	<Phone className='w-4 h-4 text-violet-500 shrink-0' />
																	<span>{c.phone}</span>
																</a>
															)}
															{c.email && (
																<a
																	href={`mailto:${c.email}`}
																	className='flex gap-2 text-slate-700 hover:text-violet-700 break-all'>
																	<Mail className='w-4 h-4 text-violet-500 shrink-0 mt-0.5' />
																	<span>{c.email}</span>
																</a>
															)}
															{c.website && (
																<a
																	href={c.website}
																	target='_blank'
																	rel='noopener noreferrer'
																	className='flex gap-2 text-violet-700 hover:underline break-all'>
																	<Globe className='w-4 h-4 shrink-0 mt-0.5' />
																	<span>{c.website.replace(/^https?:\/\//, '')}</span>
																</a>
															)}
															{!c.address && !c.phone && !c.email && !c.website && (
																<p className='text-slate-400 text-xs'>
																	संपर्क विवरण जल्द जोड़ा जाएगा
																</p>
															)}
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

			{!selectedCategory && (
				<div className='px-4 pt-4'>
					<div className='flex items-center gap-2 px-3 py-2.5 rounded-xl bg-sky-50/80 border border-sky-100'>
						<MapPin className='w-4 h-4 text-sky-600 shrink-0' />
						<p className='text-[11px] text-slate-600 leading-snug'>
							संपर्क व विवरण संकेतात्मक — प्रवेश व शुल्क हेतु आधिकारिक साइट देखें
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
