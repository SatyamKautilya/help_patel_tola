'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Employment = () => {
	const router = useRouter();
	return (
		<section
			className='rounded-2xl bg-[linear-gradient(to_right,#e6f0ff_0%,#bfdbfe_40%,#f7e7b4_75%,#e6c46b_100%)]
 			p-5 
			
 			backdrop-blur-md
  			shadow-[0_10px_20px_rgba(0,0,0,0.40)]
  			hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
  			hover:-translate-y-1
  			transition-all duration-300 ease-out'>
			<h2 className='text-lg font-bold text-lime-700 mb-0 text-center'>
				शिक्षा, कौशल एवं रोजगार
			</h2>
			<div className='w-full mt- h-px mb-8 bg-gradient-to-r from-transparent via-lime-700 to-transparent' />

			<div className='grid grid-cols-2 gap-4'>
				<div className='rounded-xl bg-blue-700/10 pt-4 shadow'>
					<Image
						src={
							'https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/kindpng_1337272.png'
						}
						alt='Livelihood'
						width={600}
						height={100}
						className='-mt-8'
					/>
					<div className='w-full  flex flex-row justify-end items-end'>
						<span className=' w-full text-end pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-blue-400 to-cyan/30 rounded-bl-md rounded-br-xl'>
							रोजगार
						</span>
					</div>
				</div>

				<div
					onClick={() => {
						router.push('govt-schemes');
					}}
					className='rounded-xl bg-yellow-400/20 pt-4 shadow'>
					<Image
						src={
							'https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/tree.png'
						}
						alt='Livelihood'
						width={200}
						height={30}
						className='-mt-9 w-36 h-16'
					/>
					<div
						onClick={() => {}}
						className='w-full  flex flex-row justify-end items-end'>
						<span className=' w-full text-end pr-3 py-2 text-teal-900 text-lg font-semibold bg-gradient-to-l from-gold to-cyan/30 rounded-bl-md rounded-br-xl'>
							शिक्षा
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Employment;
