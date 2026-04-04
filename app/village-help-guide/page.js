'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Droplet, Sprout, ShieldAlert, ArrowRight } from 'lucide-react';
import { Input, Button, Card, CardBody, Tabs, Tab } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VillageHelpGuidePage() {
	const router = useRouter();
	const [activeTool, setActiveTool] = useState(null);

	// Bleaching powder state
	const [diameter, setDiameter] = useState('');
	const [waterHeight, setWaterHeight] = useState('');
	const [heightType, setHeightType] = useState('feet'); // 'feet' | 'rings'
	const [result, setResult] = useState(null);

	const calculatePowder = () => {
		const d = parseFloat(diameter);
		let inputVal = parseFloat(waterHeight);

		if (isNaN(d) || isNaN(inputVal) || d <= 0 || inputVal <= 0) {
			setResult({ error: 'कृपया सही संख्याएं दर्ज करें।' });
			return;
		}

		// Calculate height in feet
		const h = heightType === 'feet' ? inputVal : inputVal * 1.75;

		// Calculate volume in cubic feet: pi * r^2 * h
		const radius = d / 2;
		const volumeCubicFeet = Math.PI * Math.pow(radius, 2) * h;
		
		// 1 cubic foot = 28.3168 liters
		const volumeLiters = volumeCubicFeet * 28.3168;

		// General rule: ~5 grams of bleaching powder (30% chlorine) per 1000 liters
		const exactPowderGrams = (volumeLiters / 1000) * 5;
		const roundedPowderGrams = Math.round(exactPowderGrams / 10) * 10;
		// If it rounds down to 0 but we need some, let's at least give 10. 
		// Or just stick to the rounded value (but safe fallback to minimum 10 if exact was > 0)
		const finalPowderGrams = roundedPowderGrams === 0 && exactPowderGrams > 0 ? 10 : roundedPowderGrams;

		setResult({
			liters: volumeLiters.toFixed(2),
			powderGrams: finalPowderGrams,
			exactPowderGrams: exactPowderGrams.toFixed(2),
			calculatedHeightFEet: h.toFixed(2),
		});
	};

	const tools = [
		{
			id: 'bleach',
			title: 'कुएं के लिए ब्लीचिंग पाउडर',
			description: 'कुएं के पानी को शुद्ध करने के लिए आवश्यक ब्लीचिंग पाउडर की मात्रा जानें',
			icon: <Droplet size={28} />,
			color: 'text-blue-500',
			bg: 'bg-blue-100'
		},
		{
			id: 'fertilizer',
			title: 'खेत के लिए खाद की मात्रा',
			description: 'फसल और क्षेत्र के अनुसार खाद की सही मात्रा (जल्द आ रहा है)',
			icon: <Sprout size={28} />,
			color: 'text-green-500',
			bg: 'bg-green-100',
			disabled: true
		},
		{
			id: 'emergency',
			title: 'आपातकालीन सहायता',
			description: 'जरूरी और आपातकालीन हेल्प लाइन नंबर (जल्द आ रहा है)',
			icon: <ShieldAlert size={28} />,
			color: 'text-red-500',
			bg: 'bg-red-100',
			disabled: true
		}
	];

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
			{/* Header */}
			<div className="sticky top-0 z-50 bg-[#2563eb] text-white shadow-md">
				<div className="flex items-center p-4">
					<button 
						onClick={() => {
							if (activeTool) {
								setActiveTool(null);
								setResult(null);
								setDiameter('');
								setWaterHeight('');
								setHeightType('feet');
							} else {
								router.back();
							}
						}} 
						className="mr-3 p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
					>
						<ChevronLeft size={24} />
					</button>
					<h1 className="text-lg font-bold">
						{activeTool === 'bleach' ? 'ब्लीचिंग पाउडर कैलकुलेटर' : 'ग्राम सहायता गाइड'}
					</h1>
				</div>
			</div>

			<div className="p-4 max-w-md mx-auto space-y-6 mt-4">
				<AnimatePresence mode="wait">
					{!activeTool && (
						<motion.div 
							key="menu"
							initial={{ opacity: 0, x: -20 }} 
							animate={{ opacity: 1, x: 0 }} 
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
							className="space-y-4"
						>
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-slate-800">नमस्ते!</h2>
								<p className="text-slate-500">आप किस विषय में सहायता चाहते हैं?</p>
							</div>

							{tools.map((tool) => (
								<Card 
									key={tool.id} 
									isPressable={!tool.disabled}
									onPress={() => !tool.disabled && setActiveTool(tool.id)}
									className={`w-full shadow-sm hover:shadow-md transition-shadow border border-slate-100 ${tool.disabled ? 'opacity-60 grayscale' : ''}`}
								>
									<CardBody className="p-4 flex flex-row items-center space-x-4">
										<div className={`p-3 rounded-full ${tool.bg} ${tool.color}`}>
											{tool.icon}
										</div>
										<div className="flex-1 text-left">
											<h3 className="font-bold text-slate-800">{tool.title}</h3>
											<p className="text-xs text-slate-500 mt-1 line-clamp-2">{tool.description}</p>
										</div>
										{!tool.disabled && (
											<div className="text-slate-400">
												<ArrowRight size={20} />
											</div>
										)}
									</CardBody>
								</Card>
							))}
						</motion.div>
					)}

					{activeTool === 'bleach' && (
						<motion.div 
							key="bleach-tool"
							initial={{ opacity: 0, x: 20 }} 
							animate={{ opacity: 1, x: 0 }} 
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.3 }}
						>
							<Card className="shadow-lg border-t-4 border-[#2563eb]">
								<CardBody className="p-6">
									<div className="flex items-center space-x-3 mb-6">
										<div className="p-3 bg-blue-100 text-blue-600 rounded-full">
											<Droplet size={24} />
										</div>
										<div>
											<h2 className="text-xl font-bold text-slate-800">कुएं के लिए ब्लीचिंग पाउडर</h2>
											<p className="text-xs text-slate-500 mt-1">सुरक्षित और स्वच्छ जल सुनिश्चित करें</p>
										</div>
									</div>

									<div className="space-y-5">
										<div>
											<label className="block text-sm font-semibold text-slate-700 mb-2">कुएं का व्यास (Feet में)</label>
											<Input 
												type="number" 
												placeholder="उदाहरण: 5" 
												value={diameter} 
												onChange={(e) => setDiameter(e.target.value)}
												size="lg"
												variant="faded"
											/>
										</div>
										
										<div>
											<label className="block text-sm font-semibold text-slate-700 mb-2">पानी की ऊंचाई का मापक चुनें</label>
											<Tabs 
												selectedKey={heightType} 
												onSelectionChange={(key) => setHeightType(key)}
												aria-label="Height Type"
												fullWidth
												color="primary"
												size="md"
												className="mb-2"
											>
												<Tab key="feet" title="Feet (फुट) में" />
												<Tab key="rings" title="रिंग्स (गोले) की संख्या" />
											</Tabs>

											<label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">
												{heightType === 'feet' ? 'पानी की ऊंचाई (Feet में)' : 'पानी के अंदर के रिंग्स की संख्या'}
											</label>
											<Input 
												type="number" 
												placeholder={heightType === 'feet' ? "उदाहरण: 10" : "उदाहरण: 5"} 
												value={waterHeight} 
												onChange={(e) => setWaterHeight(e.target.value)}
												size="lg"
												variant="faded"
												endContent={
													heightType === 'rings' && (
														<span className="text-xs text-slate-400">1 रिंग = 1.75 ft</span>
													)
												}
											/>
										</div>

										<Button 
											color="primary" 
											className="w-full font-bold mt-2 bg-[#2563eb]" 
											size="lg" 
											onPress={calculatePowder}
										>
											मात्रा की गणना करें
										</Button>
									</div>

									{result && (
										<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6">
											{result.error ? (
												<div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
													{result.error}
												</div>
											) : (
												<div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-3">
													<h3 className="font-bold text-green-800 border-b border-green-200 pb-2">परिणाम:</h3>
													<div className="flex justify-between items-center text-sm">
														<span className="text-slate-600">कुल पानी (लगभग):</span>
														<span className="font-bold text-slate-800">{result.liters} लीटर</span>
													</div>
													{heightType === 'rings' && (
														<div className="flex justify-between items-center text-sm">
															<span className="text-slate-600">पानी की ऊंचाई:</span>
															<span className="font-bold text-slate-800">{result.calculatedHeightFEet} Feet</span>
														</div>
													)}
													<div className="flex flex-col text-sm pt-2">
														<span className="text-slate-600 mb-1">आवश्यक ब्लीचिंग पाउडर:</span>
														<div className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-blue-100 flex-col">
															<span className="font-black text-blue-700 text-2xl">{result.powderGrams} <span className="text-sm text-blue-600 font-bold">ग्राम</span></span>
															<span className="text-[10px] text-slate-400 mt-1">(सटीक मात्रा: {result.exactPowderGrams} ग्राम)</span>
														</div>
													</div>
													<p className="text-xs text-slate-500 mt-2 bg-white/50 p-2 rounded leading-relaxed border border-slate-200">
														<span className="font-bold text-amber-600">ध्यान दें:</span> यह एक सामान्य अनुमान है (प्रति 1000 लीटर 5 ग्राम)। कृपया सटीक मात्रा के लिए स्थानीय स्वास्थ्य कार्यकर्ता से परामर्श लें।
													</p>
												</div>
											)}
										</motion.div>
									)}
								</CardBody>
							</Card>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
