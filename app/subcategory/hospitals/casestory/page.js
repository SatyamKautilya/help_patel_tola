'use client';

import { Button } from '@heroui/react';
import { useState } from 'react';
import AddContentModal from './AddContentModal';
import { useRouter } from 'next/navigation';

export default function Page() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	return (
		<>
			<div className='fixed top-0  left-0 right-0 z-50 flex flex-row pb-4 pt-12 border-b-2 bg-slate-100 items-center'>
				<Button
					color='primary'
					size='lg'
					className='ml-6 text-xl font-bold'
					onPress={() => router.back()}>
					← Back
				</Button>
			</div>
			<div className='min-h-screen flex items-center justify-center'>
				<Button color='primary' onPress={() => setOpen(true)}>
					Open Modal
				</Button>

				<AddContentModal isOpen={open} onClose={() => setOpen(false)} />
			</div>
		</>
	);
}
