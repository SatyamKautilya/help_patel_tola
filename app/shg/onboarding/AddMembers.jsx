import { useState } from 'react';
import { Search, UserPlus, Users, ArrowRight, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setShgOnboardingData } from '@/app/store/appSlice';

/**
 * STEP 1: Ask how many members
 */
function MemberCountStep({ onConfirm }) {
	const [count, setCount] = useState('');

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
				disabled={!count || Number(count) < 1}
				onClick={() => onConfirm(Number(count))}
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

	const memberCode = `M${String(index + 1).padStart(3, '0')}`;

	const searchUser = async () => {
		if (!mobile) return;
		setLoading(true);
		try {
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
			setLoading(false);
		}
	};

	const addMember = async ({ name, userId = null, mobileNumber = null }) => {
		const res = await fetch('/api/shg?name=add-member', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				shgId,
				name,
				userId,
				memberCode,
				role: 'MEMBER',
				mobileNumber,
			}),
		});

		const member = await res.json();
		onAdded(member);

		setMobile('');
		setFoundUser(null);
		setCustomName('');
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
					className='absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 px-4 rounded-lg text-sm'>
					ढूँढे
				</button>
			</div>

			<div className='bg-gray-800/60 border border-gray-700 rounded-xl p-4 space-y-4'>
				{foundUser ? (
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white'>
								{(foundUser.hindiName || foundUser.name)?.charAt(0)}
							</div>
							<div>
								<p className='font-medium'>
									{foundUser.hindiName || foundUser.name}
								</p>
								<p className='text-xs text-green-400'>मोबाइल उपयोगकर्ता</p>
							</div>
						</div>
						<button
							onClick={() =>
								addMember({
									name: foundUser.hindiName || foundUser.name,
									mobileNumber: foundUser.mobileNumber,
									userId: foundUser._id,
								})
							}
							className='flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm'>
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
							className='w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm'
						/>
						<button
							disabled={!customName}
							onClick={() => addMember({ name: customName })}
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
	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold'>सदस्य जोड़े गए</h2>

			<div className='space-y-2 max-h-64 overflow-y-auto'>
				{members.map((m) => (
					<div
						key={m._id}
						className='flex items-center gap-3 bg-gray-800 p-3 rounded-lg'>
						<User className='w-4 h-4 text-gray-400' />
						<span>
							{m.name}{' '}
							<span className='text-xs text-gray-400'>({m.memberCode})</span>
						</span>
					</div>
				))}
			</div>

			<button
				onClick={onNext}
				className='w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold'>
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
