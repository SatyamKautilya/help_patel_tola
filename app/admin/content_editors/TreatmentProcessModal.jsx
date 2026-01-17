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

const TreatmentProcessModal = ({
	isOpen,
	onOpenChange,
	onSuccess,
	treatmentData = {},
}) => {
	const [diseaseName, setDiseaseName] = useState(
		treatmentData?.diseaseName || '',
	);
	const [symptoms, setSymptoms] = useState(treatmentData?.symptoms || '');
	const [steps, setSteps] = useState(treatmentData?.steps || ['']);
	const [dos, setDos] = useState(treatmentData?.dos || ['']);
	const [donts, setDonts] = useState(treatmentData?.donts || ['']);
	const [saving, setSaving] = useState(0);

	const handleSave = async () => {
		if (!diseaseName.trim()) return;

		setSaving(1);
		try {
			const response = await fetch('/api/subcategory/hospitals?name=sops', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					form: {
						id: diseaseName,
						diseaseName,
						symptoms,
						steps,
						dos,
						donts,
					},
				}),
			});

			if (response.ok) {
				setSaving(2);
				onOpenChange(false);
				onSuccess?.();
			}
		} catch (error) {
			console.error('Error saving treatment:', error);
			setSaving(0);
		}
	};

	const updateSteps = (index, value) => {
		const updated = [...steps];
		updated[index] = value;
		setSteps(updated);
	};

	const removeSteps = (index) => {
		setSteps(steps.filter((_, i) => i !== index));
	};

	const addSteps = () => {
		setSteps([...steps, '']);
	};

	const updateDos = (index, value) => {
		const updated = [...dos];
		updated[index] = value;
		setDos(updated);
	};

	const removeDos = (index) => {
		setDos(dos.filter((_, i) => i !== index));
	};

	const addDos = () => {
		setDos([...dos, '']);
	};

	const updateDonts = (index, value) => {
		const updated = [...donts];
		updated[index] = value;
		setDonts(updated);
	};

	const removeDonts = (index) => {
		setDonts(donts.filter((_, i) => i !== index));
	};

	const addDonts = () => {
		setDonts([...donts, '']);
	};

	return (
		<Modal
			scrollBehavior='inside'
			size='full'
			isOpen={isOpen}
			onClose={() => onOpenChange(false)}
			classNames={{
				backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10',
				base: 'dark text-foreground bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700',
			}}>
			<ModalContent>
				<ModalHeader className='flex flex-col gap-1 text-xl font-bold text-white'>
					बीमारी की जानकारी
				</ModalHeader>
				<ModalBody className='space-y-6 py-4'>
					<Input
						label='बीमारी का नाम'
						placeholder='जैसे: डेंगू'
						value={diseaseName}
						onChange={(e) => setDiseaseName(e.target.value)}
						classNames={{
							base: 'dark',
							input: 'bg-zinc-700 text-white',
						}}
					/>

					<Textarea
						label='लक्षण'
						placeholder='जैसे: बुखार, सिर दर्द, शरीर में दर्द'
						value={symptoms}
						onChange={(e) => setSymptoms(e.target.value)}
						classNames={{
							base: 'dark',
							input: 'bg-zinc-700 text-white',
						}}
					/>

					<div className='space-y-3'>
						<p className='font-semibold text-white'>चरण दर चरण दृष्टिकोण</p>
						{steps.map((point, index) => (
							<div key={index} className='flex gap-2'>
								<Textarea
									placeholder={`बिंदु ${index + 1}`}
									value={point}
									onChange={(e) => updateSteps(index, e.target.value)}
									classNames={{
										base: 'dark',
										input: 'bg-zinc-700 text-white',
									}}
								/>
								<Button
									isIconOnly
									color='danger'
									variant='light'
									onPress={() => removeSteps(index)}>
									✕
								</Button>
							</div>
						))}
						<Button
							size='sm'
							className='w-max bg-purple-600 hover:bg-purple-700'
							variant='flat'
							onPress={addSteps}>
							+ नया बिंदु जोड़ें
						</Button>
					</div>

					<div className='space-y-3'>
						<p className='font-semibold text-white'>क्या करें?</p>
						{dos.map((point, index) => (
							<div key={index} className='flex gap-2'>
								<Textarea
									placeholder={`बिंदु ${index + 1}`}
									value={point}
									onChange={(e) => updateDos(index, e.target.value)}
									classNames={{
										base: 'dark',
										input: 'bg-zinc-700 text-white',
									}}
								/>
								<Button
									isIconOnly
									color='danger'
									variant='light'
									onPress={() => removeDos(index)}>
									✕
								</Button>
							</div>
						))}
						<Button
							size='sm'
							className='w-max bg-green-600 hover:bg-green-700'
							variant='flat'
							onPress={addDos}>
							+ नया बिंदु जोड़ें
						</Button>
					</div>

					<div className='space-y-3'>
						<p className='font-semibold text-white'>क्या न करें?</p>
						{donts.map((point, index) => (
							<div key={index} className='flex gap-2'>
								<Textarea
									placeholder={`बिंदु ${index + 1}`}
									value={point}
									onChange={(e) => updateDonts(index, e.target.value)}
									classNames={{
										base: 'dark',
										input: 'bg-zinc-700 text-white',
									}}
								/>
								<Button
									isIconOnly
									color='danger'
									variant='light'
									onPress={() => removeDonts(index)}>
									✕
								</Button>
							</div>
						))}
						<Button
							size='sm'
							className='w-max bg-red-600 hover:bg-red-700'
							variant='flat'
							onPress={addDonts}>
							+ नया बिंदु जोड़ें
						</Button>
					</div>
				</ModalBody>
				<ModalFooter className='gap-3 pb-16 lg:pb-3 bg-zinc-800/50'>
					<Button
						variant='light'
						color='default'
						onPress={() => onOpenChange(false)}>
						रद्द करें
					</Button>
					<Button
						color='primary'
						isLoading={saving === 1}
						onPress={handleSave}
						className='bg-blue-600 hover:bg-blue-700'>
						{saving === 2 ? '✓ सहेजा गया' : 'सहेजें'}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default TreatmentProcessModal;
