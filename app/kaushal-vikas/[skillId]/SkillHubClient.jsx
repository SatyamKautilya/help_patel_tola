'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	PlayCircle,
	ClipboardList,
	ChevronRight,
	Wrench,
	Zap,
	Droplets,
	PaintBucket,
	Hammer,
	Cpu,
	Scissors,
	ChefHat,
} from 'lucide-react';
import { kaushalSkills } from '../kaushalData';

const iconMap = {
	Zap,
	Droplets,
	PaintBucket,
	Hammer,
	Cpu,
	Scissors,
	Wrench,
	ChefHat,
};

export default function SkillHubClient({ skillId }) {
	const router = useRouter();
	const skill =
		typeof skillId === 'string' ? kaushalSkills[skillId] : undefined;
	const SkillIcon = skill ? iconMap[skill.icon] || Wrench : Wrench;

	if (!skill) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-white px-4 text-slate-800'>
				<p className='text-lg font-medium text-slate-900'>कौशल नहीं मिला</p>
				<button
					type='button'
					onClick={() => router.push('/kaushal-vikas')}
					className='mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm'>
					वापस जाएं
				</button>
			</div>
		);
	}

	const base = `/kaushal-vikas/${skill.id}`;
	const nVideos = skill.playlists?.length ?? 0;
	const nTools = skill.tools?.length ?? 0;

	return (
		<div className='relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-white to-amber-50/35 pb-24 text-slate-800'>
			<div
				className='pointer-events-none absolute inset-0 overflow-hidden'
				aria-hidden>
				<div
					className={`absolute -right-16 top-0 h-64 w-64 rounded-full bg-gradient-to-br ${skill.glow} blur-3xl opacity-90`}
				/>
			</div>

			<header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'>
				<div className='mx-auto flex max-w-lg items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={() => router.push('/kaushal-vikas')}
						className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-transform active:scale-95'>
						<ArrowLeft size={18} />
					</button>
					<div className='flex min-w-0 flex-1 items-center gap-3'>
						<div
							className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg shadow-md ${skill.gradient} text-white ring-2 ring-white/50`}>
							{skill.emoji}
						</div>
						<div className='min-w-0'>
							<h1 className='truncate text-base font-bold text-slate-900'>
								{skill.title}
							</h1>
							<p className='text-[11px] font-medium text-slate-500'>
								{skill.titleEn}
							</p>
						</div>
					</div>
				</div>
			</header>

			<main className='relative mx-auto max-w-lg px-4 pb-8 pt-5'>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className={`mb-6 flex gap-3 rounded-2xl border ${skill.cardBorder} bg-gradient-to-br ${skill.cardBg} p-4 shadow-sm ring-1 ring-white/70`}>
					<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 text-slate-600 shadow-sm'>
						<SkillIcon className='h-5 w-5' strokeWidth={2} />
					</span>
					<p className='text-[13px] leading-relaxed text-slate-700'>
						{skill.desc}
					</p>
				</motion.div>

				<p className='mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400'>
					खोलें
				</p>

				<div className='flex flex-col gap-4'>
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.05 }}>
						<Link
							href={`${base}/videos`}
							className={`group flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-md shadow-slate-900/[0.05] ring-1 ring-white/90 transition-all hover:border-slate-300 hover:shadow-lg`}>
							<span
								className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.gradient} text-white shadow-lg ring-2 ring-white/50`}>
								<PlayCircle className='h-7 w-7' strokeWidth={2} />
							</span>
							<div className='min-w-0 flex-1'>
								<h2 className='text-base font-bold text-slate-900'>
									सीखने के वीडियो
								</h2>
								<p className='text-[11px] font-medium text-slate-500'>
									Learning videos · {nVideos} प्लेलिस्ट
								</p>
							</div>
							<ChevronRight className='h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-slate-600' />
						</Link>
					</motion.div>

				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.15 }}
					className='mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center'>
					<p className='text-sm font-bold text-slate-600'>
						अन्य जानकारी शीघ्र जोड़ी जाएगी
					</p>
					<p className='mt-1 text-[11px] font-medium text-slate-400'>
						Other information will be added soon
					</p>
				</motion.div>
			</main>
		</div>
	);
}
