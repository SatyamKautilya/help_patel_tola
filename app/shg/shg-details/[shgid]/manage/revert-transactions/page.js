'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	AlertCircle,
	CheckCircle2,
	ChevronLeft,
	RotateCcw,
	Search,
} from 'lucide-react';

const TYPE_LABELS = {
	MONTHLY_DEPOSIT: 'मासिक बचत',
	LUMP_SUM_CONTRIBUTION: 'शेयर राशि जमा',
	LOAN_DISBURSEMENT: 'ऋण वितरण',
	LOAN_REPAYMENT: 'ऋण भुगतान',
	INTEREST_PAYMENT: 'ब्याज भुगतान',
	BANK_LOAN_RECEIVED: 'बैंक ऋण प्राप्त',
	BANK_LOAN_REPAYMENT: 'बैंक ऋण भुगतान',
	OPENING_BALANCE: 'ओपनिंग/समायोजन',
	PENALTY_CHARGE: 'पेनल्टी',
};

export default function RevertTransactionsPage({ params }) {
	const { shgid } = params;
	const router = useRouter();

	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState('');
	const [selectedTxn, setSelectedTxn] = useState(null);
	const [reason, setReason] = useState('');
	const [reverting, setReverting] = useState(false);
	const [message, setMessage] = useState(null);

	const loadTransactions = async () => {
		setLoading(true);
		setMessage(null);
		try {
			const resp = await fetch('/api/shg?name=list-revertable-transactions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ shgId: shgid, limit: 120 }),
			});
			const data = await resp.json();
			setTransactions(data.transactions || []);
		} catch (e) {
			setMessage({
				type: 'error',
				text: e.message || 'ट्रांजेक्शन लोड नहीं हुए।',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTransactions();
	}, [shgid]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return transactions;
		return transactions.filter((t) => {
			const typeText = (TYPE_LABELS[t.type] || t.type || '').toLowerCase();
			const memberText = (t.memberName || '').toLowerCase();
			const reasonText = String(
				t?.meta?.reason || t?.meta?.note || '',
			).toLowerCase();
			return (
				typeText.includes(q) ||
				memberText.includes(q) ||
				reasonText.includes(q) ||
				String(t.amount).includes(q)
			);
		});
	}, [transactions, query]);

	const onRevert = async () => {
		if (!selectedTxn?._id) return;

		setReverting(true);
		setMessage(null);
		try {
			const resp = await fetch('/api/shg?name=revert-transaction', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					shgId: shgid,
					transactionId: selectedTxn._id,
					reason: reason.trim(),
				}),
			});
			const data = await resp.json();
			if (!resp.ok) throw new Error(data?.error || 'Revert failed');

			setMessage({
				type: 'success',
				text: 'ट्रांजेक्शन सफलतापूर्वक रिवर्ट हो गया।',
			});
			setSelectedTxn(null);
			setReason('');
			await loadTransactions();
		} catch (e) {
			setMessage({
				type: 'error',
				text: e.message || 'रिवर्ट में त्रुटि हुई।',
			});
		} finally {
			setReverting(false);
		}
	};

	return (
		<div className='min-h-screen bg-[#fafafa] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-blue-100 p-6'>
			<div className='max-w-5xl mx-auto space-y-5'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-black text-slate-900'>
							ट्रांजेक्शन रिवर्ट
						</h1>
						<p className='text-sm text-slate-600 mt-1'>
							किसी गलत एंट्री को प्रकार के अनुसार सुरक्षित तरीके से वापस करें।
						</p>
					</div>
					<button
						onClick={() => router.back()}
						className='p-3 rounded-2xl border border-slate-200 bg-white shadow-sm'>
						<ChevronLeft className='w-5 h-5 text-slate-700' />
					</button>
				</div>

				<div className='bg-white/85 border border-slate-200 rounded-2xl p-4'>
					<div className='relative'>
						<Search className='w-4 h-4 absolute left-3 top-3 text-slate-400' />
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='प्रकार / सदस्य / राशि से खोजें...'
							className='w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
					<div className='bg-white/85 border border-slate-200 rounded-2xl p-4'>
						<h2 className='text-lg font-bold text-slate-900 mb-3'>
							रिवर्ट योग्य ट्रांजेक्शन ({filtered.length})
						</h2>
						{loading ? (
							<p className='text-sm text-slate-500'>लोड हो रहा है...</p>
						) : filtered.length === 0 ? (
							<p className='text-sm text-slate-600'>
								कोई ट्रांजेक्शन नहीं मिला।
							</p>
						) : (
							<div className='space-y-2 max-h-[68vh] overflow-y-auto pr-1'>
								{filtered.map((txn) => {
									const selected = String(selectedTxn?._id) === String(txn._id);
									return (
										<button
											key={txn._id}
											onClick={() => setSelectedTxn(txn)}
											className={`w-full text-left p-3 rounded-xl border transition ${
												selected
													? 'border-rose-400 bg-rose-50'
													: 'border-slate-200 bg-white hover:bg-slate-50'
											}`}>
											<p className='font-semibold text-slate-900'>
												{TYPE_LABELS[txn.type] || txn.type}
											</p>
											<p className='text-xs text-slate-500 mt-1'>
												₹{Number(txn.amount || 0).toLocaleString('hi-IN')} |{' '}
												{txn.memberName || 'सामान्य एंट्री'}
											</p>
											<p className='text-[11px] text-slate-500 mt-1'>
												{new Date(txn.date).toLocaleString('hi-IN')}
											</p>
										</button>
									);
								})}
							</div>
						)}
					</div>

					<div className='bg-white/85 border border-slate-200 rounded-2xl p-4 space-y-4'>
						<h2 className='text-lg font-bold text-slate-900'>रिवर्ट विवरण</h2>
						{selectedTxn ? (
							<>
								<div className='rounded-xl border border-slate-200 bg-slate-50 p-3'>
									<p className='text-sm font-semibold text-slate-900'>
										{TYPE_LABELS[selectedTxn.type] || selectedTxn.type}
									</p>
									<p className='text-xs text-slate-600 mt-1'>
										राशि: ₹
										{Number(selectedTxn.amount || 0).toLocaleString('hi-IN')}
									</p>
									<p className='text-xs text-slate-600 mt-1'>
										सदस्य: {selectedTxn.memberName || 'N/A'}
									</p>
								</div>

								<div className='space-y-1.5'>
									<label className='text-xs font-black tracking-wider uppercase text-slate-500'>
										रिवर्ट कारण (वैकल्पिक)
									</label>
									<textarea
										rows={3}
										value={reason}
										onChange={(e) => setReason(e.target.value)}
										placeholder='रिवर्ट का कारण लिखें...'
										className='w-full rounded-xl border border-slate-300 bg-white p-3 resize-none'
									/>
								</div>

								<button
									onClick={onRevert}
									disabled={reverting}
									className='w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold disabled:opacity-60'>
									<RotateCcw className='w-4 h-4' />
									{reverting
										? 'रिवर्ट हो रहा है...'
										: 'ट्रांजेक्शन रिवर्ट करें'}
								</button>
							</>
						) : (
							<p className='text-sm text-slate-600'>
								रिवर्ट करने के लिए बाईं ओर से ट्रांजेक्शन चुनें।
							</p>
						)}
					</div>
				</div>

				<AnimatePresence>
					{message ? (
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 6 }}
							className={`rounded-xl border p-3 text-sm flex items-start gap-2 ${
								message.type === 'success'
									? 'bg-emerald-50 border-emerald-300 text-emerald-900'
									: 'bg-red-50 border-red-300 text-red-900'
							}`}>
							{message.type === 'success' ? (
								<CheckCircle2 className='w-4 h-4 mt-0.5' />
							) : (
								<AlertCircle className='w-4 h-4 mt-0.5' />
							)}
							<span>{message.text}</span>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	);
}
