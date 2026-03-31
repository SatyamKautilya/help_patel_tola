'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const SkillAndBusiness = () => {
	const router = useRouter();
	return (
		<section className='grid grid-cols-2 gap-4'>
			{/* Kaushal Vikas Card  ok */}
			<motion.div
				whileTap={{ scale: 0.96 }}
				onClick={() => router.push('/kaushal-vikas')}
				className='rounded-2xl overflow-hidden h-48 backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:-translate-y-1
				transition-all duration-300 ease-out relative cursor-pointer
				bg-gradient-to-br from-orange-600 via-amber-700 to-yellow-800'>
				{/* Decorative circles */}
				<div className='absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10' />
				<div className='absolute bottom-8 -left-4 w-16 h-16 rounded-full bg-white/5' />

				{/* Content */}
				<div className='relative z-10 h-full flex flex-col justify-between p-4'>
					<div>
						<span className='inline-flex items-center gap-1 text-[9px] font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm'>
							<span className='w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse' />
							नया
						</span>
					</div>
					<div className='text-4xl'>🔧</div>
					<div>
						<span className='w-full text-center text-white text-lg font-bold block'>
							कौशल विकास
						</span>
						<p className='text-[10px] text-white/60 text-center mt-0.5'>
							Skill Development
						</p>
					</div>
				</div>
			</motion.div>

			{/* Vyapar Card */}
			<motion.div
				whileTap={{ scale: 0.96 }}
				onClick={() => router.push('/vyapar')}
				className='rounded-2xl overflow-hidden h-48 backdrop-blur-md
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:-translate-y-1
				transition-all duration-300 ease-out relative cursor-pointer
				bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800'>
				{/* Decorative circles */}
				<div className='absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10' />
				<div className='absolute bottom-8 -left-4 w-16 h-16 rounded-full bg-white/5' />

				{/* Content */}
				<div className='relative z-10 h-full flex flex-col justify-between p-4'>
					<div>
						<span className='inline-flex items-center gap-1 text-[9px] font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm'>
							<span className='w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse' />
							नया
						</span>
					</div>
					<div className='text-4xl'>🏪</div>
					<div>
						<span className='w-full text-center text-white text-lg font-bold block'>
							व्यापार
						</span>
						<p className='text-[10px] text-white/60 text-center mt-0.5'>
							Business Directory
						</p>
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default SkillAndBusiness;
