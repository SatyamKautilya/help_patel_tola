'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	LayoutDashboard,
	ShieldCheck,
	FileText,
	Users,
	Settings,
	TrendingUp,
	Plus,
	Search,
	Bell,
	ChevronRight,
} from 'lucide-react';
import { Card, CardBody, Button, Chip, Avatar } from '@heroui/react';

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div className='relative min-h-screen bg-[#F8FAFC] text-slate-900 font-sans'>
			{/* 1. VIBRANT AMBIENT BACKGROUND */}
			<div className='fixed inset-0 z-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/40 blur-[120px] rounded-full' />
				<div className='absolute bottom-[10%] left-[-10%] w-[30%] h-[40%] bg-emerald-200/40 blur-[120px] rounded-full' />
				<div className='absolute top-[20%] left-[20%] w-[20%] h-[20%] bg-orange-100/30 blur-[100px] rounded-full' />
			</div>

			<div className='relative z-10 flex h-screen'>
				{/* --- SIDEBAR --- */}
				<aside className='w-20 md:w-72 bg-white/70 backdrop-blur-2xl border-r border-slate-200 flex flex-col p-6'>
					<div className='flex items-center gap-3 mb-12 px-2'>
						<div className='bg-gradient-to-br from-indigo-600 to-blue-500 p-2.5 rounded-2xl shadow-lg shadow-indigo-200'>
							<ShieldCheck size={24} className='text-white' />
						</div>
						<div className='hidden md:block'>
							<p className='font-black text-xl tracking-tighter leading-none'>
								TAMOHAR
							</p>
							<p className='text-[10px] font-bold text-indigo-500 tracking-[0.2em] uppercase mt-1'>
								Admin Suite
							</p>
						</div>
					</div>

					<nav className='flex-1 space-y-2'>
						<SidebarItem
							icon={LayoutDashboard}
							label='Overview'
							active={activeTab === 'overview'}
							onClick={() => setActiveTab('overview')}
							color='indigo'
						/>
						<SidebarItem
							icon={FileText}
							label='Govt Schemes'
							active={activeTab === 'schemes'}
							onClick={() => setActiveTab('schemes')}
							color='blue'
						/>
						<SidebarItem
							icon={Users}
							label='Community'
							active={activeTab === 'users'}
							onClick={() => setActiveTab('users')}
							color='emerald'
						/>
						<SidebarItem
							icon={Settings}
							label='Settings'
							active={activeTab === 'settings'}
							onClick={() => setActiveTab('settings')}
							color='slate'
						/>
					</nav>

					<div className='mt-auto bg-slate-100/50 p-4 rounded-[2rem] border border-slate-200/50'>
						<div className='flex items-center gap-3'>
							<Avatar
								size='sm'
								src='https://i.pravatar.cc/150?u=satyam'
								className='rounded-xl'
							/>
							<div className='hidden md:block'>
								<p className='text-xs font-black'>Satyam K.</p>
								<p className='text-[10px] text-slate-500 font-medium'>
									Super Admin
								</p>
							</div>
						</div>
					</div>
				</aside>

				{/* --- MAIN CONTENT --- */}
				<main className='flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar'>
					{/* Header Nav */}
					<div className='flex items-center justify-between mb-12'>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}>
							<h1 className='text-4xl font-black tracking-tight text-slate-900'>
								Dashboard
							</h1>
							<p className='text-slate-500 font-medium mt-1'>
								Welcome back, let's track the village progress.
							</p>
						</motion.div>

						<div className='flex items-center gap-4'>
							<div className='hidden md:flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm'>
								<Search size={18} className='text-slate-400' />
								<input
									className='bg-transparent border-none outline-none text-sm w-48'
									placeholder='Search records...'
								/>
							</div>
							<Button
								isIconOnly
								variant='flat'
								className='bg-white border border-slate-200 rounded-2xl'>
								<Bell size={20} />
							</Button>
						</div>
					</div>

					{/* Stats Bento Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
						<StatCard
							title='Active Families'
							value='842'
							trend='+4.5%'
							icon={Users}
							bg='bg-indigo-50'
							text='text-indigo-600'
						/>
						<StatCard
							title='Health SOPs'
							value='12'
							trend='Updated'
							icon={ShieldCheck}
							bg='bg-emerald-50'
							text='text-emerald-600'
						/>
						<StatCard
							title='Live Schemes'
							value='34'
							trend='+2 New'
							icon={FileText}
							bg='bg-blue-50'
							text='text-blue-600'
						/>
						<StatCard
							title='Inquiries'
							value='18'
							trend='Unread'
							icon={Bell}
							bg='bg-orange-50'
							text='text-orange-600'
						/>
					</div>

					{/* Content Section */}
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Main Table Card */}
						<Card className='lg:col-span-2 border-none shadow-xl shadow-slate-200/50 rounded-[3rem] bg-white/80 backdrop-blur-md'>
							<CardBody className='p-8'>
								<div className='flex items-center justify-between mb-8'>
									<h3 className='text-xl font-black'>Recent Content</h3>
									<Button
										size='sm'
										variant='light'
										className='font-bold text-indigo-600'
										endContent={<ChevronRight size={16} />}>
										View All
									</Button>
								</div>
								<div className='space-y-4'>
									<ListRow
										name='Ayushman Bharat Update'
										cat='Scheme'
										date='2 hours ago'
										status='active'
									/>
									<ListRow
										name='New Wheat Farming SOP'
										cat='Kheti'
										date='5 hours ago'
										status='active'
									/>
									<ListRow
										name='Admin User Invite'
										cat='Security'
										date='Yesterday'
										status='pending'
									/>
									<ListRow
										name='Dengue Awareness Video'
										cat='Health'
										date='2 days ago'
										status='active'
									/>
								</div>
							</CardBody>
						</Card>

						{/* Action Card */}
						<Card className='border-none bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] shadow-2xl shadow-indigo-200 overflow-hidden'>
							<CardBody className='p-10 flex flex-col justify-between text-white'>
								<div>
									<h3 className='text-2xl font-black leading-tight'>
										Add New
										<br />
										Village Content
									</h3>
									<p className='text-indigo-100 text-sm mt-4 font-medium opacity-80'>
										Upload new schemes, health protocols or farming guides to
										the portal.
									</p>
								</div>
								<Button className='bg-white text-indigo-600 font-black rounded-2xl py-6 mt-8 shadow-xl'>
									<Plus size={20} className='mr-2' /> Create Now
								</Button>
							</CardBody>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}

