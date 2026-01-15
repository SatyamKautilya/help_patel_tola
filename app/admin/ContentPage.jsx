import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, FileText, Type, LucideImage, Plus } from 'lucide-react';

const ContentPage = () => {
	const sections = [
		{
			id: 'hero',
			title: 'Hero Section',
			icon: <Layout />,
			desc: 'Main landing page text and banners',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			id: 'about',
			title: 'About Us',
			icon: <FileText />,
			desc: 'Company mission and vision content',
			gradient: 'from-emerald-500 to-teal-500',
		},
		{
			id: 'features',
			title: 'Features List',
			icon: <Type />,
			desc: 'Add or edit service offerings',
			gradient: 'from-purple-500 to-pink-500',
		},
		{
			id: 'gallery',
			title: 'Media Gallery',
			icon: <LucideImage />,
			desc: 'Upload images for the showcase',
			gradient: 'from-orange-500 to-red-500',
		},
	];

	const handleAddContent = (id) => {
		alert(`Opening Editor for: ${id}`);
	};

	return (
		<div className='space-y-8'>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-8'>
				<h1 className='text-4xl font-bold mb-2'>Content Canvas</h1>
				<p className='text-slate-400 text-lg'>
					Select a section to modify Tamohar live content.
				</p>
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
	);
};

export default ContentPage;
