'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/categories.module.scss';
import Chatbot from '@/components/Chatbot';

export default function App() {
	const router = useRouter();
	const [categories, setCategories] = useState([]);
	//	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	initializeApp();
	// }, []);

	// const initializeApp = async () => {
	// 	try {
	// 		// First, seed the database if needed

	// 		// Then fetch categories
	// 		const response = await fetch('/api/diseases');
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setCategories(data.categories || []);
	// 		}
	// 	} catch (error) {
	// 		console.error('Failed to initialize app:', error);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	const handleCategoryClick = (category) => {
		router.push(
			`/subcategory?id=${category.id}&name=${encodeURIComponent(
				category.name,
			)}`,
		);
	};

	// if (loading) {
	// 	return (
	// 		<div
	// 			style={{
	// 				display: 'flex',
	// 				alignItems: 'center',
	// 				justifyContent: 'center',
	// 				height: '100vh',
	// 				fontSize: '1.25rem',
	// 				color: '#6b7280',
	// 			}}>
	// 			Loading...
	// 		</div>
	// 	);
	// }

	return (
		<div className=''>
			<div className='p-4 h-30 w-full'>
				<span>हृदय रोग</span>
				<img src=''></img>
				<span></span>
			</div>
		</div>
	);
}
