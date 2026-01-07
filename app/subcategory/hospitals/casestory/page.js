'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useEffect, useState } from 'react';
import AddContentModal from './AddContentModal';
import { useRouter } from 'next/navigation';
import CaseStoryPage from './CaseStoryPage';
import { hideBackButton } from '@/hooks/utils';

export default function Page() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [stories, setStories] = useState([]);
	const [pass, setPass] = useState('');
	const [openPass, setOpenPass] = useState(false);

	const getStory = async () => {
		try {
			const res = await fetch('/api/subcategory/hospitals?name=content');

			if (!res.ok) {
				throw new Error('Failed to fetch stories');
			}

			const storiesFromApi = await res.json();

			setStories(storiesFromApi);
			return storiesFromApi;
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	useEffect(() => {
		getStory();
	}, []);
	useEffect(() => {
		if (pass === 'abdc') {
			setOpen(true);
		} else setOpen(false);
	}, [pass]);

	return (
		<>
			<div
				className={` ${
					hideBackButton() ? 'hidden' : ''
				} fixed top-0  left-0 right-0 z-50 flex flex-row pb-4 pt-12 border-b-2 bg-slate-100 items-center`}>
				<Button
					color='primary'
					size='lg'
					className='ml-6 text-xl font-bold'
					onPress={() => router.back()}>
					← Back
				</Button>
			</div>
			<div className='min-h-screen mt-20 justify-center'>
				<div className='flex flex-row justify-center'>
					<Button
						color='primary'
						size='lg'
						variant='flat'
						onPress={() => setOpenPass(true)}>
						+ स्टोरी एड करें
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
								<label className='text-2xl mb-4'>
									संपादक महोदय, आपका स्वागत है!🌺
								</label>
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

				<CaseStoryPage props={stories} />
				<AddContentModal isOpen={open} onClose={() => setOpen(false)} />
			</div>
		</>
	);
}
