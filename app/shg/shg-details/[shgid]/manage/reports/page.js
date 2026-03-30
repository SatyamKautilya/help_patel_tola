'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ChevronLeft,
	FileDown,
	RefreshCw,
	CalendarDays,
	Download,
	X,
	FileText,
} from 'lucide-react';
import HindiMonthYearPicker from '@/components/HindiMonthYearPicker';

function formatMoney(value) {
	return `Rs ${Number(value || 0).toLocaleString('en-IN', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

async function triggerServerFileDownload(blob, fileName) {
	const safeHeaderFileName = encodeURIComponent(String(fileName || 'download.file'));
	const prepareResp = await fetch('/api/download-jpeg', {
		method: 'POST',
		headers: {
			'Content-Type': blob.type || 'application/octet-stream',
			'x-file-name': safeHeaderFileName,
		},
		body: blob,
	});
	if (!prepareResp.ok) throw new Error('डाउनलोड तैयार नहीं हो सका');
	const prepared = await prepareResp.json();
	const url = prepared?.downloadUrl;
	if (!url) throw new Error('डाउनलोड URL नहीं मिला');
	window.location.assign(url);
}

export default function ReportsPage({ params }) {
	const { shgid } = params;
	const router = useRouter();
	const defaultMonth = useMemo(() => new Date().toISOString().slice(0, 7), []);

	const [month, setMonth] = useState(defaultMonth);
	const [loading, setLoading] = useState(false);
	const [loadingList, setLoadingList] = useState(true);
	const [loadingSnapshot, setLoadingSnapshot] = useState(false);
	const [downloadingPdf, setDownloadingPdf] = useState(false);
	const [downloadingTxnPdf, setDownloadingTxnPdf] = useState(false);
	const [snapshots, setSnapshots] = useState([]);
	const [message, setMessage] = useState(null);
	const [snapshotPreview, setSnapshotPreview] = useState(null);
	const [previewMonth, setPreviewMonth] = useState(null);
	const [showReportModal, setShowReportModal] = useState(false);
	const reportRef = useRef(null);

	const loadSnapshots = async () => {
		setLoadingList(true);
		try {
			const resp = await fetch('/api/shg?name=list-shg-snapshots', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ shgId: shgid }),
			});
			const data = await resp.json();
			setSnapshots(data.snapshots || []);
		} finally {
			setLoadingList(false);
		}
	};

	useEffect(() => {
		loadSnapshots();
	}, [shgid]);

	const fetchSnapshotData = async (targetMonth) => {
		const resp = await fetch('/api/shg?name=get-shg-snapshot-data', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ shgId: shgid, month: targetMonth }),
		});
		const data = await resp.json();
		if (!resp.ok) throw new Error(data?.error || 'Snapshot data नहीं मिला');
		return data?.snapshot;
	};

	const openReportPreview = async ({ targetMonth, snapshotData }) => {
		setLoadingSnapshot(true);
		setMessage(null);
		try {
			const snapshot = snapshotData || (await fetchSnapshotData(targetMonth));
			setSnapshotPreview(snapshot);
			setPreviewMonth(targetMonth);
			setShowReportModal(true);
		} catch (e) {
			setMessage({ type: 'error', text: e.message || 'रिपोर्ट डेटा लोड नहीं हुआ।' });
		} finally {
			setLoadingSnapshot(false);
		}
	};

	const generateOnDemand = async () => {
		setLoading(true);
		setMessage(null);
		try {
			const resp = await fetch('/api/shg?name=generate-shg-snapshot', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ shgId: shgid, month }),
			});
			const data = await resp.json();
			if (!resp.ok) throw new Error(data?.error || 'Failed to generate');
			setMessage({ type: 'success', text: `रिपोर्ट जनरेट हो गई।` });
			await loadSnapshots();
			await openReportPreview({ targetMonth: month, snapshotData: data?.snapshot || null });
		} catch (e) {
			setMessage({ type: 'error', text: e.message || 'रिपोर्ट जनरेट नहीं हुई।' });
		} finally {
			setLoading(false);
		}
	};

	const escapeHtml = (value) =>
		String(value ?? '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');

	const buildSnapshotPdfHtml = (snapshot) => {
		const rows = (snapshot?.memberWise || [])
			.map(
				(member, idx) => `
				<tr>
					<td style="border:1px solid #334155;padding:6px;">${idx + 1}</td>
					<td style="border:1px solid #334155;padding:6px;">${escapeHtml(member?.name || '-')}</td>
					<td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(member?.savings))}</td>
					<td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(member?.lumpSum))}</td>
					<td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(member?.outstandingLoan))}</td>
				</tr>
			`,
			)
			.join('');
		const totals = snapshot?.shgTotals || {};
		return `
			<div class="snapshot-pdf-root" style="width:760px;background:#ffffff;color:#0f172a;padding:10px;font-family:'Noto Sans Devanagari','Mangal',sans-serif;box-sizing:border-box;overflow:hidden;">
				<div style="border:2px solid #334155;padding:14px;box-sizing:border-box;">
					<h1 style="margin:0;text-align:center;font-size:24px;font-weight:800;">मासिक SHG रिपोर्ट</h1>
					<div style="margin-top:8px;display:flex;gap:8px;justify-content:space-between;flex-wrap:wrap;font-size:12px;">
						<p style="margin:0;">समूह: <strong>${escapeHtml(snapshot?.shgName || '-')}</strong></p>
						<p style="margin:0;">माह: <strong>${escapeHtml(snapshot?.month || previewMonth || month || '-')}</strong></p>
						<p style="margin:0;">Generated: <strong>${escapeHtml(new Date(snapshot?.generatedAt || Date.now()).toLocaleString('hi-IN'))}</strong></p>
					</div>
					<h3 style="margin:14px 0 8px 0;font-size:14px;">सदस्य-वार विवरण</h3>
					<table style="width:100%;border-collapse:collapse;table-layout:fixed;font-size:11px;">
						<thead><tr>
							<th style="border:1px solid #334155;padding:6px;text-align:left;width:36px;">क्र.</th>
							<th style="border:1px solid #334155;padding:6px;text-align:left;">सदस्य</th>
							<th style="border:1px solid #334155;padding:6px;text-align:left;">बचत</th>
							<th style="border:1px solid #334155;padding:6px;text-align:left;">शेयर राशि</th>
							<th style="border:1px solid #334155;padding:6px;text-align:left;">बकाया ऋण</th>
						</tr></thead>
						<tbody>${rows || `<tr><td style="border:1px solid #334155;padding:6px;">1</td><td style="border:1px solid #334155;padding:6px;">-</td><td style="border:1px solid #334155;padding:6px;">-</td><td style="border:1px solid #334155;padding:6px;">-</td><td style="border:1px solid #334155;padding:6px;">-</td></tr>`}</tbody>
					</table>
					<h3 style="margin:14px 0 8px 0;font-size:14px;">SHG कुल सारांश</h3>
					<table style="width:100%;border-collapse:collapse;table-layout:fixed;font-size:11px;">
						<tbody>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल बचत</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalSavings))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल शेयर राशि</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalLumpSum))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल ब्याज</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalInterest))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल दंड</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalPenalty))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल बकाया ऋण</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalOutstandingLoan))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल खर्च</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalExpense))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;font-weight:800;background:#fef9c3;">कुल नकद</td><td style="border:1px solid #334155;padding:6px;font-weight:800;background:#fef9c3;">${escapeHtml(formatMoney(totals.totalCash))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;font-weight:800;background:#ecfdf5;">उपलब्ध नकद</td><td style="border:1px solid #334155;padding:6px;font-weight:800;background:#ecfdf5;">${escapeHtml(formatMoney(totals.totalAvailableCash))}</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		`;
	};

	const downloadSnapshotPdf = async () => {
		if (!snapshotPreview) return;
		setDownloadingPdf(true);
		setMessage(null);
		let wrapper = null;
		try {
			const html2pdfModule = await import('html2pdf.js');
			const html2pdf = html2pdfModule.default || html2pdfModule;
			wrapper = document.createElement('div');
			wrapper.style.cssText = 'position:fixed;left:-10000px;top:0;width:760px;z-index:-1;';
			wrapper.innerHTML = buildSnapshotPdfHtml(snapshotPreview);
			document.body.appendChild(wrapper);
			const pdfRoot = wrapper.querySelector('.snapshot-pdf-root');
			if (!pdfRoot) throw new Error('PDF टेम्पलेट तैयार नहीं हुआ');
			const blob = await html2pdf()
				.set({ margin: [2, 2, 2, 2], image: { type: 'jpeg', quality: 0.95 }, html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } })
				.from(pdfRoot).outputPdf('blob');
			if (!blob) throw new Error('PDF तैयार नहीं हुआ');
			await triggerServerFileDownload(blob, `snapshot-${previewMonth || month}.pdf`);
		} catch (e) {
			setMessage({ type: 'error', text: e.message || 'PDF डाउनलोड नहीं हुआ।' });
		} finally {
			if (wrapper?.parentNode) wrapper.parentNode.removeChild(wrapper);
			setDownloadingPdf(false);
		}
	};

	const txTypeMap = {
		MONTHLY_DEPOSIT: 'मासिक बचत',
		LUMP_SUM_CONTRIBUTION: 'शेयर राशि',
		LOAN_DISBURSEMENT: 'ऋण वितरण',
		LOAN_REPAYMENT: 'ऋण भुगतान',
		INTEREST_PAYMENT: 'ब्याज भुगतान',
		BANK_LOAN_RECEIVED: 'बैंक ऋण प्राप्त',
		BANK_LOAN_REPAYMENT: 'बैंक ऋण भुगतान',
		OPENING_BALANCE: 'प्रारंभिक शेष',
		PENALTY_CHARGE: 'दंड शुल्क',
	};

	const buildTransactionPdfHtml = (transactions, monthStr, shgNameStr) => {
		const rows = transactions
			.map((tx, idx) => {
				const txDate = new Date(tx.date).toLocaleDateString('hi-IN');
				const txType = txTypeMap[tx.type] || tx.type;
				const memberName = tx.memberName && tx.memberName !== '-' ? tx.memberName : 'संस्था';
				return `
				<tr>
					<td style="border:1px solid #334155;padding:6px;text-align:center;">${idx + 1}</td>
					<td style="border:1px solid #334155;padding:6px;">${escapeHtml(txDate)}</td>
					<td style="border:1px solid #334155;padding:6px;">${escapeHtml(memberName)}</td>
					<td style="border:1px solid #334155;padding:6px;">${escapeHtml(txType)}</td>
					<td style="border:1px solid #334155;padding:6px;text-align:right;">${escapeHtml(formatMoney(tx.amount))}</td>
				</tr>
			`;
			})
			.join('');
		const totalAmount = transactions.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
		return `
			<div class="transaction-pdf-root" style="width:760px;background:#ffffff;color:#0f172a;padding:10px;font-family:'Noto Sans Devanagari','Mangal',sans-serif;box-sizing:border-box;overflow:hidden;">
				<div style="border:2px solid #334155;padding:14px;box-sizing:border-box;">
					<h1 style="margin:0;text-align:center;font-size:24px;font-weight:800;">मासिक लेन-देन रिपोर्ट</h1>
					<div style="margin-top:8px;display:flex;gap:8px;justify-content:space-between;flex-wrap:wrap;font-size:12px;">
						<p style="margin:0;">समूह: <strong>${escapeHtml(shgNameStr || '-')}</strong></p>
						<p style="margin:0;">माह: <strong>${escapeHtml(monthStr || '-')}</strong></p>
						<p style="margin:0;">Generated: <strong>${escapeHtml(new Date().toLocaleString('hi-IN'))}</strong></p>
					</div>
					<h3 style="margin:14px 0 8px 0;font-size:14px;">लेन-देन विवरण</h3>
					<table style="width:100%;border-collapse:collapse;table-layout:fixed;font-size:11px;">
						<thead><tr style="background:#f8fafc;">
							<th style="border:1px solid #334155;padding:6px;text-align:center;width:40px;">क्र.</th>
							<th style="border:1px solid #334155;padding:6px;text-align:left;width:80px;">दिनांक</th>
							<th style="border:1px solid #334155;padding:6px;text-align:left;">सदस्य / विवरण</th>
							<th style="border:1px solid #334155;padding:6px;text-align:left;">प्रकार</th>
							<th style="border:1px solid #334155;padding:6px;text-align:right;">राशि</th>
						</tr></thead>
						<tbody>${rows || `<tr><td colspan="5" style="border:1px solid #334155;padding:6px;text-align:center;">इस माह कोई लेन-देन नहीं हुआ</td></tr>`}</tbody>
					</table>
					<div style="margin-top:14px;text-align:right;font-size:12px;font-weight:bold;">
						कुल लेनदेन राशि: ${escapeHtml(formatMoney(totalAmount))}
					</div>
				</div>
			</div>
		`;
	};

	const downloadTransactionPdf = async () => {
		if (!snapshotPreview) return;
		setDownloadingTxnPdf(true);
		setMessage(null);
		let wrapper = null;
		try {
			const resp = await fetch('/api/shg?name=list-monthly-transactions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ shgId: shgid, month: previewMonth || month }),
			});
			const data = await resp.json();
			if (!resp.ok) throw new Error(data?.error || 'लेन-देन डेटा नहीं मिला');
			const txns = data.transactions || [];
			const html2pdfModule = await import('html2pdf.js');
			const html2pdf = html2pdfModule.default || html2pdfModule;
			wrapper = document.createElement('div');
			wrapper.style.cssText = 'position:fixed;left:-10000px;top:0;width:760px;z-index:-1;';
			wrapper.innerHTML = buildTransactionPdfHtml(txns, previewMonth || month, snapshotPreview?.shgName);
			document.body.appendChild(wrapper);
			const pdfRoot = wrapper.querySelector('.transaction-pdf-root');
			if (!pdfRoot) throw new Error('PDF टेम्पलेट तैयार नहीं हुआ');
			const blob = await html2pdf()
				.set({ margin: [2, 2, 2, 2], image: { type: 'jpeg', quality: 0.95 }, html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } })
				.from(pdfRoot).outputPdf('blob');
			if (!blob) throw new Error('PDF तैयार नहीं हुआ');
			await triggerServerFileDownload(blob, `transactions-${previewMonth || month}.pdf`);
		} catch (e) {
			setMessage({ type: 'error', text: e.message || 'PDF डाउनलोड नहीं हुआ।' });
		} finally {
			if (wrapper?.parentNode) wrapper.parentNode.removeChild(wrapper);
			setDownloadingTxnPdf(false);
		}
	};

	const canPreviewReport = Boolean(snapshotPreview);
	const members = snapshotPreview?.memberWise || [];
	const totals = snapshotPreview?.shgTotals || {};

	return (
		<div className='min-h-screen bg-[#f1f5fb] pb-24 overflow-x-hidden'>
			{/* Background blobs */}
			<div className='fixed top-[-15%] right-[-15%] w-[55%] h-[45%] bg-sky-200/25 rounded-full blur-[110px] pointer-events-none' />
			<div className='fixed bottom-[-10%] left-[-10%] w-[50%] h-[40%] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none' />

			{/* Header */}
			<div className='sticky top-0 z-20 backdrop-blur-md bg-white/50 border-b border-white/40 px-5 pt-7 pb-4'>
				<div className='max-w-xl mx-auto flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-200'>
							<FileText className='w-5 h-5 text-white' />
						</div>
						<div>
							<p className='text-[10px] font-black tracking-[0.2em] text-sky-500 uppercase leading-none'>
								रिपोर्ट
							</p>
							<h1 className='text-xl font-extrabold text-slate-900 tracking-tight leading-tight'>
								मासिक{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600'>
									स्नैपशॉट
								</span>
							</h1>
						</div>
					</div>
					<motion.button
						whileTap={{ scale: 0.85 }}
						onClick={() => router.back()}
						className='p-2.5 bg-white/80 backdrop-blur rounded-2xl shadow border border-white/60'>
						<ChevronLeft className='w-5 h-5 text-slate-600' />
					</motion.button>
				</div>
			</div>

			<main className='max-w-xl mx-auto px-4 pt-5 space-y-5'>
				{/* Generate card */}
				<div className='bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4'>
					<div>
						<p className='text-sm font-black text-slate-800'>नया स्नैपशॉट जनरेट करें</p>
						<p className='text-xs text-slate-400 mt-0.5'>माह चुनें और रिपोर्ट बनाएं</p>
					</div>

					<div className='flex items-end gap-3'>
						<div className='flex-1 space-y-1.5'>
							<label className='text-[10px] font-black text-slate-400 uppercase tracking-wider'>
								माह चुनें
							</label>
							<div className='relative'>
								<CalendarDays className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
								<div className='pl-9'>
									<HindiMonthYearPicker
										value={month}
										onChange={setMonth}
										id='snapshot-month'
										label='माह और वर्ष चुनें'
									/>
								</div>
							</div>
						</div>

						<motion.button
							whileTap={{ scale: 0.95 }}
							onClick={generateOnDemand}
							disabled={loading}
							className='flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-md shadow-sky-200 disabled:opacity-60 shrink-0 whitespace-nowrap'>
							<FileDown className='w-4 h-4' />
							{loading ? 'जनरेट...' : 'जनरेट करें'}
						</motion.button>
					</div>

					<AnimatePresence>
						{message && (
							<motion.div
								initial={{ opacity: 0, y: 4 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 4 }}
								className={`rounded-2xl px-4 py-3 text-sm flex items-start gap-2 ${message.type === 'success'
										? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
										: 'bg-red-50 border border-red-200 text-red-800'
									}`}>
								<span className='flex-1'>{message.text}</span>
								<button onClick={() => setMessage(null)} className='shrink-0 mt-0.5'>
									<X className='w-3.5 h-3.5' />
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Saved snapshots */}
				<div className='bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden'>
					<div className='flex items-center justify-between px-5 pt-5 pb-3'>
						<div>
							<p className='text-sm font-black text-slate-800'>सेव्ड स्नैपशॉट</p>
							<p className='text-xs text-slate-400 mt-0.5'>पुरानी रिपोर्ट देखें या PDF डाउनलोड करें</p>
						</div>
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={loadSnapshots}
							disabled={loadingList}
							className='p-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-50 transition-colors'>
							<RefreshCw className={`w-4 h-4 ${loadingList ? 'animate-spin' : ''}`} />
						</motion.button>
					</div>

					{loadingList ? (
						<div className='flex items-center justify-center py-12 gap-3'>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
								className='w-8 h-8 border-[3px] border-sky-200 border-t-sky-600 rounded-full'
							/>
							<p className='text-sm text-slate-400 font-semibold'>लोड हो रहा है...</p>
						</div>
					) : snapshots.length === 0 ? (
						<div className='px-5 pb-8 text-center'>
							<div className='w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3 mt-2'>
								<FileText className='w-7 h-7 text-slate-300' />
							</div>
							<p className='text-sm font-semibold text-slate-400'>
								अभी तक कोई स्नैपशॉट सेव नहीं है
							</p>
						</div>
					) : (
						<div className='divide-y divide-slate-100'>
							{snapshots.map((snap, i) => (
								<motion.div
									key={snap.month}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.04 }}
									className='flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors'>
									<div className='flex items-center gap-3'>
										<div className='w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 flex flex-col items-center justify-center shrink-0'>
											<p className='text-[9px] font-black text-sky-600 uppercase tracking-wide leading-none'>
												{snap.month?.split('-')[0]}
											</p>
											<p className='text-[13px] font-black text-indigo-700 leading-none mt-0.5'>
												{snap.month?.split('-')[1]}
											</p>
										</div>
										<div>
											<p className='text-sm font-black text-slate-800'>{snap.month}</p>
											<p className='text-[10px] text-slate-400 mt-0.5'>
												{new Date(snap.generatedAt).toLocaleDateString('hi-IN', {
													day: '2-digit', month: 'short', year: 'numeric',
												})}
											</p>
										</div>
									</div>

									<motion.button
										whileTap={{ scale: 0.93 }}
										onClick={() => openReportPreview({ targetMonth: snap.month })}
										disabled={loadingSnapshot}
										className='flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-black text-[10px] uppercase tracking-wider shadow-sm shadow-sky-200 disabled:opacity-60'>
										{loadingSnapshot ? (
											<RefreshCw className='w-3.5 h-3.5 animate-spin' />
										) : (
											<FileText className='w-3.5 h-3.5' />
										)}
										देखें
									</motion.button>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</main>

			{/* Full-screen Report Modal */}
			<AnimatePresence>
				{showReportModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col'>

						{/* Modal header */}
						<div className='bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between gap-3 shrink-0'>
							<div>
								<p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
									{snapshotPreview?.shgName || '-'} · {previewMonth || month}
								</p>
								<h3 className='text-base font-black text-slate-900'>स्नैपशॉट रिपोर्ट</h3>
							</div>
							<button
								onClick={() => setShowReportModal(false)}
								className='p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50'>
								<X className='w-4 h-4' />
							</button>
						</div>

						{/* Modal scrollable body */}
						<div className='flex-1 overflow-y-auto bg-slate-50 px-4 py-5 space-y-4'>
							{canPreviewReport ? (
								<>
									{/* Meta info */}
									<div className='bg-white rounded-2xl border border-slate-100 px-5 py-4 flex flex-wrap gap-x-6 gap-y-3'>
										{[
											{ label: 'समूह', value: snapshotPreview?.shgName || '-' },
											{ label: 'माह', value: snapshotPreview?.month || previewMonth || '-' },
											{ label: 'जनरेट किया', value: new Date(snapshotPreview?.generatedAt || Date.now()).toLocaleDateString('hi-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
										].map(({ label, value }) => (
											<div key={label}>
												<p className='text-[10px] font-black text-slate-400 uppercase tracking-wider'>{label}</p>
												<p className='font-black text-slate-800 mt-0.5 text-sm'>{value}</p>
											</div>
										))}
									</div>

									{/* Member-wise table */}
									<div className='bg-white rounded-2xl border border-slate-100 overflow-hidden'>
										<div className='px-5 py-3 border-b border-slate-100'>
											<p className='text-sm font-black text-slate-800'>सदस्य-वार विवरण</p>
										</div>
										<div className='overflow-x-auto'>
											<table className='w-full text-sm border-collapse'>
												<thead>
													<tr className='bg-slate-50'>
														{['क्र.', 'सदस्य', 'बचत', 'शेयर राशि', 'बकाया ऋण'].map((h) => (
															<th key={h} className='border-b border-slate-200 px-4 py-2.5 text-left text-[11px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap'>
																{h}
															</th>
														))}
													</tr>
												</thead>
												<tbody>
													{members.map((m, idx) => (
														<tr key={`${m.memberId || m.name || idx}-${idx}`} className='border-b border-slate-100 hover:bg-slate-50/60'>
															<td className='px-4 py-2.5 text-slate-400 text-xs font-bold'>{idx + 1}</td>
															<td className='px-4 py-2.5 font-semibold text-slate-800'>{m.name || '-'}</td>
															<td className='px-4 py-2.5 text-slate-700'>{formatMoney(m.savings)}</td>
															<td className='px-4 py-2.5 text-slate-700'>{formatMoney(m.lumpSum)}</td>
															<td className='px-4 py-2.5 text-rose-700 font-semibold'>{formatMoney(m.outstandingLoan)}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>

									{/* SHG Totals */}
									<div className='bg-white rounded-2xl border border-slate-100 overflow-hidden'>
										<div className='px-5 py-3 border-b border-slate-100'>
											<p className='text-sm font-black text-slate-800'>समूह कुल सारांश</p>
										</div>
										<div className='divide-y divide-slate-100'>
											{[
												{ label: 'कुल बचत', value: totals.totalSavings },
												{ label: 'कुल शेयर राशि', value: totals.totalLumpSum },
												{ label: 'कुल ब्याज', value: totals.totalInterest },
												{ label: 'कुल दंड', value: totals.totalPenalty },
												{ label: 'कुल बकाया ऋण', value: totals.totalOutstandingLoan, accent: 'text-rose-700' },
												{ label: 'कुल खर्च', value: totals.totalExpense },
											].map(({ label, value, accent }) => (
												<div key={label} className='flex items-center justify-between px-5 py-3'>
													<span className='text-sm text-slate-600'>{label}</span>
													<span className={`text-sm font-bold ${accent || 'text-slate-800'}`}>{formatMoney(value)}</span>
												</div>
											))}
											<div className='flex items-center justify-between px-5 py-3 bg-amber-50'>
												<span className='text-sm font-bold text-amber-800'>कुल नकद</span>
												<span className='text-sm font-black text-amber-900'>{formatMoney(totals.totalCash)}</span>
											</div>
											<div className='flex items-center justify-between px-5 py-3 bg-emerald-50'>
												<span className='text-sm font-bold text-emerald-800'>उपलब्ध नकद</span>
												<span className='text-sm font-black text-emerald-900'>{formatMoney(totals.totalAvailableCash)}</span>
											</div>
										</div>
									</div>
								</>
							) : (
								<div className='flex flex-col items-center justify-center py-20 text-center'>
									<FileText className='w-12 h-12 text-slate-200 mb-3' />
									<p className='text-sm text-slate-400'>रिपोर्ट डेटा उपलब्ध नहीं है।</p>
								</div>
							)}
						</div>

						{/* Sticky bottom download bar */}
						<div className='shrink-0 border-t border-slate-100 bg-white/80 backdrop-blur-md px-4 py-3'>
							<div className='grid grid-cols-2 gap-3'>
								<motion.button
									whileTap={{ scale: 0.96 }}
									onClick={downloadTransactionPdf}
									disabled={!canPreviewReport || downloadingTxnPdf}
									className='flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-indigo-200 disabled:opacity-50'>
									<FileText className='w-4 h-4' />
									{downloadingTxnPdf ? 'लोड हो रहा...' : 'लेन-देन PDF'}
								</motion.button>
								<motion.button
									whileTap={{ scale: 0.96 }}
									onClick={downloadSnapshotPdf}
									disabled={!canPreviewReport || downloadingPdf}
									className='flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-200 disabled:opacity-50'>
									<Download className='w-4 h-4' />
									{downloadingPdf ? 'बन रहा है...' : 'स्नैपशॉट PDF'}
								</motion.button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
