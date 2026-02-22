'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	IndianRupee,
	ChevronLeft,
	HandCoins,
	CheckCircle2,
	AlertCircle,
	Loader2,
	ArrowRight,
	Edit2,
	Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoanRepaymentPage({ params }) {
	const { shgid } = params;
	const router = useRouter();

	const [step, setStep] = useState('entry'); // "entry" | "review"
	const [loans, setLoans] = useState([]);
	const [repayments, setRepayments] = useState({});
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [uiMessage, setUiMessage] = useState(null);

	useEffect(() => {
		const loadLoans = async () => {
			setLoading(true);
			try {
				const res = await fetch('/api/shg?name=list-active-loans', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ shgId: shgid }),
				});
				const data = await res.json();
				setLoans(data.loans || []);

				const initial = {};
				data.loans?.forEach((loan) => {
					initial[loan._id] = {
						principal: '',
						interest: loan.monthlyInterest || '',
					};
				});
				setRepayments(initial);
			} catch {
				setUiMessage({ type: 'error', text: 'लोन सूची लोड नहीं हो पाई' });
			} finally {
				setLoading(false);
			}
		};
		loadLoans();
	}, [shgid]);

	const updatePayment = (loanId, field, value) => {
		setRepayments((p) => ({
			...p,
			[loanId]: { ...p[loanId], [field]: value },
		}));
	};

	const getValidationErrors = (loan) => {
		const pay = repayments[loan._id] || {};
		const pVal = Number(pay.principal || 0);
		if (pVal > loan.outstandingPrincipal) {
			return 'मूलधन बकाया से अधिक है';
		}

		return null;
	};

	const hasAnyValidationError = () => {
		return loans.some((loan) => {
			const err = getValidationErrors(loan);
			const pay = repayments[loan._id];
			const total = Number(pay?.principal || 0) + Number(pay?.interest || 0);
			return err && total > 0;
		});
	};

	const grandTotal = useMemo(() => {
		return Object.values(repayments).reduce((acc, curr) => {
			return acc + Number(curr.principal || 0) + Number(curr.interest || 0);
		}, 0);
	}, [repayments]);

	const activeRepayments = useMemo(() => {
		return loans.filter((loan) => {
			const pay = repayments[loan._id];
			return Number(pay?.principal || 0) + Number(pay?.interest || 0) > 0;
		});
	}, [loans, repayments]);

	const handleReview = () => {
		if (hasAnyValidationError()) {
			setUiMessage({ type: 'error', text: 'कृपया पहले त्रुटियां सुधारें' });
			return;
		}
		if (grandTotal <= 0) {
			setUiMessage({ type: 'error', text: 'कम से कम एक भुगतान दर्ज करें' });
			return;
		}
		setStep('review');
	};

	const submitRepayments = async () => {
		const payloads = activeRepayments.map((loan) => {
			const pay = repayments[loan._id] || {};
			const principal = Number(pay.principal || 0);
			const interest = Number(pay.interest || 0);
			return {
				loanId: loan._id,
				memberId: loan.memberId,
				principal,
				interest,
				amount: principal + interest,
			};
		});

		try {
			setSaving(true);
			await Promise.all(
				payloads.map((p) =>
					fetch('/api/shg?name=collect-repayment', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ shgId: shgid, ...p }),
					}),
				),
			);
			setUiMessage({ type: 'success', text: 'भुगतान सफलतापूर्वक सहेजा गया' });
			setTimeout(() => router.back(), 1500);
		} catch {
			setUiMessage({ type: 'error', text: 'सहेजते समय त्रुटि हुई' });
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className='min-h-screen bg-slate-50 relative flex flex-col overflow-x-hidden font-sans'>
			<div className='absolute top-[-5%] left-[-10%] w-[60%] h-[30%] bg-emerald-200/20 rounded-full blur-[100px]' />
			<div className='absolute bottom-[-5%] right-[-10%] w-[60%] h-[30%] bg-orange-200/20 rounded-full blur-[100px]' />

			<nav className='relative z-20 px-6 pt-6 flex items-center justify-between bg-white/70 backdrop-blur-md pb-4 sticky top-0 border-b border-white'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200'>
						<HandCoins className='w-6 h-6 text-white' />
					</div>
					<div>
						<h1 className='text-xl font-black text-slate-800 tracking-tight'>
							ऋण वसूली
						</h1>
						<span className='text-[11px] font-bold text-emerald-700 tracking-wide'>
							{step === 'entry'
								? `कुल संग्रह: ₹${grandTotal}`
								: 'समीक्षा और पुष्टि'}
						</span>
					</div>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={() => (step === 'review' ? setStep('entry') : router.back())}
					className='p-3 bg-white rounded-2xl border shadow-sm'>
					<ChevronLeft className='w-5 h-5 text-slate-600' />
				</motion.button>
			</nav>

			<main className='relative z-10 flex-1 px-6 pt-6 pb-44 space-y-5'>

				<div className='rounded-2xl border border-amber-200 bg-amber-50/70 p-4 flex items-start gap-3'>
					<Info className='w-4 h-4 text-amber-700 mt-0.5' />
					<div className='text-xs text-amber-900 font-medium leading-relaxed'>
						यदि कोई भुगतान हो तो मासिक ब्याज पूरा भरना होगा। मूलधन बकाया राशि से
						अधिक नहीं हो सकता।
					</div>
				</div>

				<AnimatePresence mode='wait'>
					{step === 'entry' && (
						<motion.div
							key='entry'
							initial={{ opacity: 0, x: -16 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -16 }}
							className='space-y-4'>
							{loading ? (
								<div className='flex justify-center py-20'>
									<Loader2 className='animate-spin text-emerald-500' />
								</div>
							) : (
								loans.map((loan) => {
									const pay = repayments[loan._id] || {};
									const error = getValidationErrors(loan);
									const total =
										Number(pay.principal || 0) + Number(pay.interest || 0);
									const remainingBalance =
										loan.outstandingPrincipal - Number(pay.principal || 0);

									return (
										<div
											key={loan._id}
											className='rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-5'>
											<div className='flex flex-wrap items-center justify-between gap-2 mb-4'>
												<div>
													<h3 className='text-xl font-bold text-slate-800'>
														{loan.memberName}
													</h3>
													<p className='text-sm text-slate-500 mt-1'>ऋण खाता</p>
												</div>
												<span className='px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700'>
													ब्याज {loan.interestRate}%
												</span>
											</div>

											<div className='grid grid-cols-2 gap-3 mb-4'>
												<FocusMetric
													label='शेष ऋण राशि'
													value={loan.outstandingPrincipal}
													tone='slate'
												/>
												<FocusMetric
													label='देय ब्याज'
													value={loan.monthlyInterest}
													tone='amber'
												/>
											</div>

											<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
												<InputBlock
													label='ब्याज'
													hint={`देय: ₹${loan.monthlyInterest}`}
													iconClass='text-amber-600'
													value={pay.interest}
													onChange={(value) =>
														updatePayment(loan._id, 'interest', value)
													}
													placeholder='0'
												/>
												<InputBlock
													label='मूलधन'
													hint='जमा किया गया मूलधन दर्ज करें'
													iconClass='text-emerald-600'
													value={pay.principal}
													onChange={(value) =>
														updatePayment(loan._id, 'principal', value)
													}
													placeholder='0'
												/>
											</div>

											<div className='grid grid-cols-2 gap-3 mt-4'>
												<FocusMetric
													label='जमा मूलधन'
													value={Number(pay.principal || 0)}
													tone='emerald'
												/>
												<FocusMetric
													label='मूलधन के बाद शेष'
													value={Math.max(remainingBalance, 0)}
													tone={remainingBalance <= 0 ? 'emerald' : 'rose'}
												/>
											</div>

											{total > 0 ? (
												<div className='mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 flex items-center justify-between'>
													<p className='text-sm font-semibold text-emerald-700'>
														कुल जमा
													</p>
													<p className='text-lg font-bold text-emerald-800'>
														₹{total}
													</p>
												</div>
											) : null}

											{error ? (
												<div className='mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 flex items-center gap-2'>
													<AlertCircle size={14} />
													{error}
												</div>
											) : null}
										</div>
									);
								})
							)}
						</motion.div>
					)}

					{step === 'review' && (
						<motion.div
							key='review'
							initial={{ opacity: 0, x: 16 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 16 }}
							className='space-y-4'>
							<div className='rounded-3xl bg-slate-900 text-white p-6 shadow-xl'>
								<p className='text-xs uppercase tracking-wide text-slate-300'>
									आज का संग्रह
								</p>
								<h2 className='text-4xl font-black mt-1'>₹{grandTotal}</h2>
								<p className='text-xs text-slate-300 mt-2'>
									{activeRepayments.length} सदस्य चयनित
								</p>
							</div>

							<div className='rounded-2xl border border-slate-200 bg-white p-4 space-y-3'>
								{activeRepayments.map((loan) => {
									const pay = repayments[loan._id] || {};
									const principal = Number(pay.principal || 0);
									const interest = Number(pay.interest || 0);
									const total = principal + interest;
									return (
										<div
											key={loan._id}
											className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 flex items-center justify-between'>
											<div>
												<p className='font-semibold text-slate-800'>
													{loan.memberName}
												</p>
												<p className='text-xs text-slate-600 mt-1'>
													ब्याज: ₹{interest} | मूलधन: ₹{principal}
												</p>
											</div>
											<p className='font-bold text-slate-900'>₹{total}</p>
										</div>
									);
								})}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</main>

			<div className='fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-50'>
				<div className='max-w-3xl mx-auto'>
					{step === 'entry' ? (
						<motion.button
							whileTap={{ scale: 0.98 }}
							disabled={loading || grandTotal === 0 || hasAnyValidationError()}
							onClick={handleReview}
							className='w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-40'>
							समीक्षा करें
							<ArrowRight size={18} />
						</motion.button>
					) : (
						<div className='grid grid-cols-3 gap-3'>
							<motion.button
								whileTap={{ scale: 0.98 }}
								onClick={() => setStep('entry')}
								className='col-span-1 bg-white text-slate-900 border border-slate-200 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2'>
								<Edit2 size={16} /> बदलें
							</motion.button>
							<motion.button
								whileTap={{ scale: 0.98 }}
								disabled={saving}
								onClick={submitRepayments}
								className='col-span-2 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 disabled:opacity-50'>
								{saving ? (
									<Loader2 className='animate-spin' />
								) : (
									<>
										<CheckCircle2 size={18} /> भुगतान जमा करें
									</>
								)}
							</motion.button>
						</div>
					)}
				</div>
			</div>

			<AnimatePresence>
				{uiMessage ? (
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						className={`fixed bottom-24 inset-x-6 z-[60] p-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
							uiMessage.type === 'error'
								? 'bg-red-50/95 border-red-200 text-red-800'
								: 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
						}`}>
						{uiMessage.type === 'error' ? (
							<AlertCircle size={18} />
						) : (
							<CheckCircle2 size={18} />
						)}
						<p className='font-semibold text-sm'>{uiMessage.text}</p>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}


function InputBlock({ label, hint, iconClass, value, onChange, placeholder }) {
	return (
		<div className='space-y-1.5'>
			<label className='text-sm font-semibold text-slate-700'>{label}</label>
			<div className='relative'>
				<IndianRupee
					size={16}
					className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
				/>
				<input
					type='number'
					className='pl-10 w-full py-3.5 bg-white border border-slate-200 rounded-xl text-base font-semibold focus:ring-2 focus:ring-emerald-200 outline-none'
					value={value}
					placeholder={placeholder}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
			<p className='text-xs text-slate-500'>{hint}</p>
		</div>
	);
}

function FocusMetric({ label, value, tone = 'slate' }) {
	const tones = {
		slate: 'bg-slate-50 border-slate-200 text-slate-800',
		amber: 'bg-amber-50 border-amber-200 text-amber-800',
		emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
		rose: 'bg-rose-50 border-rose-200 text-rose-800',
	};
	return (
		<div
			className={`rounded-xl border px-3 py-2.5 ${tones[tone] || tones.slate}`}>
			<p className='text-xs font-semibold opacity-80'>{label}</p>
			<p className='text-xl font-bold leading-tight mt-1'>
				₹{Number(value || 0)}
			</p>
		</div>
	);
}

