'use client';

import React from 'react';
import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Leaf, Apple, Droplet, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Page = () => {
	const months = [
		{
			id: 1,
			title: 'पहला तिमाही (1–3 महीना)',
			color: 'success',
			foods: [
				'हरी सब्ज़ियाँ (पालक, मेथी)',
				'दालें और अंकुरित अनाज',
				'फल – केला, सेब, अनार',
				'दूध और दही',
			],
			benefit: 'उल्टी, कमजोरी से बचाव और भ्रूण की शुरुआती वृद्धि',
		},
		{
			id: 2,
			title: 'दूसरा तिमाही (4–6 महीना)',
			color: 'primary',
			foods: [
				'चावल, रोटी, दलिया',
				'दाल, चना, राजमा',
				'हरी सब्ज़ियाँ',
				'कैल्शियम युक्त आहार',
			],
			benefit: 'बच्चे की हड्डियों और वजन बढ़ाने में मदद',
		},
		{
			id: 3,
			title: 'तीसरा तिमाही (7–9 महीना)',
			color: 'danger',
			foods: [
				'प्रोटीन युक्त भोजन',
				'फल और सूखे मेवे',
				'हल्का और सुपाच्य खाना',
				'अधिक पानी',
			],
			benefit: 'सुरक्षित प्रसव और माँ की ऊर्जा बनाए रखना',
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-b from-green-50 via-lime-50 to-sky-100 px-4 pb-12'>
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
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='max-w-4xl mx-auto mt-20 pt-6'
			>

				{/* Header */}
				<Card className='rounded-3xl bg-white/80 backdrop-blur shadow-lg'>
					<CardBody className='p-6 text-center'>
						<h1 className='text-2xl font-bold text-gray-800'>
							महीने अनुसार भोजन सलाह
						</h1>
						<p className='mt-2 text-sm text-gray-600'>
							सही भोजन माँ और बच्चे दोनों को स्वस्थ रखने में मदद करता है।
						</p>
					</CardBody>
				</Card>

				{/* Month Cards */}
				<div className='mt-6 space-y-6'>
					{months.map((month) => (
						<Card
							key={month.id}
							className='rounded-3xl bg-white shadow-md'
						>
							<CardBody className='p-6'>
								<div className='flex items-center justify-between'>
									<h2 className='text-xl font-bold text-gray-800'>
										{month.title}
									</h2>
									<Chip color={month.color} variant='flat'>
										भोजन सलाह
									</Chip>
								</div>

								<Divider className='my-4' />

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<h3 className='flex items-center gap-2 font-semibold text-gray-700'>
											<Apple className='w-5 h-5 text-green-500' />
											क्या खाएँ
										</h3>
										<ul className='mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1'>
											{month.foods.map((food, index) => (
												<li key={index}>{food}</li>
											))}
										</ul>
									</div>

									<div className='bg-green-50 rounded-xl p-4'>
										<h3 className='flex items-center gap-2 font-semibold text-gray-700'>
											<Leaf className='w-5 h-5 text-emerald-500' />
											क्यों ज़रूरी
										</h3>
										<p className='mt-2 text-sm text-gray-600'>
											{month.benefit}
										</p>
									</div>
								</div>
							</CardBody>
						</Card>
					))}
				</div>

				{/* Avoid Foods */}
				<Card className='mt-8 rounded-3xl bg-amber-50 shadow-md'>
					<CardBody className='p-6'>
						<h3 className='flex items-center gap-2 text-lg font-bold text-amber-700'>
							<AlertCircle className='w-6 h-6' />
							इन चीज़ों से बचें
						</h3>
						<Divider className='my-3' />
						<ul className='list-disc pl-5 text-sm text-amber-700 space-y-2'>
							<li>ज्यादा तला हुआ और मसालेदार खाना</li>
							<li>बासी या खुला हुआ भोजन</li>
							<li>शराब और तंबाकू</li>
							<li>बहुत ज़्यादा चाय या कॉफी</li>
						</ul>
					</CardBody>
				</Card>

				{/* Daily Tip */}
				<Card className='mt-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-xl'>
					<CardBody className='p-6 text-center'>
						<Droplet className='mx-auto w-8 h-8 mb-2 opacity-90' />
						<h4 className='text-lg font-bold'>
							दैनिक सलाह
						</h4>
						<p className='mt-2 text-sm opacity-90'>
							दिन भर में कम से कम 8–10 गिलास पानी पिएँ और
							समय पर भोजन करें।
						</p>
					</CardBody>
				</Card>

			</motion.div>
		</div>
	);
};

export default Page;
