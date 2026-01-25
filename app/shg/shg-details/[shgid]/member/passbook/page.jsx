'use client';

import { useEffect, useState } from 'react';
import {
	ArrowDownLeft,
	ArrowUpRight,
	IndianRupee,
	FileText,
	ChevronLeft,
	Download,
	ReceiptText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MemberPassbook({ params }) {
	const { shgId } = params;
	const router = useRouter();
	const [rows, setRows] = useState([]);
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				// Simulated fetching
				const data = {
					summary: { savings: 4500, loanOutstanding: 1200 },
					transactions: [
						{
							_id: '1',
							type: 'SAVINGS',
							date: '2026-01-20',
							amount: 200,
							toAccount: 'SHG_CASH',
						},
						{
							_id: '2',
							type: 'LOAN_REPAYMENT',
							date: '2026-01-15',
							amount: 500,
							toAccount: 'SHG_CASH',
						},
						{
							_id: '3',
							type: 'LOAN_DISBURSEMENT',
							date: '2026-01-05',
							amount: 1200,
							toAccount: 'MEMBER',
						},
					],
				};
				setRows(data.transactions);
				setSummary(data.summary);
			} finally {
				setLoading(false);
			}
		})();
	}, [shgId]);

	const getTxDetails = (type) => {
		switch (type) {
			case 'SAVINGS':
				return {
					label: 'मासिक बचत',
					color: 'text-emerald-600',
					bg: 'bg-emerald-50',
				};
			case 'LOAN_REPAYMENT':
				return { label: 'ऋण वापसी', color: 'text-blue-600', bg: 'bg-blue-50' };
			case 'LOAN_DISBURSEMENT':
				return { label: 'ऋण लिया', color: 'text-rose-600', bg: 'bg-rose-50' };
			default:
				return { label: type, color: 'text-slate-600', bg: 'bg-slate-50' };
		}
	};

	return (
		<div className='min-h-screen bg-[#F8FAFC] pb-24'>
			{/* Header / Nav */}
			<div className='px-6 pt-8 pb-4 flex items-center justify-between max-w-2xl mx-auto'>
				<button
					onClick={() => router.back()}
					className='p-2 bg-white rounded-xl shadow-sm border border-slate-100'>
					<ChevronLeft className='w-6 h-6 text-slate-600' />
				</button>
				<h1 className='text-lg font-bold text-slate-800'>डिजिटल पासबुक</h1>
				<div className='w-10' /> {/* Spacer */}
			</div>

			<main className='max-w-2xl mx-auto px-6'>
				{/* Summary Wallet Card */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className='relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-indigo-200/50 mb-8'>
					<div className='relative z-10'>
						<p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-4'>
							कुल बैलेंस
						</p>
						<div className='flex items-baseline gap-1'>
							<span className='text-4xl font-black'>
								₹{summary?.savings || 0}
							</span>
							<span className='text-emerald-400 text-xs font-bold flex items-center gap-0.5'>
								<ArrowUpRight className='w-3 h-3' /> 12%
							</span>
						</div>

						<div className='grid grid-cols-2 gap-4 mt-8'>
							<div className='bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/5'>
								<p className='text-[10px] text-slate-400 font-bold uppercase mb-1'>
									कुल बचत
								</p>
								<p className='text-lg font-bold'>₹{summary?.savings || 0}</p>
							</div>
							<div className='bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/5'>
								<p className='text-[10px] text-slate-400 font-bold uppercase mb-1'>
									बकाया ऋण
								</p>
								<p className='text-lg font-bold text-rose-300'>
									₹{summary?.loanOutstanding || 0}
								</p>
							</div>
						</div>
					</div>
					{/* Artistic Background */}
					<div className='absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl' />
				</motion.div>

				{/* Transactions Section */}
				<div className='flex items-center justify-between mb-4 px-2'>
					<h2 className='text-sm font-bold text-slate-500 uppercase tracking-wider'>
						लेन-देन का इतिहास
					</h2>
					<ReceiptText className='w-4 h-4 text-slate-400' />
				</div>

				<div className='space-y-4 relative'>
					{/* Timeline Line */}
					<div className='absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 hidden sm:block' />

					<AnimatePresence>
						{rows.map((tx, i) => {
							const details = getTxDetails(tx.type);
							const isCredit = tx.toAccount === 'SHG_CASH';

							return (
								<motion.div
									key={tx._id}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.05 }}
									className='relative flex items-center gap-4 bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-3xl transition-all group cursor-pointer'>
									{/* Icon Badge */}
									<div
										className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${details.bg} ${details.color} transition-transform group-hover:scale-110`}>
										{isCredit ? (
											<ArrowUpRight className='w-6 h-6' />
										) : (
											<ArrowDownLeft className='w-6 h-6' />
										)}
									</div>

									{/* Info */}
									<div className='flex-1'>
										<p className='font-bold text-slate-800 tracking-tight'>
											{details.label}
										</p>
										<p className='text-[11px] font-semibold text-slate-400'>
											{new Date(tx.date).toLocaleDateString('hi-IN', {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
											})}
										</p>
									</div>

									{/* Amount */}
									<div className='text-right'>
										<p
											className={`text-lg font-black tracking-tighter ${details.color}`}>
											{isCredit ? '+' : '-'} ₹{tx.amount}
										</p>
										<p className='text-[9px] font-bold text-slate-300 uppercase tracking-widest'>
											सफल
										</p>
									</div>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>

				{/* Empty State */}
				{!loading && rows.length === 0 && (
					<div className='text-center py-20'>
						<div className='w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<IndianRupee className='w-8 h-8 text-slate-200' />
						</div>
						<p className='text-slate-500 font-medium'>
							अभी तक कोई लेन-देन नहीं हुआ है
						</p>
					</div>
				)}
			</main>

			{/* Fixed Footer Actions */}
			<div className='fixed bottom-8 left-0 right-0 px-6 flex justify-center pointer-events-none'>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='pointer-events-auto bg-indigo-600 text-white flex items-center gap-3 px-8 py-4 rounded-2xl shadow-2xl shadow-indigo-200 font-bold'>
					<Download className='w-5 h-5' />
					स्टेटमेंट डाउनलोड करें
				</motion.button>
			</div>
		</div>
	);
}
