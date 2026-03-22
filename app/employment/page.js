'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	Search,
	Calendar,
	Users,
	ExternalLink,
	Clock,
	BadgeCheck,
	ChevronDown,
	ChevronUp,
	GraduationCap,
	Briefcase,
	AlertCircle,
} from 'lucide-react';
import { categories, jobs } from './jobsData';

function getStatusInfo(job) {
	const now = new Date();
	const endDate = new Date(job.applicationEnd);
	const startDate = new Date(job.applicationStart);
	const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

	if (job.status === 'upcoming' || startDate > now) {
		return {
			label: 'जल्द आ रहा है',
			color: 'bg-amber-500/20 text-amber-300 border-amber-500/20',
			dot: 'bg-amber-400',
		};
	}
	if (daysLeft < 0) {
		return {
			label: 'समय समाप्त',
			color: 'bg-red-500/15 text-red-300 border-red-500/20',
			dot: 'bg-red-400',
		};
	}
	if (daysLeft <= 7) {
		return {
			label: `${daysLeft} दिन बाकी!`,
			color: 'bg-red-500/20 text-red-300 border-red-500/20',
			dot: 'bg-red-400 animate-pulse',
		};
	}
	if (daysLeft <= 30) {
		return {
			label: `${daysLeft} दिन बाकी`,
			color: 'bg-orange-500/20 text-orange-300 border-orange-500/20',
			dot: 'bg-orange-400',
		};
	}
	return {
		label: 'आवेदन चालू',
		color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20',
		dot: 'bg-emerald-400',
	};
}

