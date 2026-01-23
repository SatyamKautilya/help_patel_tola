export default function AdminHome({ onCreate }) {
	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-xl font-semibold'>Tamohar – Admin</h1>

			<button
				onClick={onCreate}
				className='w-full bg-green-600 text-white py-3 rounded'>
				➕ Create / Onboard SHG
			</button>
		</div>
	);
}
