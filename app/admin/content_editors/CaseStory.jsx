'use client';

import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
} from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

const CaseStory = ({ isOpen, onOpenChange, onSuccess }) => {
	const [step, setStep] = useState(0); // 0: Header Info, 1+: Story Segments
	const [items, setItems] = useState([
		{ heading: '', description: '', takeaway: '' },
	]);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [subtitle, setSubtitle] = useState('');

	const addItem = () => {
		setItems([...items, { heading: '', description: '', takeaway: '' }]);
		setStep(items.length + 1); // Move to the new item immediately
	};

	const removeItem = (index) => {
		const updated = items.filter((_, i) => i !== index);
		setItems(updated);
		setStep(Math.max(0, step - 1));
	};

	const updateItem = (index, field, value) => {
		const updated = [...items];
		updated[index][field] = value;
		setItems(updated);
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			await fetch('/api/subcategory/hospitals?name=content', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ form: { name, subtitle, storySegment: items } }),
			});
			onOpenChange(false);
			onSuccess?.();
			resetForm();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setStep(0);
		setName('');
		setSubtitle('');
		setItems([{ heading: '', description: '', takeaway: '' }]);
	};

	// Total steps = 1 (for basic info) + length of items
	const totalSteps = items.length + 1;

	return (
		<Modal
			scrollBehavior='inside'
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size='full'
			className='dark h-full'>
			<ModalContent className='bg-gray-900 lg:mt-0 mt-10 text-white h-full'>
				<ModalHeader className='flex flex-col gap-1'>
					<span className='text-xl font-bold text-white'>सामग्री जोड़ें</span>
					<div className='flex gap-1 mt-2'>
						{Array.from({ length: totalSteps }).map((_, i) => (
							<div
								key={i}
								className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary' : 'bg-gray-700'}`}
							/>
						))}
					</div>
				</ModalHeader>

				<ModalBody className='h-full overflow-y-auto py-6'>
					<AnimatePresence mode='wait'>
						{step === 0 ? (
							<motion.div
								key='step0'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								className='space-y-6'>
								<div className='mb-4 text-gray-400 text-sm'>
									चरण 1: कहानी का परिचय
								</div>
								<Input
									label='कहानी का शीर्षक'
									placeholder='शीर्षक दर्ज करें'
									value={name}
									onChange={(e) => setName(e.target.value)}
									classNames={{
										input: 'bg-gray-800 text-white',
										label: 'text-gray-300',
									}}
								/>
								<Input
									label='कहानी का उपशीर्षक'
									placeholder='उपशीर्षक दर्ज करें'
									value={subtitle}
									onChange={(e) => setSubtitle(e.target.value)}
									classNames={{
										input: 'bg-gray-800 text-white',
										label: 'text-gray-300',
									}}
								/>
							</motion.div>
						) : (
							<motion.div
								key={`step${step}`}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								className='space-y-6'>
								<div className='flex justify-between items-center mb-4'>
									<div className='text-gray-400 text-sm'>
										चरण {step + 1}: खंड {step}
									</div>
									{items.length > 1 && (
										<Button
											size='sm'
											color='danger'
											variant='flat'
											onPress={() => removeItem(step - 1)}>
											हटाएं
										</Button>
									)}
								</div>

								<Input
									label='शीर्षक'
									placeholder='शीर्षक दर्ज करें'
									value={items[step - 1].heading}
									onChange={(e) =>
										updateItem(step - 1, 'heading', e.target.value)
									}
									classNames={{
										input: 'bg-gray-800 text-white',
										label: 'text-gray-300',
									}}
								/>

								<Textarea
									label='विवरण'
									placeholder='विवरण दर्ज करें'
									value={items[step - 1].description}
									onChange={(e) =>
										updateItem(step - 1, 'description', e.target.value)
									}
									classNames={{
										input: 'bg-gray-800 text-white',
										label: 'text-gray-300',
									}}
								/>

								<Textarea
									label='मुख्य सीख़'
									placeholder='मुख्य सीख़ दर्ज करें'
									value={items[step - 1].takeaway || ''}
									onChange={(e) =>
										updateItem(step - 1, 'takeaway', e.target.value)
									}
									classNames={{
										input: 'bg-gray-800 text-white',
										label: 'text-gray-300',
									}}
								/>

								{step === items.length && (
									<Button
										className='w-full mt-4'
										color='secondary'
										variant='flat'
										onPress={addItem}>
										+ एक और खंड जोड़ें
									</Button>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</ModalBody>

				<ModalFooter className='lg:pb-3 pb-16 flex justify-between items-center'>
					<div className='flex gap-2'>
						<Button variant='light' onPress={() => onOpenChange(false)}>
							रद्द करें
						</Button>
						{step > 0 && (
							<Button variant='bordered' onPress={() => setStep(step - 1)}>
								पीछे
							</Button>
						)}
					</div>

					<div className='flex gap-2'>
						{step < totalSteps - 1 ? (
							<Button color='primary' onPress={() => setStep(step + 1)}>
								आगे बढ़ें
							</Button>
						) : (
							<Button
								color='primary'
								isLoading={loading}
								onPress={handleSubmit}>
								सबमिट करें
							</Button>
						)}
					</div>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CaseStory;
