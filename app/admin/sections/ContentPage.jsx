import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import { FileText, Type, Plus, Contact } from 'lucide-react';
import AddContactModal from '../content_editors/AddContactModal';
import CaseStory from '../content_editors/CaseStory';
import TreatmentProcessModal from '../content_editors/TreatmentProcessModal';
import AddMeetingDetails from '../content_editors/AddMeetingDetails';

const sectionModals = {
	contact: AddContactModal,
	meetingDetails: AddMeetingDetails,
	treatmentProcess: TreatmentProcessModal,
	successfulTreatment: CaseStory,
};

const ContentPage = () => {
	const sections = [
		{
			id: 'contact',
			title: 'महत्वपूर्ण संपर्क',
			icon: <Contact />,
			desc: 'गाँव के लिए उपयोगी संपर्क जानकारी जोड़ें',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			id: 'meetingDetails',
			title: 'बैठक का विवरण',
			icon: <FileText />,
			desc: 'गाँव की बैठकों का रिकॉर्ड जोड़े',
			gradient: 'from-emerald-500 to-teal-500',
		},
		{
			id: 'treatmentProcess',
			title: 'आदर्श उपचार प्रक्रिया',
			icon: <Type />,
			desc: 'बीमारी की चरणबद्ध उपचार जानकारी जोड़ें',
			gradient: 'from-purple-500 to-pink-500',
		},
		{
			id: 'successfulTreatment',
			title: 'सफल इलाज की कहानी',
			icon: <FileText />,
			desc: 'इलाज़ की प्रेरणात्मक कहानियाँ जोड़े',
			gradient: 'from-orange-500 to-red-500',
		},
	];
	const [activeModalId, setActiveModalId] = useState(null);
	const handleAddContent = (id) => {
		setActiveModalId(id);
	};

	return (
		<>
			{activeModalId && sectionModals[activeModalId] && (
				<>
					{React.createElement(sectionModals[activeModalId], {
						isOpen: true,
						onOpenChange: () => setActiveModalId(null),
						onSuccess: () => {
							setActiveModalId(null);
						},
					})}
				</>
			)}

			<div className='space-y-8'>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-8 flex flex-col items-center'>
					<h1 className='text-2xl font-bold mb-2'>
						जानकारी अपलोड करने के लिए प्रभाग चुनें।
					</h1>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{sections.map((section, idx) => (
						<motion.div
							key={section.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: idx * 0.1 }}
							className='group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 cursor-pointer'>
							{/* Gradient overlay */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
							/>

							<div className='relative z-10 flex items-center justify-between'>
								<div className='flex items-center gap-4'>
									<motion.div
										whileHover={{ scale: 1.1, rotate: 5 }}
										className={`p-4 bg-gradient-to-br ${section.gradient} rounded-xl text-white shadow-lg`}>
										{section.icon}
									</motion.div>
									<div>
										<h4 className='font-bold text-lg group-hover:text-white transition-colors'>
											{section.title}
										</h4>
										<p className='text-xs text-slate-500 group-hover:text-slate-400 transition-colors'>
											{section.desc}
										</p>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.1, rotate: 90 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleAddContent(section.id)}
									className='p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 border border-white/10 rounded-xl transition-all duration-300 text-white'>
									<Plus size={20} />
								</motion.button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</>
	);
};

export default ContentPage;
