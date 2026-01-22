'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const SHGSection = () => {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				router.push('/my-shg');
				// Add your click handler logic here
			}}
			style={{
				backgroundImage: `url('https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/shgbg.png')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				padding: '24px',
				minHeight: '170px',
			}}
			className='shg-card border-1 border-b-3 border-b-pink-100    rounded-3xl overflow-hidden shadow-lg flex flex-col justify-center items-center text-center text-white'>
			{/* Add your card content here */}
		</div>
	);
};

export default SHGSection;
