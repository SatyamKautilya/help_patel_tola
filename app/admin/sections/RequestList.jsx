import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Plus, MessageSquare, CheckCircle } from 'lucide-react';

const RequestList = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hindiNames, setHindiNames] = useState({});
	const [villages, setVillages] = useState([]);

	const getVillages = async () => {
		const resp = await fetch('/api/query/database?name=getVillagesList', {
			method: 'GET',
		});
		const data = await resp.json();
		return data.villages;
	};

	useEffect(() => {
		const loadVillages = async () => {
			try {
				const data = await getVillages();
				setVillages(data);
			} catch (error) {
				console.error('Error fetching villages:', error);
			}
		};
		loadVillages();
	}, []);

	const init = async () => {
		try {
			const joinRequest = await fetch('/api/query/database?name=join-request');
			const data = await joinRequest.json();
			setRequests(Array.isArray(data.joinRequests) ? data.joinRequests : []);
		} catch (error) {
			console.error('Error fetching requests:', error);
			setRequests([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleApprove = async (id, mobileNumber, villageId) => {
		setRequests(requests.filter((r) => r.assetId !== id));
		await fetch(`/api/query/database?name=update-join-request-status`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				assetId: id,
				status: 'approved',
				villageId: villageId,
				mobileNumber: mobileNumber,
				hindiName: hindiNames[id],
			}),
		});
		setHindiNames((prev) => {
			const updated = { ...prev };
			delete updated[id];
			return updated;
		});
	};

	const handleReject = async (id) => {
		setRequests(requests.filter((r) => r.assetId !== id));
		await fetch(`/api/query/database?name=update-join-request-status`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ assetId: id, status: 'rejected' }),
		});
	};

	if (loading) {
		return (
			<div className='flex justify-center min-h-screen'>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					className='flex flex-col items-center gap-6'>
					<motion.div className='flex gap-2'>
						{[0, 1, 2].map((i) => (
							<motion.div
								key={i}
								animate={{ y: [0, -10, 0] }}
								transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
								className='w-3 h-3 bg-blue-500 rounded-full'
							/>
						))}
					</motion.div>
					<motion.p
						animate={{ opacity: [0.6, 1, 0.6] }}
						transition={{ duration: 2, repeat: Infinity }}
						className='text-slate-400 text-sm font-medium'>
						Loading requests...
					</motion.p>
				</motion.div>
			</div>
		);
	}

	const pendingRequests = requests.filter((req) => req.status === 'pending');

	return (
		<div className='flex justify-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='bg-gradient-to-br w-full lg:w-[70%] from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
				{pendingRequests.length !== 0 && (
					<h3 className='text-xl font-bold mb-6'>Pending Requests</h3>
				)}
				{pendingRequests.length === 0 ? (
					<div className='flex flex-col items-center'>
						<CheckCircle size={48} className='text-green-500 animate-bounce' />
						<p className='text-green-500 text-lg font-semibold'>
							No pending requests
						</p>
					</div>
				) : (
					<div className='space-y-3'>
						{pendingRequests.map((req) => (
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
											{
												villages?.find(
													(village) => village.villageId === req.villageId,
												)?.villageName
											}
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<Users size={18} className='text-purple-400' />
										<span className='text-slate-400 text-xs'>Name:</span>
										<span className='font-semibold text-white'>{req.name}</span>
									</div>
								</div>
								<div className='flex flex-col gap-3'>
									<input
										type='text'
										placeholder='Hindi Name'
										value={hindiNames[req.assetId] || ''}
										onChange={(e) =>
											setHindiNames((prev) => ({
												...prev,
												[req.assetId]: e.target.value,
											}))
										}
										className='px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 text-xs focus:outline-none focus:border-blue-400'
									/>
									<div className='flex pt-3 justify-between gap-3'>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() =>
												handleApprove(
													req.assetId,
													req.mobileNumber,
													req.villageId,
												)
											}
											disabled={!hindiNames[req.assetId]?.trim()}
											className='flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
											<Plus size={16} />
											Approve
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleReject(req.assetId)}
											className='flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-lg text-red-400 text-xs font-semibold transition-all'>
											<MessageSquare size={16} />
											Reject
										</motion.button>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default RequestList;
