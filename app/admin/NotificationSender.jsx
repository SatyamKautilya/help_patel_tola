import { motion } from 'framer-motion';
import { useState } from 'react';

const NotificationSender = () => {
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [counts, setCounts] = useState(null);
	const [error, setError] = useState(''); // New state for error message

	const sendNotification = async () => {
		if (!title || !message) {
			setError('कृपया मैसेज शीर्षक और संदेश दोनों भरें'); // Set error message
			return;
		}
		setError(''); // Clear error message
		setLoading(true);
		setSuccess(false);
		try {
			const resp = await fetch('/api/query/database?name=send-notification', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title, message, village: 'PatelTola' }),
			});
			const result = await resp.json();
			if (result?.sentTo) {
				setCounts(result);
				setSuccess(true);
				setTitle('');
				setMessage('');
			} else {
				console.error('Failed to send notification:', result);
			}
		} catch (error) {
			console.error('Error sending notification:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center'>
			{!loading && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className='bg-gradient-to-br max-w-xl from-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8'>
					<h3 className='text-2xl font-bold mb-4 text-white'>
						Send Notification
					</h3>
					{error && <p className='text-red-500 py-3 font-semibold'>{error}</p>}{' '}
					{/* Display error message */}
					<div className='space-y-4'>
						<input
							type='text'
							placeholder='Notification Title'
							onChange={(e) => setTitle(e.target.value)}
							className='w-full p-2 rounded border border-purple-500/30 bg-transparent text-white placeholder-white/50 focus:outline-none focus:border-purple-500'
						/>
						<textarea
							placeholder='Notification Message'
							className='w-full h-50 p-2 rounded border border-purple-500/30 bg-transparent text-white placeholder-white/50 focus:outline-none focus:border-purple-500'
							rows='4'
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							onClick={sendNotification}
							disabled={loading}
							className='w-full p-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded transition-all duration-300 hover:shadow-lg disabled:opacity-70'>
							Send Notification
						</button>
					</div>
				</motion.div>
			)}
			{loading && (
				<div className='flex flex-col items-center mt-4'>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 1 }}
						className='h-10 w-10 border-4 border-purple-500 border-t-indigo-500 rounded-full'
					/>
				</div>
			)}
			{loading && (
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
									transition={{
										repeat: Infinity,
										duration: 0.8,
										delay: i * 0.1,
									}}
									className='w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500'
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
			)}
			{success && (
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
						className='flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400'>
						<span className='text-5xl'>🚀</span>
					</motion.div>
					<span className='text-2xl font-bold text-cyan-300'>
						{counts.sentTo} को नोटिफ़िकेशन भेजे गए
					</span>
				</motion.div>
			)}
		</div>
	);
};

export default NotificationSender;
