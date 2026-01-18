'use client';
import React from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Chip,
	Button,
	Divider,
} from '@heroui/react';
import { motion } from 'framer-motion';
import {
	Calendar,
	MapPin,
	Users,
	ClipboardList,
	MessageCircle,
	CheckCircle2,
	ArrowRight,
} from 'lucide-react';

const TamoharLogo = () => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='text-primary'>
		{/* Sun/Light Rays representing 'Tamohar' */}
		<path
			d='M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 4.93L4.93 6.34'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
		/>
		{/* Group meeting circle */}
		<circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='2' />
		<path
			d='M8 12C8 10 12 9 12 9C12 9 16 10 16 12'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
		/>
	</svg>
);

const Header = () => {
	return (
		<nav className='sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md'>
			<div className='mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6'>
				{/* Logo Section */}
				<div className='flex items-center gap-2'>
					<div className='flex items-center justify-center rounded-lg bg-primary/10 p-1'>
						<TamoharLogo />
					</div>
					<span className='text-lg font-bold tracking-tight text-slate-900'>
						तमोहर
					</span>
					<div className='h-4 w-[1px] bg-slate-200 mx-1' />
					<span className='text-xs font-medium text-slate-500 uppercase tracking-widest'>
						Meetings
					</span>
				</div>

				{/* Right side Actions (Optional) */}
				<div className='flex items-center gap-4'>
					<button className='text-sm font-medium text-slate-600 hover:text-primary transition-colors'>
						Archive
					</button>
					<button className='rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800 transition-all shadow-sm'>
						New Session
					</button>
				</div>
			</div>
		</nav>
	);
};

const MeetingsPage = () => {
	const meetings = [
		{
			id: 1,
			title: 'गाँव विकास बैठक',
			date: '2024-01-15',
			time: '10:00 AM',
			location: 'सामुदायिक हॉल',
			attendees: ['पटेल', 'तोला', 'शर्मा', 'कुमार'],
			agenda: ['बुनियादी ढांचे की योजना', 'बजट आवंटन', 'स्वास्थ्य पहल'],
			discussion:
				'नई सड़क निर्माण परियोजना पर चर्चा की गई और जल आपूर्ति सुधार के लिए धन आवंटित किया गया।',
			decisions: [
				'सड़क निर्माण को मंजूरी दें',
				'स्वास्थ्य शिविर के लिए 50,000 आवंटित करें',
			],
			nextMeeting: '2024-02-15',
		},
		{
			id: 2,
			title: 'कृषि सहकारी बैठक',
			date: '2024-01-08',
			time: '2:00 PM',
			location: 'गाँव कार्यालय',
			attendees: ['किसान A', 'किसान B', 'किसान C'],
			agenda: ['फसल योजना', 'सब्सिडी वितरण', 'बाजार दरें'],
			discussion:
				'वर्तमान बाजार दरों की समीक्षा की गई और अगले मौसम के लिए फसल चक्र की योजना बनाई गई।',
			decisions: [
				'सब्सिडी पंजीकरण शुरू करें',
				'प्रशिक्षण कार्यशाला का आयोजन करें',
			],
			nextMeeting: '2024-02-08',
		},
	];

	return (
		<div className='min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6'>
			<Header />
			<div className='max-w-4xl mx-auto'>
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-10 text-center'>
					<h1 className='text-4xl font-extrabold text-slate-900 tracking-tight mb-3'>
						Village Meetings
					</h1>
					<p className='text-slate-500 text-lg'>
						Stay updated with community discussions and decisions
					</p>
				</motion.div>

				{/* Meetings List */}
				<div className='flex flex-col gap-8'>
					{meetings.map((meeting, index) => (
						<motion.div
							key={meeting.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}>
							<Card className='border-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden'>
								<CardHeader className='flex gap-3 p-6 bg-slate-50/50'>
									<div className='flex flex-col flex-1'>
										<h2 className='text-2xl font-bold text-primary-600'>
											{meeting.title}
										</h2>
										<div className='flex flex-wrap gap-4 mt-2 text-slate-500'>
											<div className='flex items-center gap-1.5 text-small'>
												<Calendar size={16} className='text-primary' />
												{meeting.date} • {meeting.time}
											</div>
											<div className='flex items-center gap-1.5 text-small'>
												<MapPin size={16} className='text-primary' />
												{meeting.location}
											</div>
										</div>
									</div>
									<Button isIconOnly variant='light' color='primary'>
										<ArrowRight size={20} />
									</Button>
								</CardHeader>

								<Divider />

								<CardBody className='p-6 gap-6'>
									{/* Attendees & Agenda */}
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div>
											<div className='flex items-center gap-2 mb-3 text-slate-700 font-semibold'>
												<Users size={18} /> Attendees
											</div>
											<div className='flex flex-wrap gap-1'>
												{meeting.attendees.map((person) => (
													<Chip
														key={person}
														size='sm'
														variant='flat'
														color='default'>
														{person}
													</Chip>
												))}
											</div>
										</div>
										<div>
											<div className='flex items-center gap-2 mb-3 text-slate-700 font-semibold'>
												<ClipboardList size={18} /> Agenda
											</div>
											<div className='flex flex-wrap gap-1'>
												{meeting.agenda.map((item) => (
													<Chip
														key={item}
														size='sm'
														variant='dot'
														color='primary'>
														{item}
													</Chip>
												))}
											</div>
										</div>
									</div>

									{/* Discussion Section */}
									<div className='bg-blue-50/50 p-4 rounded-xl border border-blue-100'>
										<div className='flex items-center gap-2 mb-2 text-blue-700 font-semibold'>
											<MessageCircle size={18} /> Discussion
										</div>
										<p className='text-slate-600 leading-relaxed'>
											{meeting.discussion}
										</p>
									</div>

									{/* Decisions */}
									<div>
										<div className='flex items-center gap-2 mb-3 text-emerald-700 font-semibold'>
											<CheckCircle2 size={18} /> Key Decisions
										</div>
										<ul className='space-y-2'>
											{meeting.decisions.map((decision, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-slate-600'>
													<div className='mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0' />
													{decision}
												</li>
											))}
										</ul>
									</div>
								</CardBody>

								<div className='px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex justify-between items-center'>
									<span className='text-tiny uppercase tracking-wider font-bold text-slate-400'>
										Schedule
									</span>
									<div className='text-small font-medium text-slate-700'>
										Next Meeting:{' '}
										<span className='text-primary'>{meeting.nextMeeting}</span>
									</div>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MeetingsPage;
