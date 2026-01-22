import React from 'react';
import {
	Calendar,
	MapPin,
	MessageSquare,
	CheckCircle,
	Rocket,
	Lightbulb,
	Users,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from '@heroui/react';

const MeetingDetailPage = ({ data }) => {
	const thisUser = useSelector((state) => state.appContext.user);

	const handleSign = () => {
		const sign = fetch('/api/query/database?name=digital-sign', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				meetingId: data._id,
				name: thisUser?.name,
			}),
		});
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-6 font-sans text-slate-900'>
			<div className='max-w-6xl mx-auto'>
				<header className='mb-8'>
					<div className='flex flex-col md:flex-row md:items-start justify-between gap-3 mb-6'>
						<div className='flex-1'>
							<div className='bg-green-700 text-white  w-max py-1 px-2 mb-2 rounded-2xl'>
								{data.theme}
							</div>
							<h1 className='text-4xl md:text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent '>
								{data.meetingName}
							</h1>
						</div>

						<div className='flex flex-col '>
							<div className='flex items-center gap-3  py-3 rounded-xl'>
								<Calendar size={20} className='text-blue-600' />
								<span className='font-semibold text-slate-700'>
									{new Date(data.meetingDate).toLocaleString('hi-IN', {
										month: 'long',
										day: 'numeric',
										year: 'numeric',
									})}
								</span>
							</div>
							<div className='flex items-center gap-3  rounded-xl'>
								<MapPin size={20} className='text-rose-600' />
								<span className='font-semibold text-slate-700'>
									{data.place}
								</span>
							</div>
						</div>
					</div>

					<div className='flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200'>
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
								<h2 className='text-2xl font-black text-slate-900'>
									विचार विमर्श
								</h2>
							</div>
							<div className='space-y-4'>
								{data.charcha.map((item, index) => (
									<div
										key={index}
										className='bg-white rounded-2xl border-1 border-blue-600 shadow-md hover:shadow-lg transition-shadow p-6 overflow-hidden group'>
										{/* <div className='absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform' /> */}
										<h3 className='font-black text-lg text-slate-800 mb-2 relative z-10'>
											{item.title}
										</h3>
										<p className='text-slate-600 leading-relaxed mb-4 relative z-10'>
											{item.details}
										</p>
										{item.findings && (
											<div className=''>
												<strong className='text-slate-700'>निष्कर्ष:</strong>
												<p className='text-yellow-800 mt-1'>{item.findings}</p>
											</div>
										)}
									</div>
								))}
							</div>
						</section>

						<section className='bg-white rounded-2xl p-8 shadow-md border border-slate-200'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 bg-orange-100 rounded-xl'>
									<Rocket className='text-orange-600' size={24} />
								</div>
								<h2 className='text-lg font-black text-slate-900'>
									आने वाले 30 दिनों की योजना
								</h2>
							</div>
							<div className='space-y-1'>
								{data.executionPlan30Days.map((step, index) => (
									<div
										key={index}
										className='flex gap-2 items-start px-4 hover:bg-slate-50 rounded-xl transition-colors group'>
										<span className='font-bold text-orange-600 shrink-0'>
											{index + 1}.
										</span>
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
								<h2 className='text-xl font-black'>सदस्यों से प्राप्त सुझाव</h2>
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
						<div className='flex flex-row justify-center'>
							<Button
								onPress={handleSign}
								color='success'
								variant='solid'
								className='    text-xl font-bold'
								size='lg'>
								🖊️ डिजिटल हस्ताक्षर करें
							</Button>
						</div>
						{/* Attendees */}
						<section className='bg-white p-8 rounded-2xl shadow-md border border-slate-200'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 bg-slate-100 rounded-xl'>
									<Users className='text-slate-600' size={24} />
								</div>
								<h2 className='text-xl font-black'>
									उपस्थित सदस्यों के हस्ताक्षर
								</h2>
							</div>

							<div className='flex flex-wrap gap-2'>
								{data.attendees.map((person, index) => (
									<span
										key={index}
										className=' flex flex-row gap-0 bg-gradient-to-r from-green-200 to-green-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold border border-teal-800 hover:shadow-md transition-shadow'>
										<CheckCircle /> {person}
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