/* --- UI HELPERS --- */

function SidebarItem({ icon: Icon, label, active, onClick, color }) {
	const activeStyles = {
		indigo: 'bg-indigo-50 text-indigo-600 shadow-sm',
		blue: 'bg-blue-50 text-blue-600 shadow-sm',
		emerald: 'bg-emerald-50 text-emerald-600 shadow-sm',
		slate: 'bg-slate-100 text-slate-900 shadow-sm',
	};

	return (
		<button
			onClick={onClick}
			className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all duration-300 ${
				active
					? activeStyles[color]
					: 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
			}`}>
			<Icon size={22} strokeWidth={active ? 2.5 : 2} />
			<span className='hidden md:block font-bold text-sm tracking-tight'>
				{label}
			</span>
		</button>
	);
}

function StatCard({ title, value, trend, icon: Icon, bg, text }) {
	return (
		<motion.div
			whileHover={{ y: -5 }}
			transition={{ type: 'spring', stiffness: 300 }}>
			<Card
				className={`border-none shadow-lg shadow-slate-100 rounded-[2.5rem] ${bg}`}>
				<CardBody className='p-7'>
					<div className='flex justify-between items-start mb-6'>
						<div className={`p-3 rounded-2xl bg-white shadow-sm ${text}`}>
							<Icon size={20} strokeWidth={2.5} />
						</div>
						<Chip
							size='sm'
							className='bg-white/50 text-[10px] font-black uppercase border-none'>
							{trend}
						</Chip>
					</div>
					<p className='text-slate-500 text-xs font-bold uppercase tracking-widest'>
						{title}
					</p>
					<h3 className='text-3xl font-black mt-1 text-slate-900'>{value}</h3>
				</CardBody>
			</Card>
		</motion.div>
	);
}

function ListRow({ name, cat, date, status }) {
	return (
		<div className='group flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100'>
			<div className='flex items-center gap-4'>
				<div className='w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-sm'>
					{cat === 'Scheme' ? '📑' : cat === 'Kheti' ? '🌾' : '🛡️'}
				</div>
				<div>
					<p className='font-bold text-slate-900'>{name}</p>
					<p className='text-xs text-slate-400 font-medium'>
						{cat} • {date}
					</p>
				</div>
			</div>
			<Chip
				size='sm'
				variant='dot'
				color={status === 'active' ? 'success' : 'warning'}
				className='border-none font-bold capitalize'>
				{status}
			</Chip>
		</div>
	);
}
