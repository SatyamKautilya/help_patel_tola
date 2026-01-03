'use client';

import { Accordion, AccordionItem, Card, CardBody } from '@heroui/react';

export default function CaseStoryPage({ props }) {
	return props?.map((caseData, caseIndex) => (
		<div key={caseIndex} className='px-4 py-10'>
			<div className='max-w-3xl mx-auto'>
				{/* 🔥 OUTER GRADIENT CARD */}
				<Card
					className='rounded-2xl p-[2px] shadow-xl
					bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-300'>
					{/* Inner transparent layer */}
					<div className='rounded-2xl bg-transparent'>
						<Accordion
							variant='splitted'
							selectionMode='single'
							className='bg-transparent'>
							<AccordionItem
								key={`case-${caseIndex}`}
								classNames={{
									base: 'bg-transparent',
									titleWrapper: 'bg-transparent',
									content: 'bg-transparent',
								}}
								title={
									<div className='flex flex-col gap-2 text-white'>
										<span className='text-3xl font-bold'>{caseData?.id}</span>
										<span className='text-md italic font-bold'>
											{caseData?.subtitle}
										</span>
									</div>
								}>
								{/* STORY SEGMENTS */}
								<div className='space-y-5 py-4'>
									{caseData.storySegment.map((segment, index) => (
										<Card
											key={index}
											className='bg-white/70 backdrop-blur-md
											border border-white/30 shadow-lg'>
											<CardBody className='p-6'>
												<div className='flex gap-4'>
													{/* Dot */}
													<div className='mt-1'>
														<div className='w-3 h-3 rounded-full bg-indigo-600'></div>
													</div>

													{/* Content */}
													<div>
														<h2 className='font-semibold text-xl text-black'>
															{segment.heading}
														</h2>
														<p className=' text-black text-lg mt-1'>
															{segment.description}
														</p>
														<p className=' border-red-500	border-1 p-2 bg-red-300 rounded-md text-black text-lg mt-1'>
															{segment.takeaway}
														</p>
													</div>
												</div>
											</CardBody>
										</Card>
									))}
								</div>
							</AccordionItem>
						</Accordion>
					</div>
				</Card>
			</div>
		</div>
	));
}
