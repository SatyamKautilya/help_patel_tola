'use client';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/store/appSlice';

const Page = () => {
	const [topics, setTopics] = useState([]);
	const router = useRouter();
	const dispatch = useDispatch();

	const initializeApp = async () => {
		dispatch(setLoader(true));
		try {
			const response = await fetch('/api/subcategory/hospitals');
			if (response.ok) {
				const data = await response.json();
				setTopics(data.healthtopics || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		} finally {
			dispatch(setLoader(false));
		}
	};

	useEffect(() => {
		initializeApp();
	}, []);

	return (
		<div className='relative min-h-screen pb-10 bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-100'>
			{/* 🔹 Fixed Header */}
			<header className='fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40'></header>
			<header className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40'>
				<div className='flex flex-col items-center pt-7'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png'
						alt='Health Topics'
						width={250}
						height={56}
						priority
					/>
					<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
				</div>
			</header>

			{/* 🔹 Content */}
			<main className='pt-[110px] pb-10 px-4  max-w-7xl mx-auto'>
				<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{topics.map((topic) => (
						<Card
							key={topic.id}
							isPressable
							className='
									group rounded-3xl 
									bg-white/80 backdrop-blur
									shadow-md hover:shadow-2xl
									transition-all duration-300
									hover:-translate-y-1
								'>
							<CardBody className='flex flex-col justify-between h-64 p-6 text-center'>
								{/* Owner */}
								{topic.owner && (
									<div className='flex justify-center'>
										<Chip
											color='success'
											variant='flat'
											className='text-sm font-semibold tracking-wide'>
											{topic.owner}
										</Chip>
									</div>
								)}

								{/* Title */}
								<h2 className='mt-4 text-xl font-bold text-gray-800 leading-snug'>
									{topic.topicName}
								</h2>

								{/* Divider */}
								<div className='pr-10 w-full my-2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />

								{/* CTA */}
								<div className='flex flex-row w-full  justify-center  '>
									<Button
										onPress={() => {
											router.push(topic.route);
										}}
										isIconOnly
										aria-label='View'
										className='
                                                h-14 w-14 rounded-full
                                                bg-gradient-to-br from-emerald-500 to-teal-500
                                                text-white
                                                shadow-xl shadow-emerald-500/40
                                                transition-all duration-300
                                                group-hover:scale-110
                                                group-hover:shadow-emerald-500/60
                                                hover:rotate-0
                                                        '>
										<ArrowRight
											className='
                                                    w-6 h-6
                                                    transition-transform duration-300
                                                    group-hover:translate-x-1
                                                    '
										/>
									</Button>
								</div>
							</CardBody>
						</Card>
					))}
				</section>
			</main>
		</div>
	);
};

export default Page;
