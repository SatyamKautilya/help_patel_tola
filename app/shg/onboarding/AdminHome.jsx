export default function AdminHome({
	onCreate,
	onResume,
	onResumeServer,
	hasDraft,
	hasServerDraft,
	onDiscard,
}) {
	return (
		<div className='backdrop-blur-xl mt-12 bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl p-8 border border-white/20 shadow-2xl transition-all duration-300 w-full max-w-3xl space-y-5'>
			<div className='space-y-1'>
				<h2 className='text-3xl font-bold text-white'>SHG ऑनबोर्डिंग कंसोल</h2>
				<p className='text-slate-300 text-sm'>
					डेस्कटॉप कार्यप्रवाह के लिए 4-चरणीय संरचित ऑनबोर्डिंग।
				</p>
			</div>

			<button
				onClick={onCreate}
				className='group relative w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-6 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden'>
				<span className='relative flex items-center justify-center gap-3'>
					<span className='text-2xl text-yellow-300 animate-bounce'>+</span>
					<span>समूह को तमोहर में जोड़ें</span>
				</span>
			</button>

			{hasDraft ? (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
					<button
						onClick={onResume}
						aria-label='Resume saved onboarding draft'
						className='w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-semibold transition-all'>
						लोकल ड्राफ्ट पुनः शुरू करें
					</button>
					<button
						onClick={onDiscard}
						aria-label='Delete saved onboarding draft'
						className='w-full bg-red-600/80 hover:bg-red-500 text-white py-3 px-4 rounded-xl font-semibold transition-all'>
						ड्राफ्ट हटाएं
					</button>
				</div>
			) : null}

			{!hasDraft && hasServerDraft ? (
				<button
					onClick={onResumeServer}
					aria-label='Resume onboarding draft saved in database'
					className='w-full bg-indigo-600/80 hover:bg-indigo-500 text-white py-3 px-4 rounded-xl font-semibold transition-all'>
					डेटाबेस ड्राफ्ट पुनः शुरू करें
				</button>
			) : null}
		</div>
	);
}
