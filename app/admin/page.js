'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Users,
	MessageSquare,
	Globe,
	Plus,
	Layout,
	FileText,
	Type,
	Image as LucideImage,
	TrendingUp,
	ArrowRight,
} from 'lucide-react';

const PERMISSIONS = {
	view_stats: ['super_admin'],
	manage_approvals: ['super_admin', 'approver'],
	edit_content: ['super_admin', 'content_editor'],
	send_notifications: ['super_admin', 'notification_sender'],
};

const hasAccess = (role, action) => PERMISSIONS[action]?.includes(role);

const AdminDashboard = () => {
	const userRole = 'super_admin';
	const [activeTab, setActiveTab] = useState('status');

	const [tabIndex, setTabIndex] = useState(0);

	const tabs = [
		{ key: 'status', label: 'System Status', permission: 'view_stats' },
		{ key: 'content', label: 'Content Manager', permission: 'edit_content' },
		{
			key: 'notification',
			label: 'नोटिफ़िकेशन',
			permission: 'send_notifications',
		},
		{ key: 'approval', label: 'अनुरोध', permission: 'manage_approvals' },
	].filter((tab) => hasAccess(userRole, tab.permission));

	const currentTab = tabs[tabIndex];

	const handlePrevTab = () => {
		setTabIndex((prev) => Math.max(0, prev - 1));
	};

	const handleNextTab = () => {
		setTabIndex((prev) => Math.min(tabs.length - 1, prev + 1));
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-4 sm:p-6 md:p-10 flex flex-col items-center'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-8 sm:mb-12 text-center'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2'>
					Admin Control Center
				</h1>
				<p className='text-xs sm:text-sm md:text-base text-slate-400'>
					Manage your platform with precision
				</p>
			</motion.div>

			{/* Tab Navigation */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='hidden sm:flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 bg-white/5 backdrop-blur-xl p-1 rounded-full w-fit border border-white/10 justify-center'>
				{tabs.map((tab) => (
					<TabBtn
						key={tab.key}
						active={activeTab === tab.key}
						onClick={() => setActiveTab(tab.key)}
						label={tab.label}
					/>
				))}
			</motion.div>

			{/* Mobile Tab Navigation */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='sm:hidden flex items-center gap-3 mb-8 w-full justify-center'>
				<button
					onClick={handlePrevTab}
					disabled={tabIndex === 0}
					className='p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all'>
					<ArrowRight size={20} className='rotate-180' />
				</button>
				<div className='bg-white/5 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/10 text-center min-w-[150px]'>
					<p className='text-sm font-semibold'>{currentTab.label}</p>
				</div>
				<button
					onClick={handleNextTab}
					disabled={tabIndex === tabs.length - 1}
					className='p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all'>
					<ArrowRight size={20} />
				</button>
			</motion.div>

			<motion.div
				key={activeTab}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.3 }}
				className='w-full max-w-4xl px-2 sm:px-0'>
				{activeTab === 'status' && <StatusPage />}
				{activeTab === 'content' && <ContentPage />}
				{activeTab === 'notification' && <NotificationSender />}
				{activeTab === 'approval' && <RequestList />}
			</motion.div>
		</div>
	);
};

