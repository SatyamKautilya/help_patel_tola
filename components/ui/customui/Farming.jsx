import { Chip } from '@heroui/react';
import React from 'react';

const Farming = (props) => {
	const { name, time, variety = [], sprays = [] } = props;

	return (
		<div className='p-6 max-w-4xl mx-auto'>
			{/* Top Section */}
			<div className='flex gap-6 mb-8'>
				{/* Image Section */}
				<div className='flex-shrink-0'>
					<img
						src='/farming-image.jpg'
						alt='Farming'
						className='w-48 h-48 object-cover rounded-lg'
					/>
				</div>

				{/* Info Section */}
				<div className='flex-1'>
					<h1 className='text-3xl font-bold mb-4'>{name}</h1>
					<p className='text-gray-600 text-xl mb-6'>{time}</p>
				</div>
			</div>
			<div className='border rounded-lg p-6 mb-4 bg-lime-600'>
				<div className=' grid grid-cols-2 gap-4'>
					<div className='p-4'>
						<p className='font-semibold text-xl text-white'>उन्नत किस्म</p>
					</div>
					<div className=' flex flex-col'>
						<ul className='list-disc list-inside pl-5'>
							{variety?.map((item, index) => (
								<li
									key={index}
									className='text-white font-semibold text-xl w-full'>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className='flex flex-row justify-center my-8 w-full'>
				<span className='text-2xl font-bold'>स्प्रे शैड्यूल</span>
			</div>

			{/* Items Box */}
			{sprays?.map((spray, index) => (
				<div key={index} className='mb-6'>
					<div className='border rounded-lg p-6 bg-lime-100'>
						<div className='space-y-2'>
							{spray.note && (
								<div className='flex flex-row justify-center'>
									<Chip color={spray.notetype} size='md'>
										{spray.note}
									</Chip>
								</div>
							)}
							<div className='p-4 bg-pink-700 border rounded-lg text-white text-2xl font-bold text-center hover:shadow-md cursor-pointer'>
								<p className='te-bg-lime-100nt-semibold'>{spray.duedate}</p>
							</div>

							<div className='flex flex-row justify-center'>
								<Chip color='primary' size='md'>
									{spray.method === 'drenching'
										? '50 एमएल जड़ मे डाले	'
										: 'सुबह या शाम को छिड़काव करे'}
								</Chip>
							</div>

							<div className='p-4 bg-white border rounded-lg text-gray-700 hover:shadow-md cursor-pointer'>
								<p className='text-xl font-semibold'>{`प्रकार: ${spray.type}`}</p>
							</div>
							<div className='p-4 bg-white text-red-800 border rounded-lg text-gray-700 hover:shadow-md cursor-pointer'>
								<p className='text-xl font-semibold'>{`टारगेट: ${spray.target}`}</p>
							</div>
							<div className='p-4 bg-white border rounded-lg text-gray-700 hover:shadow-md cursor-pointer'>
								<p className='text-xl font-semibold'>{`दवाई: ${spray.name}`}</p>
							</div>
							<div className='p-4 bg-white border rounded-lg text-gray-700 hover:shadow-md cursor-pointer'>
								<p className='text-xl font-semibold'>{`केमिकल: ${spray.chemical}`}</p>
							</div>
							<div className='p-4 bg-white border rounded-lg text-gray-700 hover:shadow-md cursor-pointer'>
								<p className='text-xl font-semibold'>{`मात्रा: ${spray.quantity}`}</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Farming;
