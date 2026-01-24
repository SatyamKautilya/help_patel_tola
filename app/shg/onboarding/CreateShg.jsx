import { setLoader, setShgOnboardingData } from '@/app/store/appSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CreateShg({ onNext }) {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		name: '',
		village: '',
		block: '',
		district: '',
		monthlyContribution: '',
		formationDate: '',
		totalMembers: '',
	});
	console.log(form, 'form data');

	const handleSubmit = async () => {
		try {
			dispatch(setLoader(true));
			const res = await fetch('/api/shg?name=create-shg', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...form,
					monthlyContribution: Number(form.monthlyContribution),
					formationDate: form.formationDate
						? new Date(form.formationDate)
						: new Date(),
					totalMembers: Number(form.totalMembers),
				}),
			});

			const shg = await res.json();
			dispatch(setShgOnboardingData({ shgDetails: shg }));
			onNext();
		} catch (error) {
			console.error('Error creating SHG:', error);
		} finally {
			dispatch(setLoader(false));
		}
	};

	const fieldLabels = {
		name: 'समूह का नाम',
		village: 'गाँव',
		block: 'ब्लॉक',
		district: 'जिला',
		formationDate: 'गठन तारीख',
		totalMembers: 'कुल सदस्य',
	};

	return (
		<>
			<div className='text-center space-y-2'>
				<h2 className='text-3xl mb-2 font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent'>
					समूह की जानकारी
				</h2>
			</div>
			<div className='space-y-4'>
				{[
					'name',
					'totalMembers',
					'village',
					'block',
					'district',
					'formationDate',
				].map((field) => (
					<div key={field} className='space-y-1'>
						<label className='text-xs font-medium text-gray-500 uppercase tracking-wide ml-1'>
							{fieldLabels[field]}
						</label>
						<input
							type={
								field === 'formationDate'
									? 'date'
									: field === 'totalMembers'
										? 'number'
										: 'text'
							}
							placeholder={`${fieldLabels[field]} दर्ज करें`}
							className='w-full bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all placeholder-gray-500'
							onChange={(e) => setForm({ ...form, [field]: e.target.value })}
						/>
					</div>
				))}

				<div className='space-y-1'>
					<label className='text-xs font-medium text-gray-500 uppercase tracking-wide ml-1'>
						मासिक बचत जमा
					</label>
					<input
						type='number'
						placeholder='₹ में राशि'
						className='w-full bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all placeholder-gray-500'
						onChange={(e) =>
							setForm({ ...form, monthlyContribution: e.target.value })
						}
					/>
				</div>
			</div>
			<button
				onClick={handleSubmit}
				className='w-full mt-4 bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-500 hover:to-pink-400 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-pink-500/30 transition-all transform active:scale-[0.98]'>
				आगे बढ़ें
			</button>
		</>
	);
}
