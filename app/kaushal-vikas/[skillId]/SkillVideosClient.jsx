'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
	kaushalSkills,
	getPlaylistUrl,
	getPlaylistEmbedUrl,
	getVideoUrl,
	getVideoEmbedUrl,
} from '../kaushalData';

export default function SkillVideosClient({ skillId }) {
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

	const items = skill.playlists ?? [];
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
								सीखने के वीडियो
							</h1>
							<p className='text-[11px] font-medium text-slate-500'>
								{skill.title} · YouTube
							</p>
						</div>
					</div>
				</div>
			</header>

			<main className='relative mx-auto max-w-lg px-4 pb-8 pt-5'>
				<div className='flex flex-col gap-6'>
					{items.length === 0 ? (
						<p className='text-center text-sm text-slate-500'>
							वीडियो जल्द जोड़े जाएंगे।
						</p>
					) : (
						items.map((item, i) => {
							const isPlaylist = !!item.listId;
							const hasMedia = !!item.listId || !!item.videoId;
							const url = isPlaylist ? getPlaylistUrl(item.listId) : (item.videoId ? getVideoUrl(item.videoId) : '#');
							const embedUrl = isPlaylist ? getPlaylistEmbedUrl(item.listId) : (item.videoId ? getVideoEmbedUrl(item.videoId) : '#');

							return (
								<motion.section
									key={`${item.listId || item.videoId}-${i}`}
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.05 * i }}
									className='overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.05] ring-1 ring-white/90'>
									<div className='border-b border-slate-100 bg-slate-50/80 px-4 py-3'>
										<p className='text-[10px] font-semibold text-slate-400'>
											{isPlaylist ? 'प्लेलिस्ट' : 'वीडियो'} {i + 1}
										</p>
										<h2 className='text-[15px] font-bold leading-snug text-slate-900'>
											{item.title}
										</h2>
										{hasMedia ? (
											<a
												href={url}
												target='_blank'
												rel='noopener noreferrer'
												className='mt-2 inline-flex w-fit items-center gap-1.5 text-[12px] font-semibold text-red-600 hover:text-red-700'>
												YouTube पर खोलें
												<ExternalLink className='h-3.5 w-3.5' />
											</a>
										) : null}
									</div>
									{hasMedia ? (
										<div className='aspect-video w-full bg-black'>
											<iframe
												title={item.title}
												src={embedUrl}
												className='h-full w-full'
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
												allowFullScreen
											/>
										</div>
									) : (
										<div className='bg-slate-100 px-4 py-6 text-center text-sm text-slate-600'>
											URL ID जोड़ें (kaushalData.js)
										</div>
									)}
								</motion.section>
							);
						})
					)}
				</div>

				<p className='mt-8 text-center text-[11px] leading-relaxed text-slate-400'>
					वीडियो न चलें तो &quot;YouTube पर खोलें&quot; से देखें।
				</p>
			</main>
		</div>
	);
}
