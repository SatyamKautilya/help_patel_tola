import { setLoader, setShgOnboardingData } from '@/app/store/appSlice';
import { ArrowRight, CheckCircle2, Loader2, IndianRupeeIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const money = (value) => Number(value || 0);

export default function ShgFinancialSetup({ shgId, onNext }) {
	const dispatch = useDispatch();
	const onboarding = useSelector((state) => state.appContext.shgOnboardingData);
	const members = onboarding?.members || [];
	const existingFinance = onboarding?.financeOpeningData || {};

	const [step, setStep] = useState(1);
	const [saving, setSaving] = useState(false);
	const [memberSavings, setMemberSavings] = useState(existingFinance.memberSavings || {});
	const [totals, setTotals] = useState({
		totalLoansGiven: existingFinance.totalLoansGiven || '',
		incomeFromInterest: existingFinance.incomeFromInterest || '',
		incomeFromPenalty: existingFinance.incomeFromPenalty || '',
		totalLumpSumPayments: existingFinance.totalLumpSumPayments || '',
		totalExpenditure: existingFinance.totalExpenditure || '',
	});

	useEffect(() => {
		setMemberSavings(existingFinance.memberSavings || {});
		setTotals({
			totalLoansGiven: existingFinance.totalLoansGiven || '',
			incomeFromInterest: existingFinance.incomeFromInterest || '',
			incomeFromPenalty: existingFinance.incomeFromPenalty || '',
			totalLumpSumPayments: existingFinance.totalLumpSumPayments || '',
			totalExpenditure: existingFinance.totalExpenditure || '',
		});
	}, [shgId, onboarding?.financeOpeningData]);

	const totalMemberSavings = useMemo(
		() =>
			members.reduce((sum, member) => sum + money(memberSavings[member._id] || 0), 0),
		[members, memberSavings],
	);

	const calculatedAvailableCash = useMemo(() => {
		return (
			totalMemberSavings +
			money(totals.incomeFromInterest) +
			money(totals.incomeFromPenalty) +
			money(totals.totalLumpSumPayments) -
			money(totals.totalLoansGiven) -
			money(totals.totalExpenditure)
		);
	}, [totalMemberSavings, totals]);

	const persistFinanceDraft = () => {
		dispatch(
			setShgOnboardingData({
				financeOpeningData: {
					memberSavings,
					...totals,
					totalMemberSavings,
					calculatedAvailableCash,
				},
			}),
		);
	};

	const postOpeningBalance = async (payload) => {
		const res = await fetch('/api/shg?name=opening-balance', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			throw new Error('Failed to save opening balance entries');
		}
		return res.json();
	};

	const handleSubmit = async () => {
		try {
			setSaving(true);
			dispatch(setLoader(true));
			const onboardingDate = new Date();

			// Member-wise total savings (bulk, one by one as requested).
			for (const member of members) {
				const amount = money(memberSavings[member._id]);
				if (amount <= 0) continue;
				await postOpeningBalance({
					shgId,
					fromAccount: 'EXTERNAL',
					toAccount: 'MEMBER_SAVINGS',
					amount,
					type: 'OPENING_BALANCE',
					memberId: member._id,
					date: onboardingDate,
					meta: { category: 'TOTAL_SAVINGS_TILL_DATE' },
				});
			}

			// Aggregate historical totals as onboarding baseline entries.
			const entries = [
				{
					amount: money(totals.totalLoansGiven),
					fromAccount: 'SHG_CASH',
					toAccount: 'MEMBER_LOAN',
					meta: { category: 'TOTAL_LOANS_GIVEN_TILL_DATE' },
				},
				{
					amount: money(totals.incomeFromInterest),
					fromAccount: 'EXTERNAL',
					toAccount: 'INTEREST_INCOME',
					meta: { category: 'TOTAL_INTEREST_INCOME_TILL_DATE' },
				},
				{
					amount: money(totals.incomeFromPenalty),
					fromAccount: 'EXTERNAL',
					toAccount: 'SHG_CASH',
					meta: { category: 'TOTAL_PENALTY_INCOME_TILL_DATE' },
				},
				{
					amount: money(totals.totalLumpSumPayments),
					fromAccount: 'EXTERNAL',
					toAccount: 'SHG_CASH',
					meta: { category: 'TOTAL_LUMP_SUM_PAYMENTS_TILL_DATE' },
				},
				{
					amount: money(totals.totalExpenditure),
					fromAccount: 'SHG_CASH',
					toAccount: 'EXTERNAL',
					meta: { category: 'TOTAL_EXPENDITURE_TILL_DATE' },
				},
			];

			for (const entry of entries) {
				if (entry.amount <= 0) continue;
				await postOpeningBalance({
					shgId,
					fromAccount: entry.fromAccount,
					toAccount: entry.toAccount,
					amount: entry.amount,
					type: 'OPENING_BALANCE',
					memberId: null,
					date: onboardingDate,
					meta: entry.meta,
				});
			}

			persistFinanceDraft();
			onNext();
		} catch (error) {
			console.error(error);
			alert('वित्तीय ऑनबोर्डिंग सेव नहीं हो पाया। कृपया पुनः प्रयास करें।');
		} finally {
			dispatch(setLoader(false));
			setSaving(false);
		}
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-3'>
				<div className='bg-indigo-500/10 p-2 rounded-lg'>
					<IndianRupeeIcon className='w-6 h-6 text-pink-400' />
				</div>
				<div>
					<h2 className='text-2xl font-bold text-white'>SHG वित्तीय ऑनबोर्डिंग</h2>
					<p className='text-sm text-slate-400'>
						एकमुश्त प्रारंभिक आंकड़े भरें। यह स्क्रीन लैपटॉप उपयोग के लिए बनाई गई है।
					</p>
				</div>
			</div>

			{step === 1 ? (
				<div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
					<div className='space-y-4 bg-slate-900/40 border border-slate-700 rounded-xl p-5'>
						<h3 className='text-lg font-semibold text-indigo-300'>
							सदस्यों की कुल बचत (एक-एक करके)
						</h3>
						<p className='text-xs text-slate-400'>
							सुझाव: यदि किसी सदस्य की बचत नहीं है तो 0 दर्ज करें।
						</p>
						<div className='space-y-3 max-h-[420px] overflow-y-auto pr-2'>
							{members.map((member, index) => (
								<div
									key={member._id}
									className='grid grid-cols-12 items-center gap-3 bg-slate-800/50 rounded-lg px-3 py-2'>
									<span className='col-span-1 text-slate-500 text-sm'>{index + 1}</span>
									<span className='col-span-7 text-slate-200 text-sm font-medium'>
										{member.name}
									</span>
									<input
										type='number'
										min='0'
										value={memberSavings[member._id] || ''}
										onChange={(e) =>
											setMemberSavings((prev) => ({
												...prev,
												[member._id]: e.target.value,
											}))
										}
										placeholder='0'
										className='col-span-4 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-right text-white'
									/>
								</div>
							))}
						</div>
					</div>

					<div className='space-y-4 bg-slate-900/40 border border-slate-700 rounded-xl p-5'>
						<h3 className='text-lg font-semibold text-indigo-300'>Bulk totals till date</h3>
						<p className='text-xs text-slate-400'>
							ये कुल एकमुश्त आंकड़े हैं, पुराने लेन-देन की एंट्री अलग से नहीं चाहिए।
						</p>
						<div className='space-y-3'>
							<Field
								label='कुल दिए गए ऋण'
								value={totals.totalLoansGiven}
								onChange={(value) =>
									setTotals((prev) => ({ ...prev, totalLoansGiven: value }))
								}
							/>
							<Field
								label='ब्याज से आय'
								value={totals.incomeFromInterest}
								onChange={(value) =>
									setTotals((prev) => ({ ...prev, incomeFromInterest: value }))
								}
							/>
							<Field
								label='जुर्माना से आय'
								value={totals.incomeFromPenalty}
								onChange={(value) =>
									setTotals((prev) => ({ ...prev, incomeFromPenalty: value }))
								}
							/>
							<Field
								label='कुल लंपसम भुगतान'
								value={totals.totalLumpSumPayments}
								onChange={(value) =>
									setTotals((prev) => ({ ...prev, totalLumpSumPayments: value }))
								}
							/>
							<Field
								label='कुल व्यय'
								value={totals.totalExpenditure}
								onChange={(value) =>
									setTotals((prev) => ({ ...prev, totalExpenditure: value }))
								}
							/>
						</div>

						<div className='bg-slate-950 border border-slate-700 rounded-lg p-4 space-y-2 mt-4'>
							<Row label='सदस्य कुल बचत' value={totalMemberSavings} />
							<Row
								label='गणना अनुसार उपलब्ध नकद'
								value={calculatedAvailableCash}
								highlight
							/>
						</div>
					</div>

					<div className='xl:col-span-2 flex justify-end gap-3'>
						<button
							onClick={() => {
								persistFinanceDraft();
								setStep(2);
							}}
							aria-label='Review financial onboarding totals'
							className='px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold flex items-center gap-2'>
							समीक्षा करें <ArrowRight className='w-5 h-5' />
						</button>
					</div>
				</div>
			) : null}

			{step === 2 ? (
				<div className='space-y-5 bg-slate-900/40 border border-slate-700 rounded-xl p-6'>
					<h3 className='text-xl font-semibold text-white'>प्रारंभिक कुल राशि की समीक्षा</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<Row label='सदस्य कुल बचत' value={totalMemberSavings} />
						<Row label='कुल दिए गए ऋण' value={money(totals.totalLoansGiven)} />
						<Row label='ब्याज से आय' value={money(totals.incomeFromInterest)} />
						<Row label='जुर्माना से आय' value={money(totals.incomeFromPenalty)} />
						<Row
							label='कुल लंपसम भुगतान'
							value={money(totals.totalLumpSumPayments)}
						/>
						<Row label='कुल व्यय' value={money(totals.totalExpenditure)} />
					</div>
					<div className='border-t border-slate-700 pt-4'>
						<Row
							label='गणना अनुसार उपलब्ध नकद'
							value={calculatedAvailableCash}
							highlight
						/>
					</div>

					<div className='flex justify-end gap-3'>
						<button
							onClick={() => setStep(1)}
							disabled={saving}
							aria-label='Go back to edit financial values'
							className='px-5 py-2.5 rounded-lg border border-slate-600 text-slate-200'>
							वापस
						</button>
						<button
							onClick={handleSubmit}
							disabled={saving}
							aria-label='Save financial onboarding and continue'
							className='px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2'>
							{saving ? <Loader2 className='animate-spin w-4 h-4' /> : <CheckCircle2 className='w-4 h-4' />}
							{saving ? 'सेव हो रहा है...' : 'सेव करें और आगे बढ़ें'}
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}

function Field({ label, value, onChange }) {
	return (
		<div className='space-y-1'>
			<label className='text-xs uppercase tracking-wide text-slate-400'>{label}</label>
			<input
				type='number'
				min='0'
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder='0'
				className='w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white'
			/>
		</div>
	);
}

function Row({ label, value, highlight = false }) {
	return (
		<div className='flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-3'>
			<span className='text-slate-300 text-sm'>{label}</span>
			<span className={`font-semibold ${highlight ? 'text-pink-400' : 'text-white'}`}>
				Rs. {Number(value || 0).toLocaleString('en-IN')}
			</span>
		</div>
	);
}
