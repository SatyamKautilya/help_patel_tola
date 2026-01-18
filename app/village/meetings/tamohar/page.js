'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Calendar,
	MapPin,
	ChevronRight,
	X,
	CheckCircle2,
	Clock,
	Users,
	Target,
	MessageSquare,
} from 'lucide-react';

/* ---------------- MOCK DATA ---------------- */
const meetings = [
	{
		meetingId: 'TMH-MTG-2026-01',
		meetingType: 'मासिक मिशन मीटिंग',
		theme: 'स्वास्थ्य और कल्याण',
		date: '2026-01-15',
		location: {
			address: 'गाँव पंचायत हॉल',
			district: 'वाराणसी',
			state: 'उत्तर प्रदेश',
		},
		focusAreas: ['स्वास्थ्य', 'पोषण', 'स्वच्छता'],
		agenda: [
			'पिछले महीने की कार्रवाई की समीक्षा',
			'गाँव के स्वास्थ्य चुनौतियाँ',
		],
		discussionPoints: [
			{
				topic: 'बच्चों में कुपोषण',
				problemStatement: 'वार्ड 4 में कम वजन के मामले देखे गए',
				suggestions: ['नियमित स्वास्थ्य शिविर', 'माताओं के लिए पोषण जागरूकता'],
			},
		],
		decisionsTaken: [
			{
				decision: 'स्वास्थ्य शिविर का आयोजन करें',
				owner: 'स्वास्थ्य टीम',
				deadline: '2026-02-10',
			},
		],
		actionItems: [
			{
				task: 'PHC के साथ समन्वय करें',
				assignedTo: 'रवि सिंह',
				status: 'लंबित',
			},
			{
				task: 'आयरन टैबलेट का वितरण',
				assignedTo: 'सुमन देवी',
				status: 'पूर्ण',
			},
		],
	},
	{
		meetingId: 'TMH-MTG-2026-01',
		meetingType: 'मासिक मिशन मीटिंग',
		theme: 'स्वास्थ्य और कल्याण',
		date: '2026-01-15',
		location: {
			address: 'गाँव पंचायत हॉल',
			district: 'वाराणसी',
			state: 'उत्तर प्रदेश',
		},
		focusAreas: ['स्वास्थ्य', 'पोषण', 'स्वच्छता'],
		agenda: [
			'पिछले महीने की कार्रवाई की समीक्षा',
			'गाँव के स्वास्थ्य चुनौतियाँ',
		],
		discussionPoints: [
			{
				topic: 'बच्चों में कुपोषण',
				problemStatement: 'वार्ड 4 में कम वजन के मामले देखे गए',
				suggestions: ['नियमित स्वास्थ्य शिविर', 'माताओं के लिए पोषण जागरूकता'],
			},
		],
		decisionsTaken: [
			{
				decision: 'स्वास्थ्य शिविर का आयोजन करें',
				owner: 'स्वास्थ्य टीम',
				deadline: '2026-02-10',
			},
		],
		actionItems: [
			{
				task: 'PHC के साथ समन्वय करें',
				assignedTo: 'रवि सिंह',
				status: 'लंबित',
			},
			{
				task: 'आयरन टैबलेट का वितरण',
				assignedTo: 'सुमन देवी',
				status: 'पूर्ण',
			},
		],
	},
];

/* ---------------- MAIN PAGE ---------------- */
export default function MeetingsPage() {
	const [selectedMeeting, setSelectedMeeting] = useState(null);

	return (
		<div className='min-h-screen bg-[#FBFBFE] text-slate-900'>
			<div className='max-w-6xl mx-auto px-6 py-12'>
				{/* Header */}
				<header className='mb-12'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}>
						<h1 className='text-4xl font-black tracking-tight text-slate-900'>
							बैठक <span className='text-blue-600'>संकलन</span>
						</h1>
						<p className='text-slate-500 mt-2 font-medium'>
							मिशन तमोहर में लिए गए निर्णयों और कार्य प्रगति की निगरानी
						</p>
					</motion.div>
				</header>

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
					{/* List View */}
					<div className='lg:col-span-5 space-y-4'>
						<h3 className='text-sm font-bold uppercase tracking-widest text-slate-400 mb-4'>
							पिछली बैठकें
						</h3>
						{meetings.map((meeting) => (
							<MeetingCard
								key={meeting.meetingId}
								meeting={meeting}
								isActive={selectedMeeting?.meetingId === meeting.meetingId}
								onClick={() => setSelectedMeeting(meeting)}
							/>
						))}
					</div>

					{/* Detail View Container */}
					<div className='lg:col-span-7 relative'>
						<AnimatePresence mode='wait'>
							{selectedMeeting ? (
								<MeetingDetails
									key={selectedMeeting.meetingId}
									meeting={selectedMeeting}
									onClose={() => setSelectedMeeting(null)}
								/>
							) : (
								<EmptyState />
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	);
}

/* ---------------- COMPONENTS ---------------- */

function MeetingCard({ meeting, onClick, isActive }) {
	return (
		<motion.div
			whileHover={{ x: 5 }}
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className={`cursor-pointer p-5 rounded-3xl border transition-all duration-300 ${
				isActive
					? 'bg-white border-blue-200 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/10'
					: 'bg-white/50 border-slate-100 hover:bg-white hover:border-slate-200'
			}`}>
			<div className='flex items-center gap-3 text-xs font-bold text-blue-600 mb-3'>
				<Calendar className='w-3.5 h-3.5' />
				{new Date(meeting.date).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				})}
			</div>
			<h2 className='text-lg font-bold text-slate-800 leading-tight'>
				{meeting.theme}
			</h2>
			<div className='mt-4 flex items-center justify-between'>
				<div className='flex items-center text-slate-500 text-xs'>
					<MapPin className='w-3 h-3 mr-1' />
					{meeting.location.district}
				</div>
				<ChevronRight
					className={`w-5 h-5 transition-transform ${isActive ? 'translate-x-1 text-blue-500' : 'text-slate-300'}`}
				/>
			</div>
		</motion.div>
	);
}

