export default function AdminHome({ onCreate }) {
	return (
		<div className='backdrop-blur-xl mt-30 bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-[1.02]'>
			<button
				onClick={onCreate}
				className='group relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 overflow-hidden'>
				<span className='absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
				<span className='relative flex items-center justify-center gap-3'>
					<span className='text-2xl animate-bounce'>➕</span>
					<span>समूह को तमोहर मे जोड़े</span>
				</span>
			</button>
		</div>
	);
}
