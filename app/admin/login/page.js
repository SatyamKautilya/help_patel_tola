'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
	const router = useRouter();
	const [mobileNumber, setMobileNumber] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

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

			router.push('/admin');
			router.refresh();
		} catch (submitError) {
			setError(submitError?.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-slate-950 text-white flex items-center justify-center px-4'>
			<form
				onSubmit={onSubmit}
				className='w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6'>
				<h1 className='text-2xl font-bold mb-2'>Admin Login</h1>
				<p className='text-sm text-slate-400 mb-6'>
					Sign in with your mobile number and password.
				</p>

				<label className='block text-sm mb-2'>Mobile Number</label>
				<input
					className='w-full mb-4 rounded-lg border border-white/10 bg-slate-800 px-3 py-2 outline-none focus:border-blue-500'
					value={mobileNumber}
					onChange={(e) => setMobileNumber(e.target.value)}
					placeholder='Enter mobile number'
					autoComplete='username'
				/>

				<label className='block text-sm mb-2'>Password</label>
				<input
					type='password'
					className='w-full mb-4 rounded-lg border border-white/10 bg-slate-800 px-3 py-2 outline-none focus:border-blue-500'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter password'
					autoComplete='current-password'
				/>

				{error ? <p className='text-red-400 text-sm mb-3'>{error}</p> : null}

				<button
					type='submit'
					disabled={loading}
					className='w-full rounded-lg bg-blue-600 py-2 font-semibold hover:bg-blue-500 disabled:opacity-50'>
					{loading ? 'Signing in...' : 'Login'}
				</button>
			</form>
		</div>
	);
}
