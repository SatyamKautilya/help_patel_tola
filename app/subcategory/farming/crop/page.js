'use client';

import { setLoader } from '@/app/store/appSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Chip } from '@heroui/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
	Sprout, 
	Calendar, 
	Droplet, 
	ShieldAlert, 
	CheckCircle2, 
	Info, 
	AlertTriangle, 
	ArrowLeft, 
	ArrowRight,
	ChevronDown, 
	Sparkles, 
	CalendarDays, 
	Activity,
	Leaf
} from 'lucide-react';

const InfoBox = ({ label, value, danger }) => (
	<div
		className={`
 rounded-xl p-3 border transition-colors duration-200
      ${
				danger
					? 'bg-red-50 border-red-100 text-red-800'
					: 'bg-slate-50/60 border-slate-100 text-slate-700'
			}
    `}>
		<p className='text-xs font-semibold text-slate-400'>{label}</p>
		<p className='font-bold text-sm mt-0.5'>{value}</p>
	</div>
);

const DiseaseDetailCard = ({ disease }) => {
	const [open, setOpen] = React.useState(false);

	return (
		<div className='bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300'>
			<button
				onClick={() => setOpen(!open)}
				className='w-full p-5 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors outline-none'>
				<div className='flex items-center gap-4'>
					<div className={`p-3 rounded-2xl transition-colors duration-300 ${open ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'bg-red-50 text-red-500'}`}>
						<ShieldAlert size={24} />
					</div>
					<div>
						<h3 className='text-lg font-bold text-slate-800'>{disease.name}</h3>
						{disease.cause && (
							<p className='text-xs text-slate-400 font-semibold mt-0.5'>
								कारण: {disease.cause}
							</p>
						)}
					</div>
				</div>
				<div className={`p-2 rounded-full transition-colors duration-200 ${open ? 'bg-slate-100' : 'bg-transparent'}`}>
					<ChevronDown className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} size={20} />
				</div>
			</button>

			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='border-t border-slate-50/80 px-5 pb-6 pt-4 space-y-4'>
						{/* Symptoms */}
						{disease.symptoms && (
							<div className='bg-rose-50/50 border border-rose-100/50 rounded-2xl p-4'>
								<h4 className='text-xs font-black uppercase text-rose-600 tracking-wider mb-2 flex items-center gap-1.5'>
									<AlertTriangle size={14} /> लक्षण (Symptoms)
								</h4>
								<p className='text-sm text-slate-700 leading-relaxed font-medium'>{disease.symptoms}</p>
							</div>
						)}

						{/* Prevention */}
						{disease.prevention && (
							<div className='bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4'>
								<h4 className='text-xs font-black uppercase text-emerald-600 tracking-wider mb-2 flex items-center gap-1.5'>
									<CheckCircle2 size={14} /> बचाव (Prevention)
								</h4>
								<p className='text-sm text-slate-700 leading-relaxed font-medium'>{disease.prevention}</p>
							</div>
						)}

						{/* Recommended Chemical Treatment */}
						{disease.treatment && disease.treatment.length > 0 && (
							<div className='space-y-3'>
								<h4 className='text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5'>
									<Activity size={14} /> रासायनिक उपचार (Treatment)
								</h4>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									{disease.treatment.map((t, tIdx) => (
										<div key={tIdx} className='bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-2'>
											<div className='flex justify-between items-start gap-2'>
												<p className='font-bold text-slate-800'>{t.name}</p>
												<Chip size='sm' color='danger' variant='flat' className='font-bold rounded-full'>
													{t.method}
												</Chip>
											</div>
											<div className='space-y-1 text-xs text-slate-500 font-medium'>
												<p><span className='text-slate-400'>केमिकल:</span> {t.chemical}</p>
												<p><span className='text-slate-400'>मात्रा:</span> {t.quantity}</p>
												<p><span className='text-slate-400'>अंतराल:</span> {t.interval}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default function CropsPage() {
	const [cropDetails, setCropDetails] = React.useState({});
	const dispatch = useDispatch();
	const [name, setName] = React.useState('');
	const [activeTab, setActiveTab] = React.useState('overview');
	const tabsRef = React.useRef(null);
	const [showLeftArrow, setShowLeftArrow] = React.useState(false);
	const [showRightArrow, setShowRightArrow] = React.useState(true);

	const handleScroll = () => {
		if (tabsRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
			setShowLeftArrow(scrollLeft > 5);
			setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
		}
	};

	useEffect(() => {
		const el = tabsRef.current;
		if (el) {
			el.addEventListener('scroll', handleScroll);
			handleScroll();
			window.addEventListener('resize', handleScroll);
		}
		return () => {
			if (el) el.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [cropDetails]);

	// Re-run handleScroll when tab selection changes to ensure correct arrow updates
	useEffect(() => {
		// Small delay to ensure render layout updates before measuring scroll
		const timer = setTimeout(handleScroll, 100);
		return () => clearTimeout(timer);
	}, [activeTab]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setName(new URLSearchParams(window.location.search).get('name') || '');
		}
	}, []);

	const {
		name: cropName = '',
		time = '',
		variety = [],
		sprays = [],
		additionalInfo = [],
		url = '',
		soilPreparation = { image: '', steps: [] },
		fertigationSchedule = [],
		diseases = [],
	} = cropDetails || {};

	const fetchCropDetails = async () => {
		dispatch(setLoader(true));
		try {
			if (!name) {
				return;
			}
			const response = await fetch(`/api/subcategory/crops?name=${name}`);
			if (response.ok) {
				const data = await response.json();
				setCropDetails(data?.crops[0] || {});
			}
		} catch (error) {
			console.error('Failed to fetch crop details:', error);
			setCropDetails({});
		} finally {
			dispatch(setLoader(false));
		}
	};

	useEffect(() => {
		fetchCropDetails();
	}, [name]);

	if (!cropName) {
		return (
			<div className='relative min-h-screen bg-gradient-to-br from-emerald-50 to-lime-100 text-slate-800 flex items-center justify-center'>
				<div className='w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin' />
			</div>
		);
	}

	const tabs = [
		{ id: 'overview', label: 'विवरण', icon: Sprout },
		{ id: 'soil', label: 'मिट्टी तैयारी', icon: Leaf },
		{ id: 'fertigation', label: 'फर्टिगेशन', icon: Droplet },
		{ id: 'sprays', label: 'स्प्रे शैड्यूल', icon: CalendarDays },
		{ id: 'diseases', label: 'रोग उपचार', icon: ShieldAlert },
	];

	return (
		<div className='relative min-h-screen bg-gradient-to-br from-emerald-50 to-lime-100 text-slate-800'>
			{/* Fixed Header */}
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: 'spring', stiffness: 120, damping: 20 }}
				className='fixed top-0 z-20 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm'>
				<div className='flex flex-col items-center pt-4 relative'>
					<button
						onClick={() => window.history.back()}
						className='absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors flex items-center justify-center'
						title='पीछे जाएं'
					>
						<ArrowLeft size={20} />
					</button>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/farming/tamoharagr.png'
						alt='Tamohar Agriculture'
						width={180}
						height={40}
						priority
					/>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: '80%' }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className='mt-3 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent'
					/>
				</div>
			</motion.header>

			<main className='pt-28 px-4 max-w-4xl mx-auto pb-20'>
				{/* Crop Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className='flex flex-col sm:flex-row gap-6 items-center bg-white p-6 rounded-3xl shadow-lg mb-8 border border-slate-100'>
					<div className='shrink-0'>
						<Image
							src={url || 'https://media.istockphoto.com/id/175396800/photo/field-of-organic-tomatoes.jpg?s=612x612&w=0&k=20&c=cRXrq1518yf67d0XUaDORckRGgjP4MavdrF8yL3UGnM='}
							alt={cropName}
							width={140}
							height={140}
							className='w-32 h-32 rounded-full object-cover shadow-xl border-4 border-emerald-300'
						/>
					</div>

					<div className='text-center sm:text-left'>
						<h1 className='text-3xl font-extrabold text-emerald-800 mb-1'>
							{cropName}
						</h1>
						<div className='flex items-center gap-1.5 justify-center sm:justify-start text-slate-500 font-medium mt-1'>
							<Calendar size={16} />
							<span>{time}</span>
						</div>
					</div>
				</motion.div>

				{/* Custom Tabs with Scroll Indicators */}
				<div className='relative w-full mb-8 select-none'>
					{/* Left fade/arrow indicator */}
					<AnimatePresence>
						{showLeftArrow && (
							<motion.div
								initial={{ opacity: 0, x: -5 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -5 }}
								className='absolute left-0 top-0 bottom-2 w-12 z-10 bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-transparent pointer-events-none flex items-center justify-start pl-1'
							>
								<div className='bg-white/95 shadow-md rounded-full p-1.5 border border-emerald-100 text-emerald-600 animate-pulse pointer-events-auto cursor-pointer' onClick={() => {
									if (tabsRef.current) {
										tabsRef.current.scrollBy({ left: -100, behavior: 'smooth' });
									}
								}}>
									<ArrowLeft size={14} strokeWidth={3} />
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Right fade/arrow indicator */}
					<AnimatePresence>
						{showRightArrow && (
							<motion.div
								initial={{ opacity: 0, x: 5 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 5 }}
								className='absolute right-0 top-0 bottom-2 w-12 z-10 bg-gradient-to-l from-lime-100 via-lime-100/70 to-transparent pointer-events-none flex items-center justify-end pr-1'
							>
								<div className='bg-white/95 shadow-md rounded-full p-1.5 border border-emerald-100 text-emerald-600 animate-pulse pointer-events-auto cursor-pointer' onClick={() => {
									if (tabsRef.current) {
										tabsRef.current.scrollBy({ left: 100, behavior: 'smooth' });
									}
								}}>
									<ArrowRight size={14} strokeWidth={3} />
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Scrollable Tabs Wrapper */}
					<div
						ref={tabsRef}
						onScroll={handleScroll}
						className='flex gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x'
					>
						{tabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-extrabold whitespace-nowrap transition-all duration-300 outline-none ${
										isActive
											? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
											: 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
									}`}>
									<Icon size={16} strokeWidth={2.5} />
									<span>{tab.label}</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* Tab Contents */}
				<div className='min-h-[400px]'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -15 }}
							transition={{ duration: 0.25 }}
							className='space-y-6'>
							
							{activeTab === 'overview' && (
								<>
									{/* Variety Section */}
									<div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-100'>
										<h2 className='text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2'>
											<Sparkles className='text-emerald-500' size={20} />
											<span>उन्नत किस्म विवरण</span>
										</h2>
										<div className='flex flex-wrap gap-2.5'>
											{variety.map((item, index) => (
												<Chip key={index} color='success' variant='flat' className='font-bold py-4 px-4 text-sm rounded-2xl'>
													{item}
												</Chip>
											))}
										</div>
									</div>

									{/* Additional Notes */}
									{additionalInfo.length > 0 && (
										<div className='bg-amber-50 border border-amber-200/60 rounded-3xl p-6 shadow-sm'>
											<h2 className='text-xl font-bold text-amber-900 mb-4 flex items-center gap-2'>
												<AlertTriangle className='text-amber-500' size={20} />
												<span>महत्वपूर्ण दिशा-निर्देश</span>
											</h2>
											<ul className='space-y-3.5'>
												{additionalInfo.map((info, idx) => (
													<li key={idx} className='flex gap-3 items-start text-amber-800 font-semibold bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-amber-100/30'>
														<CheckCircle2 className='text-emerald-600 shrink-0 mt-0.5' size={18} />
														<span>{info}</span>
													</li>
												))}
											</ul>
										</div>
									)}
								</>
							)}

							{activeTab === 'soil' && (
								<div className='space-y-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-emerald-100'>
									{soilPreparation?.steps && soilPreparation.steps.length > 0 ? (
										soilPreparation.steps.map((step, idx) => (
											<div key={idx} className='flex gap-4 relative'>
												<div className='w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-lg shadow-emerald-100'>
													{idx + 1}
												</div>
												<div className='bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex-1 hover:shadow-md transition-shadow duration-300'>
													<h3 className='text-lg font-bold text-emerald-800 mb-2'>{step.step}</h3>
													<p className='text-slate-600 text-sm leading-relaxed'>{step.detail}</p>
												</div>
											</div>
										))
									) : (
										<p className='text-center text-slate-400 py-10 font-semibold bg-white rounded-3xl border border-slate-100'>
											मिट्टी की तैयारी की जानकारी उपलब्ध नहीं है।
										</p>
									)}
								</div>
							)}

							{activeTab === 'fertigation' && (
								<div className='space-y-6'>
									{fertigationSchedule && fertigationSchedule.length > 0 ? (
										fertigationSchedule.map((stage, idx) => (
											<div key={idx} className='bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
												<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4'>
													<div className='flex items-center gap-3'>
														<div className='p-3 rounded-2xl bg-sky-50 text-sky-600'>
															<Droplet size={24} />
														</div>
														<div>
															<h3 className='text-lg font-bold text-slate-800'>{stage.stage}</h3>
															<p className='text-xs text-slate-400 font-semibold'>रोपाई के बाद के दिन</p>
														</div>
													</div>
													<Chip color='primary' variant='flat' className='font-extrabold px-3 py-1.5 rounded-full text-xs'>
														{stage.daysAfterTransplant} दिन
													</Chip>
												</div>

												<div className='space-y-3 mb-4'>
													<h4 className='text-xs font-black uppercase text-slate-400 tracking-wider'>उर्वरक विवरण</h4>
													<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
														{stage.fertilizers?.map((f, fIdx) => (
															<div key={fIdx} className='bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center'>
																<div>
																	<p className='font-bold text-slate-700'>{f.name}</p>
																	<p className='text-xs text-slate-400 mt-0.5'>{f.frequency}</p>
																</div>
																<Chip size='sm' variant='bordered' className='font-bold text-slate-600 bg-white'>
																	{f.quantity}
																</Chip>
															</div>
														))}
													</div>
												</div>

												{stage.note && (
													<div className='bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4 text-emerald-800 text-sm font-medium flex gap-2'>
														<Info className='text-emerald-600 shrink-0 mt-0.5' size={16} />
														<span>{stage.note}</span>
													</div>
												)}
											</div>
										))
									) : (
										<p className='text-center text-slate-400 py-10 font-semibold bg-white rounded-3xl border border-slate-100'>
											फर्टिगेशन शैड्यूल उपलब्ध नहीं है।
										</p>
									)}
								</div>
							)}

							{activeTab === 'sprays' && (
								<div className='space-y-6'>
									{sprays && sprays.length > 0 ? (
										sprays.map((spray, idx) => (
											<div key={idx} className='bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300'>
												<div className='flex justify-between items-start mb-4'>
													<div>
														<h3 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
															<Calendar className='text-emerald-500' size={18} />
															<span>{spray.duedate}</span>
														</h3>
														<p className='text-xs text-slate-400 font-semibold mt-1'>छिड़काव समय</p>
													</div>
													{spray.note && (
														<Chip color={spray.notetype || 'warning'} size='sm' variant='flat' className='font-bold rounded-full'>
															{spray.note}
														</Chip>
													)}
												</div>

												<div className='mb-4'>
													<Chip color='success' variant='flat' className='text-xs font-bold rounded-full'>
														{spray.method === 'drenching' ? '🌱 ड्रेंचिंग (जड़ में डालें)' : '🌤️ फोलियर स्प्रे (छिड़काव करें)'}
													</Chip>
												</div>

												<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
													<InfoBox label='प्रकार' value={spray.type} />
													<InfoBox label='टारगेट' value={spray.target} danger />
													<InfoBox label='दवाई' value={spray.name} />
													<InfoBox label='केमिकल' value={spray.chemical} />
													<InfoBox label='मात्रा' value={spray.quantity} />
												</div>
											</div>
										))
									) : (
										<p className='text-center text-slate-400 py-10 font-semibold bg-white rounded-3xl border border-slate-100'>
											स्प्रे शैड्यूल उपलब्ध नहीं है।
										</p>
									)}
								</div>
							)}

							{activeTab === 'diseases' && (
								<div className='space-y-4'>
									{diseases && diseases.length > 0 ? (
										diseases.map((disease, idx) => (
											<DiseaseDetailCard key={idx} disease={disease} />
										))
									) : (
										<p className='text-center text-slate-400 py-10 font-semibold bg-white rounded-3xl border border-slate-100'>
											रोग और उपचार की जानकारी उपलब्ध नहीं है।
										</p>
									)}
								</div>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</main>

			{/* Style to keep it app-like */}
			<style jsx global>{`
				::-webkit-scrollbar {
					display: none;
				}
				body {
					-ms-overflow-style: none;
					scrollbar-width: none;
					background: #f8fafc;
				}
			`}</style>
		</div>
	);
}
