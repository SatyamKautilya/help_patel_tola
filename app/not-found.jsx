'use client';

import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-6'>
			<div className='max-w-md text-center'>
				<h1 className='text-6xl font-bold text-green-700'>404</h1>

				<p className='mt-4 text-xl font-semibold text-gray-800'>
					अभी यह पेज निर्माणाधीन है,
					<br />
					बहुत जल्द आप इसे देख पाएंगे🌱
				</p>

				<p className='mt-3 text-gray-600'>
					The page you are looking for might have been moved, renamed, or never
					existed.
				</p>

				<div className='mt-8 flex flex-col gap-3'>
					<Link
						href='/'
						className='rounded-lg bg-green-700 px-6 py-3 text-white font-medium hover:bg-green-800 transition'>
						तमोहर के मुख पृष्ठ पर वापस जाएं।
					</Link>

					<Link
						href='/about-hindi'
						className='rounded-lg border border-green-700 px-6 py-3 text-green-700 font-medium hover:bg-green-50 transition'>
						तमोहर के बारे मे जानें।
					</Link>
				</div>
			</div>
		</div>
	);
}
