'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Leaf } from 'lucide-react';

const VillageHelpGuide = () => {
	const router = useRouter();
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClickCapture={() => router.push('/village-help-guide')}
			className='relative overflow-hidden w-full p-4 rounded-2xl bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500 text-white font-bold shadow-lg hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] transition-all duration-300 cursor-pointer border border-green-400/30 flex items-center justify-center space-x-3'
		>
			{/* Subtle background decorations */}
			<div className="absolute -right-4 -top-6 opacity-20 pointer-events-none">
				<Leaf size={80} className="text-emerald-200" />
			</div>
			<div className="absolute -left-4 -bottom-4 opacity-10 pointer-events-none -rotate-45">
				<Leaf size={60} className="text-emerald-100" />
			</div>

			<div className="p-2 bg-white/20 rounded-full backdrop-blur-sm z-10 relative shadow-inner">
				<HelpCircle size={24} className="text-emerald-50" />
			</div>
			<p className='text-lg font-bold z-10 relative text-emerald-50 tracking-wide drop-shadow-md'>
				ग्राम सहायता गाइड
			</p>
		</motion.div>
	);
};

export default VillageHelpGuide;
