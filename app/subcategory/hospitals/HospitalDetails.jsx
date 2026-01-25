'use client';

import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	Input,
	Textarea,
	Chip,
} from '@heroui/react';
import React from 'react';

const HospitalDetails = ({ hospitals }) => {
	const [hideAccord, setHideAccord] = React.useState(false);

	const [form, setForm] = React.useState({
		name: '',
		feedback: '',
		rating: '',
	});

	const handleSubmit = async (hospId) => {
		setHideAccord(true);
		if (!form.name || !form.feedback || !form.rating) return;

		await fetch('/api/subcategory/hospitals?name=feedback', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				hospitalId: hospId,
				form,
			}),
		});
	};

	if (!Array.isArray(hospitals)) return null;

	return (
		<>
			{hospitals.map((hospital) => (
				<div key={hospital._id} className=' py-3'>
					<Card
						className='
							p-6 rounded-3xl
							bg-white/80
							shadow-md hover:shadow-xl
							transition-all
            '>
						{/* 🔹 Header */}
						<div className='flex flex-col gap-2'>
							{hospital.experiences?.length > 0 && (
								<Chip color='success' variant='flat' className='w-fit'>
									✔ परिचित अस्पताल
								</Chip>
							)}

							<h2 className='text-xl font-bold text-slate-800'>
								{hospital.name}
							</h2>

							<div className='text-sm text-slate-600 space-y-1'>
								<p>
									📍 <span className='font-medium'>पता:</span>{' '}
									{hospital.address}
								</p>
								<p>
									📞 <span className='font-medium'>संपर्क:</span>{' '}
									{hospital.contact}
								</p>
								<p>
									🏥 <span className='font-medium'>विशेषज्ञता:</span>{' '}
									{hospital.speciality}
								</p>
							</div>
						</div>

						{/* 🔹 Experiences */}
						{hospital.experiences?.length > 0 && (
							<Accordion
								selectionMode='single'
								className='mt-4'
								itemClasses={{
									base: 'rounded-2xl bg-emerald-50 border border-emerald-100',
									title: 'text-sm font-semibold text-emerald-800',
									content: 'px-4 pb-4',
								}}>
								<AccordionItem
									key={`experience-${hospital.id}`}
									title=' ⬇ मरीजों के अनुभव देखें'>
									<ul className='space-y-3'>
										{hospital.experiences.map((exp) => (
											<li
												key={exp.id}
												className='rounded-xl bg-white border border-slate-200 p-4'>
												<div className='flex justify-between items-center mb-1'>
													<span className='font-semibold text-slate-800'>
														{exp.name}
													</span>
													<span className='text-sm text-amber-600'>
														⭐ {exp.rating}/5
													</span>
												</div>
												<p className='text-sm text-slate-700 leading-relaxed'>
													{exp.feedback}
												</p>
											</li>
										))}
									</ul>
								</AccordionItem>
							</Accordion>
						)}

						{/* 🔹 Add Experience */}
						{!hideAccord && (
							<Accordion
								selectionMode='single'
								className='mt-6'
								itemClasses={{
									base: 'rounded-2xl bg-sky-50 border border-sky-100',
									title: 'text-sm font-semibold text-sky-800',
									content: 'px-4 pb-5',
								}}>
								<AccordionItem
									key={`add-exp-${hospital.id}`}
									title='➕ अपना अनुभव साझा करें'>
									<div className='space-y-4'>
										<Input
											placeholder='आपका नाम'
											value={form.name}
											onChange={(e) =>
												setForm({ ...form, name: e.target.value })
											}
										/>

										<Textarea
											placeholder='इलाज, सुविधा या स्टाफ के बारे में लिखें'
											value={form.feedback}
											onChange={(e) =>
												setForm({ ...form, feedback: e.target.value })
											}
										/>

										<Input
											type='number'
											min={1}
											max={5}
											placeholder='रेटिंग (1 से 5)'
											value={form.rating}
											onChange={(e) =>
												setForm({ ...form, rating: e.target.value })
											}
										/>

										<Button
											className='
													w-full h-12
													bg-gradient-to-r from-emerald-500 to-teal-500
													text-white font-semibold
													shadow-lg shadow-emerald-500/30
                      '
											onPress={() => handleSubmit(hospital.id)}>
											अनुभव सबमिट करें
										</Button>
									</div>
								</AccordionItem>
							</Accordion>
						)}
					</Card>
				</div>
			))}
		</>
	);
};

export default HospitalDetails;
