import { useState } from 'react';

export default function CreateShg({ onNext }) {
	const [form, setForm] = useState({
		name: '',
		village: '',
		block: '',
		district: '',
		monthlyContribution: '',
	});

	const handleSubmit = async () => {
		const res = await fetch('/api/shg?name=create-shg', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		});

		const shg = await res.json();
		onNext(shg);
	};

	return (
		<div className='p-6 space-y-4'>
			<h2 className='text-lg font-semibold'>Create SHG</h2>

			{['name', 'village', 'block', 'district'].map((field) => (
				<input
					key={field}
					placeholder={field}
					className='w-full border p-2 rounded'
					onChange={(e) => setForm({ ...form, [field]: e.target.value })}
				/>
			))}

			<input
				type='number'
				placeholder='Monthly Contribution'
				className='w-full border p-2 rounded'
				onChange={(e) =>
					setForm({ ...form, monthlyContribution: e.target.value })
				}
			/>

			<button
				onClick={handleSubmit}
				className='w-full bg-green-600 text-white py-2 rounded'>
				Continue
			</button>
		</div>
	);
}
