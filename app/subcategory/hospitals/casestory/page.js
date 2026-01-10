'use client';
import { useEffect, useState } from 'react';
import CaseStoryPage from './CaseStoryPage';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/store/appSlice';

export default function Page() {
	const [stories, setStories] = useState([]);

	const dispatch = useDispatch();
	const getStory = async () => {
		dispatch(setLoader(true));
		try {
			const res = await fetch('/api/subcategory/hospitals?name=content');

			if (!res.ok) {
				throw new Error('Failed to fetch stories');
			}

			const storiesFromApi = await res.json();

			setStories(storiesFromApi);
			return storiesFromApi;
		} catch (error) {
			console.error(error);
			return [];
		} finally {
			dispatch(setLoader(false));
		}
	};

	useEffect(() => {
		getStory();
	}, []);

	return (
		<>
			<header className='fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40'></header>
			<header className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40'>
				<div className='flex flex-col items-center pt-7'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png'
						alt='Health Topics'
						width={250}
						height={56}
						priority
					/>
					<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
				</div>
			</header>
			<div className='min-h-screen mt-24 justify-center'>
				<CaseStoryPage props={stories} />
			</div>
		</>
	);
}
