import { useEffect, useState } from 'react';
import { Search, UserPlus, ArrowRight, User, BadgeCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader, setShgOnboardingData } from '@/app/store/appSlice';

const ROLE_OPTIONS = [
	{ value: 'MEMBER', label: 'सदस्य' },
	{ value: 'PRESIDENT', label: 'अध्यक्ष' },
	{ value: 'SECRETARY', label: 'सचिव' },
	{ value: 'TREASURER', label: 'कोषाध्यक्ष' },
];

function AddSingleMember({ shgId, index, total, onAdded }) {
	const [mobile, setMobile] = useState('');
	const [foundUser, setFoundUser] = useState(null);
	const [customName, setCustomName] = useState('');
	const [loading, setLoading] = useState(false);
	const [addingMember, setAddingMember] = useState(false);
	const [selectedRole, setSelectedRole] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const memberCode = `M${String(index + 1).padStart(3, '0')}`;

	const searchUser = async () => {
		if (!mobile) return;
		setError('');
		setLoading(true);
		try {
			dispatch(setLoader(true));
			const res = await fetch(`/api/shg?name=fetch-by-mobile`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mobile }),
			});
			const data = await res.json();
			setFoundUser(data || null);
		} catch (searchError) {
			console.error(searchError);
			setFoundUser(null);
			setError('मोबाइल नंबर से उपयोगकर्ता खोजने में समस्या हुई।');
		} finally {
			dispatch(setLoader(false));
			setLoading(false);
		}
	};

	const addMember = async ({ name, userId = null, mobileNumber = null, role }) => {
		setAddingMember(true);
		setError('');
		try {
			dispatch(setLoader(true));
			const res = await fetch('/api/shg?name=add-member', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					shgId,
					name,
					userId,
					memberCode,
					role,
					mobileNumber,
				}),
			});

			if (!res.ok) throw new Error('Failed to add member');
			const member = await res.json();
			onAdded(member);
			setSelectedRole('');
			setMobile('');
			setFoundUser(null);
			setCustomName('');
		} catch (submitError) {
			console.error(submitError);
			setError('अभी सदस्य जोड़ना संभव नहीं है।');
		} finally {
			dispatch(setLoader(false));
			setAddingMember(false);
		}
	};

	return (
		<div className='space-y-5'>
			<header className='flex items-center justify-between bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3'>
				<div>
					<h2 className='text-xl font-bold text-white'>सदस्य {index + 1}</h2>
					<p className='text-sm text-slate-400'>कुल {total} में से</p>
				</div>
				<div className='text-right'>
					<p className='text-xs uppercase text-slate-500'>सदस्य कोड</p>
					<p className='text-sm text-indigo-300 font-semibold'>{memberCode}</p>
				</div>
			</header>

			<section className='bg-slate-900/50 border border-slate-700 rounded-xl p-5 space-y-4'>
				<label className='block space-y-1'>
					<span className='text-xs uppercase tracking-wide text-slate-400 font-semibold'>
						मोबाइल नंबर से खोजें
					</span>
					<div className='relative'>
						<Search className='absolute left-3 top-3.5 text-slate-500 w-5 h-5' />
						<input
							type='tel'
							placeholder='मोबाइल नंबर दर्ज करें'
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && searchUser()}
							className='w-full bg-slate-950 focus:ring-2 focus:ring-pink-500 rounded-xl py-3 pl-10 pr-24 text-slate-100 border border-slate-700'
						/>
						<button
							onClick={searchUser}
							disabled={loading}
							className='absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 rounded-lg text-sm text-white'>
							खोजें
						</button>
					</div>
				</label>

				<label className='block space-y-1'>
					<span className='text-xs uppercase tracking-wide text-slate-400 font-semibold'>
						सदस्य की भूमिका चुनें
					</span>
					<select
						value={selectedRole}
						onChange={(e) => setSelectedRole(e.target.value)}
						disabled={addingMember}
						className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 disabled:opacity-50'>
						<option value=''>भूमिका चुनें</option>
						{ROLE_OPTIONS.map((role) => (
							<option key={role.value} value={role.value}>
								{role.label}
							</option>
						))}
					</select>
				</label>

				{foundUser ? (
					<div className='bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4 space-y-3'>
						<div className='flex items-center gap-2'>
							<BadgeCheck className='w-5 h-5 text-emerald-300' />
							<p className='text-sm text-emerald-200'>
								ऐप में मौजूद उपयोगकर्ता मिला
							</p>
						</div>
						<p className='text-slate-100 font-semibold'>
							{foundUser.hindiName || foundUser.name}
						</p>
						<button
							onClick={() =>
								addMember({
									name: foundUser.hindiName || foundUser.name,
									mobileNumber: foundUser.mobileNumber,
									userId: foundUser._id,
									role: selectedRole,
								})
							}
							disabled={addingMember || !selectedRole}
							className='flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 disabled:opacity-50 px-4 py-2 rounded-lg text-sm text-white'>
							<UserPlus className='w-4 h-4' />
							यह सदस्य जोड़ें
						</button>
					</div>
				) : mobile ? (
					<div className='space-y-3'>
						<label className='block space-y-1'>
							<span className='text-xs uppercase tracking-wide text-slate-400 font-semibold'>
								नाम (मैनुअल एंट्री)
							</span>
							<input
								type='text'
								placeholder='सदस्य का नाम दर्ज करें'
								value={customName}
								onChange={(e) => setCustomName(e.target.value)}
								disabled={addingMember}
								className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 disabled:opacity-50'
							/>
						</label>
						<button
							disabled={!customName || addingMember || !selectedRole}
							onClick={() =>
								addMember({
									name: customName,
									role: selectedRole,
									mobileNumber: mobile || null,
								})
							}
							className='w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-4 py-2 rounded-lg text-sm text-white'>
							<UserPlus className='w-4 h-4' />
							ऐप खाते के बिना जोड़ें
						</button>
					</div>
				) : (
					<p className='text-slate-500 text-sm text-center'>
						मोबाइल नंबर लिखकर खोजें।
					</p>
				)}

				{error ? <p className='text-red-300 text-sm'>{error}</p> : null}
			</section>
		</div>
	);
}

