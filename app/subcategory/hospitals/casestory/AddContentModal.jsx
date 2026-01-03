'use client';

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
} from '@heroui/react';

export default function AddContentModal({ isOpen, onClose }) {
	const [items, setItems] = useState([{ heading: '', description: '' }]);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');

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
				body: JSON.stringify({ form: { name, storySegment: items } }),
			});
			onClose();
			setItems([{ heading: '', description: '' }]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose} size='xl'>
			<ModalContent>
				<ModalHeader className='text-xl font-bold'>Add Content</ModalHeader>

				<ModalBody className='space-y-6'>
					<Input
						label='Story Title'
						placeholder='Enter heading'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{items.map((item, index) => (
						<div
							key={index}
							className='border rounded-xl p-4 space-y-3 bg-slate-50'>
							<Input
								label='Heading'
								placeholder='Enter heading'
								value={item.heading}
								onChange={(e) => updateItem(index, 'heading', e.target.value)}
							/>

							<Textarea
								label='Description'
								placeholder='Enter description'
								value={item.description}
								onChange={(e) =>
									updateItem(index, 'description', e.target.value)
								}
							/>

							{items.length > 1 && (
								<Button
									color='danger'
									variant='light'
									size='sm'
									onPress={() => removeItem(index)}>
									Remove
								</Button>
							)}
						</div>
					))}

					<Button color='secondary' variant='flat' onPress={addItem}>
						+ Add Another
					</Button>
				</ModalBody>

				<ModalFooter>
					<Button variant='light' onPress={onClose}>
						Cancel
					</Button>
					<Button color='primary' isLoading={loading} onPress={handleSubmit}>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
