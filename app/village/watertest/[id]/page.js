'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ArrowLeft,
	Eye,
	X,
	Printer,
	CheckCircle,
	AlertCircle,
	XCircle,
} from 'lucide-react';
import waterTestData from '../../watertest.json';

const getStatusColor = (drinkable) => {
	if (drinkable.includes('योग्य है')) {
		return {
			bg: 'bg-green-50',
			border: 'border-green-300',
			badge: 'bg-green-100 text-green-800',
			icon: CheckCircle,
			color: 'text-green-600',
			fullBg: 'bg-green-600',
			label: '✓ पीने योग्य है',
		};
	}
	if (drinkable.includes('सीमित')) {
		return {
			bg: 'bg-amber-200',
			border: 'border-amber-400',
			badge: 'bg-amber-200 text-amber-900',
			icon: AlertCircle,
			color: 'text-amber-700',
			fullBg: 'bg-amber-500',
			label: '⚠️ सीमित उपयोग',
		};
	}
	return {
		bg: 'bg-red-200',
		border: 'border-red-400',
		badge: 'bg-red-200 text-red-900',
		icon: XCircle,
		color: 'text-red-700',
		fullBg: 'bg-red-600',
		label: '✗ असुरक्षित',
	};
};

const getParameterStatus = (paramName, value) => {
	// Returns: 'good' (green), 'warning' (yellow), 'danger' (red)
	const ranges = {
		'पीएच स्तर': { min: 6.5, max: 8.5, warnMin: 6.0, warnMax: 9.0 },
		कठोरता: { max: 300, warnMax: 350 },
		क्लोराइड: { max: 250, warnMax: 300 },
		नाइट्रेट: { max: 45, warnMax: 60 },
		अमोनिया: { max: 0.5, warnMax: 1.0 },
		क्षारीयता: { min: 50, max: 150, warnMin: 40, warnMax: 200 },
		फ्लोराइड: { min: 0.5, max: 1.5, warnMin: 0.3, warnMax: 2.0 },
		लोहा: { max: 0.3, warnMax: 0.5 },
		क्लोरीन: { min: 0.2, max: 1.0, warnMin: 0.1, warnMax: 1.5 },
	};

	const range = ranges[paramName];
	if (!range) return 'good';

	// Check if value is in good range
	if (range.min !== undefined && range.max !== undefined) {
		if (value >= range.min && value <= range.max) return 'good';
		if (value >= range.warnMin && value <= range.warnMax) return 'warning';
		return 'danger';
	}

	// For parameters with only max
	if (range.max !== undefined) {
		if (value <= range.max) return 'good';
		if (value <= range.warnMax) return 'warning';
		return 'danger';
	}

	return 'good';
};

