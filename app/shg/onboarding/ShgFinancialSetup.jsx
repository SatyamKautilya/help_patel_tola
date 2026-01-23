import { useState } from 'react';

export default function ShgFinancialSetup({ shgId, onNext }) {
	const [isExisting, setIsExisting] = useState(false);
	const [loan, setLoan] = useState({ memberId: '', amount: '' });

	const addOpeningLoan = async () => {
		await fetch('/api/shg?name=opening-balance', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				shgId,
				fromAccount: 'SHG_CASH',
				toAccount: `MEMBER_LOAN_${loan.memberId}`,
				amount: loan.amount,
				memberId: loan.memberId,
			}),
		});

		setLoan({ memberId: '', amount: '' });
	};

	return (
		<div className='p-6 space-y-4'>
			<h2 className='font-semibold'>SHG Financial Setup</h2>

			<label>
				<input
					type='checkbox'
					checked={isExisting}
					onChange={() => setIsExisting(!isExisting)}
				/>{' '}
				Existing SHG
			</label>

			{isExisting && (
				<div className='border p-3 space-y-2'>
					<input
						placeholder='Member ID'
						className='border p-2 w-full'
						onChange={(e) => setLoan({ ...loan, memberId: e.target.value })}
					/>
					<input
						placeholder='Pending Loan Amount'
						className='border p-2 w-full'
						onChange={(e) => setLoan({ ...loan, amount: e.target.value })}
					/>
					<button
						onClick={addOpeningLoan}
						className='bg-blue-600 text-white px-3 py-1'>
						Add Existing Loan
					</button>
				</div>
			)}

			<button
				onClick={onNext}
				className='w-full bg-green-600 text-white py-2 rounded'>
				Continue
			</button>
		</div>
	);
}
