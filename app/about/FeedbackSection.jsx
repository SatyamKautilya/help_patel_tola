'use client';

import { useState } from 'react';
import { Card, CardBody, Textarea, Button } from '@heroui/react';

export default function FeedbackSection({ sender }) {
	const [value, setValue] = useState('');
	const [sent, setSent] = useState(false);

	const handleSend = async () => {
		if (!value.trim()) return;
		setSent(true);

		// TODO: API call here
		try {
			await fetch('/api/query/database?name=feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ form: { sender, message: value } }),
			});
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
		setTimeout(() => {
			setValue('');
			setSent(false);
		}, 2000);
	};

	return (
		<section className='flex justify-center py-5'>
			<Card
				className='
          w-full max-w-md
          bg-teal-900/10 backdrop-blur-xl
          shadow-xl
          rounded-2xl
          animate-float
        '>
				<CardBody className='gap-4'>
					<h2 className='text-lg font-semibold text-center text-gray-600'>
						💬 सत्यम के लिए संदेश
					</h2>

					<Textarea
						value={value}
						onValueChange={setValue}
						placeholder='अपना सुझाव लिखें…'
						minRows={4}
						classNames={{
							input: 'text-sm',
							inputWrapper: `
                bg-white/90
                border border-slate-200
                focus-within:border-blue-500
                focus-within:ring-2 focus-within:ring-blue-200
                transition-all
              `,
						}}
					/>

					<div className='flex flex-row justify-center'>
						{' '}
						<Button
							radius='lg'
							size='lg'
							onPress={handleSend}
							className='
							bg-gradient-to-r from-[#f2d28b] to-[#e8b85c] text-lg text-gray-800
						w-max
              font-semibold
              transition-all
              hover:-translate-y-0.5
              hover:shadow-lg
              active:translate-y-0
			  
            '>
							{sent ? '✓ भेजा गया' : 'सेंड करें'}
						</Button>
					</div>
				</CardBody>
			</Card>
		</section>
	);
}
