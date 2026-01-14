'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Your Components
import { setAppContext } from './store/appSlice';
import Suvichar from './homepage/Suvichar';
import Health from './homepage/Health';
import Kheti from './homepage/Kheti';
import Employment from './homepage/Employment';
import ContactCard from './homepage/ContactCard';
import About from './homepage/About';
import PatelTola from './homepage/PatelTola';
import FeedbackSection from './about/FeedbackSection';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export async function sendTestNotification() {
	try {
		const res = await fetch('/api/send-test-push', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-app-key': 'TAMOHAR_MOBILE_V1',
			},
			body: JSON.stringify({
				title: '📢 टेस्ट नोटिफिकेशन',
				body: 'यह बटन से भेजा गया नोटिफिकेशन है',
				priority: 'high',
				data: {
					screen: 'Home',
					type: 'TEST',
				},
			}),
		});

		const result = await res.json();

		if (!res.ok) {
			throw new Error(result?.error || 'Notification failed');
		}

		console.log('✅ Notification sent:', result);
		alert(`Notification sent to ${result.sentTo} devices`);
	} catch (err) {
		console.error('❌ Notification error:', err);
		alert('Failed to send notification');
	}
}

export default function HomePage() {
	const appContext = useSelector((state) => state.appContext.appContext);
	const dispatch = useDispatch();
	const router = useRouter();
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (typeof window !== 'undefined' && window.APP_CONTEXT) {
			const context = window.APP_CONTEXT;
			setUser(context);
			dispatch(setAppContext({ ...context }));
		}
	}, [dispatch]);

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
				form: { ...appContext, lastSeen: now },
			}),
		}).catch(console.error);
	}, [appContext]);

	// Animation variant for smooth section entry
	const sectionVariant = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	return (
		<div className='relative h-screen overflow-hidden bg-white'>
			{/* 1. FIXED BRANDED BACKGROUND */}
			<div
				className='absolute inset-0 bg-cover bg-center'
				style={{
					backgroundImage:
						'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/homebg.png)',
					backgroundPosition: 'top',
				}}
			/>
			{/* Soft overlay to make content pop */}
			<div className='absolute inset-0 bg-black/20 backdrop-blur-[2px]' />

			{/* 2. MAIN LAYOUT */}
			<div className='relative h-full flex flex-col'>
				{/* 🔒 FIXED HEADER (YOUR LOGO) */}
				<header className='sticky top-0 z-50 w-full flex flex-col pt-4 items-center justify-center  '>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}>
						<Image
							src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/logotrimmed.png'
							alt='Help Patel Tola Logo'
							width={240}
							height={48}
							priority
							className='drop-shadow-2xl'
						/>
					</motion.div>
					{/* Subtle aesthetic line */}
					<div className='h-[2px] w-4/5 mt-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60' />
				</header>

				{/* 📜 SCROLLABLE CONTENT */}
				<main className='flex-1 overflow-y-auto px-4 pb-20 scroll-smooth custom-scrollbar'>
					<div className='max-w-md mx-auto pt-6 space-y-8'>
						{/* Moral / Light Section */}

						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<Suvichar />
						</motion.div>
						{true && (
							<motion.div
								initial={{ opacity: 0, y: 20, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									duration: 0.5,
									ease: 'easeOut',
									delay: 0.2, // Delay to make it appear after Suvichar
								}}
								whileInView='visible'
								viewport={{ once: true }}>
								<Button
									onClick={() => router.push('/admin')} // Assuming 'router' is defined or imported
									className='w-full rounded-2xl bg-purple-600 text-white font-bold py-3 shadow-lg hover:bg-purple-700 transition-colors duration-300'>
									Admin Login
								</Button>
							</motion.div>
						)}
						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<PatelTola />
						</motion.div>

						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<Health />
						</motion.div>

						{/* Aesthetic Divider for Livelihood */}
						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
							className='relative '>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-white/30'></div>
							</div>
							<div className='relative flex justify-center'>
								<span className='bg-gradient-to-r from-transparent via-white to-transparent w-full text-center backdrop-blur-sm px-6 py-1.5  text-sm font-bold text-lime-800 shadow-sm  '>
									आजीविका एवं विकास
								</span>
							</div>
						</motion.div>

						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<Kheti />
						</motion.div>

						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<Employment />
						</motion.div>

						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<ContactCard />
						</motion.div>

						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<About />
						</motion.div>

						<div className='h-px mx-16 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50' />

						<motion.div
							variants={sectionVariant}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}>
							<FeedbackSection sender={appContext.name} />
						</motion.div>

						{/* 🏆 MODERN FOOTER */}
						<footer className='mt-10 mb-8 flex flex-col items-center'>
							<div
								onClick={sendTestNotification}
								className='px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-xs text-slate-600 font-medium'>
								Conceptualised & crafted by
								<span className='ml-1 font-bold text-slate-900'>
									Satyam Kautilya{' '}
									{appContext?.appVersion
										? `• V-${appContext?.appVersion}`
										: ''}
								</span>
							</div>
							<motion.p
								initial={{ opacity: 0, letterSpacing: '0.1em' }}
								animate={{
									opacity: [0.3, 0.6, 0.3], // Subtle pulsing
									letterSpacing: ['0.2em', '0.3em', '0.2em'], // Breathing effect
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
								className='mt-4 text-[10px] uppercase text-white/60 font-bold bg-gradient-to-r from-white/20 via-white to-white/20 bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text'>
								Vision for Progress
							</motion.p>
						</footer>
					</div>
				</main>
			</div>

			<style jsx global>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 0px;
				}
				.custom-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</div>
	);
}
