import { useState } from 'react';
import {
	CreditCard,
	User,
	ArrowRight,
	CheckCircle2,
	DollarSign,
} from 'lucide-react';

export default function ShgFinancialSetup({ shgId, onNext }) {
	const [isExisting, setIsExisting] = useState(false);
	const [loan, setLoan] = useState({ memberId: '', amount: '' });
	const [loansAdded, setLoansAdded] = useState([]);

	const addOpeningLoan = async () => {
		// Simulating API call for UI demonstration
		// await fetch('/api/shg?name=opening-balance', ...);

		if (loan.memberId && loan.amount) {
			setLoansAdded([...loansAdded, { ...loan }]);
			setLoan({ memberId: '', amount: '' });
		}
	};

	return (
		<div className='min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center'>
			<div className='w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden'>
				{/* Header */}
				<div className='bg-slate-800/50 p-6 border-b border-slate-700/50'>
					<div className='flex items-center gap-3'>
						<div className='bg-indigo-500/10 p-2 rounded-lg'>
							<DollarSign className='w-6 h-6 text-indigo-400' />
						</div>
						<div>
							<h2 className='text-xl font-bold text-white'>Financial Setup</h2>
							<p className='text-sm text-slate-400'>
								Configure initial balances and loans
							</p>
						</div>
					</div>
				</div>

				<div className='p-6 space-y-6'>
					{/* Toggle */}
					<label className='flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors'>
						<div className='relative'>
							<input
								type='checkbox'
								className='peer sr-only'
								checked={isExisting}
								onChange={() => setIsExisting(!isExisting)}
							/>
							<div className='w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-indigo-600 peer-focus:ring-4 peer-focus:ring-indigo-800 transition-all after:content-[""] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white'></div>
						</div>
						<span className='font-medium text-slate-200'>
							Is this an existing SHG?
						</span>
					</label>

					{/* Existing Loan Form */}
					<div
						className={`space-y-4 transition-all duration-300 ${isExisting ? 'opacity-100 max-h-[500px]' : 'opacity-40 max-h-0 overflow-hidden grayscale'}`}>
						<p className='text-sm font-semibold text-indigo-400 uppercase tracking-wider'>
							Add Opening Loans
						</p>

						<div className='bg-slate-800/50 p-4 rounded-xl space-y-3 border border-slate-700/50'>
							<div className='relative'>
								<User className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
								<input
									placeholder='Member ID'
									value={loan.memberId}
									className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
									onChange={(e) =>
										setLoan({ ...loan, memberId: e.target.value })
									}
								/>
							</div>
							<div className='relative'>
								<CreditCard className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
								<input
									placeholder='Pending Loan Amount (₹)'
									value={loan.amount}
									type='number'
									className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
									onChange={(e) => setLoan({ ...loan, amount: e.target.value })}
								/>
							</div>
							<button
								onClick={addOpeningLoan}
								disabled={!loan.memberId || !loan.amount}
								className='w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
								<CheckCircle2 className='w-4 h-4' /> Add Record
							</button>
						</div>

						{/* List of Added Loans (Visual Feedback) */}
						{loansAdded.length > 0 && (
							<div className='space-y-2'>
								<p className='text-xs text-slate-400'>Added Records:</p>
								{loansAdded.map((l, i) => (
									<div
										key={i}
										className='flex justify-between text-sm bg-slate-800/30 px-3 py-2 rounded border border-slate-700/30'>
										<span>Member: {l.memberId}</span>
										<span className='font-mono text-emerald-400'>
											₹{l.amount}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Footer/Action */}
				<div className='p-6 bg-slate-800/30 border-t border-slate-800'>
					<button
						onClick={onNext}
						className='w-full group bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2'>
						Continue Setup
						<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
					</button>
				</div>
			</div>
		</div>
	);
}
