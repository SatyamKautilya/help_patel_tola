'use client';

import React, { useEffect, useState } from 'react';
import MeetingDetailPage from '../MeetingDetailsPage';

export default function Page({ params }) {
	const [meeting, setMeeting] = useState({});
	const [loading, setLoading] = useState(true);

	const init = async () => {
		try {
			const meetingData = await fetch(
				'/api/query/database?name=get-tamohar-meeting-by-id',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: params.id,
					}),
				},
			).then((res) => res.json());

			setMeeting(meetingData);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	if (!meeting?._id) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md'>
					<p className='text-red-700 font-semibold text-lg'>
						बैठक उपलब्ध नहीं है
					</p>
				</div>
			</div>
		);
	}

	return <MeetingDetailPage data={meeting} />;
}
