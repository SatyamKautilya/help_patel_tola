import { motion } from 'framer-motion';

const NotificationSender = () => {
	return (
		<div className='flex justify-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className='bg-gradient-to-br max-w-xl from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
				<h3 className='text-2xl font-bold mb-4'>Send Notification</h3>
				<div className='space-y-4'>
					<input
						type='text'
						placeholder='Notification Title'
						className='w-full p-2 rounded border border-white/20 bg-transparent text-white focus:outline-none'
					/>
					<textarea
						placeholder='Notification Message'
						className='w-full p-2 rounded border border-white/20 bg-transparent text-white focus:outline-none'
						rows='4'
					/>
					<button className='w-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded transition-all duration-300 hover:shadow-lg'>
						Send Notification
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default NotificationSender;
