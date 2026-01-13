'use client';

import { useState } from 'react';
import { Card, CardBody } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ChevronDown,
	AlertCircle,
	CheckCircle2,
	XCircle,
	Stethoscope,
	Activity,
} from 'lucide-react';

export default function DiseaseCard({ disease }) {
	const [open, setOpen] = useState(false);

	const normalizedDisease = {
		...disease,
		symptoms:
			typeof disease.symptoms === 'string'
				? disease.symptoms.split(',').map((s) => s.trim())
				: disease.symptoms || [],
	};

	function Section({ title, items, icon: Icon, bg, text, border }) {
		return (
			<motion.div
				initial={{ opacity: 0, x: -10 }}
				animate={{ opacity: 1, x: 0 }}
				className={`rounded-2xl p-4 ${bg} border ${border} backdrop-blur-sm transition-all duration-300 hover:shadow-md`}>
				<h3
					className={`flex items-center gap-2 mb-3 text-sm font-black uppercase tracking-wider ${text}`}>
					<Icon size={18} strokeWidth={2.5} />
					<span>{title}</span>
				</h3>

				<ul className='space-y-3'>
					{items.map((item, index) => (
						<li
							key={index}
							className='flex gap-3 items-start text-gray-700 text-sm leading-relaxed'>
							<span
								className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${text.replace(
									'text-',
									'bg-',
								)}`}
							/>
							<span className='font-medium'>{item}</span>
						</li>
					))}
				</ul>
			</motion.div>
		);
	}

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='w-full'>
			<Card
				className={`overflow-hidden border-none transition-all duration-500 ${
					open
						? 'bg-white shadow-xl ring-1 ring-black/5'
						: 'bg-white/60 backdrop-blur-md shadow-sm hover:bg-white/80'
				} rounded-[2rem]`}>
				<CardBody className='p-0'>
					{/* Header Interaction Area */}
					<button
						onClick={() => setOpen(!open)}
						className='w-full p-5 flex justify-between items-center text-left outline-none'>
						<div className='flex items-center gap-4'>
							<div
								className={`p-3 rounded-2xl transition-colors duration-300 ${
									open
										? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
										: 'bg-emerald-100 text-emerald-600'
								}`}>
								<Activity size={24} />
							</div>
							<div>
								<h2
									className={`text-lg font-bold transition-colors duration-300 ${
										open ? 'text-gray-900' : 'text-gray-700'
									}`}>
									{disease.name}
								</h2>
								{!open && (
									<p className='text-xs text-gray-400 font-medium'>
										जानकारी देखने के लिए क्लिक करें
									</p>
								)}
							</div>
						</div>

						<motion.div
							animate={{ rotate: open ? 180 : 0 }}
							className={`p-2 rounded-full ${
								open ? 'bg-gray-100' : 'bg-transparent'
							}`}>
							<ChevronDown className='text-gray-400' size={20} />
						</motion.div>
					</button>

					{/* Animated Content */}
					<AnimatePresence>
						{open && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}>
								<div className='px-5 pb-6 space-y-4'>
									<div className='h-px w-full bg-gray-100 mb-4' />

									{/* Symptoms */}
									{normalizedDisease.symptoms?.length > 0 && (
										<Section
											title='लक्षण'
											icon={AlertCircle}
											bg='bg-red-50/50'
											border='border-red-100'
											text='text-red-600'
											items={normalizedDisease.symptoms}
										/>
									)}

									{/* Steps */}
									{disease.steps?.length > 0 && (
										<Section
											title='उपचार के चरण'
											icon={Stethoscope}
											bg='bg-blue-50/50'
											border='border-blue-100'
											text='text-blue-600'
											items={disease.steps}
										/>
									)}

									{/* Dos & Don'ts Grid */}
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										{disease.dos?.length > 0 && (
											<Section
												title='क्या करें'
												icon={CheckCircle2}
												bg='bg-emerald-50/50'
												border='border-emerald-100'
												text='text-emerald-600'
												items={disease.dos}
											/>
										)}

										{disease.donts?.length > 0 && (
											<Section
												title='क्या न करें'
												icon={XCircle}
												bg='bg-rose-50/50'
												border='border-rose-100'
												text='text-rose-600'
												items={disease.donts}
											/>
										)}
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</CardBody>
			</Card>
		</motion.div>
	);
}
