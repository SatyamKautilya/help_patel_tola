'use client';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/store/appSlice';
import { motion } from 'framer-motion';

const Page = () => {
	// const [topics, setTopics] = useState([]);

	const topics = [
		{
			_id: '694f7f8533e4ff605bb9e8a0',
			id: 'misconceptions',
			topicName: 'अप्रभावी/ अप्रामाणिक पद्धति का उन्मूलन',
			owner: 'सचेतन',
		},
		{
			_id: '694f7fdd33e4ff605bb9e8a1',
			id: 'hospitals',
			owner: 'आपके पास के शहरों के',
			topicName: 'आयुष्मान अस्पताल',
			route: '/subcategory/hospitals',
		},
		{
			_id: '694f80a333e4ff605bb9e8a2',
			id: 'sop',
			topicName: 'आदर्श रोग उपचार प्रक्रिया',
			owner: 'मार्गदर्शक',
			route: '/subcategory/hospitals/treatment',
		},
		{
			_id: '695509cd909c6634b5eb0647',
			id: 'successStory',
			topicName: 'सफल ईलाज़ की कहानी',
			owner: 'प्रेरणादायक',
			route: '/subcategory/hospitals/casestory',
		},
	];
	const router = useRouter();
	// const dispatch = useDispatch();

	// const initializeApp = async () => {
	// 	dispatch(setLoader(true));
	// 	try {
	// 		const response = await fetch('/api/subcategory/hospitals');
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setTopics(data.healthtopics || []);
	// 		}
	// 	} catch (error) {
	// 		console.error('Failed to initialize app:', error);
	// 	} finally {
	// 		dispatch(setLoader(false));
	// 	}
	// };

	// useEffect(() => {
	// 	initializeApp();
	// }, []);

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
		<div className='relative min-h-screen pb-10 bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-100'>
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
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{topics.map((topic) => (
						<motion.div
							key={topic.id}
							variants={itemVariants}
							// 🔹 This ensures the motion wrapper matches the grid cell size
							className='flex h-full w-full'>
							<Card
								isPressable
								onPress={() => router.push(topic.route)}
								// 🔹 Added w-full and h-full to the Card
								className='
                                    w-full h-full
                                    group rounded-3xl 
                                    bg-white/80 backdrop-blur
                                    shadow-md hover:shadow-2xl
                                    transition-all duration-300
                                    hover:-translate-y-1
                                '>
								<CardBody className='flex shrink-0 flex-row justify-center p-6 text-center h-full'>
									<div className='flex flex-col items-center justify-center pr-4 w-full'>
										{topic.owner && (
											<div className='flex justify-center w-full'>
												<Chip
													color='success'
													variant='flat'
													className='text-sm font-semibold tracking-wide'>
													{topic.owner}
												</Chip>
											</div>
										)}
										<h2 className='mt-4 text-xl font-bold text-gray-800 leading-snug'>
											{topic.topicName}
										</h2>
									</div>
									<div className='flex flex-row w-1/6 justify-center h-full items-center '>
										<Button
											onPress={() => router.push(topic.route)}
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
