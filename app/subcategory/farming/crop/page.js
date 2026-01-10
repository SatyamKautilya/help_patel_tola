'use client';

import { setLoader } from '@/app/store/appSlice';
import { Button, Chip } from '@heroui/react';
import Image from 'next/image';
// import { useSearchParams } from 'next/navigation';
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
		<p className='text-sm font-semibold'>{label}</p>
		<p className='font-bold'>{value}</p>
	</div>
);

export default function CropsPage() {
	const [cropDetails, setCropDetails] = React.useState({});
	const dispatch = useDispatch();
	// const searchParams = useSearchParams();
	// const name = searchParams.get('name');
	// const name = 'tomato';

	const name = 'tomato';
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
	}, [name]);

	const [showSchedule, setShowSchedule] = React.useState(false);

	return (
		<div className='max-w-4xl mx-auto  pb-10'>
			<header className='fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40'></header>
			<header className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40'>
				<div className='flex flex-col items-center pt-7'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/farming/tamoharagr.png'
						alt='Health Topics'
						width={200}
						height={46}
						priority
					/>
					<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
				</div>
			</header>
			<div className='pt-24 px-4'>
				{/* 🌱 Header */}
				<div className='flex gap-5 items-center mt-6 mb-8'>
					<div className='shrink-0'>
						<Image
							src={url}
							alt={cropName}
							width={120}
							height={120}
							className='w-28 h-28 rounded-2xl object-cover shadow-md'
						/>
					</div>

					<div>
						<h1 className='text-2xl font-bold text-slate-800'>{cropName}</h1>
						<p className='text-slate-600 mt-1'>{time}</p>
					</div>
				</div>

				{/* 🌾 Variety Section */}
				<div className='bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6'>
					<h2 className='text-lg font-bold text-emerald-800 mb-3'>
						🌾 उन्नत किस्में
					</h2>

					<ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
						{variety.map((item, index) => (
							<li
								key={index}
								className='bg-white rounded-xl px-4 py-2 font-semibold text-slate-700 shadow-sm'>
								{item}
							</li>
						))}
					</ul>
				</div>

				{/* 🧪 Toggle Schedule */}
				<div className='flex justify-center my-8'>
					<Button
						size='lg'
						className='
            rounded-full px-8
            bg-gradient-to-r from-emerald-500 to-lime-500
            text-white font-bold
            shadow-lg shadow-emerald-500/30
          '
						onPress={() => setShowSchedule((p) => !p)}>
						{showSchedule ? '❌ शैड्यूल छुपाएँ' : '🧪 स्प्रे शैड्यूल देखें'}
					</Button>
				</div>

				{/* 🧪 Spray Schedule */}
				{showSchedule && (
					<div className='space-y-6'>
						{sprays.map((spray, index) => (
							<div
								key={index}
								className='bg-white border border-slate-200 rounded-3xl p-5 shadow-sm'>
								{/* Date */}
								<div className='flex justify-between items-center mb-3'>
									<h3 className='text-lg font-bold text-slate-800'>
										📅 {spray.duedate}
									</h3>
									{spray.note && (
										<Chip color={spray.notetype || 'warning'} size='sm'>
											{spray.note}
										</Chip>
									)}
								</div>

								{/* Method */}
								<div className='mb-3'>
									<Chip color='success' variant='flat'>
										{spray.method === 'drenching'
											? '🌱 50 ML जड़ में डालें'
											: '🌤️ सुबह या शाम छिड़काव करें'}
									</Chip>
								</div>

								{/* Details */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
									<InfoBox label='प्रकार' value={spray.type} />
									<InfoBox label='टारगेट' value={spray.target} danger />
									<InfoBox label='दवाई' value={spray.name} />
									<InfoBox label='केमिकल' value={spray.chemical} />
									<InfoBox label='मात्रा' value={spray.quantity} />
								</div>
							</div>
						))}
					</div>
				)}

				{/* ⚠️ Important Notes */}
				{additionalInfo.length > 0 && (
					<div className='mt-10'>
						<h2 className='text-xl font-bold text-slate-800 mb-4'>
							⚠️ ध्यान रखें
						</h2>

						<div className='space-y-3'>
							{additionalInfo.map((info, index) => (
								<div
									key={index}
									className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
									<p className='font-semibold text-amber-900'>{info}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
