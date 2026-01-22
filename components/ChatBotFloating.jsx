'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChatbot } from '@/hooks/useChatbot';
import { useEffect, useRef, useState } from 'react';
import { Dot, Send, X, MessageCircle, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatbotFloating({ context, buttonLabel = 'सहायता' }) {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');
	const messagesEndRef = useRef(null);
	const { messages, sendMessage, loading } = useChatbot(context);
	const [autoScroll, setAutoScroll] = useState(true);

	useEffect(() => {
		if (!autoScroll) return;
		requestAnimationFrame(() => {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		});
	}, [messages, autoScroll, loading]);

	return (
		<>
			{/* 🔹 Floating Button */}
			<AnimatePresence>
				{!open && (
					<motion.button
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='fixed bottom-12 right-6 z-50 flex items-center gap-2 bg-gradient-to-tr from-green-600 to-emerald-500 text-white px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(22,163,74,0.4)] transition-all'
						onClick={() => setOpen(true)}>
						<MessageCircle className='w-6 h-6' />
						<span className='font-medium'>{buttonLabel}</span>
					</motion.button>
				)}
			</AnimatePresence>

			{/* 🔹 Chat Window */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						className='
                            fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[400px] h-[75vh]
                            max-h-[700px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                            flex flex-col z-50 border border-white/40 overflow-hidden
                        '>
						{/* Header */}
						<div className='bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-4 flex items-center justify-between shadow-lg'>
							<div className='flex items-center gap-3'>
								<div className='relative'>
									<div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md'>
										🌱
									</div>
									<span className='absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-green-600 rounded-full'></span>
								</div>
								<div>
									<p className='font-bold text-lg tracking-tight'>
										तमोहर विशेषज्ञ
									</p>
									<p className='text-[10px] uppercase tracking-widest opacity-80 font-medium'>
										Online AI Assistant
									</p>
								</div>
							</div>
							<button
								onClick={() => setOpen(false)}
								className='p-2 hover:bg-white/10 rounded-full transition-colors'>
								<X className='w-5 h-5' />
							</button>
						</div>

						{/* Messages Area */}
						<div
							className='flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-transparent'
							onScroll={(e) => {
								const el = e.currentTarget;
								const isAtBottom =
									el.scrollHeight - el.scrollTop - el.clientHeight < 100;
								setAutoScroll(isAtBottom);
							}}>
							{messages.length === 0 && (
								<div className='text-center py-10'>
									<div className='bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4'>
										<MessageCircle className='text-green-600 w-8 h-8' />
									</div>
									<p className='text-gray-500 font-medium'>
										नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?
									</p>
								</div>
							)}

							{messages.map((m, i) => (
								<motion.div
									initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
									animate={{ opacity: 1, x: 0 }}
									key={i}
									className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
									<div
										className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm leading-relaxed text-[15px] ${
											m.role === 'user'
												? 'bg-green-600 text-white rounded-tr-none'
												: 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
										}`}>
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												h3: ({ children }) => (
													<h3 className='font-bold text-green-700 mt-2 mb-1'>
														{children}
													</h3>
												),
												ul: ({ children }) => (
													<ul className='list-disc pl-4 space-y-1 my-2'>
														{children}
													</ul>
												),
												p: ({ children }) => (
													<p className='mb-2 last:mb-0'>{children}</p>
												),
											}}>
											{m.content}
										</ReactMarkdown>
									</div>
								</motion.div>
							))}

							{loading && (
								<div className='flex justify-start'>
									<div className='bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm'>
										<div className='flex gap-1'>
											<motion.span
												animate={{ opacity: [0.3, 1, 0.3] }}
												transition={{ repeat: Infinity, duration: 1 }}
												className='w-1.5 h-1.5 bg-green-500 rounded-full'></motion.span>
											<motion.span
												animate={{ opacity: [0.3, 1, 0.3] }}
												transition={{
													repeat: Infinity,
													duration: 1,
													delay: 0.2,
												}}
												className='w-1.5 h-1.5 bg-green-500 rounded-full'></motion.span>
											<motion.span
												animate={{ opacity: [0.3, 1, 0.3] }}
												transition={{
													repeat: Infinity,
													duration: 1,
													delay: 0.4,
												}}
												className='w-1.5 h-1.5 bg-green-500 rounded-full'></motion.span>
										</div>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Input Area */}
						<div className='p-4 bg-white/50 border-t border-gray-100'>
							<form
								className='relative flex items-center gap-2'
								onSubmit={(e) => {
									e.preventDefault();
									if (!input.trim()) return;
									sendMessage(input);
									setInput('');
								}}>
								<input
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder='अपनी समस्या यहाँ लिखें...'
									className='w-full bg-gray-100/80 border-none rounded-2xl pl-4 pr-12 py-3.5 text-[15px] focus:ring-2 focus:ring-green-500/20 transition-all outline-none'
								/>
								<button
									disabled={loading || !input.trim()}
									className='absolute right-2 p-2 bg-green-600 text-white rounded-xl disabled:opacity-40 disabled:grayscale transition-all active:scale-90'>
									<Send className='w-5 h-5' />
								</button>
							</form>
							<p className='text-[10px] text-center text-gray-400 mt-3 font-medium uppercase tracking-tighter'>
								Powered by Tamohar AI
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
