import { useState } from 'react';
import { Input, Button, Spinner } from '@heroui/react';
import { MapPin } from 'lucide-react'; // Added for a subtle icon
import { useSelector } from 'react-redux';

export default function VillageGroupRegistration() {
	const [villageCode, setVillageCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const appContext = useSelector((state) => state.appContext.appContext);

	const handleRegister = async () => {
		if (!villageCode.trim()) return;
		if (appContext?.appInstanceId == undefined) {
			return;
		}
		setLoading(true);
		setMessage('');
		setIsError(false);

		try {
			const response = await fetch(
				`/api/query/database?name=register-for-village`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						villageCode,
						assetId: appContext?.appInstanceId,
						userName: appContext?.name,
					}),
				},
			);

			const data = await response.json();
			setMessage(data.message || 'पंजीकरण सफल!');
			setIsError(!response.ok);
			if (response.ok) setVillageCode('');
		} catch (error) {
			setMessage('त्रुटि हुई');
			setIsError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full max-w-2xl mx-auto px-4 py-2'>
			{/* Subtle Container */}
			<div className='flex flex-col md:flex-row items-center gap-3 backdrop-blur-md bg-white/10 p-3 rounded-2xl border border-white/10 transition-all hover:bg-white/15'>
				{/* Minimalist Label for Context */}
				<div className='flex items-center gap-2 text-slate-400 whitespace-nowrap px-2'>
					<MapPin color='black' size={16} />
					<span className='text-md text-black font-medium'>
						गाँव ग्रुप मे जुड़े:
					</span>
				</div>

				<div className='flex flex-1 w-full gap-2'>
					<Input
						placeholder='गाँव कोड'
						value={villageCode}
						onChange={(e) => setVillageCode(e.target.value)}
						disabled={loading}
						size='sm'
						variant='flat'
						className='flex-1'
						classNames={{
							inputWrapper:
								'bg-white/70 hover:bg-black/30 border-none h-10 min-h-10',
							input: 'text-sm',
						}}
					/>

					<Button
						onPress={handleRegister}
						disabled={loading || !villageCode}
						className='bg-gradient-to-r from-[#f2d28b] to-[#e8b85c] text-md text-gray-800 w-max font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0'
						size='sm'
						radius='lg'>
						{loading ? <Spinner size='sm' color='white' /> : 'जुड़ें'}
					</Button>
				</div>
			</div>

			{/* Float Message to avoid pushing content down */}
			{message && (
				<p
					className={`text-[10px] mt-1 ml-4 font-medium transition-opacity ${
						isError ? 'text-red-900' : 'text-green-900'
					}`}>
					{message}
				</p>
			)}
		</div>
	);
}
