import { useState } from 'react';
import AdminHome from './AdminHome';
import CreateShg from './CreateShg';
import AddMembers from './AddMembers';
import ShgFinancialSetup from './ShgFinancialSetup';
import ReviewAndFinish from './ReviewAndFinish';

export default function OnboardingFlow() {
	const [step, setStep] = useState(0);
	const [shg, setShg] = useState(null);

	if (step === 0) return <AdminHome onCreate={() => setStep(1)} />;
	if (step === 1)
		return (
			<CreateShg
				onNext={(s) => {
					setShg(s);
					setStep(2);
				}}
			/>
		);
	if (step === 2)
		return <AddMembers shgId={shg._id} onNext={() => setStep(3)} />;
	if (step === 3)
		return <ShgFinancialSetup shgId={shg._id} onNext={() => setStep(4)} />;
	if (step === 4)
		return <ReviewAndFinish shg={shg} onFinish={() => alert('Done')} />;
}