function MeetingDetails({ meeting, onClose }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className='bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden sticky top-8'>
			{/* Detail Header */}
			<div className='bg-slate-900 p-8 text-white relative'>
				<button
					onClick={onClose}
					className='absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors'>
					<X className='w-5 h-5' />
				</button>
				<div className='flex items-center gap-2 mb-4'>
					{meeting.focusAreas.map((area) => (
						<span
							key={area}
							className='text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-lg border border-blue-500/30'>
							{area}
						</span>
					))}
				</div>
				<h2 className='text-3xl font-black mb-2'>{meeting.theme}</h2>
				<p className='text-slate-400 text-sm flex items-center gap-2'>
					<Users className='w-4 h-4' /> {meeting.meetingType}
				</p>
			</div>

			<div className='p-8 space-y-10'>
				{/* Agenda & Decisions */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<DetailSection
						title='Meeting Agenda'
						icon={<Target className='text-blue-500' />}>
						<ul className='space-y-3'>
							{meeting.agenda.map((item, i) => (
								<li key={i} className='flex gap-3 text-sm text-slate-600'>
									<span className='text-blue-500 font-bold'>0{i + 1}.</span>{' '}
									{item}
								</li>
							))}
						</ul>
					</DetailSection>

					<DetailSection
						title='Key Decisions'
						icon={<CheckCircle2 className='text-emerald-500' />}>
						<div className='space-y-3'>
							{meeting.decisionsTaken.map((d, i) => (
								<div
									key={i}
									className='p-3 bg-emerald-50 rounded-2xl border border-emerald-100'>
									<p className='text-sm font-bold text-emerald-900'>
										{d.decision}
									</p>
									<p className='text-[10px] text-emerald-600 uppercase mt-1'>
										Lead: {d.owner}
									</p>
								</div>
							))}
						</div>
					</DetailSection>
				</div>

				<hr className='border-slate-100' />

				{/* Discussion Points */}
				<DetailSection
					title='Critical Discussions'
					icon={<MessageSquare className='text-purple-500' />}>
					{meeting.discussionPoints.map((d, i) => (
						<div key={i} className='mb-6 last:mb-0'>
							<h4 className='font-bold text-slate-800 text-base mb-1'>
								{d.topic}
							</h4>
							<p className='text-sm text-slate-500 mb-3'>
								{d.problemStatement}
							</p>
							<div className='flex flex-wrap gap-2'>
								{d.suggestions.map((s, j) => (
									<span
										key={j}
										className='text-[11px] font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full'>
										💡 {s}
									</span>
								))}
							</div>
						</div>
					))}
				</DetailSection>

				{/* Action Items */}
				<DetailSection
					title='Next Steps'
					icon={<Clock className='text-orange-500' />}>
					<div className='space-y-3'>
						{meeting.actionItems.map((a, i) => (
							<div
								key={i}
								className='flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30'>
								<div>
									<p className='text-sm font-bold text-slate-800'>{a.task}</p>
									<p className='text-xs text-slate-500'>
										Assigned to {a.assignedTo}
									</p>
								</div>
								<span
									className={`text-[10px] font-bold px-2 py-1 rounded-md ${
										a.status === 'Completed'
											? 'bg-emerald-100 text-emerald-700'
											: 'bg-orange-100 text-orange-700'
									}`}>
									{a.status}
								</span>
							</div>
						))}
					</div>
				</DetailSection>
			</div>
		</motion.div>
	);
}

function DetailSection({ title, icon, children }) {
	return (
		<div>
			<div className='flex items-center gap-2 mb-4'>
				<div className='p-1.5 bg-slate-50 rounded-lg'>{icon}</div>
				<h3 className='text-sm font-black uppercase tracking-widest text-slate-400'>
					{title}
				</h3>
			</div>
			{children}
		</div>
	);
}

function EmptyState() {
	return (
		<div className='h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem]'>
			<div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
				<Target className='w-8 h-8 text-slate-300' />
			</div>
			<h3 className='text-lg font-bold text-slate-400'>Select a meeting</h3>
			<p className='text-sm text-slate-400 max-w-[200px]'>
				Choose a session from the list to view detailed minutes and actions.
			</p>
		</div>
	);
}
