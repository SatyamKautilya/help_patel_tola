import { Wallet } from 'lucide-react';
import React, { useState } from 'react';

const CashInHand = ({ setShgCash, nextStep }) => {
	const [tempshgCash, setTempshgCash] = useState('');
	return (
		<div className='space-y-4'>
			<p className='font-semibold text-indigo-400'>
				समूह के पास वर्तमान नकद राशि
			</p>
			<div className='relative'>
				<Wallet className='absolute left-3 top-3 w-5 h-5 text-slate-500' />
				<input
					type='number'
					placeholder='₹ वर्तमान नकद'
					value={tempshgCash}
					onChange={(e) => {
						setTempshgCash(e.target.value);
						setShgCash(e.target.value);
					}}
					className='w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 text-white'
				/>
			</div>
			<button
				disabled={!tempshgCash}
				onClick={nextStep}
				className='w-full bg-gradient-to-r from-indigo-600 to-pink-600 py-2 rounded-lg'>
				आगे बढ़ें
			</button>
		</div>
	);
};

export default CashInHand;
