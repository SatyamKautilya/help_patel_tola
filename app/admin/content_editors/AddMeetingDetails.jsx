'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
	UserPlus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddMeetingDetails = ({ isOpen, onOpenChange, onSuccess }) => {
	const thisUser = useSelector((state) => state.appContext.user);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [villages, setVillages] = useState([]);

	const getVillages = async () => {
		const resp = await fetch('/api/query/database?name=getVillagesList', {
			method: 'GET',
		});
		const data = await resp.json();
		return data.villages;
	};

	useEffect(() => {
		getVillages().then((villages) => {
			setVillages(
				villages.filter((v) =>
					thisUser?.taggedVillage?.includes(v.villageCode),
				),
			);
		});
	}, [thisUser]);

	const [formData, setFormData] = useState({
		meetingName: '',
		theme: 'education',
		meetingDate: '', // Initialized as empty for validation
		place: '',
		aim: '',
		charcha: [{ title: '', details: '', findings: '' }],
		interventionStrategy: [''],
		decisions: [''],
		suggestionsFromAttendees: [],
		visibilityGroups: [],
	});

	if (!isOpen) return null;

	const totalCharcha = formData.charcha.length;
	const totalInterventions = formData.interventionStrategy.length;
	const totalAttendees = formData.suggestionsFromAttendees.length;

	const totalSteps =
		1 + totalCharcha + totalInterventions + 1 + totalAttendees + 1;

	// --- 🛡️ Validation Logic ---
	const isStepValid = () => {
		// Step 0: General Info
		if (currentIndex === 0) {
			return (
				formData.meetingName &&
				formData.place &&
				formData.meetingDate &&
				formData.aim
			);
		}
		// Steps 1 to N: Charcha
		if (currentIndex > 0 && currentIndex <= totalCharcha) {
			const item = formData.charcha[currentIndex - 1];
			return item.title && item.details && item.findings;
		}
		// Steps N+1 to M: Interventions
		if (
			currentIndex > totalCharcha &&
			currentIndex <= totalCharcha + totalInterventions
		) {
			return (
				formData.interventionStrategy[
					currentIndex - totalCharcha - 1
				].trim() !== ''
			);
		}
		// Step M+1: Decisions
		if (currentIndex === totalCharcha + totalInterventions + 1) {
			return (
				formData.decisions.length > 0 &&
				formData.decisions.every((d) => d.trim() !== '')
			);
		}
		// Steps M+2 to K: Attendees
		if (
			currentIndex > totalCharcha + totalInterventions + 1 &&
			currentIndex <= totalCharcha + totalInterventions + 1 + totalAttendees
		) {
			const attendee =
				formData.suggestionsFromAttendees[
					currentIndex - (totalCharcha + totalInterventions + 2)
				];
			return attendee.name && attendee.suggestion;
		}
		// Final Step: Visibility
		if (currentIndex === totalSteps - 1) {
			return formData.visibilityGroups.length > 0;
		}
		return true;
	};

	const handleNext = () => {
		if (!isStepValid()) {
			alert('कृपया आगे बढ़ने से पहले सभी जानकारी भरें।');
			return;
		}
		currentIndex < totalSteps - 1 && setCurrentIndex(currentIndex + 1);
	};

	const handlePrev = () =>
		currentIndex > 0 && setCurrentIndex(currentIndex - 1);

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

	const updateAttendee = (index, key, value) => {
		const newList = [...formData.suggestionsFromAttendees];
		newList[index][key] = value;
		updateField('suggestionsFromAttendees', newList);
	};

	const addMore = (field, defaultValue) => {
		updateField(field, [...formData[field], defaultValue]);
	};

	const saveMeetingDetails = () => {
		if (!isStepValid()) {
			alert('कृपया कम से कम एक गांव (Visibility Group) चुनें।');
			return;
		}

		fetch('/api/query/database?name=add-meeting-details', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				meetingDetails: {
					...formData,
					executionPlan30Days: formData.interventionStrategy,
					updatedBy: thisUser?.name || 'admin',
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert('त्रुटि: ' + data.error);
				} else {
					alert('बैठक विवरण सफलतापूर्वक सहेजे गए।');
					onSuccess();
					onOpenChange();
				}
			})
			.catch((error) => {
				alert('सर्वर त्रुटि: ' + error.message);
			});
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4'>
			<div className='bg-slate-900 border border-white/10 w-full max-w-2xl min-h-[550px] max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col'>
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

				{/* Progress Bar */}
				<div className='px-8 flex gap-1'>
					{Array.from({ length: totalSteps }).map((_, i) => (
						<div
							key={i}
							className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentIndex ? 'bg-blue-500' : 'bg-slate-800'}`}
						/>
					))}
				</div>

				<div className='flex-1 overflow-y-auto p-8 custom-scrollbar'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentIndex}
							initial={{ x: 10, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -10, opacity: 0 }}
							className='space-y-6'>
							{currentIndex === 0 && (
								<div className='space-y-4'>
									<StepHeader
										icon={<Target className='text-blue-400' />}
										title='बुनियादी जानकारी'
										subtitle='बैठक का नाम और स्थान (सभी अनिवार्य)'
									/>
									<Input
										label='बैठक का नाम *'
										value={formData.meetingName}
										onChange={(e) => updateField('meetingName', e.target.value)}
									/>
									<div className='grid grid-cols-2 gap-4'>
										<Input
											label='स्थान *'
											value={formData.place}
											onChange={(e) => updateField('place', e.target.value)}
										/>
										<Input
											label='तारीख *'
											type='date'
											value={formData.meetingDate}
											onChange={(e) =>
												updateField('meetingDate', e.target.value)
											}
										/>
									</div>
									<TextArea
										label='उद्देश्य (Aim) *'
										value={formData.aim}
										onChange={(e) => updateField('aim', e.target.value)}
									/>
								</div>
							)}

							{currentIndex > 0 &&
								currentIndex <= totalCharcha &&
								(() => {
									const idx = currentIndex - 1;
									return (
										<div className='space-y-4'>
											<StepHeader
												icon={<BookOpen className='text-emerald-400' />}
												title={`चर्चा बिन्दु #${idx + 1}`}
												subtitle='विषय का पूरा विवरण भरें'
											/>
											<Input
												label='शीर्षक (Title) *'
												value={formData.charcha[idx].title}
												onChange={(e) =>
													updateCharcha(idx, 'title', e.target.value)
												}
											/>
											<TextArea
												label='विवरण (Details) *'
												rows={5}
												value={formData.charcha[idx].details}
												onChange={(e) =>
													updateCharcha(idx, 'details', e.target.value)
												}
											/>
											<Input
												label='निष्कर्ष (Findings) *'
												value={formData.charcha[idx].findings}
												onChange={(e) =>
													updateCharcha(idx, 'findings', e.target.value)
												}
											/>
											{currentIndex === totalCharcha && (
												<AddMoreButton
													onClick={() =>
														addMore('charcha', {
															title: '',
															details: '',
															findings: '',
														})
													}
													label='एक और चर्चा जोड़ें'
												/>
											)}
										</div>
									);
								})()}

							{currentIndex > totalCharcha &&
								currentIndex <= totalCharcha + totalInterventions &&
								(() => {
									const idx = currentIndex - totalCharcha - 1;
									return (
										<div className='space-y-4'>
											<StepHeader
												icon={<ClipboardList className='text-orange-400' />}
												title={`हस्तक्षेप रणनीति #${idx + 1}`}
												subtitle='रणनीति का विवरण अनिवार्य है'
											/>
											<TextArea
												label='रणनीति का विवरण *'
												rows={6}
												value={formData.interventionStrategy[idx]}
												onChange={(e) =>
													updateListItem(
														'interventionStrategy',
														idx,
														e.target.value,
													)
												}
											/>
											{currentIndex === totalCharcha + totalInterventions && (
												<AddMoreButton
													onClick={() => addMore('interventionStrategy', '')}
													label='एक और रणनीति जोड़ें'
												/>
											)}
										</div>
									);
								})()}

							{currentIndex === totalCharcha + totalInterventions + 1 && (
								<div className='space-y-4'>
									<StepHeader
										icon={<ListChecks className='text-purple-400' />}
										title='अंतिम निर्णय'
										subtitle='कम से कम एक निर्णय लिखें'
									/>
									{formData.decisions.map((d, i) => (
										<div key={i} className='flex gap-2'>
											<input
												className='flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-white'
												value={d}
												onChange={(e) =>
													updateListItem('decisions', i, e.target.value)
												}
											/>
											{formData.decisions.length > 1 && (
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
											)}
										</div>
									))}
									<button
										onClick={() => addMore('decisions', '')}
										className='text-blue-400 font-bold text-sm flex items-center gap-2 mt-2'>
										<Plus size={16} /> निर्णय जोड़ें
									</button>
								</div>
							)}

							{currentIndex > totalCharcha + totalInterventions + 1 &&
								currentIndex <=
									totalCharcha + totalInterventions + 1 + totalAttendees &&
								(() => {
									const idx =
										currentIndex - (totalCharcha + totalInterventions + 2);
									return (
										<div className='space-y-4'>
											<StepHeader
												icon={<UserPlus className='text-pink-400' />}
												title={`उपस्थित सदस्य #${idx + 1}`}
												subtitle='सदस्य और सुझाव भरें'
											/>
											<Input
												label='सदस्य का नाम *'
												value={formData.suggestionsFromAttendees[idx].name}
												onChange={(e) =>
													updateAttendee(idx, 'name', e.target.value)
												}
											/>
											<TextArea
												label='सुझाव (Suggestion) *'
												rows={5}
												value={
													formData.suggestionsFromAttendees[idx].suggestion
												}
												onChange={(e) =>
													updateAttendee(idx, 'suggestion', e.target.value)
												}
											/>
											{currentIndex ===
												totalCharcha +
													totalInterventions +
													1 +
													totalAttendees && (
												<AddMoreButton
													onClick={() =>
														addMore('suggestionsFromAttendees', {
															name: '',
															suggestion: '',
														})
													}
													label='एक और सदस्य जोड़ें'
												/>
											)}
										</div>
									);
								})()}

							{currentIndex === totalSteps - 1 && (
								<div className='space-y-6'>
									<StepHeader
										icon={<Eye className='text-blue-400' />}
										title='पब्लिश सेटिंग्स'
										subtitle='कम से कम एक गांव चुनें *'
									/>
									<div className='grid grid-cols-1 gap-3'>
										{villages.map((option) => (
											<div
												key={option.villageCode}
												onClick={() =>
													updateField(
														'visibilityGroups',
														formData.visibilityGroups.includes(
															option.villageCode,
														)
															? formData.visibilityGroups.filter(
																	(v) => v !== option.villageCode,
																)
															: [
																	...formData.visibilityGroups,
																	option.villageCode,
																],
													)
												}
												className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.visibilityGroups.includes(option.villageCode) ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 bg-slate-800/40'}`}>
												<p
													className={`font-bold ${formData.visibilityGroups.includes(option.villageCode) ? 'text-blue-400' : 'text-slate-400'}`}>
													{option.villageName}
												</p>
											</div>
										))}
									</div>
								</div>
							)}
						</motion.div>
					</AnimatePresence>
				</div>

				<div className='p-6 flex justify-between items-center bg-slate-950/50'>
					<button
						onClick={handlePrev}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:bg-white/5'}`}>
						<ChevronLeft size={20} /> पीछे
					</button>
					{currentIndex < totalSteps - 1 ? (
						<button
							onClick={handleNext}
							className='flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all'>
							आगे <ChevronRight size={20} />
						</button>
					) : (
						<button
							onClick={saveMeetingDetails}
							className='flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all'>
							<Save size={20} /> सेव करें
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

const StepHeader = ({ icon, title, subtitle }) => (
	<div className='mb-6'>
		<div className='flex items-center gap-3 mb-2'>
			{icon}
			<h3 className='text-xl font-bold text-white'>{title}</h3>
		</div>
		<p className='text-slate-400 text-sm'>{subtitle}</p>
	</div>
);
const AddMoreButton = ({ onClick, label }) => (
	<button
		onClick={onClick}
		className='w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-400/50 transition-all flex items-center justify-center gap-2 text-sm font-bold mt-4'>
		<Plus size={18} /> {label}
	</button>
);
const Input = ({ label, onChange, ...props }) => (
	<div className='space-y-1.5 flex-1'>
		<label className='text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1'>
			{label}
		</label>
		<input
			onChange={onChange}
			{...props}
			className='w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all'
		/>
	</div>
);
const TextArea = ({ label, onChange, ...props }) => (
	<div className='space-y-1.5'>
		<label className='text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1'>
			{label}
		</label>
		<textarea
			onChange={onChange}
			{...props}
			className='w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all resize-none'
		/>
	</div>
);

export default AddMeetingDetails;
