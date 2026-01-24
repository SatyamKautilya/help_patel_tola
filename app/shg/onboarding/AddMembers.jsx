import { useState } from 'react';
import { Search, UserPlus, Users, ArrowRight, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader, setShgOnboardingData } from '@/app/store/appSlice';

/**
 * STEP 1: Ask how many members
 */
function MemberCountStep({ onConfirm }) {
	const [count, setCount] = useState('');
	const [loading, setLoading] = useState(false);

	const handleConfirm = async () => {
		setLoading(true);
		await onConfirm(Number(count));
		setLoading(false);
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-3'>
				<div className='p-3 bg-blue-500/10 rounded-full'>
					<Users className='w-6 h-6 text-blue-400' />
				</div>
				<div>
					<h2 className='text-2xl font-bold'>सदस्यों की संख्या?</h2>
					<p className='text-gray-400 text-sm'>कुल SHG सदस्य दर्ज करें</p>
				</div>
			</div>

			<input
				type='number'
				min={1}
				max={30}
				value={count}
				onChange={(e) => setCount(e.target.value)}
				placeholder='जैसे 10'
				className='w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>

			<button
				disabled={!count || Number(count) < 1 || loading}
				onClick={handleConfirm}
				className='w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-green-500 disabled:opacity-50 py-3 rounded-xl font-semibold transition'>
				आगे बढ़ें
			</button>
		</div>
	);
}

/**
 * CORE MEMBER ADD UI
 */
function AddSingleMember({ shgId, index, total, onAdded }) {
	const [mobile, setMobile] = useState('');
	const [foundUser, setFoundUser] = useState(null);
	const [customName, setCustomName] = useState('');
	const [loading, setLoading] = useState(false);
	const [addingMember, setAddingMember] = useState(false);
	const [selectedRole, setSelectedRole] = useState('MEMBER');

	const memberCode = `M${String(index + 1).padStart(3, '0')}`;
	const dispatch = useDispatch();

	const searchUser = async () => {
		if (!mobile) return;

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
		} catch {
			setFoundUser(null);
		} finally {
			dispatch(setLoader(false));
			setLoading(false);
		}
	};

	const addMember = async ({
		name,
		userId = null,
		mobileNumber = null,
		role,
	}) => {
		setAddingMember(true);
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

			const member = await res.json();
			onAdded(member);
			setSelectedRole('MEMBER');
			setMobile('');
			setFoundUser(null);
			setCustomName('');
		} finally {
			dispatch(setLoader(false));
			setAddingMember(false);
		}
	};

	return (
		<div className='space-y-5'>
			<h2 className='text-xl'>
				<b className='text-pink-600'>सदस्य {index + 1}</b> : कुल-{total}
			</h2>

			<p className='text-xs text-gray-400'>
				Member Code: <b>{memberCode}</b>
			</p>

			<div className='relative'>
				<Search className='absolute left-3 top-3.5 text-gray-500 w-5 h-5' />
				<input
					type='tel'
					placeholder='मोबाइल नंबर से खोजें'
					value={mobile}
					onChange={(e) => setMobile(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && searchUser()}
					className='w-full bg-gray-800  focus:ring-2 focus:ring-pink-500 rounded-xl py-3 pl-10 pr-24 text-gray-100'
				/>
				<button
					onClick={searchUser}
					disabled={loading}
					className='absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 rounded-lg text-sm'>
					ढूँढे
				</button>
			</div>

			<div className='bg-gray-800/60 border border-gray-700 rounded-xl p-4 space-y-4'>
				{foundUser ? (
					<div className='flex flex-col gap-4 items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='border-1 flex flex-row gap-2 rounded-xl border-pink-600 p-3'>
								<span>सदस्य का नाम:</span>{' '}
								<p className='font-bold text-lg '>
									{foundUser.hindiName || foundUser.name}
								</p>
							</div>
						</div>
						<select
							value={selectedRole}
							onChange={(e) => setSelectedRole(e.target.value)}
							disabled={addingMember}
							className='bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm text-gray-100 disabled:opacity-50'>
							<option value='MEMBER'>सदस्य</option>
							<option value='PRESIDENT'>अध्यक्ष</option>
							<option value='SECRETARY'>सचिव</option>
							<option value='TREASURER'>कोषाध्यक्ष</option>
						</select>
						<button
							onClick={() =>
								addMember({
									name: foundUser.hindiName || foundUser.name,
									mobileNumber: foundUser.mobileNumber,
									userId: foundUser._id,
									role: selectedRole,
								})
							}
							disabled={addingMember}
							className='flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-green-500 disabled:opacity-50 px-4 py-2 rounded-lg text-sm'>
							<UserPlus className='w-4 h-4' />
							जोड़ें
						</button>
					</div>
				) : mobile ? (
					<>
						<input
							type='text'
							placeholder='सदस्य का नाम लिखें'
							value={customName}
							onChange={(e) => setCustomName(e.target.value)}
							disabled={addingMember}
							className='w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm disabled:opacity-50'
						/>
						<select
							value={selectedRole}
							onChange={(e) => setSelectedRole(e.target.value)}
							disabled={addingMember}
							className='bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm text-gray-100 disabled:opacity-50'>
							<option value='MEMBER'>सदस्य</option>
							<option value='PRESIDENT'>अध्यक्ष</option>
							<option value='SECRETARY'>सचिव</option>
							<option value='TREASURER'>कोषाध्यक्ष</option>
						</select>
						<button
							disabled={!customName || addingMember}
							onClick={() =>
								addMember({ name: customName, role: selectedRole })
							}
							className='w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-4 py-2 rounded-lg text-sm'>
							<UserPlus className='w-4 h-4' />
							मोबाइल के बिना जोड़ें
						</button>
					</>
				) : (
					<p className='text-gray-500 text-sm text-center'>
						मोबाइल से खोजें शुरू करें
					</p>
				)}
			</div>
		</div>
	);
}

