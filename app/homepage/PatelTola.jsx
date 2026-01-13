'use client';
import { ArrowRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPatelTolaMember } from '../store/appSlice';
import { useRouter } from 'next/navigation';

const PatelTola = () => {
	const appContext = useSelector((state) => state.appContext.appContext);
	const router = useRouter();
	const isPatelTolaMember = useSelector(
		(state) => state.appContext.isPatelTolaMember,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (appContext?.appInstanceId == undefined) {
			return;
		}

		if (isPatelTolaMember === true) {
			return;
		}
		try {
			const appInstanceId = appContext?.appInstanceId;
			const fetchMembershipStatus = async () => {
				const response = await fetch(
					`/api/query/database?check=isPatelTolaMember&assetId=${appInstanceId}`,
				);
				const data = await response.json();

				dispatch(setIsPatelTolaMember(data.isPatelTolaMember));
			};

			fetchMembershipStatus();
		} catch (error) {
			console.error('Error fetching membership status:', error);
		}
	}, []);

	// if (!isPatelTolaMember) {
	// 	return null;
	// }

	return (
		<div
			onClick={() => {
				router.push('village/village-details');
			}}
			className='relative  rounded-3xl bg-gradient-to-br from-white/70  to-white/50  p-5 shadow-lg active:scale-95 transition'>
			{/* Header Strip */}
			<div className='absolute -top-3 left-5 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow'>
				मेरा गांव
			</div>

			{/* Main Content */}
			<div className='flex items-center gap-4'>
				{/* Village Icon */}
				<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-2xl text-white shadow'>
					🏡
				</div>

				{/* Text */}
				<div className='flex-1'>
					<h3 className='text-lg font-bold text-gray-800'>पटेल टोला</h3>
					<p className='text-sm text-gray-600'>
						गांव की जानकारी, योजनाएं और संपर्क
					</p>
				</div>

				{/* Arrow */}
				<ArrowRight className='bg-green-600/70  text-white rounded-full shadow-lg' />
				{/* <div className='text-gray-400 text-xl'>›</div> */}
			</div>

			{/* Footer Stats */}
			<div className='mt-4 grid grid-cols-3 gap-3 text-center text-xs'>
				<div className='rounded-xl bg-green-50 py-2'>
					<p className='font-semibold text-green-700'>आगामी बैठक</p>
					<p className='text-green-600'>31 जनवरी</p>
				</div>
				<div className='rounded-xl bg-blue-50 py-2'>
					<p className='font-semibold text-blue-700'>मुद्दे</p>
					<p className='text-blue-600'>2</p>
				</div>
				<div className='rounded-xl bg-purple-50 py-2'>
					<p className='font-semibold text-purple-700'>टारगेट</p>
					<p className='text-purple-600'>8</p>
				</div>
			</div>
		</div>
	);
};

export default PatelTola;
