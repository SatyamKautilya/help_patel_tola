'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, Chip, Input } from '@heroui/react';
import HospitalDetails from './HospitalDetails';

export default function App() {
	const router = useRouter();
	const [topics, setTopics] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [topicData, setTopicData] = useState(null);
	const [message, setMessage] = useState('');
	const [selectedCity, setSelectedCity] = useState(null);
	const [loading, setLoading] = useState(false);
	const [boatResp, setBoatResp] = useState({});

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

	const cities = [
		{ id: 'jabalpur', name: 'जबलपुर' },
		{ id: 'balaghat', name: 'बालाघाट' },
		{ id: 'raipur', name: 'रायपुर' },
		{ id: 'nagpur', name: 'नागपुर' },
		{ id: 'bilaspur', name: 'बिलासपुर' },
		{ id: 'gondia', name: 'गोंदिया' },
		{ id: 'kabirdham', name: 'कबीरधाम' },
	];

	const specialityIds = [
		'MG', // General Medicine
		'SG', // General Surgery
		'MC', // Cardiology (Heart)
		'MO', // Orthopaedics
		'SN', // Neurology
		'MN', // Neuro Medicine
		'SO', // Orthopaedics / Bone
		'SB', // Paediatrics
		'SE', // Ophthalmology (Eye)
		'SM', // Dermatology (Skin)
		'SL', // Laparoscopic Surgery
		'SP', // Plastic Surgery
		'ST', // Trauma
		'ER', // Emergency
		'SU', // General Surgery (Super/Advanced)
		'SC', // Critical Care / ICU
		'SV', // Vascular Surgery
		'SS', // Super Speciality
		'MP', // Psychiatry / Mental Health
		'IN', // Internal Medicine
		'NA', // Not Available / Not Specified
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

			setBoatResp(JSON.parse(data?.response));
		} catch (error) {
			console.error('Chat error:', error);

			//	setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setLoading(false);
		}
	};
	console.log(boatResp, 'boat reps');
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
							className='h-50 bg-cyan-600 rounded-2xl shadow-xl p-6'
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
				<>
					<div className='px-4 py-3 flex flex-row flex-wrap gap-3'>
						{cities?.map((city) => {
							return (
								<Chip
									onClick={() => {
										setSelectedCity(city.id);
									}}
									color='primary'
									size='lg'>
									{city.name}
								</Chip>
							);
						})}
					</div>
					<HospitalDetails
						hospitals={
							selectedCity
								? topicData?.hospitallists?.filter(
										(hosp) => hosp.cityId === selectedCity,
								  )
								: topicData?.hospitallists
						}
					/>
					<div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200'>
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
								<div className='mx-4 bg-yellow-500 p-3 rounded-lg'>
									<div>{boatResp?.msg}</div>
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
			)}
		</div>
	);
}
