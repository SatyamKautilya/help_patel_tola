'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Employment = () => {
	const router = useRouter();
	return (
		<section className='grid grid-cols-2 gap-4'>
			<div
				onClick={() => {
					router.push('/subcategory/employment');
				}}
				className='rounded-2xl overflow-hidden h-48 bg-blue-200 backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out'>
				<img
					src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/empbg_new.png'
					alt='Employment'
					className='w-full h-full -mt-2 object-contain'
				/>
				<div className='flex absolute bottom-0 w-full flex-row justify-end items-end'>
					<span className='w-full text-center pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-cyan-600 to-cyan-500 rounded-bl-md rounded-r-md'>
						रोजगार
					</span>
				</div>
			</div>

			<div
				onClick={() => {
					router.push('/education');
				}}
				className='rounded-2xl bg-white/50 overflow-hidden w-full h-48
				backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out'>
				<img
					src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/edubg_new.png'
					alt='Education'
					className='w-full h-full object-cover'
				/>
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
