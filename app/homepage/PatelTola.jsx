'use client';
import { ChevronRightCircle } from 'lucide-react';
import React from 'react';

import { useRouter } from 'next/navigation';

const PatelTola = () => {
	const router = useRouter();

	return (
		<div
			onClick={() => {
				router.push('village/village-details');
			}}
			className='relative rounded-3xl bg-gradient-to-br from-white/70 to-white/50 p-5 shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer hover:-translate-y-1'>
			{/* Header Strip */}
			<div className='absolute -top-3 left-5 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow-md animate-pulse'>
				मेरा गांव
			</div>

			{/* Main Content */}
			<div className='flex items-center gap-4'>
				{/* Village Icon */}
				<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-2xl text-white shadow-lg hover:scale-110 transition-transform duration-300'>
					🏡
				</div>

				{/* Text */}
				<div className='flex-1'>
					<h3 className='text-lg font-bold text-gray-800'>पटेल टोला</h3>
					<p className='text-sm text-gray-600'>
						गांव की बैठकें और विकास योजनाएँ
					</p>
				</div>

				{/* Arrow */}
				<ChevronRightCircle className='bg-green-600/70 text-white rounded-full shadow-lg hover:animate-bounce' />
			</div>

			{/* Footer Stats */}
			<div className='mt-4 grid grid-cols-3 gap-3 text-center text-xs'>
				<div className='rounded-xl bg-green-50 py-2 hover:bg-green-100 transition-colors duration-200'>
					<p className='font-semibold text-green-700'>आगामी बैठक</p>
					<p className='text-green-600'>1 मार्च</p>
				</div>
				<div className='rounded-xl bg-blue-50 py-2 hover:bg-blue-100 transition-colors duration-200'>
					<p className='font-semibold text-blue-700'>--</p>
					<p className='text-blue-600'>-</p>
				</div>
				<div className='rounded-xl bg-purple-50 py-2 hover:bg-purple-100 transition-colors duration-200'>
					<p className='font-semibold text-purple-700'>--</p>
					<p className='text-purple-600'>-</p>
				</div>
			</div>
		</div>
	);
};

export default PatelTola;
