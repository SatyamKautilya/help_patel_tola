import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HEALTH_SUVICHAR_GROUPS as data } from '@/lib/healthSuvicharMessages';

const Suvichar = () => {
	const [loading, setLoading] = useState(false);

	const ROTATION_DELAY = 6000; // 4 seconds per message

	const [groupIndex, setGroupIndex] = useState(0);
	const [messageIndex, setMessageIndex] = useState(0);
	const [message, setMessage] = useState('');
	const [isChangingGroup, setIsChangingGroup] = useState(false);

	// 1️⃣ Pick a random group (disease)
	const pickRandomGroup = () => {
		return Math.floor(Math.random() * data.length);
	};

	useEffect(() => {
		if (!data?.length || isChangingGroup) return;

		const currentGroup = data[groupIndex];
		if (!currentGroup?.length) return;

		setMessage(currentGroup[messageIndex]);

		const rotationTimer = setTimeout(() => {
			if (messageIndex < currentGroup.length - 1) {
				setMessageIndex((prev) => prev + 1);
			} else {
				setIsChangingGroup(true);
				setLoading(true);
			}
		}, ROTATION_DELAY);

		return () => clearTimeout(rotationTimer);
	}, [groupIndex, messageIndex, data, isChangingGroup]);

	useEffect(() => {
		if (!isChangingGroup) return;

		const loadingTimer = setTimeout(() => {
			setLoading(false);
			setGroupIndex((prev) => pickRandomGroup(prev));
			setMessageIndex(0);
			setIsChangingGroup(false);
		}, 1000);

		return () => clearTimeout(loadingTimer);
	}, [isChangingGroup]);

	return (
		<section
			className='relative overflow-hidden  rounded-2xl py-4 pr-4 pl-3  lotus-bg
			backdrop-blur-md
  			shadow-[0_10px_20px_rgba(0,0,0,0.40)]
 			 hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
 			 hover:-translate-y-1
 			 transition-all duration-300 ease-out'>
			{/* subtle cloud motion overlay */}
			<div className='absolute inset-0 cloud-float opacity-60 pointer-events-none' />

			<div className='relative flex flex-row'>
				<div className='flex flex-row justify-start items-center gap-1'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/pngwing.com.png'
						width={50}
						height={50}
						alt='Lotus'
						className='drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
					/>

					<span className='relative '>
						{loading ? (
							<div className='mt-2 space-y-2'>
								<div className='h-3 w-48 rounded-md bg-white/40 shimmer' />
								<div className='h-3 w-36 rounded-md bg-white/30 shimmer' />
							</div>
						) : (
							<>
								<h3 className='font-semibold text-md text-green-800'>
									स्वास्थ्य को समर्पित - वर्ष 2026
								</h3>
								<span
									key={message}
									className='block mt-1 text-sm font-bold text-green-900 opacity-90 animate-message'>
									"{message}"
								</span>
							</>
						)}
					</span>
				</div>
			</div>
		</section>
	);
};

export default Suvichar;
