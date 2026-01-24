'use client';

import { motion } from 'framer-motion';
import { Users, IndianRupee, Banknote, ArrowRight } from 'lucide-react';

/* ---------------- Hardcoded SHG Data ---------------- */

const SHGS = [
	{
		id: 'shg1',
		name: 'महालक्ष्मी स्वयं सहायता समूह',
		village: 'रामपुर',
		members: 12,
		cash: 24500,
		bankLoan: 80000,
		color: 'from-pink-400 to-purple-400',
	},
	{
		id: 'shg2',
		name: 'शक्ति महिला समूह',
		village: 'देवगांव',
		members: 9,
		cash: 13200,
		bankLoan: 0,
		color: 'from-indigo-400 to-cyan-400',
	},
	{
		id: 'shg3',
		name: 'सरस्वती SHG',
		village: 'लालपुर',
		members: 15,
		cash: 42100,
		bankLoan: 120000,
		color: 'from-amber-400 to-orange-400',
	},
];

/* ---------------- Page ---------------- */

export default function ShgHomePage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#fdf2f8] to-[#eef2ff] p-6'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-800'>
					आपके स्वयं सहायता समूह
				</h1>
				<p className='text-slate-500 mt-1'>सभी SHG का एक स्थान पर प्रबंधन</p>
			</motion.div>

			{/* SHG Grid */}
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{SHGS.map((shg, index) => (
					<motion.div
						key={shg.id}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						whileHover={{ y: -6, scale: 1.02 }}
						className='relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl'>
						{/* Gradient Strip */}
						<div
							className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${shg.color}`}
						/>

						<div className='p-5 space-y-4'>
							{/* Title */}
							<div>
								<h2 className='text-lg font-bold text-slate-800'>{shg.name}</h2>
								<p className='text-sm text-slate-500'>गांव: {shg.village}</p>
							</div>

							{/* Stats */}
							<div className='grid grid-cols-3 gap-3'>
								<Stat icon={Users} label='सदस्य' value={shg.members} />
								<Stat
									icon={IndianRupee}
									label='नकद'
									value={`₹ ${shg.cash.toLocaleString('en-IN')}`}
								/>
								<Stat
									icon={Banknote}
									label='ऋण'
									value={
										shg.bankLoan
											? `₹ ${shg.bankLoan.toLocaleString('en-IN')}`
											: '—'
									}
								/>
							</div>

							{/* Action */}
							<button
								className={`w-full mt-3 bg-gradient-to-r ${shg.color} text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition`}>
								खोलें
								<ArrowRight className='w-4 h-4' />
							</button>
						</div>

						{/* Glow */}
						<div
							className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-30 bg-gradient-to-r ${shg.color}`}
						/>
					</motion.div>
				))}
			</div>

			{/* Add SHG CTA */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='mt-10 flex justify-center'>
				<button className='bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition'>
					+ नया SHG जोड़ें
				</button>
			</motion.div>
		</div>
	);
}

/* ---------------- Small Stat Component ---------------- */

function Stat({ icon: Icon, label, value }) {
	return (
		<div className='flex flex-col items-center bg-white/70 rounded-xl p-3 backdrop-blur'>
			<Icon className='w-5 h-5 text-slate-600 mb-1' />
			<span className='text-xs text-slate-500'>{label}</span>
			<span className='text-sm font-bold text-slate-800'>{value}</span>
		</div>
	);
}
