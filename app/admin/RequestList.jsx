import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Plus, MessageSquare } from 'lucide-react';

const RequestList = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const init = async () => {
		try {
			const joinRequest = await fetch('/api/query/database?name=join-request');
			const data = await joinRequest.json();
			setRequests(data.joinRequests);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleApprove = (id) => {
		setRequests(
			requests.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)),
		);
	};

	const handleReject = (id) => {
		setRequests(
			requests.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)),
		);
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='flex flex-col items-center gap-6'>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
						className='w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full'
					/>
					<motion.p
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className='text-slate-400 text-sm font-medium'>
						Loading requests...
					</motion.p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='flex justify-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='bg-gradient-to-br w-full lg:w-[70%]  from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
				<h3 className='text-xl font-bold mb-6'>Pending Requests</h3>
				<div className='space-y-3'>
					{requests.map((req) => (
						<motion.div
							key={req.id}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							className='p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
							<div className='flex flex-col sm:flex-row sm:gap-6'>
								<div className='flex items-center gap-2'>
									<Globe size={18} className='text-blue-400' />
									<span className='text-slate-400 text-xs'>Village:</span>
									<span className='font-semibold text-white'>
										{req.village}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Users size={18} className='text-purple-400' />
									<span className='text-slate-400 text-xs'>Name:</span>
									<span className='font-semibold text-white'>{req.name}</span>
								</div>
							</div>
							<div className='flex pt-3 justify-between gap-3'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleApprove(req.id)}
									className='flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold transition-all'>
									<Plus size={16} />
									Approve
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleReject(req.id)}
									className='flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-lg text-red-400 text-xs font-semibold transition-all'>
									<MessageSquare size={16} />
									Reject
								</motion.button>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default RequestList;
