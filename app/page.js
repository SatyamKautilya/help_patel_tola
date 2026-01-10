'use client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import FeedbackSection from './about/FeedbackSection';
import { useEffect, useState } from 'react';
import { setAppContext } from './store/appSlice';
import Suvichar from './homepage/Suvichar';
import Health from './homepage/Health';
import Kheti from './homepage/Kheti';
import Employment from './homepage/Employment';
import ContactCard from './homepage/ContactCard';
import About from './homepage/About';

export default function HomePage() {
	const appContext = useSelector((state) => state.appContext.appContext);
	const dispatch = useDispatch();
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (typeof window !== 'undefined' && window.APP_CONTEXT) {
			const context = window.APP_CONTEXT;

			setUser(context); // local state
			dispatch(setAppContext({ ...context })); // redux state
		}
	}, []);

	useEffect(() => {
		if (!appContext?.name) return;

		const hasVisited = sessionStorage.getItem('user_last_seen_sent');

		if (hasVisited) return;

		sessionStorage.setItem('user_last_seen_sent', 'true');

		const now = new Date().toISOString();

		fetch('/api/subcategory/hospitals?name=users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				form: {
					...appContext,
					lastSeen: now,
				},
			}),
		}).catch(console.error);
	}, [appContext]);

	const router = useRouter();
	return (
		<div className='relative h-screen overflow-hidden'>
			{/* Fixed Background */}
			<div
				className='absolute inset-0 bg-cover bg-center'
				style={{
					backgroundImage:
						'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/homebg.png)',
					backgroundPosition: 'top',
					backgroundSize: 'cover',
				}}
			/>

			{/* Dark overlay for logo contrast */}
			<div className='absolute inset-0 bg-black/25 ' />

			{/* Foreground Layout */}
			<div className='relative h-full flex flex-col'>
				{/* 🔒 FIXED HEADER (LOGO) */}
				<header className=' z-50 top-0 w-full text-center flex flex-col pt-8 items-center justify-center '>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/logotrimmed.png'
						alt='Help Patel Tola Logo'
						width={250}
						height={50}
						priority
					/>
					<div className='h-px w-full mx-10 bg-gradient-to-r from-transparent via-gold-soft to-transparent' />
					{/* 
					<p className='text-sm text-gold pb-2'>
						ग्रामीण जीवन को आधुनिक एवं सुखद बनाने का अभियान
					</p> */}
				</header>

				{/* 📜 SCROLLABLE CONTENT */}
				<main className='flex-1 overflow-y-auto px-4 pb-10'>
					{/* Header / Moral Anchor */}

					<div className='  pt-3 pb-6 space-y-6'>
						{/* Moral / Light Section */}
						<Suvichar />
						<Health />
						<div className='bg-gradient-to-r from-transparent via-white to-transparent'>
							<h2 className='text-lg font-bold text-lime-700 mb-0 text-center'>
								आजीविका एवं विकास
							</h2>
							<div className='w-full mt- h-px mb-8 bg-gradient-to-r from-transparent via-lime-700 to-transparent' />
						</div>

						<Kheti />
						<div className='bg-gradient-to-r from-transparent via-white to-transparent'>
							<h2 className='text-lg font-bold text-lime-700 mb-0 text-center'>
								आजीविका एवं विकास
							</h2>
							<div className='w-full mt- h-px mb-8 bg-gradient-to-r from-transparent via-lime-700 to-transparent' />
						</div>
						{/* Livelihood & Growth */}
						<Employment />
						{/* Contacts / Community */}
						<ContactCard />

						{/* Moral Values Footer */}
						<About />
						<div className='h-px mx-10 bg-gradient-to-r from-transparent via-green-500 to-transparent' />

						<FeedbackSection sender={appContext.name} />

						<footer
							className='
									relative mt-3 mb-4
									flex justify-center
									text-sm
									text-[#4b5563]
								'>
							<div
								className='
										px-4 py-2
										rounded-full
										bg-white/40 backdrop-blur-none
										shadow-[0_2px_8px_rgba(0,0,0,0.12)]
										'>
								Conceptualised & crafted by
								<span className='ml-1 font-semibold text-[#374151]'>
									Satyam Kautilya{' '}
									{`${
										appContext?.appVersion ? `V-${appContext?.appVersion}` : ''
									}`}
								</span>
							</div>
						</footer>
					</div>
				</main>
			</div>
		</div>
	);
}