const PDFPreviewModal = ({ water, isOpen, onClose }) => {
	const printRef = useRef(null);
	const reportBackgroundImage = '/water-report-bg.png';
	const displayName = water?.source ? `श्री ${water.source} जी,` : '';
	const glassCardBase = {
		padding: '6px',
		borderRadius: '4px',
		backdropFilter: 'blur(6px)',
		WebkitBackdropFilter: 'blur(6px)',
		boxShadow:
			'0 4px 12px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.32)',
	};

	const handlePrint = () => {
		if (printRef.current) {
			const printWindow = window.open('', '_blank');
			const printContent = printRef.current.innerHTML;
			const absoluteBackgroundImage = `${window.location.origin}${reportBackgroundImage}`;

			// Set page size to 4x6 inches (postcard size)
			const htmlContent = `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="UTF-8">
					<style>
						@page {
							size: 4in 6in;
							margin: 0;
							padding: 0;
						}
						@media print {
							* {
								margin: 0;
								padding: 0;
								box-sizing: border-box;
								-webkit-print-color-adjust: exact;
								print-color-adjust: exact;
							}
							body {
								margin: 0;
								padding: 0;
								width: 4in;
								height: 6in;
							}
							.print-content {
								width: 4in;
								height: 6in;
								padding: 15px;
								font-family: Arial, sans-serif;
								font-size: 10px;
								line-height: 1.4;
								overflow: hidden;
								background-image: url('${absoluteBackgroundImage}');
								background-size: cover;
								background-position: center;
								background-repeat: no-repeat;
							}
							table {
								width: 100%;
								border-collapse: collapse;
								font-size: 9px;
							}
							th, td {
								padding: 4px;
								border: 0.5px solid #ccc;
							}
							h1 {
								font-size: 14px;
								margin: 5px 0;
							}
							h2 {
								font-size: 12px;
								margin: 5px 0;
							}
							h3 {
								font-size: 10px;
								margin: 3px 0;
							}
							p {
								margin: 3px 0;
								font-size: 9px;
							}
						}
					</style>
				</head>
				<body>
					<div class="print-content">
						${printContent}
					</div>
				</body>
				</html>
			`;

			printWindow.document.write(htmlContent);
			printWindow.document.close();

			// Wait for content to load then print
			printWindow.onload = function () {
				printWindow.print();
			};
		}
	};

	if (!isOpen) return null;

	return (
		<>
			<div
				className='fixed inset-0 bg-black bg-opacity-50 z-40'
				onClick={onClose}
			/>
			<div className='fixed inset-0 z-50 flex items-end md:items-center justify-center p-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					className='bg-white rounded-t-3xl md:rounded-2xl w-full max-h-[90vh] md:max-w-3xl shadow-2xl overflow-hidden flex flex-col'>
					<div className='flex items-center justify-between p-6 border-b border-slate-200'>
						<h2 className='text-2xl font-bold text-slate-900'>PDF प्रिव्यू</h2>
						<button
							onClick={onClose}
							className='p-2 hover:bg-slate-100 rounded-lg transition-colors'>
							<X className='w-6 h-6 text-slate-600' />
						</button>
					</div>

					<div className='flex gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200'>
						<button
							onClick={handlePrint}
							className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors'>
							<Printer className='w-4 h-4' />
							प्रिंट करें
						</button>
						<p className='text-sm text-slate-600'>
							या ब्राउज़र के प्रिंट से "PDF के रूप में सहेजें" चुनें
						</p>
					</div>

					<div className='flex-1 overflow-y-auto bg-slate-100 p-6 flex items-center justify-center'>
						<div
							ref={printRef}
							style={{
								backgroundColor: 'white',
								backgroundImage: `url(${reportBackgroundImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								padding: '12px',
								width: '360px',
								aspectRatio: '2/3',
								fontFamily: 'Arial, sans-serif',
								color: '#1f2937',
								lineHeight: '1.3',
								fontSize: '9px',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
								borderRadius: '8px',
							}}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: '12px',
								}}>
								<div
									style={{
										flex: '1',
										marginTop: '20px',
										paddingBottom: '6px',
										display: 'flex',
										justifyContent: 'center',
									}}>
									<h1
										style={{
											fontSize: '16px',
											fontWeight: 'bold',
											margin: '0',
											color: '#1e40af',
											textAlign: 'center',
										}}>
										<u>जल परीक्षण रिपोर्ट</u>
									</h1>
								</div>
							</div>

							<h2
								style={{
									fontSize: '14px',
									fontWeight: 'bold',
									margin: '20px 0 6px 0',
									paddingLeft: '5px',
									color: '#1e40af',
								}}>
								{displayName}
							</h2>

							<p
								style={{
									fontSize: '10px',
									margin: '0',
									lineHeight: '1.4',
									color: '#1f2937',
									fontWeight: '500',
									paddingLeft: '5px',
									paddingRight: '5px',
								}}>
								तमोहर फाउंडेशन के द्वारा ग्राम के जल स्रोतों की शुद्धता परीक्षण
								अभियान में आपके जल स्रोत की जांच की गई है, जिसके परिणाम इस
								प्रकार हैं।
							</p>

							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									gap: '10px',
									marginBottom: '8px',
									padding: '4px',
									borderBottom: '1px solid #e5e7eb',
									fontSize: '7px',
								}}>
								<p style={{ margin: '0', color: '#1f2937' }}>
									<span style={{ fontWeight: 'bold', color: '#1e40af' }}>
										जल स्रोत प्रकार:{' '}
									</span>
									{water.type}
								</p>
								<p style={{ margin: '0', color: '#1f2937' }}>
									<span style={{ fontWeight: 'bold', color: '#1e40af' }}>
										परीक्षण तारीख:{' '}
									</span>
									{water.date}
								</p>
							</div>

							<h3
								style={{
									fontSize: '10px',
									fontWeight: 'bold',
									margin: '0 0 6px 0',
									color: '#1e40af',
								}}>
								जल मापदंड (Water Parameters)
							</h3>
							{(() => {
								const parameterItems = [
									{
										name: 'पीएच स्तर',
										value: water.pH,
										unit: 'pH',
										range: '6.5 से 8.5 के बीच',
									},
									{
										name: 'कठोरता',
										value: water.hardness,
										unit: 'ppm',
										range: '300 से कम',
									},
									{
										name: 'क्लोराइड',
										value: water.chloride,
										unit: 'ppm',
										range: '250 से कम',
									},
									{
										name: 'नाइट्रेट',
										value: water.nitrate,
										unit: 'ppm',
										range: '45 से कम',
									},
									{
										name: 'अमोनिया',
										value: water.ammonia,
										unit: 'ppm',
										range: '0.5 से कम',
									},
									{
										name: 'क्षारीयता',
										value: water.alkalinity,
										unit: 'ppm',
										range: '50 से 150 के बीच',
									},
									{
										name: 'फ्लोराइड',
										value: water.fluoride,
										unit: 'ppm',
										range: '0.5 से 1.5 के बीच',
									},
									{
										name: 'लोहा',
										value: water.iron,
										unit: 'ppm',
										range: '0.3 से कम',
									},
									{
										name: 'क्लोरीन',
										value: water.chlorine,
										unit: 'ppm',
										range: '0.2 से 1 के बीच',
									},
								];

								const renderTestBox = (param, idx) => {
									const status = getParameterStatus(param.name, param.value);
									let glassGradient =
										'linear-gradient(135deg, rgba(248,250,252,0.38), rgba(241,245,249,0.2))';
									let glassBorder = '1px solid rgba(148,163,184,0.24)';
									if (status === 'good') {
										glassGradient =
											'linear-gradient(135deg, rgba(220,252,231,0.42), rgba(187,247,208,0.2))';
										glassBorder = '1px solid rgba(34,197,94,0.22)';
									} else if (status === 'warning') {
										glassGradient =
											'linear-gradient(135deg, rgba(253,230,138,0.42), rgba(251,191,36,0.2))';
										glassBorder = '1px solid rgba(245,158,11,0.24)';
									} else if (status === 'danger') {
										glassGradient =
											'linear-gradient(135deg, rgba(254,202,202,0.44), rgba(252,165,165,0.22))';
										glassBorder = '1px solid rgba(239,68,68,0.22)';
									}

									return (
										<div
											key={idx}
											style={{
												background: glassGradient,
												border: glassBorder,
												borderRadius: '4px',
												padding: '4px',
												minHeight: '50px',
												backdropFilter: 'blur(6px)',
												WebkitBackdropFilter: 'blur(6px)',
												boxShadow:
													'0 4px 12px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.32)',
											}}>
											<p
												style={{
													margin: '0 0 2px 0',
													fontSize: '6px',
													fontWeight: '700',
													color: '#0f172a',
												}}>
												{param.name}
											</p>
											<p
												style={{
													margin: '0 0 1px 0',
													fontSize: '6px',
													color: '#1f2937',
												}}>
												<span style={{ fontWeight: '700' }}>कितना है: </span>
												{param.value} {param.unit}
											</p>
											<p
												style={{
													margin: '0',
													fontSize: '6px',
													color: '#1f2937',
												}}>
												<span style={{ fontWeight: '700' }}>
													कितना होना चाहिए:{' '}
												</span>
												{param.range}
											</p>
										</div>
									);
								};

								return (
									<div style={{ marginBottom: '8px' }}>
										<div
											style={{
												display: 'grid',
												gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
												gap: '4px',
												marginBottom: '4px',
											}}>
											{parameterItems.slice(0, 5).map(renderTestBox)}
										</div>
										<div
											style={{
												display: 'grid',
												gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
												gap: '4px',
											}}>
											{parameterItems
												.slice(5)
												.map((param, idx) => renderTestBox(param, idx + 5))}
										</div>
									</div>
								);
							})()}

							{water.result && (
								<div
									style={{
										marginBottom: '6px',
										...glassCardBase,
										background:
											'linear-gradient(135deg, rgba(239,246,255,0.4), rgba(191,219,254,0.18))',
										border: '1px solid rgba(59,130,246,0.22)',
									}}>
									<h4
										style={{
											fontSize: '8px',
											fontWeight: 'bold',
											margin: '0 0 3px 0',
											color: '#1e40af',
										}}>
										परीक्षण परिणाम
									</h4>
									<p
										style={{
											fontSize: '7px',
											margin: '0',
											lineHeight: '1.3',
											color: '#1f2937',
										}}>
										{water.result}
									</p>
								</div>
							)}

							{water.possibleCause && (
								<div
									style={{
										marginBottom: '6px',
										...glassCardBase,
										background:
											'linear-gradient(135deg, rgba(254,252,232,0.4), rgba(253,224,71,0.18))',
										border: '1px solid rgba(245,158,11,0.22)',
									}}>
									<h4
										style={{
											fontSize: '8px',
											fontWeight: 'bold',
											margin: '0 0 3px 0',
											color: '#92400e',
										}}>
										संभावित कारण
									</h4>
									<p
										style={{
											fontSize: '7px',
											margin: '0',
											lineHeight: '1.3',
											color: '#1f2937',
										}}>
										{water.possibleCause}
									</p>
								</div>
							)}

							<div
								style={{
									marginBottom: '6px',
									...glassCardBase,
									background: water.drinkable.includes('योग्य है')
										? 'linear-gradient(135deg, rgba(220,252,231,0.42), rgba(134,239,172,0.2))'
										: water.drinkable.includes('सीमित')
											? 'linear-gradient(135deg, rgba(253,230,138,0.42), rgba(251,191,36,0.2))'
											: 'linear-gradient(135deg, rgba(254,202,202,0.44), rgba(252,165,165,0.22))',
									border: water.drinkable.includes('योग्य है')
										? '1px solid rgba(34,197,94,0.22)'
										: water.drinkable.includes('सीमित')
											? '1px solid rgba(245,158,11,0.24)'
											: '1px solid rgba(239,68,68,0.22)',
								}}>
								<h4
									style={{
										fontSize: '8px',
										fontWeight: 'bold',
										margin: '0 0 2px 0',
										color: '#1f2937',
									}}>
									क्या पीने योग्य है?
								</h4>
								<p
									style={{
										fontSize: '7px',
										fontWeight: 'bold',
										margin: '0',
										color: '#1f2937',
									}}>
									{water.drinkable}
								</p>
							</div>

							{water.recommendation && water.recommendation.length > 0 && (
								<div
									style={{
										marginBottom: '6px',
										...glassCardBase,
										background:
											'linear-gradient(135deg, rgba(236,253,245,0.4), rgba(167,243,208,0.18))',
										border: '1px solid rgba(16,185,129,0.22)',
									}}>
									<h4
										style={{
											fontSize: '8px',
											fontWeight: 'bold',
											margin: '0 0 3px 0',
											color: '#065f46',
										}}>
										सुझाव
									</h4>
									<ul style={{ margin: '0', paddingLeft: '12px' }}>
										{water.recommendation.map((rec, idx) => (
											<li
												key={idx}
												style={{
													fontSize: '7px',
													marginBottom: '2px',
													color: '#1f2937',
												}}>
												{rec}
											</li>
										))}
									</ul>
								</div>
							)}

							<div
								style={{
									marginTop: 'auto',
									paddingTop: '6px',
									borderTop: '1px solid #1e40af',
									textAlign: 'center',
								}}>
								<p
									style={{
										fontSize: '8px',
										color: 'red',
										margin: '0 0 4px 0',
										fontStyle: 'italic',
										lineHeight: '1.4',
										textAlign: 'center',
									}}>
									<strong>आग्रह:</strong> ग्राम मे व्याप्त समस्याओ के समाधान एवं
									ग्राम के भविस्य को बेहतर बनाने के लिए हर महीने तमोहर मिशन की
									बैठक मे हिस्सा लें
								</p>
								<p
									style={{
										fontSize: '7px',
										color: '#666',
										margin: '0 0 2px 0',
									}}>
									तमोहर फाउंडेशन द्वारा जारी रिपोर्ट
								</p>
								<p style={{ fontSize: '7px', color: '#666', margin: '0' }}>
									{new Date().toLocaleDateString('hi-IN', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default function WaterTestDetail({ params }) {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
	const index = parseInt(params.id);
	const water = waterTestData[index];

	if (!water) {
		return (
			<div className='min-h-screen bg-[#F8FAFC] flex items-center justify-center'>
				<p className='text-slate-600'>डेटा नहीं मिला</p>
			</div>
		);
	}

	const displayName = water?.source ? `श्री ${water.source}` : '';

	const statusColor = getStatusColor(water.drinkable);
	const StatusIcon = statusColor.icon;

	return (
		<div className='min-h-screen bg-[#F8FAFC] pt-6 text-slate-900 pb-20'>
			{/* Ambient Background */}
			<div className='fixed inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute -top-[10%] -right-[10%] w-[70%] h-[50%] bg-sky-100/40 blur-[120px] rounded-full' />
				<div className='absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-50/60 blur-[120px] rounded-full' />
			</div>

			{/* Header */}
			<header className='relative z-10 pt-6 px-4 max-w-2xl mx-auto mb-8'>
				<div className='flex items-center justify-between mb-6'>
					<motion.button
						onClick={() => router.back()}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors'>
						<ArrowLeft className='w-4 h-4' />
						वापस
					</motion.button>
					<motion.button
						onClick={() => setShowPreview(true)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors'>
						<Eye className='w-4 h-4' />
						PDF प्रिव्यू
					</motion.button>
				</div>
			</header>

			{/* Main Content */}
			<main className='relative z-10 px-4 max-w-2xl mx-auto'>
				{/* Title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-8'>
					<h1 className='text-4xl font-black text-slate-900 mb-2'>
						{displayName}
					</h1>
					<div className='flex gap-3 flex-wrap'>
						<span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium'>
							{water.type}
						</span>
						<span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium'>
							📅 {water.date}
						</span>
					</div>
				</motion.div>

				{/* Key-Value Info */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='bg-white rounded-2xl border border-slate-200 p-6 mb-8'>
					<div className='space-y-4'>
						<div className='flex justify-between items-start pb-4 border-b border-slate-100'>
							<span className='text-slate-600 font-medium'>परीक्षण परिणाम</span>
							<p className='text-slate-900 text-right max-w-xs'>
								{water.result}
							</p>
						</div>
						{water.possibleCause && (
							<div className='flex justify-between items-start pb-4 border-b border-slate-100'>
								<span className='text-slate-600 font-medium'>संभावित कारण</span>
								<p className='text-slate-900 text-right max-w-xs'>
									{water.possibleCause}
								</p>
							</div>
						)}
						<div className='flex justify-between items-start pb-4 border-b border-slate-100'>
							<span className='text-slate-600 font-medium'>
								क्या पीने योग्य है?
							</span>
							<span
								className={`px-3 py-1 rounded-lg text-sm font-bold ${statusColor.badge}`}>
								{water.drinkable}
							</span>
						</div>
						{water.recommendation && water.recommendation.length > 0 && (
							<div className='flex justify-between items-start'>
								<span className='text-slate-600 font-medium'>सुझाव</span>
								<ul className='text-slate-900 text-right max-w-xs space-y-1'>
									{water.recommendation.map((rec, idx) => (
										<li key={idx} className='text-sm'>
											• {rec}
										</li>
									))}
								</ul>
							</div>
						)}
						n{' '}
						{water.defaultRecommendation && (
							<div className='flex justify-between items-start'>
								<span className='text-slate-600 font-medium'>नियमित सुझाव</span>
								<p className='text-slate-900 text-right max-w-xs text-sm'>
									{water.defaultRecommendation}
								</p>
							</div>
						)}
					</div>
				</motion.div>

				{/* Water Parameters Table */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className='bg-white rounded-2xl border border-slate-200 overflow-hidden'>
					<div
						className={`px-6 py-4 ${statusColor.fullBg} text-white font-bold`}>
						जल मापदंड (Water Parameters)
					</div>
					<table className='w-full'>
						<thead>
							<tr className='bg-slate-50 border-b border-slate-200'>
								<th className='px-6 py-3 text-left text-sm font-semibold text-slate-900'>
									मापदंड
								</th>
								<th className='px-6 py-3 text-center text-sm font-semibold text-slate-900'>
									मान
								</th>
								<th className='px-6 py-3 text-center text-sm font-semibold text-slate-900'>
									इकाई
								</th>
								<th className='px-6 py-3 text-center text-sm font-semibold text-slate-900'>
									सुझाया गया श्रेणी
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{[
								{
									name: 'पीएच स्तर',
									value: water.pH,
									unit: 'pH',
									range: '6.5-8.5',
								},
								{
									name: 'कठोरता',
									value: water.hardness,
									unit: 'ppm',
									range: '<300',
								},
								{
									name: 'क्लोराइड',
									value: water.chloride,
									unit: 'ppm',
									range: '<250',
								},
								{
									name: 'नाइट्रेट',
									value: water.nitrate,
									unit: 'ppm',
									range: '<45',
								},
								{
									name: 'अमोनिया',
									value: water.ammonia,
									unit: 'ppm',
									range: '<0.5',
								},
								{
									name: 'क्षारीयता',
									value: water.alkalinity,
									unit: 'ppm',
									range: '50-150',
								},
								{
									name: 'फ्लोराइड',
									value: water.fluoride,
									unit: 'ppm',
									range: '0.5-1.5',
								},
								{ name: 'लोहा', value: water.iron, unit: 'ppm', range: '<0.3' },
								{
									name: 'क्लोरीन',
									value: water.chlorine,
									unit: 'ppm',
									range: '0.2-1',
								},
							].map((param, idx) => {
								const status = getParameterStatus(param.name, param.value);
								let rowBgClass = 'bg-white';
								if (status === 'good') rowBgClass = 'bg-green-50';
								else if (status === 'warning') rowBgClass = 'bg-amber-300';
								else if (status === 'danger') rowBgClass = 'bg-red-300';

								return (
									<tr key={idx} className={rowBgClass}>
										<td className='px-6 py-3 text-sm text-slate-900 font-medium'>
											{param.name}
										</td>
										<td className='px-6 py-3 text-sm text-center font-bold text-slate-900'>
											{param.value}
										</td>
										<td className='px-6 py-3 text-sm text-center text-slate-600'>
											{param.unit}
										</td>
										<td className='px-6 py-3 text-sm text-center text-green-700 font-medium'>
											{param.range}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</motion.div>
			</main>

			{/* PDF Preview Modal */}
			<PDFPreviewModal
				water={water}
				isOpen={showPreview}
				onClose={() => setShowPreview(false)}
			/>
		</div>
	);
}
