import { Globe, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const StatusPage = () => {
	const [totalUsers, setTotalUsers] = useState(0);
	const [todayUser, setTodayUser] = useState(0);
	const [totalFeedbacks, setTotalFeedbacks] = useState(0);
	const [lastTenFeedbacks, setLastTenFeedbacks] = useState([]);

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

	const stats = [
		{
			label: 'Total Users',
			value: totalUsers,
			icon: <Globe />,
			gradient: 'from-blue-500 to-cyan-500',
			trend: '+12.5%',
		},
		{
			label: 'Logged In Today',
			value: todayUser,
			icon: <Users />,
			gradient: 'from-emerald-500 to-teal-500',
			trend: '+8.2%',
		},
		{
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
			{/* Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{stats.map((s, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className='group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10'>
						{totalUsers === 0 && todayUser === 0 && totalFeedbacks === 0 ? (
							<div className='flex justify-center items-center h-full'>
								<p>Loading...</p>
							</div>
						) : (
							<>
								{/* Gradient Background */}
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
								</div>
							</>
						)}
					</motion.div>
				))}
				{lastTenFeedbacks.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
						<div className='flex justify-center items-center h-full'>
							<p>Loading Feedback...</p>
						</div>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
						<div className='flex items-center gap-2 mb-6'>
							<MessageSquare className='text-purple-400' size={24} />
							<h3 className='text-2xl font-bold'>Recent Feedback</h3>
						</div>
						<div className='space-y-3'>
							{lastTenFeedbacks?.map((i, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 + index * 0.1 }}
									className='p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl text-sm text-slate-300 hover:border-purple-500/40 transition-all group cursor-pointer'>
									<p className='group-hover:text-white transition-colors'>
										{i.message}
									</p>
									<p className='text-blue-400 mt-3 text-xs font-mono flex items-center gap-2'>
										<span className='w-2 h-2 bg-blue-400 rounded-full' />
										{i.sender}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default StatusPage;
