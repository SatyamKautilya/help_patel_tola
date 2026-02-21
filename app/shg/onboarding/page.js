'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import OnboardingFlow from './OnboardingFlow';

export default function ShgOnboardingPage() {
	const router = useRouter();
	const legacyUser = useSelector((state) => state.appContext.user);
	const [authUser, setAuthUser] = useState(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch('/api/auth/me', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					setAuthUser(data?.user || null);
				}
			} catch {}
			setReady(true);
		};
		checkAuth();
	}, []);

	const canAccess = useMemo(() => {
		if (authUser) {
			const groups = Array.isArray(authUser.userGroups) ? authUser.userGroups : [];
			const villageRoles = Array.isArray(authUser.villageRoles)
				? authUser.villageRoles.map((entry) => entry.role)
				: [];
			return (
				authUser.isAdmin ||
				groups.includes('super_admin') ||
				groups.includes('shg_onboarder') ||
				villageRoles.includes('super_admin') ||
				villageRoles.includes('shg_onboarder')
			);
		}
		return !!legacyUser?.isAdmin;
	}, [authUser, legacyUser]);

	useEffect(() => {
		if (!ready) return;
		if (canAccess) return;
		router.replace('/admin/login');
	}, [ready, canAccess, router]);

	if (!ready || !canAccess) {
		return (
			<div className='min-h-screen bg-slate-950 text-white flex items-center justify-center'>
				<p>प्रवेश जांचा जा रहा है...</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-[#07090f] via-[#101423] to-[#111827] text-white p-4 md:p-8'>
			<div className='max-w-7xl mx-auto space-y-3'>
				<div className='flex flex-wrap items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2'>
					<div>
						<h1 className='text-lg md:text-xl font-semibold'>SHG ऑनबोर्डिंग कार्यक्षेत्र</h1>
						<p className='text-xs text-slate-300'>
							लैपटॉप संचालन के लिए पूर्ण-स्क्रीन ऑनबोर्डिंग मोड।
						</p>
					</div>
					<div className='flex gap-2'>
						<button
							onClick={() => router.push('/admin')}
							className='px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/10 text-xs md:text-sm'>
							एडमिन पर वापस जाएं
						</button>
					</div>
				</div>

				<OnboardingFlow creatorId={authUser?.id || legacyUser?.id || ''} />
			</div>
		</div>
	);
}
