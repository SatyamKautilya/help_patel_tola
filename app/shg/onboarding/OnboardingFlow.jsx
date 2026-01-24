import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHome from './AdminHome';
import CreateShg from './CreateShg';
import AddMembers from './AddMembers';
import ShgFinancialSetup from './ShgFinancialSetup';
import ReviewAndFinish from './ReviewAndFinish';
import { useSelector } from 'react-redux';

export default function OnboardingFlow() {
	const [step, setStep] = useState(3);
	const shg = useSelector(
		(state) => state.appContext.shgOnboardingData?.shgDetails || {},
	);

	const steps = [
		{ id: 1, title: 'Create SHG' },
		{ id: 2, title: 'Add Members' },
		{ id: 3, title: 'Financials' },
		{ id: 4, title: 'Review' },
	];

	if (step === 0)
		return (
			<div className=' flex items-center justify-center '>
				<AdminHome onCreate={() => setStep(1)} />
			</div>
		);

	return (
		<div className='w-full max-w-4xl space-y-8'>
			{/* Stepper Header */}
			<nav aria-label='Progress' className='mb-12 flex flex-row justify-center'>
				<ol role='list' className='flex items-center'>
					{steps.map((s, stepIdx) => (
						<li
							key={s.title}
							className={`${
								stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
							} relative`}>
							{s.id < step ? (
								<div className='group flex items-center w-full'>
									<span className='flex items-center px-6 py-4 text-sm font-medium'>
										<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800 transition-colors'>
											<svg
												className='h-6 w-6 text-white'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='currentColor'
												aria-hidden='true'>
												<path
													fillRule='evenodd'
													d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
													clipRule='evenodd'
												/>
											</svg>
										</span>
										<span className='ml-4 text-sm font-medium text-slate-300 hidden sm:block'>
											{s.title}
										</span>
									</span>
								</div>
							) : s.id === step ? (
								<div
									className='flex items-center text-sm font-medium'
									aria-current='step'>
									<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-500'>
										<span className='text-indigo-400 font-bold'>{s.id}</span>
									</span>
									<span className='ml-4 text-sm font-bold text-indigo-400 hidden sm:block'>
										{s.title}
									</span>
								</div>
							) : (
								<div className='group flex items-center'>
									<span className='flex items-center text-sm font-medium'>
										<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-600 group-hover:border-slate-500 transition-colors'>
											<span className='text-slate-500 group-hover:text-slate-400 transition-colors'>
												{s.id}
											</span>
										</span>
										<span className='ml-4 text-sm font-medium text-slate-500 group-hover:text-slate-400 transition-colors hidden sm:block'>
											{s.title}
										</span>
									</span>
								</div>
							)}
							{stepIdx !== steps.length - 1 ? (
								<div className='absolute top-0 right-0 hidden h-full w-5 md:block' />
							) : null}
						</li>
					))}
				</ol>
			</nav>

			{/* Content Area */}
			<div className='bg-slate-800 rounded-2xl shadow-xl overflow-hidden ring-1 ring-white/10 p-8'>
				<AnimatePresence mode='wait'>
					{step === 1 && (
						<motion.div
							key='step1'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<CreateShg
								onNext={() => {
									setStep(2);
								}}
							/>
						</motion.div>
					)}
					{step === 2 && (
						<motion.div
							key='step2'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<AddMembers shgId={shg._id} onNext={() => setStep(3)} />
						</motion.div>
					)}
					{step === 3 && (
						<motion.div
							key='step3'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<ShgFinancialSetup shgId={shg._id} onNext={() => setStep(4)} />
						</motion.div>
					)}
					{step === 4 && (
						<motion.div
							key='step4'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<ReviewAndFinish shg={shg} onFinish={() => alert('Done')} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<button onClick={() => setStep(step - 1)} disabled={step === 1}>
				back
			</button>
		</div>
	);
}