const StatusPage = () => {
	const stats = [
		{
			label: 'Total Users',
			value: '24,502',
			icon: <Globe />,
			gradient: 'from-blue-500 to-cyan-500',
			trend: '+12.5%',
		},
		{
			label: 'Logged In Today',
			value: '1,840',
			icon: <Users />,
			gradient: 'from-emerald-500 to-teal-500',
			trend: '+8.2%',
		},
		{
			label: 'User Feedbacks',
			value: '128',
			icon: <MessageSquare />,
			gradient: 'from-purple-500 to-pink-500',
			trend: '+23.1%',
		},
	];

	return (
		<div className='space-y-8'>
			{/* Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{stats.map((s, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className='group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10'>
						{/* Gradient Background */}
						<div
							className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
						/>

						<div className='relative z-10'>
							<div className='flex justify-between items-start mb-4'>
								<div
									className={`p-3 bg-gradient-to-br ${s.gradient} rounded-xl text-white shadow-lg`}>
									{s.icon}
								</div>
								<div className='flex items-center gap-1 text-emerald-400 text-sm font-semibold'>
									<TrendingUp size={14} />
									{s.trend}
								</div>
							</div>
							<p className='text-slate-400 text-sm mb-1'>{s.label}</p>
							<h2 className='text-4xl font-bold'>{s.value}</h2>
						</div>
					</motion.div>
				))}
			</div>

			{/* Recent Feedback */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
				<div className='flex items-center gap-2 mb-6'>
					<MessageSquare className='text-purple-400' size={24} />
					<h3 className='text-2xl font-bold'>Recent Feedback</h3>
				</div>
				<div className='space-y-3'>
					{[1, 2].map((i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 + i * 0.1 }}
							className='p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl text-sm text-slate-300 hover:border-purple-500/40 transition-all group cursor-pointer'>
							<p className='group-hover:text-white transition-colors'>
								"The new Tamohar interface is very smooth, but I'd like more
								dark mode options."
							</p>
							<p className='text-blue-400 mt-3 text-xs font-mono flex items-center gap-2'>
								<span className='w-2 h-2 bg-blue-400 rounded-full' />
								User_9281
							</p>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

const ContentPage = () => {
	const sections = [
		{
			id: 'hero',
			title: 'Hero Section',
			icon: <Layout />,
			desc: 'Main landing page text and banners',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			id: 'about',
			title: 'About Us',
			icon: <FileText />,
			desc: 'Company mission and vision content',
			gradient: 'from-emerald-500 to-teal-500',
		},
		{
			id: 'features',
			title: 'Features List',
			icon: <Type />,
			desc: 'Add or edit service offerings',
			gradient: 'from-purple-500 to-pink-500',
		},
		{
			id: 'gallery',
			title: 'Media Gallery',
			icon: <LucideImage />,
			desc: 'Upload images for the showcase',
			gradient: 'from-orange-500 to-red-500',
		},
	];

	const handleAddContent = (id) => {
		alert(`Opening Editor for: ${id}`);
	};

	return (
		<div className='space-y-8'>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-8'>
				<h1 className='text-4xl font-bold mb-2'>Content Canvas</h1>
				<p className='text-slate-400 text-lg'>
					Select a section to modify Tamohar live content.
				</p>
			</motion.div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{sections.map((section, idx) => (
					<motion.div
						key={section.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: idx * 0.1 }}
						className='group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 cursor-pointer'>
						{/* Gradient overlay */}
						<div
							className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
						/>

						<div className='relative z-10 flex items-center justify-between'>
							<div className='flex items-center gap-4'>
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className={`p-4 bg-gradient-to-br ${section.gradient} rounded-xl text-white shadow-lg`}>
									{section.icon}
								</motion.div>
								<div>
									<h4 className='font-bold text-lg group-hover:text-white transition-colors'>
										{section.title}
									</h4>
									<p className='text-xs text-slate-500 group-hover:text-slate-400 transition-colors'>
										{section.desc}
									</p>
								</div>
							</div>
							<motion.button
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => handleAddContent(section.id)}
								className='p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 border border-white/10 rounded-xl transition-all duration-300 text-white'>
								<Plus size={20} />
							</motion.button>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

const NotificationSender = () => {
	return (
		<div className='flex justify-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className='bg-gradient-to-br max-w-xl from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
				<h3 className='text-2xl font-bold mb-4'>Send Notification</h3>
				<div className='space-y-4'>
					<input
						type='text'
						placeholder='Notification Title'
						className='w-full p-2 rounded border border-white/20 bg-transparent text-white focus:outline-none'
					/>
					<textarea
						placeholder='Notification Message'
						className='w-full p-2 rounded border border-white/20 bg-transparent text-white focus:outline-none'
						rows='4'
					/>
					<button className='w-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded transition-all duration-300 hover:shadow-lg'>
						Send Notification
					</button>
				</div>
			</motion.div>
		</div>
	);
};

const RequestList = () => {
	const [requests, setRequests] = useState([
		{ id: 1, village: 'Patel Tola', name: 'Ram' },
		{ id: 2, village: 'Kumar Nagar', name: 'Kala prasad' },
		{ id: 3, village: 'Singh Vihar', name: 'Daku' },
	]);

	const handleApprove = (id) => {
		setRequests(
			requests.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)),
		);
	};

	const handleReject = (id) => {
		setRequests(
			requests.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)),
		);
	};

	return (
		<div className='flex justify-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='bg-gradient-to-br w-full lg:w-[70%] from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8'>
				<h3 className='text-2xl font-bold mb-6'>Pending Requests</h3>
				<div className='space-y-3'>
					{requests.map((req) => (
						<motion.div
							key={req.id}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							className='p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-xl flex items-center justify-between'>
							<span className='font-semibold text-white'>{req.village}</span>
							<span className='font-semibold text-white'>{req.name}</span>
							<div className='flex gap-2'>
								<button
									onClick={() => handleApprove(req.id)}
									className='px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-semibold transition-all'>
									Approve
								</button>
								<button
									onClick={() => handleReject(req.id)}
									className='px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-lg text-red-400 text-sm font-semibold transition-all'>
									Reject
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

const TabBtn = ({ active, onClick, label }) => (
	<motion.button
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		onClick={onClick}
		className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
			active
				? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
				: 'text-slate-400 hover:text-white hover:bg-white/5'
		}`}>
		{label}
	</motion.button>
);

export default AdminDashboard;
