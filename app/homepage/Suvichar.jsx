import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuote } from '../store/appSlice';

const Suvichar = () => {
	const [suvichar, setSuvichar] = useState(null);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const quote = useSelector((state) => state.appContext.quote);
	console.log(quote, 'queto');
	useEffect(() => {
		const controller = new AbortController();

		const getVichar = async () => {
			console.log(quote, 'aaa');
			if (quote?.length) {
				setSuvichar({ vichar: quote });
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const response = await fetch('/api/query/database?name=suvichar', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					signal: controller.signal,
				});

				if (!response.ok) throw new Error('Failed to get response');

				const data = await response.json();

				if (data?.response?.vichar) {
					setSuvichar(data.response);
					dispatch(setQuote(data.response.vichar));
				}
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Suvichar error:', error);
				}
			} finally {
				setLoading(false);
			}
		};

		getVichar();
		return () => controller.abort();
	}, []);

	return (
		<section
			className='relative overflow-hidden  rounded-2xl py-4 pr-4 pl-3  lotus-bg
		backdrop-blur-md
  shadow-[0_10px_20px_rgba(0,0,0,0.40)]
  hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
  hover:-translate-y-1
  transition-all duration-300 ease-out'>
			{/* subtle cloud motion overlay */}
			<div className='absolute inset-0 cloud-float opacity-60 pointer-events-none' />

			<div className='relative flex flex-row'>
				<div className='flex flex-row justify-start items-start gap-2'>
					<Image
						src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/lotusbig.png'
						width={40}
						height={40}
						alt='Lotus'
						className='drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
					/>

					<span className='relative pl-1'>
						{loading ? (
							<div className='mt-2 space-y-2'>
								<div className='h-3 w-48 rounded-md bg-white/40 shimmer' />
								<div className='h-3 w-36 rounded-md bg-white/30 shimmer' />
							</div>
						) : (
							<>
								<span className='text-[1.1rem] font-medium tracking-wide text-[#4A2C2A] drop-shadow-[0_1px_2px_rgba(255,255,255,0.35)]'>
									<b>स्वास्थ्य</b> को समर्पित - वर्ष <b>2026</b>
								</span>
								<span className='block mt-2 text-sm text-[#242423] opacity-90 animate-vichar'>
									{suvichar?.vichar}
								</span>
							</>
						)}
					</span>
				</div>
			</div>
		</section>
	);
};

export default Suvichar;
