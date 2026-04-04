'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles } from 'lucide-react';

const VillageHelpGuide = () => {
	const router = useRouter();
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClickCapture={() => router.push('/village-help-guide')}
			className='relative overflow-hidden w-full p-4 rounded-2xl bg-purple-600/50 backdrop-blur-md text-white font-bold shadow-lg hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all duration-300 cursor-pointer border border-purple-400/30 flex items-center justify-center space-x-3 group'
		>
			{/* Decorative Abstract Glows */}
			<div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/20 transition-all duration-500"></div>
			<div className="absolute -left-6 -bottom-6 w-20 h-20 bg-purple-300/20 rounded-full blur-xl pointer-events-none group-hover:bg-purple-300/30 transition-all duration-500"></div>

			{/* Decorative Sparkles */}
			<div className="absolute right-4 top-2 opacity-30 pointer-events-none">
				<Sparkles size={20} className="text-purple-100 animate-pulse" />
			</div>
			<div className="absolute left-6 bottom-1 opacity-20 pointer-events-none">
				<Sparkles size={14} className="text-purple-100" />
			</div>

			{/* Main Content */}
			<div className="p-2 bg-white/20 rounded-full backdrop-blur-sm z-10 relative shadow-inner">
				<HelpCircle size={24} className="text-purple-50" />
			</div>
			<p className='text-lg font-bold z-10 relative text-purple-50 tracking-wide drop-shadow-md'>
				ग्राम सहायता गाइड
			</p>
		</motion.div>
	);
};

export default VillageHelpGuide;
