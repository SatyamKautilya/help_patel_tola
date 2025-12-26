'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
		if (category?.id === 'farming') {
			router.push('/subcategory/farming');
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
			<div className='flex items-center justify-center h-screen text-lg text-gray-600'>
				Loading...
			</div>
		);
	}

	return (
		<div className='min-h-screen '>
			<header className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 text-center shadow-md'>
				<h1 className='m-0 text-2xl font-bold'>पटेल टोला गढ़ी</h1>
				<p className='mt-2 text-sm opacity-90'>सुझाव</p>
			</header>

			<main>
				<div className='grid grid-cols-2 gap-4 p-4 max-w-sm mx-auto'>
					{categories.map((category) => (
						<button
							key={category.id}
							className='aspect-square flex flex-col items-center justify-center  bg-blue-400 rounded-xl p-6 shadow-md text-white rounded-lg p-6 shadow-md cursor-pointer transition-transform duration-200 text-center text-white border-none w-full hover:shadow-lg hover:-translate-y-1 active:-translate-y-0.5'
							onClick={() => handleCategoryClick(category)}>
							<div className='text-4xl mb-3'>{category.icon}</div>
							<h2 className='text-white font-bold text-xl'>{category.name}</h2>
						</button>
					))}
				</div>
			</main>

			<Chatbot />
		</div>
	);
}
