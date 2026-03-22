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
			color: 'bg-amber-100 text-amber-700 border-amber-200',
			dot: 'bg-amber-500',
		};
	}
	if (daysLeft < 0) {
		return {
			label: 'समय समाप्त',
			color: 'bg-red-50 text-red-600 border-red-200',
			dot: 'bg-red-400',
		};
	}
	if (daysLeft <= 7) {
		return {
			label: `${daysLeft} दिन बाकी!`,
			color: 'bg-red-50 text-red-600 border-red-200',
			dot: 'bg-red-500 animate-pulse',
		};
	}
	if (daysLeft <= 30) {
		return {
			label: `${daysLeft} दिन बाकी`,
			color: 'bg-orange-50 text-orange-600 border-orange-200',
			dot: 'bg-orange-500',
		};
	}
	return {
		label: 'आवेदन चालू',
		color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
		dot: 'bg-emerald-500',
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
			className='rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden'>
			{/* Card Header */}
			<button
				onClick={() => setExpanded(!expanded)}
				className='w-full text-left p-4 active:bg-slate-50 transition-colors'>
				<div className='flex items-start justify-between gap-2'>
					<div className='min-w-0 flex-1'>
						<div className='flex items-center gap-2 flex-wrap mb-1.5'>
							<span
								className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.color}`}>
								<span
									className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
								/>
								{status.label}
							</span>
							{job.isNew && (
								<span className='text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full'>
									NEW
								</span>
							)}
						</div>
						<h3 className='text-[15px] font-bold text-slate-800 leading-snug'>
							{job.title}
						</h3>
						<p className='text-[11px] text-slate-400 mt-0.5'>
							{job.organization}
						</p>
					</div>
					<div className='text-right shrink-0'>
						<p className='text-lg font-bold text-blue-600'>
							{typeof job.vacancies === 'number'
								? job.vacancies.toLocaleString('en-IN')
								: '—'}
						</p>
						<p className='text-[9px] text-slate-400'>पद</p>
					</div>
				</div>

				<div className='flex items-center gap-3 mt-2.5 flex-wrap'>
					<div className='flex items-center gap-1'>
						<Calendar size={11} className='text-slate-400' />
						<span className='text-[10px] text-slate-500'>
							अंतिम तिथि:{' '}
							<span className='text-slate-700 font-medium'>
								{formatDate(job.applicationEnd)}
							</span>
						</span>
					</div>
					<div className='flex items-center gap-1'>
						<GraduationCap size={11} className='text-slate-400' />
						<span className='text-[10px] text-slate-500 line-clamp-1'>
							{job.qualification}
						</span>
					</div>
				</div>

				<div className='flex justify-center mt-2'>
					{expanded ? (
						<ChevronUp size={14} className='text-slate-300' />
					) : (
						<ChevronDown size={14} className='text-slate-300' />
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
						<div className='px-4 pb-4 space-y-3 border-t border-slate-100 pt-3'>
							<div className='grid grid-cols-2 gap-2.5'>
								<DetailItem
									icon={
										<Briefcase
											size={12}
											className='text-violet-500'
										/>
									}
									label='पद'
									value={job.posts}
								/>
								<DetailItem
									icon={
										<Users
											size={12}
											className='text-blue-500'
										/>
									}
									label='आयु सीमा'
									value={job.ageLimit}
								/>
								<DetailItem
									icon={
										<Calendar
											size={12}
											className='text-emerald-500'
										/>
									}
									label='आवेदन शुरू'
									value={formatDate(job.applicationStart)}
								/>
								<DetailItem
									icon={
										<Clock
											size={12}
											className='text-orange-500'
										/>
									}
									label='अंतिम तिथि'
									value={formatDate(job.applicationEnd)}
								/>
								<DetailItem
									icon={
										<BadgeCheck
											size={12}
											className='text-amber-500'
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
											className='text-pink-500'
										/>
									}
									label='योग्यता'
									value={job.qualification}
								/>
							</div>

							{/* Salary */}
							<div className='flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100'>
								<span className='text-sm'>💰</span>
								<div>
									<p className='text-[10px] text-slate-400'>
										वेतन
									</p>
									<p className='text-xs text-emerald-700 font-medium'>
										{job.salary}
									</p>
								</div>
							</div>

							{/* Department */}
							<p className='text-[11px] text-slate-400'>
								<span className='text-slate-300'>विभाग:</span>{' '}
								{job.department}
							</p>

							{/* Apply Button */}
							<a
								href={job.applyLink}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold active:scale-[0.98] transition-transform shadow-md shadow-blue-600/20'>
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
				<p className='text-[9px] text-slate-400'>{label}</p>
				<p className='text-[11px] text-slate-600 leading-snug'>
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
		<div className='min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/50'>
			{/* Header */}
			<div className='sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						onClick={() => router.back()}
						className='w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 transition-transform text-slate-600'>
						<ArrowLeft size={18} />
					</button>
					<div>
						<h1 className='text-lg font-bold text-slate-800'>
							सरकारी नौकरियां
						</h1>
						<p className='text-[10px] text-slate-400'>
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
						className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
					/>
					<input
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='भर्ती खोजें... (SSC, Railway, Police...)'
						className='w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm'
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
										? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20'
										: 'bg-white border-slate-200 text-slate-500'
								}`}>
								<span className='text-sm'>{cat.emoji}</span>
								<span>{cat.label}</span>
								<span
									className={`text-[9px] px-1.5 rounded-full ${
										isActive
											? 'bg-white/20 text-white'
											: 'bg-slate-100 text-slate-400'
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
					<div className='flex-1 rounded-xl bg-white border border-slate-200 p-2.5 text-center shadow-sm'>
						<p className='text-lg font-bold text-blue-600'>
							{filteredJobs.length}
						</p>
						<p className='text-[9px] text-slate-400'>भर्तियां</p>
					</div>
					<div className='flex-1 rounded-xl bg-white border border-slate-200 p-2.5 text-center shadow-sm'>
						<p className='text-lg font-bold text-emerald-600'>
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
						<p className='text-[9px] text-slate-400'>कुल पद</p>
					</div>
					<div className='flex-1 rounded-xl bg-white border border-slate-200 p-2.5 text-center shadow-sm'>
						<p className='text-lg font-bold text-amber-600'>
							{
								filteredJobs.filter(
									(j) => j.status === 'active',
								).length
							}
						</p>
						<p className='text-[9px] text-slate-400'>
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
							className='mx-auto text-slate-300 mb-3'
						/>
						<p className='text-sm text-slate-400'>
							कोई भर्ती नहीं मिली
						</p>
						<p className='text-xs text-slate-300 mt-1'>
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
				<p className='text-[10px] text-slate-300 leading-relaxed'>
					⚠️ कृपया आवेदन करने से पहले official website पर जाकर
					notification verify करें। तिथियां बदल सकती हैं।
				</p>
			</div>
		</div>
	);
}
