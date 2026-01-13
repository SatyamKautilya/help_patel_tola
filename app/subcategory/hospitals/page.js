'use client';

import React, { useEffect, useState } from 'react';
import { Button, Chip, Input, Card } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import HospitalDetails from './HospitalDetails';
import { filterhospitals } from '@/hooks/utils';
import Image from 'next/image';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { setLoader } from '@/app/store/appSlice';
import { useDispatch } from 'react-redux';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function App() {
	const [topicData, setTopicData] = useState(null);
	const [message, setMessage] = useState('');
	const [selectedCity, setSelectedCity] = useState(null);
	const [loading, setLoading] = useState(false);
	const [boatResp, setBoatResp] = useState({});
	const [filteredHsp, setFilteredHsp] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		setFilteredHsp(topicData?.hospitallists);
	}, [topicData]);

	useEffect(() => {
		setFilteredHsp(
			filterhospitals(topicData?.hospitallists, boatResp?.specialityId),
		);
	}, [boatResp]);

	const fetchTopicDetails = async () => {
		dispatch(setLoader(true));
		try {
			const response = await fetch(`/api/subcategory/hospitals?name=hospitals`);
			if (response.ok) {
				const data = await response.json();
				setTopicData(data);
			}
		} catch (error) {
			console.error('Failed to fetch crop details:', error);
		} finally {
			dispatch(setLoader(false));
		}
	};

	useEffect(() => {
		fetchTopicDetails();
	}, []);

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
				body: JSON.stringify({ message }),
			});

			if (!response.ok) throw new Error('Failed to get response');
			const data = await response.json();
			if (data?.response === '') return;
			setBoatResp(JSON.parse(data?.response));
		} catch (error) {
			console.error('Chat error:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = React.useCallback((e) => {
		setMessage(e.target.value);
	}, []);

	return (
		<div className='relative min-h-screen pb-10 bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-100 overflow-hidden'>
			{/* Animated Background Elements */}
			<div className='fixed inset-0 pointer-events-none overflow-hidden'>
				<motion.div
					animate={{ y: [0, 20, 0] }}
					transition={{ duration: 8, repeat: Infinity }}
					className='absolute top-20 left-10 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl'
				/>
				<motion.div
					animate={{ y: [0, -20, 0] }}
					transition={{ duration: 10, repeat: Infinity }}
					className='absolute bottom-20 right-10 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl'
				/>
			</div>

			{/* Header */}
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6 }}
				className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm'>
				<div className='flex flex-col items-center pt-7 pb-4'>
					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}>
						<Image
							src='https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png'
							alt='Health Topics'
							width={250}
							height={56}
							priority
						/>
					</motion.div>
					<motion.div
						layoutId='gradient-line'
						className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent'
					/>
				</div>
			</motion.header>

			{/* Loading Modal */}
			<AnimatePresence>
				{loading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className='bg-white mx-10 rounded-3xl px-8 py-8 shadow-2xl text-center'>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
								className='mx-auto mb-4'>
								<Sparkles className='w-12 h-12 text-emerald-500' />
							</motion.div>
							<p className='text-lg font-semibold text-gray-800'>
								आपके इनपुट के आधार पर अस्पताल ढूंढ रहा हूँ
							</p>
							<p className='text-sm text-gray-500 mt-2'>
								कृपया प्रतीक्षा करें...
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main Content */}
			<main className='pt-[130px] pb-10 px-4 max-w-7xl mx-auto relative z-10'>
				<AnimatePresence mode='wait'>
					{!loading && (
						<motion.section
							initial='hidden'
							animate='visible'
							variants={containerVariants}
							className='space-y-6'>
							{/* City Selection */}
							<motion.div variants={itemVariants} className='py-3'>
								<div className='flex items-center gap-3 mb-4'>
									<MapPin className='w-5 h-5 text-emerald-600' />
									<span className='text-lg font-bold text-gray-800'>
										शहर चुनें
									</span>
								</div>
								<motion.div
									className='flex flex-wrap gap-3'
									variants={containerVariants}
									initial='hidden'
									animate='visible'>
									{cities?.map((city) => (
										<motion.div key={city.id} variants={itemVariants}>
											<motion.div
												whileHover={{ scale: 1.08 }}
												whileTap={{ scale: 0.95 }}>
												<Chip
													onClick={() => setSelectedCity(city.id)}
													color={
														selectedCity === city.id ? 'warning' : 'success'
													}
													size='lg'
													className='cursor-pointer hover:shadow-lg transition-shadow font-semibold'>
													{city.name}
												</Chip>
											</motion.div>
										</motion.div>
									))}
								</motion.div>
							</motion.div>

							{/* Hospital Details */}
							<motion.div variants={itemVariants}>
								<HospitalDetails
									hospitals={
										selectedCity
											? filteredHsp?.filter(
													(hosp) => hosp.cityId === selectedCity,
											  )
											: filteredHsp
									}
								/>
							</motion.div>
						</motion.section>
					)}
				</AnimatePresence>
			</main>

			{/* Fixed Input Bar */}
			<motion.div
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='fixed bottom-0 left-0 right-0 z-40 px-3 py-4'>
				<motion.div
					className='max-w-3xl mx-auto'
					whileHover={{ boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
					<Card className='bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl'>
						{!boatResp?.msg ? (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className='p-4 flex gap-3 items-center'>
								<Input
									size='lg'
									label='अपनी समस्या लिखें'
									placeholder='जैसे: सीने में दर्द, सांस की तकलीफ'
									value={message}
									onChange={handleChange}
									className='flex-1'
									classNames={{
										inputWrapper:
											'rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors',
										label: 'text-sm font-semibold',
									}}
								/>

								<motion.div
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}>
									<Button
										isIconOnly
										aria-label='अस्पताल ढूँढे'
										onPress={() => handleSend()}
										className='h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/40'>
										<ArrowRight className='w-6 h-6' />
									</Button>
								</motion.div>
							</motion.div>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='p-4 space-y-3'>
								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.1 }}
									className='bg-amber-50 border border-amber-200 p-3 rounded-2xl text-sm text-amber-900'>
									{boatResp?.msg}
								</motion.div>

								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.2 }}
									className='bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-sm text-emerald-900'>
									👆 ऊपर संबंधित अस्पतालों की सूची दिखाई गई है
								</motion.div>

								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
									className='flex justify-center pt-2'>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}>
										<Button
											onPress={() => setBoatResp({})}
											className='rounded-full px-6 bg-slate-800 text-white hover:bg-slate-900 font-semibold'>
											🔄 फिर से खोजें
										</Button>
									</motion.div>
								</motion.div>
							</motion.div>
						)}
					</Card>
				</motion.div>
			</motion.div>
		</div>
	);
}
