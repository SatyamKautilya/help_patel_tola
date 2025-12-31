'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Chatbot from '@/components/Chatbot';
import { getTextById } from '@/hooks/utils';

export default function App() {
	const router = useRouter();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [text, setTexts] = useState({});

	const [showWelcom, setShowWelcome] = useState(false);
	useEffect(() => {
		initializeApp();
	}, []);

	const fetchTexts = async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/query/database?name=texts`);
			if (response.ok) {
				const data = await response.json();

				setTexts(data.titleandtexts || []);
			}
		} catch (error) {
			console.error('Failed to fetch subcategories:', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchTexts();
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

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('userToken') === 'token') setShowWelcome(false);
			return;
		}
		setShowWelcome(true);
		setTimeout(() => {
			setShowWelcome(true);
			if (typeof window !== 'undefined') {
				localStorage.setItem('userToken', 'token');
			}
		}, [5000]);
	}, []);

	if (loading || showWelcom) {
		return (
			<div class='splash'>
				<h1 class='slok'>तमसो मा ज्योतिर्गमय</h1>
				<p class='meaning'>अंधकार से प्रकाश की ओर</p>
			</div>
		);
	}

	if (getTextById(text, 'launch') === 'Locked') {
		return (
			<div className=' px-6 h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)] flex flex-row justify-center items-center text-white text-3xl'>
				हम कुछ विशेष और सार्थक तैयार कर रहे हैं।
			</div>
		);
	}
	return (
		<div className='min-h-screen '>
			<header className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 text-center shadow-md'>
				<h1 className='m-0 text-2xl font-bold'>
					{getTextById(text, 'toptitle')}
				</h1>
				<p className='mt-2 text-sm opacity-90'>
					{getTextById(text, 'subtitle')}
				</p>
			</header>

			<main>
				<div className='grid grid-cols-2 gap-4 p-4 max-w-sm mx-auto'>
					{categories.map((category) => (
						<button
							key={category.id}
							className='aspect-square flex flex-col items-center justify-center  bg-gradient-to-br from-blue-400 via-indigo-600 to-violet-700 rounded-xl p-6 shadow-md text-white rounded-lg p-6 shadow-md cursor-pointer transition-transform duration-200 text-center text-white border-none w-full hover:shadow-lg hover:-translate-y-1 active:-translate-y-0.5'
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
