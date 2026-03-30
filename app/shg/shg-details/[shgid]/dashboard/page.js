'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	ChevronLeft,
	TrendingUp,
	TrendingDown,
	Landmark,
	PiggyBank,
	ReceiptText,
	ShieldAlert,
	Wallet,
	RefreshCw,
	LayoutDashboard,
} from 'lucide-react';

const formatMoney = (amount) =>
	new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0,
	}).format(Number(amount || 0));

function StatCard({ icon, label, value, tint, valueClass, delay = 0 }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay }}
			className={`rounded-2xl border p-5 ${tint}`}>
			<div className='flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-widest mb-3'>
				{icon}
				{label}
			</div>
			<p className={`text-3xl font-black ${valueClass}`}>
				{formatMoney(value)}
			</p>
		</motion.div>
	);
}

function CalcRow({ label, sign, amount, tone }) {
	const signClass = tone === 'plus' ? 'text-emerald-600' : 'text-rose-600';
	return (
		<div className='px-4 py-3 border-b border-slate-100 grid grid-cols-12 items-center'>
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

export default function ShgDashboardPage() {
	const { shgid } = useParams();
	const router = useRouter();

	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchSummary = async () => {
		setLoading(true);
		setError(null);
		try {
			const resp = await fetch('/api/shg?name=dashboard-summary', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ shgId: shgid }),
				cache: 'no-store',
			});
			if (!resp.ok) throw new Error('डेटा लोड करने में त्रुटि हुई।');
			const data = await resp.json();
			setSummary(data);
		} catch (e) {
			setError(e.message || 'अज्ञात त्रुटि');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (shgid) fetchSummary();
	}, [shgid]);

	const sheet = useMemo(() => {
		if (!summary) return null;
		const monthlySavings = Number(summary.totalMonthlySavings || 0);
		const lumpSum = Number(summary.totalLumpSum || 0);
		const interest = Number(summary.totalInterestCollected || 0);
		const penalty = Number(summary.totalPenalty || 0);
		const loanGiven = Number(summary.totalLoanGiven || 0);
		const expense = Number(summary.totalExpense || 0);
		const inflow = monthlySavings + lumpSum + interest + penalty;
		const outflow = loanGiven + expense;
		return {
			monthlySavings,
			lumpSum,
			interest,
			penalty,
			loanGiven,
			expense,
			inflow,
			outflow,
			availableCash: Number(summary.totalAvailableCash ?? (inflow - outflow)),
		};
	}, [summary]);

	return (
		<div className='min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-emerald-50 pb-24'>
			{/* Header */}
			<div className='sticky top-0 z-20 backdrop-blur-md bg-white/60 border-b border-white/30 px-6 pt-8 pb-4'>
				<div className='max-w-2xl mx-auto flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100'>
							<LayoutDashboard size={18} />
						</div>
						<div>
							<p className='text-[10px] font-black tracking-widest uppercase text-indigo-500'>
								समूह डैशबोर्ड
							</p>
							<h1 className='text-xl font-extrabold text-slate-900 leading-tight'>
								{summary?.shgName || 'SHG'}
							</h1>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<button
							onClick={fetchSummary}
							disabled={loading}
							className='p-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-all'>
							<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
						</button>
						<button
							onClick={() => router.back()}
							className='p-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-600 hover:bg-slate-50 transition-all'>
							<ChevronLeft size={18} />
						</button>
					</div>
				</div>
			</div>

			<main className='max-w-2xl mx-auto px-6 pt-6 space-y-6'>
				{loading ? (
					<div className='flex flex-col items-center justify-center py-24 gap-4'>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
							className='w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600'
						/>
						<p className='text-slate-500 font-semibold text-sm'>
							डेटा लोड हो रहा है...
						</p>
					</div>
				) : error ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='bg-red-50 border border-red-200 rounded-2xl p-6 text-center'>
						<p className='text-red-700 font-semibold'>{error}</p>
						<button
							onClick={fetchSummary}
							className='mt-3 text-sm text-red-600 underline'>
							पुनः प्रयास करें
						</button>
					</motion.div>
				) : (
					<>
						{/* Top KPI Cards */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<StatCard
								icon={<Wallet size={14} />}
								label='कुल बचत'
								value={sheet.monthlySavings}
								tint='bg-indigo-50 border-indigo-100'
								valueClass='text-indigo-700'
								delay={0.05}
							/>
							<StatCard
								icon={<PiggyBank size={14} />}
								label='शेयर राशि'
								value={sheet.lumpSum}
								tint='bg-violet-50 border-violet-100'
								valueClass='text-violet-700'
								delay={0.1}
							/>
							<StatCard
								icon={<TrendingUp size={14} />}
								label='ब्याज संग्रह'
								value={sheet.interest}
								tint='bg-emerald-50 border-emerald-100'
								valueClass='text-emerald-700'
								delay={0.15}
							/>
							<StatCard
								icon={<ShieldAlert size={14} />}
								label='दंड राशि'
								value={sheet.penalty}
								tint='bg-amber-50 border-amber-100'
								valueClass='text-amber-700'
								delay={0.2}
							/>
						</div>

						{/* Financial Balance Sheet */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.25 }}
							className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
							<div className='px-5 py-4 border-b border-slate-100 flex items-center justify-between'>
								<h2 className='text-base font-bold text-slate-800 flex items-center gap-2'>
									<ReceiptText size={16} className='text-indigo-500' />
									वित्तीय सारांश
								</h2>
								{summary?.lastUpdated && (
									<p className='text-[11px] text-slate-400'>
										{new Date(summary.lastUpdated).toLocaleDateString('hi-IN', {
											day: '2-digit',
											month: 'short',
											year: 'numeric',
										})}
									</p>
								)}
							</div>

							{/* Header row */}
							<div className='bg-slate-50 px-4 py-2 border-b border-slate-200 grid grid-cols-12 text-[10px] font-black text-slate-500 uppercase tracking-widest'>
								<p className='col-span-6'>मद</p>
								<p className='col-span-2 text-center'>चिन्ह</p>
								<p className='col-span-4 text-right'>राशि</p>
							</div>

							<CalcRow
								label='मासिक बचत'
								sign='+'
								amount={sheet.monthlySavings}
								tone='plus'
							/>
							<CalcRow
								label='शेयर राशि'
								sign='+'
								amount={sheet.lumpSum}
								tone='plus'
							/>
							<CalcRow
								label='ब्याज संग्रह'
								sign='+'
								amount={sheet.interest}
								tone='plus'
							/>
							<CalcRow
								label='पेनल्टी'
								sign='+'
								amount={sheet.penalty}
								tone='plus'
							/>

							<div className='bg-emerald-50/70 border-y border-emerald-100 px-4 py-3 grid grid-cols-12 text-sm font-bold'>
								<p className='col-span-8 text-emerald-800'>
									कुल जमा (Inflow)
								</p>
								<p className='col-span-4 text-right text-emerald-800'>
									{formatMoney(sheet.inflow)}
								</p>
							</div>

							<CalcRow
								label='बकाया ऋण'
								sign='-'
								amount={sheet.loanGiven}
								tone='minus'
							/>
							<CalcRow
								label='कुल खर्च'
								sign='-'
								amount={sheet.expense}
								tone='minus'
							/>

							<div className='bg-rose-50/70 border-y border-rose-100 px-4 py-3 grid grid-cols-12 text-sm font-bold'>
								<p className='col-span-8 text-rose-800'>
									कुल निकासी (Outflow)
								</p>
								<p className='col-span-4 text-right text-rose-800'>
									{formatMoney(sheet.outflow)}
								</p>
							</div>

							<div className='bg-gradient-to-r from-indigo-700 to-violet-700 px-4 py-4 grid grid-cols-12 text-sm font-bold'>
								<p className='col-span-8 text-white flex items-center gap-2'>
									<Landmark size={14} />
									उपलब्ध निधि
								</p>
								<p className='col-span-4 text-right text-emerald-300 text-lg font-black'>
									{formatMoney(sheet.availableCash)}
								</p>
							</div>
						</motion.div>
					</>
				)}
			</main>
		</div>
	);
}
