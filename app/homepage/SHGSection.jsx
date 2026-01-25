'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const SHGSection = () => {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				router.push('/shg/shg-homepage');
				// Add your click handler logic here
			}}
			style={{
				backgroundImage: `url('https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/shgbg.png')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				padding: '24px',
				minHeight: '170px',
			}}
			className='shg-card border-1 border-b-3 border-b-pink-100 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-end text-center text-white'>
			{/* Add your card content here */}

			<div className='flex flex-row w-full justify-between'>
				<span className='bg-green-800 px-4'>मेरे समूह</span>
				<span className='bg-yellow-400 px-4'>ऋण</span>
				<span className='bg-red-600 px-4'>बकाया</span>
			</div>
		</div>
	);
};

export default SHGSection;
