import { CheckCircle, MapPin, Users, Coins } from 'lucide-react';

export default function ReviewAndFinish({ shg, onFinish }) {
	return (
		<>
			{/* Header Section */}
			<div className='bg-zinc-800/50 p-6 border-b border-zinc-700/50'>
				<h2 className='text-xl font-bold text-zinc-100 flex items-center gap-2'>
					<CheckCircle className='w-5 h-5 text-emerald-400' />
					समीक्षा करें
				</h2>
				<p className='text-zinc-400 text-sm mt-1'>
					कृपया अंतिम रूप देने से पहले नीचे दी गई जानकारी की पुष्टि करें।
				</p>
			</div>

			{/* Content Section */}
			<div className='p-6 space-y-6'>
				<div className='space-y-4'>
					<div className='flex items-start gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors'>
						<div className='bg-indigo-500/10 p-2 rounded-lg'>
							<Users className='w-5 h-5 text-indigo-400' />
						</div>
						<div>
							<p className='text-xs font-medium text-zinc-500 uppercase tracking-wider'>
								समूह का नाम
							</p>
							<p className='text-lg font-semibold text-zinc-100 mt-0.5'>
								{shg.name}
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors'>
						<div className='bg-rose-500/10 p-2 rounded-lg'>
							<MapPin className='w-5 h-5 text-rose-400' />
						</div>
						<div>
							<p className='text-xs font-medium text-zinc-500 uppercase tracking-wider'>
								गाँव
							</p>
							<p className='text-lg font-semibold text-zinc-100 mt-0.5'>
								{shg.village}
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors'>
						<div className='bg-amber-500/10 p-2 rounded-lg'>
							<Coins className='w-5 h-5 text-amber-400' />
						</div>
						<div>
							<p className='text-xs font-medium text-zinc-500 uppercase tracking-wider'>
								मासिक बचत
							</p>
							<p className='text-lg font-semibold text-zinc-100 mt-0.5'>
								₹{shg.monthlyContribution}
							</p>
						</div>
					</div>
				</div>

				<button
					onClick={onFinish}
					className='w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2'>
					&nbsp;पुष्टि करें और सेव करें
					<CheckCircle className='w-4 h-4' />
				</button>
			</div>
		</>
	);
}
