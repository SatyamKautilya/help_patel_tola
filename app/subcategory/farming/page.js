'use client';

import { setLoader } from '@/app/store/appSlice';
import ChatbotFloating from '@/components/ChatBotFloating';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AgriculturePage() {
	const [search, setSearch] = useState('');
	const [cropList, setCropList] = useState([]);
	const router = useRouter();

	const filteredCrops = cropList.filter((crop) => crop.name.includes(search));

	const dispatch = useDispatch();
	const initializeApp = async () => {
		dispatch(setLoader(true));
		try {
			const response = await fetch(`/api/subcategory/crops`);
			if (response.ok) {
				const data = await response.json();
				setCropList(data.crops || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		} finally {
			dispatch(setLoader(false));
		}
	};

	useEffect(() => {
		initializeApp();
	}, []);

	const handleClick = (cropId) => {
		router.push(`/subcategory/farming/crop?name=${cropId}`);
	};
	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100'>
			{/* Header */}

			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: 'spring', stiffness: 120, duration: 0.5 }}
				className='fixed top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-green-200 shadow-sm'>
				<div className='flex flex-col items-center pt-4'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/farming/tamoharagr.png'
						alt='Farming Logo'
						width={200}
						height={46}
						priority
					/>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: '80%' }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className='mt-3 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent'
					/>
				</div>
			</motion.header>
			{/* Search */}
			<div className='pt-32 px-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className='mb-6'>
					<input
						type='text'
						placeholder='फसल खोजें (जैसे – टमाटर)'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='w-full rounded-full border border-green-300 bg-white px-5 py-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-md transition-all duration-300'
					/>
				</motion.div>
				{/* Tabs */}

				{/* Grid */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9, duration: 0.5 }}
					className='grid grid-cols-2 gap-4 pb-20'>
					{filteredCrops.map((crop) => (
						<motion.div
							onClick={() => handleClick(crop.id)}
							key={crop.id}
							whileHover={{
								scale: 1.03,
								boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
							}}
							whileTap={{ scale: 0.98 }}
							className='rounded-2xl bg-white p-3 shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out'>
							<div className='relative h-36 w-full overflow-hidden rounded-xl'>
								<Image
									src={crop.url}
									alt={crop.name}
									fill
									className='object-cover transition-transform duration-300 hover:scale-105'
								/>
							</div>

							<div className='mt-3 text-center'>
								<h3 className='text-lg font-bold text-gray-800'>{crop.name}</h3>
								<p className='mt-1 text-sm text-gray-500'>बीज से कटाई तक</p>
							</div>

							{/* Icons */}
							<div className='mt-4 flex justify-around text-sm text-green-700 font-medium'>
								<span>💧 पानी</span>
								<span>🧪 खाद</span>
								<span>🐛 कीट</span>
							</div>
						</motion.div>
					))}
				</motion.div>
				{/* AI Button */}
				<ChatbotFloating
					context={`
						you are तमोहर - कृषि विशेषज्ञ.
						rules
						- you are answering the the villager of madhya pradesh, india.
						- you will answer in  simple and natural hindi text and font, irrespective of user's langauge.
						- you will not use more than 100 words in answer and 50 words for first hi/hello.
						- you will ask followup questions if necessary.
						- you will try to diagnose the desease based on farmer's description.
						- you will not ask for photo.
						- if suggesting seeds, prefer syngenta, vnr, seminis, ankur, bioseed, mahyco.
						- insecticides and pesticides or fungicide suggestions should be known chemical from adama, basf, upl, bayer, syngenta or dow agriscience. while suggesting atleast suggest more than 3 options.
						
						`}
					buttonLabel='तमोहर- कृषि विशेषज्ञ से पूछें'
				/>
			</div>
		</div>
	);
}
