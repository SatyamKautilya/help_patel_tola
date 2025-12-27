'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody } from '@heroui/react';
import HospitalDetails from './HospitalDetails';

export default function App() {
	const router = useRouter();
	const [topics, setTopics] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [topicData, setTopicData] = useState(null);
	//	const [loading, setLoading] = useState(true);

	useEffect(() => {
		initializeApp();
	}, []);

	useEffect(() => {
		if (!selectedTopic) return;
		const fetchTopicDetails = async () => {
			if (selectedTopic === 'hospitals')
				try {
					const response = await fetch(
						`/api/subcategory/hospitals?name=${selectedTopic}`,
					);
					// const response = await fetch(`/api/crop/schedule/${selectedCrop}`, {
					// 	method: 'POST',
					// 	headers: { 'Content-Type': 'application/json' },
					// 	body: JSON.stringify({ cropId: selectedCrop }),
					// });

					// const data = await response.json();

					if (response.ok) {
						const data = await response.json();
						setTopicData(data);
					}
				} catch (error) {
					console.error('Failed to fetch crop details:', error);
				}
		};

		fetchTopicDetails();
	}, [selectedTopic]);

	const initializeApp = async () => {
		try {
			const response = await fetch('/api/subcategory/hospitals');
			if (response.ok) {
				const data = await response.json();
				setTopics(data.healthtopics || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		} finally {
		}
	};

	const handleBack = () => {
		router.back();
	};

	return (
		<div className=''>
			<div className=' flex flex-row py-4 border-b-2 pb-4 bg-slate-100 items-center'>
				<Button
					color='primary'
					size='lg'
					className='ml-6 text-xl font-bold'
					onPress={
						selectedTopic
							? () => {
									setSelectedTopic(null);
							  }
							: handleBack
					}>
					← Back
				</Button>
			</div>
			{!selectedTopic && (
				<div className=' p-6 grid grid-cols-2 gap-6	'>
					{topics.map((topic) => (
						<Card
							isPressable
							onPress={() => {
								setSelectedTopic(topic.id);
							}}
							className='h-50 bg-pink-500 rounded-2xl shadow-xl p-6'
							key={topic.id}>
							<CardBody className='text-center'>
								<h2 className='text-2xl text-pink-100  font-bold mb-2'>
									{topic.topicName}
								</h2>
							</CardBody>
						</Card>
					))}
				</div>
			)}
			{selectedTopic === 'hospitals' && (
				<HospitalDetails hospitals={topicData?.hospitallists} />
			)}
		</div>
	);
}
