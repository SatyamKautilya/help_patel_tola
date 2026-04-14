'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, X, Printer, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
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
		'कठोरता': { max: 300, warnMax: 350 },
		'क्लोराइड': { max: 250, warnMax: 300 },
		'नाइट्रेट': { max: 45, warnMax: 60 },
		'अमोनिया': { max: 0.5, warnMax: 1.0 },
		'क्षारीयता': { min: 50, max: 150, warnMin: 40, warnMax: 200 },
		'फ्लोराइड': { min: 0.5, max: 1.5, warnMin: 0.3, warnMax: 2.0 },
		'लोहा': { max: 0.3, warnMax: 0.5 },
		'क्लोरीन': { min: 0.2, max: 1.0, warnMin: 0.1, warnMax: 1.5 },
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

	const handlePrint = () => {
		if (printRef.current) {
			const printWindow = window.open('', '_blank');
			const printContent = printRef.current.innerHTML;

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
			printWindow.onload = function() {
				printWindow.print();
			};
		}
	};

	if (!isOpen) return null;

	return (
		<>
			<div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={onClose} />
			<div className='fixed inset-0 z-50 flex items-end md:items-center justify-center p-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					className='bg-white rounded-t-3xl md:rounded-2xl w-full max-h-[90vh] md:max-w-3xl shadow-2xl overflow-hidden flex flex-col'>
					<div className='flex items-center justify-between p-6 border-b border-slate-200'>
						<h2 className='text-2xl font-bold text-slate-900'>PDF प्रिव्यू</h2>
						<button onClick={onClose} className='p-2 hover:bg-slate-100 rounded-lg transition-colors'>
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
						<p className='text-sm text-slate-600'>या ब्राउज़र के प्रिंट से "PDF के रूप में सहेजें" चुनें</p>
					</div>

					<div className='flex-1 overflow-y-auto bg-slate-100 p-6 flex items-center justify-center'>
						<div
							ref={printRef}
							style={{
								backgroundColor: 'white',
								padding: '12px',
								width: '360px',
								aspectRatio: '2/3',
								fontFamily: 'Arial, sans-serif',
								color: '#1f2937',
								lineHeight: '1.3',
								fontSize: '9px',
								overflow: 'auto',
								boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
								borderRadius: '8px',
							}}>
							<div style={{ textAlign: 'center', marginBottom: '12px', borderBottom: '2px solid #1e40af', paddingBottom: '10px' }}>
								<h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#1e40af' }}>
									जल परीक्षण रिपोर्ट
								</h1>
								<p style={{ fontSize: '7px', color: '#666', margin: '2px 0', fontWeight: '500' }}>
									तमोहर फाउंडेशन द्वारा जल शुद्धता परीक्षण अभियान
								</p>
							</div>

							<h2 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#1e40af' }}>
								{water.source}
							</h2>

							<div style={{ marginBottom: '10px', backgroundColor: '#f0f9ff', padding: '8px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
								<p style={{ fontSize: '7px', margin: '0', lineHeight: '1.4', color: '#1f2937', fontWeight: '500' }}>
									तमोहर फाउंडेशन के द्वारा ग्राम के जल स्रोतों की शुद्धता परीक्षण अभियान में आपके जल स्रोत की जांच की गई है, जिसके परिणाम इस प्रकार हैं।
								</p>
							</div>

							<table style={{ width: '100%', marginBottom: '8px', borderCollapse: 'collapse' }}>
								<tbody>
									<tr style={{ borderBottom: '1px solid #e5e7eb' }}>
										<td style={{ padding: '4px', fontWeight: 'bold', color: '#1e40af', width: '40%', fontSize: '7px' }}>जल स्रोत प्रकार</td>
										<td style={{ padding: '4px', color: '#1f2937', fontSize: '7px' }}>{water.type}</td>
									</tr>
									<tr style={{ borderBottom: '1px solid #e5e7eb' }}>
										<td style={{ padding: '4px', fontWeight: 'bold', color: '#1e40af', fontSize: '7px' }}>परीक्षण तारीख</td>
										<td style={{ padding: '4px', color: '#1f2937', fontSize: '7px' }}>{water.date}</td>
									</tr>
								</tbody>
							</table>

							<h3 style={{ fontSize: '10px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#1e40af' }}>
								जल मापदंड (Water Parameters)
							</h3>
							<table
								style={{
									width: '100%',
									marginBottom: '8px',
									borderCollapse: 'collapse',
									border: '1px solid #1e40af',
									fontSize: '7px',
								}}>
								<thead>
									<tr style={{ backgroundColor: '#1e40af', color: 'white' }}>
										<th style={{ padding: '3px', textAlign: 'left', fontWeight: 'bold', borderRight: '1px solid #0369a1', fontSize: '6px' }}>
											मापदंड
										</th>
										<th style={{ padding: '3px', textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #0369a1', width: '40px', fontSize: '6px' }}>
											मान
										</th>
										<th style={{ padding: '3px', textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #0369a1', width: '35px', fontSize: '6px' }}>
											इकाई
										</th>
										<th style={{ padding: '3px', textAlign: 'center', fontWeight: 'bold', width: '45px', fontSize: '6px' }}>
											श्रेणी
										</th>
									</tr>
								</thead>
								<tbody>
									{[
										{ name: 'पीएच स्तर', value: water.pH, unit: 'pH', range: '6.5-8.5' },
										{ name: 'कठोरता', value: water.hardness, unit: 'ppm', range: '<300' },
										{ name: 'क्लोराइड', value: water.chloride, unit: 'ppm', range: '<250' },
										{ name: 'नाइट्रेट', value: water.nitrate, unit: 'ppm', range: '<45' },
										{ name: 'अमोनिया', value: water.ammonia, unit: 'ppm', range: '<0.5' },
										{ name: 'क्षारीयता', value: water.alkalinity, unit: 'ppm', range: '50-150' },
										{ name: 'फ्लोराइड', value: water.fluoride, unit: 'ppm', range: '0.5-1.5' },
										{ name: 'लोहा', value: water.iron, unit: 'ppm', range: '<0.3' },
										{ name: 'क्लोरीन', value: water.chlorine, unit: 'ppm', range: '0.2-1' },
									].map((param, idx) => {
										const status = getParameterStatus(param.name, param.value);
										let bgColor = '#f9fafb';
										if (status === 'good') bgColor = '#dcfce7';
										else if (status === 'warning') bgColor = '#fbbf24';
										else if (status === 'danger') bgColor = '#fca5a5';

										return (
											<tr
												key={idx}
												style={{
													backgroundColor: bgColor,
													borderBottom: idx === 8 ? 'none' : '1px solid #e5e7eb',
												}}>
												<td style={{ padding: '2px', borderRight: '1px solid #e5e7eb', fontWeight: '500', fontSize: '7px' }}>
													{param.name}
												</td>
												<td style={{ padding: '2px', textAlign: 'center', borderRight: '1px solid #e5e7eb', fontWeight: 'bold', color: '#000000', fontSize: '7px' }}>
													{param.value}
												</td>
												<td style={{ padding: '2px', textAlign: 'center', borderRight: '1px solid #e5e7eb', color: '#666', fontSize: '7px' }}>
													{param.unit}
												</td>
												<td style={{ padding: '2px', textAlign: 'center', color: '#065f46', fontWeight: '500', fontSize: '6px' }}>
													{param.range}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>

							{water.result && (
								<div style={{ marginBottom: '6px', backgroundColor: '#eff6ff', padding: '6px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
									<h4 style={{ fontSize: '8px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#1e40af' }}>
										परीक्षण परिणाम
									</h4>
									<p style={{ fontSize: '7px', margin: '0', lineHeight: '1.3', color: '#1f2937' }}>
										{water.result}
									</p>
								</div>
							)}

							{water.possibleCause && (
								<div style={{ marginBottom: '6px', backgroundColor: '#fefce8', padding: '6px', borderRadius: '4px', border: '1px solid #fcd34d' }}>
									<h4 style={{ fontSize: '8px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#92400e' }}>
										संभावित कारण
									</h4>
									<p style={{ fontSize: '7px', margin: '0', lineHeight: '1.3', color: '#1f2937' }}>
										{water.possibleCause}
									</p>
								</div>
							)}

							<div
								style={{
									marginBottom: '6px',
									padding: '6px',
									borderRadius: '4px',
									border: '1px solid #d1d5db',
									backgroundColor: water.drinkable.includes('योग्य है')
										? '#dcfce7'
										: water.drinkable.includes('सीमित')
											? '#fbbf24'
											: '#fca5a5',
								}}>
								<h4 style={{ fontSize: '8px', fontWeight: 'bold', margin: '0 0 2px 0', color: '#1f2937' }}>
									पीने योग्यता
								</h4>
								<p style={{ fontSize: '7px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
									{water.drinkable}
								</p>
							</div>

							{water.recommendation && water.recommendation.length > 0 && (
								<div style={{ marginBottom: '6px', backgroundColor: '#ecfdf5', padding: '6px', borderRadius: '4px', border: '1px solid #a7f3d0' }}>
									<h4 style={{ fontSize: '8px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#065f46' }}>
										अनुशंसाएं
									</h4>
									<ul style={{ margin: '0', paddingLeft: '12px' }}>
										{water.recommendation.map((rec, idx) => (
											<li key={idx} style={{ fontSize: '7px', marginBottom: '2px', color: '#1f2937' }}>
												{rec}
											</li>
										))}
									</ul>
								</div>
							)}

							<div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #1e40af', textAlign: 'center' }}>
								<p style={{ fontSize: '7px', color: '#666', margin: '0 0 2px 0' }}>
									तमोहर फाउंडेशन द्वारा जारी रिपोर्ट
								</p>
								<p style={{ fontSize: '7px', color: '#666', margin: '0' }}>
									{new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
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
					<h1 className='text-4xl font-black text-slate-900 mb-2'>{water.source}</h1>
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
							<p className='text-slate-900 text-right max-w-xs'>{water.result}</p>
						</div>

						{water.possibleCause && (
							<div className='flex justify-between items-start pb-4 border-b border-slate-100'>
								<span className='text-slate-600 font-medium'>संभावित कारण</span>
								<p className='text-slate-900 text-right max-w-xs'>{water.possibleCause}</p>
							</div>
						)}

						<div className='flex justify-between items-start pb-4 border-b border-slate-100'>
							<span className='text-slate-600 font-medium'>पीने योग्यता</span>
							<span className={`px-3 py-1 rounded-lg text-sm font-bold ${statusColor.badge}`}>
								{water.drinkable}
							</span>
						</div>

						{water.recommendation && water.recommendation.length > 0 && (
							<div className='flex justify-between items-start'>
								<span className='text-slate-600 font-medium'>सिफारिशें</span>
								<ul className='text-slate-900 text-right max-w-xs space-y-1'>
									{water.recommendation.map((rec, idx) => (
										<li key={idx} className='text-sm'>• {rec}</li>
									))}
								</ul>
							</div>
						)}
n					{water.defaultRecommendation && (
						<div className='flex justify-between items-start'>
							<span className='text-slate-600 font-medium'>नियमित सुझाव</span>
							<p className='text-slate-900 text-right max-w-xs text-sm'>{water.defaultRecommendation}</p>
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
					<div className={`px-6 py-4 ${statusColor.fullBg} text-white font-bold`}>
						जल मापदंड (Water Parameters)
					</div>
					<table className='w-full'>
						<thead>
							<tr className='bg-slate-50 border-b border-slate-200'>
								<th className='px-6 py-3 text-left text-sm font-semibold text-slate-900'>मापदंड</th>
								<th className='px-6 py-3 text-center text-sm font-semibold text-slate-900'>मान</th>
								<th className='px-6 py-3 text-center text-sm font-semibold text-slate-900'>इकाई</th>
								<th className='px-6 py-3 text-center text-sm font-semibold text-slate-900'>सुझाया गया श्रेणी</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{[
								{ name: 'पीएच स्तर', value: water.pH, unit: 'pH', range: '6.5-8.5' },
								{ name: 'कठोरता', value: water.hardness, unit: 'ppm', range: '<300' },
								{ name: 'क्लोराइड', value: water.chloride, unit: 'ppm', range: '<250' },
								{ name: 'नाइट्रेट', value: water.nitrate, unit: 'ppm', range: '<45' },
								{ name: 'अमोनिया', value: water.ammonia, unit: 'ppm', range: '<0.5' },
								{ name: 'क्षारीयता', value: water.alkalinity, unit: 'ppm', range: '50-150' },
								{ name: 'फ्लोराइड', value: water.fluoride, unit: 'ppm', range: '0.5-1.5' },
								{ name: 'लोहा', value: water.iron, unit: 'ppm', range: '<0.3' },
								{ name: 'क्लोरीन', value: water.chlorine, unit: 'ppm', range: '0.2-1' },
							].map((param, idx) => {
								const status = getParameterStatus(param.name, param.value);
								let rowBgClass = 'bg-white';
								if (status === 'good') rowBgClass = 'bg-green-50';
								else if (status === 'warning') rowBgClass = 'bg-amber-300';
								else if (status === 'danger') rowBgClass = 'bg-red-300';

								return (
									<tr
										key={idx}
										className={rowBgClass}>
										<td className='px-6 py-3 text-sm text-slate-900 font-medium'>{param.name}</td>
										<td className='px-6 py-3 text-sm text-center font-bold text-slate-900'>
											{param.value}
										</td>
										<td className='px-6 py-3 text-sm text-center text-slate-600'>{param.unit}</td>
										<td className='px-6 py-3 text-sm text-center text-green-700 font-medium'>{param.range}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</motion.div>
			</main>

			{/* PDF Preview Modal */}
			<PDFPreviewModal water={water} isOpen={showPreview} onClose={() => setShowPreview(false)} />
		</div>
	);
}
