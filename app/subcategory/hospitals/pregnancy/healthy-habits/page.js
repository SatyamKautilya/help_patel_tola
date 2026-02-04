'use client';

import React from 'react';
import { Card, CardBody, Divider } from '@heroui/react';
import {
	Sun,
	Footprints,
	Droplet,
	Moon,
	Smile,
	ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Habits = () => {
	const habits = [
		{
			id: 1,
			icon: <Sun className='w-7 h-7 text-amber-500' />,
			title: 'सुबह की दिनचर्या',
			desc: 'समय पर उठें, हल्की धूप लें और ताज़ी हवा में कुछ समय बिताएँ।',
		},
		{
			id: 2,
			icon: <Footprints className='w-7 h-7 text-emerald-600' />,
			title: 'हल्की शारीरिक गतिविधि',
			desc: 'रोज़ 20–30 मिनट हल्की चाल से टहलना शरीर के लिए लाभकारी है।',
		},
		{
			id: 3,
			icon: <Droplet className='w-7 h-7 text-sky-500' />,
			title: 'पानी और भोजन',
			desc: 'पर्याप्त पानी पिएँ और समय पर संतुलित भोजन करें।',
		},
		{
			id: 4,
			icon: <Moon className='w-7 h-7 text-indigo-500' />,
			title: 'आराम और नींद',
			desc: 'दिन में थोड़ा आराम करें और रात में 7–8 घंटे की नींद लें।',
		},
		{
			id: 5,
			icon: <Smile className='w-7 h-7 text-pink-500' />,
			title: 'मानसिक स्वास्थ्य',
			desc: 'खुश रहें, तनाव से बचें और अपने मन की बात परिवार से साझा करें।',
		},
		{
			id: 6,
			icon: <ShieldCheck className='w-7 h-7 text-emerald-700' />,
			title: 'साफ़-सफाई',
			desc: 'हाथ धोना, साफ़ पानी पीना और स्वच्छ वातावरण रखें।',
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-100 px-4 pb-12'>
			  <header className="fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40">
				<div className="flex flex-col items-center pt-7">
				  <Image
					src="https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png"
					alt="Health Topics"
					width={250}
					height={56}
					priority
				  />
				  <div className="mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
				</div>
			  </header>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='max-w-4xl mt-20 mx-auto pt-6'
			>

				{/* Header */}
				<Card className='rounded-3xl bg-white/80 backdrop-blur shadow-lg'>
					<CardBody className='p-6 text-center'>
						<h1 className='text-2xl font-bold text-gray-800'>
							स्वस्थ आदतें
						</h1>
						<p className='mt-2 text-sm text-gray-600'>
							छोटी-छोटी अच्छी आदतें गर्भावस्था को सुरक्षित और सुखद बनाती हैं।
						</p>
					</CardBody>
				</Card>

				{/* Habits Grid */}
				<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5'>
					{habits.map((habit) => (
						<Card
							key={habit.id}
							className='rounded-2xl bg-white shadow-md'
						>
							<CardBody className='p-5 flex gap-4'>
								<div>{habit.icon}</div>
								<div>
									<h2 className='text-lg font-bold text-gray-800'>
										{habit.title}
									</h2>
									<p className='text-sm text-gray-600'>
										{habit.desc}
									</p>
								</div>
							</CardBody>
						</Card>
					))}
				</div>

				{/* Rest & Support */}
				<Card className='mt-8 rounded-3xl bg-teal-50 shadow-md'>
					<CardBody className='p-6'>
						<h3 className='text-lg font-bold text-teal-700'>
							परिवार का सहयोग
						</h3>
						<Divider className='my-3' />
						<p className='text-sm text-teal-700'>
							परिवार का प्यार और सहयोग गर्भवती महिला के
							मानसिक और शारीरिक स्वास्थ्य के लिए बहुत ज़रूरी है।
						</p>
					</CardBody>
				</Card>

				{/* Encouragement */}
				<Card className='mt-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl'>
					<CardBody className='p-6 text-center'>
						<p className='text-sm font-semibold opacity-95'>
							👉 आप अच्छा कर रही हैं। अपना ध्यान रखें,
							समय पर जाँच करवाएँ और सकारात्मक रहें।
						</p>
					</CardBody>
				</Card>

			</motion.div>
		</div>
	);
};

export default Habits;
