'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Chatbot({ categoryId, categoryName }) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [sessionId, setSessionId] = useState('');
	const [userId, setUserId] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			let uid = localStorage.getItem('userId');
			if (!uid) {
				uid = uuidv4();
				localStorage.setItem('userId', uid);
			}
			setUserId(uid);

			let sid = sessionStorage.getItem('chatSessionId');
			if (!sid) {
				sid = uuidv4();
				sessionStorage.setItem('chatSessionId', sid);
			}
			setSessionId(sid);
		}
	}, []);

	useEffect(() => {
		if (isOpen && sessionId && userId) {
			loadChatHistory();
		}
	}, [isOpen, sessionId, userId]);

	const loadChatHistory = async () => {
		try {
			const response = await fetch(
				`/api/chat/history?sessionId=${sessionId}&userId=${userId}`,
			);
			if (response.ok) {
				const data = await response.json();
				setMessages(data.messages || []);
			}
		} catch (error) {
			console.error('Failed to load chat history:', error);
		}
	};

	const sendMessage = async () => {
		if (!inputValue.trim() || isLoading) return;

		const userMessage = {
			id: uuidv4(),
			sender: 'user',
			content: inputValue,
			timestamp: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: inputValue,
					sessionId,
					userId,
					categoryId: categoryId || '',
					categoryName: categoryName || '',
				}),
			});

			if (!response.ok) throw new Error('Failed to get response');

			const data = await response.json();

			const botMessage = {
				id: uuidv4(),
				sender: 'bot',
				content: data.response,
				timestamp: new Date().toISOString(),
			};

			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			console.error('Chat error:', error);
			const errorMessage = {
				id: uuidv4(),
				sender: 'bot',
				content: 'Sorry, I encountered an error. Please try again.',
				timestamp: new Date().toISOString(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<>
			<button
				className='fixed bottom-6 right-6 w-15 h-15 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg flex items-center justify-center text-2xl z-50 transition-transform duration-200 hover:scale-105 active:scale-95'
				onClick={() => setIsOpen(true)}>
				💬
			</button>

			{isOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end animate-fadeIn'
					onClick={() => setIsOpen(false)}>
					<div
						className='bg-white w-full max-h-[85vh] rounded-t-lg flex flex-col animate-slideUp'
						onClick={(e) => e.stopPropagation()}>
						<div className='flex items-center justify-between p-4 border-b border-gray-300 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg'>
							<h2 className='text-lg font-semibold'>
								{categoryName ? `Chat about ${categoryName}` : 'AI Assistant'}
							</h2>
							<button
								className='bg-white bg-opacity-20 border-none text-white w-8 h-8 rounded-full flex items-center justify-center text-lg transition-bg duration-200 hover:bg-opacity-30'
								onClick={() => setIsOpen(false)}>
								×
							</button>
						</div>

						<div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4'>
							{messages.length === 0 ? (
								<div className='flex items-center justify-center h-full text-gray-400 text-center p-8'>
									<p>
										Start a conversation! Ask me anything
										{categoryName ? ` about ${categoryName}` : ''}.
									</p>
								</div>
							) : (
								messages.map((message) => (
									<div
										key={message.id}
										className={`flex animate-messageSlide ${
											message.sender === 'user'
												? 'justify-end'
												: 'justify-start'
										}`}>
										<div
											className={`max-w-[75%] p-3 rounded-lg break-words ${
												message.sender === 'user'
													? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-lg'
													: 'bg-gray-200 text-gray-800 rounded-bl-lg'
											}`}>
											<p className='m-0 text-sm leading-6'>{message.content}</p>
											<span className='text-xs opacity-70 block mt-1'>
												{new Date(message.timestamp).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</span>
										</div>
									</div>
								))
							)}

							{isLoading && (
								<div className='flex justify-start'>
									<div className='bg-gray-200 text-gray-800 rounded-lg p-3'>
										<div className='flex gap-1 p-2'>
											<div className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'></div>
											<div className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'></div>
											<div className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'></div>
										</div>
									</div>
								</div>
							)}
						</div>

						<div className='border-t border-gray-300 p-4 flex gap-3 bg-white'>
							<textarea
								className='flex-1 border border-gray-300 rounded-lg p-3 text-sm outline-none resize-none max-h-24'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder='Type your message...'
								rows={1}
								disabled={isLoading}
							/>
							<button
								className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-11 h-11 flex items-center justify-center transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
								onClick={sendMessage}
								disabled={!inputValue.trim() || isLoading}>
								➤
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
