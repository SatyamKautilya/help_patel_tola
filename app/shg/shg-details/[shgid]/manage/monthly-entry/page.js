'use client';

import { useEffect, useState } from 'react';
import {
	IndianRupee,
	Calendar,
	CheckCircle2,
	ChevronLeft,
	Save,
	AlertCircle,
	Wallet,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MonthlySavingsEntry({ params }) {
	const { shgId } = params;
	const router = useRouter();

	const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
	const [members, setMembers] = useState([]);
	const [entries, setEntries] = useState({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		(async () => {
			// Simulated Data
			const data = [
				{ memberId: '1', name: 'राम कुमार', paid: 300, due: 200 },
				{ memberId: '2', name: 'श्याम सिंह', paid: 500, due: 0 },
				{ memberId: '3', name: 'सीता देवी', paid: 0, due: 500 },
			];
			setMembers(data);
		})();
	}, [shgId, month]);

	const handleChange = (memberId, value) => {
		setEntries((prev) => ({
			...prev,
			[memberId]: value === '' ? '' : Number(value),
		}));
	};

	const save = async () => {
		if (Object.keys(entries).length === 0) return;
		setSaving(true);
		try {
			// ... Logic ...
			alert('मासिक बचत सफलतापूर्वक दर्ज की गई');
			setEntries({});
		} catch {
			alert('कुछ त्रुटि हुई');
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className='h-screen flex flex-col bg-[#FAFAFA] relative overflow-hidden'>
			{/* Mesh Background */}
			<div className='absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-indigo-100/40 rounded-full blur-[80px]' />
			<div className='absolute bottom-[-10%] right-[-10%] w-[50%] h-[30%] bg-emerald-100/40 rounded-full blur-[80px]' />

			{/* Header / Top Nav */}
			<nav className='relative z-10 px-6 pt-6 pb-2 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100'>
						<Wallet className='w-6 h-6 text-white' />
					</div>
					<div>
						<h1 className='text-xl font-black text-slate-800 tracking-tighter leading-none'>
							Tamohar
						</h1>
						<span className='text-[10px] font-bold text-indigo-500 uppercase tracking-widest'>
							बचत प्रविष्टि
						</span>
					</div>
				</div>
				<motion.button
					whileTap={{ scale: 0.8 }}
					onClick={() => router.back()}
					className='absolute  right-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white z-20'>
					<ChevronLeft className='w-5 h-5 text-slate-600' />
				</motion.button>
			</nav>

			<main className='relative z-10 flex-1 flex flex-col px-6 py-4 overflow-hidden'>
				{/* Month Selector Card */}
				<div className='bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-5 mb-6 shadow-sm flex items-center justify-between'>
					<div>
						<h2 className='text-sm font-black text-slate-400 uppercase tracking-widest'>
							महीना चुनें
						</h2>
						<div className='flex items-center gap-2 mt-1'>
							<Calendar className='w-4 h-4 text-indigo-600' />
							<input
								type='month'
								value={month}
								onChange={(e) => setMonth(e.target.value)}
								className='bg-transparent font-bold text-slate-800 outline-none'
							/>
						</div>
					</div>
					<div className='text-right'>
						<p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
							कुल सदस्य
						</p>
						<p className='text-lg font-black text-slate-800'>
							{members.length}
						</p>
					</div>
				</div>

				{/* Member List */}
				<div className='flex-1 overflow-y-auto space-y-3 pb-24 pr-1 scrollbar-hide'>
					<AnimatePresence>
						{members.map((m, i) => (
							<motion.div
								key={m.memberId}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.03 }}
								className='bg-white border border-slate-100 rounded-[1.5rem] p-4 flex flex-col gap-4 shadow-sm'>
								<div className='flex justify-between items-start'>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500'>
											{m.name[0]}
										</div>
										<div>
											<p className='font-bold text-slate-800 leading-none'>
												{m.name}
											</p>
											<p className='text-[10px] font-bold text-slate-400 uppercase mt-1'>
												जमा: ₹{m.paid}
											</p>
										</div>
									</div>
									{m.due === 0 ? (
										<div className='bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center gap-1'>
											<CheckCircle2 className='w-3 h-3' />
											<span className='text-[10px] font-bold uppercase tracking-wider'>
												पूर्ण
											</span>
										</div>
									) : (
										<div className='bg-amber-50 text-amber-600 px-3 py-1 rounded-full flex items-center gap-1'>
											<AlertCircle className='w-3 h-3' />
											<span className='text-[10px] font-bold uppercase tracking-wider'>
												₹{m.due} बकाया
											</span>
										</div>
									)}
								</div>

								<div className='flex items-center gap-3 pt-3 border-t border-slate-50'>
									<div className='relative flex-1'>
										<IndianRupee className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
										<input
											type='number'
											placeholder='नई राशि दर्ज करें'
											value={entries[m.memberId] || ''}
											onChange={(e) => handleChange(m.memberId, e.target.value)}
											className='w-full bg-slate-50 border-none rounded-2xl py-3 pl-9 pr-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all'
										/>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</main>

			{/* Fixed Bottom Save Action */}
			<div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent'>
				<motion.button
					whileTap={{ scale: 0.95 }}
					onClick={save}
					disabled={saving || Object.keys(entries).length === 0}
					className={`w-full flex items-center justify-center gap-3 py-4 rounded-[2rem] font-bold text-lg shadow-xl transition-all ${
						Object.keys(entries).length > 0
							? 'bg-indigo-600 text-white shadow-indigo-200'
							: 'bg-slate-100 text-slate-400 grayscale cursor-not-allowed shadow-none'
					}`}>
					{saving ? (
						<div className='w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin' />
					) : (
						<>
							<Save className='w-5 h-5' />
							डाटा सुरक्षित करें
						</>
					)}
				</motion.button>
			</div>
		</div>
	);
}
