export default function AdminHome({ onCreate }) {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6'>
			<div className='max-w-4xl mx-auto space-y-8'>
				{/* Header Card */}
				<div className='backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-[1.02]'>
					<h1 className='text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse'>
						Tamohar – Admin
					</h1>
					<p className='text-gray-300 mt-2'>
						Self Help Group Management Portal
					</p>
				</div>

				{/* Create Button Card */}
				<div className='backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-[1.02]'>
					<button
						onClick={onCreate}
						className='group relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 overflow-hidden'>
						<span className='absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
						<span className='relative flex items-center justify-center gap-3'>
							<span className='text-2xl animate-bounce'>➕</span>
							<span>Create / Onboard SHG</span>
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
