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
import { Save, Landmark } from 'lucide-react';

const AddGovtSchemeModal = ({ isOpen, onOpenChange, onSuccess }) => {
	const [name, setName] = useState('');
	const [eligibility, setEligibility] = useState('');
	const [details, setDetails] = useState('');
	const [benefits, setBenefits] = useState('');
	const [howToEnroll, setHowToEnroll] = useState('');
	const [loading, setLoading] = useState(false);

	const resetForm = () => {
		setName('');
		setEligibility('');
		setDetails('');
		setBenefits('');
		setHowToEnroll('');
	};

	const handleSave = async (onClose) => {
		if (!name.trim()) return;
		setLoading(true);
		try {
			const response = await fetch('/api/query/database?name=setgovtschemes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					form: {
						name: name.trim(),
						eligibility: eligibility.trim(),
						details: details.trim(),
						benefits: benefits.trim(),
						howToEnroll: howToEnroll.trim(),
					},
				}),
			});

			if (response.ok) {
				resetForm();
				onClose();
				onSuccess?.();
			}
		} catch (error) {
			console.error('Failed to save government scheme:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={(open) => {
				if (!open) resetForm();
				onOpenChange(open);
			}}
			scrollBehavior='inside'
			backdrop='blur'
			classNames={{
				base: 'border-[#292929] dark bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-[#f4f4f5]',
				header: 'border-b-[1px] border-[#292929]',
				footer: 'border-t-[1px] border-[#292929] mb-20',
				closeButton: 'hover:bg-white/5 active:bg-white/10',
			}}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1 items-start'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-primary/10 rounded-lg'>
									<Landmark className='text-primary' size={20} />
								</div>
								<span className='text-xl font-semibold tracking-tight'>
									सरकारी योजना जोड़ें
								</span>
							</div>
							<p className='text-tiny text-default-500 font-normal'>
								नई योजना की जानकारी भरकर सेव करें।
							</p>
						</ModalHeader>

						<ModalBody className='py-6 gap-4'>
							<Input
								label='योजना का नाम'
								labelPlacement='outside'
								placeholder='जैसे: आयुष्मान भारत योजना'
								variant='bordered'
								value={name}
								onValueChange={setName}
							/>
							<Textarea
								label='पात्रता'
								labelPlacement='outside'
								placeholder='कौन आवेदन कर सकता है'
								variant='bordered'
								value={eligibility}
								onValueChange={setEligibility}
							/>
							<Textarea
								label='विवरण'
								labelPlacement='outside'
								placeholder='योजना का संक्षिप्त विवरण'
								variant='bordered'
								value={details}
								onValueChange={setDetails}
							/>
							<Textarea
								label='लाभ'
								labelPlacement='outside'
								placeholder='योजना से मिलने वाले लाभ'
								variant='bordered'
								value={benefits}
								onValueChange={setBenefits}
							/>
							<Textarea
								label='कैसे आवेदन करें'
								labelPlacement='outside'
								placeholder='आवेदन प्रक्रिया'
								variant='bordered'
								value={howToEnroll}
								onValueChange={setHowToEnroll}
							/>
						</ModalBody>

						<ModalFooter>
							<Button
								variant='ghost'
								color='default'
								onPress={onClose}
								className='border-default-200 text-white hover:text-black hover:!bg-default-100'>
								रद्द करें
							</Button>
							<Button
								color='primary'
								isLoading={loading}
								isDisabled={!name.trim()}
								onPress={() => handleSave(onClose)}
								startContent={!loading && <Save size={18} />}>
								योजना सेव करें
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AddGovtSchemeModal;
