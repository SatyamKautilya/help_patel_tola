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
 			backdrop-blur-md bg-transparent
  			shadow-[0_10px_20px_rgba(0,0,0,0.40)]
  			hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
  			hover:-translate-y-1
  			transition-all duration-300 ease-out'>
			<h2 className='text-lg font-bold text-[#3a5a40] mb-0 text-center'>
				शिक्षा, कौशल एवं रोजगार
			</h2>
			<div className='w-full mt- h-px mb-8 bg-gradient-to-r from-transparent via-[#3a5a40] to-transparent' />

			<div className='grid grid-cols-2 gap-4'>
				<div
					onClick={() => {
						router.push('/subcategory/employment');
					}}
					className='relative overflow-hidden rounded-xl bg-gradient-to-br from-[#d4e6f1] to-[#a7d9f7] p-4 shadow-md
					hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-pointer'>
					<div className='absolute -top-4 -right-4 text-5xl opacity-20'>💼</div>
					<div className='flex flex-col justify-between h-full'>
						<h3 className='text-md font-semibold text-[#2c5f85]'>रोजगार</h3>
						<p className='text-sm text-[#4a7fa8] mt-1'>नौकरी के अवसर</p>
					</div>
				</div>

				<div
					onClick={() => {
						router.push('/subcategory/education');
					}}
					className='relative overflow-hidden rounded-xl bg-gradient-to-br from-[#fcf8e3] to-[#f7e7b4] p-4 shadow-md
					hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-pointer'>
					<div className='absolute -top-4 -right-4 text-5xl opacity-20'>📚</div>
					<div className='flex flex-col justify-between h-full'>
						<h3 className='text-md font-semibold text-[#8a6d3b]'>शिक्षा</h3>
						<p className='text-sm text-[#a88a5a] mt-1'>शैक्षणिक जानकारी</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Employment;
