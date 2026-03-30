'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	GraduationCap,
	School,
	BookOpenCheck,
	ArrowUpRight,
	Sparkles,
} from 'lucide-react';

const sections = [
	{
		title: 'करियर मार्गदर्शन',
		titleEn: 'Career Counseling',
		desc: '10वीं के बाद करियर का पूरा रोडमैप। AI assistant से पूछें कोई भी सवाल।',
		icon: GraduationCap,
		href: '/education/career',
		gradient: 'from-cyan-500 to-blue-600',
		shadow: 'shadow-cyan-500/30',
		accent: 'bg-cyan-500/10 border-cyan-500/20',
		accentText: 'text-cyan-400',
		label: '12+ करियर ऑप्शन',
	},
	{
		title: 'MP कॉलेज सूची',
		titleEn: 'Colleges in Madhya Pradesh',
		desc: 'मध्य प्रदेश के सभी प्रमुख इंजीनियरिंग, मेडिकल, लॉ और अन्य कॉलेज।',
		icon: School,
		href: '/education/colleges',
		gradient: 'from-violet-500 to-purple-600',
		shadow: 'shadow-violet-500/30',
		accent: 'bg-violet-500/10 border-violet-500/20',
		accentText: 'text-violet-400',
		label: '290+ कॉलेज',
	},
	{
		title: 'प्रवेश परीक्षा',
		titleEn: 'Entrance Exam Material',
		desc: 'JEE, NEET, CLAT, CUET और अन्य प्रवेश परीक्षाओं की अध्ययन सामग्री।',
		icon: BookOpenCheck,
		href: '/education/entrance-exams',
		gradient: 'from-amber-500 to-orange-600',
		shadow: 'shadow-amber-500/30',
		accent: 'bg-amber-500/10 border-amber-500/20',
		accentText: 'text-amber-400',
		label: '6 प्रमुख परीक्षाएं',
	},
];

export default function EducationPage() {
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
						<h1 className='text-lg font-bold leading-tight'>शिक्षा</h1>
						<p className='text-[10px] text-white/40 font-medium'>Education & Career Hub</p>
					</div>
				</div>
			</div>

			{/* Hero */}
			<div className='px-5 pt-8 pb-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					<div className='flex items-center gap-2 mb-3'>
						<Sparkles size={18} className='text-amber-400' />
						<span className='text-xs font-medium text-amber-400 uppercase tracking-wider'>
							मध्य प्रदेश के छात्रों के लिए
						</span>
					</div>
					<h2 className='text-3xl font-black leading-tight tracking-tight'>
						अपना भविष्य
						<br />
						<span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
							यहाँ से शुरू करें
						</span>
					</h2>
					<p className='text-sm text-white/40 mt-3 leading-relaxed max-w-xs'>
						करियर चुनें, कॉलेज खोजें, और परीक्षा की तैयारी — सब एक जगह।
					</p>
				</motion.div>
			</div>

			{/* Section Cards */}
			<div className='px-4 pt-4 space-y-4'>
				{sections.map((section, index) => {
					const SectionIcon = section.icon;
					return (
						<motion.div
							key={section.href}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.15 + index * 0.1,
								type: 'spring',
								stiffness: 260,
								damping: 22,
							}}
							whileTap={{ scale: 0.98 }}
							onClick={() => router.push(section.href)}
							className='group relative bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:bg-white/[0.07] transition-colors'>

							{/* Top gradient accent bar */}
							<div className={`h-1 bg-gradient-to-r ${section.gradient}`} />

							<div className='p-5'>
								<div className='flex items-start gap-4'>
									{/* Icon */}
									<div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-xl ${section.shadow} shrink-0`}>
										<SectionIcon className='w-7 h-7 text-white' />
									</div>

									{/* Content */}
									<div className='flex-1 min-w-0'>
										<div className='flex items-start justify-between'>
											<div>
												<h3 className='text-lg font-black text-white leading-tight'>
													{section.title}
												</h3>
												<p className='text-[10px] text-white/35 font-medium uppercase tracking-wider mt-0.5'>
													{section.titleEn}
												</p>
											</div>
											<div className='opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all'>
												<ArrowUpRight className='w-5 h-5 text-white' />
											</div>
										</div>

										<p className='text-xs text-white/40 mt-2 leading-relaxed line-clamp-2'>
											{section.desc}
										</p>

										{/* Badge */}
										<div className={`inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full border ${section.accent}`}>
											<div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.gradient}`} />
											<span className={`text-[10px] font-bold ${section.accentText}`}>
												{section.label}
											</span>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Footer */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className='px-6 pt-10 pb-10 text-center'>
				<p className='text-xs text-white/20'>
					प्रत्येक करियर में AI assistant उपलब्ध है आपके सवालों के लिए
				</p>
			</motion.div>
		</div>
	);
}
