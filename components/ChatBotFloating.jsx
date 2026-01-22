'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChatbot } from '@/hooks/useChatbot';
import { useEffect, useRef, useState } from 'react';
import { Dot } from 'lucide-react';

export default function ChatbotFloating({ context, buttonLabel = 'Chat' }) {
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
	}, [messages, autoScroll]);

	return (
		<>
			{/* Floating Button */}
			{!open && (
				<button
					className='fixed bottom-10 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-full shadow-xl active:scale-95 transition'
					onClick={() => setOpen(true)}>
					{buttonLabel}
				</button>
			)}

			{/* Chat Window */}
			{open && (
				<div
					className='
						fixed bottom-20 left-2 right-2 sm:left-auto sm:right-4 sm:w-96 h-4/5
						max-h-[75vh]
						bg-white rounded-xl shadow-2xl
						flex flex-col z-50
						border border-gray-200 overflow-hidden
          				'>
					{/* Header */}
					<div className='bg-green-600 text-white px-4 py-3 flex items-center justify-between'>
						<div className='flex flex-row items-center gap-3'>
							<Dot className='text-white text-lg' />
							<p className='font-semibold leading-none'>तमोहर कृषि विशेषज्ञ</p>
							{/* <p className='text-xs opacity-90'>कृषि • स्वास्थ्य • शिक्षा</p> */}
						</div>
						<button
							onClick={() => setOpen(false)}
							className='text-white text-lg leading-none'>
							✕
						</button>
					</div>

					{/* Messages */}
					<div
						className='flex-1 overflow-y-auto px-3 py-4 space-y-4 text-sm bg-gray-50'
						style={{ WebkitOverflowScrolling: 'touch' }}
						onScroll={(e) => {
							const el = e.currentTarget;
							const isAtBottom =
								el.scrollHeight - el.scrollTop - el.clientHeight < 60;
							setAutoScroll(isAtBottom);
						}}>
						{messages.map((m, i) => (
							<div
								key={i}
								className={`flex ${
									m.role === 'user' ? 'justify-end' : 'justify-start'
								}`}>
								<div
									className={`max-w-[90%] px-4 py-3 rounded-xl leading-[1.75] break-words ${
										m.role === 'user'
											? 'bg-green-600 text-white rounded-br-sm'
											: 'bg-white text-gray-800 rounded-bl-sm shadow'
									}`}>
									<ReactMarkdown
										remarkPlugins={[remarkGfm]}
										components={{
											h3: ({ children }) => (
												<h3 className='text-green-700 font-semibold border-l-4 border-green-500 pl-2 mb-1'>
													{children}
												</h3>
											),
											ul: ({ children }) => (
												<ul className='list-disc pl-5 space-y-1'>{children}</ul>
											),
										}}>
										{m.content}
									</ReactMarkdown>
								</div>
							</div>
						))}

						{loading && (
							<div className='flex justify-start'>
								<div className='bg-white px-4 py-3 rounded-xl shadow'>
									<div className='flex gap-1.5 items-center'>
										<span className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'></span>
										<span className='w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]'></span>
										<span className='w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]'></span>
									</div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<form
						className='p-3 border-t bg-white flex gap-2'
						onSubmit={(e) => {
							e.preventDefault();
							if (!input.trim()) return;
							sendMessage(input);
							setInput('');
						}}>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder='अपनी समस्या लिखें…'
							className='flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
						/>
						<button
							disabled={loading}
							className='bg-green-600 text-white px-4 py-2 rounded-full disabled:opacity-50'>
							भेजें
						</button>
					</form>
				</div>
			)}
		</>
	);
}
