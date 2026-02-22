'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RouteChangeLoader() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [visible, setVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	const intervalRef = useRef(null);
	const finishTimerRef = useRef(null);
	const startTimerRef = useRef(null);
	const visibleRef = useRef(false);

	const clearAllTimers = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		if (finishTimerRef.current) {
			clearTimeout(finishTimerRef.current);
			finishTimerRef.current = null;
		}
		if (startTimerRef.current) {
			clearTimeout(startTimerRef.current);
			startTimerRef.current = null;
		}
	};

	const start = () => {
		if (visibleRef.current) return;
		clearAllTimers();
		setProgress(12);
		setVisible(true);
		visibleRef.current = true;
		intervalRef.current = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 88) return prev;
				const next = prev + Math.max(1, (88 - prev) * 0.08);
				return Number(next.toFixed(2));
			});
		}, 120);
	};

	const done = () => {
		if (!visibleRef.current) return;
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setProgress(100);
		finishTimerRef.current = setTimeout(() => {
			setVisible(false);
			visibleRef.current = false;
			setProgress(0);
		}, 220);
	};

	useEffect(() => {
		done();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, searchParams?.toString()]);

	useEffect(() => {
		const isInternalHref = (href) => {
			try {
				const nextUrl = new URL(href, window.location.href);
				return nextUrl.origin === window.location.origin;
			} catch {
				return false;
			}
		};

		const shouldStartForHref = (href) => {
			if (!isInternalHref(href)) return false;
			const nextUrl = new URL(href, window.location.href);
			const curr = window.location;
			const samePathAndQuery =
				nextUrl.pathname === curr.pathname && nextUrl.search === curr.search;
			if (samePathAndQuery && nextUrl.hash) return false;
			if (samePathAndQuery && nextUrl.hash === curr.hash) return false;
			return !samePathAndQuery;
		};

		const onDocumentClick = (event) => {
			if (event.defaultPrevented) return;
			if (event.button !== 0) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			const anchor = event.target?.closest?.('a[href]');
			if (!anchor) return;
			if (anchor.target && anchor.target !== '_self') return;
			const href = anchor.getAttribute('href');
			if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;
			if (shouldStartForHref(href)) start();
		};

		const origPushState = window.history.pushState;
		const origReplaceState = window.history.replaceState;

		window.history.pushState = function patchedPushState(...args) {
			start();
			return origPushState.apply(this, args);
		};
		window.history.replaceState = function patchedReplaceState(...args) {
			start();
			return origReplaceState.apply(this, args);
		};

		const onPopState = () => {
			start();
		};

		document.addEventListener('click', onDocumentClick, true);
		window.addEventListener('popstate', onPopState);

		return () => {
			document.removeEventListener('click', onDocumentClick, true);
			window.removeEventListener('popstate', onPopState);
			window.history.pushState = origPushState;
			window.history.replaceState = origReplaceState;
			clearAllTimers();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!visible) return null;

	return (
		<>
			<div className='pointer-events-none fixed inset-x-0 top-0 z-[10001] h-1 bg-slate-200/30'>
				<div
					className='h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 transition-[width] duration-150 ease-out'
					style={{ width: `${progress}%` }}
				/>
			</div>
			<div className='pointer-events-none fixed top-4 right-4 z-[10001]'>
				<div className='h-7 w-7 rounded-full border-2 border-indigo-500/30 border-t-indigo-600 animate-spin bg-white/75 backdrop-blur-sm shadow-sm' />
			</div>
		</>
	);
}

