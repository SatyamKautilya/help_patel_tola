'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Kheti = () => {
	const router = useRouter();
	return (
		<section className='grid grid-cols-2 gap-4'>
			<div
				onClick={() => {
					router.push('/subcategory/farming');
				}}
				style={{
					backgroundImage:
						'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/farmbg_new.png)',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}
				className='rounded-2xl  overflow-hidden   h-30  bg-blue-200 backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out'>
				<div className='flex h-full flex-row justify-end items-end'>
					<span className=' w-full text-center pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-teal-900 to-teal-500/80 rounded-bl-md rounded-r-md'>
						आधुनिक कृषि
					</span>
				</div>
			</div>

			<div
				onClick={() => {
					router.push('/govt-schemes');
				}}
				style={{
					backgroundImage:
						'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/govtbg_new.png)',

					backgroundSize: 'calc(100% - 0px) calc(100% - 0px)',
				}}
				className='rounded-2xl bg-white/50  overflow-hidden  w-full h-48
                backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out'>
				<div className='flex h-full flex-row justify-center items-end'>
					<span className=' w-full text-center pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-cyan-900 to-cyan-600 rounded-bl-md rounded-r-md'>
						सरकारी योजनाएं
					</span>
				</div>
			</div>
		</section>
	);
};

export default Kheti;
