import { useEffect, useMemo, useRef, useState } from 'react';
import { ROLE_OPTIONS } from '@/lib/roles';

const emptyRole = { villageCode: '', role: '' };

export default function AccessControl() {
	const [users, setUsers] = useState([]);
	const [villages, setVillages] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [showResults, setShowResults] = useState(false);
	const searchRef = useRef(null);
	const [form, setForm] = useState({
		id: '',
		name: '',
		mobileNumber: '',
		password: '',
		isAdmin: false,
		userGroups: [],
		villageRoles: [emptyRole],
	});
	const [statusText, setStatusText] = useState('');
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const loadData = async () => {
		setLoading(true);
		setStatusText('');
		try {
			const res = await fetch('/api/admin/users');
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || 'Failed to load users');
			setUsers(Array.isArray(data?.users) ? data.users : []);
			setVillages(Array.isArray(data?.villages) ? data.villages : []);
		} catch (error) {
			setStatusText(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (!selectedId) return;
		const user = users.find((item) => item.id === selectedId);
		if (!user) return;
		setForm({
			id: user.id || '',
			name: user.name || '',
			mobileNumber: user.mobileNumber || '',
			password: '',
			isAdmin: !!user.isAdmin,
			userGroups: Array.isArray(user.userGroups) ? user.userGroups : [],
			villageRoles:
				Array.isArray(user.villageRoles) && user.villageRoles.length
					? user.villageRoles
					: [emptyRole],
		});
	}, [selectedId, users]);

	const filteredUsers = useMemo(() => {
		const q = searchQuery.trim();
		if (!q) return [];
		return users.filter(
			(u) =>
				(u.mobileNumber && u.mobileNumber.includes(q)) ||
				(u.name && u.name.toLowerCase().includes(q.toLowerCase())),
		);
	}, [searchQuery, users]);

	// Close results dropdown on outside click
	useEffect(() => {
		const handler = (e) => {
			if (searchRef.current && !searchRef.current.contains(e.target)) {
				setShowResults(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	const selectUser = (user) => {
		setSelectedId(user.id);
		setSearchQuery(user.mobileNumber || user.name || '');
		setShowResults(false);
	};

	const villageOptions = useMemo(
		() => villages.map((v) => ({ code: v.villageCode, name: v.villageName })),
		[villages],
	);

	const onChangeRole = (index, key, value) => {
		setForm((prev) => {
			const next = [...prev.villageRoles];
			next[index] = { ...next[index], [key]: value };
			return { ...prev, villageRoles: next };
		});
	};

	const onSave = async () => {
		setSaving(true);
		setStatusText('');
		try {
			const res = await fetch('/api/admin/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || 'Failed to save');
			setStatusText('Saved successfully');
			setForm((prev) => ({ ...prev, password: '' }));
			await loadData();
		} catch (error) {
			setStatusText(error.message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className='bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6'>
			<h3 className='text-xl font-bold mb-4'>Village Role Access</h3>
			{loading ? <p className='text-slate-300'>Loading...</p> : null}
			{statusText ? (
				<p
					className={`text-sm mb-4 ${
						statusText.includes('success')
							? 'text-emerald-400'
							: 'text-rose-400'
					}`}>
					{statusText}
				</p>
			) : null}

			{/* ── Search Bar ── */}
			<div className='mb-5'>
				<label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>
					Search user by mobile number or name
				</label>
				<div className='relative' ref={searchRef}>
					<input
						placeholder='Type mobile number or name...'
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setShowResults(true);
							if (!e.target.value.trim()) {
								setSelectedId('');
								setForm({
									id: '',
									name: '',
									mobileNumber: '',
									password: '',
									isAdmin: false,
									userGroups: [],
									villageRoles: [emptyRole],
								});
							}
						}}
						onFocus={() => searchQuery.trim() && setShowResults(true)}
						className='w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm'
					/>
					{showResults && filteredUsers.length > 0 && (
						<div className='absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-slate-800 border border-white/10 rounded-lg shadow-xl'>
							{filteredUsers.map((user) => (
								<button
									key={user.id}
									type='button'
									onClick={() => selectUser(user)}
									className={`w-full text-left px-3 py-2.5 hover:bg-slate-700 transition-colors text-sm border-b border-white/5 last:border-b-0 ${
										selectedId === user.id ? 'bg-blue-600/30' : ''
									}`}>
									<span className='font-medium'>
										{user.name || '(no name)'}
									</span>
									<span className='text-slate-400 ml-2'>
										{user.mobileNumber || 'no mobile'}
									</span>
								</button>
							))}
						</div>
					)}
					{showResults && searchQuery.trim() && filteredUsers.length === 0 && (
						<div className='absolute z-20 mt-1 w-full bg-slate-800 border border-white/10 rounded-lg shadow-xl px-3 py-2.5 text-sm text-slate-400'>
							No user found — fill in details below to create new
						</div>
					)}
				</div>
			</div>

			{/* ── Selected user indicator ── */}
			{selectedId && (
				<div className='mb-4 flex items-center gap-3 bg-blue-600/10 border border-blue-500/20 rounded-lg px-3 py-2.5'>
					<div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white'>
						{(form.name || form.mobileNumber || '?').charAt(0).toUpperCase()}
					</div>
					<div className='flex-1 min-w-0'>
						<p className='text-sm font-semibold text-white truncate'>
							{form.name || '(no name)'}{' '}
							<span className='text-blue-300 text-xs font-normal'>
								— Editing
							</span>
						</p>
						<p className='text-xs text-slate-400'>{form.mobileNumber}</p>
					</div>
					<button
						type='button'
						onClick={() => {
							setSelectedId('');
							setSearchQuery('');
							setForm({
								id: '',
								name: '',
								mobileNumber: '',
								password: '',
								isAdmin: false,
								userGroups: [],
								villageRoles: [emptyRole],
							});
							setStatusText('');
						}}
						className='text-xs text-slate-400 hover:text-white border border-white/10 rounded-md px-2 py-1 transition-colors'>
						Clear
					</button>
				</div>
			)}

			{/* ── User Form ── */}
			<div className='bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-4'>
				<p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>
					{selectedId ? 'Edit User Details' : 'New User Details'}
				</p>
				<div className='grid gap-3 md:grid-cols-2'>
					<div>
						<label className='block text-xs text-slate-500 mb-1'>User Id</label>
						<input
							placeholder='User Id'
							value={form.id}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, id: e.target.value }))
							}
							className='w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm'
							disabled={!!selectedId}
						/>
					</div>
					<div>
						<label className='block text-xs text-slate-500 mb-1'>Name</label>
						<input
							placeholder='Name'
							value={form.name}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, name: e.target.value }))
							}
							className='w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm'
						/>
					</div>
					<div>
						<label className='block text-xs text-slate-500 mb-1'>
							Mobile Number
						</label>
						<input
							placeholder='Mobile Number'
							value={form.mobileNumber}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, mobileNumber: e.target.value }))
							}
							className='w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm'
						/>
					</div>
					<div>
						<label className='block text-xs text-slate-500 mb-1'>
							{selectedId ? 'Change Password' : 'Set Password'}
							<span className='text-slate-600'>
								{' '}
								(leave blank to keep current)
							</span>
						</label>
						<input
							type='password'
							placeholder={
								selectedId ? 'New password (optional)' : 'Set password'
							}
							value={form.password}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, password: e.target.value }))
							}
							className='w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm'
						/>
					</div>
					<label className='flex items-center gap-2 md:col-span-2'>
						<input
							type='checkbox'
							checked={form.isAdmin}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, isAdmin: e.target.checked }))
							}
							className='rounded'
						/>
						<span className='text-sm'>Global admin</span>
					</label>
				</div>
			</div>

			{/* ── Village Roles ── */}
			<div className='bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-4'>
				<p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>
					Village Roles
				</p>
				<div className='space-y-3'>
					{form.villageRoles.map((entry, index) => (
						<div
							key={`${entry.villageCode}-${index}`}
							className='grid gap-2 md:grid-cols-3'>
							<select
								value={entry.villageCode}
								onChange={(e) =>
									onChangeRole(index, 'villageCode', e.target.value)
								}
								className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm'>
								<option value=''>Select village</option>
								{villageOptions.map((village) => (
									<option key={village.code} value={village.code}>
										{village.name} ({village.code})
									</option>
								))}
							</select>

							<select
								value={entry.role}
								onChange={(e) => onChangeRole(index, 'role', e.target.value)}
								className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm'>
								<option value=''>Select role</option>
								{ROLE_OPTIONS.map((role) => (
									<option key={role} value={role}>
										{role}
									</option>
								))}
							</select>

							<button
								onClick={() =>
									setForm((prev) => ({
										...prev,
										villageRoles:
											prev.villageRoles.length > 1
												? prev.villageRoles.filter((_, i) => i !== index)
												: [emptyRole],
									}))
								}
								className='rounded-lg border border-red-400/40 text-red-300 px-3 py-2 text-sm hover:bg-red-500/10 transition-colors'>
								Remove
							</button>
						</div>
					))}
				</div>
			</div>

			{/* ── Actions ── */}
			<div className='flex gap-3'>
				<button
					onClick={() =>
						setForm((prev) => ({
							...prev,
							villageRoles: [...prev.villageRoles, emptyRole],
						}))
					}
					className='rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5 transition-colors'>
					+ Add Village Role
				</button>
				<button
					disabled={saving}
					onClick={onSave}
					className='rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold disabled:opacity-50 transition-colors'>
					{saving ? 'Saving...' : selectedId ? 'Update User' : 'Save User'}
				</button>
			</div>
		</div>
	);
}
