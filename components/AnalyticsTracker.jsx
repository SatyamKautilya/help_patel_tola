'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_ID = 'G-D91NZNMNBB';

export default function AnalyticsTracker() {
	const pathname = usePathname();

	useEffect(() => {
		if (!GA_ID || typeof window === 'undefined' || !window.gtag) return;

		window.gtag('config', GA_ID, {
			page_path: pathname,
		});
	}, [pathname]);

	return null;
}
