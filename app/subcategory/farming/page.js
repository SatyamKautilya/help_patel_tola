'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, useDisclosure, Card, CardBody, Image } from '@heroui/react';
import Farming from '@/components/ui/customui/Farming';
import UserWelcome from '../contacts/UserWelcome';

// import { generateScheduleResponse } from '@/lib/openai';

export default function App() {
	const router = useRouter();
	const [farming, setFarming] = useState([]);
	const [selectedCrop, setSelectedCrop] = useState(null);
	const [selectedCropData, setSelectedCropData] = useState(null);
	useEffect(() => {
		initializeApp();
	}, []);
	useEffect(() => {
		if (!selectedCrop) return;

		const fetchCropDetails = async () => {
			try {
				const response = await fetch(
					`/api/subcategory/crops?name=${selectedCrop}`,
				);
				// const response = await fetch(`/api/crop/schedule/${selectedCrop}`, {
				// 	method: 'POST',
				// 	headers: { 'Content-Type': 'application/json' },
				// 	body: JSON.stringify({ cropId: selectedCrop }),
				// });

				// const data = await response.json();

				if (response.ok) {
					const data = await response.json();
					setSelectedCropData(data);
				}
			} catch (error) {
				console.error('Failed to fetch crop details:', error);
			}
		};

		fetchCropDetails();
	}, [selectedCrop]);

	const initializeApp = async () => {
		try {
			const response = await fetch(`/api/subcategory/crops`);
			if (response.ok) {
				const data = await response.json();
				setFarming(data.crops || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		}
	};

	const handleBack = () => {
		router.back();
	};

	console.log('Farming Data:', selectedCropData);
	return (
		<>
			<div className=' flex flex-row py-4 border-b-2 pb-4 bg-slate-100 items-center'>
				<Button
					color='primary'
					size='lg'
					className='ml-4 text-xl font-bold'
					onPress={selectedCrop ? () => setSelectedCrop(null) : handleBack}>
					← Back
				</Button>
			</div>
			<div className=' p-6 grid grid-cols-2 gap-6'>
				{!selectedCrop &&
					farming.map((item) => (
						<Card
							isPressable
							onPress={() => setSelectedCrop(item.id)}
							key={item.id}
							className='bg-lime-200 shadow-lg hover:shadow-xl transition-shadow duration-300'>
							<CardBody className='flex flex-col justify-between h-64'>
								<div className='flex-1 flex items-center justify-center'>
									<Image
										src={item.url}
										alt={item.name}
										width={120}
										height={190}
										className='w-full h-full object-cover rounded'
									/>
								</div>
								<div className='mt-2 mb-1 text-black font-bold text-xl text-center'>
									{item.name}
								</div>
							</CardBody>
						</Card>
					))}
			</div>
			{selectedCrop && selectedCropData && (
				<Farming {...selectedCropData?.crops?.[0]} />
			)}
			<UserWelcome />
		</>
	);
}
