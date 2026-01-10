'use client';
import { Accordion, AccordionItem, Card, CardBody } from '@heroui/react';
import { BookOpen } from 'lucide-react';

export default function CaseStoryPage({ props }) {
	return props?.map((caseData, caseIndex) => (
		<div key={caseIndex} className=''>
			{/* Outer Soft Card */}
			<Card className='rounded-2xl border border-gray-200 bg-white shadow-sm'>
				<CardBody className=''>
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
								<div className='flex gap-3 items-start'>
									<div className='p-2 rounded-full bg-blue-50'>
										<BookOpen className='text-blue-600' size={20} />
									</div>

									<div>
										<span className='block text-xl font-bold text-gray-900'>
											{caseData?.id}
										</span>
										<span className='block text-sm italic text-gray-600'>
											{caseData?.subtitle}
										</span>
									</div>
								</div>
							}>
							{/* STORY TIMELINE */}
							<div className='space-y-4 py-4'>
								{caseData.storySegment.map((segment, index) => (
									<Card
										key={index}
										className='bg-white border border-gray-200 rounded-xl shadow-sm'>
										<CardBody className='p-5'>
											<div className='flex gap-4'>
												{/* Timeline Dot */}
												<div className='mt-2'>
													<div className='w-3 h-3 rounded-full bg-blue-500' />
												</div>

												{/* Content */}
												<div className='space-y-2'>
													<h2 className='font-semibold text-lg text-gray-900'>
														{segment.heading}
													</h2>

													<p className='text-gray-700 text-base leading-relaxed'>
														{segment.description}
													</p>

													{/* Takeaway */}
													<div className='bg-red-50 border-l-4 border-red-400 p-3 rounded-md'>
														<p className='text-red-800 text-sm font-medium'>
															{segment.takeaway}
														</p>
													</div>
												</div>
											</div>
										</CardBody>
									</Card>
								))}
							</div>
						</AccordionItem>
					</Accordion>
				</CardBody>
			</Card>
		</div>
	));
}
