'use client';

import { useState, useMemo } from 'react';
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
	Check,
	X,
	MessageSquare,
	Sprout,
	BookOpen,
	Crown,
	Menu,
} from 'lucide-react';
import {
	Card,
	CardBody,
	Button,
	Chip,
	Avatar,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from '@heroui/react';
import { useSelector } from 'react-redux';

export default function TamoharAdminPortal() {
	const [adminUser] = useState({
		name: 'Satyam Kautilya',
		role: 'super_admin',
		avatar: 'https://i.pravatar.cc/150?u=satyam',
	});

	const appContext = useSelector((state) => state.appContext.appContext);
	const [view, setView] = useState('dashboard');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const sidebarConfig = useMemo(
		() => [
			{
				id: 'dashboard',
				label: 'Home',
				icon: LayoutDashboard,
				roles: [
					'super_admin',
					'health_admin',
					'farming_admin',
					'community_admin',
				],
			},
			{
				id: 'sops',
				label: 'Health',
				icon: BookOpen,
				roles: ['super_admin', 'health_admin'],
			},
			{
				id: 'crops',
				label: 'Farming',
				icon: Sprout,
				roles: ['super_admin', 'farming_admin'],
			},
			{
				id: 'success-stories',
				label: 'Stories',
				icon: TrendingUp,
				roles: ['super_admin', 'community_admin'],
			},
			{
				id: 'requests',
				label: 'Requests',
				icon: Check,
				roles: ['super_admin', 'community_admin'],
			},
			{
				id: 'users',
				label: 'Users',
				icon: Users,
				roles: ['super_admin', 'community_admin'],
			},
		],
		[],
	);

	const filteredNav = sidebarConfig.filter(
		(item) => item.roles && item.roles.includes(adminUser.role),
	);

	return (
		<div className='relative min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 pb-24 md:pb-0'>
			{/* Ambient Background */}
			<div className='fixed inset-0 z-0 pointer-events-none'>
				<div className='absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-200/20 blur-[100px] rounded-full' />
				<div className='absolute bottom-0 left-[-10%] w-[60%] h-[40%] bg-emerald-200/20 blur-[100px] rounded-full' />
			</div>

			{/* --- MOBILE TOP BAR --- */}
			<header className='md:hidden sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 px-5 py-3 flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<div className='bg-indigo-600 p-1.5 rounded-lg text-white'>
						<Crown size={16} />
					</div>
					<span className='font-black text-sm tracking-tighter'>
						TAMOHAR HQ
					</span>
				</div>
				<Avatar size='sm' src={adminUser.avatar} isBordered color='primary' />
			</header>

			<div className='relative z-10 flex h-full'>
				{/* --- DESKTOP SIDEBAR --- */}
				<aside className='hidden md:flex w-64 bg-white/80 backdrop-blur-2xl border-r border-slate-200 flex-col p-4 h-screen sticky top-0'>
					<div className='flex items-center gap-3 mb-10 px-2 pt-4'>
						<div className='bg-indigo-600 p-2 rounded-xl shadow-lg text-white'>
							<Crown size={20} />
						</div>
						<div>
							<span className='font-black text-sm tracking-tighter block uppercase'>
								{appContext?.name || 'TAMOHAR HQ'}
							</span>
							<span className='text-[10px] font-bold text-indigo-500 uppercase tracking-widest'>
								{adminUser.role}
							</span>
						</div>
					</div>
					<nav className='flex-1 space-y-1'>
						{filteredNav.map((item) => (
							<NavItem
								key={item.id}
								icon={item.icon}
								label={item.label}
								active={view === item.id}
								onClick={() => setView(item.id)}
							/>
						))}
					</nav>
				</aside>

				{/* --- MAIN WORKSPACE --- */}
				<main className='flex-1 p-5 md:p-10'>
					<AnimatePresence mode='wait'>
						{view === 'dashboard' && <DashboardOverview setView={setView} />}
						{view === 'requests' && <RequestInbox />}
						{view === 'users' && <UserManagement />}
						{['sops', 'crops', 'success-stories'].includes(view) && (
							<ContentManager type={view} onBack={() => setView('dashboard')} />
						)}
					</AnimatePresence>
				</main>
			</div>

			{/* --- MOBILE BOTTOM NAVIGATION --- */}
			<nav className='md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl border-t border-slate-200 px-2 py-3 z-50 flex justify-around items-center'>
				{filteredNav.slice(0, 5).map((item) => (
					<button
						key={item.id}
						onClick={() => setView(item.id)}
						className={`flex flex-col items-center gap-1 transition-all ${
							view === item.id ? 'text-indigo-600 scale-110' : 'text-slate-400'
						}`}>
						<item.icon size={20} strokeWidth={view === item.id ? 2.5 : 2} />
						<span className='text-[10px] font-bold'>{item.label}</span>
					</button>
				))}
			</nav>
		</div>
	);
}

/* --- MOBILE OPTIMIZED STATS --- */
function DashboardOverview({ setView }) {
	const appContext = useSelector((state) => state.appContext.appContext);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='space-y-6'>
			<div>
				<h1 className='text-2xl font-black'>{`Hello, ${
					appContext?.name || 'Admin'
				}!`}</h1>
				<p className='text-slate-500 text-sm'>
					Here is what's happening today.
				</p>
			</div>

			<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
				<StatCard title='Users' value='1.4k' color='indigo' icon={Users} />
				<StatCard
					title='Requests'
					value='07'
					color='orange'
					icon={Check}
					onClick={() => setView('requests')}
				/>
				<StatCard
					title='Feedback'
					value='12'
					color='emerald'
					icon={MessageSquare}
					className='col-span-2 md:col-span-1'
				/>
			</div>

			<div className='space-y-4'>
				<h3 className='font-black text-lg'>Latest Feedback</h3>
				{[1, 2, 3].map((i) => (
					<Card key={i} className='rounded-3xl border-none shadow-sm'>
						<CardBody className='p-4 flex flex-row gap-4 items-center'>
							<div className='bg-indigo-100 p-2 rounded-xl text-indigo-600'>
								<MessageSquare size={18} />
							</div>
							<div className='flex-1'>
								<p className='text-sm font-bold'>User_{i}42</p>
								<p className='text-xs text-slate-500 line-clamp-1'>
									"Helpful farming guide for the village..."
								</p>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</motion.div>
	);
}

/* --- MOBILE OPTIMIZED REQUESTS (CARD STACK) --- */
function RequestInbox() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='space-y-6'>
			<h2 className='text-2xl font-black'>Group Requests</h2>
			<div className='space-y-4'>
				{[1, 2].map((i) => (
					<Card key={i} className='rounded-[2rem] border-none shadow-md'>
						<CardBody className='p-5'>
							<div className='flex justify-between items-start mb-4'>
								<div className='flex items-center gap-3'>
									<Avatar size='sm' />
									<div>
										<p className='font-bold text-sm'>Rohan Sharma</p>
										<Chip
											size='sm'
											variant='flat'
											color='warning'
											className='text-[10px] font-black uppercase'>
											Farming Expert
										</Chip>
									</div>
								</div>
							</div>
							<p className='text-xs text-slate-500 italic mb-5'>
								"I have 10 years experience in organic farming and want to
								contribute."
							</p>
							<div className='flex gap-2'>
								<Button
									className='flex-1 rounded-xl font-bold bg-emerald-500 text-white'
									size='sm'
									startContent={<Check size={16} />}>
									Approve
								</Button>
								<Button
									className='flex-1 rounded-xl font-bold bg-slate-100 text-slate-600'
									size='sm'>
									Reject
								</Button>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</motion.div>
	);
}

/* --- REUSABLE HELPERS --- */
function NavItem({ icon: Icon, label, active, onClick }) {
	return (
		<button
			onClick={onClick}
			className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
				active
					? 'bg-indigo-50 text-indigo-600 shadow-sm'
					: 'text-slate-400 hover:bg-slate-50'
			}`}>
			<Icon size={20} strokeWidth={active ? 2.5 : 2} />
			<span className='font-bold text-sm'>{label}</span>
		</button>
	);
}

function StatCard({ title, value, icon: Icon, color, onClick, className }) {
	const colors = {
		indigo: 'bg-indigo-50 text-indigo-600',
		orange: 'bg-orange-50 text-orange-600',
		emerald: 'bg-emerald-50 text-emerald-600',
	};
	return (
		<Card
			isPressable={!!onClick}
			onClick={onClick}
			className={`border-none shadow-sm rounded-3xl ${className}`}>
			<CardBody className='p-5 flex flex-col items-center gap-2'>
				<div className={`p-3 rounded-2xl ${colors[color]}`}>
					<Icon size={20} />
				</div>
				<div className='text-center'>
					<p className='text-[10px] font-black uppercase text-slate-400 tracking-widest'>
						{title}
					</p>
					<p className='text-xl font-black'>{value}</p>
				</div>
			</CardBody>
		</Card>
	);
}

function ContentManager({ type, onBack }) {
	return (
		<div className='space-y-6'>
			<Button variant='light' size='sm' onClick={onBack}>
				← Back
			</Button>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-black capitalize'>{type}</h2>
				<Button isIconOnly color='primary' className='rounded-xl'>
					<Plus />
				</Button>
			</div>
			<div className='p-10 border-2 border-dashed rounded-[2rem] text-center text-slate-400 italic'>
				Manage {type} content list here.
			</div>
		</div>
	);
}

function UserManagement() {
	return (
		<div className='space-y-6'>
			<h2 className='text-2xl font-black'>Users</h2>
			<div className='p-10 border-2 border-dashed rounded-[2rem] text-center text-slate-400 italic'>
				Table converted to stackable cards for mobile.
			</div>
		</div>
	);
}
