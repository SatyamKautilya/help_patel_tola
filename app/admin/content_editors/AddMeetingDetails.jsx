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
	Users,
} from 'lucide-react';

const AddMeetingDetails = ({ isOpen, onOpenChange, onSuccess }) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		meetingName: '',
		theme: 'education',
		meetingDate: '',
		place: '',
		aim: '',
		charcha: [{ title: '', details: '', findings: '' }],
		interventionStrategy: [''],
		decisions: [''],
		executionPlan30Days: [''],
		suggestionsFromAttendees: [{ name: '', suggestion: '' }],
		attendees: [''],
		visibilityGroups: 'public',
	});

	if (!isOpen) return null;

	const nextStep = () => setStep((s) => s + 1);
	const prevStep = () => setStep((s) => s - 1);

	// Helper to update arrays of objects
	const updateArrayOfObjects = (field, index, key, value) => {
		const updated = [...formData[field]];
		updated[index][key] = value;
		setFormData({ ...formData, [field]: updated });
	};

	// Helper to add/remove rows
	const addRow = (field, template) =>
		setFormData({ ...formData, [field]: [...formData[field], template] });
	const removeRow = (field, index) => {
		const updated = formData[field].filter((_, i) => i !== index);
		setFormData({ ...formData, [field]: updated });
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'>
			<div className='bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col'>
				{/* Modal Header */}
				<div className='p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50'>
					<div>
						<h2 className='text-xl font-bold text-white flex items-center gap-2'>
							<Layout className='text-blue-500' size={20} />
							नई बैठक जोड़ें (Add New Meeting)
						</h2>
						<p className='text-slate-400 text-xs mt-1'>
							Step {step} of 4: {getStepTitle(step)}
						</p>
					</div>
					<button
						onClick={onOpenChange}
						className='text-slate-400 hover:text-white transition'>
						<X size={24} />
					</button>
				</div>

				{/* Progress Bar */}
				<div className='w-full bg-slate-800 h-1'>
					<div
						className='bg-blue-600 h-full transition-all duration-300'
						style={{ width: `${(step / 4) * 100}%` }}
					/>
				</div>

				{/* Form Body */}
				<div className='flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar'>
					{/* STEP 1: General Info */}
					{step === 1 && (
						<div className='space-y-4 animate-in fade-in slide-in-from-right-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-1'>
									<label className='text-xs font-semibold text-slate-400 uppercase'>
										Meeting Name
									</label>
									<input
										type='text'
										className='w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none'
										placeholder='तमोहर - बैठक 2'
									/>
								</div>
								<div className='space-y-1'>
									<label className='text-xs font-semibold text-slate-400 uppercase'>
										Theme
									</label>
									<select className='w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none'>
										<option value='education'>शिक्षा</option>
										<option value='health'>स्वास्थ्य</option>
										<option value='economy'>अर्थव्यवस्था</option>
									</select>
								</div>
							</div>
							<div className='space-y-1'>
								<label className='text-xs font-semibold text-slate-400 uppercase'>
									उद्देश्य (Aim)
								</label>
								<textarea
									rows='3'
									className='w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none'
									placeholder='बैठक का मुख्य उद्देश्य...'
								/>
							</div>
						</div>
					)}

					{/* STEP 2: Charcha (Discussions) */}
					{step === 2 && (
						<div className='space-y-6 animate-in fade-in'>
							<div className='flex flex-col gap-4 justify-between items-center'>
								<h3 className='text-sm font-bold text-blue-400 flex items-center gap-2'>
									<BookOpen size={16} /> चर्चा के विषय (Discussion Points)
								</h3>
								{formData.charcha.map((item, idx) => (
									<div
										key={idx}
										className='p-4 w-full bg-slate-800/50 border border-slate-700 rounded-xl space-y-3 relative'>
										<input
											className='bg-slate-900/50  text-lg font-bold w-full outline-none placeholder:text-slate-600'
											placeholder='शीर्षक (Title)'
											value={item.title}
											onChange={(e) =>
												updateArrayOfObjects(
													'charcha',
													idx,
													'title',
													e.target.value,
												)
											}
										/>
										<textarea
											className='bg-slate-900/50  w-full text-sm text-slate-300 outline-none resize-none'
											placeholder='विवरण (Details)...'
											onChange={(e) =>
												updateArrayOfObjects(
													'charcha',
													idx,
													'details',
													e.target.value,
												)
											}
										/>
										<input
											className='bg-slate-900/50 p-2 rounded w-full text-xs text-emerald-400 outline-none border border-slate-700'
											placeholder='निष्कर्ष (Findings)'
											onChange={(e) =>
												updateArrayOfObjects(
													'charcha',
													idx,
													'findings',
													e.target.value,
												)
											}
										/>
										<button
											onClick={() => removeRow('charcha', idx)}
											className='absolute -top-4 -right-4 text-slate-600 hover:text-red-400'>
											<Trash2 size={16} />
										</button>
									</div>
								))}
								<button
									onClick={() =>
										addRow('charcha', { title: '', details: '', findings: '' })
									}
									className='text-xs bg-blue-600/10 text-blue-400 px-3 py-1 rounded hover:bg-blue-600/20 transition flex items-center gap-1'>
									<Plus size={14} /> अन्य चर्चा बिंदु जोड़ें
								</button>
							</div>
						</div>
					)}

					{/* STEP 3: Action Items */}
					{step === 3 && (
						<div className='space-y-6 animate-in fade-in'>
							<h3 className='text-sm font-bold text-orange-400 flex items-center gap-2'>
								<ClipboardList size={16} /> रणनीति एवं निर्णय (Strategy &
								Decisions)
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<label className='text-[10px] font-bold text-slate-500 uppercase'>
										हस्तक्षेप रणनीति
									</label>
									{formData.interventionStrategy.map((_, i) => (
										<input
											key={i}
											className='w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-white'
											placeholder='Strategy point...'
										/>
									))}
								</div>
								<div className='space-y-2'>
									<label className='text-[10px] font-bold text-slate-500 uppercase'>
										निर्णय (Decisions)
									</label>
									{formData.decisions.map((_, i) => (
										<input
											key={i}
											className='w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-white'
											placeholder='Decision point...'
										/>
									))}
								</div>
							</div>
						</div>
					)}

					{/* STEP 4: Attendees & Suggestions */}
					{step === 4 && (
						<div className='space-y-6 animate-in fade-in'>
							<div className='bg-slate-800/30 p-4 rounded-xl border border-slate-700'>
								<label className='text-xs font-bold text-slate-500 block mb-3 uppercase'>
									दृश्यता समूह
								</label>
								<div className='flex gap-4'>
									{['Admin Only', 'Public'].map((g) => (
										<label
											key={g}
											className='flex items-center gap-2 cursor-pointer'>
											<input
												type='radio'
												name='visibility'
												className='accent-blue-500'
											/>
											<span className='text-sm text-slate-300'>{g}</span>
										</label>
									))}
								</div>
							</div>
							<div className='space-y-3'>
								<label className='text-xs font-bold text-slate-500 flex items-center gap-2'>
									<Users size={14} /> उपस्थित लोग (Attendees)
								</label>
								<div className='flex flex-wrap gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700'>
									{/* This would be a tag input in a real app */}
									<input
										className='bg-transparent outline-none text-sm text-white'
										placeholder='Type name and press comma...'
									/>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Modal Footer */}
				<div className='p-6 border-t border-slate-800 bg-slate-900 flex justify-between items-center'>
					<button
						onClick={prevStep}
						disabled={step === 1}
						className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${step === 1 ? 'opacity-0' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
						<ChevronLeft size={18} /> पीछे
					</button>

					{step < 4 ? (
						<button
							onClick={nextStep}
							className='flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-900/20 transition'>
							आगे <ChevronRight size={18} />
						</button>
					) : (
						<button className='flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 transition'>
							<Save size={18} /> सेव करें
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

function getStepTitle(step) {
	const titles = [
		'सामान्य जानकारी',
		'चर्चा के बिंदु',
		'कार्य और रणनीति',
		'उपस्थित लोग और अंतिम रूप',
	];
	return titles[step - 1];
}

export default AddMeetingDetails;
