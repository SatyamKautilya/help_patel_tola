'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
	Users2,
	FileCheck2,
	CircleDot,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BulkLoanPage({ params }) {
	const urlParams = useParams();
	const shgid = params?.shgid || urlParams?.shgid;
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
					if (shgSummaryData?.shgName) setShgName(shgSummaryData.shgName);
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
		const safeHeaderFileName = encodeURIComponent(String(fileName || 'download.file'));
		const prepareResp = await fetch('/api/download-jpeg', {
			method: 'POST',
			headers: {
				'Content-Type': blob.type || 'image/jpeg',
				'x-file-name': safeHeaderFileName,
			},
			body: blob,
		});
		if (!prepareResp.ok) throw new Error('डाउनलोड तैयार नहीं हो सका');
		const prepared = await prepareResp.json();
		const url = prepared?.downloadUrl;
		if (!url) throw new Error('डाउनलोड URL नहीं मिला');
		window.location.assign(url);
	};

	const escapeHtml = (value) =>
		String(value ?? '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
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
            <thead><tr>
                <th style="border:1px solid #334155;padding:8px;font-size:13px;">उद्देश्य</th>
                <th style="border:1px solid #334155;padding:8px;font-size:13px;">चर्चा</th>
                <th style="border:1px solid #334155;padding:8px;font-size:13px;">प्रस्ताव / संकल्प</th>
              </tr></thead>
            <tbody><tr>
					<td style="border:1px solid #334155;padding:10px;font-size:12px;vertical-align:top;line-height:1.45;word-break:break-word;">${escapeHtml(objectiveText)}</td>
					<td style="border:1px solid #334155;padding:10px;font-size:12px;vertical-align:top;line-height:1.45;word-break:break-word;">${escapeHtml(discussionText)}</td>
					<td style="border:1px solid #334155;padding:10px;font-size:12px;vertical-align:top;line-height:1.45;word-break:break-word;">${escapeHtml(resolutionText)}</td>
              </tr></tbody>
          </table>
				<table style="width:100%;border-collapse:collapse;margin-top:14px;table-layout:fixed;border:1px solid #334155;">
            <thead><tr>
                <th style="border:1px solid #334155;padding:8px;width:56px;font-size:12px;">क्रम</th>
                <th style="border:1px solid #334155;padding:8px;font-size:12px;text-align:left;">सदस्य का नाम</th>
                <th style="border:1px solid #334155;padding:8px;width:180px;font-size:12px;">हस्ताक्षर</th>
              </tr></thead>
            <tbody>${signatureRows || `<tr><td style="border:1px solid #334155;padding:8px;">1</td><td style="border:1px solid #334155;padding:8px;">-</td><td style="border:1px solid #334155;padding:8px;">&nbsp;</td></tr>`}</tbody>
          </table>
          <p style="margin:16px 0 0 0;font-size:11px;color:#334155;">नोट: यह प्रस्ताव SHG बैठक में पारित करने हेतु तैयार किया गया है।</p>
        </div>
      </div>
    `;
	};

	const downloadProposalPdf = async (member, loan) => {
		if (!member || !loan) return;
		const reason = String(loan.reason || '').trim();
		if (!reason) { setUiMessage({ type: 'error', text: 'कृपया ऋण का कारण भरें' }); return; }
		if (Number(loan.principal || 0) <= 0 || Number(loan.interestRate || 0) <= 0) {
			setUiMessage({ type: 'error', text: 'राशि और ब्याज सही भरें' }); return;
		}
		let wrapper = null;
		try {
			setUiMessage(null);
			const html2pdfModule = await import('html2pdf.js');
			const html2pdf = html2pdfModule.default || html2pdfModule;
			wrapper = document.createElement('div');
			wrapper.style.cssText = 'position:fixed;left:-10000px;top:0;width:760px;z-index:-1;';
			wrapper.innerHTML = buildProposalHtml(member, loan);
			document.body.appendChild(wrapper);
			const proposalRoot = wrapper.querySelector('.proposal-root');
			if (!proposalRoot) throw new Error('प्रस्ताव टेम्पलेट तैयार नहीं हुआ');
			const pdfBlob = await html2pdf()
				.set({ margin: [2,2,2,2], image: { type:'jpeg', quality:0.95 }, html2canvas: { scale:2, useCORS:true, backgroundColor:'#ffffff' }, jsPDF: { unit:'mm', format:'a4', orientation:'portrait' } })
				.from(proposalRoot).outputPdf('blob');
			if (!pdfBlob) throw new Error('PDF बनाने में त्रुटि हुई');
			await triggerServerFileDownload(pdfBlob, `Prastav-${sanitizeFilePart(member.name || 'sadasya')}-${sanitizeFilePart(todayLabel)}.pdf`);
		} catch (error) {
			setUiMessage({ type: 'error', text: error?.message || 'PDF डाउनलोड नहीं हुआ' });
		} finally {
			if (wrapper?.parentNode) wrapper.parentNode.removeChild(wrapper);
		}
	};

	const submitLoans = async () => {
		if (!validateDetailsStep()) { setUiMessage({ type: 'error', text: 'कृपया सभी विवरण सही से भरें' }); return; }
		const payloads = selectedIds.map((id) => ({
			memberId: id,
			principal: Number(loanSettings[id].principal),
			interestRate: Number(loanSettings[id].interestRate),
			reason: String(loanSettings[id].reason || '').trim(),
		}));
		try {
			setSaving(true);
			await Promise.all(payloads.map((p) =>
				fetch('/api/shg?name=create-loan', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ shgId: shgid, ...p }),
				}),
			));
			setUiMessage({ type: 'success', text: 'ऋण सफलतापूर्वक जारी' });
			setTimeout(() => router.back(), 2000);
		} catch {
			setUiMessage({ type: 'error', text: 'त्रुटि हुई' });
		} finally {
			setSaving(false);
		}
	};

	const stepIndex = step === 'select' ? 0 : step === 'details' ? 1 : 2;
	const steps = [
		{ label: 'सदस्य चुनें', icon: Users2 },
		{ label: 'ऋण विवरण', icon: IndianRupee },
		{ label: 'पुष्टि करें', icon: FileCheck2 },
	];

	return (
		<div className='min-h-screen bg-[#f1f5fb] pb-40 overflow-x-hidden' style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'calc(env(safe-area-inset-bottom) + 10rem)' }}>
			{/* Blobs */}
			<div className='fixed top-[-12%] right-[-12%] w-[55%] h-[40%] bg-emerald-200/25 rounded-full blur-[100px] pointer-events-none' />
			<div className='fixed bottom-[-10%] left-[-12%] w-[55%] h-[38%] bg-indigo-200/25 rounded-full blur-[100px] pointer-events-none' />

			{/* Header */}
			<div className='sticky top-0 z-30 backdrop-blur-md bg-white/50 border-b border-white/40 px-5 pt-7 pb-4'>
				<div className='max-w-xl mx-auto flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200'>
							<HandCoins className='w-5 h-5 text-white' />
						</div>
						<div>
							<p className='text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase leading-none'>
								{shgName}
							</p>
							<h1 className='text-xl font-extrabold text-slate-900 tracking-tight leading-tight'>
								ऋण{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600'>
									वितरण
								</span>
							</h1>
						</div>
					</div>
					<motion.button
						whileTap={{ scale: 0.85 }}
						onClick={() =>
							step === 'select'
								? router.back()
								: setStep(step === 'review' ? 'details' : 'select')
						}
						className='p-2.5 bg-white/80 backdrop-blur rounded-2xl shadow border border-white/60'>
						<ChevronLeft className='w-5 h-5 text-slate-600' />
					</motion.button>
				</div>

				{/* Step progress */}
				<div className='max-w-xl mx-auto mt-4 flex items-center gap-2'>
					{steps.map((s, i) => {
						const StepIcon = s.icon;
						const isActive = i === stepIndex;
						const isDone = i < stepIndex;
						return (
							<div key={s.label} className='flex items-center gap-2 flex-1'>
								<div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all ${isActive ? 'bg-emerald-600 text-white shadow-sm' : isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
									<StepIcon className='w-3.5 h-3.5 shrink-0' />
									<span className='text-[10px] font-black uppercase tracking-wider whitespace-nowrap'>
										{s.label}
									</span>
								</div>
								{i < 2 && (
									<div className={`flex-1 h-px transition-colors ${i < stepIndex ? 'bg-emerald-400' : 'bg-slate-200'}`} />
								)}
							</div>
						);
					})}
				</div>
			</div>

			<main className='max-w-xl mx-auto px-4 pt-5'>
				<AnimatePresence mode='wait'>

					{/* ── STEP 1: SELECT ── */}
					{step === 'select' && (
						<motion.div
							key='select'
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -30 }}
							transition={{ type: 'spring', stiffness: 300, damping: 28 }}
							className='space-y-4'>

							{/* Search */}
							<div className='relative'>
								<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4' />
								<input
									placeholder='सदस्य खोजें...'
									className='w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm font-medium placeholder:text-slate-400'
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							{loading ? (
								<div className='flex flex-col items-center justify-center py-20 gap-3'>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
										className='w-10 h-10 border-3 border-emerald-200 border-t-emerald-600 rounded-full'
									/>
									<p className='text-sm font-bold text-slate-400'>लोड हो रहा है...</p>
								</div>
							) : (
								<div className='grid grid-cols-2 gap-3'>
									{filteredMembers.map((m) => {
										const isSelected = selectedIds.includes(m._id);
										return (
											<motion.button
												whileTap={{ scale: 0.94 }}
												key={m._id}
												onClick={() => toggleMember(m._id)}
												className={`relative flex flex-col p-4 rounded-3xl border-2 text-left transition-all ${
													isSelected
														? 'bg-emerald-50 border-emerald-400 shadow-md shadow-emerald-100'
														: 'bg-white border-slate-100 shadow-sm hover:border-slate-200'
												}`}>
												{/* Avatar */}
												<div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-base font-black mb-3 transition-colors ${
													isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
												}`}>
													{m.name.charAt(0)}
												</div>
												<p className={`text-sm font-black leading-snug ${isSelected ? 'text-emerald-900' : 'text-slate-700'}`}>
													{m.name}
												</p>
												{m.memberCode && (
													<p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5'>
														{m.memberCode}
													</p>
												)}
												{/* Check indicator */}
												<AnimatePresence>
													{isSelected && (
														<motion.div
															initial={{ scale: 0, opacity: 0 }}
															animate={{ scale: 1, opacity: 1 }}
															exit={{ scale: 0, opacity: 0 }}
															className='absolute top-3 right-3'>
															<CheckCircle2 className='w-5 h-5 text-emerald-500' />
														</motion.div>
													)}
												</AnimatePresence>
											</motion.button>
										);
									})}
								</div>
							)}
						</motion.div>
					)}

					{/* ── STEP 2: DETAILS ── */}
					{step === 'details' && (
						<motion.div
							key='details'
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -30 }}
							transition={{ type: 'spring', stiffness: 300, damping: 28 }}
							className='space-y-4'>

							{selectedIds.map((id, cardIdx) => {
								const m = members.find((x) => x._id === id);
								const l = loanSettings[id] || {};
								return (
									<motion.div
										key={id}
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: cardIdx * 0.06 }}
										className='bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden'>

										{/* Card header */}
										<div className='flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-100'>
											<div className='flex items-center gap-3'>
												<div className='w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm'>
													{m?.name?.charAt(0)}
												</div>
												<p className='font-black text-slate-800'>{m?.name}</p>
											</div>
											<button
												onClick={() => toggleMember(id)}
												className='w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-colors'>
												<X className='w-4 h-4' />
											</button>
										</div>

										{/* Fields */}
										<div className='px-5 py-4 space-y-4'>
											<div className='grid grid-cols-2 gap-3'>
												{/* Principal */}
												<div className='space-y-1.5'>
													<label className='text-[10px] font-black text-slate-400 uppercase tracking-wider'>
														राशि (मूलधन)
													</label>
													<div className='relative'>
														<IndianRupee className='absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 w-3.5 h-3.5' />
														<input
															type='number'
															placeholder='0'
															className='w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/25 outline-none font-bold text-sm'
															value={l.principal}
															onChange={(e) => updateLoan(id, 'principal', e.target.value)}
														/>
													</div>
												</div>

												{/* Interest */}
												<div className='space-y-1.5'>
													<label className='text-[10px] font-black text-slate-400 uppercase tracking-wider'>
														ब्याज % (मासिक)
													</label>
													<div className='relative'>
														<Percent className='absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-3.5 h-3.5' />
														<input
															type='number'
															className='w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/25 outline-none font-bold text-sm'
															value={l.interestRate}
															onChange={(e) => updateLoan(id, 'interestRate', e.target.value)}
														/>
													</div>
												</div>
											</div>

											{/* Reason */}
											<div className='space-y-1.5'>
												<label className='text-[10px] font-black text-slate-400 uppercase tracking-wider'>
													ऋण का कारण
												</label>
												<textarea
													rows={2}
													placeholder='कारण लिखें...'
													className='w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/25 outline-none font-medium text-sm resize-none'
													value={l.reason || ''}
													onChange={(e) => updateLoan(id, 'reason', e.target.value)}
												/>
											</div>

											{/* PDF Download */}
											<button
												type='button'
												onClick={() => downloadProposalPdf(m, l)}
												className='inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 font-bold hover:bg-sky-100 transition-colors'>
												<Download className='w-3.5 h-3.5' />
												प्रस्ताव PDF डाउनलोड
											</button>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					)}

					{/* ── STEP 3: REVIEW ── */}
					{step === 'review' && (
						<motion.div
							key='review'
							initial={{ opacity: 0, scale: 0.97 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ type: 'spring', stiffness: 300, damping: 28 }}
							className='space-y-3'>

							{/* Summary banner */}
							<div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl mb-2'>
								<div className='absolute top-0 right-0 w-36 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none' />
								<CircleDot className='w-5 h-5 text-emerald-400 mb-2' />
								<p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
									अंतिम समीक्षा
								</p>
								<h2 className='text-2xl font-black tracking-tight mt-1'>
									{selectedIds.length} सदस्य
								</h2>
								<p className='text-sm text-slate-400 mt-0.5'>
									कुल राशि: ₹{selectedIds.reduce((acc, id) => acc + (Number(loanSettings[id]?.principal) || 0), 0).toLocaleString('hi-IN')}
								</p>
							</div>

							{selectedIds.map((id) => {
								const m = members.find((x) => x._id === id);
								const l = loanSettings[id];
								return (
									<motion.div
										key={id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className='bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex items-center justify-between'>
										<div className='flex items-center gap-3'>
											<div className='w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm'>
												{m?.name?.charAt(0)}
											</div>
											<div>
												<p className='font-black text-slate-800 text-sm'>{m?.name}</p>
												<p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5'>
													{l.interestRate}% मासिक ब्याज
												</p>
											</div>
										</div>
										<div className='text-right'>
											<p className='text-emerald-600 font-black text-lg tracking-tight'>
												₹{Number(l.principal).toLocaleString('hi-IN')}
											</p>
											<p className='text-[10px] text-slate-400 font-medium mt-0.5 max-w-[100px] truncate'>
												{l.reason}
											</p>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>
			</main>

			{/* Bottom CTA */}
			<div className='fixed bottom-0 inset-x-0 z-40' style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
				<div className='absolute inset-0 bg-white/60 backdrop-blur-xl border-t border-white/50' />
				<div className='relative max-w-xl mx-auto px-4 py-4 space-y-2'>
					{step === 'select' && (
						<motion.button
							whileTap={{ scale: 0.97 }}
							disabled={!selectedIds.length}
							onClick={() => setStep('details')}
							className='w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 disabled:opacity-30 transition-all'>
							<span>आगे बढ़ें ({selectedIds.length} चयनित)</span>
							<div className='p-1 bg-white/20 rounded-lg'>
								<ArrowRight className='w-4 h-4' />
							</div>
						</motion.button>
					)}
					{step === 'details' && (
						<motion.button
							whileTap={{ scale: 0.97 }}
							onClick={() =>
								validateDetailsStep()
									? setStep('review')
									: setUiMessage({ type: 'error', text: 'सभी विवरण सही से भरें' })
							}
							className='w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-indigo-200'>
							समीक्षा करें →
						</motion.button>
					)}
					{step === 'review' && (
						<motion.button
							whileTap={{ scale: 0.97 }}
							disabled={saving}
							onClick={submitLoans}
							className='w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-black text-base flex justify-center items-center gap-3 shadow-lg shadow-emerald-200 disabled:opacity-50'>
							{saving ? (
								<Loader2 className='animate-spin w-5 h-5' />
							) : (
								<>
									ऋण जारी करें
									<HandCoins className='w-5 h-5' />
								</>
							)}
						</motion.button>
					)}
				</div>
			</div>

			{/* Toast notification */}
			<AnimatePresence>
				{uiMessage && (
					<motion.div
						initial={{ y: 80, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 80, opacity: 0 }}
						className={`fixed bottom-28 inset-x-4 z-[60] max-w-xl mx-auto p-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
							uiMessage.type === 'error'
								? 'bg-red-50/95 border-red-200 text-red-800'
								: 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
						}`}>
						{uiMessage.type === 'error' ? (
							<div className='w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shrink-0'>
								<X className='w-3.5 h-3.5 text-white' />
							</div>
						) : (
							<CheckCircle2 className='w-6 h-6 text-emerald-500 shrink-0' />
						)}
						<p className='font-bold text-sm'>{uiMessage.text}</p>
						<button
							onClick={() => setUiMessage(null)}
							className='ml-auto text-slate-400 hover:text-slate-600'>
							<X className='w-4 h-4' />
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
