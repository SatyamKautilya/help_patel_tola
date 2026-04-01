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
		<div className='min-h-screen bg-gradient-to-b from-slate-100 via-white to-amber-50/20 text-slate-800 pb-16'>
			<div className='sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={() => router.back()}
						className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center justify-center active:scale-90 transition-transform shadow-sm'>
						<ArrowLeft size={18} />
					</button>
					<div>
						<h1 className='text-lg font-bold leading-tight text-slate-900'>प्रवेश परीक्षा</h1>
						<p className='text-[11px] text-slate-500 font-medium'>जानकारी व विषय</p>
					</div>
				</div>
			</div>

			<div className='px-5 pt-6 pb-2'>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}>
					<div className='flex items-center gap-2 mb-2'>
						<BookOpenCheck size={16} className='text-amber-600' />
						<span className='text-xs font-medium text-slate-500'>मुख्य परीक्षाएं</span>
					</div>
					<h2 className='text-xl font-bold leading-snug text-slate-900'>
						तैयारी
					</h2>
				</motion.div>
			</div>

			<div className='px-4 pt-3 space-y-3'>
				{entranceExams.map((exam, index) => (
					<motion.div
						key={exam.name}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.05 + index * 0.04 }}
						className='bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm shadow-slate-200/40 group cursor-pointer hover:border-slate-300 hover:shadow-md transition-all'>

						<div className='p-4'>
							<div className='flex items-start gap-3'>
								<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.gradient} flex items-center justify-center text-xl shadow-md ${exam.shadow} shrink-0`}>
									{exam.emoji}
								</div>

								<div className='flex-1 min-w-0'>
									<div className='flex items-start justify-between gap-2'>
										<div>
											<h3 className='text-[15px] font-bold text-slate-900 leading-snug'>
												{exam.name}
											</h3>
											<p className='text-[11px] text-slate-500 mt-0.5 line-clamp-2'>
												{exam.desc}
											</p>
										</div>
										<ArrowUpRight className='w-4 h-4 text-slate-300 group-hover:text-slate-500 shrink-0 mt-0.5 transition-colors' />
									</div>

									<div className='flex flex-wrap gap-x-3 gap-y-0.5 mt-2'>
										<span className='text-[10px] text-slate-500'>
											{exam.eligibility}
										</span>
										<span className='text-[10px] text-slate-400'>·</span>
										<span className='text-[10px] text-slate-500'>{exam.mode}</span>
									</div>

									<div className='flex flex-wrap gap-1.5 mt-2'>
										{exam.subjects.map((sub) => (
											<span
												key={sub}
												className='text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200/90 px-2 py-0.5 rounded-md'>
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

			<div className='px-4 pt-3'>
				<div className='flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50/80 border border-amber-100'>
					<FileText className='w-4 h-4 text-amber-700 shrink-0' />
					<p className='text-[11px] text-slate-600 leading-snug'>
						मॉक टेस्ट व पूर्व प्रश्न जल्द
					</p>
				</div>
			</div>
		</div>
	);
}