function formatDate(dateStr) {
	const d = new Date(dateStr);
	return d.toLocaleDateString('hi-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
}

/* ─── Job Card ─── */
function JobCard({ job, index }) {
	const [expanded, setExpanded] = useState(false);
	const status = getStatusInfo(job);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.04, duration: 0.3 }}
			className='rounded-2xl bg-white/[0.04] border border-white/[0.07] overflow-hidden'>
			{/* Card Header */}
			<button
				onClick={() => setExpanded(!expanded)}
				className='w-full text-left p-4 active:bg-white/[0.02] transition-colors'>
				<div className='flex items-start justify-between gap-2'>
					<div className='min-w-0 flex-1'>
						<div className='flex items-center gap-2 flex-wrap mb-1.5'>
							{/* Status badge */}
							<span
								className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.color}`}>
								<span
									className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
								/>
								{status.label}
							</span>
							{job.isNew && (
								<span className='text-[9px] font-bold text-cyan-300 bg-cyan-500/15 px-1.5 py-0.5 rounded-full'>
									NEW
								</span>
							)}
						</div>
						<h3 className='text-[15px] font-bold text-white leading-snug'>
							{job.title}
						</h3>
						<p className='text-[11px] text-white/35 mt-0.5'>
							{job.organization}
						</p>
					</div>
					{/* Vacancy count */}
					<div className='text-right shrink-0'>
						<p className='text-lg font-bold text-cyan-400'>
							{typeof job.vacancies === 'number'
								? job.vacancies.toLocaleString('en-IN')
								: '—'}
						</p>
						<p className='text-[9px] text-white/30'>पद</p>
					</div>
				</div>

				{/* Quick info row */}
				<div className='flex items-center gap-3 mt-2.5 flex-wrap'>
					<div className='flex items-center gap-1'>
						<Calendar size={11} className='text-white/25' />
						<span className='text-[10px] text-white/40'>
							अंतिम तिथि:{' '}
							<span className='text-white/60 font-medium'>
								{formatDate(job.applicationEnd)}
							</span>
						</span>
					</div>
					<div className='flex items-center gap-1'>
						<GraduationCap size={11} className='text-white/25' />
						<span className='text-[10px] text-white/40 line-clamp-1'>
							{job.qualification}
						</span>
					</div>
				</div>

				{/* Expand indicator */}
				<div className='flex justify-center mt-2'>
					{expanded ? (
						<ChevronUp size={14} className='text-white/20' />
					) : (
						<ChevronDown size={14} className='text-white/20' />
					)}
				</div>
			</button>

			{/* Expanded Details */}
			<AnimatePresence>
				{expanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25 }}
						className='overflow-hidden'>
						<div className='px-4 pb-4 space-y-3 border-t border-white/5 pt-3'>
							{/* Detail rows */}
							<div className='grid grid-cols-2 gap-2.5'>
								<DetailItem
									icon={
										<Briefcase
											size={12}
											className='text-violet-400/60'
										/>
									}
									label='पद'
									value={job.posts}
								/>
								<DetailItem
									icon={
										<Users
											size={12}
											className='text-cyan-400/60'
										/>
									}
									label='आयु सीमा'
									value={job.ageLimit}
								/>
								<DetailItem
									icon={
										<Calendar
											size={12}
											className='text-emerald-400/60'
										/>
									}
									label='आवेदन शुरू'
									value={formatDate(job.applicationStart)}
								/>
								<DetailItem
									icon={
										<Clock
											size={12}
											className='text-orange-400/60'
										/>
									}
									label='अंतिम तिथि'
									value={formatDate(job.applicationEnd)}
								/>
								<DetailItem
									icon={
										<BadgeCheck
											size={12}
											className='text-amber-400/60'
										/>
									}
									label='परीक्षा तिथि'
									value={
										job.examDate.includes('-')
											? formatDate(job.examDate)
											: job.examDate
									}
								/>
								<DetailItem
									icon={
										<GraduationCap
											size={12}
											className='text-pink-400/60'
										/>
									}
									label='योग्यता'
									value={job.qualification}
								/>
							</div>

							{/* Salary */}
							<div className='flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10'>
								<span className='text-sm'>💰</span>
								<div>
									<p className='text-[10px] text-white/30'>
										वेतन
									</p>
									<p className='text-xs text-emerald-300/70 font-medium'>
										{job.salary}
									</p>
								</div>
							</div>

							{/* Department */}
							<p className='text-[11px] text-white/30'>
								<span className='text-white/20'>विभाग:</span>{' '}
								{job.department}
							</p>

							{/* Apply Button */}
							<a
								href={job.applyLink}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold active:scale-[0.98] transition-transform'>
								<ExternalLink size={14} />
								Apply करें / आवेदन करें
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

function DetailItem({ icon, label, value }) {
	return (
		<div className='flex items-start gap-1.5'>
			<div className='mt-0.5'>{icon}</div>
			<div className='min-w-0'>
				<p className='text-[9px] text-white/25'>{label}</p>
				<p className='text-[11px] text-white/55 leading-snug'>
					{value}
				</p>
			</div>
		</div>
	);
}

/* ─── Main Page ─── */
export default function EmploymentPage() {
	const router = useRouter();
	const [activeCategory, setActiveCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');

	const filteredJobs = useMemo(() => {
		let filtered = jobs;

		if (activeCategory !== 'all') {
			filtered = filtered.filter((j) => j.category === activeCategory);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(j) =>
					j.title.toLowerCase().includes(q) ||
					j.organization.toLowerCase().includes(q) ||
					j.posts.toLowerCase().includes(q) ||
					j.department.toLowerCase().includes(q),
			);
		}

		return filtered.sort((a, b) => {
			const statusOrder = { active: 0, upcoming: 1 };
			const aOrder = statusOrder[a.status] ?? 2;
			const bOrder = statusOrder[b.status] ?? 2;
			if (aOrder !== bOrder) return aOrder - bOrder;
			return new Date(a.applicationEnd) - new Date(b.applicationEnd);
		});
	}, [activeCategory, searchQuery]);

	const activeCount = jobs.filter((j) => j.status === 'active').length;
	const totalVacancies = jobs.reduce(
		(sum, j) => sum + (typeof j.vacancies === 'number' ? j.vacancies : 0),
		0,
	);

	return (
		<div className='min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white'>
			{/* Header */}
			<div className='sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						onClick={() => router.back()}
						className='w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform'>
						<ArrowLeft size={18} />
					</button>
					<div>
						<h1 className='text-lg font-bold'>सरकारी नौकरियां</h1>
						<p className='text-[10px] text-white/30'>
							{activeCount} भर्तियां चालू •{' '}
							{totalVacancies.toLocaleString('en-IN')}+ पद
						</p>
					</div>
				</div>
			</div>

			{/* Search */}
			<div className='px-4 pt-4 pb-2'>
				<div className='relative'>
					<Search
						size={16}
						className='absolute left-3 top-1/2 -translate-y-1/2 text-white/25'
					/>
					<input
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='भर्ती खोजें... (SSC, Railway, Police...)'
						className='w-full bg-white/[0.05] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/20 transition-colors'
					/>
				</div>
			</div>

			{/* Category Tabs */}
			<div className='px-4 py-2'>
				<div className='flex gap-2 overflow-x-auto no-scrollbar pb-1'>
					{categories.map((cat) => {
						const isActive = activeCategory === cat.id;
						const count =
							cat.id === 'all'
								? jobs.length
								: jobs.filter((j) => j.category === cat.id)
										.length;
						return (
							<button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all active:scale-95 ${
									isActive
										? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
										: 'bg-white/[0.03] border-white/[0.06] text-white/40'
								}`}>
								<span className='text-sm'>{cat.emoji}</span>
								<span>{cat.label}</span>
								<span
									className={`text-[9px] px-1 rounded-full ${
										isActive
											? 'bg-cyan-500/20 text-cyan-300'
											: 'bg-white/5 text-white/25'
									}`}>
									{count}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Stats Bar */}
			<div className='px-4 py-2'>
				<div className='flex gap-2'>
					<div className='flex-1 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/10 p-2.5 text-center'>
						<p className='text-lg font-bold text-cyan-400'>
							{filteredJobs.length}
						</p>
						<p className='text-[9px] text-white/25'>भर्तियां</p>
					</div>
					<div className='flex-1 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10 p-2.5 text-center'>
						<p className='text-lg font-bold text-emerald-400'>
							{filteredJobs
								.reduce(
									(s, j) =>
										s +
										(typeof j.vacancies === 'number'
											? j.vacancies
											: 0),
									0,
								)
								.toLocaleString('en-IN')}
						</p>
						<p className='text-[9px] text-white/25'>कुल पद</p>
					</div>
					<div className='flex-1 rounded-xl bg-amber-500/[0.06] border border-amber-500/10 p-2.5 text-center'>
						<p className='text-lg font-bold text-amber-400'>
							{
								filteredJobs.filter((j) => j.status === 'active')
									.length
							}
						</p>
						<p className='text-[9px] text-white/25'>
							आवेदन चालू
						</p>
					</div>
				</div>
			</div>

			{/* Job List */}
			<div className='px-4 pt-2 pb-8 space-y-3'>
				{filteredJobs.length === 0 ? (
					<div className='text-center py-12'>
						<AlertCircle
							size={32}
							className='mx-auto text-white/15 mb-3'
						/>
						<p className='text-sm text-white/30'>
							कोई भर्ती नहीं मिली
						</p>
						<p className='text-xs text-white/15 mt-1'>
							अन्य category देखें या search बदलें
						</p>
					</div>
				) : (
					filteredJobs.map((job, index) => (
						<JobCard key={job.id} job={job} index={index} />
					))
				)}
			</div>

			{/* Footer note */}
			<div className='px-6 pb-10 text-center'>
				<p className='text-[10px] text-white/15 leading-relaxed'>
					⚠️ कृपया आवेदन करने से पहले official website पर जाकर
					notification verify करें। तिथियां बदल सकती हैं।
				</p>
			</div>
		</div>
	);
}
