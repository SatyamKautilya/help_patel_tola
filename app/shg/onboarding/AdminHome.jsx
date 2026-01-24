export default function AdminHome({ onCreate }) {
	return (
		<div className='backdrop-blur-xl mt-30 bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-[1.02]'>
			<button
				onClick={onCreate}
				className='group relative w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-6 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 overflow-hidden'>
				<span className='relative flex items-center justify-center gap-3'>
					<span className='text-2xl text-yellow-300 animate-bounce'>➕</span>
					<span>समूह को तमोहर मे जोड़े</span>
				</span>
			</button>
		</div>
	);
}
