'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	IndianRupee,
	CheckCircle2,
	ChevronLeft,
	Percent,
	Search,
	X,
	HandCoins,
	ArrowRight,
	Loader2,
	Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BulkLoanPage({ params }) {
	const { shgid } = params;
	const router = useRouter();

	const [step, setStep] = useState('select'); // select | details | review
	const [members, setMembers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedIds, setSelectedIds] = useState([]);
	const [loanSettings, setLoanSettings] = useState({});
	const [shgName, setShgName] = useState('SHG');
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [uiMessage, setUiMessage] = useState(null);

	useEffect(() => {
		const loadMembers = async () => {
			setLoading(true);
			try {
				const [memberRes, shgSummaryRes] = await Promise.all([
					fetch('/api/shg?name=list-members', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ shgId: shgid }),
					}),
					fetch('/api/shg?name=dashboard-summary', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ shgId: shgid }),
					}),
				]);

				const memberData = await memberRes.json();
				setMembers(memberData.members || []);

				if (shgSummaryRes.ok) {
					const shgSummaryData = await shgSummaryRes.json();
					if (shgSummaryData?.shgName) {
						setShgName(shgSummaryData.shgName);
					}
				}
			} catch {
				setUiMessage({ type: 'error', text: 'सदस्य लोड करने में विफल' });
			} finally {
				setLoading(false);
			}
		};

		loadMembers();
	}, [shgid]);

	const toggleMember = (id) => {
		if (selectedIds.includes(id)) {
			setSelectedIds((p) => p.filter((x) => x !== id));
			return;
		}

		setSelectedIds((p) => [...p, id]);
		if (!loanSettings[id]) {
			setLoanSettings((p) => ({
				...p,
				[id]: { principal: '', interestRate: '', reason: '' },
			}));
		}
	};

	const updateLoan = (id, field, value) => {
		setLoanSettings((p) => ({
			...p,
			[id]: { ...p[id], [field]: value },
		}));
	};

	const filteredMembers = members.filter((m) =>
		m?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const todayLabel = useMemo(
		() =>
			new Date().toLocaleDateString('hi-IN', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
		[],
	);

	const validateDetailsStep = () => {
		for (const id of selectedIds) {
			const l = loanSettings[id];
			if (
				!l ||
				!l.principal ||
				Number(l.principal) <= 0 ||
				!l.interestRate ||
				Number(l.interestRate) <= 0 ||
				!String(l.reason || '').trim()
			) {
				return false;
			}
		}
		return true;
	};

	const triggerServerFileDownload = async (blob, fileName) => {
		const safeHeaderFileName = encodeURIComponent(
			String(fileName || 'download.file'),
		);
		const prepareResp = await fetch('/api/download-jpeg', {
			method: 'POST',
			headers: {
				'Content-Type': blob.type || 'image/jpeg',
				'x-file-name': safeHeaderFileName,
			},
			body: blob,
		});

		if (!prepareResp.ok) {
			throw new Error('डाउनलोड तैयार नहीं हो सका');
		}

		const prepared = await prepareResp.json();
		const url = prepared?.downloadUrl;
		if (!url) {
			throw new Error('डाउनलोड URL नहीं मिला');
		}
		window.location.assign(url);
	};

	const escapeHtml = (value) =>
		String(value ?? '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\"/g, '&quot;')
			.replace(/'/g, '&#39;');

	const sanitizeFilePart = (value) =>
		String(value ?? '')
			.replace(/[\\/:*?"<>|]/g, '-')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '');

	const buildProposalHtml = (member, loan) => {
		const amount = Number(loan?.principal || 0).toLocaleString('hi-IN');
		const rate = Number(loan?.interestRate || 0);
		const reason = String(loan?.reason || '').trim();
		const memberName = member?.name || '-';

		const objectiveText = `सदस्य ${memberName} को आवश्यक कार्य हेतु ऋण प्रदान करना।`;
		const discussionText = `कारण: ${reason} | मांग: ₹${amount} | प्रस्तावित मासिक ब्याज दर: ${rate}%`;
		const resolutionText = `समूह सर्वसम्मति से सदस्य ${memberName} को ₹${amount} का ऋण ${rate}% मासिक ब्याज दर पर स्वीकृत करता है।`;

		const signatureRows = (members || [])
			.slice(0, 18)
			.map(
				(rowMember, idx) => `
          <tr>
						<td style="border:1px solid #334155;padding:8px;">${idx + 1}</td>
						<td style="border:1px solid #334155;padding:8px;">${escapeHtml(rowMember?.name || '-')}</td>
						<td style="border:1px solid #334155;padding:8px;min-height:26px;">&nbsp;</td>
          </tr>
        `,
			)
			.join('');

		return `
			<div class="proposal-root" style="width:760px;background:#ffffff;color:#0f172a;padding:8px;font-family:'Noto Sans Devanagari','Mangal',sans-serif;box-sizing:border-box;overflow:hidden;">
				<div style="border:2px solid #334155;padding:14px;box-sizing:border-box;">
          <h1 style="margin:0;text-align:center;font-size:28px;font-weight:700;">${escapeHtml(shgName || 'SHG')} - प्रस्ताव</h1>
          <p style="margin:8px 0 0 0;text-align:center;font-size:14px;">दिनांक: ${escapeHtml(todayLabel)}</p>

		  <table style="width:100%;border-collapse:collapse;margin-top:14px;table-layout:fixed;">
            <thead>
              <tr>
                <th style="border:1px solid #334155;padding:8px;font-size:13px;">उद्देश्य</th>
                <th style="border:1px solid #334155;padding:8px;font-size:13px;">चर्चा</th>
                <th style="border:1px solid #334155;padding:8px;font-size:13px;">प्रस्ताव / संकल्प</th>
              </tr>
            </thead>
            <tbody>
              <tr>
								<td style="border:1px solid #334155;padding:10px;font-size:12px;vertical-align:top;line-height:1.45;word-break:break-word;">${escapeHtml(objectiveText)}</td>
								<td style="border:1px solid #334155;padding:10px;font-size:12px;vertical-align:top;line-height:1.45;word-break:break-word;">${escapeHtml(discussionText)}</td>
								<td style="border:1px solid #334155;padding:10px;font-size:12px;vertical-align:top;line-height:1.45;word-break:break-word;">${escapeHtml(resolutionText)}</td>
              </tr>
            </tbody>
          </table>

					<table style="width:100%;border-collapse:collapse;margin-top:14px;table-layout:fixed;border:1px solid #334155;">
            <thead>
              <tr>
                <th style="border:1px solid #334155;padding:8px;width:56px;font-size:12px;">क्रम</th>
                <th style="border:1px solid #334155;padding:8px;font-size:12px;text-align:left;">सदस्य का नाम</th>
                <th style="border:1px solid #334155;padding:8px;width:180px;font-size:12px;">हस्ताक्षर</th>
              </tr>
            </thead>
            <tbody>
							${
								signatureRows ||
								`<tr><td style="border:1px solid #334155;padding:8px;">1</td><td style="border:1px solid #334155;padding:8px;">-</td><td style="border:1px solid #334155;padding:8px;">&nbsp;</td></tr>`
							}
            </tbody>
          </table>

          <p style="margin:16px 0 0 0;font-size:11px;color:#334155;">नोट: यह प्रस्ताव SHG बैठक में पारित करने हेतु तैयार किया गया है।</p>
        </div>
      </div>
    `;
	};

	const downloadProposalPdf = async (member, loan) => {
		if (!member || !loan) return;

		const reason = String(loan.reason || '').trim();
		if (!reason) {
			setUiMessage({ type: 'error', text: 'कृपया ऋण का कारण भरें' });
			return;
		}

		if (
			Number(loan.principal || 0) <= 0 ||
			Number(loan.interestRate || 0) <= 0
		) {
			setUiMessage({ type: 'error', text: 'राशि और ब्याज सही भरें' });
			return;
		}

		let wrapper = null;
		try {
			setUiMessage(null);
			const html2pdfModule = await import('html2pdf.js');
			const html2pdf = html2pdfModule.default || html2pdfModule;

			wrapper = document.createElement('div');
			wrapper.style.position = 'fixed';
			wrapper.style.left = '-10000px';
			wrapper.style.top = '0';
			wrapper.style.width = '760px';
			wrapper.style.zIndex = '-1';
			wrapper.innerHTML = buildProposalHtml(member, loan);
			document.body.appendChild(wrapper);

			const proposalRoot = wrapper.querySelector('.proposal-root');
			if (!proposalRoot) {
				throw new Error('प्रस्ताव टेम्पलेट तैयार नहीं हुआ');
			}

			const pdfBlob = await html2pdf()
				.set({
					margin: [2, 2, 2, 2],
					image: { type: 'jpeg', quality: 0.95 },
					html2canvas: {
						scale: 2,
						useCORS: true,
						backgroundColor: '#ffffff',
					},
					jsPDF: {
						unit: 'mm',
						format: 'a4',
						orientation: 'portrait',
					},
				})
				.from(proposalRoot)
				.outputPdf('blob');

			if (!pdfBlob) {
				throw new Error('PDF बनाने में त्रुटि हुई');
			}

			await triggerServerFileDownload(
				pdfBlob,
				`Prastav-${sanitizeFilePart(member.name || 'sadasya')}-${sanitizeFilePart(todayLabel)}.pdf`,
			);
		} catch (error) {
			setUiMessage({
				type: 'error',
				text: error?.message || 'PDF डाउनलोड नहीं हुआ',
			});
		} finally {
			if (wrapper && wrapper.parentNode) {
				wrapper.parentNode.removeChild(wrapper);
			}
		}
	};

	const submitLoans = async () => {
		if (!validateDetailsStep()) {
			setUiMessage({ type: 'error', text: 'कृपया सभी विवरण सही से भरें' });
			return;
		}

		const payloads = selectedIds.map((id) => ({
			memberId: id,
			principal: Number(loanSettings[id].principal),
			interestRate: Number(loanSettings[id].interestRate),
			reason: String(loanSettings[id].reason || '').trim(),
		}));

		try {
			setSaving(true);
			await Promise.all(
				payloads.map((p) =>
					fetch('/api/shg?name=create-loan', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ shgId: shgid, ...p }),
					}),
				),
			);
			setUiMessage({ type: 'success', text: 'ऋण सफलतापूर्वक जारी' });
			setTimeout(() => router.back(), 2000);
		} catch {
			setUiMessage({ type: 'error', text: 'त्रुटि हुई' });
		} finally {
			setSaving(false);
		}
	};

	const stepIndex = step === 'select' ? 0 : step === 'details' ? 1 : 2;

	return (
		<div className='min-h-screen bg-[#fafafa] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-teal-50 relative flex flex-col overflow-x-hidden font-sans'>
			<div className='absolute top-[-5%] right-[-10%] w-[60%] h-[30%] bg-indigo-200/40 rounded-full blur-[100px]' />
			<div className='absolute bottom-[-5%] left-[-10%] w-[60%] h-[30%] bg-pink-200/30 rounded-full blur-[100px]' />

			<nav className='relative z-40 px-6 pt-6 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100'>
						<HandCoins className='w-6 h-6 text-white' />
					</div>
					<div>
						<h1 className='text-xl font-black text-slate-800 tracking-tighter leading-none'>
							ऋण वितरण
						</h1>
						<div className='flex gap-1 mt-1.5'>
							{[0, 1, 2].map((i) => (
								<div
									key={i}
									className={`h-1 rounded-full transition-all duration-300 ${i <= stepIndex ? 'w-4 bg-indigo-500' : 'w-1 bg-slate-200'}`}
								/>
							))}
						</div>
					</div>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={() =>
						step === 'select'
							? router.back()
							: setStep(step === 'review' ? 'details' : 'select')
					}
					className='p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white'>
					<ChevronLeft className='w-5 h-5 text-slate-600' />
				</motion.button>
			</nav>

			<main className='relative z-10 flex-1 px-6 pt-8 pb-36'>
				<AnimatePresence mode='wait'>
					{step === 'select' && (
						<motion.div
							key='select'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className='space-y-6'>
							<div className='relative group'>
								<Search
									className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors'
									size={20}
								/>
								<input
									placeholder='सदस्य खोजें...'
									className='w-full pl-12 pr-4 py-4 rounded-[1.5rem] bg-white/70 backdrop-blur-sm border border-white shadow-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all'
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							{loading ? (
								<div className='flex flex-col items-center justify-center py-20 text-slate-400'>
									<Loader2 className='animate-spin mb-2' />
									<p className='text-sm font-bold uppercase tracking-widest'>
										लोड हो रहा है...
									</p>
								</div>
							) : (
								<div className='grid grid-cols-2 gap-4'>
									{filteredMembers.map((m) => {
										const isSelected = selectedIds.includes(m._id);
										return (
											<motion.button
												whileTap={{ scale: 0.95 }}
												key={m._id}
												onClick={() => toggleMember(m._id)}
												className={`relative p-4 rounded-[2rem] border-2 transition-all text-left flex flex-col justify-between h-32 ${
													isSelected
														? 'bg-indigo-50/80 border-indigo-200 shadow-indigo-100/50 shadow-lg'
														: 'bg-white/60 backdrop-blur-sm border-white shadow-sm'
												}`}>
												<div
													className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold mb-2 ${
														isSelected
															? 'bg-indigo-600 text-white'
															: 'bg-slate-100 text-slate-500'
													}`}>
													{m.name.charAt(0)}
												</div>
												<div className='flex items-center justify-between w-full'>
													<p
														className={`text-sm font-black tracking-tight leading-none ${
															isSelected ? 'text-indigo-900' : 'text-slate-700'
														}`}>
														{m.name}
													</p>
													{isSelected && (
														<CheckCircle2
															size={16}
															className='text-indigo-600'
														/>
													)}
												</div>
											</motion.button>
										);
									})}
								</div>
							)}
						</motion.div>
					)}

					{step === 'details' && (
						<motion.div
							key='details'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							className='space-y-4'>
							<p className='text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-1'>
								ऋण विवरण भरें
							</p>

							{selectedIds.map((id) => {
								const m = members.find((x) => x._id === id);
								const l = loanSettings[id] || {};
								return (
									<div key={id} className='relative group overflow-hidden'>
										<div className='absolute inset-0 bg-white/60 backdrop-blur-md rounded-[2rem] border border-teal-100 shadow-sm' />
										<div className='relative p-5 space-y-4'>
											<div className='flex justify-between items-center'>
												<p className='font-black text-slate-800 text-lg tracking-tight'>
													{m?.name}
												</p>
												<button
													onClick={() => toggleMember(id)}
													className='p-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 transition-colors'>
													<X size={16} />
												</button>
											</div>

											<div className='grid grid-cols-2 gap-4'>
												<div className='space-y-1.5'>
													<label className='text-[10px] font-black text-slate-400 ml-1 uppercase'>
														राशि (मूलधन)
													</label>
													<div className='relative'>
														<IndianRupee
															className='absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500'
															size={14}
														/>
														<input
															type='number'
															placeholder='0'
															className='w-full pl-8 pr-3 py-3 bg-white/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm transition-all'
															value={l.principal}
															onChange={(e) =>
																updateLoan(id, 'principal', e.target.value)
															}
														/>
													</div>
												</div>

												<div className='space-y-1.5'>
													<label className='text-[10px] font-black text-slate-400 ml-1 uppercase'>
														ब्याज % (मासिक)
													</label>
													<div className='relative'>
														<Percent
															className='absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400'
															size={14}
														/>
														<input
															type='number'
															className='w-full pl-8 pr-3 py-3 bg-white/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm transition-all'
															value={l.interestRate}
															onChange={(e) =>
																updateLoan(id, 'interestRate', e.target.value)
															}
														/>
													</div>
												</div>
											</div>

											<div className='space-y-1.5'>
												<label className='text-[10px] font-black text-slate-400 ml-1 uppercase'>
													ऋण देने का कारण
												</label>
												<textarea
													rows={2}
													placeholder='कारण लिखें...'
													className='w-full px-3 py-3 bg-white/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm transition-all resize-none'
													value={l.reason || ''}
													onChange={(e) =>
														updateLoan(id, 'reason', e.target.value)
													}
												/>
											</div>

											<div className='flex items-center gap-2'>
												<button
													type='button'
													onClick={() => downloadProposalPdf(m, l)}
													className='inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 font-semibold hover:bg-sky-100 transition-colors'>
													<Download size={13} />
													प्रस्ताव डाउनलोड (PDF)
												</button>
											</div>
										</div>
									</div>
								);
							})}
						</motion.div>
					)}

					{step === 'review' && (
						<motion.div
							key='review'
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className='space-y-4'>
							<div className='relative overflow-hidden p-6 rounded-[2.5rem] bg-slate-900 text-white shadow-xl mb-6'>
								<div className='absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl' />
								<p className='opacity-60 text-[10px] font-black uppercase tracking-widest'>
									सारांश
								</p>
								<h2 className='text-3xl font-black tracking-tighter mt-1'>
									{selectedIds.length} सदस्य चयनित
								</h2>
							</div>

							{selectedIds.map((id) => {
								const m = members.find((x) => x._id === id);
								const l = loanSettings[id];
								return (
									<div
										key={id}
										className='bg-white/70 backdrop-blur-sm p-5 rounded-[2rem] border border-white flex justify-between items-center shadow-sm'>
										<div>
											<p className='font-black text-slate-800 tracking-tight'>
												{m?.name}
											</p>
											<p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
												ब्याज: {l.interestRate}% प्रति माह
											</p>
										</div>
										<div className='text-right'>
											<p className='text-indigo-600 font-black text-xl tracking-tighter'>
												₹{l.principal}
											</p>
										</div>
									</div>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>
			</main>

			<div className='fixed bottom-0 inset-x-0 p-14 z-50'>
				<div className='absolute inset-0 bg-white/40 backdrop-blur-xl border-t border-white/50' />
				<div className='max-w-2xl mx-auto relative'>
					{step === 'select' && (
						<motion.button
							whileTap={{ scale: 0.96 }}
							disabled={!selectedIds.length}
							onClick={() => setStep('details')}
							className='w-full bg-slate-900 text-white py-4 rounded-[1.8rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 transition-all disabled:opacity-30 group'>
							आगे बढ़ें ({selectedIds.length})
							<div className='p-1 bg-white/20 rounded-lg group-hover:translate-x-1 transition-transform'>
								<ArrowRight size={18} />
							</div>
						</motion.button>
					)}

					{step === 'details' && (
						<motion.button
							whileTap={{ scale: 0.96 }}
							onClick={() =>
								validateDetailsStep()
									? setStep('review')
									: setUiMessage({ type: 'error', text: 'विवरण भरें' })
							}
							className='w-full bg-indigo-600 text-white py-4 rounded-[1.8rem] font-black text-lg shadow-xl shadow-indigo-100'>
							रिव्यू करें
						</motion.button>
					)}

					{step === 'review' && (
						<motion.button
							whileTap={{ scale: 0.96 }}
							disabled={saving}
							onClick={submitLoans}
							className='w-full bg-emerald-600 text-white py-4 rounded-[1.8rem] font-black text-lg flex justify-center items-center gap-3 shadow-xl shadow-emerald-100 disabled:opacity-50'>
							{saving ? (
								<Loader2 className='animate-spin' />
							) : (
								<>
									ऋण जारी करें <HandCoins size={22} />
								</>
							)}
						</motion.button>
					)}
				</div>
			</div>

			<AnimatePresence>
				{uiMessage && (
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						className={`fixed bottom-28 inset-x-10 z-[60] p-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
							uiMessage.type === 'error'
								? 'bg-red-50/90 border-red-200 text-red-800'
								: 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
						}`}>
						{uiMessage.type === 'error' ? (
							<X className='bg-red-500 text-white rounded-full p-1' size={18} />
						) : (
							<CheckCircle2 size={18} className='text-emerald-500' />
						)}
						<p className='font-bold text-xs uppercase tracking-wider'>
							{uiMessage.text}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
