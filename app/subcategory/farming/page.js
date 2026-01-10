'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AgriculturePage() {
	const [search, setSearch] = useState('');
	const [cropList, setCropList] = useState([]);
	const router = useRouter();

	const filteredCrops = cropList.filter((crop) => crop.name.includes(search));

	const initializeApp = async () => {
		try {
			const response = await fetch(`/api/subcategory/crops`);
			if (response.ok) {
				const data = await response.json();
				setCropList(data.crops || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		}
	};

	useEffect(() => {
		initializeApp();
	}, []);

	console.log(filteredCrops, 'filteredCrops');

	const handleClick = (cropId) => {
		router.push(`/subcategory/farming/crop?name=${cropId}`);
	};
	return (
		<div className='min-h-screen bg-[#f5f7fa]  py-6'>
			<header className='fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40'></header>
			<header className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40'>
				<div className='flex flex-col items-center pt-7'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/farming/tamoharagr.png'
						alt='Health Topics'
						width={200}
						height={46}
						priority
					/>
					<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
				</div>
			</header>
			{/* Search */}
			<div className='pt-24 px-4'>
				{' '}
				<div className='mb-4'>
					<input
						type='text'
						placeholder='फसल खोजें (जैसे – टमाटर)'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-sm outline-none focus:border-green-500'
					/>
				</div>
				{/* Tabs */}
				<div className='mb-6 flex items-center gap-3 overflow-x-auto rounded-full bg-white p-2 shadow-sm'>
					{['फसल', 'सब्जी', 'बागवानी', 'फूल'].map((tab, i) => (
						<button
							key={i}
							className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
								tab === 'फसल' ? 'bg-green-100 text-green-700' : 'text-gray-600'
							}`}>
							{tab}
						</button>
					))}
				</div>
				{/* Grid */}
				<div className='grid grid-cols-2 gap-4'>
					{filteredCrops.map((crop) => (
						<div
							onClick={() => handleClick(crop.id)}
							key={crop.id}
							className='rounded-2xl bg-white p-3 shadow-md transition active:scale-95'>
							<div className='relative h-36 w-full overflow-hidden rounded-xl'>
								<Image
									src={crop.url}
									alt={crop.name}
									fill
									className='object-cover'
								/>
							</div>

							<div className='mt-3 text-center'>
								<h3 className='text-base font-bold text-gray-800'>
									{crop.name}
								</h3>
								<p className='mt-1 text-xs text-gray-500'>बीज से कटाई तक</p>
							</div>

							{/* Icons */}
							<div className='mt-3 flex justify-around text-xs text-gray-600'>
								<span>💧 पानी</span>
								<span>🧪 खाद</span>
								<span>🐛 कीट</span>
							</div>
						</div>
					))}
				</div>
				{/* AI Button */}
				<button className='fixed bottom-11 right-5 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg'>
					🤖 विशेषज्ञ से पूछें
				</button>
				<header className='fixed h-10 bottom-0 z-20 w-full bg-black/20 backdrop-blur-md border-b border-white/40'></header>
			</div>
		</div>
	);
}
