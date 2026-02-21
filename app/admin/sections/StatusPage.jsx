import { Globe, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const StatusPage = () => {
	const [totalUsers, setTotalUsers] = useState(0);
	const [todayUser, setTodayUser] = useState(0);
	const [totalFeedbacks, setTotalFeedbacks] = useState(0);
	const [lastTenFeedbacks, setLastTenFeedbacks] = useState([]);
	const [todayUsersList, setTodayUsersList] = useState([]);
	const [showTodayUsers, setShowTodayUsers] = useState(false);
	const [loadingTodayUsers, setLoadingTodayUsers] = useState(false);
	const [todayUsersError, setTodayUsersError] = useState('');
	const [lastTenUsers, setLastTenUsers] = useState([]);
	const [showLastTenUsers, setShowLastTenUsers] = useState(false);
	const [loadingLastTenUsers, setLoadingLastTenUsers] = useState(false);
	const [lastTenUsersError, setLastTenUsersError] = useState('');
	const [showLastTenFeedbacks, setShowLastTenFeedbacks] = useState(false);

	const getStats = async () => {
		try {
			const resTotalUsers = await fetch('/api/query/database?name=total-users');
			const dataTotalUsers = await resTotalUsers.json();
			setTotalUsers(dataTotalUsers.totalUsers || 0);
			const resTodayUsers = await fetch('/api/query/database?name=today-users');
			const dataTodayUsers = await resTodayUsers.json();
			setTodayUser(dataTodayUsers.todayUser || 0);

			const resTotalFeedbacks = await fetch(
				'/api/query/database?name=total-feedbacks',
			);
			const dataTotalFeedbacks = await resTotalFeedbacks.json();
			setTotalFeedbacks(dataTotalFeedbacks.totalFeedbacks || 0);
			const resLastTenFeedbacks = await fetch(
				'/api/query/database?name=last-ten-feedbacks',
			);
			const dataLastTenFeedbacks = await resLastTenFeedbacks.json();
			setLastTenFeedbacks(dataLastTenFeedbacks.lastTenFeedbacks || []);
		} catch (error) {
			console.error('Error fetching stats:', error);
		}
	};

	useEffect(() => {
		getStats();
	}, []);

	const fetchTodayUsersList = async () => {
		try {
			setLoadingTodayUsers(true);
			setTodayUsersError('');
			const res = await fetch('/api/query/database?name=today-users-list');
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data?.error || 'Failed to load logged in users');
			}
			setTodayUsersList(Array.isArray(data?.users) ? data.users : []);
			setShowTodayUsers(true);
		} catch (error) {
			setTodayUsersError(error.message || 'Failed to load logged in users');
		} finally {
			setLoadingTodayUsers(false);
		}
	};

	const fetchLastTenUsers = async () => {
		try {
			setLoadingLastTenUsers(true);
			setLastTenUsersError('');
			const res = await fetch('/api/query/database?name=last-ten-users');
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data?.error || 'Failed to load newest members');
			}
			setLastTenUsers(Array.isArray(data?.users) ? data.users : []);
			setShowLastTenUsers(true);
		} catch (error) {
			setLastTenUsersError(error.message || 'Failed to load newest members');
		} finally {
			setLoadingLastTenUsers(false);
		}
	};

	const fetchLastTenFeedbacks = async () => {
		try {
			const res = await fetch('/api/query/database?name=last-ten-feedbacks');
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data?.error || 'Failed to load feedbacks');
			}
			setLastTenFeedbacks(Array.isArray(data?.lastTenFeedbacks) ? data.lastTenFeedbacks : []);
		} catch (error) {
			console.error(error);
		} finally {
			setShowLastTenFeedbacks(true);
		}
	};

	const stats = [
		{
			key: 'total_users',
			label: 'Total Users',
			value: totalUsers,
			icon: <Globe />,
			gradient: 'from-blue-500 to-cyan-500',
			trend: '+12.5%',
		},
		{
			key: 'today_users',
			label: 'Logged In Today',
			value: todayUser,
			icon: <Users />,
			gradient: 'from-emerald-500 to-teal-500',
			trend: '+8.2%',
		},
		{
			key: 'feedbacks',
			label: 'User Feedbacks',
			value: totalFeedbacks,
			icon: <MessageSquare />,
			gradient: 'from-purple-500 to-pink-500',
			trend: '+23.1%',
		},
		// suggest code here/
	];

	return (
		<div className='space-y-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
				{stats.map((s, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className='group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 min-h-[180px]'>
						{totalUsers === 0 && todayUser === 0 && totalFeedbacks === 0 ? (
							<div className='flex justify-center items-center h-full'>
								<p>Loading...</p>
							</div>
						) : (
							<>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
								/>
								<div className='relative z-10'>
									<div className='flex justify-between items-start mb-4'>
										<div
											className={`p-3 bg-gradient-to-br ${s.gradient} rounded-xl text-white shadow-lg`}>
											{s.icon}
										</div>
										<div className='flex items-center gap-1 text-emerald-400 text-sm font-semibold'>
											<TrendingUp size={14} />
											{s.trend}
										</div>
									</div>
									<p className='text-slate-400 text-sm mb-1'>{s.label}</p>
									<h2 className='text-4xl font-bold'>{s.value}</h2>
									{s.key === 'total_users' ? (
										<button
											onClick={fetchLastTenUsers}
											disabled={loadingLastTenUsers}
											className='mt-3 text-xs font-semibold px-3 py-1.5 rounded-lg border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 transition-all disabled:opacity-60'>
											{loadingLastTenUsers ? 'Loading...' : 'View last 10 members'}
										</button>
									) : null}
									{s.key === 'total_users' && lastTenUsersError ? (
										<p className='text-red-300 text-xs mt-2'>{lastTenUsersError}</p>
									) : null}
									{s.key === 'today_users' ? (
										<button
											onClick={fetchTodayUsersList}
											disabled={loadingTodayUsers}
											className='mt-3 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10 transition-all disabled:opacity-60'>
											{loadingTodayUsers ? 'Loading...' : 'View logged-in users'}
										</button>
									) : null}
									{s.key === 'today_users' && todayUsersError ? (
										<p className='text-red-300 text-xs mt-2'>{todayUsersError}</p>
									) : null}
									{s.key === 'feedbacks' ? (
										<button
											onClick={fetchLastTenFeedbacks}
											className='mt-3 text-xs font-semibold px-3 py-1.5 rounded-lg border border-purple-400/40 text-purple-300 hover:bg-purple-400/10 transition-all'>
											View last 10 feedbacks
										</button>
									) : null}
								</div>
							</>
						)}
					</motion.div>
				))}
			</div>
			<AnimatePresence>
				{showLastTenFeedbacks ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'>
						<motion.div
							initial={{ scale: 0.96, opacity: 0, y: 10 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.96, opacity: 0, y: 10 }}
							className='w-full max-w-2xl max-h-[80vh] bg-slate-900 border border-white/20 rounded-2xl p-5'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-xl font-bold'>Last 10 Feedbacks</h3>
								<button
									onClick={() => setShowLastTenFeedbacks(false)}
									className='px-3 py-1 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10'>
									Close
								</button>
							</div>
							<div className='feedback-scrollbar overflow-y-auto max-h-[62vh] space-y-2 pr-1'>
								{lastTenFeedbacks.length === 0 ? (
									<p className='text-slate-300 text-sm'>No feedbacks found.</p>
								) : (
									lastTenFeedbacks.map((feedback, index) => (
										<div
											key={`${feedback?.sender || 'unknown'}-${index}`}
											className='rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3'>
											<p className='text-sm text-white break-words'>
												{feedback.message}
											</p>
											<p className='text-xs text-blue-300 mt-2'>
												By: {feedback.sender || 'Unknown'}
											</p>
										</div>
									))
								)}
							</div>
						</motion.div>
					</motion.div>
				) : null}
				{showLastTenUsers ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'>
						<motion.div
							initial={{ scale: 0.96, opacity: 0, y: 10 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.96, opacity: 0, y: 10 }}
							className='w-full max-w-2xl max-h-[80vh] bg-slate-900 border border-white/20 rounded-2xl p-5'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-xl font-bold'>Newly Added Members (Last 10)</h3>
								<button
									onClick={() => setShowLastTenUsers(false)}
									className='px-3 py-1 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10'>
									Close
								</button>
							</div>
							<div className='feedback-scrollbar overflow-y-auto max-h-[62vh] space-y-2 pr-1'>
								{lastTenUsers.length === 0 ? (
									<p className='text-slate-300 text-sm'>No users found.</p>
								) : (
									lastTenUsers.map((user) => (
										<div
											key={user.id}
											className='rounded-xl border border-white/10 bg-white/5 p-3'>
											<p className='text-sm font-semibold text-white'>
												{user.hindiName || user.name || 'Unknown User'}
											</p>
											<p className='text-xs text-slate-300 mt-1'>
												{user.mobileNumber || 'No mobile'} |{' '}
												{user.villageName || 'No village'}
											</p>
											<p className='text-xs text-cyan-300 mt-1'>
												Added: {new Date(user.createdAt).toLocaleString()}
											</p>
										</div>
									))
								)}
							</div>
						</motion.div>
					</motion.div>
				) : null}
				{showTodayUsers ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'>
						<motion.div
							initial={{ scale: 0.96, opacity: 0, y: 10 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.96, opacity: 0, y: 10 }}
							className='w-full max-w-2xl max-h-[80vh] bg-slate-900 border border-white/20 rounded-2xl p-5'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-xl font-bold'>Today&apos;s Logged-In Users</h3>
								<button
									onClick={() => setShowTodayUsers(false)}
									className='px-3 py-1 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10'>
									Close
								</button>
							</div>
							<div className='feedback-scrollbar overflow-y-auto max-h-[62vh] space-y-2 pr-1'>
								{todayUsersList.length === 0 ? (
									<p className='text-slate-300 text-sm'>No users found for today.</p>
								) : (
									todayUsersList.map((user) => (
										<div
											key={user.id}
											className='rounded-xl border border-white/10 bg-white/5 p-3'>
											<p className='text-sm font-semibold text-white'>
												{user.hindiName || user.name || 'Unknown User'}
											</p>
											<p className='text-xs text-slate-300 mt-1'>
												{user.mobileNumber || 'No mobile'} |{' '}
												{user.villageName || 'No village'}
											</p>
											<p className='text-xs text-emerald-300 mt-1'>
												Last seen: {new Date(user.lastSeen).toLocaleString()}
											</p>
										</div>
									))
								)}
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
			<style jsx global>{`
				.feedback-scrollbar {
					scrollbar-width: thin;
					scrollbar-color: rgba(168, 85, 247, 0.75) rgba(255, 255, 255, 0.08);
				}

				.feedback-scrollbar::-webkit-scrollbar {
					width: 10px;
				}

				.feedback-scrollbar::-webkit-scrollbar-track {
					background: rgba(255, 255, 255, 0.08);
					border-radius: 999px;
				}

				.feedback-scrollbar::-webkit-scrollbar-thumb {
					background: linear-gradient(
						180deg,
						rgba(168, 85, 247, 0.95),
						rgba(236, 72, 153, 0.95)
					);
					border-radius: 999px;
					border: 2px solid rgba(255, 255, 255, 0.08);
				}

				.feedback-scrollbar::-webkit-scrollbar-thumb:hover {
					background: linear-gradient(
						180deg,
						rgba(192, 132, 252, 1),
						rgba(244, 114, 182, 1)
					);
				}
			`}</style>
		</div>
	);
};

export default StatusPage;