/**
 * FINAL SUMMARY
 */
function MembersSummary({ members, onNext }) {
	const [loading, setLoading] = useState(false);

	const handleNext = async () => {
		setLoading(true);
		await onNext();
		setLoading(false);
	};

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold'>सदस्यों की जानकारी</h2>

			<div className='space-y-2 max-h-64 overflow-y-auto'>
				{members.map((m) => (
					<div
						key={m._id}
						className='flex items-center gap-3 bg-gray-800 p-3 rounded-lg'>
						<User className='w-4 h-4 text-gray-400' />
						<span className='text-lg'>
							{m.name}
							{/* <span className='text-xs text-gray-400'>({m.memberCode})</span> */}
						</span>
						<span className='ml-auto text-sm px-2 py-1 bg-pink-600/20 text-indigo-400 rounded-lg'>
							{m.role === 'PRESIDENT'
								? 'अध्यक्ष'
								: m.role === 'SECRETARY'
									? 'सचिव'
									: m.role === 'TREASURER'
										? 'कोषाध्यक्ष'
										: 'सदस्य'}
						</span>
					</div>
				))}
			</div>

			<button
				onClick={handleNext}
				disabled={loading}
				className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 disabled:opacity-50 py-3 rounded-xl font-semibold'>
				आगे बढ़ें
				<ArrowRight className='w-5 h-5' />
			</button>
		</div>
	);
}

/**
 * MAIN EXPORT
 */
export default function AddMembersFlow({ onNext }) {
	const shg = useSelector((state) => state.appContext.shgOnboardingData);
	console.log(shg, 'shg');
	const shgId = shg?.shgDetails?._id;
	const [total, setTotal] = useState(null);
	const [current, setCurrent] = useState(0);
	const [members, setMembers] = useState([]);
	const dispatch = useDispatch();

	const saveMembersToStore = () => {
		dispatch(setShgOnboardingData({ members: members }));
	};

	if (!total) {
		return <MemberCountStep onConfirm={setTotal} />;
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

	return (
		<AddSingleMember
			shgId={shgId}
			index={current}
			total={total}
			onAdded={handleAdded}
		/>
	);
}
