'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../store/appSlice';

export default function SchemesPage() {
	const [openId, setOpenId] = useState(1);
	const [schemes, setSchemes] = useState([]);
	const dispatch = useDispatch();

	const fetchSchemes = async () => {
		dispatch(setLoader(true));
		try {
			const response = await fetch('/api/query/database?name=getgovtschemes');
			const data = await response.json();

			if (data && data.govtSchemes.length > 0) {
				setSchemes(data.govtSchemes);
			}
		} catch (err) {
			console.error('Error fetching schemes:', err);
		} finally {
			dispatch(setLoader(false));
		}
	};
	useEffect(() => {
		fetchSchemes();
	}, []);

	return (
		<div className='min-h-screen bg-[#f4f7fb]'>
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
			{/* Header */}
			<div className='pt-24'>
				<div className='rounded-b-3xl bg-gradient-to-br from-[#e7f5f3] to-[#f8fafc] px-4 py-6 shadow-sm'>
					<h1 className='text-center text-xl font-bold text-gray-800'>
						उपलब्ध योजनाएं
					</h1>
					<p className='mt-1 text-center text-sm text-gray-600'>
						गांव के विकास हेतु उपयोगी सरकारी योजनाओं की जानकारी
					</p>

					{/* Tabs */}
					<div className='mt-4 flex gap-2 overflow-x-auto rounded-full bg-white p-2 shadow'>
						<Tab active label='उपलब्ध योजनाएं' />
						<Tab label='कृषि' />
						<Tab label='आवास' />
					</div>
				</div>
				{/* Content */}
				<div className='px-4 py-6'>
					{schemes.map((scheme) => {
						const isOpen = openId === scheme.name;

						return (
							<div
								key={scheme.id}
								className='mb-4 rounded-2xl bg-gradient-to-br from-[#6a5acd] to-[#a855f7] p-[2px]'>
								<div className='rounded-2xl bg-white p-4'>
									{/* Header */}
									<button
										onClick={() => setOpenId(isOpen ? null : scheme.name)}
										className='flex w-full items-center justify-between'>
										<div className='flex items-center gap-3'>
											<span className='text-2xl'>{scheme.icon}</span>
											<h2 className='text-base font-bold text-gray-800'>
												{scheme.name}
											</h2>
										</div>
										<span className='text-gray-500'>{isOpen ? '▲' : '▼'}</span>
									</button>

									{/* Details */}
									{isOpen && (
										<div className='mt-4 space-y-4 text-sm text-gray-700'>
											<Section
												title='पात्रता'
												icon='📋'
												text={scheme.eligibility}
											/>
											<Section
												title='योजना की जानकारी'
												icon='ℹ️'
												text={scheme.details}
											/>
											<Section
												title='योजना के लाभ'
												icon='🎁'
												text={scheme.benefits}
											/>
											<Section
												title='आवेदन की प्रक्रिया'
												icon='📝'
												text={scheme.howToEnroll}
											/>

											{/* <button className='mt-2 w-full rounded-full bg-green-600 py-3 font-semibold text-white shadow active:scale-95'>
											आवेदन करें
										</button> */}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

/* ---------------- Components ---------------- */

function Tab({ label, active }) {
	return (
		<button
			className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
				active ? 'bg-green-100 text-green-700' : 'text-gray-600'
			}`}>
			{label}
		</button>
	);
}

function Section({ title, icon, text }) {
	return (
		<div>
			<p className='mb-1 flex items-center gap-2 font-semibold text-gray-800'>
				<span>{icon}</span> {title}:
			</p>
			<p className='text-gray-600'>{text}</p>
		</div>
	);
}
