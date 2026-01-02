'use client';

import { useEffect, useState } from 'react';

const UserWelcome = () => {
	const [user, setUser] = useState(null);
	console.log(user, 'user');
	useEffect(() => {
		if (typeof window !== 'undefined' && window.APP_CONTEXT) {
			setUser(window.APP_CONTEXT);
		}
	}, []);
	useEffect(() => {
		console.log('APP_CONTEXT →', window.APP_CONTEXT);
	}, []);

	// if (!user) {
	// 	return null; // or fallback UI
	// }

	const [logs, setLogs] = useState([]);

	useEffect(() => {
		const ctx = window.APP_CONTEXT;
		setLogs([
			['APP_CONTEXT', ctx],
			['User Agent', navigator.userAgent],
		]);
	}, []);

	return (
		<>
			<div style={{ padding: 16, fontSize: 14 }}>
				<h3>Debug Info</h3>
				<pre>{JSON.stringify(logs, null, 2)}</pre>
			</div>
			<div style={{ padding: 24 }}>
				<h1>नमस्ते {user?.name} 👋</h1>
				<p>
					आपका गाँव: <strong>{user?.villageName}</strong>
				</p>
			</div>
		</>
	);
};
export default UserWelcome;
