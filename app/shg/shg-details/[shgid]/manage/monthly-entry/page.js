'use client';

import { useEffect, useState } from 'react';
import { IndianRupee, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MonthlySavingsEntry({ params }) {
	const { shgId } = params;

	const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
	const [members, setMembers] = useState([]);
	const [entries, setEntries] = useState({});
	const [saving, setSaving] = useState(false);

	/* Load members + paid amount for selected month */
	useEffect(() => {
		(async () => {
			// const res = await fetch(
			// 	`/api/shg/members-savings?shgId=${shgId}&month=${month}`,
			// );
			// const data = await res.json();
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
			[memberId]: Number(value),
		}));
	};

	const save = async () => {
		setSaving(true);
		try {
			await Promise.all(
				Object.entries(entries).map(([memberId, amount]) =>
					amount > 0
						? fetch('/api/shg?name=monthly-deposit', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									shgId,
									memberId,
									amount,
									month,
								}),
							})
						: null,
				),
			);
			alert('मासिक बचत सफलतापूर्वक दर्ज की गई');
			setEntries({});
		} catch {
			alert('कुछ त्रुटि हुई, पुनः प्रयास करें');
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6'>
			{/* Header */}
			<div className='bg-white rounded-2xl p-5 shadow mb-6'>
				<h1 className='text-xl font-bold text-gray-800'>मासिक बचत प्रविष्टि</h1>
				<p className='text-sm text-gray-500'>
					किसी भी सदस्य से कितनी भी बार राशि दर्ज कर सकते हैं
				</p>

				<div className='flex items-center gap-3 mt-4'>
					<Calendar className='w-5 h-5 text-indigo-600' />
					<input
						type='month'
						value={month}
						onChange={(e) => setMonth(e.target.value)}
						className='border rounded-lg px-3 py-2'
					/>
				</div>
			</div>

			{/* Member Rows */}
			<div className='space-y-3'>
				{members.map((m, i) => (
					<motion.div
						key={m.memberId}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.03 }}
						className='bg-white rounded-xl p-4 shadow-sm grid grid-cols-4 gap-3 items-center'>
						<div>
							<p className='font-medium text-gray-800'>{m.name}</p>
							<p className='text-xs text-gray-500'>जमा: ₹{m.paid}</p>
						</div>

						<div className='text-sm text-gray-600'>देय: ₹{m.due}</div>

						<div className='flex items-center gap-1 text-gray-700'>
							<IndianRupee className='w-4 h-4' />
							<input
								type='number'
								min='0'
								placeholder='राशि'
								value={entries[m.memberId] || ''}
								onChange={(e) => handleChange(m.memberId, e.target.value)}
								className='w-full border rounded-lg px-2 py-1'
							/>
						</div>

						{m.due === 0 && (
							<CheckCircle className='w-5 h-5 text-emerald-500' />
						)}
					</motion.div>
				))}
			</div>

			{/* Save */}
			<button
				onClick={save}
				disabled={saving}
				className='fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg'>
				{saving ? 'सेव हो रहा है…' : 'सेव करें'}
			</button>
		</div>
	);
}