function MembersSummary({ members, onNext }) {
	const [loading, setLoading] = useState(false);

	const handleNext = async () => {
		setLoading(true);
		await onNext();
		setLoading(false);
	};

	return (
		<div className='space-y-6'>
			<header className='space-y-1'>
				<h2 className='text-2xl font-bold text-white'>सदस्य सारांश</h2>
				<p className='text-sm text-slate-400'>
					आगे बढ़ने से पहले जोड़े गए सदस्यों की पुष्टि करें।
				</p>
			</header>

			<div className='space-y-2 max-h-80 overflow-y-auto pr-2'>
				{members.map((member) => (
					<div
						key={member._id}
						className='flex items-center gap-3 bg-slate-900/50 border border-slate-700 p-3 rounded-lg'>
						<User className='w-4 h-4 text-slate-400' />
						<span className='text-slate-100'>{member.name}</span>
						<span className='ml-auto text-xs px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded-lg'>
							{member.role}
						</span>
					</div>
				))}
			</div>

			<button
				onClick={handleNext}
				disabled={loading}
				className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 disabled:opacity-50 py-3 rounded-xl font-semibold text-white'>
				आगे बढ़ें
				<ArrowRight className='w-5 h-5' />
			</button>
		</div>
	);
}

export default function AddMembersFlow({ onNext }) {
	const shg = useSelector((state) => state.appContext.shgOnboardingData);
	const shgId = shg?.shgDetails?._id;
	const total = Number(shg?.shgDetails?.totalMembers || 0);
	const [members, setMembers] = useState(shg?.members || []);
	const [current, setCurrent] = useState((shg?.members || []).length);
	const dispatch = useDispatch();

	useEffect(() => {
		const existingMembers = shg?.members || [];
		setMembers(existingMembers);
		setCurrent(existingMembers.length);
	}, [shg?.shgDetails?._id, shg?.members]);

	const saveMembersToStore = () => {
		dispatch(setShgOnboardingData({ members }));
	};

	if (!total) {
		return (
			<div className='space-y-4 bg-slate-900/50 border border-slate-700 rounded-xl p-5'>
				<h2 className='text-xl font-bold text-white'>Total members missing</h2>
				<p className='text-slate-300 text-sm'>
					पहले SHG विवरण में <b>कुल सदस्य</b> भरें, फिर आगे बढ़ें।
				</p>
			</div>
		);
	}

	if (current >= total) {
		return (
			<MembersSummary
				members={members}
				onNext={() => {
					saveMembersToStore();
					onNext();
				}}
			/>
		);
	}

	const handleAdded = (member) => {
		setMembers((prev) => [...prev, member]);
		setCurrent((prev) => prev + 1);
	};

	return <AddSingleMember shgId={shgId} index={current} total={total} onAdded={handleAdded} />;
}
