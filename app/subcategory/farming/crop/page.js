'use client';

import { setLoader } from '@/app/store/appSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Chip } from '@heroui/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const InfoBox = ({ label, value, danger }) => (
	<div
		className={`
 rounded-xl p-3 border
      ${
				danger
					? 'bg-red-50 border-red-200 text-red-800'
					: 'bg-slate-50 border-slate-200 text-slate-700'
			}
    `}>
		<p className='text-xs font-semibold text-slate-500'>{label}</p>
		<p className='font-bold'>{value}</p>
	</div>
);

export default function CropsPage() {
	const [cropDetails, setCropDetails] = React.useState({});
	const dispatch = useDispatch();

	const [name, setName] = React.useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setName(new URLSearchParams(window.location.search).get('name') || '');
		}
	}, []);
	const {
		name: cropName,
		time,
		variety = [],
		sprays = [],
		additionalInfo = [],
		url,
	} = cropDetails;

	const fetchCropDetails = async () => {
		dispatch(setLoader(true));
		try {
			if (!name) {
				dispatch(setLoader(true));
				return;
			}
			const response = await fetch(`/api/subcategory/crops?name=${name}`);
			if (response.ok) {
				const data = await response.json();
				setCropDetails(data?.crops[0] || {});
			}
		} catch (error) {
			console.error('Failed to fetch crop details:', error);
			setCropDetails({});
		} finally {
			dispatch(setLoader(false));
		}
	};
	useEffect(() => {
		fetchCropDetails();
	}, [name]); // Depend on 'name' state

	const [showSchedule, setShowSchedule] = React.useState(false);

	return (
		<div className='relative min-h-screen bg-gradient-to-br from-emerald-50 to-lime-100 text-slate-800'>
			{/* Fixed Header */}
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: 'spring', stiffness: 120, damping: 20 }}
				className='fixed top-0 z-20 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm'>
				<div className='flex flex-col items-center pt-4'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/farming/tamoharagr.png'
						alt='Tamohar Agriculture'
						width={180}
						height={40}
						priority
					/>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: '80%' }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className='mt-3 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent'
					/>
				</div>
			</motion.header>

			<main className='pt-28 px-4 max-w-4xl mx-auto pb-10'>
				{/* Crop Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className='flex flex-col sm:flex-row gap-6 items-center bg-white p-6 rounded-3xl shadow-lg mb-8 border border-slate-100'>
					<div className='shrink-0'>
						<Image
							src={url}
							alt={cropName}
							width={140}
							height={140}
							className='w-32 h-32 rounded-full object-cover shadow-xl border-4 border-emerald-300'
						/>
					</div>

					<div className='text-center sm:text-left'>
						<h1 className='text-3xl font-extrabold text-emerald-800 mb-1'>
							{cropName}
						</h1>
						<p className='text-slate-600 text-lg font-medium'>{time}</p>
					</div>
				</motion.div>

				{/* Variety Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.6 }}
					className='bg-emerald-100 border border-emerald-300 rounded-3xl p-6 mb-8 shadow-md'>
					<h2 className='text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2'>
						<span className='text-2xl'>🌾</span> उन्नत किस्में
					</h2>

					<ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						{variety.map((item, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
								className='bg-white rounded-xl px-5 py-3 font-semibold text-slate-700 shadow-sm border border-slate-100'>
								{item}
							</motion.li>
						))}
					</ul>
				</motion.div>

				{/* Toggle Schedule Button */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.9, duration: 0.5 }}
					className='flex justify-center my-10'>
					<Button
						size='lg'
						className='
							rounded-full px-10 py-4 text-lg
							bg-gradient-to-r from-emerald-600 to-lime-600
							text-white font-extrabold
							shadow-xl shadow-emerald-500/40
							hover:from-emerald-700 hover:to-lime-700 transition-all duration-300
          '
						onPress={() => setShowSchedule((p) => !p)}>
						{showSchedule ? '❌ शैड्यूल छुपाएँ' : '🧪 स्प्रे शैड्यूल देखें'}
					</Button>
				</motion.div>

				{/* Spray Schedule */}
				<AnimatePresence>
					{showSchedule && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.5, ease: 'easeInOut' }}
							className='space-y-6'>
							{sprays.map((spray, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									className='bg-white border border-slate-200 rounded-3xl p-6 shadow-md'>
									{/* Date */}
									<div className='flex justify-between items-center mb-4'>
										<h3 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
											<span className='text-emerald-500'>📅</span>{' '}
											{spray.duedate}
										</h3>
										{spray.note && (
											<Chip color={spray.notetype || 'warning'} size='md'>
												{spray.note}
											</Chip>
										)}
									</div>

									{/* Method */}
									<div className='mb-4'>
										<Chip color='success' variant='flat' className='text-sm'>
											{spray.method === 'drenching'
												? '🌱 50 ML जड़ में डालें'
												: '🌤️ सुबह या शाम छिड़काव करें'}
										</Chip>
									</div>

									{/* Details */}
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
										<InfoBox label='प्रकार' value={spray.type} />
										<InfoBox label='टारगेट' value={spray.target} danger />
										<InfoBox label='दवाई' value={spray.name} />
										<InfoBox label='केमिकल' value={spray.chemical} />
										<InfoBox label='मात्रा' value={spray.quantity} />
									</div>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Important Notes */}
				{additionalInfo.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: showSchedule ? sprays.length * 0.1 + 0.5 : 0.5,
							duration: 0.6,
						}}
						className='mt-12 bg-amber-50 border border-amber-300 rounded-3xl p-6 shadow-md'>
						<h2 className='text-xl font-bold text-amber-900 mb-4 flex items-center gap-2'>
							<span className='text-2xl'>⚠️</span> ध्यान रखें
						</h2>

						<ul className='space-y-3'>
							{additionalInfo.map((info, index) => (
								<motion.li
									key={index}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1, duration: 0.4 }}
									className='bg-white rounded-xl px-5 py-3 font-semibold text-amber-800 shadow-sm border border-amber-100'>
									{info}
								</motion.li>
							))}
						</ul>
					</motion.div>
				)}
			</main>
		</div>
	);
}
