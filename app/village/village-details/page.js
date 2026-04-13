'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

const villageCards = [
	// {
	// 	title: 'गाँव परिचय',
	// 	desc: 'इतिहास, लोग और गौरवशाली संस्कार',
	// 	icon: '🏡',
	// 	slug: '/village/about',
	// 	accent: 'bg-orange-500',
	// 	bgGradient: 'from-orange-500/10 to-orange-500/5',
	// 	span: 'col-span-2',
	// 	isUpcoming: true,
	// },
	{
		title: 'मिशन तमोहर',
		desc: 'बैठकें और योजनाए',
		icon: '💡',
		slug: '/village/meetings/tamohar',
		accent: 'bg-blue-600',
		span: 'col-span-2',
		bgGradient: 'from-blue-600/10 to-indigo-600/5',
		isUpcoming: false,
	},
	{
		title: 'ग्राम के जल स्रोत',
		desc: 'गाँव के जल स्रोत की जांच रिपोर्ट',
		icon: '💧',
		slug: '/village/watertest',
		accent: 'bg-sky-500',
		bgGradient: 'from-sky-500/10 to-blue-500/5',
		isUpcoming: false,
	},
];

export default function VillagePage() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-[#F8FAFC] pt-6 text-slate-900 pb-20'>
			{/* Ambient Background */}
			<div className='fixed inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute -top-[10%] -right-[10%] w-[70%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full' />
				<div className='absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-orange-50/60 blur-[120px] rounded-full' />
			</div>

			{/* Header Section */}
			<header className='relative z-10 px-6 pt-5 pb-12 max-w-xl mx-auto text-center'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200 mb-6'>
					<Sparkles className='w-3.5 h-3.5 text-amber-500' />
					<span className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500'>
						डिजिटल गाँव
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className='text-4xl font-black tracking-tight text-slate-900'>
					हमारा गाँव <span className='text-blue-600'>पटेल टोला</span>
				</motion.h1>
				<p className='mt-3 text-slate-500 font-medium italic'>
					“जीवन, संस्कृति और विकास की यात्रा”
				</p>
			</header>

			{/* Bento Grid Layout */}
			<main className='relative z-10 px-4 max-w-xl mx-auto'>
				<div className='grid grid-cols-2 gap-4'>
					{villageCards.map((card, index) => (
						<motion.div
							key={card.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05 }}
							onClick={() => !card.isUpcoming && router.push(card.slug)}
							className={`
                                relative group p-5 rounded-[2rem] border transition-all duration-500
                                ${card.span || 'col-span-1'}
                                ${
																	!card.isUpcoming
																		? 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer active:scale-95'
																		: 'bg-gray-300/80 border-slate-200/60 cursor-not-allowed'
																}
                            `}>
							{/* Hover Gradient Overlay */}
							{!card.isUpcoming && (
								<div
									className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
								/>
							)}

							<div className='relative z-10 flex flex-col h-full'>
								<div className='flex justify-between items-start mb-4'>
									<div
										className={`w-12 h-12 flex items-center justify-center rounded-2xl text-2xl shadow-sm ${card.accent} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
										{card.icon}
									</div>
									{card.isUpcoming ? (
										<>
											<Lock className='w-4 h-4 text-red-700' />
										</>
									) : (
										<ArrowUpRight className='w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors' />
									)}
								</div>

								<h2 className='text-[16px] font-bold text-slate-800 leading-tight mb-1'>
									{card.title}
								</h2>
								<p className='text-[12px] text-slate-500 font-medium leading-snug'>
									{card.desc}
								</p>

								{card.isUpcoming && (
									<div className='mt-4'>
										<span className='text-[9px] font-bold text-green-600 uppercase tracking-tighter bg-slate-200/50 px-2 py-0.5 rounded-md'>
											जल्द आ रहा है
										</span>
									</div>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</main>

			{/* Floating Navigation Blur (for mobile feel) */}
			<div className='fixed bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none' />
		</div>
	);
}
