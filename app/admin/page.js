'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import StatusPage from './sections/StatusPage';
import ContentPage from './sections/ContentPage';
import NotificationSender from './sections/NotificationSender';
import RequestList from './sections/RequestList';
import AccessControl from './sections/AccessControl';
import { getRolesForVillage, hasPermission } from '@/lib/roles';

const AdminDashboard = () => {
	const router = useRouter();
	const legacyUser = useSelector((state) => state.appContext.user);
	const [authUser, setAuthUser] = useState(null);
	const [authReady, setAuthReady] = useState(false);
	const [selectedVillage, setSelectedVillage] = useState('');
	const [activeTab, setActiveTab] = useState('');

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch('/api/auth/me', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					setAuthUser(data?.user || null);
				}
			} catch {}
			setAuthReady(true);
		};
		checkAuth();
	}, []);

	const currentUser = authUser || (legacyUser?.isAdmin ? legacyUser : null);
	const isSuperAdmin =
		!!currentUser?.isAdmin ||
		(Array.isArray(currentUser?.userGroups) &&
			currentUser.userGroups.includes('super_admin'));

	const allVillageCodes = useMemo(() => {
		const tagged = Array.isArray(currentUser?.taggedVillage)
			? currentUser.taggedVillage
			: [];
		const roleVillages = Array.isArray(currentUser?.villageRoles)
			? currentUser.villageRoles.map((entry) => entry.villageCode)
			: [];
		return Array.from(new Set([...tagged, ...roleVillages].filter(Boolean)));
	}, [currentUser]);

	useEffect(() => {
		if (!selectedVillage && allVillageCodes.length) {
			setSelectedVillage(allVillageCodes[0]);
		}
	}, [allVillageCodes, selectedVillage]);

	const roles = useMemo(
		() => getRolesForVillage(currentUser, selectedVillage),
		[currentUser, selectedVillage],
	);

	const tabs = useMemo(() => {
		return [
			{ key: 'status', label: 'System Status', permission: 'view_stats' },
			{ key: 'content', label: 'Content Manager', permission: 'edit_content' },
			{
				key: 'notification',
				label: 'Notification',
				permission: 'send_notifications',
			},
			{ key: 'approval', label: 'Requests', permission: 'manage_approvals' },
			{
				key: 'onboarding',
				label: 'SHG Onboarding',
				permission: 'onboard_shgs',
			},
			{
				key: 'access',
				label: 'Access Control',
				permission: 'manage_access',
			},
		].filter((tab) => hasPermission(roles, tab.permission));
	}, [roles]);

	useEffect(() => {
		if (tabs.length === 0) return;
		setActiveTab((prev) =>
			tabs.some((tab) => tab.key === prev) ? prev : tabs[0].key,
		);
	}, [tabs]);

	useEffect(() => {
		if (!authReady) return;
		if (authUser || legacyUser?.isAdmin) return;
		router.replace('/admin/login');
	}, [authReady, authUser, legacyUser, router]);

	const tabIndex = tabs.findIndex((tab) => tab.key === activeTab);
	const currentTab = tabs[tabIndex];

	const handlePrevTab = () => {
		if (tabIndex > 0) setActiveTab(tabs[tabIndex - 1].key);
	};
	const handleNextTab = () => {
		if (tabIndex < tabs.length - 1) setActiveTab(tabs[tabIndex + 1].key);
	};

	const onLogout = async () => {
		await fetch('/api/auth/logout', { method: 'POST' });
		router.push('/admin/login');
		router.refresh();
	};

	if (!currentUser) {
		return (
			<div className='min-h-screen bg-slate-950 text-white flex items-center justify-center'>
				<p>Checking session...</p>
			</div>
		);
	}

	if (tabs.length === 0) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center'>
					<h1 className='text-3xl font-bold mb-4'>Access Denied</h1>
					<p className='text-slate-400'>
						No permissions for this village selection.
					</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-4 sm:p-6 md:p-10 pt-6 lg:pt-0 pb-1 flex flex-col items-center'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-4 pt-4 text-center'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2'>
					Tamohar Control Center
				</h1>
				<div className='flex flex-wrap justify-center gap-2 mt-3'>
					{allVillageCodes.length ? (
						<select
							value={selectedVillage}
							onChange={(e) => setSelectedVillage(e.target.value)}
							className='rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-sm'>
							{allVillageCodes.map((code) => (
								<option key={code} value={code}>
									{code}
								</option>
							))}
						</select>
					) : null}
					{authUser ? (
						<button
							onClick={onLogout}
							className='rounded-lg bg-red-600/20 border border-red-400/30 px-3 py-2 text-sm'>
							Logout
						</button>
					) : null}
				</div>
			</motion.div>

			{tabs.length > 1 ? (
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
			) : null}

			{tabs.length > 1 ? (
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
			) : null}

			<motion.div
				key={activeTab}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.3 }}
				className='w-full max-w-4xl px-2 sm:px-0'>
				{activeTab === 'status' ? <StatusPage /> : null}
				{activeTab === 'content' ? <ContentPage /> : null}
				{activeTab === 'notification' ? (
					<NotificationSender
						selectedVillage={selectedVillage}
						isSuperAdmin={isSuperAdmin}
					/>
				) : null}
				{activeTab === 'approval' ? <RequestList /> : null}
				{activeTab === 'onboarding' ? (
					<div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 space-y-4'>
						<h3 className='text-2xl font-bold text-white'>SHG Onboarding</h3>
						<p className='text-slate-300 text-sm'>
							Open dedicated full-screen onboarding page for better laptop workflow.
						</p>
						<button
							onClick={() => router.push('/shg/onboarding')}
							className='px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold'>
							Open SHG Onboarding Workspace
						</button>
					</div>
				) : null}
				{activeTab === 'access' ? <AccessControl /> : null}
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
