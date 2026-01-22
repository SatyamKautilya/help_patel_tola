'use client';
import React, { useState } from 'react';
import {
	X,
	ChevronRight,
	ChevronLeft,
	Plus,
	Trash2,
	Save,
	Layout,
	BookOpen,
	ClipboardList,
	Target,
	ListChecks,
	Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddMeetingDetails = ({ isOpen, onOpenChange, onSuccess }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [formData, setFormData] = useState({
		meetingName: '',
		theme: 'education',
		meetingDate: '',
		place: '',
		aim: '',
		charcha: [{ title: '', details: '', findings: '' }],
		interventionStrategy: [''],
		decisions: [''],
		visibilityGroups: 'Public',
	});

	if (!isOpen) return null;

	const saveMeetingDetails = async () => {
		try {
			const response = await fetch(
				'/api/query/database?name=add-meeting-details',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData),
				},
			);
			const data = await response.json();
			if (response.ok) {
				onSuccess && onSuccess(data);
			} else {
				alert('Error saving meeting details: ' + data.message);
			}
		} catch (error) {}
	};

	// --- Dynamic Navigation Logic ---
	// Page sequence:
	// 0: General Info
	// 1 to N: Charcha items
	// N+1 to M: Interventions
	// Last - 1: Decisions
	// Last: Visibility

	const totalCharcha = formData.charcha.length;
	const totalInterventions = formData.interventionStrategy.length;

	const totalSteps = 1 + totalCharcha + totalInterventions + 1 + 1; // General + Charcha + Interventions + Decisions + Visibility

	const handleNext = () =>
		currentIndex < totalSteps - 1 && setCurrentIndex(currentIndex + 1);
	const handlePrev = () =>
		currentIndex > 0 && setCurrentIndex(currentIndex - 1);

	// --- Helper Functions ---
	const updateField = (field, value) =>
		setFormData((prev) => ({ ...prev, [field]: value }));

	const updateListItem = (field, index, value) => {
		const newList = [...formData[field]];
		newList[index] = value;
		updateField(field, newList);
	};

	const updateCharcha = (index, key, value) => {
		const newList = [...formData.charcha];
		newList[index][key] = value;
		updateField('charcha', newList);
	};

	const addMore = (field, defaultValue) => {
		updateField(field, [...formData[field], defaultValue]);
		// Optional: jump to the newly created page
		// setCurrentIndex(currentIndex + 1);
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4'>
			<div className='bg-slate-900 border border-white/10 w-full max-w-2xl min-h-[500px] max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col'>
				{/* Header */}
				<div className='p-6 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<div className='p-2 bg-blue-500/20 rounded-lg text-blue-500'>
							<Layout size={20} />
						</div>
						<div>
							<h2 className='text-lg font-bold text-white'>नया रिकॉर्ड</h2>
							<p className='text-slate-500 text-[10px] uppercase tracking-widest font-bold'>
								Step {currentIndex + 1} of {totalSteps}
							</p>
						</div>
					</div>
					<button
						onClick={onOpenChange}
						className='p-2 hover:bg-white/5 rounded-full text-slate-400'>
						<X />
					</button>
				</div>

				{/* Progress */}
				<div className='px-8 flex gap-1'>
					{Array.from({ length: totalSteps }).map((_, i) => (
						<div
							key={i}
							className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentIndex ? 'bg-blue-500' : 'bg-slate-800'}`}
						/>
					))}
				</div>

				{/* Body */}
				<div className='flex-1 overflow-y-auto p-8 custom-scrollbar'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentIndex}
							initial={{ x: 10, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -10, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='space-y-6'>
							{/* PAGE 0: General Info */}
							{currentIndex === 0 && (
								<div className='space-y-4'>
									<StepHeader
										icon={<Target className='text-blue-400' />}
										title='बुनियादी जानकारी'
										subtitle='बैठक का नाम, स्थान और उद्देश्य'
									/>
									<Input
										label='बैठक का नाम'
										placeholder='उदा. ग्राम सभा बैठक'
										value={formData.meetingName}
										onChange={(v) => updateField('meetingName', v)}
									/>
									<div className='grid grid-cols-2 gap-4'>
										<Input
											label='स्थान'
											value={formData.place}
											onChange={(v) => updateField('place', v)}
										/>
										<Input
											label='तारीख'
											type='date'
											value={formData.meetingDate}
											onChange={(v) => updateField('meetingDate', v)}
										/>
									</div>
									<TextArea
										label='उद्देश्य (Aim)'
										value={formData.aim}
										onChange={(v) => updateField('aim', v)}
									/>
								</div>
							)}

							{/* DYNAMIC PAGES: Charcha */}
							{currentIndex > 0 &&
								currentIndex <= totalCharcha &&
								(() => {
									const idx = currentIndex - 1;
									return (
										<div className='space-y-4'>
											<StepHeader
												icon={<BookOpen className='text-emerald-400' />}
												title={`चर्चा बिन्दु #${idx + 1}`}
												subtitle='विषय का विवरण और प्राप्त निष्कर्ष'
											/>
											<Input
												label='शीर्षक (Title)'
												value={formData.charcha[idx].title}
												onChange={(v) => updateCharcha(idx, 'title', v)}
											/>
											<TextArea
												label='विवरण (Details)'
												rows={5}
												value={formData.charcha[idx].details}
												onChange={(v) => updateCharcha(idx, 'details', v)}
											/>
											<Input
												label='निष्कर्ष (Findings)'
												value={formData.charcha[idx].findings}
												onChange={(v) => updateCharcha(idx, 'findings', v)}
											/>

											{currentIndex === totalCharcha && (
												<button
													onClick={() =>
														addMore('charcha', {
															title: '',
															details: '',
															findings: '',
														})
													}
													className='w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-400/50 transition-all flex items-center justify-center gap-2 text-sm font-bold'>
													<Plus size={18} /> एक और चर्चा जोड़ें
												</button>
											)}
										</div>
									);
								})()}

							{/* DYNAMIC PAGES: Interventions */}
							{currentIndex > totalCharcha &&
								currentIndex <= totalCharcha + totalInterventions &&
								(() => {
									const idx = currentIndex - totalCharcha - 1;
									return (
										<div className='space-y-4'>
											<StepHeader
												icon={<ClipboardList className='text-orange-400' />}
												title={`हस्तक्षेप रणनीति #${idx + 1}`}
												subtitle='भविष्य की कार्ययोजना का विवरण'
											/>
											<TextArea
												label='रणनीति का विवरण'
												rows={6}
												value={formData.interventionStrategy[idx]}
												onChange={(v) =>
													updateListItem('interventionStrategy', idx, v)
												}
											/>

											{currentIndex === totalCharcha + totalInterventions && (
												<button
													onClick={() => addMore('interventionStrategy', '')}
													className='w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-orange-400 hover:border-orange-400/50 transition-all flex items-center justify-center gap-2 text-sm font-bold'>
													<Plus size={18} /> एक और रणनीति जोड़ें
												</button>
											)}
										</div>
									);
								})()}

							{/* PAGE: Decisions */}
							{currentIndex === totalSteps - 2 && (
								<div className='space-y-4'>
									<StepHeader
										icon={<ListChecks className='text-purple-400' />}
										title='अंतिम निर्णय'
										subtitle='बैठक में लिए गए मुख्य निर्णय'
									/>
									{formData.decisions.map((d, i) => (
										<div key={i} className='flex gap-2'>
											<input
												className='flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-white'
												placeholder={`निर्णय ${i + 1}`}
												value={d}
												onChange={(e) =>
													updateListItem('decisions', i, e.target.value)
												}
											/>
											<button
												onClick={() =>
													updateField(
														'decisions',
														formData.decisions.filter((_, idx) => idx !== i),
													)
												}
												className='p-3 text-slate-500 hover:text-red-400'>
												<Trash2 size={20} />
											</button>
										</div>
									))}
									<button
										onClick={() => addMore('decisions', '')}
										className='text-blue-400 font-bold text-sm flex items-center gap-2'>
										<Plus size={16} /> निर्णय जोड़ें
									</button>
								</div>
							)}

							{/* PAGE: Visibility */}
							{currentIndex === totalSteps - 1 && (
								<div className='space-y-6'>
									<StepHeader
										icon={<Eye className='text-blue-400' />}
										title='पब्लिश सेटिंग्स'
										subtitle='यह जानकारी कौन देख सकता है?'
									/>
									<div className='grid grid-cols-1 gap-3'>
										{['Public', 'Admin Only', 'Members Only'].map((option) => (
											<div
												key={option}
												onClick={() => updateField('visibilityGroups', option)}
												className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.visibilityGroups === option ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 bg-slate-800/40'}`}>
												<p
													className={`font-bold ${formData.visibilityGroups === option ? 'text-blue-400' : 'text-slate-400'}`}>
													{option}
												</p>
											</div>
										))}
									</div>
								</div>
							)}
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Footer */}
				<div className='p-6 flex justify-between items-center bg-slate-950/50'>
					<button
						onClick={handlePrev}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:bg-white/5'}`}>
						<ChevronLeft size={20} /> पीछे
					</button>

					{currentIndex < totalSteps - 1 ? (
						<button
							onClick={handleNext}
							className='flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95'>
							आगे <ChevronRight size={20} />
						</button>
					) : (
						<button
							onClick={saveMeetingDetails}
							className='flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95'>
							<Save size={20} /> सेव करें
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

// Reusable Components to keep UI clean
const StepHeader = ({ icon, title, subtitle }) => (
	<div className='mb-8'>
		<div className='flex items-center gap-3 mb-2'>
			{icon}
			<h3 className='text-xl font-bold text-white'>{title}</h3>
		</div>
		<p className='text-slate-400 text-sm'>{subtitle}</p>
	</div>
);

const Input = ({ label, ...props }) => (
	<div className='space-y-1.5 flex-1'>
		<label className='text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1'>
			{label}
		</label>
		<input
			{...props}
			className='w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 focus:bg-slate-800 outline-none transition-all'
		/>
	</div>
);

const TextArea = ({ label, ...props }) => (
	<div className='space-y-1.5'>
		<label className='text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1'>
			{label}
		</label>
		<textarea
			{...props}
			className='w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 focus:bg-slate-800 outline-none transition-all resize-none'
		/>
	</div>
);

export default AddMeetingDetails;
