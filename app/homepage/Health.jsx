'use client';
import { Button } from '@heroui/react';
import { ChevronRightCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Health = () => {
	const router = useRouter();
	return (
		<section
			onClick={() => router.push('/subcategory/health')}
			className='rounded-3xl overflow-hidden h-50 bg-[#dfeee3] flex flex-row space-y-3 bg-cover bg-center relative 
		  bg-black/10 backdrop-blur-md
			
			hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
			hover:-translate-y-1
			transition-all duration-300 ease-out	
			border-b-3 border-b-pink-400'
			style={{
				backgroundImage:
					'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/com_hosp_bg.png)',
				backgroundBlendMode: 'color-burn',
			}}>
			<div className='flex flex-col justify-end'>
				<span className='pr-10 pl-4 py-2 text-white text-lg font-semibold bg-gradient-to-r from-teal-900 to-teal-700/40 rounded-bl-md rounded-r-md'>
					स्वास्थ्य
				</span>
			</div>
			<div className=' h-[150px] w-full flex flex-col justify-start	 items-end space-y-2 '>
				<Button
					onPress={() => {
						router.push('/subcategory/hospitals');
					}}
					size='lg'
					className='px-1 -mt-2 pt-0 pb-0 mr-2 text-white bg-green-800/60 text-md  font-bold'
					variant='flat'
					endContent={
						<ChevronRightCircle
							className='
							w-6 h-6 bg-gray-500/40 text-white rounded-full shadow-lg
							transition-transform duration-300
							group-hover:translate-x-1
							'
						/>
					}
					color='success'>
					आयुष्मान अस्पताल देखें
				</Button>
			</div>
		</section>
	);
};

export default Health;
