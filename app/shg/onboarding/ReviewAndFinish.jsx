export default function ReviewAndFinish({ shg, onFinish }) {
	return (
		<div className='p-6 space-y-4'>
			<h2 className='font-semibold'>Review SHG</h2>

			<p>
				<b>Name:</b> {shg.name}
			</p>
			<p>
				<b>Village:</b> {shg.village}
			</p>
			<p>
				<b>Monthly Saving:</b> ₹{shg.monthlyContribution}
			</p>

			<button
				onClick={onFinish}
				className='w-full bg-green-600 text-white py-2 rounded'>
				Confirm & Finish
			</button>
		</div>
	);
}
