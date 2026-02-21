import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const NotificationSender = ({ selectedVillage, isSuperAdmin = false }) => {
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [counts, setCounts] = useState(null);
	const [error, setError] = useState('');
	const [villages, setVillages] = useState([]);
	const [targetVillage, setTargetVillage] = useState(selectedVillage || '');

	useEffect(() => {
		setTargetVillage(selectedVillage || '');
	}, [selectedVillage]);

	useEffect(() => {
		if (!isSuperAdmin) return;
		const loadVillages = async () => {
			try {
				const resp = await fetch('/api/query/database?name=getVillagesList');
				const data = await resp.json();
				if (resp.ok) {
					setVillages(Array.isArray(data?.villages) ? data.villages : []);
				}
			} catch (fetchError) {
				console.error(fetchError);
			}
		};
		loadVillages();
	}, [isSuperAdmin]);

	const effectiveVillage = useMemo(
		() => (isSuperAdmin ? targetVillage : selectedVillage),
		[isSuperAdmin, selectedVillage, targetVillage],
	);

	const sendNotification = async () => {
		if (!title || !message) {
			setError('Please fill both title and message.');
			return;
		}
		if (!effectiveVillage) {
			setError('Please select a village first.');
			return;
		}
		setError('');
		setLoading(true);
		setSuccess(false);
		try {
			const resp = await fetch('/api/query/database?name=send-notification', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					message,
					village: effectiveVillage,
				}),
			});
			const result = await resp.json();
			if (!resp.ok) {
				setError(result?.error || 'Failed to send notification.');
				return;
			}
			if (result?.sentTo) {
				setCounts(result);
				setSuccess(true);
				setTitle('');
				setMessage('');
			}
		} catch (requestError) {
			console.error('Error sending notification:', requestError);
			setError('Something went wrong while sending notification.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='w-full max-w-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
				<h3 className='text-2xl font-bold mb-2 text-white'>Send Notification</h3>
				<p className='text-sm text-slate-300 mb-5'>
					Target Village: <span className='text-blue-300'>{effectiveVillage || '-'}</span>
				</p>

				{isSuperAdmin ? (
					<div className='mb-4'>
						<label className='text-xs text-slate-300 mb-2 block'>Select Village</label>
						<select
							value={targetVillage}
							onChange={(e) => setTargetVillage(e.target.value)}
							className='w-full p-3 rounded-xl border border-white/20 bg-black/30 text-white focus:outline-none focus:border-blue-400'>
							<option value=''>Choose village</option>
							{villages.map((village) => (
								<option key={village.villageCode} value={village.villageCode}>
									{village.villageName} ({village.villageCode})
								</option>
							))}
						</select>
					</div>
				) : null}

				{error ? <p className='text-red-400 py-2 text-sm font-medium'>{error}</p> : null}

				<div className='space-y-4'>
					<input
						type='text'
						value={title}
						placeholder='Notification Title'
						onChange={(e) => setTitle(e.target.value)}
						className='w-full p-3 rounded-xl border border-white/20 bg-black/30 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400'
					/>
					<textarea
						value={message}
						placeholder='Notification Message'
						className='w-full p-3 rounded-xl border border-white/20 bg-black/30 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400'
						rows='5'
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button
						onClick={sendNotification}
						disabled={loading}
						className='w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-70'>
						{loading ? 'Sending...' : 'Send Notification'}
					</button>
				</div>
			</motion.div>

			{loading ? (
				<motion.div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
					<motion.div className='flex flex-col items-center gap-4'>
						<motion.div
							animate={{ y: [0, -10, 0] }}
							transition={{ repeat: Infinity, duration: 0.6 }}
							className='flex gap-2'>
							{[0, 1, 2].map((i) => (
								<motion.div
									key={i}
									animate={{ scale: [1, 1.5, 1] }}
									transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
									className='w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500'
								/>
							))}
						</motion.div>
						<motion.p
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ repeat: Infinity, duration: 1.5 }}
							className='text-white text-sm'>
							Sending notifications...
						</motion.p>
					</motion.div>
				</motion.div>
			) : null}

			{success ? (
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					onAnimationComplete={() => setTimeout(() => setSuccess(false), 2000)}
					className='fixed inset-0 flex flex-col items-center justify-center gap-6 bg-black/50 backdrop-blur-sm'>
					<motion.div
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ type: 'spring', duration: 0.6 }}
						className='flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400'>
						<span className='text-5xl'>🚀</span>
					</motion.div>
					<span className='text-2xl font-bold text-cyan-300'>
						{counts?.sentTo || 0} users notified in {effectiveVillage}
					</span>
				</motion.div>
			) : null}
		</div>
	);
};

export default NotificationSender;
