import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	Input,
	Textarea,
} from '@heroui/react';
import { set } from 'mongoose';

import React from 'react';

const HospitalDetails = (props) => {
	const { hospitals } = props;
	const [isOpen, setIsOpen] = React.useState(false);
	const [isOpen2, setIsOpen2] = React.useState(false);
	const [form, setForm] = React.useState({
		name: '',
		feedback: '',
		rating: '',
	});
	const [hideAccord, setHideAccord] = React.useState(false);

	const handleSubmit = () => {
		setHideAccord(true);
		if (!form.name || !form.feedback || !form.rating) return;

		console.log('Submitted experience:', form);
		// TODO: call API here
	};
	const experiences = [
		{
			id: 1,
			name: 'रामलाल यादव',
			feedback: 'डॉक्टर ने सही समय पर इलाज किया।',
			rating: 5,
		},
		{
			id: 2,
			name: 'सीता देवी',
			feedback: 'आयुष्मान कार्ड आसानी से स्वीकार किया गया।',
			rating: 4,
		},
		{
			id: 3,
			name: 'मोहन सिंह',
			feedback: 'स्टाफ सहयोगी था और दवाइयाँ समय पर मिली।',
			rating: 5,
		},
	];

	return Array.isArray(hospitals)
		? hospitals?.map((hospital) => {
				return (
					<div>
						<Card className='m-4 p-6 bg-green-100 rounded-2xl shadow-lg'>
							<h2 className='text-2xl font-bold mb-4'>{hospital.name}</h2>
							<p className='text-lg'>{`पता: ${hospital.address}`}</p>
							<p className='text-lg'>{`संपर्क: ${hospital.contact}`} </p>
							<p className='text-lg'>{`विशेषग्यता: ${hospital.speciality} `}</p>
							<Accordion
								selectionMode='single'
								onSelectionChange={(keys) => {
									setIsOpen(keys.size > 0);
								}}
								className='max-w-3xl mx-0 px-0'
								itemClasses={{
									base: 'rounded-2xl bg-white/70  shadow-lg border border-pink-100',
									title: 'text-sm font-semibold text-slate-800',
									content: 'px-4 pb-4',
								}}>
								<AccordionItem
									key='experience'
									title={!isOpen ? '⬇ अनुभव देखें' : '⬆ अनुभव'}>
									<ul className='space-y-3'>
										{hospital?.experiences?.map((exp) => (
											<li
												key={exp.id}
												className='rounded-xl bg-pink-50 border border-pink-100 p-4'>
												<div className='flex justify-between items-center mb-1'>
													<span className='font-medium text-slate-900'>
														{exp.name}
													</span>
													<span className='text-sm text-pink-600'>
														⭐ {exp.rating}/5
													</span>
												</div>
												<p className='text-sm text-slate-700'>{exp.feedback}</p>
											</li>
										))}
									</ul>
								</AccordionItem>
							</Accordion>
							{!hideAccord && (
								<Accordion
									selectionMode='single'
									onSelectionChange={(keys) => setIsOpen2(true)}
									className='max-w-3xl mx-auto mt-6 px-0 mx-0'
									itemClasses={{
										base: 'rounded-2xl bg-white/70 shadow-lg border border-pink-100',
										title: 'text-sm font-semibold text-slate-800',
										content: 'px-4 pb-5',
									}}>
									<AccordionItem
										key='add-exp'
										title={
											!isOpen2 ? '➕ अनुभव साझा करें' : '✍️ आपका अनुभव लिखें'
										}>
										<div className='space-y-4'>
											<Input
												label='आपका नाम'
												placeholder='नाम दर्ज करें'
												value={form.name}
												onChange={(e) =>
													setForm({ ...form, name: e.target.value })
												}
												classNames={{
													inputWrapper: 'bg-white',
													input: 'text-lg font-semibold',
													label: 'text-lg font-semibold',
												}}
											/>

											<Textarea
												label='आपका अनुभव'
												placeholder='इलाज, स्टाफ या सुविधाओं के बारे में लिखें'
												value={form.feedback}
												onChange={(e) =>
													setForm({ ...form, feedback: e.target.value })
												}
												classNames={{
													inputWrapper: 'bg-white',
													input: 'text-lg font-semibold',
													label: 'text-lg font-semibold',
												}}
											/>

											<Input
												type='number'
												min={1}
												max={5}
												label='रेटिंग (1 से 5)'
												placeholder='5'
												value={form.rating}
												onChange={(e) =>
													setForm({ ...form, rating: e.target.value })
												}
												classNames={{
													inputWrapper: 'bg-white',
													input: 'text-lg font-semibold',
													label: 'text-lg font-semibold',
												}}
											/>

											<Button
												color='primary'
												className='w-full bg-pink-500 text-white font-semibold'
												onPress={handleSubmit}>
												अनुभव सबमिट करें
											</Button>
										</div>
									</AccordionItem>
								</Accordion>
							)}
						</Card>
					</div>
				);
		  })
		: null;
};

export default HospitalDetails;
