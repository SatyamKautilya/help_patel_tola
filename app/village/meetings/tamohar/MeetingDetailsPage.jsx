import { Calendar, MapPin, Target, Users } from 'lucide-react';

export default function MeetingDetailPage({ meeting }) {
	if (!meeting) {
		return <p className='text-center mt-10'>बैठक विवरण उपलब्ध नहीं है</p>;
	}

	return (
		<div className='max-w-4xl mx-auto px-4 py-8 space-y-8'>
			{/* Header */}
			<header className='border-b pb-4'>
				<h1 className='text-2xl font-bold text-gray-800'>
					{meeting.meetingName}
				</h1>

				<div className='flex flex-wrap gap-6 mt-3 text-sm text-gray-600'>
					<div className='flex items-center gap-2'>
						<Calendar size={16} />
						<span>
							<strong>दिनांक:</strong>{' '}
							{new Date(meeting.meetingDate).toLocaleDateString('hi-IN')}
						</span>
					</div>

					<div className='flex items-center gap-2'>
						<MapPin size={16} />
						<span>
							<strong>स्थान:</strong> {meeting.place}
						</span>
					</div>
				</div>

				<p className='mt-3 text-sm'>
					<strong>विषय:</strong>{' '}
					<span className='capitalize'>{meeting.theme}</span>
				</p>
			</header>

			{/* Aim */}
			<section className='bg-gray-50 rounded-lg p-5'>
				<h2 className='flex items-center gap-2 text-lg font-semibold mb-2'>
					<Target size={18} /> उद्देश्य
				</h2>
				<p className='text-gray-700 leading-relaxed'>{meeting.aim}</p>
			</section>

			{/* Discussion */}
			<section>
				<h2 className='text-lg font-semibold mb-4'>चर्चा विवरण</h2>

				<div className='space-y-4'>
					{meeting.charcha.map((item, index) => (
						<div key={index} className='border rounded-lg p-4'>
							<h3 className='font-semibold text-gray-800'>
								चर्चा भाग {index + 1}: {item.title}
							</h3>

							<p className='mt-2 text-gray-700'>
								<strong>चर्चा का ब्योरा:</strong> {item.details}
							</p>

							{item.findings && (
								<p className='mt-2 text-gray-700'>
									<strong>निष्कर्ष:</strong> {item.findings}
								</p>
							)}
						</div>
					))}
				</div>
			</section>

			{/* Intervention Strategy */}
			<section>
				<h2 className='text-lg font-semibold mb-3'>हस्तक्षेप रणनीति</h2>
				<ul className='list-disc list-inside space-y-1 text-gray-700'>
					{meeting.interventionStrategy.map((plan, i) => (
						<li key={i}>{plan}</li>
					))}
				</ul>
			</section>

			{/* Decisions */}
			<section>
				<h2 className='text-lg font-semibold mb-3'>निर्णय</h2>
				<ul className='list-decimal list-inside space-y-1 text-gray-700'>
					{meeting.decisions.map((decision, i) => (
						<li key={i}>{decision}</li>
					))}
				</ul>
			</section>

			{/* 30 Days Execution Plan */}
			<section>
				<h2 className='text-lg font-semibold mb-3'>
					आगामी 30 दिनों की कार्य योजना
				</h2>
				<ul className='list-disc list-inside space-y-1 text-gray-700'>
					{meeting.executionPlan30Days.map((task, i) => (
						<li key={i}>{task}</li>
					))}
				</ul>
			</section>

			{/* Suggestions */}
			<section>
				<h2 className='text-lg font-semibold mb-3'>सहभागियों के सुझाव</h2>

				<div className='space-y-3'>
					{meeting.suggestionsFromAttendees.map((item, i) => (
						<div key={i} className='bg-gray-50 p-3 rounded-md'>
							<p className='font-medium'>{item.name}</p>
							<p className='text-gray-700 text-sm mt-1'>{item.suggestion}</p>
						</div>
					))}
				</div>
			</section>

			{/* Attendees */}
			<section>
				<h2 className='flex items-center gap-2 text-lg font-semibold mb-3'>
					<Users size={18} /> उपस्थित सदस्य
				</h2>

				<div className='flex flex-wrap gap-2'>
					{meeting.attendees.map((name, i) => (
						<span
							key={i}
							className='px-3 py-1 bg-gray-100 rounded-full text-sm'>
							{name}
						</span>
					))}
				</div>
			</section>
		</div>
	);
}
