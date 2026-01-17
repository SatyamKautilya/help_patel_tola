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

const CaseStory = ({ isOpen, onOpenChange, onSuccess }) => {
	const [items, setItems] = useState([{ heading: '', description: '' }]);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [subtitle, setSubtitle] = useState('');

	const addItem = () => {
		setItems([...items, { heading: '', description: '' }]);
	};

	const removeItem = (index) => {
		setItems(items.filter((_, i) => i !== index));
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
			setItems([{ heading: '', description: '' }]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			scrollBehavior='inside'
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size='full'
			className='dark h-full '>
			<ModalContent className='bg-gray-900 text-white h-full'>
				<ModalHeader className='text-xl font-bold text-white'>
					सामग्री जोड़ें
				</ModalHeader>

				<ModalBody className='space-y-6 h-full overflow-y-auto'>
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
					<div>
						{items.map((item, index) => (
							<div
								key={index}
								className='border border-gray-700 rounded-xl p-4 space-y-3 bg-gray-800 mb-3'>
								<Input
									label='शीर्षक'
									placeholder='शीर्षक दर्ज करें'
									value={item.heading}
									onChange={(e) => updateItem(index, 'heading', e.target.value)}
									classNames={{
										input: 'bg-gray-700 text-white',
										label: 'text-gray-300',
									}}
								/>

								<Textarea
									label='विवरण'
									placeholder='विवरण दर्ज करें'
									value={item.description}
									onChange={(e) =>
										updateItem(index, 'description', e.target.value)
									}
									classNames={{
										input: 'bg-gray-700 text-white',
										label: 'text-gray-300',
									}}
								/>
								<Textarea
									label='मुख्य सीख़'
									placeholder='मुख्य सीख़ दर्ज करें'
									value={item.takeaway}
									onChange={(e) =>
										updateItem(index, 'takeaway', e.target.value)
									}
									classNames={{
										input: 'bg-gray-700 text-white',
										label: 'text-gray-300',
									}}
								/>

								{items.length > 1 && (
									<Button
										color='danger'
										variant='light'
										size='sm'
										onPress={() => removeItem(index)}>
										हटाएं
									</Button>
								)}
							</div>
						))}

						<Button
							className='mt-4'
							color='secondary'
							variant='flat'
							onPress={addItem}>
							+ एक और जोड़ें
						</Button>
					</div>
				</ModalBody>

				<ModalFooter className='pb-10'>
					<Button variant='light' onPress={() => onOpenChange(false)}>
						रद्द करें
					</Button>
					<Button color='primary' isLoading={loading} onPress={handleSubmit}>
						सबमिट करें
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CaseStory;
