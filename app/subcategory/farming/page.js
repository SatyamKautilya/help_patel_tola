'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, useDisclosure, Card, CardBody, Image } from '@heroui/react';
import Farming from '@/components/ui/customui/Farming';

export default function App() {
	const router = useRouter();
	const [farming, setFarming] = useState([]);

	const searchParams = useRouter();

	useEffect(() => {
		initializeApp();
	}, [searchParams]);

	const initializeApp = async () => {
		try {
			const response = await fetch('/api/subcategory/crops');
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
	console.log(farming);
	return (
		<>
			<div className=' flex flex-row py-4 border-b-2 pb-4 bg-slate-100 items-center'>
				<Button
					color='primary'
					size='lg'
					className='ml-4 text-xl font-bold'
					onPress={handleBack}>
					← Back
				</Button>
			</div>
			<div className='hidden p-6 grid grid-cols-2 gap-6'>
				{farming.map((item) => (
					<Card
						isPressable
						onPress={() => {
							router.push(`/subcategory/farming?name=${item.id}`);
						}}
						key={item.id}
						className='bg-gradient-to-br from-green-400 to-blue-500'>
						<CardBody className='flex flex-col justify-between h-64'>
							<div className='flex-1 flex items-center justify-center'>
								<Image
									src='"https://cdn.pixabay.com/photo/2016/08/11/23/25/tomatoes-1580273_1280.jpg'
									alt={item.name}
									width={200}
									height={200}
									className='w-full h-full object-cover rounded'
								/>
							</div>
							<div className='mt-4 text-white font-bold text-lg text-center'>
								{item.name}
							</div>
						</CardBody>
					</Card>
				))}
			</div>
			<Farming {...farming[0]} />
		</>
	);
}
