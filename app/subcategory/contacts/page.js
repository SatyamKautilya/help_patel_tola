'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody } from '@heroui/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '@/app/store/appSlice';

export default function App() {
	const thisUser = useSelector((state) => state.appContext.user);
	const userGroups = thisUser?.userGroups || [];
	const [numbers, setNumbers] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		dispatch(setLoader(true));
		try {
			const response = await fetch('/api/query/database?name=get-contacts', {
				method: 'post',
				body: {
					visibilityGroups: userGroups,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setNumbers(data.contacts || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		} finally {
			dispatch(setLoader(false));
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-[#eef4ff] to-[#f8fafc]'>
			{/* Header */}
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
			{/* Contact List */}
			<div className='pt-24'>
				<div className='px-4 py-4 space-y-4'>
					{numbers?.filter().map((contact) => (
						<Card
							key={contact.id}
							className='rounded-2xl shadow-md border border-blue-100'>
							<CardBody className='flex flex-row items-center gap-4 p-4'>
								{/* Avatar */}
								<div className='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow'>
									{contact.name?.charAt(0)}
								</div>

								{/* Info */}
								<div className='flex-1'>
									<p className='text-base font-semibold text-gray-800'>
										{contact.name}
									</p>
									<p className='text-sm text-gray-600'>{contact.role}</p>
									<a
										href={`tel:${contact.mobile}`}
										className='mt-1 inline-flex items-center gap-2 text-blue-600 font-medium'>
										📞 {contact.mobile}
									</a>
								</div>

								{/* Call Button */}
								<a
									href={`tel:${contact.mobile}`}
									className='rounded-full bg-green-500 px-4 py-2 text-white text-sm font-semibold shadow active:scale-95'>
									Call
								</a>
							</CardBody>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
