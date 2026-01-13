'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const villageCards = [
	{
		title: 'गाँव परिचय',
		desc: 'इतिहास, लोग और संस्कार',
		icon: '🏡',
		slug: '/village/about',
		bgColor: 'bg-orange-100',
		iconColor: 'text-orange-600',
		span: 'col-span-2',
	},
	{
		title: 'खेती व रोजगार',
		desc: 'फसलें और मेहनत',
		icon: '🌾',
		slug: '/village/farming',
		bgColor: 'bg-emerald-100',
		iconColor: 'text-emerald-600',
	},
	{
		title: 'शिक्षा',
		desc: 'बच्चों का भविष्य',
		icon: '🎓',
		slug: '/village/education',
		bgColor: 'bg-blue-100',
		iconColor: 'text-blue-600',
	},
	{
		title: 'स्वास्थ्य',
		desc: 'अस्पताल व सुविधा',
		icon: '🏥',
		slug: '/village/health',
		bgColor: 'bg-rose-100',
		iconColor: 'text-rose-600',
	},
	{
		title: 'आधारभूत सुविधा',
		desc: 'पानी, बिजली, सड़क',
		icon: '💧',
		slug: '/village/infrastructure',
		bgColor: 'bg-sky-100',
		iconColor: 'text-sky-600',
	},
	{
		title: 'समाज व संस्कृति',
		desc: 'त्योहार और एकता',
		icon: '🧑‍🤝‍🧑',
		slug: '/village/community',
		bgColor: 'bg-amber-100',
		iconColor: 'text-amber-600',
	},
	{
		title: 'विकास लक्ष्य',
		desc: 'योजनाएँ और सहयोग',
		icon: '🚀',
		slug: '/village/development',
		bgColor: 'bg-purple-100',
		iconColor: 'text-purple-600',
	},
];

export default function VillagePage() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-[#F8FAFC] text-slate-900'>
			{/* Soft Background Decorative Blobs */}
			<div className='fixed inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-[10%] -right-[10%] w-[50%] h-[40%] bg-blue-100/50 blur-[100px] rounded-full' />
				<div className='absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-orange-50/50 blur-[100px] rounded-full' />
			</div>

			{/* Header */}
			<header className='relative z-10 px-6 pt-14 pb-8'>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center'>
					<h1 className='text-3xl font-extrabold tracking-tight text-slate-900'>
						हमारा गाँव <span className='text-blue-600'>पटेल टोला</span>
					</h1>
					<p className='mt-2 text-slate-500 text-sm font-medium'>
						जीवन, संस्कृति और विकास की एक सुंदर झलक
					</p>
					<div className='mt-4 flex justify-center'>
						<div className='h-1 w-12 bg-blue-600 rounded-full' />
					</div>
				</motion.div>
			</header>

			{/* Main Grid */}
			<main className='relative z-10 px-5 pb-20'>
				<div className='grid grid-cols-2 gap-4 max-w-md mx-auto'>
					{villageCards.map((card, index) => (
						<motion.div
							key={card.title}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.05 }}
							onClick={() => router.push(card.slug)}
							className={`
                                cursor-pointer group relative
                                flex flex-col justify-between
                                rounded-[2rem] p-5
                                bg-white border border-slate-200
                                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                                hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                                hover:-translate-y-1
                                active:scale-95 transition-all duration-300
                                ${card.span || 'col-span-1'}
                            `}>
							<div>
								<div
									className={`
                                    text-2xl mb-4 w-12 h-12 
                                    flex items-center justify-center 
                                    rounded-2xl ${card.bgColor} 
                                    shadow-sm group-hover:scale-110 transition-transform duration-300
                                `}>
									{card.icon}
								</div>
								<h2 className='text-[16px] font-bold text-slate-800 leading-tight'>
									{card.title}
								</h2>
								<p className='text-[12px] text-slate-500 mt-1.5 font-medium leading-relaxed'>
									{card.desc}
								</p>
							</div>

							{/* Modern Arrow Indicator */}
							<div className='mt-4 flex items-center text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity'>
								विस्तार देखें
								<svg
									className='ml-1 w-3 h-3'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={3}
										d='M9 5l7 7-7 7'
									/>
								</svg>
							</div>
						</motion.div>
					))}
				</div>
			</main>
		</div>
	);
}
