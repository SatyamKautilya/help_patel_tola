import React from 'react';
// import MeetingDetailPage from './MeetingDetailsPage';
import TamoharMeetingUI from './MeetingDetailsPage';
import Link from 'next/link';

import { Calendar, MapPin, ChevronRight, Filter, Search } from 'lucide-react';
const meetings = [
	{
		meetingName: 'तमोहर - बैठक 1',
		theme: 'health',
		meetingDate: '2025-12-31T00:00:00.000Z',
		place: 'खेरमाई मंदिर पटेल टोला',
		aim: 'ग्राम में मौजूद स्वास्थ्य सुविधाओं की स्थिति का आकलन करना, आम जनमानस की समस्याओं को समझना तथा प्राथमिक स्वास्थ्य सेवाओं में सुधार हेतु सामूहिक रणनीति बनाना।',

		charcha: [
			{
				title: 'प्राथमिक स्वास्थ्य सेवाएँ',
				details:
					'ग्राम में उपलब्ध स्वास्थ्य केंद्र, दवाओं की उपलब्धता तथा स्टाफ की स्थिति पर विस्तृत चर्चा की गई।',
				findings: 'स्वास्थ्य केंद्र में नियमित डॉक्टर उपलब्ध नहीं हैं।',
			},
			{
				title: 'महिला एवं बाल स्वास्थ्य',
				details: 'गर्भवती महिलाओं की जांच, टीकाकरण और पोषण पर चर्चा हुई।',
				findings: 'टीकाकरण की जानकारी की कमी पाई गई।',
			},
			{
				title: 'स्वच्छता एवं रोग रोकथाम',
				details:
					'गांव की स्वच्छता, जल निकासी और मच्छर जनित रोगों पर चर्चा की गई।',
				findings: 'नालियों की नियमित सफाई नहीं हो रही है।',
			},
		],

		interventionStrategy: [
			'मासिक स्वास्थ्य शिविर का आयोजन',
			'आशा कार्यकर्ताओं को प्रशिक्षण',
			'स्वच्छता अभियान की शुरुआत',
		],

		decisions: [
			'स्वास्थ्य विभाग को लिखित सूचना',
			'ग्राम स्वास्थ्य समिति का गठन',
			'टीकाकरण जागरूकता अभियान',
		],

		executionPlan30Days: [
			'स्वास्थ्य शिविर की तिथि तय करना',
			'आशा कार्यकर्ताओं की बैठक',
			'घर-घर जागरूकता अभियान',
		],

		suggestionsFromAttendees: [
			{
				name: 'रामप्रसाद पटेल',
				suggestion: 'स्वास्थ्य केंद्र में दवाओं की नियमित आपूर्ति होनी चाहिए।',
			},
			{
				name: 'सीता देवी',
				suggestion: 'महिलाओं के लिए अलग जांच दिवस होना चाहिए।',
			},
		],

		attendees: [
			'रामप्रसाद पटेल',
			'सीता देवी',
			'मोहन लाल',
			'अनिता शर्मा',
			'राकेश वर्मा',
		],

		createdAt: '2025-12-31T10:30:00.000Z',
		updatedAt: '2025-12-31T10:30:00.000Z',
	},
];

const themeMap = {
	education: {
		label: 'शिक्षा',
		color: 'bg-blue-50 text-blue-600 border-blue-100',
	},
	health: {
		label: 'स्वास्थ्य',
		color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
	},
	moral_value: {
		label: 'नैतिक मूल्य',
		color: 'bg-purple-50 text-purple-600 border-purple-100',
	},
	economy: {
		label: 'अर्थव्यवस्था',
		color: 'bg-amber-50 text-amber-600 border-amber-100',
	},
	employment: {
		label: 'रोजगार',
		color: 'bg-rose-50 text-rose-600 border-rose-100',
	},
};

export default function MeetingArchivePage() {
	return (
		<div className='min-h-screen bg-slate-50/50 px-4 py-12'>
			<div className='max-w-5xl mx-auto'>
				{/* Modern Header with Search/Filter placeholders */}
				<header className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
					<div>
						<h1 className='text-4xl font-extrabold text-slate-900 tracking-tight'>
							तमोहर बैठक <span className='text-blue-600'>अभिलेख</span>
						</h1>
						<p className='text-slate-500 mt-2 text-lg'>
							आयोजित बैठकों का विवरण एवं निर्णय की सूची
						</p>
					</div>
				</header>

				{/* Empty State */}
				{meetings.length === 0 && (
					<div className='text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300'>
						<p className='text-slate-400 text-lg'>
							अभी कोई बैठक उपलब्ध नहीं है
						</p>
					</div>
				)}

				{/* Meeting Cards Grid */}
				<div className='grid gap-6'>
					{meetings.map((meeting) => {
						const themeStyle = themeMap[meeting.theme] || themeMap.education;

						return (
							<Link
								key={meeting._id}
								href={`/meetings/${meeting._id}`}
								className='group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300'>
								<div className='flex flex-col md:flex-row justify-between gap-4'>
									<div className='flex-1'>
										{/* Theme Badge */}
										<span
											className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${themeStyle.color} mb-3`}>
											{themeStyle.label}
										</span>

										<h2 className='text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors'>
											{meeting.meetingName}
										</h2>

										{/* Meta Info */}
										<div className='flex flex-wrap gap-5 mt-4 text-sm font-medium text-slate-500'>
											<div className='flex items-center gap-1.5'>
												<Calendar size={16} className='text-slate-400' />
												{new Date(meeting.meetingDate).toLocaleDateString(
													'hi-IN',
													{
														day: 'numeric',
														month: 'long',
														year: 'numeric',
													},
												)}
											</div>

											<div className='flex items-center gap-1.5'>
												<MapPin size={16} className='text-slate-400' />
												{meeting.place}
											</div>
										</div>

										{/* Aim Preview */}
										<div className='mt-5 bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:bg-blue-50/30 group-hover:border-blue-100 transition-colors'>
											<p className='text-sm text-slate-600 leading-relaxed line-clamp-2'>
												<span className='font-bold text-slate-800 mr-2'>
													उद्देश्य:
												</span>
												{meeting.aim}
											</p>
										</div>
									</div>

									{/* Right Arrow Decor */}
									<div className='hidden md:flex items-center justify-center pl-4'>
										<div className='h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all'>
											<ChevronRight size={20} />
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
