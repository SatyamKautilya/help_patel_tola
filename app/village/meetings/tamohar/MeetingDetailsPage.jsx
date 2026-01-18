import React from 'react';
import {
	Calendar,
	MapPin,
	Target,
	MessageSquare,
	CheckCircle,
	Rocket,
	Lightbulb,
	Users,
} from 'lucide-react';

const MeetingDetailPage = ({ data }) => {
	// Theme Color Mapping
	const themeColors = {
		education: 'bg-blue-100 text-blue-700 border-blue-200',
		health: 'bg-emerald-100 text-emerald-700 border-emerald-200',
		moral_value: 'bg-purple-100 text-purple-700 border-purple-200',
		economy: 'bg-amber-100 text-amber-700 border-amber-200',
		employment: 'bg-rose-100 text-rose-700 border-rose-200',
	};

	return (
		<div className='max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen font-sans text-slate-900'>
			{/* Header Section */}
			<header className='bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-6'>
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
					<div>
						<span
							className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${themeColors[data.theme] || 'bg-slate-100'}`}>
							{data.theme.replace('_', ' ')}
						</span>
						<h1 className='text-3xl font-extrabold mt-3 text-slate-800'>
							{data.meetingName}
						</h1>
					</div>

					<div className='flex flex-wrap gap-4 text-sm text-slate-600'>
						<div className='flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg'>
							<Calendar size={18} className='text-slate-400' />
							<span>
								{new Date(data.meetingDate).toLocaleDateString('hi-IN')}
							</span>
						</div>
						<div className='flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg'>
							<MapPin size={18} className='text-slate-400' />
							<span>{data.place}</span>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100'>
					<Target className='text-blue-600 mt-1 shrink-0' size={20} />
					<div>
						<p className='text-xs font-bold text-blue-600 uppercase tracking-tight'>
							Meeting Objective (उद्देश्य)
						</p>
						<p className='text-slate-700 leading-relaxed'>{data.aim}</p>
					</div>
				</div>
			</header>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Left Column: Discussions & Execution */}
				<div className='lg:col-span-2 space-y-6'>
					{/* Discussion Section */}
					<section>
						<div className='flex items-center gap-2 mb-4'>
							<MessageSquare className='text-slate-400' size={20} />
							<h2 className='text-xl font-bold'>चर्चा (Discussion)</h2>
						</div>
						<div className='space-y-4'>
							{data.charcha.map((item, index) => (
								<div
									key={index}
									className='bg-white p-5 rounded-xl border-l-4 border-l-blue-500 shadow-sm border border-slate-200'>
									<h3 className='font-bold text-lg text-slate-800 mb-2'>
										{item.title}
									</h3>
									<p className='text-slate-600 text-sm leading-relaxed mb-3'>
										{item.details}
									</p>
									{item.findings && (
										<div className='bg-slate-50 p-3 rounded-lg text-sm italic text-slate-500'>
											<strong>Findings:</strong> {item.findings}
										</div>
									)}
								</div>
							))}
						</div>
					</section>

					{/* Execution Plan */}
					<section className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
						<div className='flex items-center gap-2 mb-4'>
							<Rocket className='text-orange-500' size={20} />
							<h2 className='text-xl font-bold'>30-Day Execution Plan</h2>
						</div>
						<ul className='space-y-3'>
							{data.executionPlan30Days.map((step, index) => (
								<li key={index} className='flex gap-3 items-start'>
									<span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs font-bold'>
										{index + 1}
									</span>
									<p className='text-slate-700'>{step}</p>
								</li>
							))}
						</ul>
					</section>
				</div>

				{/* Right Column: Decisions, Suggestions & Attendees */}
				<div className='space-y-6'>
					{/* Decisions */}
					<section className='bg-slate-800 text-white p-6 rounded-2xl shadow-lg'>
						<div className='flex items-center gap-2 mb-4'>
							<CheckCircle className='text-emerald-400' size={20} />
							<h2 className='text-xl font-bold'>Decisions Made</h2>
						</div>
						<ul className='space-y-3'>
							{data.decisions.map((decision, index) => (
								<li
									key={index}
									className='flex items-start gap-2 text-slate-300 text-sm'>
									<div className='h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0' />
									{decision}
								</li>
							))}
						</ul>
					</section>

					{/* Suggestions */}
					<section className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
						<div className='flex items-center gap-2 mb-4'>
							<Lightbulb className='text-amber-500' size={20} />
							<h2 className='text-lg font-bold'>Attendee Suggestions</h2>
						</div>
						<div className='space-y-4'>
							{data.suggestionsFromAttendees.map((sug, index) => (
								<div
									key={index}
									className='border-b border-slate-100 last:border-0 pb-3 last:pb-0'>
									<p className='text-xs font-bold text-slate-500 mb-1'>
										{sug.name}
									</p>
									<p className='text-sm text-slate-700 italic'>
										"{sug.suggestion}"
									</p>
								</div>
							))}
						</div>
					</section>

					{/* Attendees List */}
					<section className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
						<div className='flex items-center gap-2 mb-4'>
							<Users className='text-slate-400' size={20} />
							<h2 className='text-lg font-bold'>Attendees</h2>
						</div>
						<div className='flex flex-wrap gap-2'>
							{data.attendees.map((person, index) => (
								<span
									key={index}
									className='bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-medium'>
									{person}
								</span>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default MeetingDetailPage;
