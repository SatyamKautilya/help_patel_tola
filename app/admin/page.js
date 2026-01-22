'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import StatusPage from './sections/StatusPage';
import ContentPage from './sections/ContentPage';
import NotificationSender from './sections/NotificationSender';
import RequestList from './sections/RequestList';

const PERMISSIONS = {
	view_stats: ['super_admin'],
	manage_approvals: ['super_admin', 'approver'],
	edit_content: ['super_admin', 'content_editor'],
	send_notifications: ['super_admin', 'notification_sender'],
};

const hasAccess = (userGroups, action) => {
	const allowedGroups = PERMISSIONS[action] || [];
	return userGroups.some((group) => allowedGroups.includes(group));
};

const AdminDashboard = () => {
	const thisUser = useSelector((state) => state.appContext.user);
	//const userGroups = thisUser?.userGroups || [];
	const userGroups = ['super_admin'];

	/** ✅ tabs are DERIVED, not state */
	const tabs = useMemo(() => {
		return [
			{ key: 'status', label: 'System Status', permission: 'view_stats' },
			{ key: 'content', label: 'Content Manager', permission: 'edit_content' },
			{
				key: 'notification',
				label: 'नोटिफ़िकेशन',
				permission: 'send_notifications',
			},
			{ key: 'approval', label: 'Requests', permission: 'manage_approvals' },
		].filter((tab) => hasAccess(userGroups, tab.permission));
	}, [userGroups]);

	/** ✅ single source of truth */
	const [activeTab, setActiveTab] = useState('');

	/** ✅ ensure valid active tab */
	useEffect(() => {
		if (tabs.length === 0) return;

		setActiveTab((prev) =>
			tabs.some((t) => t.key === prev) ? prev : tabs[0].key,
		);
	}, [tabs]);

	/** ✅ derive index instead of storing */
	const tabIndex = tabs.findIndex((t) => t.key === activeTab);
	const currentTab = tabs[tabIndex];

	const handlePrevTab = () => {
		if (tabIndex > 0) {
			setActiveTab(tabs[tabIndex - 1].key);
		}
	};

	const handleNextTab = () => {
		if (tabIndex < tabs.length - 1) {
			setActiveTab(tabs[tabIndex + 1].key);
		}
	};

	if (tabs.length === 0) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center'>
					<h1 className='text-3xl font-bold mb-4'>Access Denied</h1>
					<p className='text-slate-400'>
						You don't have permission to access the admin dashboard.
					</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-4 sm:p-6 md:p-10  pt-6 lg:pt-0 pb-1 flex flex-col items-center'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-2 lg:mb-2 pt-4 text-center'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2'>
					Tamohar Control Center
				</h1>
			</motion.div>

			{/* Tab Navigation */}
			{tabs.length > 1 && (
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
			)}

			{/* Mobile Tab Navigation */}
			{tabs.length > 1 && (
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
						<p className='text-sm font-semibold'>{currentTab?.label}</p>
					</div>
					<button
						onClick={handleNextTab}
						disabled={tabIndex === tabs.length - 1}
						className='p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all'>
						<ArrowRight size={20} />
					</button>
				</motion.div>
			)}

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
