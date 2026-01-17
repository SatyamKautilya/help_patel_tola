import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Divider,
} from '@heroui/react';
// Importing an icon library (like Lucide) adds a premium feel
import { UserPlus, User, Briefcase, Phone, Save, X } from 'lucide-react';

const AddContactModal = ({ isOpen, onOpenChange, onSuccess }) => {
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const [mobile, setMobile] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSaveContact = async (onClose) => {
		if (mobile.length < 10) {
			console.error('Mobile number must be at least 10 digits');
			return;
		}

		try {
			setLoading(true);
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
				onSuccess?.();
			}
		} catch (error) {
			console.error('Failed to save contact:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			backdrop='blur' // Modern blurred background
			classNames={{
				base: 'border-[#292929] bg-[#121212] dark text-[#f4f4f5]',
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
									<UserPlus className='text-primary' size={20} />
								</div>
								<span className='text-xl font-semibold tracking-tight'>
									New Contact
								</span>
							</div>
							<p className='text-tiny text-default-500 font-normal'>
								Fill in the details to add a new person to your directory.
							</p>
						</ModalHeader>

						<ModalBody className='py-6 gap-4'>
							<Input
								label='Full Name'
								placeholder='Enter name'
								labelPlacement='outside'
								startContent={<User size={18} className='text-default-400' />}
								variant='bordered'
								value={name}
								onValueChange={setName}
								classNames={{
									inputWrapper:
										'h-12 border-default-200 focus-within:!border-primary',
								}}
							/>

							<Input
								label='Job Role'
								placeholder='e.g. Project Manager'
								labelPlacement='outside'
								startContent={
									<Briefcase size={18} className='text-default-400' />
								}
								variant='bordered'
								value={role}
								onValueChange={setRole}
								classNames={{
									inputWrapper:
										'h-12 border-default-200 focus-within:!border-primary',
								}}
							/>

							<Input
								label='Mobile Number'
								placeholder='+1 (555) 000-0000'
								labelPlacement='outside'
								startContent={<Phone size={18} className='text-default-400' />}
								variant='bordered'
								type='tel'
								value={mobile}
								onValueChange={(value) => setMobile(value.replace(/\D/g, ''))}
								classNames={{
									inputWrapper:
										'h-12 border-default-200 focus-within:!border-primary',
								}}
							/>
						</ModalBody>

						<ModalFooter>
							<Button
								variant='ghost'
								color='default'
								onPress={onClose}
								className='border-default-200 hover:!bg-default-100'>
								Cancel
							</Button>
							<Button
								color='primary'
								isLoading={loading}
								isDisabled={mobile.length < 10}
								onPress={() => handleSaveContact(onClose)}
								startContent={!loading && <Save size={18} />}
								className='font-medium shadow-lg shadow-primary/20'>
								Save Contact
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AddContactModal;
