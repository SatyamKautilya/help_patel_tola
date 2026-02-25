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
	const safeHeaderFileName = encodeURIComponent(
		String(fileName || 'download.file'),
	);
	const prepareResp = await fetch('/api/download-jpeg', {
		method: 'POST',
		headers: {
			'Content-Type': blob.type || 'application/octet-stream',
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
			setMessage({
				type: 'error',
				text: e.message || 'रिपोर्ट डेटा लोड नहीं हुआ।',
			});
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

			setMessage({
				type: 'success',
				text: `रिपोर्ट जनरेट हो गई। Blob path: ${data?.storage?.pdfBlobPath || '-'}`,
			});
			await loadSnapshots();
			await openReportPreview({
				targetMonth: month,
				snapshotData: data?.snapshot || null,
			});
		} catch (e) {
			setMessage({
				type: 'error',
				text: e.message || 'रिपोर्ट जनरेट नहीं हुई।',
			});
		} finally {
			setLoading(false);
		}
	};

	const escapeHtml = (value) =>
		String(value ?? '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\"/g, '&quot;')
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
						<thead>
							<tr>
								<th style="border:1px solid #334155;padding:6px;text-align:left;width:36px;">क्र.</th>
								<th style="border:1px solid #334155;padding:6px;text-align:left;">सदस्य</th>
								<th style="border:1px solid #334155;padding:6px;text-align:left;">बचत</th>
								<th style="border:1px solid #334155;padding:6px;text-align:left;">लम्पसम</th>
								<th style="border:1px solid #334155;padding:6px;text-align:left;">बकाया ऋण</th>
							</tr>
						</thead>
						<tbody>
							${
								rows ||
								`<tr><td style="border:1px solid #334155;padding:6px;">1</td><td style="border:1px solid #334155;padding:6px;">-</td><td style="border:1px solid #334155;padding:6px;">-</td><td style="border:1px solid #334155;padding:6px;">-</td><td style="border:1px solid #334155;padding:6px;">-</td></tr>`
							}
						</tbody>
					</table>

					<h3 style="margin:14px 0 8px 0;font-size:14px;">SHG कुल सारांश</h3>
					<table style="width:100%;border-collapse:collapse;table-layout:fixed;font-size:11px;">
						<tbody>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल बचत</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalSavings))}</td></tr>
							<tr><td style="border:1px solid #334155;padding:6px;">कुल लम्पसम</td><td style="border:1px solid #334155;padding:6px;">${escapeHtml(formatMoney(totals.totalLumpSum))}</td></tr>
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
			wrapper.style.position = 'fixed';
			wrapper.style.left = '-10000px';
			wrapper.style.top = '0';
			wrapper.style.width = '760px';
			wrapper.style.zIndex = '-1';
			wrapper.innerHTML = buildSnapshotPdfHtml(snapshotPreview);
			document.body.appendChild(wrapper);

			const pdfRoot = wrapper.querySelector('.snapshot-pdf-root');
			if (!pdfRoot) {
				throw new Error('PDF टेम्पलेट तैयार नहीं हुआ');
			}

			const blob = await html2pdf()
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
				.from(pdfRoot)
				.outputPdf('blob');

			if (!blob) {
				throw new Error('PDF तैयार नहीं हुआ');
			}

			await triggerServerFileDownload(
				blob,
				`snapshot-${previewMonth || month}.pdf`,
			);
		} catch (e) {
			setMessage({
				type: 'error',
				text: e.message || 'PDF डाउनलोड नहीं हुआ।',
			});
		} finally {
			if (wrapper && wrapper.parentNode) {
				wrapper.parentNode.removeChild(wrapper);
			}
			setDownloadingPdf(false);
		}
	};

	const canPreviewReport = Boolean(snapshotPreview);
	const members = snapshotPreview?.memberWise || [];
	const totals = snapshotPreview?.shgTotals || {};

	return (
		<div className='min-h-screen bg-[#fafafa] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100 via-slate-50 to-emerald-100 p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-black text-slate-900'>
							मासिक स्नैपशॉट रिपोर्ट
						</h1>
						<p className='text-sm text-slate-600 mt-1'>
							हर SHG के लिए महीने का स्नैपशॉट जनरेट करें, रिपोर्ट देखें और A4
							PDF डाउनलोड करें।
						</p>
					</div>
					<button
						onClick={() => router.back()}
						className='p-3 rounded-2xl border border-slate-200 bg-white shadow-sm'>
						<ChevronLeft className='w-5 h-5 text-slate-700' />
					</button>
				</div>

				<div className='bg-white/85 border border-slate-200 rounded-2xl p-5 space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-3 items-end'>
						<div className='md:col-span-2'>
							<label className='text-xs uppercase tracking-wider font-black text-slate-500 mb-1 block'>
								माह चुनें
							</label>
							<div className='relative'>
								<CalendarDays className='w-4 h-4 absolute left-3 top-3 text-slate-500' />
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
						<button
							onClick={generateOnDemand}
							disabled={loading}
							className='inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-60'>
							<FileDown className='w-4 h-4' />
							{loading ? 'जनरेट हो रहा है...' : 'अभी जनरेट करें'}
						</button>
					</div>
				</div>

				<div className='bg-white/85 border border-slate-200 rounded-2xl p-5'>
					<div className='flex items-center justify-between mb-3'>
						<h2 className='text-lg font-bold text-slate-900'>सेव्ड स्नैपशॉट</h2>
						<button
							onClick={loadSnapshots}
							className='inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white'>
							<RefreshCw className='w-4 h-4' />
							रीफ्रेश
						</button>
					</div>
					{loadingList ? (
						<p className='text-sm text-slate-500'>लोड हो रहा है...</p>
					) : snapshots.length === 0 ? (
						<p className='text-sm text-slate-600'>
							अभी तक कोई स्नैपशॉट सेव नहीं है।
						</p>
					) : (
						<div className='space-y-2'>
							{snapshots.map((snap) => (
								<div
									key={snap.month}
									className='rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between gap-3'>
									<div>
										<p className='font-semibold text-slate-900'>{snap.month}</p>
										<p className='text-xs text-slate-600 mt-1'>
											Generated:{' '}
											{new Date(snap.generatedAt).toLocaleString('hi-IN')}
										</p>
									</div>
									<div className='text-right max-w-[58%]'>
										<p className='text-xs text-slate-600 break-all'>
											Blob path: {snap.path || '-'}
										</p>
										<button
											onClick={() =>
												openReportPreview({
													targetMonth: snap.month,
												})
											}
											disabled={loadingSnapshot}
											className='mt-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-60'>
											<FileText className='w-3.5 h-3.5' />
											रिपोर्ट देखें
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<AnimatePresence>
					{message ? (
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 6 }}
							className={`rounded-xl border p-3 text-sm ${
								message.type === 'success'
									? 'bg-emerald-50 border-emerald-300 text-emerald-900'
									: 'bg-red-50 border-red-300 text-red-900'
							}`}>
							{message.text}
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			<AnimatePresence>
				{showReportModal ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 overflow-y-auto'>
						<motion.div
							initial={{ opacity: 0, y: 20, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.98 }}
							className='max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden'>
							<div className='px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3'>
								<div>
									<h3 className='text-lg font-bold text-slate-900'>
										स्नैपशॉट रिपोर्ट
									</h3>
									<p className='text-xs text-slate-500'>
										HTML preview और A4 PDF डाउनलोड
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<button
										onClick={downloadSnapshotPdf}
										disabled={!canPreviewReport || downloadingPdf}
										className='inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 disabled:opacity-60'>
										<Download className='w-4 h-4' />
										{downloadingPdf ? 'PDF बन रहा है...' : 'PDF डाउनलोड'}
									</button>
									<button
										onClick={() => setShowReportModal(false)}
										className='p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50'>
										<X className='w-4 h-4' />
									</button>
								</div>
							</div>

							<div className='p-4 md:p-6 bg-slate-100'>
								{canPreviewReport ? (
									<div
										ref={reportRef}
										className='bg-white text-slate-900 rounded-xl border border-slate-200 p-6 space-y-5'>
										<div className='border border-slate-300 rounded-lg p-4'>
											<h4 className='text-xl font-black text-center'>
												मासिक SHG रिपोर्ट
											</h4>
											<div className='mt-2 text-sm flex flex-wrap items-center justify-between gap-2'>
												<p>
													समूह:{' '}
													<span className='font-semibold'>
														{snapshotPreview?.shgName || '-'}
													</span>
												</p>
												<p>
													माह:{' '}
													<span className='font-semibold'>
														{snapshotPreview?.month || previewMonth || '-'}
													</span>
												</p>
												<p>
													Generated:{' '}
													<span className='font-semibold'>
														{new Date(
															snapshotPreview?.generatedAt || Date.now(),
														).toLocaleString('hi-IN')}
													</span>
												</p>
											</div>
										</div>

										<div>
											<h5 className='text-base font-bold mb-2'>
												सदस्य-वार विवरण
											</h5>
											<div className='overflow-x-auto'>
												<table className='w-full border-collapse text-sm'>
													<thead>
														<tr className='bg-slate-100'>
															<th className='border border-slate-300 p-2 text-left'>
																क्र.
															</th>
															<th className='border border-slate-300 p-2 text-left'>
																सदस्य
															</th>
															<th className='border border-slate-300 p-2 text-left'>
																बचत
															</th>
															<th className='border border-slate-300 p-2 text-left'>
																लम्पसम
															</th>
															<th className='border border-slate-300 p-2 text-left'>
																बकाया ऋण
															</th>
														</tr>
													</thead>
													<tbody>
														{members.map((m, idx) => (
															<tr key={`${m.memberId || m.name || idx}-${idx}`}>
																<td className='border border-slate-300 p-2'>
																	{idx + 1}
																</td>
																<td className='border border-slate-300 p-2'>
																	{m.name || '-'}
																</td>
																<td className='border border-slate-300 p-2'>
																	{formatMoney(m.savings)}
																</td>
																<td className='border border-slate-300 p-2'>
																	{formatMoney(m.lumpSum)}
																</td>
																<td className='border border-slate-300 p-2'>
																	{formatMoney(m.outstandingLoan)}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>

										<div>
											<h5 className='text-base font-bold mb-2'>
												SHG कुल सारांश
											</h5>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm'>
												<div className='border border-slate-300 p-2 flex items-center justify-between'>
													<span>कुल बचत</span>
													<span className='font-semibold'>
														{formatMoney(totals.totalSavings)}
													</span>
												</div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'>
													<span>कुल लम्पसम</span>
													<span className='font-semibold'>
														{formatMoney(totals.totalLumpSum)}
													</span>
												</div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'>
													<span>कुल ब्याज</span>
													<span className='font-semibold'>
														{formatMoney(totals.totalInterest)}
													</span>
												</div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'>
													<span>कुल दंड</span>
													<span className='font-semibold'>
														{formatMoney(totals.totalPenalty)}
													</span>
												</div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'>
													<span>कुल बकाया ऋण</span>
													<span className='font-semibold'>
														{formatMoney(totals.totalOutstandingLoan)}
													</span>
												</div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'>
													<span>कुल खर्च</span>
													<span className='font-semibold'>
														{formatMoney(totals.totalExpense)}
													</span>
												</div>
												<div className='border border-slate-300 p-2 flex items-center justify-between md:col-span-2 bg-yellow-50'>
													<span className='font-bold'>कुल नकद</span>
													<span className='font-black'>
														{formatMoney(totals.totalCash)}
													</span>
												</div>
												<div className='border border-slate-300 p-2 flex items-center justify-between md:col-span-2 bg-emerald-50'>
													<span className='font-bold'>उपलब्ध नकद</span>
													<span className='font-black'>
														{formatMoney(totals.totalAvailableCash)}
													</span>
												</div>
											</div>
										</div>
									</div>
								) : (
									<p className='text-sm text-slate-600'>
										रिपोर्ट डेटा उपलब्ध नहीं है।
									</p>
								)}
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
