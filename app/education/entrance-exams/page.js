'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	BookOpenCheck,
	FileText,
	ArrowUpRight,
} from 'lucide-react';

const entranceExams = [
	{
		name: 'JEE Main & Advanced',
		desc: 'इंजीनियरिंग प्रवेश — IIT, NIT, IIIT में एडमिशन',
		emoji: '🔧',
		gradient: 'from-blue-600 to-cyan-500',
		shadow: 'shadow-blue-500/25',
		subjects: ['Physics', 'Chemistry', 'Mathematics'],
		eligibility: 'कक्षा 12 (PCM)',
		mode: 'Online CBT',
	},
	{
		name: 'NEET UG',
		desc: 'मेडिकल प्रवेश — MBBS, BDS, AYUSH कॉलेज',
		emoji: '🏥',
		gradient: 'from-rose-600 to-pink-500',
		shadow: 'shadow-rose-500/25',
		subjects: ['Biology', 'Physics', 'Chemistry'],
		eligibility: 'कक्षा 12 (PCB)',
		mode: 'Pen & Paper',
	},
	{
		name: 'MP PPT / PAT',
		desc: 'पॉलिटेक्निक और कृषि — MP स्तरीय',
		emoji: '🌾',
		gradient: 'from-emerald-600 to-green-500',
		shadow: 'shadow-emerald-500/25',
		subjects: ['Maths', 'Science', 'GK'],
		eligibility: 'कक्षा 10 / 12',
		mode: 'Offline',
	},
	{
		name: 'CLAT',
		desc: 'लॉ प्रवेश — NLU और लॉ यूनिवर्सिटी',
		emoji: '⚖️',
		gradient: 'from-amber-600 to-yellow-500',
		shadow: 'shadow-amber-500/25',
		subjects: ['English', 'GK', 'Legal Aptitude', 'Reasoning'],
		eligibility: 'कक्षा 12 (कोई भी विषय)',
		mode: 'Online CBT',
	},
	{
		name: 'CUET',
		desc: 'केंद्रीय विश्वविद्यालय — DU, JNU, BHU आदि',
		emoji: '🎓',
		gradient: 'from-violet-600 to-purple-500',
		shadow: 'shadow-violet-500/25',
		subjects: ['Language', 'Domain Subject', 'GAT'],
		eligibility: 'कक्षा 12 (विषय अनुसार)',
		mode: 'Online CBT',
	},
	{
		name: 'NDA / CDS',
		desc: 'रक्षा सेवा — सेना, नौसेना, वायुसेना',
		emoji: '🎖️',
		gradient: 'from-slate-600 to-gray-500',
		shadow: 'shadow-slate-500/25',
		subjects: ['Maths', 'GK', 'English', 'SSB Interview'],
		eligibility: 'कक्षा 12 / स्नातक',
		mode: 'Pen & Paper + SSB',
	},
];

export default function EntranceExamsPage() {
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
						<h1 className='text-lg font-bold leading-tight'>प्रवेश परीक्षा</h1>
						<p className='text-[10px] text-white/40 font-medium'>Entrance Exam Study Material</p>
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
						<BookOpenCheck size={18} className='text-amber-400' />
						<span className='text-xs font-medium text-amber-400 uppercase tracking-wider'>
							अध्ययन सामग्री
						</span>
					</div>
					<h2 className='text-2xl font-bold leading-tight'>
						प्रवेश परीक्षा की
						<br />
						<span className='bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent'>
							पूरी तैयारी
						</span>
					</h2>
					<p className='text-sm text-white/40 mt-2 leading-relaxed'>
						प्रमुख प्रवेश परीक्षाओं की जानकारी, विषय और तैयारी सामग्री
					</p>
				</motion.div>
			</div>

			{/* Exam Cards */}
			<div className='px-4 pt-4 space-y-4'>
				{entranceExams.map((exam, index) => (
					<motion.div
						key={exam.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 + index * 0.06 }}
						className='bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden group cursor-pointer hover:bg-white/[0.07] transition-colors'>

						<div className='p-5'>
							<div className='flex items-start gap-4'>
								{/* Emoji icon */}
								<div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exam.gradient} flex items-center justify-center text-2xl shadow-lg ${exam.shadow} shrink-0`}>
									{exam.emoji}
								</div>

								{/* Content */}
								<div className='flex-1 min-w-0'>
									<div className='flex items-start justify-between'>
										<div>
											<h3 className='text-base font-black text-white'>
												{exam.name}
											</h3>
											<p className='text-[11px] text-white/40 mt-0.5 leading-relaxed'>
												{exam.desc}
											</p>
										</div>
										<div className='opacity-25 group-hover:opacity-60 transition-opacity'>
											<ArrowUpRight className='w-4 h-4 text-white' />
										</div>
									</div>

									{/* Meta tags */}
									<div className='flex flex-wrap gap-x-4 gap-y-1 mt-3'>
										<span className='text-[10px] text-white/30'>
											📋 <span className='text-white/50'>{exam.eligibility}</span>
										</span>
										<span className='text-[10px] text-white/30'>
											💻 <span className='text-white/50'>{exam.mode}</span>
										</span>
									</div>

									{/* Subject chips */}
									<div className='flex flex-wrap gap-1.5 mt-3'>
										{exam.subjects.map((sub) => (
											<span
												key={sub}
												className='text-[10px] font-medium text-white/50 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-lg'>
												{sub}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Note */}
			<div className='px-4 pt-4'>
				<div className='flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10'>
					<FileText className='w-4 h-4 text-amber-400 shrink-0' />
					<p className='text-[11px] text-white/50 leading-relaxed'>
						अध्ययन सामग्री, मॉक टेस्ट और पिछले वर्षों के प्रश्नपत्र जल्द ही उपलब्ध होंगे।
					</p>
				</div>
			</div>
		</div>
	);
}
