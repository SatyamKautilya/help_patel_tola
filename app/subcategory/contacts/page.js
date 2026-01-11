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
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/store/appSlice';

export default function App() {
	const router = useRouter();
	const [numbers, setNumbers] = useState([]);
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const [mobile, setMobile] = useState('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [access, setAccess] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		dispatch(setLoader(true));
		try {
			const response = await fetch('/api/subcategory/contacts');
			if (response.ok) {
				const data = await response.json();
				setNumbers(data.contacts || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		} finally {
			dispatch(setLoader(false));
		}
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
		<div className='min-h-screen bg-gradient-to-b from-[#eef4ff] to-[#f8fafc]'>
			{/* Header */}
			<header className='fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40'></header>
			<header className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40'>
				<div className='flex flex-col items-center pt-7'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/farming/tamoharagr.png'
						alt='Health Topics'
						width={200}
						height={46}
						priority
					/>
					<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
				</div>
			</header>
			{/* Contact List */}
			<div className='pt-24'>
				<div className='px-4 py-4 space-y-4'>
					{numbers.map((contact) => (
						<Card
							key={contact.id}
							className='rounded-2xl shadow-md border border-blue-100'>
							<CardBody className='flex flex-row items-center gap-4 p-4'>
								{/* Avatar */}
								<div className='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow'>
									{contact.name?.charAt(0)}
								</div>

								{/* Info */}
								<div className='flex-1'>
									<p className='text-base font-semibold text-gray-800'>
										{contact.name}
									</p>
									<p className='text-sm text-gray-600'>{contact.role}</p>
									<a
										href={`tel:${contact.mobile}`}
										className='mt-1 inline-flex items-center gap-2 text-blue-600 font-medium'>
										📞 {contact.mobile}
									</a>
								</div>

								{/* Call Button */}
								<a
									href={`tel:${contact.mobile}`}
									className='rounded-full bg-green-500 px-4 py-2 text-white text-sm font-semibold shadow active:scale-95'>
									Call
								</a>
							</CardBody>
						</Card>
					))}
				</div>

				{/* Access / FAB */}
				<div className='fixed bottom-6 right-6'>
					{access !== 'access' ? (
						<Input
							label='Admin Password'
							value={access}
							onValueChange={setAccess}
							classNames={{
								base: 'max-w-[220px]',
								inputWrapper: 'bg-white shadow-lg border border-gray-200',
							}}
						/>
					) : (
						<Button
							color='primary'
							className='rounded-full px-6 py-4 text-white font-bold shadow-xl'
							onPress={onOpen}>
							+ Add Contact
						</Button>
					)}
				</div>

				{/* Modal */}
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className='text-lg font-bold'>
									Add New Contact
								</ModalHeader>
								<ModalBody className='space-y-3'>
									<Input label='Name' value={name} onValueChange={setName} />
									<Input label='Role' value={role} onValueChange={setRole} />
									<Input
										label='Mobile'
										value={mobile}
										onValueChange={setMobile}
									/>
								</ModalBody>
								<ModalFooter>
									<Button variant='light' onPress={onClose}>
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
			</div>
		</div>
	);
}
