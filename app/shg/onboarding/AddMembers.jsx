import { useState } from 'react';
import { Search, UserPlus, Users, ArrowRight, User } from 'lucide-react';

export default function AddMembers({ shgId, onNext }) {
	const [mobile, setMobile] = useState('');
	const [foundUser, setFoundUser] = useState(null);
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(false);

	const searchUser = async () => {
		if (!mobile) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/user?mobile=${mobile}`);
			const data = await res.json();
			setFoundUser(data || null);
		} catch (error) {
			console.error('Failed to fetch user');
		} finally {
			setLoading(false);
		}
	};

	const addMember = async (name, userId = null) => {
		try {
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
		} catch (error) {
			console.error('Failed to add member');
		}
	};

	return (
		<>
			<div className='flex items-center gap-3 mb-6'>
				<div className='p-3 bg-blue-500/10 rounded-full'>
					<Users className='w-6 h-6 text-blue-400' />
				</div>
				<div>
					<h2 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
						Add Members
					</h2>
					<p className='text-gray-400 text-sm'>Build your SHG team</p>
				</div>
			</div>
			<div className='space-y-4'>
				<div className='relative group'>
					<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
						<Search className='h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors' />
					</div>
					<input
						type='tel'
						placeholder='Search by mobile number'
						className='w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-10 pr-24 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all'
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && searchUser()}
					/>
					<button
						onClick={searchUser}
						disabled={loading}
						className='absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50'>
						{loading ? 'Searching...' : 'Search'}
					</button>
				</div>

				<div className='min-h-[100px] bg-gray-800/50 rounded-xl p-4 border border-gray-700/50'>
					{foundUser ? (
						<div className='flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm animate-in fade-in slide-in-from-bottom-2'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg'>
									{foundUser.name.charAt(0)}
								</div>
								<div>
									<p className='font-medium text-gray-100'>{foundUser.name}</p>
									<p className='text-xs text-green-400'>User found</p>
								</div>
							</div>
							<button
								onClick={() => addMember(foundUser.name, foundUser._id)}
								className='flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-green-900/20'>
								<UserPlus className='w-4 h-4' />
								<span>Add</span>
							</button>
						</div>
					) : (
						mobile &&
						!loading && (
							<div className='text-center py-4 animate-in fade-in'>
								<p className='text-gray-400 mb-3 text-sm'>
									User not found with this number
								</p>
								<button
									onClick={() => addMember('New Member')}
									className='inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg text-sm border border-gray-600 transition-all'>
									<UserPlus className='w-4 h-4' />
									Add without mobile
								</button>
							</div>
						)
					)}
					{!foundUser && !mobile && (
						<div className='flex flex-col items-center justify-center h-full py-4 text-gray-500'>
							<Search className='w-8 h-8 mb-2 opacity-20' />
							<p className='text-sm'>Search to add members</p>
						</div>
					)}
				</div>
			</div>
			<div>
				<div className='flex items-center justify-between mb-3'>
					<h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
						Members Added
					</h3>
					<span className='bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md border border-gray-700'>
						{members.length}
					</span>
				</div>
				<div className='space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar'>
					{members.length === 0 ? (
						<p className='text-sm text-gray-500 italic'>
							No members added yet.
						</p>
					) : (
						members.map((m) => (
							<div
								key={m._id}
								className='flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800 transition-colors'>
								<div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center'>
									<User className='w-4 h-4 text-gray-400' />
								</div>
								<span className='text-gray-200 text-sm font-medium'>
									{m.name}
								</span>
							</div>
						))
					)}
				</div>
			</div>
			<button
				onClick={() => onNext()}
				disabled={members.length === 0}
				className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5'>
				<span>Continue to Next Step</span>
				<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
			</button>
		</>
	);
}
