'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const ContactCard = () => {
	const router = useRouter();

	return (
		<section
			onClick={() => {
				router.push('subcategory/contacts');
			}}
			className='
    relative overflow-hidden rounded-2xl p-5
    bg-gradient-to-br from-[#f6f2ea] via-[#ece4d7] to-[#dbae60]
    border-1 border-[#d4c4a8] border-b-3 border-b-[#c9a855]
    shadow-[0_10px_20px_rgba(0,0,0,0.40)]
  	hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
  	hover:-translate-y-1
  	transition-all duration-300 ease-out cursor-pointer
  '>
			{/* soft decorative icon */}
			<div className='absolute -top-4 -right-4 text-5xl opacity-20'>📞</div>

			{/* Header */}
			<div className='flex items-center gap-3'>
				<div
					className='
        flex items-center justify-center w-10 h-10 rounded-full
        bg-[#e6ddcc] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)]
        backdrop-blur-md 
      '>
					📞
				</div>

				<h2 className='text-lg font-semibold text-[#5b4a2f] tracking-wide'>
					संपर्क सूत्र
				</h2>
			</div>

			{/* Description */}
			<p className='text-sm mt-3 text-[#6f5f3f] leading-relaxed font-medium'>
				महत्वपूर्ण व्यक्तियों से जुड़ें
			</p>

			{/* Action hint */}
			<div className='mt-4 inline-flex items-center gap-1 text-sm text-[#8a734a] group'>
				<span className='group-hover:translate-x-0.5 transition-transform duration-200'>
					देखें
				</span>
				<span className='text-base group-hover:translate-x-1 transition-transform duration-200'>
					›
				</span>
			</div>
		</section>
	);
};

export default ContactCard;
