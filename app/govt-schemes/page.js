'use client';

import { useState } from 'react';

const schemes = [
	{
		id: 1,
		title: 'प्रधानमंत्री आवास योजना',
		icon: '🏠',
		eligibility: 'गरीबी रेखा से नीचे जीवन यापन करने वाले परिवार',
		info: 'ग्रामीण और शहरी गरीबों को पक्का घर उपलब्ध कराने की योजना। घर निर्माण हेतु आर्थिक सहायता दी जाती है।',
		benefits: 'आर्थिक सहायता, ब्याज सब्सिडी, सुरक्षित आवास',
		apply: 'ग्राम पंचायत में आवेदन, जरूरी दस्तावेज जमा करना',
	},
	{
		id: 2,
		title: 'आयुष्मान भारत योजना',
		icon: '➕',
		eligibility: 'गरीब और वंचित परिवार',
		info: '5 लाख रुपये तक का निःशुल्क स्वास्थ्य बीमा। सरकारी और सूचीबद्ध निजी अस्पतालों में इलाज।',
		benefits: 'निःशुल्क इलाज, कैशलेस सुविधा',
		apply: 'CSC केंद्र या ऑनलाइन पंजीकरण',
	},
];

export default function SchemesPage() {
	const [openId, setOpenId] = useState(1);

	return (
		<div className='min-h-screen bg-[#f4f7fb]'>
			{/* Header */}
			<div className='rounded-b-3xl bg-gradient-to-br from-[#e7f5f3] to-[#f8fafc] px-4 py-6 shadow-sm'>
				<h1 className='text-center text-xl font-bold text-gray-800'>
					उपलब्ध योजनाएं
				</h1>
				<p className='mt-1 text-center text-sm text-gray-600'>
					गांव के विकास हेतु उपयोगी सरकारी योजनाओं की जानकारी
				</p>

				{/* Tabs */}
				<div className='mt-4 flex gap-2 overflow-x-auto rounded-full bg-white p-2 shadow'>
					<Tab active label='उपलब्ध योजनाएं' />
					<Tab label='कृषि' />
					<Tab label='आवास' />
				</div>
			</div>

			{/* Content */}
			<div className='px-4 py-6'>
				{schemes.map((scheme) => {
					const isOpen = openId === scheme.id;

					return (
						<div
							key={scheme.id}
							className='mb-4 rounded-2xl bg-gradient-to-br from-[#6a5acd] to-[#a855f7] p-[2px]'>
							<div className='rounded-2xl bg-white p-4'>
								{/* Header */}
								<button
									onClick={() => setOpenId(isOpen ? null : scheme.id)}
									className='flex w-full items-center justify-between'>
									<div className='flex items-center gap-3'>
										<span className='text-2xl'>{scheme.icon}</span>
										<h2 className='text-base font-bold text-gray-800'>
											{scheme.title}
										</h2>
									</div>
									<span className='text-gray-500'>{isOpen ? '▲' : '▼'}</span>
								</button>

								{/* Details */}
								{isOpen && (
									<div className='mt-4 space-y-4 text-sm text-gray-700'>
										<Section
											title='पात्रता'
											icon='📋'
											text={scheme.eligibility}
										/>
										<Section
											title='योजना की जानकारी'
											icon='ℹ️'
											text={scheme.info}
										/>
										<Section
											title='योजना के लाभ'
											icon='🎁'
											text={scheme.benefits}
										/>
										<Section
											title='आवेदन की प्रक्रिया'
											icon='📝'
											text={scheme.apply}
										/>

										{/* <button className='mt-2 w-full rounded-full bg-green-600 py-3 font-semibold text-white shadow active:scale-95'>
											आवेदन करें
										</button> */}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

/* ---------------- Components ---------------- */

function Tab({ label, active }) {
	return (
		<button
			className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
				active ? 'bg-green-100 text-green-700' : 'text-gray-600'
			}`}>
			{label}
		</button>
	);
}

function Section({ title, icon, text }) {
	return (
		<div>
			<p className='mb-1 flex items-center gap-2 font-semibold text-gray-800'>
				<span>{icon}</span> {title}:
			</p>
			<p className='text-gray-600'>{text}</p>
		</div>
	);
}
