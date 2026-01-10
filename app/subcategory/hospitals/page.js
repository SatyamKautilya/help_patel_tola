'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, Chip, Input } from '@heroui/react';
import HospitalDetails from './HospitalDetails';
import { filterhospitals, hideBackButton } from '@/hooks/utils';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { setLoader } from '@/app/store/appSlice';
import { useDispatch } from 'react-redux';

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

	const handleChange = React.useCallback((e) => {
		setMessage(e.target.value);
	}, []);

	return (
		<div className='relative min-h-screen pb-10 bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-100'>
			{/* 🔹 Fixed Header */}
			<header className='fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40'></header>
			<header className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40'>
				<div className='flex flex-col items-center pt-7'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png'
						alt='Health Topics'
						width={250}
						height={56}
						priority
					/>
					<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
				</div>
			</header>

			{/* 🔹 Content */}
			<main className='pt-[110px] pb-10 px-4  max-w-7xl mx-auto'>
				<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{loading ? (
						<div className='fixed  inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
							<div className='bg-white mx-10 rounded-2xl px-8 py-6 shadow-xl text-center animate-fadeScale'>
								<p className='text-lg font-semibold text-gray-800'>
									आपके इनपुट के आधार पर अस्पताल ढूंढ रहा हूँ
								</p>
								<p className='text-sm text-gray-500 mt-1'>
									कृपया प्रतीक्षा करें...
								</p>

								{/* Spinner */}
								<div className='mt-4 flex justify-center'>
									<div className='h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
								</div>
							</div>
						</div>
					) : (
						<>
							<div className=' py-3 flex flex-row flex-wrap gap-3'>
								<span className='block  text-center text-lg pl-2 font-semibold'>
									शहर चुनें :
								</span>
								{cities?.map((city) => {
									return (
										<>
											<Chip
												onClick={() => {
													setSelectedCity(city.id);
												}}
												color={selectedCity === city.id ? 'warning' : 'success'}
												size='lg'
												className=' hover:opacity-100 transition-opacity'>
												{city.name}
											</Chip>
										</>
									);
								})}
							</div>
							<HospitalDetails
								hospitals={
									selectedCity
										? filteredHsp?.filter(
												(hosp) => hosp.cityId === selectedCity,
										  )
										: filteredHsp
								}
							/>
						</>
					)}
					<div
						className='
									fixed bottom-10 left-0 right-0 z-50
									px-3
								'>
						<div
							className='
								max-w-3xl mx-auto
								bg-white/90 backdrop-blur-md
								border border-slate-200
								shadow-xl
								rounded-3xl
								'>
							{!boatResp?.msg ? (
								<div className='p-4 flex gap-3 items-center'>
									{/* Input */}
									<Input
										size='lg'
										label='अपनी समस्या लिखें'
										placeholder='जैसे: सीने में दर्द, सांस की तकलीफ'
										value={message}
										onChange={handleChange}
										className='flex-1'
										classNames={{
											inputWrapper:
												'rounded-2xl bg-slate-50 border border-slate-200',
											label: 'text-sm font-semibold',
										}}
									/>

									{/* CTA Button */}
									<Button
										isIconOnly
										aria-label='अस्पताल ढूँढे'
										onPress={() => handleSend()}
										className='
												h-14 w-14 rounded-full
												bg-gradient-to-br from-emerald-500 to-teal-500
												text-white
												shadow-lg shadow-emerald-500/40
												transition-all duration-300
												hover:scale-110
											'>
										<ArrowRight
											className='
                                                    w-6 h-6
                                                    transition-transform duration-300
                                                    group-hover:translate-x-1
                                                    '
										/>
									</Button>
								</div>
							) : (
								<div className='p-4 space-y-3'>
									{/* AI / System Message */}
									<div className='bg-amber-50 border border-amber-200 p-3 rounded-2xl text-sm text-amber-900'>
										{boatResp?.msg}
									</div>

									{/* Guidance */}
									<div className='bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-sm text-emerald-900'>
										👆 ऊपर संबंधित अस्पतालों की सूची दिखाई गई है
									</div>

									{/* Reset */}
									<div className='flex justify-center pt-2'>
										<Button
											onPress={() => setBoatResp({})}
											className='
													rounded-full px-6
													bg-slate-800 text-white
													hover:bg-slate-900
													'>
											🔄 फिर से खोजें
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>
			<header className='fixed h-10 bottom-0 z-20 w-full bg-black/20 backdrop-blur-md border-b border-white/40'></header>
		</div>
	);
}
