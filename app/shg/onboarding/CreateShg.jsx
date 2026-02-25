import { setLoader, setShgOnboardingData } from '@/app/store/appSlice';
import { Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateShg({ onNext, creatorId }) {
	const dispatch = useDispatch();
	const shgDetails = useSelector(
		(state) => state.appContext.shgOnboardingData?.shgDetails || {},
	);
	const [form, setForm] = useState({
		name: '',
		village: '',
		block: '',
		district: '',
		monthlyContribution: '',
		formationDate: '',
		totalMembers: '',
	});
	const [error, setError] = useState('');

	useEffect(() => {
		if (!shgDetails?._id) return;
		setForm({
			name: shgDetails.name || '',
			village: shgDetails.village || '',
			block: shgDetails.block || '',
			district: shgDetails.district || '',
			monthlyContribution: String(shgDetails.monthlyContribution || ''),
			formationDate: shgDetails.formationDate
				? new Date(shgDetails.formationDate).toISOString().slice(0, 10)
				: '',
			totalMembers: String(shgDetails.totalMembers || ''),
		});
	}, [shgDetails]);

	const isValid =
		form.name.trim() &&
		form.village.trim() &&
		form.block.trim() &&
		form.district.trim() &&
		Number(form.totalMembers) > 0 &&
		Number(form.monthlyContribution) >= 0;

	const handleSubmit = async () => {
		if (!isValid) {
			setError('कृपया सभी आवश्यक जानकारी सही से भरें।');
			return;
		}
		setError('');
		try {
			if (shgDetails?._id) {
				const updatedShgDetails = {
					...shgDetails,
					...form,
					totalMembers: Number(form.totalMembers),
					monthlyContribution: Number(form.monthlyContribution),
				};
				dispatch(setShgOnboardingData({ shgDetails: updatedShgDetails }));
				await fetch('/api/shg?name=save-onboarding-draft', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						shgId: shgDetails._id,
						onboardingStep: 1,
						onboardingDraft: { shgDetails: updatedShgDetails },
					}),
				});
				onNext();
				return;
			}

			dispatch(setLoader(true));
			const res = await fetch('/api/shg?name=create-shg', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...form,
					createdBy: creatorId || 'unknown',
					status: 'DRAFT',
					onboardingStep: 1,
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
		} catch (submitError) {
			console.error('Error creating SHG:', submitError);
			setError('अभी SHG बनाना संभव नहीं है।');
		} finally {
			dispatch(setLoader(false));
		}
	};

	return (
		<div className='space-y-6'>
			<header className='space-y-1'>
				<h2 className='text-3xl font-bold text-white'>SHG प्रोफाइल बनाएं</h2>
				<p className='text-slate-400 text-sm'>
					समूह की मूल जानकारी भरें। ड्राफ्ट बाद में भी संपादित किया जा सकता है।
				</p>
			</header>

			<section className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
				<Field
					label='समूह का नाम'
					icon={<Building2 className='w-4 h-4 text-slate-500' />}
					placeholder='जैसे: माँ दुर्गा SHG'
					value={form.name}
					onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
				/>
				<Field
					label='कुल सदस्य'
					icon={<Users className='w-4 h-4 text-slate-500' />}
					type='number'
					placeholder='जैसे: 12'
					value={form.totalMembers}
					onChange={(value) =>
						setForm((prev) => ({ ...prev, totalMembers: value }))
					}
				/>
				<Field
					label='गाँव'
					icon={<MapPin className='w-4 h-4 text-slate-500' />}
					placeholder='गाँव का नाम'
					value={form.village}
					onChange={(value) => setForm((prev) => ({ ...prev, village: value }))}
				/>
				<Field
					label='ब्लॉक'
					icon={<MapPin className='w-4 h-4 text-slate-500' />}
					placeholder='ब्लॉक'
					value={form.block}
					onChange={(value) => setForm((prev) => ({ ...prev, block: value }))}
				/>
				<Field
					label='जिला'
					icon={<MapPin className='w-4 h-4 text-slate-500' />}
					placeholder='जिला'
					value={form.district}
					onChange={(value) =>
						setForm((prev) => ({ ...prev, district: value }))
					}
				/>
				<Field
					label='गठन तिथि'
					icon={<CalendarDays className='w-4 h-4 text-pink-400' />}
					type='date'
					value={form.formationDate}
					onChange={(value) =>
						setForm((prev) => ({ ...prev, formationDate: value }))
					}
				/>
			</section>

			<section className='bg-slate-900/50 border border-slate-700 rounded-xl p-4'>
				<Field
					label='प्रति सदस्य मासिक बचत (रु.)'
					type='number'
					placeholder='जैसे: 100'
					value={form.monthlyContribution}
					onChange={(value) =>
						setForm((prev) => ({ ...prev, monthlyContribution: value }))
					}
				/>
			</section>

			{error ? (
				<p role='alert' className='text-sm text-red-300'>
					{error}
				</p>
			) : null}

			<div className='flex justify-end'>
				<button
					onClick={handleSubmit}
					className='min-w-[220px] bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-500 hover:to-pink-400 text-white font-semibold py-3 rounded-lg shadow-lg transition-all'
					aria-label='Save SHG basic details and continue'>
					सेव करें और आगे बढ़ें
				</button>
			</div>
		</div>
	);
}

function Field({
	label,
	value,
	onChange,
	type = 'text',
	placeholder = '',
	icon = null,
}) {
	return (
		<label className='space-y-1 block'>
			<span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
				{label}
			</span>
			<div className='relative'>
				{icon ? <span className='absolute left-3 top-3'>{icon}</span> : null}
				<input
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={`w-full bg-slate-900 text-slate-100 border border-slate-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all placeholder-slate-500 ${
						icon ? 'pl-9' : ''
					}`}
				/>
			</div>
		</label>
	);
}
