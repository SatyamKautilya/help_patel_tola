'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	MapPin,
	Code,
	Stethoscope,
	Landmark,
	Palette,
	Briefcase,
	FlaskConical,
	School,
} from 'lucide-react';

const mpColleges = [
	{
		name: 'इंजीनियरिंग कॉलेज',
		icon: Code,
		count: '60+',
		gradient: 'from-cyan-500 to-blue-600',
		shadow: 'shadow-cyan-500/25',
		colleges: [
			'IIT Indore',
			'MANIT Bhopal',
			'SGSITS Indore',
			'MITS Gwalior',
			'RGPV (Affiliated)',
			'LNCT Group Bhopal',
			'TIT Bhopal',
			'Oriental Indore',
		],
	},
	{
		name: 'मेडिकल कॉलेज',
		icon: Stethoscope,
		count: '35+',
		gradient: 'from-rose-500 to-pink-600',
		shadow: 'shadow-rose-500/25',
		colleges: [
			'AIIMS Bhopal',
			'Gandhi Medical College',
			'GR Medical Gwalior',
			'MGM Indore',
			'Bundelkhand MC Sagar',
			'PCMS Bhopal',
		],
	},
	{
		name: 'लॉ कॉलेज',
		icon: Landmark,
		count: '25+',
		gradient: 'from-amber-500 to-orange-600',
		shadow: 'shadow-amber-500/25',
		colleges: [
			'NLIU Bhopal',
			'Barkatullah Univ. Law',
			'Vikram Univ. Law',
			'Holkar Law College',
			'Jiwaji Law College',
		],
	},
	{
		name: 'आर्ट्स व कॉमर्स',
		icon: Palette,
		count: '100+',
		gradient: 'from-violet-500 to-purple-600',
		shadow: 'shadow-violet-500/25',
		colleges: [
			'Devi Ahilya Vishwavidyalaya',
			'Barkatullah University',
			'Vikram University',
			'Jiwaji University',
			'RDVV Jabalpur',
			'Govt. MLB College Bhopal',
		],
	},
	{
		name: 'MBA / BBA',
		icon: Briefcase,
		count: '40+',
		gradient: 'from-emerald-500 to-teal-600',
		shadow: 'shadow-emerald-500/25',
		colleges: [
			'IIM Indore',
			'IIFM Bhopal',
			'LNCT MBA',
			'Prestige Institute Indore',
			'IPS Academy Indore',
			'SIRT Bhopal',
		],
	},
	{
		name: 'विज्ञान / रिसर्च',
		icon: FlaskConical,
		count: '30+',
		gradient: 'from-sky-500 to-indigo-600',
		shadow: 'shadow-sky-500/25',
		colleges: [
			'IISER Bhopal',
			'DAVV Science Faculty',
			'Holkar Science College',
			'RRCAT Indore',
			'Govt. Science College Jabalpur',
		],
	},
];

export default function CollegesPage() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white pb-16'>
			{/* Header */}
			<div className='sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						onClick={() => router.back()}
						className='w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform'>
						<ArrowLeft size={18} />
					</button>
					<div>
						<h1 className='text-lg font-bold leading-tight'>MP कॉलेज सूची</h1>
						<p className='text-[10px] text-white/40 font-medium'>Colleges in Madhya Pradesh</p>
					</div>
				</div>
			</div>

			{/* Hero */}
			<div className='px-5 pt-6 pb-2'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					<div className='flex items-center gap-2 mb-2'>
						<School size={18} className='text-violet-400' />
						<span className='text-xs font-medium text-violet-400 uppercase tracking-wider'>
							मध्य प्रदेश
						</span>
					</div>
					<h2 className='text-2xl font-bold leading-tight'>
						प्रमुख कॉलेज
						<br />
						<span className='bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent'>
							श्रेणी अनुसार
						</span>
					</h2>
					<p className='text-sm text-white/40 mt-2 leading-relaxed'>
						MP के सभी प्रमुख यूनिवर्सिटी और कॉलेज — विषय के अनुसार देखें
					</p>
				</motion.div>
			</div>

			{/* College Categories */}
			<div className='px-4 pt-4 space-y-4'>
				{mpColleges.map((category, index) => {
					const CategoryIcon = category.icon;
					return (
						<motion.div
							key={category.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + index * 0.06 }}
							className='bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden'>

							{/* Category header */}
							<div className='flex items-center gap-3 px-5 pt-5 pb-3'>
								<div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg ${category.shadow} shrink-0`}>
									<CategoryIcon className='w-5 h-5 text-white' />
								</div>
								<div className='flex-1'>
									<p className='text-base font-black text-white'>{category.name}</p>
									<p className='text-[10px] text-white/35 font-medium'>{category.count} कॉलेज</p>
								</div>
							</div>

							{/* College list */}
							<div className='px-5 pb-5'>
								<div className='flex flex-wrap gap-2'>
									{category.colleges.map((name) => (
										<span
											key={name}
											className='text-[11px] font-medium text-white/60 bg-white/[0.06] border border-white/10 px-3 py-1.5 rounded-xl'>
											{name}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Note */}
			<div className='px-4 pt-4'>
				<div className='flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10'>
					<MapPin className='w-4 h-4 text-violet-400 shrink-0' />
					<p className='text-[11px] text-white/50 leading-relaxed'>
						सभी कॉलेज मध्य प्रदेश के हैं। विस्तृत जानकारी, प्रवेश प्रक्रिया और कट-ऑफ जल्द ही उपलब्ध होगी।
					</p>
				</div>
			</div>
		</div>
	);
}
