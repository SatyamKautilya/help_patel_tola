import { useState } from 'react';
import {
	User,
	ArrowRight,
	CheckCircle2,
	IndianRupeeIcon,
	Wallet,
	Building2,
	Calendar,
} from 'lucide-react';

export default function ShgFinancialSetup({ shgId, members = [], onNext }) {
	const [isExisting, setIsExisting] = useState(false);
	const [step, setStep] = useState(1);

	const [onboardingDate, setOnboardingDate] = useState('');
	const [shgCash, setShgCash] = useState('');

	const [memberSavings, setMemberSavings] = useState({});
	const [memberLoans, setMemberLoans] = useState({});

	const [bankLoan, setBankLoan] = useState({
		bankName: '',
		amount: '',
	});

	/* ---------- helpers ---------- */

	const nextStep = () => setStep((s) => s + 1);

	/* ---------- UI ---------- */

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
				{/* Toggle */}
				<label className='flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700 rounded-xl cursor-pointer'>
					<input
						type='checkbox'
						// className='sr-only'
						checked={isExisting}
						onChange={() => setIsExisting(!isExisting)}
					/>
					<span className='font-medium text-slate-200'>
						क्या यह एक मौजूदा SHG है?
					</span>
				</label>

				{/* -------- EXISTING SHG FLOW -------- */}
				{isExisting && (
					<>
						{/* STEP 1: Onboarding date */}
						{step === 1 && (
							<div className='space-y-4'>
								<p className='font-semibold text-indigo-400'>Onboarding Date</p>
								<div className='relative'>
									<Calendar className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
									<input
										type='date'
										value={onboardingDate}
										onChange={(e) => setOnboardingDate(e.target.value)}
										className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 text-white'
									/>
								</div>
								<button
									disabled={!onboardingDate}
									onClick={nextStep}
									className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
									आगे बढ़ें
								</button>
							</div>
						)}

						{/* STEP 2: SHG Cash */}
						{step === 2 && (
							<div className='space-y-4'>
								<p className='font-semibold text-indigo-400'>
									समूह के पास वर्तमान नकद राशि
								</p>
								<div className='relative'>
									<Wallet className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
									<input
										type='number'
										placeholder='₹ वर्तमान नकद'
										value={shgCash}
										onChange={(e) => setShgCash(e.target.value)}
										className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 text-white'
									/>
								</div>
								<button
									disabled={!shgCash}
									onClick={nextStep}
									className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
									आगे बढ़ें
								</button>
							</div>
						)}

						{/* STEP 3: Member Savings */}
						{step === 3 && (
							<div className='space-y-4'>
								<p className='font-semibold text-indigo-400'>
									Member Savings (Optional)
								</p>
								{members.map((m) => (
									<div key={m._id} className='flex gap-3'>
										<span className='w-1/2 text-sm text-slate-300'>
											{m.name}
										</span>
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
									className='w-full bg-indigo-600 py-2 rounded-lg'>
									Continue
								</button>
							</div>
						)}

						{/* STEP 4: Member Loans */}
						{step === 4 && (
							<div className='space-y-4'>
								<p className='font-semibold text-indigo-400'>
									Member Loan Outstanding
								</p>
								{members.map((m) => (
									<div key={m._id} className='flex gap-3'>
										<span className='w-1/2 text-sm text-slate-300'>
											{m.name}
										</span>
										<input
											type='number'
											placeholder='₹ बाकी ऋण'
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
									className='w-full bg-indigo-600 py-2 rounded-lg'>
									Continue
								</button>
							</div>
						)}

						{/* STEP 5: Bank Loan */}
						{step === 5 && (
							<div className='space-y-4'>
								<p className='font-semibold text-indigo-400'>
									Bank Loan (If any)
								</p>
								<div className='relative'>
									<Building2 className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
									<input
										placeholder='Bank Name'
										className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 text-white'
										onChange={(e) =>
											setBankLoan({
												...bankLoan,
												bankName: e.target.value,
											})
										}
									/>
								</div>
								<input
									type='number'
									placeholder='₹ Outstanding'
									className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 p-3 text-white'
									onChange={(e) =>
										setBankLoan({
											...bankLoan,
											amount: e.target.value,
										})
									}
								/>
								<button
									onClick={nextStep}
									className='w-full bg-indigo-600 py-2 rounded-lg'>
									Review
								</button>
							</div>
						)}

						{/* STEP 6: Review */}
						{step === 6 && (
							<div className='space-y-4'>
								<p className='font-semibold text-green-400'>Review & Confirm</p>
								<div className='text-sm text-slate-300 space-y-1'>
									<p>Onboarding Date: {onboardingDate}</p>
									<p>SHG Cash: ₹{shgCash}</p>
									<p>Member Savings: {Object.keys(memberSavings).length}</p>
									<p>Member Loans: {Object.keys(memberLoans).length}</p>
									{bankLoan.amount && (
										<p>
											Bank Loan: {bankLoan.bankName} ₹{bankLoan.amount}
										</p>
									)}
								</div>
								<button
									onClick={onNext}
									className='w-full bg-green-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2'>
									<CheckCircle2 className='w-5 h-5' />
									Confirm & Finish
								</button>
							</div>
						)}
					</>
				)}
			</div>

			{/* Footer */}
			{!isExisting && (
				<div className='p-6'>
					<button
						onClick={onNext}
						className='w-full bg-green-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2'>
						Continue
						<ArrowRight className='w-5 h-5' />
					</button>
				</div>
			)}
		</>
	);
}
