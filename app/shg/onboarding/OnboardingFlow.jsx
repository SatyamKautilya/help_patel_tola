import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHome from './AdminHome';
import CreateShg from './CreateShg';
import AddMembers from './AddMembers';
import ShgFinancialSetup from './ShgFinancialSetup';
import ReviewAndFinish from './ReviewAndFinish';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
	resetShgOnboardingData,
	setShgOnboardingData,
} from '@/app/store/appSlice';

const DRAFT_KEY = 'shg_onboarding_draft_v2';

export default function OnboardingFlow({ creatorId = '' }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const [step, setStep] = useState(0);
	const [hasDraft, setHasDraft] = useState(false);
	const [serverDraft, setServerDraft] = useState(null);
	const shgOnboardingData = useSelector(
		(state) => state.appContext.shgOnboardingData || {},
	);
	const shg = shgOnboardingData?.shgDetails || {};

	const steps = [
		{ id: 1, title: 'SHG विवरण', hint: 'समूह की मूल जानकारी' },
		{ id: 2, title: 'सदस्य जोड़ें', hint: 'भूमिका और सदस्य विवरण' },
		{ id: 3, title: 'वित्तीय विवरण', hint: 'एकमुश्त प्रारंभिक आंकड़े' },
		{ id: 4, title: 'अंतिम पुष्टि', hint: 'समापन और सबमिट' },
	];

	const canSaveDraft = useMemo(() => step > 0, [step]);

	const persistDraftState = (nextStep = step, nextData = shgOnboardingData) => {
		if (typeof window !== 'undefined' && nextStep > 0) {
			const draftPayload = {
				step: nextStep,
				data: nextData,
				savedAt: new Date().toISOString(),
			};
			window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draftPayload));
			setHasDraft(true);
		}

		if (shg?._id && nextStep > 0) {
			fetch('/api/shg?name=save-onboarding-draft', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					shgId: shg._id,
					onboardingStep: nextStep,
					onboardingDraft: nextData,
				}),
			}).catch((error) => console.error('Server draft save failed:', error));
		}
	};

	useEffect(() => {
		if (typeof window === 'undefined') return;
		setHasDraft(!!window.localStorage.getItem(DRAFT_KEY));
	}, []);

	useEffect(() => {
		const loadServerDraft = async () => {
			if (!creatorId) return;
			try {
				const res = await fetch('/api/shg?name=get-onboarding-draft', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ createdBy: creatorId }),
				});
				const data = await res.json();
				if (res.ok && data?.shg) {
					setServerDraft(data);
				}
			} catch (error) {
				console.error('Failed to fetch server draft:', error);
			}
		};
		loadServerDraft();
	}, [creatorId]);

	const saveDraft = () => {
		persistDraftState(step, shgOnboardingData);
	};

	const resumeDraft = () => {
		if (typeof window === 'undefined') return;
		const raw = window.localStorage.getItem(DRAFT_KEY);
		if (!raw) return;
		try {
			const parsed = JSON.parse(raw);
			if (parsed?.data) {
				dispatch(resetShgOnboardingData());
				dispatch(setShgOnboardingData(parsed.data));
				setStep(Number(parsed.step) || 1);
			}
		} catch (error) {
			console.error('Invalid draft payload:', error);
		}
	};

	const discardDraft = () => {
		if (typeof window === 'undefined') return;
		window.localStorage.removeItem(DRAFT_KEY);
		setHasDraft(false);
		dispatch(resetShgOnboardingData());
		setStep(0);
	};

	useEffect(() => {
		if (step <= 0) return;
		const timeout = setTimeout(() => {
			persistDraftState(step, shgOnboardingData);
		}, 250);
		return () => clearTimeout(timeout);
	}, [step, shgOnboardingData, shg?._id]);

	const resumeServerDraft = () => {
		if (!serverDraft?.shg) return;
		dispatch(resetShgOnboardingData());
		dispatch(
			setShgOnboardingData({
				shgDetails: serverDraft.shg,
				members: serverDraft.members || [],
				...(serverDraft?.shg?.onboardingDraft || {}),
			}),
		);
		setStep(Number(serverDraft.shg.onboardingStep) || 2);
	};

	const completeFlow = async () => {
		try {
			if (shg?._id) {
				await fetch('/api/shg?name=complete-onboarding', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ shgId: shg._id }),
				});
			}
		} catch (error) {
			console.error('Failed to complete onboarding status:', error);
		}
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem(DRAFT_KEY);
		}
		setHasDraft(false);
		dispatch(resetShgOnboardingData());
		router.push('/');
	};

	if (step === 0)
		return (
			<div className='flex items-center justify-center'>
				<AdminHome
					hasDraft={hasDraft}
					hasServerDraft={!!serverDraft?.shg}
					onCreate={() => setStep(1)}
					onResume={resumeDraft}
					onResumeServer={resumeServerDraft}
					onDiscard={discardDraft}
				/>
			</div>
		);

	return (
		<div className='w-full max-w-7xl space-y-6'>
			<div className='flex justify-end gap-3'>
				{canSaveDraft ? (
					<button
						onClick={saveDraft}
						aria-label='Save current onboarding as draft'
						className='px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-400/40 text-blue-300 hover:bg-blue-600/30 transition'>
						ड्राफ्ट सेव करें
					</button>
				) : null}
				<button
					onClick={discardDraft}
					aria-label='Discard draft and restart onboarding'
					className='px-4 py-2 rounded-lg bg-red-600/20 border border-red-400/40 text-red-300 hover:bg-red-600/30 transition'>
					ड्राफ्ट हटाएं
				</button>
			</div>

			<nav
				aria-label='Onboarding progress'
				className='mb-2 flex flex-row justify-center'>
				<ol role='list' className='flex items-center gap-2 md:gap-6'>
					{steps.map((s, stepIdx) => (
						<li
							key={s.title}
							className={`${
								stepIdx !== steps.length - 1 ? 'pr-2 sm:pr-4' : ''
							} relative`}>
							{s.id < step ? (
								<div className='group flex items-center w-full'>
									<span className='flex items-center px-2 py-2 text-sm font-medium'>
										<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600'>
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
										<span className='ml-3 hidden md:block'>
											<span className='text-sm font-semibold text-slate-200 block'>
												{s.title}
											</span>
											<span className='text-xs text-slate-400'>{s.hint}</span>
										</span>
									</span>
								</div>
							) : s.id === step ? (
								<div
									className='flex items-center text-sm font-medium'
									aria-current='step'>
									<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-500 bg-indigo-500/10'>
										<span className='text-indigo-400 font-bold'>{s.id}</span>
									</span>
									<span className='ml-3 hidden md:block'>
										<span className='text-sm font-bold text-indigo-300 block'>
											{s.title}
										</span>
										<span className='text-xs text-slate-400'>{s.hint}</span>
									</span>
								</div>
							) : (
								<div className='group flex items-center'>
									<span className='flex items-center text-sm font-medium'>
										<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-800/60'>
											<span className='text-slate-500'>{s.id}</span>
										</span>
										<span className='ml-3 hidden md:block'>
											<span className='text-sm font-medium text-slate-500 block'>
												{s.title}
											</span>
											<span className='text-xs text-slate-500'>{s.hint}</span>
										</span>
									</span>
								</div>
							)}
						</li>
					))}
				</ol>
			</nav>

			<div className='bg-gradient-to-br from-slate-900/95 to-slate-800/90 rounded-2xl shadow-xl overflow-hidden ring-1 ring-white/10 p-6 md:p-8'>
				<AnimatePresence mode='wait'>
					{step === 1 ? (
						<motion.div
							key='step1'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<CreateShg
								creatorId={creatorId}
								onNext={() => {
									setStep(2);
								}}
							/>
						</motion.div>
					) : null}

					{step === 2 ? (
						<motion.div
							key='step2'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<AddMembers shgId={shg._id} onNext={() => setStep(3)} />
						</motion.div>
					) : null}

					{step === 3 ? (
						<motion.div
							key='step3'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<ShgFinancialSetup shgId={shg._id} onNext={() => setStep(4)} />
						</motion.div>
					) : null}

					{step === 4 ? (
						<motion.div
							key='step4'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}>
							<ReviewAndFinish shg={shg} onFinish={completeFlow} />
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	);
}
