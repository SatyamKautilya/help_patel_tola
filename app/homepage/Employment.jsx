'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Employment = () => {
	const router = useRouter();
	return (
		<section className='grid grid-cols-2 gap-4'>
			{/* Employment Card */}
			<div
				onClick={() => router.push('/employment')}
				className='rounded-2xl overflow-hidden h-48 backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out relative'>
				<img
					src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/empbg_new.png'
					alt='Employment'
					className='w-full h-full -mt-2 object-contain'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div>
				<div className='absolute top-3 left-3'>
					<span className='inline-flex items-center gap-1 text-[9px] font-bold text-white bg-green-600/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm'>
						<span className='w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse' />
						Live भर्तियां
					</span>
				</div>
				<div className='flex absolute bottom-0 w-full flex-row justify-center items-end'>
					<span className='w-full text-center pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-cyan-600 to-cyan-500 rounded-bl-md rounded-r-md'>
						रोजगार
					</span>
				</div>
			</div>

			{/* Education Card */}
			<div
				onClick={() => router.push('/education')}
				className='rounded-2xl overflow-hidden w-full h-48
				backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out relative'>
				<img
					src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/edubg_new.png'
					alt='Education'
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div>
				<div className='absolute top-3 left-3'>
					<span className='inline-flex items-center gap-1 text-[9px] font-bold text-white bg-amber-600/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm'>
						✨ करियर मार्गदर्शन
					</span>
				</div>
				<div className='flex absolute bottom-0 w-full flex-row justify-center items-end'>
					<span className='w-full text-center pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-r from-yellow-700 to-yellow-400 rounded-bl-md rounded-r-md'>
						शिक्षा
					</span>
				</div>
			</div>
		</section>
	);
};

export default Employment;
