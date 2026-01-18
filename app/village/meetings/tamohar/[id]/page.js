'use client';
import React, { useEffect } from 'react';
import MeetingDetailPage from '../MeetingDetailsPage';

export default async function Page({ params }) {
	const [meeting, setMeeting] = useState([]);

	const init = async () => {
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
	};

	useEffect(() => {
		init();
	}, []);

	if (!meeting) {
		return <div className='text-center mt-10'>बैठक उपलब्ध नहीं है</div>;
	}

	return <MeetingDetailPage data={meeting} />;
}
