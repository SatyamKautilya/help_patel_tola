'use client';

import { useSelector } from 'react-redux';

export default function GlobalLoader() {
	const isLoading = useSelector((state) => state.appContext.loader);

	if (!isLoading) return null;

	return (
		<div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm'>
			<div className='h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent' />
		</div>
	);
}
