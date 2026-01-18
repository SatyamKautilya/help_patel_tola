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
	const themeBadgeColors = {
		education: 'from-blue-600 to-blue-400',
		health: 'from-emerald-600 to-emerald-400',
		moral_value: 'from-purple-600 to-purple-400',
		economy: 'from-amber-600 to-amber-400',
		employment: 'from-rose-600 to-rose-400',
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-6 font-sans text-slate-900'>
			<div className='max-w-6xl mx-auto'>
				{/* Header Section */}
				<header className='bg-white rounded-3xl p-8 shadow-lg border border-slate-200 mb-8'>
					<div className='flex flex-col md:flex-row md:items-start justify-between gap-6'>
						<div className='flex-1'>
							<div
								className={`inline-flex bg-gradient-to-r ${themeBadgeColors[data.theme] || 'from-slate-600 to-slate-500'} text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg mb-4`}>
								{data.theme.replace('_', ' ')}
							</div>
							<h1 className='text-4xl md:text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2'>
								{data.meetingName}
							</h1>
						</div>

						<div className='flex flex-col gap-3'>
							<div className='flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-xl border border-blue-200 hover:shadow-md transition-shadow'>
								<Calendar size={20} className='text-blue-600' />
								<span className='font-semibold text-slate-700'>
									{new Date(data.meetingDate).toLocaleString('hi-IN', {
										month: 'long',
										day: 'numeric',
										year: 'numeric',
									})}
								</span>
							</div>
							<div className='flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-100 px-4 py-3 rounded-xl border border-emerald-200 hover:shadow-md transition-shadow'>
								<MapPin size={20} className='text-rose-600' />
								<span className='font-semibold text-slate-700'>
									{data.place}
								</span>
							</div>
						</div>
					</div>

					<div className='mt-8 flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-sm'>
						<Target className='text-blue-600 mt-1 shrink-0' size={24} />
						<div>
							<p className='text-xs font-black text-blue-600 uppercase tracking-tight mb-2'>
								📍बैठक का उद्देश्य
							</p>
							<p className='text-slate-800 leading-relaxed font-medium'>
								{data.aim}
							</p>
						</div>
					</div>
				</header>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Column */}
					<div className='lg:col-span-2 space-y-8'>
						{/* Discussion Section */}
						<section>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 bg-blue-100 rounded-xl'>
									<MessageSquare className='text-blue-600' size={24} />
								</div>
								<h2 className='text-2xl font-black text-slate-900'>चर्चा</h2>
							</div>
							<div className='space-y-4'>
								{data.charcha.map((item, index) => (
									<div
										key={index}
										className='bg-white rounded-2xl border-l-4 border-l-blue-600 shadow-md hover:shadow-lg transition-shadow p-6 overflow-hidden group'>
										<div className='absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform' />
										<h3 className='font-black text-lg text-slate-800 mb-2 relative z-10'>
											{item.title}
										</h3>
										<p className='text-slate-600 leading-relaxed mb-4 relative z-10'>
											{item.details}
										</p>
										{item.findings && (
											<div className='bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl text-sm border-l-2 border-l-blue-400 relative z-10'>
												<strong className='text-slate-700'>
													💡 Key Finding:
												</strong>
												<p className='text-slate-600 mt-1'>{item.findings}</p>
											</div>
										)}
									</div>
								))}
							</div>
						</section>

						{/* Execution Plan */}
						<section className='bg-white rounded-2xl p-8 shadow-md border border-slate-200'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 bg-orange-100 rounded-xl'>
									<Rocket className='text-orange-600' size={24} />
								</div>
								<h2 className='text-2xl font-black text-slate-900'>
									आने वाले 30 दिनों की योजना
								</h2>
							</div>
							<div className='space-y-3'>
								{data.executionPlan30Days.map((step, index) => (
									<div
										key={index}
										className='flex gap-4 items-start p-4 hover:bg-slate-50 rounded-xl transition-colors group'>
										<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-black group-hover:scale-110 transition-transform'>
											{index + 1}
										</div>
										<p className='text-slate-700 font-medium leading-relaxed'>
											{step}
										</p>
									</div>
								))}
							</div>
						</section>
					</div>

					{/* Right Column */}
					<div className='space-y-8'>
						{/* Decisions */}
						<section className='bg-white border border-slate-200 text-slate-900 p-8 rounded-2xl shadow-md'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 bg-emerald-100 rounded-xl'>
									<CheckCircle className='text-emerald-600' size={24} />
								</div>
								<h2 className='text-xl font-black'>निर्णय</h2>
							</div>
							<ul className='space-y-3'>
								{data.decisions.map((decision, index) => (
									<li
										key={index}
										className='flex items-start gap-3 text-slate-700 text-sm group'>
										<div className='h-2 w-2 rounded-full bg-emerald-600 mt-2 shrink-0 group-hover:scale-150 transition-transform' />
										<span className='font-medium leading-relaxed'>
											{decision}
										</span>
									</li>
								))}
							</ul>
						</section>

						{/* Suggestions */}
						<section className='bg-white p-8 rounded-2xl shadow-md border border-slate-200'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 bg-amber-100 rounded-xl'>
									<Lightbulb className='text-amber-600' size={24} />
								</div>
								<h2 className='text-xl font-black'>प्रतिभागी सुझाव</h2>
							</div>
							<div className='space-y-4'>
								{data.suggestionsFromAttendees.map((sug, index) => (
									<div
										key={index}
										className='border-b border-slate-100 last:border-0 pb-4 last:pb-0 hover:bg-slate-50 -mx-4 px-4 py-2 rounded transition-colors'>
										<p className='text-xs font-black text-amber-600 mb-2 uppercase tracking-wide'>
											👤 {sug.name}
										</p>
										<p className='text-sm text-slate-700'>"{sug.suggestion}"</p>
									</div>
								))}
							</div>
						</section>

						{/* Attendees */}
						<section className='bg-white p-8 rounded-2xl shadow-md border border-slate-200'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 bg-slate-100 rounded-xl'>
									<Users className='text-slate-600' size={24} />
								</div>
								<h2 className='text-xl font-black'>प्रतिभागी</h2>
							</div>
							<div className='flex flex-wrap gap-2'>
								{data.attendees.map((person, index) => (
									<span
										key={index}
										className='bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold border border-slate-200 hover:shadow-md transition-shadow'>
										{person}
									</span>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MeetingDetailPage;
