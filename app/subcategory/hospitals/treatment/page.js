'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
	CardBody,
	Card,
} from '@heroui/react';
const page = () => {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	('use client');

	const [name, setName] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [symptoms, setSymptoms] = useState('');
	const [steps, setSteps] = useState('');
	const [carePoints, setCarePoints] = useState(['']);
	const [how, setHow] = useState(['']);
	const [addInfo, setAddInfo] = useState(false);
	const [auth, setAuth] = useState('');

	const addCarePoint = () => {
		setCarePoints([...carePoints, '']);
	};
	const addHow = () => {
		setHow([...how, '']);
	};

	const updateCarePoint = (index, value) => {
		const updated = [...carePoints];
		updated[index] = value;
		setCarePoints(updated);
	};

	const onClose = () => setIsOpen(false);
	const removeCarePoint = (index) => {
		setCarePoints(carePoints.filter((_, i) => i !== index));
	};

	const handleSave = () => {
		const payload = {
			name,
			symptoms,
			steps,
			dhyanRakhneKiBate: carePoints.filter(Boolean),
		};

		console.log('Disease Data:', payload);
		onClose();
	};
	return (
		<>
			<div className=''>
				<div className='fixed top-0  left-0 right-0 z-50 flex flex-row pb-4 pt-12 border-b-2 bg-slate-100 items-center'>
					<Button
						color='primary'
						size='lg'
						className='ml-6 text-xl font-bold'
						onPress={handleBack}>
						← Back
					</Button>
				</div>

				<div className='mt-24 flex flex-row justify-center'>
					<Button
						color='primary'
						onPress={() => {
							setAddInfo(true);
						}}
						size='lg'
						variant='solid'>
						+ बीमारी की जानकारी जोड़े।
					</Button>
				</div>
			</div>

			{addInfo && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
					<Card
						className='
      h-64
      w-96
      rounded-2xl
      shadow-2xl
      bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-300
      hover:scale-[1.02] transition-transform
    '>
						<CardBody className='flex items-center justify-center text-white'>
							{/* Your content here */}
							<label className='text-2xl mb-4'>
								डॉ पाटिल, आपका स्वागत है!🌺
							</label>
							<div className='mx-20'>
								<Input
									value={auth}
									onPress={(e) => setAuth(e.target.value)}
									classNames={{ input: 'text-lg' }}
									placeholder='Please Enter The Code'></Input>
							</div>
						</CardBody>
						<Button
							size='md'
							className='w-max mx-auto mb-4'
							color='danger'
							onPress={() => setAddInfo(false)}>
							बंद करें
						</Button>
					</Card>
				</div>
			)}

			<Modal size='lg' isOpen={false} onClose={() => setAddInfo(false)}>
				<ModalContent>
					{auth === 'amit' && (
						<>
							<ModalHeader className='text-xl font-bold '>
								बीमारी की जानकारी
							</ModalHeader>
							<ModalBody className='space-y-4'>
								<Input
									label='बीमारी का नाम'
									placeholder='जैसे: डेंगू'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>

								<Textarea
									label='लक्षण'
									placeholder='जैसे: बुखार, सिर दर्द, शरीर में दर्द'
									value={symptoms}
									onChange={(e) => setSymptoms(e.target.value)}
								/>

								<Textarea
									label='उपचार / कदम'
									placeholder='जैसे: डॉक्टर से परामर्श लें, आराम करें'
									value={steps}
									onChange={(e) => setSteps(e.target.value)}
								/>
								{how.map((point, index) => (
									<div key={index} className='flex gap-2 mb-2'>
										<Textarea
											placeholder={`बिंदु ${index + 1}`}
											value={point}
											onChange={(e) => updateCarePoint(index, e.target.value)}
										/>
										<Button
											color='danger'
											variant='light'
											onPress={() => removeCarePoint(index)}>
											✕
										</Button>
									</div>
								))}
								<Button
									size='sm'
									className='w-max'
									variant='flat'
									color='secondary'
									onPress={addHow}>
									+ नया बिंदु जोड़ें
								</Button>

								{/* Dhyan Rakhne Ki Bate */}
								<div>
									<p className='font-semibold mb-2'>ध्यान रखने की बातें</p>

									{carePoints.map((point, index) => (
										<div key={index} className='flex gap-2 mb-2'>
											<Input
												placeholder={`बिंदु ${index + 1}`}
												value={point}
												onChange={(e) => updateCarePoint(index, e.target.value)}
											/>
											<Button
												color='danger'
												variant='light'
												onPress={() => removeCarePoint(index)}>
												✕
											</Button>
										</div>
									))}

									<Button
										size='sm'
										variant='flat'
										color='secondary'
										onPress={addCarePoint}>
										+ नया बिंदु जोड़ें
									</Button>
								</div>
							</ModalBody>
							<ModalFooter className='mb-10'>
								<Button variant='light' onPress={onClose}>
									रद्द करें
								</Button>
								<Button color='primary' onPress={handleSave}>
									सहेजें
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default page;
