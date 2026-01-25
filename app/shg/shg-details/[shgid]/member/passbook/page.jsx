'use client';

import { useEffect, useState } from 'react';
import {
	ArrowDownLeft,
	ArrowUpRight,
	IndianRupee,
	ChevronLeft,
	Download,
	ReceiptText,
	Wallet,
	LayoutDashboard,
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
					border: 'border-emerald-100',
				};
			case 'LOAN_REPAYMENT':
				return {
					label: 'ऋण वापसी',
					color: 'text-blue-600',
					bg: 'bg-blue-50',
					border: 'border-blue-100',
				};
			case 'LOAN_DISBURSEMENT':
				return {
					label: 'ऋण लिया',
					color: 'text-rose-600',
					bg: 'bg-rose-50',
					border: 'border-rose-100',
				};
			default:
				return {
					label: type,
					color: 'text-slate-600',
					bg: 'bg-slate-50',
					border: 'border-slate-100',
				};
		}
	};

	return (
		<div className='h-screen overflow-hidden bg-[#fafafa] relative flex flex-col'>
			{/* Mesh Background Decorations */}
			<div className='absolute top-[-5%] left-[-10%] w-[60%] h-[30%] bg-emerald-100/50 rounded-full blur-[100px]' />
			<div className='absolute bottom-[-5%] right-[-10%] w-[60%] h-[30%] bg-indigo-100/50 rounded-full blur-[100px]' />

			{/* Header / Nav */}
			<nav className='relative z-10 px-6 pt-6 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100'>
						<Wallet className='w-6 h-6 text-white' />
					</div>
					<div>
						<h1 className='text-xl font-black text-slate-800 tracking-tighter leading-none'>
							Tamohar
						</h1>
						<span className='text-[10px] font-bold text-emerald-500 uppercase tracking-widest'>
							Digital Passbook
						</span>
					</div>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={() => router.back()}
					className='p-2 bg-white/80 backdrop-blur-md rounded-xl border border-white shadow-sm'>
					<ChevronLeft className='w-6 h-6 text-slate-600' />
				</motion.button>
			</nav>

			<main className='relative z-10 flex-1 flex flex-col px-6 py-4 overflow-hidden'>
				{/* Balance Card - Glassmorphism */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					className='relative mb-8'>
					<div className='absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]' />
					<div className='relative p-7'>
						<div className='flex justify-between items-start mb-6'>
							<div>
								<p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>
									कुल बैलेंस
								</p>
								<h2 className='text-4xl font-black text-slate-800 tracking-tighter'>
									₹{summary?.savings || 0}
								</h2>
							</div>
							<div className='w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center'>
								<ArrowUpRight className='w-6 h-6 text-emerald-500' />
							</div>
						</div>

						<div className='grid grid-cols-2 gap-3'>
							<div className='bg-emerald-500/5 border border-emerald-100 p-3 rounded-2xl text-center'>
								<p className='text-[8px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5'>
									कुल बचत
								</p>
								<p className='text-sm font-black text-emerald-700'>
									₹{summary?.savings || 0}
								</p>
							</div>
							<div className='bg-rose-500/5 border border-rose-100 p-3 rounded-2xl text-center'>
								<p className='text-[8px] font-bold text-rose-600 uppercase tracking-wider mb-0.5'>
									बकाया ऋण
								</p>
								<p className='text-sm font-black text-rose-700'>
									₹{summary?.loanOutstanding || 0}
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* History Header */}
				<div className='flex items-center justify-between mb-4 px-2'>
					<h2 className='text-[11px] font-black text-slate-400 uppercase tracking-widest'>
						लेन-देन का इतिहास
					</h2>
					<ReceiptText className='w-4 h-4 text-slate-300' />
				</div>

				{/* Transaction List - Scrollable within flexbox */}
				<div className='flex-1 overflow-y-auto space-y-3 pb-24 pr-1 scrollbar-hide'>
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
									className={`relative flex items-center gap-4 bg-white/70 backdrop-blur-sm border-2 ${details.border} p-4 rounded-3xl group`}>
									<div
										className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${details.bg} ${details.color}`}>
										{isCredit ? (
											<ArrowUpRight className='w-5 h-5' />
										) : (
											<ArrowDownLeft className='w-5 h-5' />
										)}
									</div>

									<div className='flex-1'>
										<p className='text-sm font-bold text-slate-800 leading-tight'>
											{details.label}
										</p>
										<p className='text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter'>
											{new Date(tx.date).toLocaleDateString('hi-IN', {
												day: 'numeric',
												month: 'short',
											})}
										</p>
									</div>

									<div className='text-right'>
										<p
											className={`text-base font-black tracking-tighter ${details.color}`}>
											{isCredit ? '+' : '-'} ₹{tx.amount}
										</p>
										<div className='flex items-center justify-end gap-1'>
											<div className='w-1 h-1 bg-emerald-400 rounded-full' />
											<p className='text-[8px] font-black text-slate-300 uppercase'>
												Success
											</p>
										</div>
									</div>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
			</main>

			{/* Floating Action Button */}
			<div className='absolute bottom-8 left-0 right-0 px-6 flex justify-center'>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='w-full max-w-xs bg-slate-900 text-white flex items-center justify-center gap-3 py-4 rounded-[2rem] shadow-xl shadow-slate-200 font-bold text-sm tracking-tight'>
					<Download className='w-5 h-5 text-emerald-400' />
					पासबुक डाउनलोड करें
				</motion.button>
			</div>
		</div>
	);
}
