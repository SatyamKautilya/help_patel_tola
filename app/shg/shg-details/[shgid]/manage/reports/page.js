'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ChevronLeft,
	FileDown,
	RefreshCw,
	CalendarDays,
	Cloud,
	Download,
	ExternalLink,
	X,
} from 'lucide-react';
import HindiMonthYearPicker from '@/components/HindiMonthYearPicker';

export default function ReportsPage({ params }) {
	const { shgid } = params;
	const router = useRouter();
	const defaultMonth = useMemo(() => new Date().toISOString().slice(0, 7), []);

	const [month, setMonth] = useState(defaultMonth);
	const [loading, setLoading] = useState(false);
	const [loadingList, setLoadingList] = useState(true);
	const [snapshots, setSnapshots] = useState([]);
	const [message, setMessage] = useState(null);
	const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
	const [showPdfModal, setShowPdfModal] = useState(false);

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

			const nextPdfUrl = data?.storage?.cloudUrl || null;
			setMessage({
				type: 'success',
				text: `??????? ????? ?? ??? Cloud URL: ${nextPdfUrl || '-'}`,
			});
			if (nextPdfUrl) {
				setPdfPreviewUrl(nextPdfUrl);
				setShowPdfModal(true);
			}
			await loadSnapshots();
		} catch (e) {
			setMessage({ type: 'error', text: e.message || '??????? ????? ???? ????' });
		} finally {
			setLoading(false);
		}
	};

	const canPreviewPdf = pdfPreviewUrl && /^https?:\/\//i.test(pdfPreviewUrl);

	return (
		<div className='min-h-screen bg-[#fafafa] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100 via-slate-50 to-emerald-100 p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-black text-slate-900'>????? ???????? ???????</h1>
						<p className='text-sm text-slate-600 mt-1'>
							?? SHG ?? ??? ????? ?? PDF ???????? ?????/????? ?????
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
								??? ?????
							</label>
							<div className='relative'>
								<CalendarDays className='w-4 h-4 absolute left-3 top-3 text-slate-500' />
								<div className='pl-9'>
									<HindiMonthYearPicker
										value={month}
										onChange={setMonth}
										id='snapshot-month'
										label='??? ?? ???? ?????'
									/>
								</div>
							</div>
						</div>
						<button
							onClick={generateOnDemand}
							disabled={loading}
							className='inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-60'>
							<FileDown className='w-4 h-4' />
							{loading ? '????? ?? ??? ??...' : '??? ????? ????'}
						</button>
					</div>
					<p className='text-xs text-slate-500'>
						??????? path: <code>shg-snapshots/&lt;shgId&gt;/&lt;YYYY-MM&gt;/snapshot.pdf</code>
					</p>
				</div>

				<div className='bg-white/85 border border-slate-200 rounded-2xl p-5'>
					<div className='flex items-center justify-between mb-3'>
						<h2 className='text-lg font-bold text-slate-900'>????? ????????</h2>
						<button
							onClick={loadSnapshots}
							className='inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white'>
							<RefreshCw className='w-4 h-4' />
							???????
						</button>
					</div>
					{loadingList ? (
						<p className='text-sm text-slate-500'>??? ?? ??? ??...</p>
					) : snapshots.length === 0 ? (
						<p className='text-sm text-slate-600'>??? ?? ??? ???????? ??? ???? ???</p>
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
									<div className='text-right max-w-[52%]'>
										<p className='text-xs text-slate-600 inline-flex items-center gap-1 break-all'>
											<Cloud className='w-3.5 h-3.5 shrink-0' />
											{snap.cloudUrl}
										</p>
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
				{showPdfModal ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4'>
						<motion.div
							initial={{ opacity: 0, y: 20, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.98 }}
							className='max-w-6xl h-[90vh] mx-auto bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col'>
							<div className='px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3'>
								<div>
									<h3 className='text-lg font-bold text-slate-900'>PDF ???????</h3>
									<p className='text-xs text-slate-500'>????? ??????? ????? ?? ??????? ????</p>
								</div>
								<div className='flex items-center gap-2'>
									{canPreviewPdf ? (
										<>
											<a
												href={pdfPreviewUrl}
												target='_blank'
												rel='noreferrer'
												className='inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
												<ExternalLink className='w-4 h-4' />
												?? ??? ???
											</a>
											<a
												href={pdfPreviewUrl}
												download={`snapshot-${month}.pdf`}
												className='inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500'>
												<Download className='w-4 h-4' />
												???????
											</a>
										</>
									) : null}
									<button
										onClick={() => setShowPdfModal(false)}
										className='p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50'>
										<X className='w-4 h-4' />
									</button>
								</div>
							</div>

							<div className='flex-1 bg-slate-100'>
								{canPreviewPdf ? (
									<iframe title='snapshot-pdf-preview' src={pdfPreviewUrl} className='w-full h-full border-0' />
								) : (
									<div className='h-full flex items-center justify-center px-6 text-center'>
										<div>
											<p className='text-sm text-slate-700 font-semibold'>
												?? environment ??? direct PDF preview ?????? ???? ???
											</p>
											<p className='text-xs text-slate-500 mt-2 break-all'>URL: {pdfPreviewUrl || '-'}</p>
										</div>
									</div>
								)}
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
