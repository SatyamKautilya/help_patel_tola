import { useState } from 'react';
import {
	ArrowRight,
	CheckCircle2,
	IndianRupeeIcon,
	Building2,
	Loader2,
	Plus,
	Trash2,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import CashInHand from './shg-finance/CashInHand';

const STATUS_STEPS = [
	'SHG का प्रारंभिक नकद सेव हो रहा है…',
	'सदस्यों की बचत दर्ज की जा रही है…',
	'सदस्य ऋण का रिकॉर्ड बन रहा है…',
	'बैंक ऋण सेट किए जा रहे हैं…',
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
	const [bankLoans, setBankLoans] = useState([
		{ id: 1, bankName: '', amount: '', interestRate: '' },
	]);
	const [nextBankLoanId, setNextBankLoanId] = useState(2);

	const [saving, setSaving] = useState(false);
	const [statusIndex, setStatusIndex] = useState(0);

	const nextStep = () => setStep((s) => s + 1);

	const post = async (url, payload) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		if (!res.ok) throw new Error('API failed');
		return res.json();
	};

	const addBankLoan = () => {
		setBankLoans([
			...bankLoans,
			{ id: nextBankLoanId, bankName: '', amount: '', interestRate: '' },
		]);
		setNextBankLoanId(nextBankLoanId + 1);
	};

	const removeBankLoan = (id) => {
		setBankLoans(bankLoans.filter((loan) => loan.id !== id));
	};

	const updateBankLoan = (id, field, value) => {
		setBankLoans(
			bankLoans.map((loan) =>
				loan.id === id ? { ...loan, [field]: value } : loan,
			),
		);
	};

	const handleFinance = async () => {
		try {
			setSaving(true);
			setStatusIndex(0);

			const onboardingDate = new Date();

			await post('/api/shg?name=opening-balance', {
				shgId,
				fromAccount: 'SYSTEM',
				toAccount: 'SHG_CASH',
				amount: Number(shgCash),
				type: 'OPENING_BALANCE',
				memberId: null,
				date: onboardingDate,
				meta: { note: 'Opening SHG cash (existing SHG)' },
			});
			setStatusIndex(1);

			await Promise.all(
				Object.entries(memberSavings).map(([memberId, amount]) =>
					post('/api/shg?name=opening-balance', {
						shgId,
						fromAccount: 'SYSTEM',
						toAccount: `MEMBER_SAVINGS_${memberId}`,
						amount: Number(amount),
						type: 'OPENING_BALANCE',
						memberId,
						date: onboardingDate,
						meta: { note: 'Opening member savings' },
					}),
				),
			);
			setStatusIndex(2);

			await Promise.all(
				Object.entries(memberLoans).map(async ([memberId, loanData]) => {
					if (!(loanData.amount > 0)) return;
					const amount = loanData.amount || 0;
					const interestRate = loanData.interestRate || 0;

					const loan = await post('/api/shg?name=create-loan', {
						shgId,
						memberId,
						principal: Number(amount),
						interestRate: Number(interestRate),
						interestType: 'SIMPLE',
						issuedDate: onboardingDate,
						status: 'ONGOING',
						meta: { note: 'Existing loan onboarded with outstanding only' },
					});

					await post('/api/shg?name=opening-balance', {
						shgId,
						fromAccount: 'SYSTEM',
						toAccount: `MEMBER_LOAN_${memberId}`,
						amount: Number(amount),
						type: 'OPENING_BALANCE',
						memberId,
						date: onboardingDate,
						meta: {
							loanId: loan._id,
							note: 'Opening outstanding member loan',
						},
					});
				}),
			);
			setStatusIndex(3);

			/* 4️⃣ Multiple bank loans */
			await Promise.all(
				bankLoans
					.filter((loan) => loan.amount)
					.map(async (bankLoan) => {
						const bankLoanRes = await post('/api/shg?name=bank-loan', {
							shgId,
							bankName: bankLoan.bankName,
							principal: Number(bankLoan.amount),
							interestRate: bankLoan.interestRate
								? Number(bankLoan.interestRate)
								: 0,
							tenureMonths: null,
							issuedDate: onboardingDate,
							status: 'ONGOING',
							meta: { note: 'Existing bank loan onboarded' },
						});

						await post('/api/shg?name=opening-balance', {
							shgId,
							fromAccount: 'SYSTEM',
							toAccount: 'BANK_LOAN',
							amount: Number(bankLoan.amount),
							type: 'OPENING_BALANCE',
							memberId: null,
							date: onboardingDate,
							meta: {
								bankLoanId: bankLoanRes._id,
								note: 'Opening bank loan liability',
							},
						});
					}),
			);
			setStatusIndex(4);

			setStatusIndex(5);
			setTimeout(onNext, 900);
		} catch (e) {
			console.error(e);
			alert('सेव करते समय समस्या आई। कृपया पुनः प्रयास करें।');
			setSaving(false);
		}
	};

	return (
		<>
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

				{step === 2 && (
					<CashInHand setShgCash={setShgCash} nextStep={nextStep} />
				)}

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
											[m._id]: {
												amount: e.target.value,
												interestRate: memberLoans[m._id]?.interestRate || 0,
											},
										})
									}
								/>
								<input
									type='number'
									placeholder='ब्याज दर (%)'
									className='w-1/2 bg-slate-950 border border-slate-700 rounded-lg p-2'
									onChange={(e) =>
										setMemberLoans({
											...memberLoans,
											[m._id]: {
												amount: memberLoans[m._id]?.amount || 0,
												interestRate: e.target.value,
											},
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

				{step === 5 && (
					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							<p className='font-semibold text-indigo-400'>
								बैंक से लिए ऋण (यदि हों)
							</p>
							<button
								onClick={addBankLoan}
								className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-sm'>
								<Plus className='w-4 h-4' /> जोड़ें
							</button>
						</div>

						{bankLoans.map((loan) => (
							<div
								key={loan.id}
								className='space-y-3 p-4 bg-slate-800/30 rounded-lg'>
								<div className='relative'>
									<Building2 className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
									<input
										placeholder='बैंक का नाम'
										className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10'
										value={loan.bankName}
										onChange={(e) =>
											updateBankLoan(loan.id, 'bankName', e.target.value)
										}
									/>
								</div>
								<input
									type='number'
									placeholder='₹ बकाया'
									className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 p-3'
									value={loan.amount}
									onChange={(e) =>
										updateBankLoan(loan.id, 'amount', e.target.value)
									}
								/>
								<input
									type='number'
									placeholder='ब्याज दर (%)'
									className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 p-3'
									value={loan.interestRate}
									onChange={(e) =>
										updateBankLoan(loan.id, 'interestRate', e.target.value)
									}
								/>
								{bankLoans.length > 1 && (
									<button
										onClick={() => removeBankLoan(loan.id)}
										className='flex items-center gap-2 text-red-400 hover:text-red-300 text-sm'>
										<Trash2 className='w-4 h-4' /> हटाएं
									</button>
								)}
							</div>
						))}

						<button
							onClick={nextStep}
							className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
							समीक्षा करें
						</button>
					</div>
				)}

				{step === 6 && (
					<div className='space-y-4'>
						<div className='space-y-6'>
							<div className='bg-slate-800/40 border border-slate-700 rounded-xl p-4'>
								<p className='text-slate-400 text-sm'>SHG नकद</p>
								<p className='text-2xl font-bold text-pink-400'>
									₹ {shgCash || '0'}
								</p>
							</div>

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

							<div className='bg-slate-800/40 border border-slate-700 rounded-xl p-4'>
								<p className='text-indigo-400 font-semibold mb-3'>
									सदस्य पर ऋण
								</p>
								{members.map((m) => (
									<div
										key={m._id}
										className='flex justify-between text-slate-300 py-2 border-b border-slate-700 last:border-0'>
										<span>{m.name}</span>
										<span>₹ {memberLoans[m._id]?.amount || '0'}</span>
									</div>
								))}
							</div>

							{bankLoans.some((l) => l.amount) && (
								<div className='bg-slate-800/40 border border-slate-700 rounded-xl p-4'>
									<p className='text-indigo-400 font-semibold mb-3'>बैंक ऋण</p>
									{bankLoans
										.filter((l) => l.amount)
										.map((loan) => (
											<div
												key={loan.id}
												className='flex justify-between text-slate-300 py-2 border-b border-slate-700 last:border-0'>
												<span>{loan.bankName || 'बैंक'}</span>
												<span>₹ {loan.amount}</span>
											</div>
										))}
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

				{saving && (
					<div className='bg-slate-900/60 border border-slate-700 rounded-xl p-4'>
						<p className='text-pink-400 font-semibold animate-pulse'>
							{STATUS_STEPS[statusIndex]}
						</p>
					</div>
				)}
			</div>

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
