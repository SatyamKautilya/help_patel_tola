'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/categories.module.scss';
import Chatbot from '@/components/Chatbot';

export default function App() {
	const router = useRouter();
	const [numbers, setNumbers] = useState([]);

	//	const [loading, setLoading] = useState(true);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		try {
			// First, seed the database if needed

			// Then fetch categories
			const response = await fetch('/api/subcategory/contacts');
			if (response.ok) {
				const data = await response.json();
				setNumbers(data.contacts || []);
			}
		} catch (error) {
			console.error('Failed to initialize app:', error);
		} finally {
			//setLoading(false);
		}
	};

	const handleCategoryClick = (category) => {
		router.push(
			`/subcategory?id=${category.id}&name=${encodeURIComponent(
				category.name,
			)}`,
		);
	};

	const handleBack = () => {
		router.back();
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
		<>
			<div className=' flex flex-row my-4 border-b-2 pb-2 items-center'>
				<button
					className='mx-4 px-4 py-2 text-white font-bold font text-xl border   bg-blue-600 rounded-lg'
					onClick={handleBack}>
					← Back
				</button>
			</div>
			{numbers.map((contact) => (
				<div
					key={contact.id}
					className='w-full max-w-md mx-auto bg-white rounded-[10%] shadow-md p-4 flex items-center gap-4 mb-4'>
					<div className='flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-semibold'>
						{contact.name.charAt(0)}
					</div>
					{/* Details */}
					<div className='flex-1'>
						<p className='text-base font-semibold text-gray-900'>
							{contact.name}
						</p>
						<p className='text-sm text-gray-500'>{contact.role}</p>
						<p className='text-sm text-gray-700 mt-1'>
							📞{' '}
							<a
								href={`tel:${contact.mobile}`}
								className='font-medium text-blue-600'>
								{contact.mobile}
							</a>
						</p>
					</div>
				</div>
			))}
		</>
	);
}
