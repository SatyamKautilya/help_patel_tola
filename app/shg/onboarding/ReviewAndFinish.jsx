import { CheckCircle } from 'lucide-react';

export default function ReviewAndFinish({ shg, onFinish }) {
	return (
		<>
			{/* Header Section */}

			{/* Content Section */}
			<div className='p-6 space-y-6 flex flex-col items-center justify-center min-h-64'>
				<div className='bg-emerald-500/10 p-4 rounded-full'>
					<CheckCircle className='w-16 h-16 text-emerald-400' />
				</div>

				<div className='text-center space-y-2'>
					<h3 className='text-2xl font-bold text-zinc-100'>
						सभी प्रक्रियाएं पूर्ण हुईं
					</h3>
					<p className='text-zinc-400'>
						आपका समूह सफलतापूर्वक पंजीकृत हो गया है।
					</p>
				</div>

				<button
					onClick={onFinish}
					className='mt-4 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors duration-200'>
					बंद करें
				</button>
			</div>
		</>
	);
}
