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
	Users,
	ListChecks,
	AlertTriangle,
	X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoanRepaymentPage({ params }) {
	const { shgid } = params;
	const router = useRouter();

	const [stage, setStage] = useState('members'); // members | payment
	const [loans, setLoans] = useState([]);
	const [selectedMemberId, setSelectedMemberId] = useState(null);
	const [selectedLoanId, setSelectedLoanId] = useState(null);
	const [payment, setPayment] = useState({ principal: '', interest: '' });
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [uiMessage, setUiMessage] = useState(null);

	// Interest mismatch confirmation popup state
	const [mismatchPopup, setMismatchPopup] = useState(null);

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
		} catch {
			setUiMessage({ type: 'error', text: 'ऋण सूची लोड नहीं हो पाई' });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadLoans();
	}, [shgid]);

	const memberGroups = useMemo(() => {
		const map = new Map();
		for (const loan of loans) {
			const key = String(loan.memberId);
			if (!map.has(key)) {
				map.set(key, {
					memberId: key,
					memberName: loan.memberName || 'सदस्य',
					loans: [],
					totalOutstanding: 0,
				});
			}
			const item = map.get(key);
			item.loans.push(loan);
			item.totalOutstanding += Number(loan.outstandingPrincipal || 0);
		}
		return Array.from(map.values());
	}, [loans]);

	const selectedMember = useMemo(() => {
		return memberGroups.find((m) => m.memberId === String(selectedMemberId)) || null;
	}, [memberGroups, selectedMemberId]);

	const selectedLoan = useMemo(() => {
		if (!selectedMember || !selectedLoanId) return null;
		return selectedMember.loans.find((l) => l._id === selectedLoanId) || null;
	}, [selectedMember, selectedLoanId]);

	const principalPaid = Number(payment.principal || 0);
	const interestPaid = Number(payment.interest || 0);
	const totalPayment = principalPaid + interestPaid;
	const remainingAfterPrincipal = Math.max(
		Number(selectedLoan?.outstandingPrincipal || 0) - principalPaid,
		0,
	);

	const validationError = useMemo(() => {
		if (!selectedLoan) return 'ऋण चुनें';
		if (principalPaid < 0 || interestPaid < 0) return 'नकारात्मक राशि मान्य नहीं है';
		if (principalPaid > Number(selectedLoan.outstandingPrincipal || 0)) {
			return 'मूलधन बकाया से अधिक नहीं हो सकता';
		}
		if (totalPayment <= 0) return 'भुगतान राशि दर्ज करें';
		return null;
	}, [selectedLoan, principalPaid, interestPaid, totalPayment]);

	const openMemberPayment = (memberId) => {
		const member = memberGroups.find((m) => m.memberId === String(memberId));
		if (!member) return;
		setSelectedMemberId(member.memberId);
		setSelectedLoanId(member.loans[0]?._id || null);
		setPayment({ principal: '', interest: member.loans[0]?.monthlyInterest || '' });
		setStage('payment');
	};

	const onLoanChange = (loanId) => {
		setSelectedLoanId(loanId);
		const nextLoan = selectedMember?.loans?.find((l) => l._id === loanId);
		setPayment({ principal: '', interest: nextLoan?.monthlyInterest || '' });
	};

	const doSubmit = async (forceOverride = false) => {
		if (validationError || !selectedLoan) {
			setUiMessage({ type: 'error', text: validationError || 'कृपया सही जानकारी भरें' });
			return;
		}

		try {
			setSaving(true);
			const resp = await fetch('/api/shg?name=collect-repayment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					shgId: shgid,
					loanId: selectedLoan._id,
					memberId: selectedLoan.memberId,
					principal: principalPaid,
					interest: interestPaid,
					amount: totalPayment,
					forceOverride,
				}),
			});
			const data = await resp.json();

			// Handle interest mismatch popup
			if (data.interestMismatch) {
				setMismatchPopup(data);
				return;
			}

			if (!resp.ok) throw new Error(data?.error || 'भुगतान सहेजने में त्रुटि');

			setUiMessage({ type: 'success', text: 'भुगतान सफलतापूर्वक सहेजा गया' });
			setStage('members');
			setSelectedMemberId(null);
			setSelectedLoanId(null);
			setPayment({ principal: '', interest: '' });
			await loadLoans();
		} catch (e) {
			setUiMessage({ type: 'error', text: e.message || 'भुगतान सहेजते समय त्रुटि हुई' });
		} finally {
			setSaving(false);
		}
	};

	const submitPayment = () => doSubmit(false);

	const confirmMismatch = async () => {
		setMismatchPopup(null);
		await doSubmit(true);
	};

	const cancelMismatch = () => {
		setMismatchPopup(null);
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
						<h1 className='text-xl font-black text-slate-800 tracking-tight'>ऋण वसूली</h1>
						<span className='text-[11px] font-bold text-emerald-700 tracking-wide'>
							{stage === 'members' ? 'पहले सदस्य चुनें' : 'एक समय में एक ऋण भुगतान'}
						</span>
					</div>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={() => (stage === 'payment' ? setStage('members') : router.back())}
					className='p-3 bg-white rounded-2xl border shadow-sm'>
					<ChevronLeft className='w-5 h-5 text-slate-600' />
				</motion.button>
			</nav>

			<main className='relative z-10 flex-1 px-6 pt-6 pb-36'>
				<AnimatePresence mode='wait'>
					{stage === 'members' ? (
						<motion.div
							key='members'
							initial={{ opacity: 0, x: -12 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -12 }}
							className='space-y-4'>
							<div className='rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between'>
								<div className='flex items-center gap-2 text-slate-700 font-semibold'>
									<Users className='w-4 h-4' />
									<span>सक्रिय ऋण वाले सदस्य: {memberGroups.length}</span>
								</div>
								<div className='text-sm font-bold text-emerald-700'>
									कुल बकाया: ₹
									{memberGroups.reduce((sum, m) => sum + Number(m.totalOutstanding || 0), 0)}
								</div>
							</div>

							{loading ? (
								<div className='flex justify-center py-20'>
									<Loader2 className='animate-spin text-emerald-500' />
								</div>
							) : memberGroups.length === 0 ? (
								<div className='rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 font-medium'>
									अभी कोई सक्रिय ऋण नहीं है।
								</div>
							) : (
								<div className='space-y-3'>
									{memberGroups.map((member) => (
										<button
											key={member.memberId}
											onClick={() => openMemberPayment(member.memberId)}
											className='w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-emerald-300 transition-colors'>
												<div className='flex items-center justify-between gap-3'>
													<div>
														<p className='text-base font-bold text-slate-800'>{member.memberName}</p>
														<p className='text-xs text-slate-500 mt-1'>
															सक्रिय ऋण: {member.loans.length}
														</p>
													</div>
													<div className='flex items-center gap-2'>
														<p className='text-sm font-bold text-emerald-700'>
															₹{member.totalOutstanding}
														</p>
														<ArrowRight className='w-4 h-4 text-slate-500' />
													</div>
												</div>
										</button>
									))}
								</div>
							)}
						</motion.div>
					) : (
						<motion.div
							key='payment'
							initial={{ opacity: 0, x: 12 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 12 }}
							className='space-y-4'>
							<div className='rounded-2xl border border-slate-200 bg-white p-4'>
								<p className='text-xs uppercase tracking-wide font-semibold text-slate-500'>चयनित सदस्य</p>
								<p className='text-xl font-black text-slate-800 mt-1'>
									{selectedMember?.memberName || '-'}
								</p>
							</div>

							{selectedMember?.loans?.length > 1 ? (
								<div className='rounded-2xl border border-slate-200 bg-white p-4'>
									<p className='text-sm font-semibold text-slate-700 mb-2'>ऋण खाता चुनें</p>
									<div className='space-y-2'>
										{selectedMember.loans.map((loan) => (
											<button
												key={loan._id}
												onClick={() => onLoanChange(loan._id)}
												className={`w-full rounded-xl border px-3 py-2 text-left ${
													selectedLoanId === loan._id
														? 'border-emerald-300 bg-emerald-50'
														: 'border-slate-200 bg-white'
												}`}>
												<p className='text-sm font-semibold text-slate-800'>
													ऋण ID: {String(loan._id).slice(-6)}
												</p>
												<p className='text-xs text-slate-600 mt-1'>
													बकाया: ₹{loan.outstandingPrincipal} | अपेक्षित ब्याज: ₹{loan.monthlyInterest}
												</p>
											</button>
										))}
									</div>
								</div>
							) : null}

							{selectedLoan ? (
								<>
									<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
										<FocusMetric label='शेष ऋण राशि' value={selectedLoan.outstandingPrincipal} tone='slate' />
										<FocusMetric label='अपेक्षित ब्याज' value={selectedLoan.monthlyInterest} tone='amber' />
										<FocusMetric label='मूलधन जमा के बाद शेष' value={remainingAfterPrincipal} tone={remainingAfterPrincipal <= 0 ? 'emerald' : 'rose'} />
									</div>

									<div className='rounded-2xl border border-slate-200 bg-white p-4 space-y-4'>
										<InputBlock
											label='मूलधन जमा'
											hint='आज जितना मूलधन लिया जा रहा है'
											iconClass='text-emerald-600'
											value={payment.principal}
											onChange={(value) => setPayment((p) => ({ ...p, principal: value }))}
											placeholder='0'
										/>
										<InputBlock
											label='ब्याज जमा'
											hint={`अपेक्षित: ₹${selectedLoan.monthlyInterest} (प्रतिबंध नहीं)`}
											iconClass='text-amber-600'
											value={payment.interest}
											onChange={(value) => setPayment((p) => ({ ...p, interest: value }))}
											placeholder='0'
										/>
										<div className='rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 flex items-center justify-between'>
											<p className='text-sm font-semibold text-emerald-700'>कुल भुगतान</p>
											<p className='text-lg font-bold text-emerald-800'>₹{totalPayment}</p>
										</div>
										{validationError ? (
											<div className='rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 flex items-center gap-2'>
												<AlertCircle size={14} />
												{validationError}
											</div>
										) : null}
									</div>
								</>
							) : null}
						</motion.div>
					)}
				</AnimatePresence>
			</main>

			{stage === 'payment' ? (
				<div className='fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-50'>
					<div className='max-w-3xl mx-auto grid grid-cols-3 gap-3'>
						<button
							onClick={() => setStage('members')}
							className='col-span-1 bg-white text-slate-900 border border-slate-200 py-4 rounded-2xl font-semibold text-sm inline-flex items-center justify-center gap-2'>
							<ListChecks size={16} /> सूची
						</button>
						<motion.button
							whileTap={{ scale: 0.98 }}
							disabled={saving || Boolean(validationError)}
							onClick={submitPayment}
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
				</div>
			) : null}

			{/* ==================== Interest Mismatch Confirmation Popup ==================== */}
			<AnimatePresence>
				{mismatchPopup ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm'>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', stiffness: 300, damping: 25 }}
							className='bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden'>

							{/* Popup header */}
							<div className='bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 flex items-center gap-3'>
								<div className='w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center'>
									<AlertTriangle className='w-5 h-5 text-white' />
								</div>
								<div>
									<p className='text-base font-black text-white'>ब्याज मेल नहीं खाता</p>
									<p className='text-[11px] font-semibold text-white/80'>कृपया पुष्टि करें</p>
								</div>
								<button
									onClick={cancelMismatch}
									className='ml-auto p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors'>
									<X className='w-4 h-4 text-white' />
								</button>
							</div>

							{/* Popup body */}
							<div className='px-5 py-5 space-y-4'>
								{/* Mismatch details */}
								<div className='grid grid-cols-2 gap-3'>
									<div className='rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-center'>
										<p className='text-[10px] font-semibold text-amber-600 uppercase tracking-wide'>अपेक्षित ब्याज</p>
										<p className='text-lg font-black text-amber-800 mt-0.5'>₹{mismatchPopup.expectedInterest}</p>
									</div>
									<div className='rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-center'>
										<p className='text-[10px] font-semibold text-blue-600 uppercase tracking-wide'>दर्ज ब्याज</p>
										<p className='text-lg font-black text-blue-800 mt-0.5'>₹{mismatchPopup.enteredInterest}</p>
									</div>
								</div>

								<p className='text-sm text-slate-600 font-medium leading-relaxed'>
									{mismatchPopup.message}
								</p>

								{/* Warning note */}
								<div className='rounded-xl border border-amber-200 bg-amber-50/50 px-3 py-2 flex items-start gap-2'>
									<AlertTriangle size={14} className='text-amber-500 mt-0.5 shrink-0' />
									<p className='text-xs text-amber-700 font-medium'>
										यदि ब्याज अलग है तो कृपया सुनिश्चित करें कि यह सही है। एक बार जमा होने पर इसे रिवर्ट करना होगा।
									</p>
								</div>
							</div>

							{/* Popup actions */}
							<div className='px-5 pb-5 grid grid-cols-2 gap-3'>
								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={cancelMismatch}
									className='py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors'>
									रद्द करें
								</motion.button>
								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={confirmMismatch}
									disabled={saving}
									className='py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-200 disabled:opacity-50 flex items-center justify-center gap-2'>
									{saving ? (
										<Loader2 size={16} className='animate-spin' />
									) : (
										<>
											<CheckCircle2 size={16} /> जारी रखें
										</>
									)}
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>

			{/* ==================== Toast Messages ==================== */}
			<AnimatePresence>
				{uiMessage ? (
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						onAnimationComplete={() => {
							if (uiMessage) {
								setTimeout(() => setUiMessage(null), 3000);
							}
						}}
						className={`fixed bottom-24 inset-x-6 z-[60] p-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
							uiMessage.type === 'error'
								? 'bg-red-50/95 border-red-200 text-red-800'
								: 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
						}`}>
						{uiMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
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
		<div className={`rounded-xl border px-3 py-2.5 ${tones[tone] || tones.slate}`}>
			<p className='text-xs font-semibold opacity-80'>{label}</p>
			<p className='text-xl font-bold leading-tight mt-1'>₹{Number(value || 0)}</p>
		</div>
	);
}
