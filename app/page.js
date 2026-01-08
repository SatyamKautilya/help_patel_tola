'use client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
	const router = useRouter();
	return (
		<main className='min-h-screen '>
			{/* Header / Moral Anchor */}
			<header className='fixed z-50 top-0 w-full text-center flex flex-col pt-8 items-center justify-center  bg-gradient-to-b from-blue-900 via-blue-700  to-[#f7f3eb] space-y-2'>
				<Image
					src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/logotrimmed.png'
					alt='Help Patel Tola Logo'
					width={250}
					height={50}
					priority
				/>

				<p className='text-sm text-blue-900 pb-2'>
					ग्रामीण जीवन को आधुनिक एवं सुखद बनाने का अभियान
				</p>
			</header>
			<div className=' bg-[#f7f3eb] mt-36 px-4 py-6 space-y-6'>
				{/* Moral / Light Section */}
				<section className='rounded-2xl bg-gradient-to-r from-[#cfa44a] to-[#8f6b2f] p-5 text-white'>
					<h2 className='text-xl font-semibold'>तत्त्वबोध</h2>
					<p className='text-sm mt-2'>
						सही सोच से ही सही जीवन की शुरुआत होती है।
					</p>
				</section>
				<section
					className='rounded-2xl h-50 bg-[#dfeee3] flex flex-row  space-y-3 bg-cover bg-center'
					style={{
						backgroundImage:
							'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/healthbg.png)',
					}}>
					<div className='flex flex-col justify-end'>
						<span className='pr-24 pl-4 py-2 text-white text-lg font-semibold bg-gradient-to-r from-teal-900 to-black/0 rounded-bl-md rounded-r-md'>
							स्वास्थ्य
						</span>
					</div>
					<div className='w-full h-[150px] flex flex-col justify-end items-end space-y-2 p-4'>
						<Button
							className='
		w-max rounded-3xl px-5 py-2
		bg-gradient-to-br from-gray-100 via-gray-300 to-gray-100
		text-gray-800 
		border border-gray-300
		shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.15)]
		hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_4px_10px_rgba(0,0,0,0.2)]
		hover:brightness-105
		active:scale-95
		transition-all duration-200 font-bold
	'>
							आयुष्मान अस्पताल देखें
						</Button>
						<Button
							className='
		w-max rounded-3xl px-5 py-2
		bg-gradient-to-r from-[#e6f4ec] via-[#d3eee2] to-[#e6f4ec]
		text-[#1f6b4f] font-medium
		border border-[#b9e2cf]
		shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.12)]
		hover:shadow-[0_4px_10px_rgba(31,107,79,0.25)]
		hover:brightness-105
		active:scale-95
		transition-all duration-200
	'>
							स्वस्थ कैसे रहें
						</Button>
					</div>
				</section>

				<section className='grid grid-cols-2 gap-4'>
					<div
						onClick={() => {
							router.push('/subcategory/farming');
						}}
						style={{
							backgroundImage:
								'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/bgfarming.png)',
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
						className='rounded-2xl   h-30'>
						<div className='flex h-full flex-row justify-end items-end'>
							<span className=' w-full text-end pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-teal-900 to-black/30 rounded-bl-md rounded-r-md'>
								आधुनिक कृषि
							</span>
						</div>
					</div>

					<div
						style={{
							backgroundImage:
								'url(https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/education.png)',
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
						className='rounded-xl   w-full h-48'>
						<div className='flex h-full flex-row justify-end items-end'>
							<span className=' w-full text-end pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-cyan-900 to-cyan/30 rounded-bl-md rounded-r-md'>
								शिक्षा
							</span>
						</div>
					</div>
				</section>
				{/* Livelihood & Growth */}
				<section
					className='rounded-2xl bg-[linear-gradient(to_right,#e6f0ff_0%,#bfdbfe_40%,#f7e7b4_75%,#e6c46b_100%)]
 p-5 space-y-4'>
					<h2 className='text-lg font-bold text-lime-700  text-center'>
						आजीविका एवं विकास
					</h2>

					<div className='grid grid-cols-2 gap-4'>
						<div className='rounded-xl bg-blue-700/10 pt-4 shadow'>
							<Image
								src={
									'https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/kindpng_1337272.png'
								}
								alt='Livelihood'
								width={600}
								height={100}
								className='-mt-8'
							/>
							<div className='w-full  flex flex-row justify-end items-end'>
								<span className=' w-full text-end pr-3 py-2 text-white text-lg font-semibold bg-gradient-to-l from-blue-400 to-cyan/30 rounded-bl-md rounded-br-xl'>
									रोजगार
								</span>
							</div>
						</div>

						<div
							onClick={() => {
								router.push('govt-schemes');
							}}
							className='rounded-xl bg-yellow-400/20 pt-4 shadow'>
							<Image
								src={
									'https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/tree.png'
								}
								alt='Livelihood'
								width={200}
								height={30}
								className='-mt-9 w-36 h-16'
							/>
							<div
								onClick={() => {}}
								className='w-full  flex flex-row justify-end items-end'>
								<span className=' w-full text-end pr-3 py-2 text-teal-900 text-lg font-semibold bg-gradient-to-l from-gold to-cyan/30 rounded-bl-md rounded-br-xl'>
									सरकारी योजनाएँ
								</span>
							</div>
						</div>
					</div>
				</section>
				{/* Contacts / Community */}
				<section className='rounded-2xl bg-[#f1ede6] p-5'>
					<h2 className='text-lg font-semibold text-[#5b4a2f]'>संपर्क सूत्र</h2>
					<p className='text-sm mt-2'>डॉक्टर, स्वयंसेवक, अधिकारी</p>
				</section>
				{/* Moral Values Footer */}
				<footer
					onClick={() => {
						router.push('/about-hindi');
					}}
					className='rounded-2xl mb-16 bg-gradient-to-r from-[#f2d28b] to-[#e8b85c] p-5 text-center'>
					<p className='text-sm text-[#5a3d12]'>“तमोहर के बारे मे जानें”</p>
				</footer>
			</div>
		</main>
	);
}
