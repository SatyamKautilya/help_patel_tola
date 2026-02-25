'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Phone, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

/* ── animated floating orb ── */
function Orb({ size, color, x, y, duration, delay }) {
	return (
		<motion.div
			className='absolute rounded-full blur-3xl opacity-30 pointer-events-none'
			style={{
				width: size,
				height: size,
				background: color,
				left: x,
				top: y,
			}}
			animate={{
				y: [0, -40, 0, 30, 0],
				x: [0, 20, -20, 10, 0],
				scale: [1, 1.15, 0.95, 1.08, 1],
			}}
			transition={{
				duration,
				delay,
				repeat: Infinity,
				ease: 'easeInOut',
			}}
		/>
	);
}

/* ── tiny floating particle ── */
function Particle({ index }) {
	const left = `${10 + ((index * 37) % 80)}%`;
	const size = 3 + (index % 4);
	const dur = 6 + (index % 5);
	const del = index * 0.7;
	return (
		<motion.div
			className='absolute rounded-full bg-white/20 pointer-events-none'
			style={{ width: size, height: size, left }}
			initial={{ y: '110vh', opacity: 0 }}
			animate={{ y: '-10vh', opacity: [0, 0.6, 0.6, 0] }}
			transition={{
				duration: dur,
				delay: del,
				repeat: Infinity,
				ease: 'linear',
			}}
		/>
	);
}

export default function AdminLoginPage() {
	const [mobileNumber, setMobileNumber] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const onSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError('');
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mobileNumber, password }),
			});

			const data = await res.json();
			if (!res.ok) {
				setError(data?.error || 'Login failed');
				return;
			}

			setSuccess(true);
			setTimeout(() => {
				/* Full page navigation (not SPA push) ensures the browser
				   sends the freshly-set session cookie on the next request. */
				window.location.href = '/admin';
			}, 600);
		} catch (submitError) {
			setError(submitError?.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative min-h-screen overflow-hidden flex items-center justify-center px-4'>
			{/* ── gradient bg ── */}
			<div className='absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950' />

			{/* ── mesh overlay ── */}
			<div
				className='absolute inset-0 opacity-[0.07]'
				style={{
					backgroundImage:
						'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
					backgroundSize: '40px 40px',
				}}
			/>

			{/* ── orbs ── */}
			<Orb size={400} color='#6366f1' x='5%' y='10%' duration={14} delay={0} />
			<Orb size={300} color='#8b5cf6' x='65%' y='60%' duration={12} delay={2} />
			<Orb size={250} color='#3b82f6' x='80%' y='5%' duration={16} delay={1} />
			<Orb size={200} color='#ec4899' x='20%' y='70%' duration={18} delay={3} />

			{/* ── particles ── */}
			{mounted &&
				Array.from({ length: 12 }).map((_, i) => (
					<Particle key={i} index={i} />
				))}

			{/* ── card ── */}
			<motion.div
				initial={{ opacity: 0, y: 40, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
				className='relative z-10 w-full max-w-md'>
				{/* glass card */}
				<div className='rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden'>
					{/* top accent bar */}
					<motion.div
						className='h-1 w-full'
						style={{
							background:
								'linear-gradient(90deg, #6366f1, #a855f7, #3b82f6, #6366f1)',
							backgroundSize: '300% 100%',
						}}
						animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
						transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
					/>

					<div className='px-7 pt-8 pb-9'>
						{/* icon */}
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								delay: 0.3,
								type: 'spring',
								stiffness: 200,
								damping: 12,
							}}
							className='mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30'>
							<ShieldCheck size={30} className='text-white' />
						</motion.div>

						{/* heading */}
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className='text-center mb-7'>
							<h1 className='text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2'>
								Admin Login <Sparkles size={18} className='text-yellow-400' />
							</h1>
							<p className='text-sm text-slate-400 mt-1'>
								अपने मोबाइल नंबर और पासवर्ड से साइन इन करें
							</p>
						</motion.div>

						<form onSubmit={onSubmit} className='space-y-5'>
							{/* mobile */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}>
								<label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>
									Mobile Number
								</label>
								<div className='relative'>
									<Phone
										size={16}
										className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'
									/>
									<input
										className='w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
										value={mobileNumber}
										onChange={(e) => setMobileNumber(e.target.value)}
										placeholder='Enter mobile number'
										autoComplete='username'
									/>
								</div>
							</motion.div>

							{/* password */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}>
								<label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>
									Password
								</label>
								<div className='relative'>
									<Lock
										size={16}
										className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'
									/>
									<input
										type={showPassword ? 'text' : 'password'}
										className='w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-10 py-2.5 text-white placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder='Enter password'
										autoComplete='current-password'
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors'>
										{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>
							</motion.div>

							{/* error */}
							<AnimatePresence>
								{error && (
									<motion.p
										initial={{ opacity: 0, y: -6 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -6 }}
										className='text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2'>
										{error}
									</motion.p>
								)}
							</AnimatePresence>

							{/* submit */}
							<motion.div
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}>
								<motion.button
									type='submit'
									disabled={loading || success}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className={`w-full rounded-xl py-3 font-bold text-white shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
										success
											? 'bg-emerald-600 shadow-emerald-500/25'
											: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25'
									}`}>
									{success ? (
										<span className='flex items-center justify-center gap-2'>
											<motion.span
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ type: 'spring', stiffness: 300 }}>
												✓
											</motion.span>
											Signed in!
										</span>
									) : loading ? (
										<span className='flex items-center justify-center gap-2'>
											<motion.span
												animate={{ rotate: 360 }}
												transition={{
													duration: 1,
													repeat: Infinity,
													ease: 'linear',
												}}
												className='inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full'
											/>
											Signing in…
										</span>
									) : (
										'Login'
									)}
								</motion.button>
							</motion.div>
						</form>
					</div>
				</div>

				{/* subtle glow under card */}
				<div className='absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none' />
			</motion.div>
		</div>
	);
}
