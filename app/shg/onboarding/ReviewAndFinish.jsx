import { CheckCircle, MapPin, Users, Coins } from 'lucide-react';

export default function ReviewAndFinish({ shg, onFinish }) {
	return (
		<div className='w-full max-w-md mx-auto'>
			<div className='bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden'>
				{/* Header Section */}
				<div className='bg-zinc-800/50 p-6 border-b border-zinc-700/50'>
					<h2 className='text-xl font-bold text-zinc-100 flex items-center gap-2'>
						<CheckCircle className='w-5 h-5 text-emerald-400' />
						Review SHG Details
					</h2>
					<p className='text-zinc-400 text-sm mt-1'>
						Please verify the information below before finalizing.
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
									Group Name
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
									Village
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
									Monthly Saving
								</p>
								<p className='text-lg font-semibold text-zinc-100 mt-0.5'>
									₹{shg.monthlyContribution}
								</p>
							</div>
						</div>
					</div>

					<button
						onClick={onFinish}
						className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2'>
						Confirm & Finish
						<CheckCircle className='w-4 h-4' />
					</button>
				</div>
			</div>
		</div>
	);
}
