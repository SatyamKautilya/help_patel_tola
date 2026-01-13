'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const About = () => {
	const router = useRouter();
	return (
		<div className='flex gap-4 mb-6'>
			{/* Hindi */}
			<footer
				onClick={() => router.push('/about-hindi')}
				className='
					group flex-1 cursor-pointer
					rounded-2xl p-5 text-center
					bg-gradient-to-br from-[#f7dc9c] to-[#e8b85c]
					shadow-[0_8px_24px_rgba(120,80,20,0.35)]
					hover:shadow-[0_14px_40px_rgba(120,80,20,0.45)]
					hover:-translate-y-1
					active:scale-95
					transition-all duration-300
					'>
				<p className='text-sm font-semibold text-[#5a3d12] tracking-wide'>
					तमोहर के बारे में जानें
				</p>
				<span className='mt-1 block text-xs text-[#7a5a22] opacity-80'>
					हिंदी में
				</span>
			</footer>

			{/* English */}
			<footer
				onClick={() => router.push('/about')}
				className='
					group flex-1 cursor-pointer
					rounded-2xl p-5 text-center
					bg-gradient-to-br from-[#f7dc9c] to-[#e8b85c]
					shadow-[0_8px_24px_rgba(120,80,20,0.35)]
					hover:shadow-[0_14px_40px_rgba(120,80,20,0.45)]
					hover:-translate-y-1
					active:scale-95
					transition-all duration-300
					'>
				<p className='text-sm font-semibold text-[#5a3d12] tracking-wide'>
					About Tamohar
				</p>
				<span className='mt-1 block text-xs text-[#7a5a22] opacity-80'>
					in English
				</span>
			</footer>
		</div>
	);
};

export default About;
