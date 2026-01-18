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
import { set } from 'mongoose';

const VisibilityGroups = [
	{
		id: 'Garhi',
		name: 'गढ़ी',
	},
	{ id: 'PatelTola', name: 'पटेल टोला' },

	// Add more groups as needed
];

const AddContactModal = ({ isOpen, onOpenChange, onSuccess }) => {
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const [mobile, setMobile] = useState('');
	const [loading, setLoading] = useState(false);
	const [selectedGroups, setSelectedGroups] = useState([]);

	console.log(selectedGroups, 'seel');
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
				body: JSON.stringify({
					name,
					role,
					mobile,
					visibilityGroups: selectedGroups,
				}),
			});
			if (response.ok) {
				setName('');
				setRole('');
				setMobile('');
				setSelectedGroups([]);
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
				base: 'border-[#292929]  dark bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-[#f4f4f5]',
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
									नया संपर्क
								</span>
							</div>
							<p className='text-tiny text-default-500 font-normal'>
								अपनी निर्देशिका में एक नया व्यक्ति जोड़ने के लिए विवरण भरें।
							</p>
						</ModalHeader>

						<ModalBody className='py-6 gap-4'>
							<Input
								label='पूरा नाम'
								placeholder='नाम दर्ज करें'
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
								label='कार्य भूमिका'
								placeholder='जैसे पटवारी / प्राचार्य'
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
								label='मोबाइल नंबर'
								placeholder='94790000000'
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
							<Divider />
							<div className='flex flex-col gap-2'>
								<p className='font-medium text-default-400'>
									किस समूह को यह संपर्क दिखाई देगा?
								</p>
								<div className='flex flex-wrap gap-2'>
									{VisibilityGroups.map((group) => (
										<Button
											key={group.id}
											variant={
												selectedGroups.includes(group.id) ? 'solid' : 'bordered'
											}
											color='primary'
											size='sm'
											onPress={() => {
												if (selectedGroups.includes(group.id)) {
													setSelectedGroups(
														selectedGroups.filter((id) => id !== group.id),
													);
												} else {
													setSelectedGroups([...selectedGroups, group.id]);
												}
											}}>
											{group.name}
										</Button>
									))}
								</div>
							</div>
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
								isDisabled={mobile.length < 10}
								onPress={() => handleSaveContact(onClose)}
								startContent={!loading && <Save size={18} />}
								className='font-medium shadow-lg shadow-primary/20'>
								संपर्क सहेजें
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AddContactModal;
