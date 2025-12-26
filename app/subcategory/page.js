'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Chatbot from '@/components/Chatbot';

export default function SubcategoryPage() {
	const router = useRouter();

	const [subcategories, setSubcategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const categoryId = 'abc';
	const categoryName = 'xyz';
	useEffect(() => {
		fetchSubcategories();
	}, []);

	const fetchSubcategories = async () => {
		try {
			const response = await fetch(`/api/subcategories?categoryId=none}`);
			if (response.ok) {
				const data = await response.json();
				setSubcategories(data.subcategories || []);
			}
		} catch (error) {
			console.error('Failed to fetch subcategories:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleBack = () => {
		router.push('/');
	};

	return (
		<div className='p-4 max-w-md mx-auto min-h-screen'>
			<div className='flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-300'>
				<button
					className='bg-indigo-600 text-white rounded-lg py-2 px-3 flex items-center gap-2 cursor-pointer text-sm font-medium transition duration-200 hover:bg-indigo-500'
					onClick={handleBack}>
					← Back
				</button>
				<h1 className='text-2xl font-bold text-gray-800'>
					{categoryName || 'Subcategories'}
				</h1>
			</div>

			{loading ? (
				<div className='text-center py-12 text-gray-600'>
					<p className='text-base'>Loading...</p>
				</div>
			) : subcategories.length === 0 ? (
				<div className='text-center py-12 text-gray-600'>
					<p className='text-base'>No subcategories found</p>
				</div>
			) : (
				<div className='flex flex-col gap-4'>
					{subcategories.map((subcategory) => (
						<div
							key={subcategory.id}
							className='bg-white rounded-lg p-6 shadow-md border-l-4 border-indigo-600 transition-transform duration-200 cursor-pointer hover:translate-x-1 hover:shadow-lg'>
							<h3 className='text-lg font-semibold text-gray-800'>
								{subcategory.name}
							</h3>
							<p className='text-sm text-gray-500'>{subcategory.description}</p>
						</div>
					))}
				</div>
			)}

			<Chatbot categoryId={categoryId} categoryName={categoryName} />
		</div>
	);
}
