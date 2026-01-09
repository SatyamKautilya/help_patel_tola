import React from 'react';

const ContactCard = () => {
	return (
		<section
			className='
    relative overflow-hidden
    rounded-2xl p-5
    bg-gradient-to-br from-[#f6f2ea] via-[#ece4d7] to-[#dbae60]
    shadow-[0_10px_28px_rgba(90,74,47,0.25)]
  '>
			{/* soft decorative icon */}
			<div className='absolute -top-6 -right-6 text-[#c8b28a] text-7xl opacity-20'>
				☎️
			</div>

			{/* Header */}
			<div className='flex items-center gap-3'>
				<div
					className='
        flex items-center justify-center
        w-10 h-10 rounded-full
        bg-[#e6ddcc]
        shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)]
        backdrop-blur-md
 
  hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
  hover:-translate-y-1
  transition-all duration-300 ease-out
      '>
					📞
				</div>

				<h2 className='text-lg font-semibold text-[#5b4a2f] tracking-wide'>
					संपर्क सूत्र
				</h2>
			</div>

			{/* Description */}
			<p className='text-sm mt-3 text-[#6f5f3f] leading-relaxed'>
				डॉक्टर, स्वयंसेवक, अधिकारी
			</p>

			{/* Action hint */}
			<div className='mt-4 inline-flex items-center gap-1 text-sm text-[#8a734a]'>
				<span>देखें</span>
				<span className='text-base'>›</span>
			</div>
		</section>
	);
};

export default ContactCard;
