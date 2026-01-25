'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const themeMap = {
	education: {
		label: 'तमोहर बैठक',
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
	const [meetings, setMeetings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const userGroups = ['PatelTola'];

	const init = async () => {
		try {
			const res = await fetch('/api/query/database?name=get-tamohar-meetings', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					visibilityGroups: userGroups,
				}),
			});
			const data = await res.json();
			setMeetings(data.meetings || []);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className='min-h-screen bg-slate-50/50 px-4 py-12'>
			<div className='max-w-5xl mx-auto'>
				<header className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
					<div className='text-center'>
						<h1 className='text-4xl font-extrabold text-slate-900 tracking-tight'>
							तमोहर बैठक <span className='text-blue-600'>अभिलेख</span>
						</h1>
						<p className='text-slate-500 mt-2 text-lg'>
							आयोजित बैठकों का विवरण एवं निर्णय की सूची
						</p>
					</div>
				</header>

				{isLoading ? (
					<div className='flex flex-col items-center justify-center py-20'>
						<div className='relative w-16 h-16 mb-6'>
							<div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-spin'></div>
							<div className='absolute inset-2 bg-slate-50/50 rounded-full'></div>
						</div>
						<p className='text-slate-600 font-medium'>
							बैठकें लोड हो रहीं हैं...
						</p>
					</div>
				) : meetings.length === 0 ? (
					<div className='text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300'>
						<p className='text-slate-400 text-lg'>
							अभी कोई बैठक उपलब्ध नहीं है
						</p>
					</div>
				) : (
					<div className='grid gap-6'>
						{meetings.map((meeting) => {
							const themeStyle = themeMap[meeting.theme] || themeMap.education;

							return (
								<Link
									key={meeting._id}
									href={`/village/meetings/tamohar/${meeting._id}`}
									className='group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300'>
									<div className='flex flex-col md:flex-row justify-between gap-4'>
										<div className='flex-1'>
											<span
												className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${themeStyle.color} mb-3`}>
												{themeStyle.label}
											</span>

											<h2 className='text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors'>
												{meeting.meetingName}
											</h2>

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

											<div className='mt-5 bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:bg-blue-50/30 group-hover:border-blue-100 transition-colors'>
												<p className='text-sm text-slate-600 leading-relaxed line-clamp-2'>
													<span className='font-bold text-slate-800 mr-2'>
														उद्देश्य:
													</span>
													{meeting.aim}
												</p>
											</div>
										</div>

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
				)}
			</div>
		</div>
	);
}
