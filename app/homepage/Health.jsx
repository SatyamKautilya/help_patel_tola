'use client';
import { Button } from '@heroui/react';
import { ArrowRight, ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Health = () => {
	const router = useRouter();
	return (
		<section
			onClick={() => router.push('/subcategory/health')}
			className='rounded-2xl overflow-hidden h-50 bg-[#dfeee3] flex flex-row  space-y-3 bg-cover bg-center  relative 
		  bg-black/10 backdrop-blur-md
			shadow-[0_10px_20px_rgba(0,0,0,0.40)]
			hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
			hover:-translate-y-1
			transition-all duration-300 ease-out'
			style={{
				backgroundImage:
					'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/healthbg.png)',
				backgroundBlendMode: 'color-burn',
			}}>
			<div className='flex flex-col justify-end'>
				<span className='pl-4 py-2 text-white text-lg font-semibold bg-gradient-to-r from-teal-900 to-black/0 rounded-bl-md rounded-r-md'>
					स्वास्थ्य
				</span>
			</div>
			<div className=' h-[150px] flex flex-col justify-start items-end space-y-2 p-4'>
				<Button
					onPress={() => {
						router.push('/subcategory/hospitals');
					}}
					size='lg'
					className='p-1 -mr-2 -mt-4 text-white bg-green-800/60 text-lg  font-bold'
					variant='flat'
					endContent={
						<ArrowRight
							className='
							w-6 h-6
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
