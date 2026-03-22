'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Briefcase, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';

const Employment = () => {
	const router = useRouter();
	return (
		<section className='grid grid-cols-2 gap-4'>
			{/* Employment Card */}
			<div
				onClick={() => router.push('/employment')}
				className='rounded-2xl overflow-hidden h-48
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out relative bg-gradient-to-br from-cyan-700 via-cyan-600 to-blue-700'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_60%)]' />
				<div className='relative h-full flex flex-col justify-between p-4'>
					<div>
						<div className='w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-2'>
							<Briefcase size={20} className='text-white' />
						</div>
						<span className='inline-block text-[9px] font-bold text-cyan-200 uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full'>
							सरकारी नौकरी
						</span>
					</div>
					<div>
						<div className='flex items-center gap-1 mb-1'>
							<span className='text-[10px] text-green-300 font-semibold'>
								● Live भर्तियां
							</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-white text-lg font-bold'>
								रोजगार
							</span>
							<ArrowRight
								size={16}
								className='text-white/50'
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Education Card */}
			<div
				onClick={() => router.push('/education')}
				className='rounded-2xl overflow-hidden w-full h-48
				shadow-[0_10px_20px_rgba(0,0,0,0.40)]
				hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
				hover:-translate-y-1
				transition-all duration-300 ease-out relative bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_60%)]' />
				<div className='relative h-full flex flex-col justify-between p-4'>
					<div>
						<div className='w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-2'>
							<GraduationCap
								size={20}
								className='text-white'
							/>
						</div>
						<span className='inline-block text-[9px] font-bold text-amber-200 uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full'>
							करियर मार्गदर्शन
						</span>
					</div>
					<div>
						<div className='flex items-center gap-1 mb-1'>
							<Sparkles
								size={11}
								className='text-yellow-200'
							/>
							<span className='text-[10px] text-yellow-200 font-semibold'>
								AI सहायक + 14 करियर
							</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-white text-lg font-bold'>
								शिक्षा
							</span>
							<ArrowRight
								size={16}
								className='text-white/50'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Employment;
