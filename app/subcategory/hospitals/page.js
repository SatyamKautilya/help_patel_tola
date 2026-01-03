'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, Chip, Input } from '@heroui/react';
import HospitalDetails from './HospitalDetails';
import { filterhospitals } from '@/hooks/utils';

export default function App() {
	const router = useRouter();
	const [topics, setTopics] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [topicData, setTopicData] = useState(null);
	const [message, setMessage] = useState('');
	const [selectedCity, setSelectedCity] = useState(null);
	const [loading, setLoading] = useState(false);
	const [boatResp, setBoatResp] = useState({});
	const [filteredHsp, setFilteredHsp] = useState({});
	useEffect(() => {
		setFilteredHsp(topicData?.hospitallists);
	}, [topicData]);

	useEffect(() => {
		setFilteredHsp(
			filterhospitals(topicData?.hospitallists, boatResp?.specialityId),
		);
	}, [boatResp]);

	useEffect(() => {
		initializeApp();
	}, []);

	useEffect(() => {
		if (!selectedTopic) return;
		if (selectedTopic === 'sop') {
			router.push('/subcategory/hospitals/treatment');
			return;
		}
		if (selectedTopic === 'successStory') {
			router.push('/subcategory/hospitals/casestory');
			return;
		}
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

	const cities = [
		{ id: 'jabalpur', name: 'जबलपुर' },
		{ id: 'balaghat', name: 'बालाघाट' },
		{ id: 'raipur', name: 'रायपुर' },
		{ id: 'nagpur', name: 'नागपुर' },
		{ id: 'bilaspur', name: 'बिलासपुर' },
		{ id: 'gondia', name: 'गोंदिया' },
		{ id: 'kabirdham', name: 'कबीरधाम' },
	];

	const handleSend = async () => {
		setLoading(true);
		try {
			const response = await fetch('/api/query/database?name=findhospital', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: message,
				}),
			});

			if (!response.ok) throw new Error('Failed to get response');

			const data = await response.json();
			if (data?.response === '') return;

			setBoatResp(JSON.parse(data?.response));
		} catch (error) {
			console.error('Chat error:', error);

			//	setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setLoading(false);
		}
	};

	return loading ? (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
			<div className='bg-white rounded-2xl px-8 py-6 shadow-xl text-center animate-fadeScale'>
				<p className='text-lg font-semibold text-gray-800'>
					आपके इनपुट के आधार पर अस्पताल ढूंढ रहा हूँ
				</p>
				<p className='text-sm text-gray-500 mt-1'>कृपया प्रतीक्षा करें...</p>

				{/* Spinner */}
				<div className='mt-4 flex justify-center'>
					<div className='h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
				</div>
			</div>
		</div>
	) : (
		<div className=''>
			<div className='fixed top-0  left-0 right-0 z-50 flex flex-row pb-4 pt-12 border-b-2 bg-slate-100 items-center'>
				<Button
					color='primary'
					size='lg'
					className='ml-6 text-xl font-bold'
					onPress={selectedTopic ? () => setSelectedTopic(null) : handleBack}>
					← Back
				</Button>
			</div>
			{!selectedTopic && (
				<div className=' pt-[84px] p-6 grid grid-cols-2 gap-6	'>
					{topics.map((topic) => (
						<Card
							key={topic.id}
							isPressable
							onPress={() => setSelectedTopic(topic.id)}
							className='
      h-64 
      rounded-2xl 
      shadow-xl 
      bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-300
      hover:scale-[1.02] transition-transform
    '>
							<CardBody className='flex flex-col justify-between items-center p-6'>
								{/* Title */}
								{topic.owner && <Chip color='primary'>{topic.owner}</Chip>}

								<h2 className='text-2xl text-white font-bold text-center'>
									{topic.topicName}
								</h2>

								{/* Button */}
								<Button
									color='success'
									variant='shadow'
									size='lg'
									onPress={() => setSelectedTopic(topic.id)}
									className='mt-4 bg-green-400'>
									देखें
								</Button>
							</CardBody>
						</Card>
					))}
				</div>
			)}
			{selectedTopic === 'hospitals' ? (
				<>
					<div className='pt-[84px] px-4 py-3 flex flex-row flex-wrap gap-3'>
						{cities?.map((city) => {
							return (
								<Chip
									onClick={() => {
										setSelectedCity(city.id);
									}}
									color={selectedCity === city.id ? 'warning' : 'primary'}
									size='lg'>
									{city.name}
								</Chip>
							);
						})}
					</div>
					<HospitalDetails
						hospitals={
							selectedCity
								? filteredHsp?.filter((hosp) => hosp.cityId === selectedCity)
								: filteredHsp
						}
					/>
					<div className='fixed bottom-10 left-0 right-0 z-50 bg-white border-t border-gray-200'>
						{!boatResp?.msg ? (
							<div className='max-w-3xl mx-auto p-4 flex gap-3 items-end'>
								<Input
									size='lg'
									label='अपनी समस्या लिखें'
									placeholder='जैसे: सीने में दर्द और सांस की तकलीफ'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									//isDisabled={loading}
									className='flex-1'
								/>

								<Button
									color='primary'
									size='lg'
									//	isLoading={loading}
									onPress={() => handleSend()}
									className='shrink-0'>
									अस्पताल ढूँढे
								</Button>
							</div>
						) : (
							<>
								<div className='mx-4 mt-4 bg-yellow-500 p-3 rounded-lg'>
									<div>{boatResp?.msg}</div>
								</div>
								<div className='mx-4 mt-4 bg-pink-300 p-3 rounded-lg'>
									<div>ऊपर संबन्धित अस्पतालो की सूची है</div>
								</div>
								<div className='flex flex-row justify-center py-3'>
									<Button
										onPress={() => {
											setBoatResp({});
										}}
										color='primary'
										className=' font-bold'>
										फिर से ढूँढे
									</Button>
								</div>
							</>
						)}
					</div>
				</>
			) : (
				selectedTopic !== null && (
					<div className=' px-6 h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)] flex flex-row justify-center items-center text-white text-3xl'>
						हम कुछ विशेष और सार्थक तैयार कर रहे हैं। जल्द ही जानकारी जोड़ी जाएगी
						!!
					</div>
				)
			)}
		</div>
	);
}
