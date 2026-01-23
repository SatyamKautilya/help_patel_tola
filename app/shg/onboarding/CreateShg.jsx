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
		<div className='flex items-center justify-center min-h-screen bg-gray-950 px-4'>
			<div className='w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 space-y-6'>
				<div className='text-center space-y-2'>
					<h2 className='text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent'>
						Create SHG
					</h2>
					<p className='text-gray-400 text-sm'>
						Enter the details to register a new Self Help Group.
					</p>
				</div>

				<div className='space-y-4'>
					{['name', 'village', 'block', 'district'].map((field) => (
						<div key={field} className='space-y-1'>
							<label className='text-xs font-medium text-gray-500 uppercase tracking-wide ml-1'>
								{field}
							</label>
							<input
								placeholder={`Enter ${field}`}
								className='w-full bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-500'
								onChange={(e) => setForm({ ...form, [field]: e.target.value })}
							/>
						</div>
					))}

					<div className='space-y-1'>
						<label className='text-xs font-medium text-gray-500 uppercase tracking-wide ml-1'>
							Monthly Contribution
						</label>
						<input
							type='number'
							placeholder='Amount in ₹'
							className='w-full bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-500'
							onChange={(e) =>
								setForm({ ...form, monthlyContribution: e.target.value })
							}
						/>
					</div>
				</div>

				<button
					onClick={handleSubmit}
					className='w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all transform active:scale-[0.98]'>
					Continue
				</button>
			</div>
		</div>
	);
}
