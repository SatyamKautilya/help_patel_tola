import { CheckCircle } from 'lucide-react';

export default function ReviewAndFinish({ shg, onFinish }) {
	return (
		<div className='p-6 space-y-6 flex flex-col items-center justify-center min-h-64'>
			<div className='bg-emerald-500/10 p-4 rounded-full'>
				<CheckCircle className='w-16 h-16 text-emerald-400' />
			</div>

			<div className='text-center space-y-2 max-w-xl'>
				<h3 className='text-2xl font-bold text-zinc-100'>ऑनबोर्डिंग पूर्ण हुआ</h3>
				<p className='text-zinc-400'>
					SHG को सदस्य और प्रारंभिक वित्तीय डेटा के साथ सफलतापूर्वक ऑनबोर्ड कर दिया गया है।
				</p>
				<div className='bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-left'>
					<p className='text-xs text-slate-400 uppercase tracking-wide'>समूह का नाम</p>
					<p className='text-slate-100 font-semibold'>{shg?.name || '-'}</p>
					<p className='text-xs text-slate-400 uppercase tracking-wide mt-3'>
						गाँव
					</p>
					<p className='text-slate-100 font-semibold'>{shg?.village || '-'}</p>
				</div>
			</div>

			<button
				onClick={onFinish}
				aria-label='Finish onboarding and return'
				className='mt-4 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors duration-200'>
				समाप्त करें
			</button>
		</div>
	);
}
