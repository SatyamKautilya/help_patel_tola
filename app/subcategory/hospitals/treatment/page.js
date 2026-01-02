'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
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

import DiseaseCard from './DiseaseCard';
const page = () => {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};
	const [name, setName] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [symptoms, setSymptoms] = useState('');
	const [carePoints, setCarePoints] = useState(['']);
	const [how, setHow] = useState(['']);
	const [addInfo, setAddInfo] = useState(false);
	const [auth, setAuth] = useState('');
	const [dontCare, setDontCare] = useState(['']);
	const [saving, setSaving] = useState(0);
	const [sops, setSops] = useState([]);

	const addCarePoint = () => {
		setCarePoints([...carePoints, '']);
	};
	const addHow = () => {
		setHow([...how, '']);
	};

	const addDontCare = () => {
		setDontCare([...dontCare, '']);
	};

	const removeCarePoint = (index) => {
		setCarePoints(carePoints.filter((_, i) => i !== index));
	};
	const removeHowPoint = (index) => {
		setHow(how.filter((_, i) => i !== index));
	};
	const removeDontCarePoint = (index) => {
		setDontCare(dontCare.filter((_, i) => i !== index));
	};

	const updateCarePoint = (index, value) => {
		const updated = [...carePoints];
		updated[index] = value;
		setCarePoints(updated);
	};
	const updateHowPoint = (index, value) => {
		const updated = [...how];
		updated[index] = value;
		setHow(updated);
	};
	const updateDontCarePoint = (index, value) => {
		const updated = [...dontCare];
		updated[index] = value;
		setDontCare(updated);
	};

	const onClose = () => setIsOpen(false);

	useEffect(() => {
		if (auth === 'amit') setIsOpen(true);
	}, [auth]);

	const getSop = async () => {
		const response = await fetch('/api/subcategory/hospitals?name=sops');

		if (response.ok) {
			const data = await response.json();
			return data.sops;
		}
	};

	useEffect(() => {
		const dothis = async () => {
			const savesop = await getSop();

			setSops(savesop);
		};
		dothis();
	}, []);

	console.log(sops);
	const handleSave = async () => {
		if (!name) return;
		setSaving(1);
		const addSop = await fetch('/api/subcategory/hospitals?name=sops', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				form: {
					id: name,
					name,
					symptoms,
					steps: how,
					dos: carePoints,
					donts: dontCare,
				},
			}),
		});
		setSaving(2);
		return;

		// TODO: call API here
	};

	if (saving === 2) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
				<div className='bg-white rounded-2xl px-8 py-6 shadow-xl text-center animate-fadeScale'>
					<p className='text-lg font-semibold text-gray-800'>
						आपका कोटि कोटि धन्यवाद! 🙏🙏
					</p>
					<p className='text-sm text-gray-500 mt-1'>
						कृपया अपने व्यस्त जीवन से समय निकालकर इसे पूरा करने में सहयोग
						दें।🙏🙏
					</p>
					<Button
						size='md'
						className='w-max mx-auto mt-10 mb-4'
						color='danger'
						onPress={() => {
							setSaving(3);
							setIsOpen(false);
							setAddInfo(false);
						}}>
						बंद करें
					</Button>
					{/* Spinner */}
				</div>
			</div>
		);
	}
	if (saving === 1) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
				<div className='bg-white rounded-2xl px-8 py-6 shadow-xl text-center animate-fadeScale'>
					<p className='text-lg font-semibold text-gray-800'>
						जानकारी सुरक्षित की जा रही है
					</p>
					<p className='text-sm text-gray-500 mt-1'>कृपया प्रतीक्षा करें...</p>

					{/* Spinner */}
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
					</div>
				</div>
			</div>
		);
	}
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

				<div className='mt-24  mb-10 flex flex-row justify-center'>
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
			<div>
				{Array.isArray(sops)
					? sops.map((sop) => {
							return <DiseaseCard {...{ disease: sop }} />;
					  })
					: null}
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
									onChange={(e) => setAuth(e.target.value)}
									classNames={{ input: 'text-lg' }}
									placeholder='Please Enter The Code'
								/>
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

			<Modal
				scrollBehavior='inside'
				size='lg'
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}>
				<ModalContent>
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
							<div>
								<p className='font-semibold mb-2'>step by step approach</p>
								{how.map((point, index) => (
									<div key={index} className='flex gap-2 mb-2'>
										<Textarea
											placeholder={`बिंदु ${index + 1}`}
											value={point}
											onChange={(e) => updateHowPoint(index, e.target.value)}
										/>
										<Button
											color='danger'
											variant='light'
											onPress={() => removeHowPoint(index)}>
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
							</div>
							{/* Dhyan Rakhne Ki Bate */}
							<div>
								<p className='font-semibold mb-2'>क्या करें?</p>

								{carePoints.map((point, index) => (
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
									variant='flat'
									color='secondary'
									onPress={addCarePoint}>
									+ नया बिंदु जोड़ें
								</Button>
							</div>
							<div>
								<p className='font-semibold mb-2'>क्या न करें?</p>

								{dontCare.map((point, index) => (
									<div key={index} className='flex gap-2 mb-2'>
										<Textarea
											placeholder={`बिंदु ${index + 1}`}
											value={point}
											onChange={(e) =>
												updateDontCarePoint(index, e.target.value)
											}
										/>
										<Button
											color='danger'
											variant='light'
											onPress={() => removeDontCarePoint(index)}>
											✕
										</Button>
									</div>
								))}

								<Button
									size='sm'
									variant='flat'
									color='secondary'
									onPress={addDontCare}>
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
				</ModalContent>
			</Modal>
		</>
	);
};

export default page;
