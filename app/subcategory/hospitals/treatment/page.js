'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import DiseaseCard from './DiseaseCard';

const page = () => {
	const [sops, setSops] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSop = async () => {
		try {
			const response = await fetch('/api/subcategory/hospitals?name=sops');
			if (response.ok) {
				const data = await response.json();
				return data.sops;
			}
		} catch (error) {
			console.error('Failed to fetch SOPs:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const savesop = await getSop();
			setSops(savesop);
		};
		fetchData();
	}, []);

	return (
		<div className='relative min-h-screen overflow-x-hidden bg-[#F8FAFC]'>
			{/* 1. DYNAMIC MORPHING BACKGROUND (LIGHT COLORS) */}
			<div className='fixed inset-0 z-0 pointer-events-none'>
				{/* Soft Sky Blue Blob */}
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
						rotate: [0, 45, 0],
						borderRadius: [
							'40% 60% 70% 30% / 40% 50% 60% 70%',
							'60% 40% 30% 70% / 60% 30% 70% 40%',
							'40% 60% 70% 30% / 40% 50% 60% 70%',
						],
					}}
					transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
					className='absolute top-[-10%] right-[-10%] w-[80vw] h-[80vh] bg-blue-100/50 blur-[100px]'
				/>
				{/* Soft Emerald/Green Blob */}
				<motion.div
					animate={{
						scale: [1.2, 1, 1.2],
						rotate: [0, -45, 0],
						borderRadius: [
							'50% 50% 20% 80% / 25% 80% 20% 75%',
							'30% 70% 70% 30% / 60% 40% 60% 40%',
							'50% 50% 20% 80% / 25% 80% 20% 75%',
						],
					}}
					transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
					className='absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vh] bg-emerald-100/50 blur-[120px]'
				/>
			</div>

			{/* 2. ORIGINAL LIGHT HEADER */}
			<header className='fixed top-0 z-50 w-full flex flex-col items-center pt-8 pb-4 bg-white/70 backdrop-blur-md border-b border-white/40'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='flex flex-col items-center'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png'
						alt='Health Topics'
						width={250}
						height={56}
						priority
					/>
					{/* Your Emerald Gradient Line */}
					<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
				</motion.div>
			</header>

			{/* 3. CONTENT AREA */}
			<main className='relative z-10 pt-32 px-4 pb-20 max-w-2xl mx-auto'>
				{loading ? (
					<div className='flex justify-center pt-20'>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
							className='w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full'
						/>
					</div>
				) : (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: { staggerChildren: 0.15 },
							},
						}}
						className='space-y-4'>
						{Array.isArray(sops) &&
							sops.map((sop, idx) => (
								<motion.div
									key={idx}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}>
									<DiseaseCard disease={sop} />
								</motion.div>
							))}
					</motion.div>
				)}
			</main>

			{/* Style to keep it app-like */}
			<style jsx global>{`
				::-webkit-scrollbar {
					display: none;
				}
				body {
					-ms-overflow-style: none;
					scrollbar-width: none;
					background: #f8fafc;
				}
			`}</style>
		</div>
	);
};

export default page;
