import { useState } from 'react';
import { Input, Button, Spinner } from '@heroui/react';
import { MapPin } from 'lucide-react'; // Added for a subtle icon
import { useSelector } from 'react-redux';

export default function VillageGroupRegistration() {
	const [villageCode, setVillageCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
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
						mobileNumber,
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
		<div className='w-full max-w-2xl mx-auto px-3 py-4'>
			{/* Subtle Container */}
			<div className='flex flex-col md:flex-row items-center gap-4 backdrop-blur-md bg-white/20 p-4 rounded-2xl border border-gray-300 shadow-lg transition-all hover:bg-white/25'>
				{/* Minimalist Label for Context */}
				<div className='flex items-center gap-2 text-gray-600 whitespace-nowrap px-2'>
					<MapPin color='black' size={20} />
					<span className='text-lg text-black font-semibold'>
						गाँव के ग्रुप मे जुड़े:
					</span>
				</div>

				<div className='flex flex-col w-full items-center gap-3'>
					<div className='flex flex-col w-full'>
						<Input
							placeholder='गाँव कोड'
							value={villageCode}
							onChange={(e) => setVillageCode(e.target.value)}
							disabled={loading}
							size='sm'
							variant='flat'
							className='flex-1 mb-2'
							classNames={{
								inputWrapper:
									'bg-white/80 hover:bg-gray-200 border border-gray-300 h-12 min-h-12 rounded-md',
								input: 'text-sm',
							}}
						/>
						<Input
							placeholder='मोबाइल नंबर'
							value={mobileNumber}
							onChange={(e) => {
								const value = e.target.value.replace(/\D/g, '').slice(0, 10);
								setMobileNumber(value);
							}}
							disabled={loading}
							size='sm'
							variant='flat'
							maxLength='10'
							classNames={{
								inputWrapper:
									'bg-white/80 hover:bg-gray-200 border border-gray-300 h-12 min-h-12 rounded-md',
								input: 'text-sm',
							}}
						/>
					</div>
					<Button
						onPress={handleRegister}
						isDisabled={loading || !villageCode || mobileNumber?.length !== 10}
						className={`
		w-2/3 font-semibold rounded-md transition-all
		bg-gradient-to-r from-[#f2d28b] to-[#e8b85c]
		text-gray-800
		text-lg
		hover:-translate-y-0.5 hover:shadow-lg
		active:translate-y-0

		data-[disabled=true]:opacity-50
		data-[disabled=true]:cursor-not-allowed
		data-[disabled=true]:hover:translate-y-0
		data-[disabled=true]:hover:shadow-none
	`}
						size='sm'>
						{loading ? <Spinner size='sm' color='white' /> : 'जुड़ें'}
					</Button>
				</div>
			</div>

			{/* Float Message to avoid pushing content down */}
			{message && (
				<p
					className={`text-sm mt-2 ml-4 font-medium transition-opacity ${
						isError ? 'text-red-600' : 'text-green-600'
					}`}>
					{message}
				</p>
			)}
		</div>
	);
}
