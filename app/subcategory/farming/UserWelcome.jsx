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

	if (!user) {
		return null; // or fallback UI
	}

	return (
		<div style={{ padding: 24 }}>
			<h1>नमस्ते {user.name} 👋</h1>
			<p>
				आपका गाँव: <strong>{user.villageName}</strong>
			</p>
		</div>
	);
};
export default UserWelcome;
