import { useState } from 'react';
import {
	ArrowRight,
	CheckCircle2,
	IndianRupeeIcon,
	Building2,
	Loader2,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import CashInHand from './shg-finance/CashInHand';

/* ---------------- Animated backend messages ---------------- */

const STATUS_STEPS = [
	'SHG का प्रारंभिक नकद सेव हो रहा है…',
	'सदस्यों की बचत दर्ज की जा रही है…',
	'सदस्य ऋण का रिकॉर्ड बन रहा है…',
	'बैंक ऋण सेट किया जा रहा है…',
	'नकद और खातों का मिलान हो रहा है…',
	'वित्तीय सेटअप पूरा हो रहा है…',
];

export default function ShgFinancialSetup({ shgId, onNext }) {
	const shg = useSelector((state) => state.appContext.shgOnboardingData);
	const members = shg?.members || [];

	const [isExisting, setIsExisting] = useState(false);
	const [step, setStep] = useState(1);

	const [shgCash, setShgCash] = useState('');
	const [memberSavings, setMemberSavings] = useState({});
	const [memberLoans, setMemberLoans] = useState({});
	const [bankLoan, setBankLoan] = useState({ bankName: '', amount: '' });

	const [saving, setSaving] = useState(false);
	const [statusIndex, setStatusIndex] = useState(0);

	const nextStep = () => setStep((s) => s + 1);

	/* ---------------- API helper ---------------- */

	const post = async (url, payload) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		if (!res.ok) throw new Error('API failed');
	};

	/* ---------------- Save Finance ---------------- */

	const handleFinance = async () => {
		try {
			setSaving(true);
			setStatusIndex(0);

			/* 1️⃣ SHG opening cash */
			await post('/api/shg?name=opening-balance', {
				shgId,
				fromAccount: 'SYSTEM',
				toAccount: 'SHG_CASH',
				amount: Number(shgCash),
				type: 'OPENING_BALANCE',
				memberId: null,
				date: new Date(),
				meta: { note: 'Onboarding opening balance' },
			});
			setStatusIndex(1);

			/* 2️⃣ Member savings (liability) */
			await Promise.all(
				Object.entries(memberSavings).map(([memberId, amount]) =>
					post('/api/shg?name=opening-balance', {
						shgId,
						fromAccount: 'SYSTEM',
						toAccount: `MEMBER_SAVINGS_${memberId}`,
						amount: Number(amount),
						type: 'OPENING_BALANCE',
						memberId,
						date: new Date(),
						meta: { note: 'Member savings opening' },
					}),
				),
			);
			setStatusIndex(2);

			/* 3️⃣ Member loan outstanding (asset) */
			await Promise.all(
				Object.entries(memberLoans).map(([memberId, amount]) =>
					post('/api/shg?name=opening-balance', {
						shgId,
						fromAccount: 'SYSTEM',
						toAccount: `MEMBER_LOAN_${memberId}`,
						amount: Number(amount),
						type: 'OPENING_BALANCE',
						memberId,
						date: new Date(),
						meta: { note: 'Outstanding member loan' },
					}),
				),
			);
			setStatusIndex(3);

			/* 4️⃣ Bank loan + cash received */
			// 	TO DO - ADD TENURE AND INTEREST RATE
			if (bankLoan.amount) {
				await post('/api/shg?name=bank-loan', {
					shgId,
					fromAccount: 'SYSTEM',
					toAccount: 'BANK_LOAN',
					amount: Number(bankLoan.amount),
					type: 'OPENING_BALANCE',
					memberId: null,
					date: new Date(),
					meta: { bankName: bankLoan.bankName },
				});

				await post('/api/shg?name=opening-balance', {
					shgId,
					fromAccount: 'BANK_LOAN',
					toAccount: 'SHG_CASH',
					amount: Number(bankLoan.amount),
					type: 'TRANSFER',
					memberId: null,
					date: new Date(),
					meta: { note: 'Bank loan cash received' },
				});
			}
			setStatusIndex(4);

			/* 5️⃣ Done */
			setStatusIndex(5);
			setTimeout(onNext, 900);
		} catch (e) {
			alert('सेव करते समय समस्या आई। कृपया पुनः प्रयास करें।');
			setSaving(false);
		}
	};

	/* ---------------- UI ---------------- */

	return (
		<>
			{/* Header */}
			<div className='bg-slate-800/50 p-6 border-b border-slate-700/50'>
				<div className='flex items-center gap-3'>
					<div className='bg-indigo-500/10 p-2 rounded-lg'>
						<IndianRupeeIcon className='w-6 h-6 text-pink-400' />
					</div>
					<div>
						<h2 className='text-xl font-bold text-white'>वित्तीय सेटअप</h2>
						<p className='text-sm text-slate-400'>प्रारंभिक वित्तीय जानकारी</p>
					</div>
				</div>
			</div>

			<div className='p-6 space-y-6'>
				{/* STEP 1 */}
				{step === 1 && (
					<>
						<label className='flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700 rounded-xl cursor-pointer'>
							<input
								type='checkbox'
								className='w-5 h-5 accent-pink-500'
								checked={isExisting}
								onChange={() => {
									setIsExisting(!isExisting);
									setStep(1);
								}}
							/>
							<span className='font-medium text-slate-200'>
								क्या यह एक मौजूदा SHG है?
							</span>
						</label>

						{isExisting && (
							<button
								onClick={nextStep}
								className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
								आगे बढ़ें
							</button>
						)}
					</>
				)}

				{/* STEP 2 */}
				{step === 2 && (
					<CashInHand setShgCash={setShgCash} nextStep={nextStep} />
				)}

				{/* STEP 3 */}
				{step === 3 && (
					<div className='space-y-4'>
						<p className='font-semibold text-indigo-400'>सदस्यों की जमा बचत</p>
						{members.map((m, i) => (
							<div key={m._id} className='flex items-center gap-3'>
								{i + 1}){' '}
								<span className='w-1/2 font-bold text-slate-300'>{m.name}</span>
								<input
									type='number'
									placeholder='₹'
									className='w-1/2 bg-slate-950 border border-slate-700 rounded-lg p-2'
									onChange={(e) =>
										setMemberSavings({
											...memberSavings,
											[m._id]: e.target.value,
										})
									}
								/>
							</div>
						))}
						<button
							onClick={nextStep}
							className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
							आगे बढ़ें
						</button>
					</div>
				)}

				{/* STEP 4 */}
				{step === 4 && (
					<div className='space-y-4'>
						<p className='font-semibold text-indigo-400'>सदस्य पर ऋण</p>
						{members.map((m) => (
							<div key={m._id} className='flex gap-3'>
								<span className='w-1/2 font-bold text-slate-300'>{m.name}</span>
								<input
									type='number'
									placeholder='₹ बकाया'
									className='w-1/2 bg-slate-950 border border-slate-700 rounded-lg p-2'
									onChange={(e) =>
										setMemberLoans({
											...memberLoans,
											[m._id]: e.target.value,
										})
									}
								/>
							</div>
						))}
						<button
							onClick={nextStep}
							className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
							आगे बढ़ें
						</button>
					</div>
				)}

				{/* STEP 5 */}
				{step === 5 && (
					<div className='space-y-4'>
						<p className='font-semibold text-indigo-400'>
							बैंक से लिया लोन (यदि हो)
						</p>
						<div className='relative'>
							<Building2 className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
							<input
								placeholder='बैंक का नाम'
								className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10'
								onChange={(e) =>
									setBankLoan({ ...bankLoan, bankName: e.target.value })
								}
							/>
						</div>
						<input
							type='number'
							placeholder='₹ बकाया'
							className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 p-3'
							onChange={(e) =>
								setBankLoan({ ...bankLoan, amount: e.target.value })
							}
						/>
						<button
							onClick={nextStep}
							className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
							समीक्षा करें
						</button>
					</div>
				)}

				{/* STEP 6 */}
				{step === 6 && (
					<div className='space-y-4'>
						<div className='space-y-6'>
							{/* SHG Cash Summary */}
							<div className='bg-slate-800/40 border border-slate-700 rounded-xl p-4'>
								<p className='text-slate-400 text-sm'>SHG नकद</p>
								<p className='text-2xl font-bold text-pink-400'>
									₹ {shgCash || '0'}
								</p>
							</div>

							{/* Member Savings */}
							<div className='bg-slate-800/40 border border-slate-700 rounded-xl p-4'>
								<p className='text-indigo-400 font-semibold mb-3'>
									सदस्यों की जमा बचत
								</p>
								{members.map((m) => (
									<div
										key={m._id}
										className='flex justify-between text-slate-300 py-2 border-b border-slate-700 last:border-0'>
										<span>{m.name}</span>
										<span>₹ {memberSavings[m._id] || '0'}</span>
									</div>
								))}
							</div>

							{/* Member Loans */}
							<div className='bg-slate-800/40 border border-slate-700 rounded-xl p-4'>
								<p className='text-indigo-400 font-semibold mb-3'>
									सदस्य पर ऋण
								</p>
								{members.map((m) => (
									<div
										key={m._id}
										className='flex justify-between text-slate-300 py-2 border-b border-slate-700 last:border-0'>
										<span>{m.name}</span>
										<span>₹ {memberLoans[m._id] || '0'}</span>
									</div>
								))}
							</div>

							{/* Bank Loan */}
							{bankLoan.amount && (
								<div className='bg-slate-800/40 border border-slate-700 rounded-xl p-4'>
									<p className='text-indigo-400 font-semibold mb-3'>बैंक ऋण</p>
									<div className='flex justify-between text-slate-300 py-2'>
										<span>{bankLoan.bankName || 'बैंक'}</span>
										<span>₹ {bankLoan.amount}</span>
									</div>
								</div>
							)}
						</div>
						<button
							onClick={handleFinance}
							disabled={saving}
							className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-3 rounded-xl font-semibold flex justify-center gap-2'>
							{saving ? (
								<>
									<Loader2 className='animate-spin w-5 h-5' />
									सेव हो रहा है…
								</>
							) : (
								<>
									<CheckCircle2 className='w-5 h-5' />
									पुष्टि करें और सेव करें
								</>
							)}
						</button>
					</div>
				)}

				{/* Animated backend status */}
				{saving && (
					<div className='bg-slate-900/60 border border-slate-700 rounded-xl p-4'>
						<p className='text-pink-400 font-semibold animate-pulse'>
							{STATUS_STEPS[statusIndex]}
						</p>
					</div>
				)}
			</div>

			{/* New SHG shortcut */}
			{!isExisting && (
				<div className='p-6'>
					<button
						onClick={onNext}
						className='w-full bg-gradient-to-r from-indigo-600 to-pink-500 py-3 rounded-xl font-semibold flex justify-center gap-2'>
						आगे बढ़ें <ArrowRight className='w-5 h-5' />
					</button>
				</div>
			)}
		</>
	);
}
