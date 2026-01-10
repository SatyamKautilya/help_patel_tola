'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
	CardBody,
	Card,
} from '@heroui/react';

import DiseaseCard from './DiseaseCard';
import { hideBackButton } from '@/hooks/utils';
import Image from 'next/image';
const page = () => {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};
	const [name, setName] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [symptoms, setSymptoms] = useState('');
	const [carePoints, setCarePoints] = useState(['']);
	const [how, setHow] = useState(['']);
	const [addInfo, setAddInfo] = useState(false);
	const [auth, setAuth] = useState('');
	const [dontCare, setDontCare] = useState(['']);
	const [saving, setSaving] = useState(0);
	const [sops, setSops] = useState([]);

	const addCarePoint = () => {
		setCarePoints([...carePoints, '']);
	};
	const addHow = () => {
		setHow([...how, '']);
	};

	const addDontCare = () => {
		setDontCare([...dontCare, '']);
	};

	const removeCarePoint = (index) => {
		setCarePoints(carePoints.filter((_, i) => i !== index));
	};
	const removeHowPoint = (index) => {
		setHow(how.filter((_, i) => i !== index));
	};
	const removeDontCarePoint = (index) => {
		setDontCare(dontCare.filter((_, i) => i !== index));
	};

	const updateCarePoint = (index, value) => {
		const updated = [...carePoints];
		updated[index] = value;
		setCarePoints(updated);
	};
	const updateHowPoint = (index, value) => {
		const updated = [...how];
		updated[index] = value;
		setHow(updated);
	};
	const updateDontCarePoint = (index, value) => {
		const updated = [...dontCare];
		updated[index] = value;
		setDontCare(updated);
	};

	const onClose = () => setIsOpen(false);

	useEffect(() => {
		if (auth === 'amit') setIsOpen(true);
	}, [auth]);

	const getSop = async () => {
		const response = await fetch('/api/subcategory/hospitals?name=sops');

		if (response.ok) {
			const data = await response.json();
			return data.sops;
		}
	};

	useEffect(() => {
		const dothis = async () => {
			const savesop = await getSop();

			setSops(savesop);
		};
		dothis();
	}, []);

	return (
		<>
			<div>
				<header className='fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40'></header>
				<header className='fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40'>
					<div className='flex flex-col items-center pt-7'>
						<Image
							src='https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png'
							alt='Health Topics'
							width={250}
							height={56}
							priority
						/>
						<div className='mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent' />
					</div>
				</header>
				<div className='pt-24'>
					{Array.isArray(sops)
						? sops.map((sop) => {
								return <DiseaseCard {...{ disease: sop }} />;
						  })
						: null}
				</div>
			</div>
		</>
	);
};

export default page;
