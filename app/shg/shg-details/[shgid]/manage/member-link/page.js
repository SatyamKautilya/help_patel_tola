'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Link2, Search, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MemberLinkPage({ params }) {
	const { shgid } = params;
	const router = useRouter();

	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedMemberId, setSelectedMemberId] = useState('');
	const [mobile, setMobile] = useState('');
	const [searching, setSearching] = useState(false);
	const [foundUser, setFoundUser] = useState(null);
	const [attaching, setAttaching] = useState(false);
	const [message, setMessage] = useState(null);

	const nonAppMembers = useMemo(
		() => members.filter((m) => !m?.userId || !m?.hasMobileAccess),
		[members],
	);

	const selectedMember = useMemo(
		() => nonAppMembers.find((m) => String(m._id) === String(selectedMemberId)),
		[nonAppMembers, selectedMemberId],
	);

	const loadMembers = async () => {
		setLoading(true);
		try {
			const resp = await fetch('/api/shg?name=list-members', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ shgId: shgid }),
			});
			const data = await resp.json();
			setMembers(data.members || []);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadMembers();
	}, [shgid]);

	const searchUser = async () => {
		if (!mobile?.trim()) return;
		setSearching(true);
		setFoundUser(null);
		setMessage(null);
		try {
			const resp = await fetch('/api/shg?name=fetch-by-mobile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mobile: mobile.trim() }),
			});
			const data = await resp.json();
			if (data?._id) {
				setFoundUser(data);
			} else {
				setMessage({ type: 'error', text: 'इस मोबाइल नंबर पर कोई ऐप यूज़र नहीं मिला।' });
			}
		} finally {
			setSearching(false);
		}
	};

	const attachUser = async () => {
		if (!selectedMember?._id || !foundUser?._id) return;
		setAttaching(true);
		setMessage(null);
		try {
			const resp = await fetch('/api/shg?name=link-member-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					shgId: shgid,
					memberId: selectedMember._id,
					mobileNumber: foundUser.mobileNumber,
				}),
			});
			const data = await resp.json();
			if (!resp.ok) {
				throw new Error(data?.error || 'Link failed');
			}

			setMessage({ type: 'success', text: 'सदस्य को ऐप खाते से सफलतापूर्वक लिंक कर दिया गया।' });
			setSelectedMemberId('');
			setMobile('');
			setFoundUser(null);
			await loadMembers();
		} catch (e) {
			setMessage({ type: 'error', text: e.message || 'लिंक करते समय त्रुटि हुई।' });
		} finally {
			setAttaching(false);
		}
	};

	return (
		<div className='min-h-screen bg-[#fafafa] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-rose-100 p-6'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-black text-slate-900'>नॉन-ऐप सदस्य लिंक</h1>
						<p className='text-sm text-slate-600 mt-1'>
							ऐप जॉइन कर चुके यूज़र को पहले से मौजूद SHG सदस्य रिकॉर्ड से लिंक करें।
						</p>
					</div>
					<button
						onClick={() => router.back()}
						className='p-3 bg-white border border-slate-200 rounded-2xl shadow-sm'>
						<ChevronLeft className='w-5 h-5 text-slate-700' />
					</button>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					<div className='bg-white/80 border border-slate-200 rounded-2xl p-5'>
						<h2 className='text-lg font-bold text-slate-900 mb-3'>
							नॉन-ऐप सदस्य ({nonAppMembers.length})
						</h2>
						{loading ? (
							<p className='text-slate-500'>लोड हो रहा है...</p>
						) : nonAppMembers.length === 0 ? (
							<p className='text-emerald-700 text-sm font-semibold'>
								सभी सदस्य पहले से ऐप खाते से लिंक हैं।
							</p>
						) : (
							<div className='space-y-2 max-h-[52vh] overflow-y-auto pr-1'>
								{nonAppMembers.map((member) => {
									const selected = String(selectedMemberId) === String(member._id);
									return (
										<button
											key={member._id}
											onClick={() => setSelectedMemberId(member._id)}
											className={`w-full text-left p-3 rounded-xl border transition ${
												selected
													? 'border-indigo-400 bg-indigo-50'
													: 'border-slate-200 bg-white hover:bg-slate-50'
											}`}>
											<p className='font-semibold text-slate-900'>{member.name}</p>
											<p className='text-xs text-slate-500 mt-1'>
												{member.memberCode || '-'} | {member.mobileNumber || 'मोबाइल दर्ज नहीं'}
											</p>
										</button>
									);
								})}
							</div>
						)}
					</div>

					<div className='bg-white/80 border border-slate-200 rounded-2xl p-5 space-y-4'>
						<h2 className='text-lg font-bold text-slate-900'>मोबाइल से ऐप यूज़र खोजें</h2>
						{selectedMember ? (
							<p className='text-sm text-slate-600'>
								चयनित सदस्य: <span className='font-semibold text-slate-900'>{selectedMember.name}</span>
							</p>
						) : (
							<p className='text-sm text-amber-700'>
								पहले बाईं सूची से सदस्य चुनें।
							</p>
						)}

						<div className='flex gap-2'>
							<div className='relative flex-1'>
								<Search className='w-4 h-4 absolute left-3 top-3 text-slate-400' />
								<input
									type='tel'
									value={mobile}
									onChange={(e) => setMobile(e.target.value)}
									placeholder='मोबाइल नंबर दर्ज करें'
									className='w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white'
								/>
							</div>
							<button
								onClick={searchUser}
								disabled={searching || !mobile?.trim()}
								className='px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold disabled:opacity-50'>
								{searching ? 'खोज...' : 'खोजें'}
							</button>
						</div>

						{foundUser ? (
							<div className='p-3 rounded-xl border border-emerald-300 bg-emerald-50'>
								<p className='text-sm font-semibold text-emerald-900'>
									{foundUser.hindiName || foundUser.name}
								</p>
								<p className='text-xs text-emerald-700 mt-1'>{foundUser.mobileNumber}</p>
								<button
									onClick={attachUser}
									disabled={!selectedMember || attaching}
									className='mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold disabled:opacity-50'>
									<Link2 className='w-4 h-4' />
									{attaching ? 'लिंक हो रहा है...' : 'यूज़र आईडी अटैच करें'}
								</button>
							</div>
						) : null}

						{message ? (
							<motion.div
								initial={{ opacity: 0, y: 4 }}
								animate={{ opacity: 1, y: 0 }}
								className={`p-3 rounded-xl text-sm border flex items-start gap-2 ${
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
					</div>
				</div>
			</div>
		</div>
	);
}

