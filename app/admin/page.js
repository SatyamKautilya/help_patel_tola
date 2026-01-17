'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

import RequestList from './RequestList';
import NotificationSender from './NotificationSender';
import StatusPage from './StatusPage';
import ContentPage from './ContentPage';

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

const ALL_TABS = [
	{ key: 'status', label: 'System Status', permission: 'view_stats' },
	{ key: 'content', label: 'Content Manager', permission: 'edit_content' },
	{
		key: 'notification',
		label: 'नोटिफ़िकेशन',
		permission: 'send_notifications',
	},
	{ key: 'approval', label: 'Requests', permission: 'manage_approvals' },
];

const AdminDashboard = () => {
	const thisUser = useSelector((state) => state.appContext.user);
	const userGroups = thisUser?.userGroups || [];

	/** ✅ Tabs are DERIVED */
	const tabs = useMemo(() => {
		return ALL_TABS.filter((tab) => hasAccess(userGroups, tab.permission));
	}, [userGroups]);

	/** ✅ Single source of truth */
	const [activeTab, setActiveTab] = useState(null);

	/** ✅ Auto-select first allowed tab */
	useEffect(() => {
		if (tabs.length > 0) {
			setActiveTab((prev) =>
				tabs.some((t) => t.key === prev) ? prev : tabs[0].key,
			);
		}
	}, [tabs]);

	if (tabs.length === 0) {
		return (
			<div className='min-h-screen flex items-center justify-center text-white'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold mb-4'>Access Denied</h1>
					<p className='text-slate-400'>
						You don't have permission to access the admin dashboard.
					</p>
				</div>
			</div>
		);
	}

	const activeIndex = tabs.findIndex((t) => t.key === activeTab);
	const currentTab = tabs[activeIndex];

	const goPrev = () => {
		if (activeIndex > 0) setActiveTab(tabs[activeIndex - 1].key);
	};

	const goNext = () => {
		if (activeIndex < tabs.length - 1) setActiveTab(tabs[activeIndex + 1].key);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-6 flex flex-col items-center'>
			{/* Header */}
			<h1 className='text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
				Tamohar Control Center
			</h1>
			<p className='text-slate-400 mb-10 text-center'>
				Manage your platform with precision and keep your community thriving
			</p>

			{/* Desktop Tabs */}
			{tabs.length > 1 && (
				<div className='hidden sm:flex gap-3 mb-10 bg-white/5 p-1 rounded-full border border-white/10'>
					{tabs.map((tab) => (
						<TabBtn
							key={tab.key}
							label={tab.label}
							active={activeTab === tab.key}
							onClick={() => setActiveTab(tab.key)}
						/>
					))}
				</div>
			)}

			{/* Mobile Tabs */}
			{tabs.length > 1 && (
				<div className='sm:hidden flex items-center gap-3 mb-8'>
					<button onClick={goPrev} disabled={activeIndex === 0}>
						<ArrowRight className='rotate-180' />
					</button>
					<span>{currentTab.label}</span>
					<button onClick={goNext} disabled={activeIndex === tabs.length - 1}>
						<ArrowRight />
					</button>
				</div>
			)}

			{/* Content */}
			<motion.div
				key={activeTab}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className='w-full max-w-4xl'>
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
		className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
			active
				? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
				: 'text-slate-400 hover:text-white'
		}`}>
		{label}
	</motion.button>
);

export default AdminDashboard;
