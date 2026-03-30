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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const defaultSummary = {
			totalSavings: 0,
			totalMonthlySavingsPaid: 0,
			lumpSumShare: 0,
			totalLoansDisbursed: 0,
			totalLoanRepayments: 0,
		};

		const fetchPassbook = async () => {
			try {
				setLoading(true);
				const passbookResp = await fetch('/api/shg?name=member-passbook', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ shgid, memberId }),
				});
				if (passbookResp.ok) {
					const passbookData = await passbookResp.json();
					setSummary(passbookData.summary || defaultSummary);
				} else {
					setSummary(defaultSummary);
				}
			} catch (err) {
				console.error(err);
				setSummary(defaultSummary);
			} finally {
				setLoading(false);
			}
		};

		fetchPassbook();
	}, [shgid, memberId]);

	const remainingLoan = useMemo(() => {
		if (summary?.outstandingLoan != null) {
			return Number(summary.outstandingLoan);
		}
		const issued = Number(summary?.totalLoansDisbursed || 0);
		const paid = Number(summary?.totalLoanRepayments || 0);
		return Math.max(issued - paid, 0);
	}, [summary]);

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
									label='शेयर राशि हिस्सा'
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
