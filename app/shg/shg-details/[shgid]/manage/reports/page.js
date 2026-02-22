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
	ImageDown,
} from 'lucide-react';
import HindiMonthYearPicker from '@/components/HindiMonthYearPicker';

let html2canvasLoaderPromise = null;

function loadHtml2canvas() {
	if (typeof window === 'undefined') return Promise.reject(new Error('Window unavailable'));
	if (window.html2canvas) return Promise.resolve(window.html2canvas);
	if (html2canvasLoaderPromise) return html2canvasLoaderPromise;

	html2canvasLoaderPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
		script.async = true;
		script.onload = () => resolve(window.html2canvas);
		script.onerror = () => reject(new Error('html2canvas लोड नहीं हुआ'));
		document.head.appendChild(script);
	});

	return html2canvasLoaderPromise;
}

function formatMoney(value) {
	return `Rs ${Number(value || 0).toLocaleString('en-IN', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

export default function ReportsPage({ params }) {
	const { shgid } = params;
	const router = useRouter();
	const defaultMonth = useMemo(() => new Date().toISOString().slice(0, 7), []);

	const [month, setMonth] = useState(defaultMonth);
	const [loading, setLoading] = useState(false);
	const [loadingList, setLoadingList] = useState(true);
	const [loadingSnapshot, setLoadingSnapshot] = useState(false);
	const [downloadingJpeg, setDownloadingJpeg] = useState(false);
	const [snapshots, setSnapshots] = useState([]);
	const [message, setMessage] = useState(null);
	const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
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

	const openReportPreview = async ({ targetMonth, targetPdfUrl, snapshotData }) => {
		setLoadingSnapshot(true);
		setMessage(null);
		try {
			const snapshot = snapshotData || (await fetchSnapshotData(targetMonth));
			setSnapshotPreview(snapshot);
			setPdfPreviewUrl(targetPdfUrl || null);
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

			setMessage({
				type: 'success',
				text: `रिपोर्ट जनरेट हो गई। Blob path: ${data?.storage?.pdfBlobPath || '-'}`,
			});
			await loadSnapshots();
			await openReportPreview({
				targetMonth: month,
				targetPdfUrl: data?.storage?.proxyUrl || null,
				snapshotData: data?.snapshot || null,
			});
		} catch (e) {
			setMessage({ type: 'error', text: e.message || 'रिपोर्ट जनरेट नहीं हुई।' });
		} finally {
			setLoading(false);
		}
	};

	const downloadJpeg = async () => {
		if (!reportRef.current || !snapshotPreview) return;
		setDownloadingJpeg(true);
		setMessage(null);
		try {
			const html2canvas = await loadHtml2canvas();
			const canvas = await html2canvas(reportRef.current, {
				backgroundColor: '#ffffff',
				scale: 2,
				useCORS: true,
			});
			const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.95);
			const a = document.createElement('a');
			a.href = jpegDataUrl;
			a.download = `snapshot-${previewMonth || month}.jpg`;
			a.click();
		} catch (e) {
			setMessage({ type: 'error', text: e.message || 'JPEG डाउनलोड नहीं हुआ।' });
		} finally {
			setDownloadingJpeg(false);
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
						<h1 className='text-2xl font-black text-slate-900'>मासिक स्नैपशॉट रिपोर्ट</h1>
						<p className='text-sm text-slate-600 mt-1'>
							हर SHG के लिए महीने का स्नैपशॉट जनरेट करें, रिपोर्ट देखें और JPEG/PDF डाउनलोड करें।
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
					<p className='text-xs text-slate-500'>
						रिपोर्ट path: <code>shg-snapshots/&lt;shgId&gt;/&lt;YYYY-MM&gt;/snapshot.pdf</code>
					</p>
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
						<p className='text-sm text-slate-600'>अभी तक कोई स्नैपशॉट सेव नहीं है।</p>
					) : (
						<div className='space-y-2'>
							{snapshots.map((snap) => (
								<div
									key={snap.month}
									className='rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between gap-3'>
									<div>
										<p className='font-semibold text-slate-900'>{snap.month}</p>
										<p className='text-xs text-slate-600 mt-1'>
											Generated: {new Date(snap.generatedAt).toLocaleString('hi-IN')}
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
													targetPdfUrl: snap.proxyUrl || null,
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
									<h3 className='text-lg font-bold text-slate-900'>स्नैपशॉट रिपोर्ट</h3>
									<p className='text-xs text-slate-500'>HTML preview और JPEG/PDF डाउनलोड</p>
								</div>
								<div className='flex items-center gap-2'>
									<button
										onClick={downloadJpeg}
										disabled={!canPreviewReport || downloadingJpeg}
										className='inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 disabled:opacity-60'>
										<ImageDown className='w-4 h-4' />
										{downloadingJpeg ? 'JPEG बन रहा है...' : 'JPEG डाउनलोड'}
									</button>
									{pdfPreviewUrl ? (
										<a
											href={pdfPreviewUrl}
											download={`snapshot-${previewMonth || month}.pdf`}
											className='inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500'>
											<Download className='w-4 h-4' />
											PDF डाउनलोड
										</a>
									) : null}
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
											<h4 className='text-xl font-black text-center'>मासिक SHG रिपोर्ट</h4>
											<div className='mt-2 text-sm flex flex-wrap items-center justify-between gap-2'>
												<p>समूह: <span className='font-semibold'>{snapshotPreview?.shgName || '-'}</span></p>
												<p>माह: <span className='font-semibold'>{snapshotPreview?.month || previewMonth || '-'}</span></p>
												<p>Generated: <span className='font-semibold'>{new Date(snapshotPreview?.generatedAt || Date.now()).toLocaleString('hi-IN')}</span></p>
											</div>
										</div>

										<div>
											<h5 className='text-base font-bold mb-2'>सदस्य-वार विवरण</h5>
											<div className='overflow-x-auto'>
												<table className='w-full border-collapse text-sm'>
													<thead>
														<tr className='bg-slate-100'>
															<th className='border border-slate-300 p-2 text-left'>क्र.</th>
															<th className='border border-slate-300 p-2 text-left'>सदस्य</th>
															<th className='border border-slate-300 p-2 text-left'>बचत</th>
															<th className='border border-slate-300 p-2 text-left'>लम्पसम</th>
															<th className='border border-slate-300 p-2 text-left'>बकाया ऋण</th>
														</tr>
													</thead>
													<tbody>
														{members.map((m, idx) => (
															<tr key={`${m.memberId || m.name || idx}-${idx}`}>
																<td className='border border-slate-300 p-2'>{idx + 1}</td>
																<td className='border border-slate-300 p-2'>{m.name || '-'}</td>
																<td className='border border-slate-300 p-2'>{formatMoney(m.savings)}</td>
																<td className='border border-slate-300 p-2'>{formatMoney(m.lumpSum)}</td>
																<td className='border border-slate-300 p-2'>{formatMoney(m.outstandingLoan)}</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>

										<div>
											<h5 className='text-base font-bold mb-2'>SHG कुल सारांश</h5>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm'>
												<div className='border border-slate-300 p-2 flex items-center justify-between'><span>कुल बचत</span><span className='font-semibold'>{formatMoney(totals.totalSavings)}</span></div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'><span>कुल लम्पसम</span><span className='font-semibold'>{formatMoney(totals.totalLumpSum)}</span></div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'><span>कुल ब्याज</span><span className='font-semibold'>{formatMoney(totals.totalInterest)}</span></div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'><span>कुल दंड</span><span className='font-semibold'>{formatMoney(totals.totalPenalty)}</span></div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'><span>कुल बकाया ऋण</span><span className='font-semibold'>{formatMoney(totals.totalOutstandingLoan)}</span></div>
												<div className='border border-slate-300 p-2 flex items-center justify-between'><span>कुल खर्च</span><span className='font-semibold'>{formatMoney(totals.totalExpense)}</span></div>
												<div className='border border-slate-300 p-2 flex items-center justify-between md:col-span-2 bg-emerald-50'><span className='font-bold'>उपलब्ध नकद</span><span className='font-black'>{formatMoney(totals.totalAvailableCash)}</span></div>
											</div>
										</div>
									</div>
								) : (
									<p className='text-sm text-slate-600'>रिपोर्ट डेटा उपलब्ध नहीं है।</p>
								)}
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
