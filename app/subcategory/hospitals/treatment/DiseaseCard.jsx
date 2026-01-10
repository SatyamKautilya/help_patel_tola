'use client';

import { useState } from 'react';
import { Card, CardBody } from '@heroui/react';
import {
	ChevronDown,
	ChevronUp,
	AlertCircle,
	CheckCircle2,
	XCircle,
	Stethoscope,
} from 'lucide-react';

export default function DiseaseCard({ disease }) {
	const [open, setOpen] = useState(false);

	const normalizedDisease = {
		...disease,
		symptoms:
			typeof disease.symptoms === 'string'
				? disease.symptoms.split(',').map((s) => s.trim())
				: disease.symptoms,
	};

	function Section({ title, items, icon: Icon, bg, text }) {
		return (
			<div className={`rounded-xl p-4 ${bg}`}>
				<h3 className='flex items-center gap-2 mb-3 text-lg font-bold ${text}'>
					<Icon className={text} size={20} />
					<span className={text}>{title}</span>
				</h3>

				<ul className='space-y-2'>
					{items.map((item, index) => (
						<li
							key={index}
							className='flex gap-3 items-start text-gray-800 text-sm leading-relaxed'>
							<span className='mt-2 w-2 h-2 rounded-full bg-gray-400' />
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<Card className='max-w-3xl mx-4 mb-4 rounded-2xl border border-gray-200 bg-white shadow-sm'>
			<CardBody className='p-4'>
				{/* Header */}
				<button
					onClick={() => setOpen(!open)}
					className='w-full flex justify-between items-center text-left'>
					<div className='flex items-center gap-3'>
						<div className='p-2 rounded-full bg-blue-50'>
							<Stethoscope className='text-blue-600' size={20} />
						</div>
						<h2 className='text-lg font-semibold text-gray-900'>
							{disease.name}
						</h2>
					</div>

					{open ? (
						<ChevronUp className='text-gray-600' />
					) : (
						<ChevronDown className='text-gray-600' />
					)}
				</button>

				{/* Expandable Content */}
				<div
					className={`transition-all duration-300 ease-in-out overflow-hidden ${
						open ? 'max-h-[2000px] mt-4' : 'max-h-0'
					}`}>
					<div className='space-y-4'>
						{/* Symptoms */}
						{normalizedDisease.symptoms?.length > 0 && (
							<Section
								title='लक्षण'
								icon={AlertCircle}
								bg='bg-red-50'
								text='text-red-600'
								items={normalizedDisease.symptoms}
							/>
						)}

						{/* Steps */}
						{disease.steps?.length > 0 && (
							<Section
								title='उपचार के चरण'
								icon={Stethoscope}
								bg='bg-blue-50'
								text='text-blue-600'
								items={disease.steps}
							/>
						)}

						{/* Dos */}
						{disease.dos?.length > 0 && (
							<Section
								title='क्या करें'
								icon={CheckCircle2}
								bg='bg-green-50'
								text='text-green-600'
								items={disease.dos}
							/>
						)}

						{/* Don'ts */}
						{disease.donts?.length > 0 && (
							<Section
								title='क्या न करें'
								icon={XCircle}
								bg='bg-orange-50'
								text='text-orange-600'
								items={disease.donts}
							/>
						)}
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
