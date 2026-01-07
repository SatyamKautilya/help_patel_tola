'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	useDisclosure,
	Card,
	CardBody,
} from '@heroui/react';
import { hideBackButton } from '@/hooks/utils';

export default function App() {
	const router = useRouter();
	const [numbers, setNumbers] = useState([]);
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const [mobile, setMobile] = useState('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [access, setAccess] = useState(undefined);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		try {
			const response = await fetch('/api/subcategory/contacts');
			if (response.ok) {
				const data = await response.json();
				setNumbers(data.contacts || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		}
	};

	const handleBack = () => {
		router.back();
	};

	const handleSaveContact = async (onClose) => {
		try {
			const response = await fetch('/api/subcategory/contacts/add', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, role, mobile }),
			});
			if (response.ok) {
				setName('');
				setRole('');
				setMobile('');
				onClose();
				initializeApp();
			}
		} catch (error) {
			console.error('Failed to save contact:', error);
		}
	};

	return (
		<>
			<div
				className={`${
					hideBackButton() ? 'hidden' : ''
				} flex flex-row py-4 border-b-2 pb-4 bg-slate-100 items-center`}>
				<button
					className='mx-4 px-4 py-2 text-white font-bold text-xl border bg-blue-600 rounded-lg'
					onClick={handleBack}>
					← Back
				</button>
				<div className='flex-1 text-lg font-semibold text-gray-800'>
					{typeof window !== 'undefined' && window.APP_CONTEXT}
				</div>
			</div>
			{numbers.map((contact) => (
				<Card key={contact.id} className='max-w-md mx-4 mt-4  bg-blue-200 mb-4'>
					<CardBody className='flex flex-row items-center gap-4'>
						<div className='flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-semibold'>
							{contact.name.charAt(0)}
						</div>
						<div className='flex-1'>
							<p className='text-base font-semibold text-black'>
								{contact.name}
							</p>
							<p className='text-sm text-black text-lg'>{contact.role}</p>
							<p className='text-sm text-gray-700 mt-1'>
								📞{' '}
								<a
									href={`tel:${contact.mobile}`}
									className='font-medium text-blue-600'>
									{contact.mobile}
								</a>
							</p>
						</div>
					</CardBody>
				</Card>
			))}
			<div className='flex justify-center mt-6'>
				{access !== 'access' ? (
					<Input
						label='password'
						value={access}
						classNames={{
							input: 'text-white placeholder:text-white/60',
							inputWrapper: 'bg-transparent border-white/30',
						}}
						onValueChange={(e) => {
							setAccess(e);
						}}
					/>
				) : (
					<Button
						color='primary'
						className='text-white font-bold'
						size='lg'
						onPress={onOpen}>
						+ Add New Contact
					</Button>
				)}
			</div>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Add New Contact</ModalHeader>
							<ModalBody>
								<Input label='Name' value={name} onValueChange={setName} />
								<Input label='Role' value={role} onValueChange={setRole} />
								<Input
									label='Mobile'
									value={mobile}
									onValueChange={setMobile}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Cancel
								</Button>
								<Button
									color='primary'
									onPress={() => handleSaveContact(onClose)}>
									Save
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
