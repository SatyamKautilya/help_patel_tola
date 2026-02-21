'use client';

import { useEffect, useMemo, useState } from 'react';
import {
	ChevronLeft,
	Wallet,
	TrendingDown,
	Landmark,
	ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MemberPassbookSummary({ params }) {
	const { shgid, memberId } = params;
	const router = useRouter();

	const [summary, setSummary] = useState(null);
	const [shgSummary, setShgSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [shgSummaryLoading, setShgSummaryLoading] = useState(true);

	useEffect(() => {
		const defaultSummary = {
			totalSavings: 0,
			totalMonthlySavingsPaid: 0,
			lumpSumShare: 0,
			totalLoansDisbursed: 0,
			totalLoanRepayments: 0,
		};

		const defaultShgSummary = {
			totalMonthlySavings: 0,
			totalLumpSum: 0,
			totalPrincipalRepaid: 0,
			totalInterestCollected: 0,
			totalPenalty: 0,
			totalLoanGiven: 0,
			totalExpense: 0,
			totalAvailableCash: 0,
			lastUpdated: null,
		};

		const fetchPassbookAndShgSummary = async () => {
			try {
				setLoading(true);
				setShgSummaryLoading(true);

				const [passbookResp, shgSummaryResp] = await Promise.all([
					fetch('/api/shg?name=member-passbook', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ shgid, memberId }),
					}),
					fetch('/api/shg?name=dashboard-summary', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ shgId: shgid }),
						cache: 'no-store',
					}),
				]);

				if (passbookResp.ok) {
					const passbookData = await passbookResp.json();
					setSummary(passbookData.summary || defaultSummary);
				} else {
					setSummary(defaultSummary);
				}

				if (shgSummaryResp.ok) {
					const shgSummaryData = await shgSummaryResp.json();
					setShgSummary(shgSummaryData || defaultShgSummary);
				} else {
					setShgSummary(defaultShgSummary);
				}
			} catch (err) {
				console.error(err);
				setSummary(defaultSummary);
				setShgSummary(defaultShgSummary);
			} finally {
				setLoading(false);
				setShgSummaryLoading(false);
			}
		};

		fetchPassbookAndShgSummary();
	}, [shgid, memberId]);

	const remainingLoan = useMemo(() => {
		const issued = Number(summary?.totalLoansDisbursed || 0);
		const paid = Number(summary?.totalLoanRepayments || 0);
		return Math.max(issued - paid, 0);
	}, [summary]);
	const shgSheet = useMemo(() => {
		const monthlySavings = Number(shgSummary?.totalMonthlySavings || 0);
		const lumpSum = Number(shgSummary?.totalLumpSum || 0);
		const principalRepaid = Number(shgSummary?.totalPrincipalRepaid || 0);
		const interest = Number(shgSummary?.totalInterestCollected || 0);
		const penalty = Number(shgSummary?.totalPenalty || 0);
		const loanGiven = Number(shgSummary?.totalLoanGiven || 0);
		const expense = Number(shgSummary?.totalExpense || 0);
		const inflow = monthlySavings + lumpSum + interest + penalty;
		const outflow = loanGiven + expense;
		return {
			monthlySavings,
			lumpSum,
			principalRepaid,
			interest,
			penalty,
			loanGiven,
			expense,
			inflow,
			outflow,
			calculatedFund: inflow - outflow,
		};
	}, [shgSummary]);

	const formatMoney = (amount) =>
		new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			maximumFractionDigits: 0,
		}).format(Number(amount || 0));

	return (
		<div className='min-h-screen bg-slate-50 px-4 md:px-8 py-6'>
			<div className='max-w-3xl mx-auto space-y-6'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center'>
							<Wallet size={18} />
						</div>
						<div>
							<h1 className='text-xl font-bold text-slate-800'>
								सदस्य पासबुक सारांश
							</h1>
							<p className='text-xs text-slate-500'>
								सदस्य स्तर की वित्तीय जानकारी
							</p>
						</div>
					</div>
					<button
						onClick={() => router.back()}
						className='p-2 rounded-lg border border-slate-200 bg-white text-slate-700'>
						<ChevronLeft size={18} />
					</button>
				</div>

				{loading ? (
					<div className='bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-500'>
						डेटा लोड हो रहा है...
					</div>
				) : (
					<>
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							className='bg-white border border-slate-200 rounded-2xl p-5 md:p-6'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<StatCard
									icon={<Wallet size={16} />}
									label='कुल बचत'
									value={summary?.totalSavings || 0}
									valueClass='text-indigo-700'
									tint='bg-indigo-50 border-indigo-100'
								/>
								<StatCard
									icon={<Landmark size={16} />}
									label='कुल ऋण'
									value={summary?.totalLoansDisbursed || 0}
									valueClass='text-emerald-700'
									tint='bg-emerald-50 border-emerald-100'
								/>
								<StatCard
									icon={<TrendingDown size={16} />}
									label='शेष ऋण'
									value={remainingLoan}
									valueClass='text-rose-700'
									tint='bg-rose-50 border-rose-100'
								/>
							</div>

							<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3'>
								<SummaryRow
									label='मासिक बचत (अब तक)'
									value={formatMoney(summary?.totalMonthlySavingsPaid)}
								/>
								<SummaryRow
									label='लंपसम हिस्सा'
									value={formatMoney(summary?.lumpSumShare)}
								/>
							</div>

							<div className='mt-6 flex justify-end'>
								<button
									onClick={() =>
										router.push(
											`/shg/shg-details/${shgid}/member/${memberId}/passbook/transactions`,
										)
									}
									className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold'>
									पिछले 6 महीने के लेन-देन देखें
									<ArrowRight size={16} />
								</button>
							</div>
						</motion.div>

						<motion.section
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.05 }}
							className='bg-white border border-slate-200 rounded-2xl p-5 md:p-6'>
							<div className='flex items-center justify-between mb-4'>
								<h2 className='text-base font-bold text-slate-800'>
									सारांश स्व सहायता समूह
								</h2>
								{shgSummary?.lastUpdated ? (
									<p className='text-[11px] text-slate-500'>
										अपडेट:{' '}
										{new Date(shgSummary.lastUpdated).toLocaleDateString(
											'hi-IN',
											{
												day: '2-digit',
												month: 'short',
												year: 'numeric',
											},
										)}
									</p>
								) : null}
							</div>

							{shgSummaryLoading ? (
								<p className='text-sm text-slate-500'>
									SHG सारांश लोड हो रहा है...
								</p>
							) : (
								<div className='rounded-xl border border-slate-200 overflow-hidden'>
									<div className='bg-slate-100 px-3 py-2 border-b border-slate-200 grid grid-cols-12 text-[11px] font-bold text-slate-600 uppercase tracking-wide'>
										<p className='col-span-6'>मद</p>
										<p className='col-span-2 text-center'>चिन्ह</p>
										<p className='col-span-4 text-right'>राशि</p>
									</div>

									<CalcRow
										label='मासिक बचत'
										sign='+'
										amount={shgSheet.monthlySavings}
										tone='plus'
										formatMoney={formatMoney}
									/>
									<CalcRow
										label='लंप सम राशि'
										sign='+'
										amount={shgSheet.lumpSum}
										tone='plus'
										formatMoney={formatMoney}
									/>
									<CalcRow
										label='ब्याज संग्रह'
										sign='+'
										amount={shgSheet.interest}
										tone='plus'
										formatMoney={formatMoney}
									/>
									<CalcRow
										label='पेनल्टी'
										sign='+'
										amount={shgSheet.penalty}
										tone='plus'
										formatMoney={formatMoney}
									/>

									<div className='bg-emerald-50/60 border-y border-emerald-100 px-3 py-2 grid grid-cols-12 text-sm font-semibold'>
										<p className='col-span-8 text-emerald-800'>
											कुल जमा (Inflow)
										</p>
										<p className='col-span-4 text-right text-emerald-800'>
											{formatMoney(shgSheet.inflow)}
										</p>
									</div>

									<CalcRow
										label='Outstanding Loan'
										sign='-'
										amount={shgSheet.loanGiven}
										tone='minus'
										formatMoney={formatMoney}
									/>
									<CalcRow
										label='कुल खर्च'
										sign='-'
										amount={shgSheet.expense}
										tone='minus'
										formatMoney={formatMoney}
									/>

									<div className='bg-rose-50/60 border-y border-rose-100 px-3 py-2 grid grid-cols-12 text-sm font-semibold'>
										<p className='col-span-8 text-rose-800'>
											कुल निकासी (Outflow)
										</p>
										<p className='col-span-4 text-right text-rose-800'>
											{formatMoney(shgSheet.outflow)}
										</p>
									</div>

									<div className='bg-slate-900 px-3 py-3 grid grid-cols-12 text-sm font-bold'>
										<p className='col-span-8 text-white'>
											उपलब्ध निधि (Available Fund)
										</p>
										<p className='col-span-4 text-right text-emerald-300'>
											{formatMoney(
												shgSummary?.totalAvailableCash ??
													shgSheet.calculatedFund,
											)}
										</p>
									</div>
								</div>
							)}
						</motion.section>
					</>
				)}
			</div>
		</div>
	);
}

function SummaryRow({ label, value }) {
	return (
		<div className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center justify-between gap-3'>
			<p className='text-xs font-semibold text-slate-600'>{label}</p>
			<p className='text-sm font-bold text-slate-900'>{value}</p>
		</div>
	);
}

function CalcRow({ label, sign, amount, tone, formatMoney }) {
	const signClass = tone === 'plus' ? 'text-emerald-600' : 'text-rose-600';
	return (
		<div className='px-3 py-2.5 border-b border-slate-100 grid grid-cols-12 items-center'>
			<p className='col-span-6 text-sm font-medium text-slate-700'>{label}</p>
			<p className={`col-span-2 text-center text-base font-bold ${signClass}`}>
				{sign}
			</p>
			<p className='col-span-4 text-right text-sm font-semibold text-slate-800'>
				{formatMoney(amount)}
			</p>
		</div>
	);
}

function StatCard({ icon, label, value, tint, valueClass }) {
	return (
		<div className={`rounded-xl border p-4 ${tint}`}>
			<div className='flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wide'>
				{icon}
				{label}
			</div>
			<p className={`mt-2 text-2xl font-black ${valueClass}`}>
				₹{Number(value || 0)}
			</p>
		</div>
	);
}
