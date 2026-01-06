'use client';

import { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	CardBody,
	Divider,
	Input,
	Textarea,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Chip,
} from '@heroui/react';

import { useRouter } from 'next/navigation';

export default function GovtSchemesPage() {
	const router = useRouter();
	const [pass, setPass] = useState('');
	const [loading, setLoading] = useState(false);
	const [schemes, setSchemes] = useState([]);

	const [openPass, setOpenPass] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		eligibility: '',
		details: '',
		benefits: '',
		howToEnroll: '',
	});

	const handleChange = (field, value) => {
		setFormData({
			...formData,
			[field]: value,
		});
	};

	const fetchSchemes = async () => {
		try {
			const response = await fetch('/api/query/database?name=getgovtschemes');
			const data = await response.json();

			if (data && data.govtSchemes.length > 0) {
				setSchemes(data.govtSchemes);
			}
		} catch (err) {
			console.error('Error fetching schemes:', err);
		}
	};
	const saveScheme = async () => {
		if (!formData.name) return;

		setLoading(true);
		try {
			await fetch('/api/query/database?name=setgovtschemes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ form: formData }),
			});
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
		setFormData({
			name: '',
			eligibility: '',
			details: '',
			benefits: '',
			howToEnroll: '',
		});

		setIsOpen(false);
		fetchSchemes();
	};

	useEffect(() => {
		fetchSchemes();
	}, []);

	useEffect(() => {
		if (pass === 'yojna') {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [pass]);
	return (
		<>
			<div className='fixed  w-full pt-12 top-0 z-50 flex flex-row pb-4 border-b-2 bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-50 items-center'>
				<Button
					color='primary'
					size='lg'
					className='ml-4 text-xl font-bold'
					onPress={() => router.back()}>
					← Back
				</Button>
			</div>
			{openPass && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
					<Card
						className='
                                  h-64
                                  w-96
                                  rounded-2xl
                                  shadow-2xl
                                  bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-300
                                  hover:scale-[1.02] transition-transform
                                '>
						<CardBody className='flex items-center justify-center text-white'>
							{/* Your content here */}
							<label className='text-2xl mb-4'>आपका स्वागत है!🌺</label>
							<div className='mx-20'>
								<Input
									value={pass}
									onChange={(e) => setPass(e.target.value)}
									classNames={{ input: 'text-lg' }}
									placeholder='Please Enter The Code'
								/>
							</div>
						</CardBody>
						<Button
							size='md'
							className='w-max mx-auto mb-4'
							color='danger'
							onPress={() => setOpenPass(false)}>
							बंद करें
						</Button>
					</Card>
				</div>
			)}
			<div className='min-h-screen mt-16 bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-50 px-4 py-6'>
				{/* Header Section */}
				<section className='mb-8 text-center'>
					<h1 className='text-3xl font-extrabold text-indigo-900'>
						सरकारी योजनाएँ
					</h1>

					<p className='mt-2 text-indigo-700 font-medium'>
						गाँव के विकास हेतु उपयोगी सरकारी योजनाओं की जानकारी
					</p>
				</section>

				{/* Add Scheme Button */}
				<div className='flex justify-center mb-6'>
					<Button
						color='primary'
						size='lg'
						className='text-lg font-bold shadow-lg'
						onPress={() => setOpenPass(true)}>
						+ Add Scheme Details
					</Button>
				</div>

				{/* Accordions with Dark Theme Cards */}
				<Card className='max-w-4xl bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-300 mx-auto shadow-xl rounded-2xl border border-violet-200'>
					<CardBody>
						<Chip color='primary' variant='solid' className='mb-4 text-base'>
							उपलब्ध योजनाएँ
						</Chip>

						<Divider className='mb-4' />

						<Accordion variant='splitted'>
							{schemes.map((scheme, index) => (
								<AccordionItem key={index} title={scheme.name}>
									{/* Dark Theme Scheme Detail Card */}
									<Card className=' text-white shadow-2xl rounded-2xl border border-cyan-800'>
										<CardBody className='space-y-4'>
											<div>
												<h2 className='text-2xl font-extrabold text-cyan-900'>
													{scheme.name}
												</h2>
											</div>

											<Divider className='bg-purple-700' />

											<div>
												<p className='font-bold text-pink-700 text-lg'>
													पात्रता:
												</p>
												<p className='text-black'>{scheme.eligibility}</p>
											</div>

											<div>
												<p className='font-bold text-violet-700 text-lg'>
													योजना की जानकारी:
												</p>
												<p className='text-black whitespace-pre-line'>
													{scheme.details}
												</p>
											</div>

											<div>
												<p className='font-bold text-emerald-700 text-lg'>
													योजना के लाभ:
												</p>
												<p className='text-black'>{scheme.benefits}</p>
											</div>

											<div>
												<p className='font-bold text-yellow-700 text-lg'>
													आवेदन की प्रक्रिया:
												</p>
												<p className='text-black'>{scheme.howToEnroll}</p>
											</div>
										</CardBody>
									</Card>
								</AccordionItem>
							))}
						</Accordion>
					</CardBody>
				</Card>

				{/* Add Scheme Modal */}
				<Modal
					isOpen={isOpen}
					scrollBehavior='inside'
					onOpenChange={() => setIsOpen(false)}
					size='3xl'>
					<ModalContent>
						<ModalHeader>नई योजना की जानकारी जोड़ें</ModalHeader>

						<ModalBody className='space-y-4'>
							<Input
								label='Scheme Name'
								size='lg'
								value={formData.name}
								onChange={(e) => handleChange('name', e.target.value)}
							/>

							<Input
								label='Scheme Eligibility'
								size='lg'
								value={formData.eligibility}
								onChange={(e) => handleChange('eligibility', e.target.value)}
							/>

							<Textarea
								label='Scheme Details'
								size='lg'
								value={formData.details}
								onChange={(e) => handleChange('details', e.target.value)}
							/>

							<Input
								label='Scheme Benefits'
								size='lg'
								value={formData.benefits}
								onChange={(e) => handleChange('benefits', e.target.value)}
							/>

							<Textarea
								label='How to Enroll'
								size='lg'
								value={formData.howToEnroll}
								onChange={(e) => handleChange('howToEnroll', e.target.value)}
							/>
						</ModalBody>

						<ModalFooter className='mb-10'>
							<Button
								color='danger'
								variant='light'
								onPress={() => setIsOpen(false)}>
								Cancel
							</Button>

							<Button color='primary' isLoading={loading} onPress={saveScheme}>
								Save Scheme
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</div>
		</>
	);
}
