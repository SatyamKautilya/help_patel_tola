'use client';

import { useState } from 'react';
import { Card, CardBody } from '@heroui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DiseaseCard({ disease }) {
	const [open, setOpen] = useState(false);

	const normalizedDisease = {
		...disease,
		symptoms:
			typeof disease.symptoms === 'string'
				? disease.symptoms.split(',').map((s) => s.trim())
				: disease.symptoms,
	};

	function Section({ title, items, color, titleClass }) {
		const colorMap = {
			red: 'bg-red-300',
			blue: 'bg-blue-300',
			green: 'bg-green-300',
			orange: 'bg-orange-300',
		};

		return (
			<div className='mx-6'>
				<h3 className={`text-lg font-bold 	 mb-3 ${titleClass}`}>{title}</h3>

				<ul className='space-y-2'>
					{items.map((item, index) => (
						<li key={index} className='flex gap-3 items-start'>
							<span
								className={`mt-2 w-2 h-2 rounded-full ${colorMap[color]}`}
							/>
							<span className='text-white font-bold'>{item}</span>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<Card className='max-w-3xl mx-6 mb-4 rounded-2xl shadow-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-300'>
			<CardBody className='p-6 space-y-4'>
				{/* Header */}
				<div
					className='flex justify-between items-center cursor-pointer'
					onClick={() => setOpen(!open)}>
					<h2 className='text-2xl font-bold text-white'>{disease.name}</h2>

					{open ? (
						<ChevronUp className='text-white' />
					) : (
						<ChevronDown className='text-white' />
					)}
				</div>

				{/* Expandable Content */}
				{open && (
					<div className='space-y-6 pt-4 border-t border-white/30'>
						{/* Symptoms */}
						{normalizedDisease.symptoms && (
							<Section
								titleClass='text-white text-2xl font-bold'
								title='लक्षण'
								color='red'
								items={normalizedDisease.symptoms}
							/>
						)}

						{/* Steps */}
						{disease.steps?.length > 0 && (
							<Section
								titleClass='text-white text-2xl font-bold'
								title='उपचार के चरण'
								color='blue'
								items={disease.steps}
							/>
						)}

						{/* Dos */}
						{disease.dos?.length > 0 && (
							<Section
								titleClass='text-green-300 text-2xl font-bold'
								title='क्या करें'
								color='green'
								items={disease.dos}
							/>
						)}

						{/* Don'ts */}
						{disease.donts?.length > 0 && (
							<Section
								titleClass='text-red-700 text-4xl  font-bold'
								title='क्या न करें'
								color='orange'
								items={disease.donts}
							/>
						)}
					</div>
				)}
			</CardBody>
		</Card>
	);
}
