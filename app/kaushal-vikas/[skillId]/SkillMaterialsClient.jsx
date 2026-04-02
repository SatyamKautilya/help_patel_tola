'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import { kaushalSkills } from '../kaushalData';

export default function SkillMaterialsClient({ skillId }) {
	const router = useRouter();
	const skill =
		typeof skillId === 'string' ? kaushalSkills[skillId] : undefined;

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

	const hub = `/kaushal-vikas/${skill.id}`;

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
						onClick={() => router.push(hub)}
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
								उपकरण व सामग्री
							</h1>
							<p className='text-[11px] font-medium text-slate-500'>
								{skill.title} · Equipments &amp; materials
							</p>
						</div>
					</div>
				</div>
			</header>

			<main className='relative mx-auto max-w-lg px-4 pb-8 pt-5'>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className={`mb-5 flex items-start gap-3 rounded-2xl border ${skill.cardBorder} bg-gradient-to-br ${skill.cardBg} p-4 shadow-sm ring-1 ring-white/70`}>
					<span
						className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${skill.gradient} text-white shadow-md`}>
						<ClipboardList className='h-5 w-5' strokeWidth={2} />
					</span>
					<p className='text-[13px] leading-relaxed text-slate-700'>
						इस कौशल के लिए ज़रूरी उपकरण और सामग्री की सूची नीचे है।
					</p>
				</motion.div>

				<ul className='space-y-2.5'>
					{skill.tools.map((t, idx) => (
						<motion.li
							key={t}
							initial={{ opacity: 0, x: -6 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.04 * idx }}
							className='flex items-center gap-3 rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-[13px] font-medium text-slate-800 shadow-sm'>
							<span
								className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${skill.gradient} text-[11px] font-bold text-white`}>
								{idx + 1}
							</span>
							{t}
						</motion.li>
					))}
				</ul>

				<div className='mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/90 px-3 py-4 text-center'>
					<p className='text-[12px] font-medium text-slate-600'>
						अधिक जानकारी जल्द जोड़ी जाएगी
					</p>
					<p className='mt-1 text-[11px] text-slate-400'>
						More details will be added soon
					</p>
				</div>
			</main>
		</div>
	);
}
