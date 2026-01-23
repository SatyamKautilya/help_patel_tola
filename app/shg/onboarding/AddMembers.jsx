import { useState } from 'react';

export default function AddMembers({ shgId, onNext }) {
	const [mobile, setMobile] = useState('');
	const [foundUser, setFoundUser] = useState(null);
	const [members, setMembers] = useState([]);

	const searchUser = async () => {
		const res = await fetch(`/api/user?mobile=${mobile}`);
		const data = await res.json();
		setFoundUser(data || null);
	};

	const addMember = async (name, userId = null) => {
		const res = await fetch('/api/shg?name=add-member', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				shgId,
				name,
				userId,
				role: 'MEMBER',
			}),
		});

		const member = await res.json();
		setMembers([...members, member]);
		setFoundUser(null);
		setMobile('');
	};

	return (
		<div className='p-6 space-y-4'>
			<h2 className='font-semibold'>Add Members</h2>

			<input
				placeholder='Search mobile number'
				className='w-full border p-2'
				value={mobile}
				onChange={(e) => setMobile(e.target.value)}
			/>

			<button onClick={searchUser} className='bg-blue-600 text-white px-4 py-1'>
				Search
			</button>

			{foundUser ? (
				<div className='border p-3'>
					<p>{foundUser.name}</p>
					<button
						onClick={() => addMember(foundUser.name, foundUser._id)}
						className='bg-green-600 text-white px-3 py-1'>
						Add to SHG
					</button>
				</div>
			) : (
				mobile && (
					<button
						onClick={() => addMember('New Member')}
						className='bg-gray-600 text-white px-3 py-1'>
						Add without mobile
					</button>
				)
			)}

			<div>
				<h3 className='mt-4'>Members Added ({members.length})</h3>
				{members.map((m) => (
					<div key={m._id}>{m.name}</div>
				))}
			</div>

			<button
				onClick={() => onNext()}
				className='w-full bg-green-600 text-white py-2 rounded'>
				Continue
			</button>
		</div>
	);
}
