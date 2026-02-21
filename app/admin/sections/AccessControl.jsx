import { useEffect, useMemo, useState } from 'react';
import { ROLE_OPTIONS } from '@/lib/roles';

const emptyRole = { villageCode: '', role: '' };

export default function AccessControl() {
	const [users, setUsers] = useState([]);
	const [villages, setVillages] = useState([]);
	const [selectedId, setSelectedId] = useState('');
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
			{statusText ? <p className='text-sm text-slate-300 mb-4'>{statusText}</p> : null}

			<div className='grid gap-3 md:grid-cols-2 mb-4'>
				<select
					value={selectedId}
					onChange={(e) => setSelectedId(e.target.value)}
					className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2'>
					<option value=''>Select existing user</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name || user.mobileNumber} ({user.mobileNumber || 'no mobile'})
						</option>
					))}
				</select>
				<input
					placeholder='User Id'
					value={form.id}
					onChange={(e) => setForm((prev) => ({ ...prev, id: e.target.value }))}
					className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2'
				/>
				<input
					placeholder='Name'
					value={form.name}
					onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
					className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2'
				/>
				<input
					placeholder='Mobile Number'
					value={form.mobileNumber}
					onChange={(e) =>
						setForm((prev) => ({ ...prev, mobileNumber: e.target.value }))
					}
					className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2'
				/>
				<input
					type='password'
					placeholder='Set password (optional)'
					value={form.password}
					onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
					className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2'
				/>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={form.isAdmin}
						onChange={(e) =>
							setForm((prev) => ({ ...prev, isAdmin: e.target.checked }))
						}
					/>
					<span>Global admin</span>
				</label>
			</div>

			<div className='space-y-3 mb-4'>
				{form.villageRoles.map((entry, index) => (
					<div key={`${entry.villageCode}-${index}`} className='grid gap-2 md:grid-cols-3'>
						<select
							value={entry.villageCode}
							onChange={(e) => onChangeRole(index, 'villageCode', e.target.value)}
							className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2'>
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
							className='bg-slate-900 border border-white/10 rounded-lg px-3 py-2'>
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
							className='rounded-lg border border-red-400/40 text-red-300 px-3 py-2'>
							Remove
						</button>
					</div>
				))}
			</div>

			<div className='flex gap-3'>
				<button
					onClick={() =>
						setForm((prev) => ({
							...prev,
							villageRoles: [...prev.villageRoles, emptyRole],
						}))
					}
					className='rounded-lg border border-white/20 px-4 py-2'>
					Add Village Role
				</button>
				<button
					disabled={saving}
					onClick={onSave}
					className='rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 disabled:opacity-50'>
					{saving ? 'Saving...' : 'Save User'}
				</button>
			</div>
		</div>
	);
}
