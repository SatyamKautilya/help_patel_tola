'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CalendarDays, ChevronLeft, IndianRupee, ReceiptText, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import HindiDatePicker from '@/components/HindiDatePicker';

export default function ExpenseEntryPage({ params }) {
	const { shgid } = params;
	const router = useRouter();

	const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
	const [amount, setAmount] = useState('');
	const [expenseDate, setExpenseDate] = useState(today);
	const [reason, setReason] = useState('');
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState(null);

	const resetForm = () => {
		setAmount('');
		setExpenseDate(today);
		setReason('');
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);

		const amt = Number(amount);
		if (!amt || amt <= 0) {
			setMessage({ type: 'error', text: 'कृपया सही खर्च राशि दर्ज करें।' });
			return;
		}

		if (!expenseDate) {
			setMessage({ type: 'error', text: 'कृपया खर्च की तारीख चुनें।' });
			return;
		}

		setSaving(true);
		try {
			const resp = await fetch('/api/shg?name=save-expense', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					shgId: shgid,
					amount: amt,
					expenseDate,
					reason: reason.trim(),
				}),
			});
			const data = await resp.json();
			if (!resp.ok) throw new Error(data?.error || 'Saving failed');

			setMessage({ type: 'success', text: 'खर्च सफलतापूर्वक दर्ज हो गया।' });
			resetForm();
		} catch (err) {
			setMessage({ type: 'error', text: err.message || 'खर्च दर्ज करने में त्रुटि हुई।' });
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className='min-h-screen bg-[#fafafa] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-rose-100 p-6'>
			<div className='max-w-2xl mx-auto'>
				<nav className='flex items-center justify-between mb-6'>
					<div>
						<h1 className='text-2xl font-black text-slate-900'>खर्च एंट्री</h1>
						<p className='text-sm text-slate-600 mt-1'>राशि, तारीख और कारण दर्ज करें।</p>
					</div>
					<button
						onClick={() => router.back()}
						className='p-3 rounded-2xl border border-white bg-white/80 shadow-sm'>
						<ChevronLeft className='w-5 h-5 text-slate-700' />
					</button>
				</nav>

				<form
					onSubmit={onSubmit}
					className='bg-white/80 border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5'>
					<div className='space-y-1.5'>
						<label className='text-xs font-black uppercase tracking-wider text-slate-500'>
							खर्च राशि
						</label>
						<div className='relative'>
							<IndianRupee className='w-4 h-4 absolute left-3 top-3.5 text-emerald-600' />
							<input
								type='number'
								min='0'
								step='0.01'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder='उदाहरण: 1200'
								className='w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 bg-white'
							/>
						</div>
					</div>

					<div className='space-y-1.5'>
						<label className='text-xs font-black uppercase tracking-wider text-slate-500'>
							खर्च की तारीख
						</label>
						<div className='relative'>
							<CalendarDays className='w-4 h-4 absolute left-3 top-3.5 text-indigo-600' />
							<div className='pl-9'>
								<HindiDatePicker
									value={expenseDate}
									onChange={setExpenseDate}
									id='expense-date'
									label='खर्च की तारीख चुनें'
								/>
							</div>
						</div>
					</div>

					<div className='space-y-1.5'>
						<label className='text-xs font-black uppercase tracking-wider text-slate-500'>
							कारण
						</label>
						<div className='relative'>
							<ReceiptText className='w-4 h-4 absolute left-3 top-3.5 text-slate-500' />
							<textarea
								rows={3}
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								placeholder='खर्च का कारण लिखें...'
								className='w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 bg-white resize-none'
							/>
						</div>
					</div>

					<button
						type='submit'
						disabled={saving}
						className='w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white py-3 rounded-xl font-semibold'>
						<Save className='w-4 h-4' />
						{saving ? 'सेव हो रहा है...' : 'खर्च सेव करें'}
					</button>
				</form>

				<AnimatePresence>
					{message ? (
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 8 }}
							className={`mt-4 p-3 rounded-xl border text-sm flex items-start gap-2 ${
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
