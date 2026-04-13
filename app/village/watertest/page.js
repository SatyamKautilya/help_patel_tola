'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Droplet, ChevronRight } from 'lucide-react';
import waterTestData from '../watertest.json';

export default function WaterTestPage() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-[#F8FAFC] pt-6 text-slate-900 pb-20'>
			{/* Ambient Background */}
			<div className='fixed inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute -top-[10%] -right-[10%] w-[70%] h-[50%] bg-sky-100/40 blur-[120px] rounded-full' />
				<div className='absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-50/60 blur-[120px] rounded-full' />
			</div>

			{/* Header Section */}
			<header className='relative z-10 px-6 pt-5 pb-12 max-w-2xl mx-auto text-center'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200 mb-6'>
					<Droplet className='w-3.5 h-3.5 text-sky-500' />
					<span className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500'>
						जल परीक्षण
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className='text-4xl font-black tracking-tight text-slate-900 mb-2'>
					ग्राम के <span className='text-sky-600'>जल स्रोत</span>
				</motion.h1>
				<p className='text-slate-500 font-medium'>
					{waterTestData.length} जल स्रोत की जांच रिपोर्ट
				</p>
			</header>

			{/* Cards List */}
			<main className='relative z-10 px-4 max-w-2xl mx-auto'>
				<div className='space-y-3'>
					{waterTestData.map((water, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.03 }}
							onClick={() => router.push(`/village/watertest/${index}`)}
							className='bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between hover:shadow-lg hover:border-sky-300 transition-all cursor-pointer active:scale-98'>
							<div className='flex items-center gap-4 flex-1'>
								<div className='w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0'>
									<Droplet className='w-5 h-5 text-sky-600' />
								</div>
								<h3 className='text-lg font-bold text-slate-900'>{water.source}</h3>
							</div>
							<ChevronRight className='w-5 h-5 text-slate-400 group-hover:text-sky-500 flex-shrink-0' />
						</motion.div>
					))}
				</div>
			</main>

			{/* Footer Blur */}
			<div className='fixed bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none' />
		</div>
	);
}
