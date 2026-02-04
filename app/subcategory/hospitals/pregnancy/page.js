'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Page = () => {
	const router = useRouter();

	const cards = [
		{
			id: 'vaccination',
			title: 'मेरी टीकाकरण जानकारी',
			owner: 'सुरक्षा',
			route: 'pregnancy/vaccination',
		},
		{
			id: 'monthly-food',
			title: 'महीने अनुसार भोजन सलाह',
			owner: 'पोषण',
			route: 'pregnancy/monthly-food',
		},
		{
			id: 'supplements',
			title: 'आयरन, कैल्शियम व सप्लीमेंट',
			owner: 'स्वास्थ्य',
			route: 'pregnancy/supplements',
		},
		{
			id: 'doctor-visit',
			title: 'डॉक्टर जांच समय-सारणी',
			owner: 'मार्गदर्शन',
			route: 'pregnancy/doctor-visits',
		},
		{
			id: 'danger-signs',
			title: 'खतरे के संकेत',
			owner: 'महत्वपूर्ण',
			route: 'pregnancy/danger-signs',
		},
		{
			id: 'healthy-habits',
			title: 'स्वस्थ आदतें',
			owner: 'देखभाल',
			route: 'pregnancy/healthy-habits',
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.4 },
		},
	};

	return (
		<div className='relative min-h-screen pb-10 bg-gradient-to-b from-pink-50 via-rose-50 to-sky-100'>
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

			<main className='pt-[110px] pb-10 px-4 max-w-7xl mx-auto'>
				<motion.section
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
				>
					{cards.map((card) => (
						<motion.div
							key={card.id}
							variants={itemVariants}
							className='flex h-full w-full'
						>
							<Card
								isPressable
								onPress={() => router.push(card.route)}
								className='
									w-full h-full
									group rounded-3xl 
									bg-white/80 backdrop-blur
									shadow-md hover:shadow-2xl
									transition-all duration-300
									hover:-translate-y-1
								'
							>
								<CardBody className='flex flex-row justify-center p-6 text-center h-full'>
									<div className='flex flex-col items-center justify-center pr-4 w-full'>
										<Chip
											color='danger'
											variant='flat'
											className='text-sm font-semibold tracking-wide'
										>
											{card.owner}
										</Chip>

										<h2 className='mt-4 text-xl font-bold text-gray-800 leading-snug'>
											{card.title}
										</h2>
									</div>

									<div className='flex w-1/6 justify-center items-center'>
										<Button
											isIconOnly
											onPress={() => router.push(card.route)}
											aria-label='Open'
											className='
												h-14 w-14 rounded-full
												bg-gradient-to-br from-rose-500 to-pink-500
												text-white
												shadow-xl shadow-rose-500/40
												transition-all duration-300
												group-hover:scale-110
											'
										>
											<ArrowRight className='w-6 h-6 transition-transform duration-300 group-hover:translate-x-1' />
										</Button>
									</div>
								</CardBody>
							</Card>
						</motion.div>
					))}
				</motion.section>
			</main>
		</div>
	);
};

export default Page;
