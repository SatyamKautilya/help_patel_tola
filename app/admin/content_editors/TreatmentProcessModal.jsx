'use client';

import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Textarea,
	Button,
} from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save, Plus, Trash2 } from 'lucide-react';

const TreatmentProcessModal = ({ isOpen, onOpenChange, onSuccess }) => {
	const [step, setStep] = useState(0); // 0: Basic, 1: Steps, 2: Dos, 3: Donts
	const [diseaseName, setDiseaseName] = useState('');
	const [symptoms, setSymptoms] = useState('');
	const [steps, setSteps] = useState(['']);
	const [dos, setDos] = useState(['']);
	const [donts, setDonts] = useState(['']);
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		if (!diseaseName.trim()) return;
		setLoading(true);
		try {
			const response = await fetch('/api/subcategory/hospitals?name=sops', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					form: {
						id: diseaseName,
						name: diseaseName,
						symptoms,
						steps,
						dos,
						donts,
					},
				}),
			});

			if (response.ok) {
				onOpenChange(false);
				onSuccess?.();
				resetForm();
			}
		} catch (error) {
			console.error('Error saving treatment:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setStep(0);
		setDiseaseName('');
		setSymptoms('');
		setSteps(['']);
		setDos(['']);
		setDonts(['']);
	};

	// Helper to update dynamic arrays
	const updateList = (setter, list, index, value) => {
		const updated = [...list];
		updated[index] = value;
		setter(updated);
	};

	const addField = (setter, list) => setter([...list, '']);
	const removeField = (setter, list, index) =>
		setter(list.filter((_, i) => i !== index));

	const stepTitles = [
		'बीमारी की जानकारी',
		'उपचार के चरण',
		"क्या करें (Do's)",
		"क्या न करें (Don'ts)",
	];

	return (
		<Modal
			scrollBehavior='inside'
			size='full'
			isOpen={isOpen}
			onOpenChange={(open) => {
				if (!open) resetForm();
				onOpenChange(open);
			}}
			classNames={{
				backdrop: 'bg-zinc-950/80 backdrop-blur-md',
				base: 'dar	k text-foreground bg-zinc-900 border-zinc-800',
			}}>
			<ModalContent>
				<ModalHeader className='flex flex-col gap-2 pt-8'>
					<div className='flex justify-between items-end pr-8'>
						<div>
							<p className='text-xs text-zinc-500 font-bold uppercase tracking-widest'>
								Step {step + 1} of 4
							</p>
							<h2 className='text-2xl font-black text-white'>
								{stepTitles[step]}
							</h2>
						</div>
					</div>
					{/* Progress Bar */}
					<div className='flex gap-1.5 mt-4 pr-6'>
						{[0, 1, 2, 3].map((i) => (
							<div
								key={i}
								className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-blue-600' : 'bg-zinc-800'}`}
							/>
						))}
					</div>
				</ModalHeader>

				<ModalBody className='py-6'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={step}
							initial={{ opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
							className='space-y-6'>
							{/* STEP 0: BASIC INFO */}
							{step === 0 && (
								<>
									<Input
										label='बीमारी का नाम'
										variant='bordered'
										placeholder='जैसे: डेंगू'
										value={diseaseName}
										onChange={(e) => setDiseaseName(e.target.value)}
										classNames={{ input: 'text-white', label: 'text-zinc-400' }}
									/>
									<Textarea
										label='लक्षण'
										variant='bordered'
										placeholder='जैसे: बुखार, शरीर में दर्द...'
										value={symptoms}
										onChange={(e) => setSymptoms(e.target.value)}
										classNames={{ input: 'text-white', label: 'text-zinc-400' }}
									/>
								</>
							)}

							{/* STEP 1: STEPS */}
							{step === 1 && (
								<DynamicList
									items={steps}
									label='उपचार प्रक्रिया'
									onUpdate={(i, v) => updateList(setSteps, steps, i, v)}
									onRemove={(i) => removeField(setSteps, steps, i)}
									onAdd={() => addField(setSteps, steps)}
									color='secondary'
								/>
							)}

							{/* STEP 2: DOS */}
							{step === 2 && (
								<DynamicList
									items={dos}
									label='सकारात्मक सावधानियां'
									onUpdate={(i, v) => updateList(setDos, dos, i, v)}
									onRemove={(i) => removeField(setDos, dos, i)}
									onAdd={() => addField(setDos, dos)}
									color='success'
								/>
							)}

							{/* STEP 3: DONTS */}
							{step === 3 && (
								<DynamicList
									items={donts}
									label='परहेज और सावधानियां'
									onUpdate={(i, v) => updateList(setDonts, donts, i, v)}
									onRemove={(i) => removeField(setDonts, donts, i)}
									onAdd={() => addField(setDonts, donts)}
									color='danger'
								/>
							)}
						</motion.div>
					</AnimatePresence>
				</ModalBody>

				<ModalFooter className='pb-12 lg:pb-6 pt-4 bg-zinc-800/30 border-t border-zinc-800 flex justify-between items-center'>
					<Button
						variant='flat'
						onPress={() =>
							step === 0 ? onOpenChange(false) : setStep(step - 1)
						}
						startContent={step > 0 && <ChevronLeft size={18} />}>
						{step === 0 ? 'रद्द करें' : 'पीछे'}
					</Button>

					<div className='flex gap-2'>
						{step < 3 ? (
							<Button
								color='primary'
								className='font-bold px-8'
								onPress={() => setStep(step + 1)}
								endContent={<ChevronRight size={18} />}>
								आगे बढ़ें
							</Button>
						) : (
							<Button
								color='success'
								isLoading={loading}
								onPress={handleSave}
								className='bg-blue-600 hover:bg-blue-700 text-white font-bold px-8'
								endContent={<Save size={18} />}>
								सहेजें
							</Button>
						)}
					</div>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

/* Internal Helper Component for Lists */
const DynamicList = ({ items, label, onUpdate, onRemove, onAdd, color }) => (
	<div className='space-y-4'>
		<p className='text-sm font-bold text-zinc-500 uppercase tracking-widest'>
			{label}
		</p>
		{items.map((point, index) => (
			<div key={index} className='flex gap-2 group'>
				<Textarea
					variant='bordered'
					placeholder={`बिंदु ${index + 1} दर्ज करें...`}
					value={point}
					onChange={(e) => onUpdate(index, e.target.value)}
					className='flex-1'
					classNames={{ input: 'text-white' }}
				/>
				{items.length > 1 && (
					<Button
						isIconOnly
						color='danger'
						variant='flat'
						className='opacity-50 group-hover:opacity-100 transition-opacity'
						onPress={() => onRemove(index)}>
						<Trash2 size={16} />
					</Button>
				)}
			</div>
		))}
		<Button
			size='sm'
			variant='flat'
			color={color}
			startContent={<Plus size={16} />}
			onPress={onAdd}>
			नया बिंदु जोड़ें
		</Button>
	</div>
);

export default TreatmentProcessModal;
