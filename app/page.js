import { Button } from '@heroui/react';
import Image from 'next/image';

export default function HomePage() {
	return (
		<main className='min-h-screen '>
			{/* Header / Moral Anchor */}
			<header className='text-center flex flex-col pt-10 items-center justify-center  bg-gradient-to-b from-charcoal via-charcoal-soft to-[#f7f3eb] space-y-2'>
				<Image
					src='https://8dxblayock8syelc.public.blob.vercel-storage.com/homepage/logotrimmed.png'
					alt='Help Patel Tola Logo'
					width={300}
					height={60}
					priority
				/>

				<p className='text-sm text-[#6b5a3a]'>
					जीवन को संतुलन में लाने का प्रयास
				</p>
			</header>
			<div className=' bg-[#f7f3eb] px-4 py-6 space-y-6'>
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
				<section className='rounded-2xl bg-[#e7e3f5] p-5 space-y-4'>
					<h2 className='text-lg font-semibold text-[#3f3c7a]'>
						जीविका एवं विकास
					</h2>

					<div className='grid grid-cols-2 gap-4'>
						<div className='rounded-xl bg-white p-4 shadow'>
							<h3 className='font-medium'>रोज़गार</h3>
							<p className='text-xs mt-1'>काम और अवसर</p>
						</div>

						<div className='rounded-xl bg-white p-4 shadow'>
							<h3 className='font-medium'>आर्थिक विकास</h3>
							<p className='text-xs mt-1'>योजनाएँ, सहायता</p>
						</div>
					</div>
				</section>
				{/* Contacts / Community */}
				<section className='rounded-2xl bg-[#f1ede6] p-5'>
					<h2 className='text-lg font-semibold text-[#5b4a2f]'>संपर्क सूत्र</h2>
					<p className='text-sm mt-2'>डॉक्टर, स्वयंसेवक, अधिकारी</p>
				</section>
				{/* Moral Values Footer */}
				<footer className='rounded-2xl bg-gradient-to-r from-[#f2d28b] to-[#e8b85c] p-5 text-center'>
					<p className='text-sm text-[#5a3d12]'>“संतुलन ही सच्ची प्रगति है”</p>
				</footer>
			</div>
		</main>
	);
}
