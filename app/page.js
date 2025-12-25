'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/categories.module.scss';
import Chatbot from '@/components/Chatbot';

export default function App() {
	const router = useRouter();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		try {
			// First, seed the database if needed

			// Then fetch categories
			const response = await fetch('/api/categories');
			if (response.ok) {
				const data = await response.json();
				setCategories(data.categories || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCategoryClick = (category) => {
		if (category?.id === 'diseases') {
			router.push('/subcategory/hospitals');
			return;
		}
		if (category?.id === 'contacts') {
			router.push('subcategory/contacts');
			return;
		}

		router.push(
			`/subcategory?id=${category.id}&name=${encodeURIComponent(
				category.name,
			)}`,
		);
	};

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					fontSize: '1.25rem',
					color: '#6b7280',
				}}>
				Loading...
			</div>
		);
	}

	return (
		<div
			style={{
				minHeight: '100vh',
				background: 'linear-gradient(to bottom, #f9fafb, #e5e7eb)',
				paddingBottom: '2rem',
			}}>
			<header
				style={{
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					color: 'white',
					padding: '1.5rem 1rem',
					textAlign: 'center',
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				}}>
				<h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>
					पटेल टोला गढ़ी
				</h1>
				<p
					style={{
						margin: '0.5rem 0 0 0',
						fontSize: '0.875rem',
						opacity: 0.9,
					}}>
					सुझाव
				</p>
			</header>

			<main>
				<div className={styles.categoryGrid}>
					{categories.map((category) => (
						<button
							key={category.id}
							className={styles.categoryCard}
							onClick={() => handleCategoryClick(category)}>
							<div className={styles.categoryIcon}>{category.icon}</div>
							<h2 className='text-white font-bold text-xl '>{category.name}</h2>
						</button>
					))}
				</div>
			</main>

			<Chatbot />
		</div>
	);
}
