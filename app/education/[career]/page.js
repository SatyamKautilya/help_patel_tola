'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import {
	ArrowLeft,
	ChevronDown,
	Sparkles,
	Send,
	X,
	Lightbulb,
	CheckCircle2,
	Info,
	Bot,
} from 'lucide-react';
import { careers } from '../careerData';

/* ─── Timeline Node ─── */
function TimelineNode({
	milestone,
	index,
	isActive,
	isLast,
	onToggle,
	gradient,
	cardBg,
	cardBorder,
}) {
	return (
		<div className='relative flex gap-3 sm:gap-4'>
			{/* Vertical line + dot */}
			<div className='flex flex-col items-center pt-1'>
				<motion.button
					type='button'
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
					whileTap={{ scale: 0.85 }}
					onClick={onToggle}
					className={`relative z-10 w-11 h-11 rounded-full border-2 flex items-center justify-center text-lg shrink-0 transition-all duration-300 ${
						isActive
							? `border-white/90 bg-gradient-to-br ${gradient} shadow-lg shadow-black/10 timeline-node-active`
							: `border-white/80 bg-gradient-to-br ${cardBg} shadow-sm ring-2 ring-white/90`
					}`}>
					<span className='text-base drop-shadow-sm'>{milestone.emoji}</span>
					{isActive && (
						<motion.div
							layoutId='activeRing'
							className={`absolute inset-[-4px] rounded-full border-2 border-white/50`}
							transition={{ type: 'spring', stiffness: 300 }}
						/>
					)}
				</motion.button>
				{!isLast && (
					<motion.div
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
						className={`w-[3px] flex-1 min-h-[28px] origin-top rounded-full bg-gradient-to-b ${gradient} opacity-[0.45]`}
					/>
				)}
			</div>

			{/* Content */}
			<div
				className={`flex-1 pb-6 min-w-0 rounded-2xl border bg-gradient-to-br p-3.5 shadow-sm transition-shadow duration-300 ${
					isActive ? `${cardBorder} ${cardBg} shadow-md ring-1 ring-white/70` : `${cardBorder} ${cardBg} ring-1 ring-white/50`
				}`}>
				<motion.button
					type='button'
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 + 0.35 }}
					onClick={onToggle}
					className='w-full text-left group'>
					<div className='flex items-start justify-between gap-2'>
						<div className='min-w-0'>
							<span
								className={`text-[10px] font-bold uppercase tracking-widest ${
									isActive
										? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
										: 'text-slate-500'
								}`}>
								चरण {milestone.step}
							</span>
							<h3
								className={`text-[15px] font-bold leading-snug mt-0.5 transition-colors ${
									isActive ? 'text-slate-900' : 'text-slate-700'
								}`}>
								{milestone.title}
							</h3>
							<p
								className={`text-xs mt-0.5 font-medium ${
									isActive ? 'text-slate-600' : 'text-slate-500'
								}`}>
								{milestone.period}
							</p>
						</div>
						<motion.div
							animate={{ rotate: isActive ? 180 : 0 }}
							transition={{ duration: 0.2 }}
							className='mt-2 shrink-0'>
							<ChevronDown
								size={16}
								className={
									isActive
										? `text-slate-600`
										: 'text-slate-400 group-hover:text-slate-600'
								}
							/>
						</motion.div>
					</div>
					{!isActive && (
						<p className='text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed'>
							{milestone.summary}
						</p>
					)}
				</motion.button>

				{/* Expanded Detail */}
				<AnimatePresence>
					{isActive && (
						<MilestoneDetail
							milestone={milestone}
							gradient={gradient}
							cardBorder={cardBorder}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

/* ─── Milestone Detail (expanded view) ─── */
function MilestoneDetail({ milestone, gradient, cardBorder }) {
	const [showAI, setShowAI] = useState(false);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: 'auto' }}
				exit={{ opacity: 0, height: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className='overflow-hidden'>
				<div
					className={`mt-3 rounded-xl bg-white/95 border ${cardBorder ?? 'border-slate-200/90'} shadow-inner p-4 space-y-4 ring-1 ring-white/80`}>
					{/* Summary */}
					<p className='text-sm text-slate-600 leading-relaxed'>
						{milestone.summary}
					</p>

					{/* Details */}
					<div className='text-sm text-slate-600 leading-relaxed whitespace-pre-line'>
						{milestone.details}
					</div>

					{/* Tips */}
					{milestone.tips?.length > 0 && (
						<div className='space-y-2 rounded-xl border border-amber-200/70 bg-gradient-to-br from-amber-50/90 to-orange-50/40 p-3'>
							<div className='flex items-center gap-1.5 text-amber-800'>
								<span
									className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}>
									<Lightbulb size={14} strokeWidth={2} />
								</span>
								<span className='text-xs font-semibold uppercase tracking-wider'>
									सुझाव
								</span>
							</div>
							<ul className='space-y-1.5'>
								{milestone.tips.map((tip, i) => (
									<li
										key={i}
										className='flex items-start gap-2 text-xs text-slate-600 leading-relaxed'>
										<CheckCircle2
											size={13}
											className='text-emerald-600 mt-0.5 shrink-0'
										/>
										<span>{tip}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Important Info */}
					{milestone.importantInfo && (
						<div
							className={`flex items-start gap-2.5 p-3 rounded-xl border ${cardBorder ?? 'border-slate-200'} bg-white/90`}>
							<div
								className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}>
								<Info size={15} className='text-white' strokeWidth={2} />
							</div>
							<p className='text-xs text-slate-700 leading-relaxed pt-0.5'>
								{milestone.importantInfo}
							</p>
						</div>
					)}

					{/* AI Button */}
					<motion.button
						type='button'
						whileTap={{ scale: 0.97 }}
						onClick={() => setShowAI(true)}
						className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold text-sm shadow-lg shadow-black/15 transition-all active:shadow-md`}>
						<Bot size={16} />
						<span>AI से पूछें</span>
						<Sparkles size={14} />
					</motion.button>
				</div>
			</motion.div>

			{/* AI Chat Sheet */}
			<AnimatePresence>
				{showAI && (
					<AIChatSheet
						milestone={milestone}
						onClose={() => setShowAI(false)}
						gradient={gradient}
					/>
				)}
			</AnimatePresence>
		</>
	);
}

/* ─── AI Chat Bottom Sheet ─── */
function AIChatSheet({ milestone, onClose, gradient }) {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [streamingText, setStreamingText] = useState('');
	const chatEndRef = useRef(null);
	const inputRef = useRef(null);

	const scrollToBottom = useCallback(() => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages, streamingText, scrollToBottom]);

	const sendMessage = async (text) => {
		const msg = text || input.trim();
		if (!msg || isLoading) return;

		const userMsg = { role: 'user', content: msg };
		const newMessages = [...messages, userMsg];
		setMessages(newMessages);
		setInput('');
		setIsLoading(true);
		setStreamingText('');

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: newMessages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
					context: milestone.aiContext,
				}),
			});

			if (!res.ok) throw new Error('AI response failed');

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let fullText = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const chunk = decoder.decode(value, { stream: true });
				fullText += chunk;
				setStreamingText(fullText);
			}

			setMessages((prev) => [
				...prev,
				{ role: 'assistant', content: fullText },
			]);
			setStreamingText('');
		} catch {
			setMessages((prev) => [
				...prev,
				{
					role: 'assistant',
					content:
						'क्षमा करें, कोई त्रुटि हुई। कृपया पुनः प्रयास करें।',
				},
			]);
			setStreamingText('');
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-sm flex items-end'
			onClick={onClose}>
			<motion.div
				initial={{ y: '100%' }}
				animate={{ y: 0 }}
				exit={{ y: '100%' }}
				transition={{ type: 'spring', damping: 28, stiffness: 300 }}
				onClick={(e) => e.stopPropagation()}
				className='w-full max-h-[88vh] bg-white rounded-t-3xl flex flex-col border-t border-slate-200 shadow-[0_-8px_40px_rgba(15,23,42,0.12)] overflow-hidden'>
				{/* Drag Handle */}
				<div className='flex justify-center pt-2 pb-1'>
					<div className='w-10 h-1 rounded-full bg-slate-200' />
				</div>

				{/* Header */}
				<div className='flex items-center justify-between px-4 py-2.5 border-b border-slate-100'>
					<div className='flex items-center gap-2 min-w-0'>
						<div
							className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-sm text-white`}>
							<Bot size={15} />
						</div>
						<div className='min-w-0'>
							<h3 className='text-sm font-bold text-slate-900 truncate'>
								AI सहायक
							</h3>
							<p className='text-[10px] text-slate-500 truncate'>
								{milestone.title} के बारे में पूछें
							</p>
						</div>
					</div>
					<button
						type='button'
						onClick={onClose}
						className='w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center active:scale-90 transition-transform'>
						<X size={16} />
					</button>
				</div>

				{/* Chat Messages */}
				<div className='flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0'>
					{messages.length === 0 && !streamingText && (
						<div className='text-center py-6'>
							<div className='text-3xl mb-3'>
								{milestone.emoji}
							</div>
							<p className='text-sm text-slate-600 mb-1'>
								{milestone.title}
							</p>
							<p className='text-xs text-slate-400'>
								इस milestone के बारे में कोई भी सवाल पूछें
							</p>
						</div>
					)}

					{messages.map((msg, i) => (
						<div
							key={i}
							className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
							<div
								className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
									msg.role === 'user'
										? `bg-gradient-to-r ${gradient} text-white rounded-br-md`
										: 'bg-slate-100 text-slate-700 rounded-bl-md border border-slate-200/80'
								}`}>
								{msg.role === 'assistant' ? (
									<div className='prose prose-sm max-w-none [&_p]:text-[13px] [&_p]:text-slate-700 [&_p]:leading-relaxed [&_li]:text-[13px] [&_li]:text-slate-600 [&_strong]:text-slate-900 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-sm [&_ul]:my-1 [&_ol]:my-1 [&_p]:my-1'>
										<ReactMarkdown>
											{msg.content}
										</ReactMarkdown>
									</div>
								) : (
									msg.content
								)}
							</div>
						</div>
					))}

					{/* Streaming text */}
					{streamingText && (
						<div className='flex justify-start'>
							<div className='max-w-[85%] rounded-2xl rounded-bl-md px-3.5 py-2.5 bg-slate-100 border border-slate-200/80 text-[13px] leading-relaxed'>
								<div className='prose prose-sm max-w-none [&_p]:text-[13px] [&_p]:text-slate-700 [&_p]:leading-relaxed [&_li]:text-[13px] [&_li]:text-slate-600 [&_strong]:text-slate-900 [&_p]:my-1'>
									<ReactMarkdown>
										{streamingText}
									</ReactMarkdown>
								</div>
							</div>
						</div>
					)}

					{/* Loading dots */}
					{isLoading && !streamingText && (
						<div className='flex justify-start'>
							<div className='rounded-2xl rounded-bl-md px-4 py-3 bg-slate-100 border border-slate-200/80'>
								<div className='flex gap-1.5'>
									<div className='w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]' />
									<div className='w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]' />
									<div className='w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]' />
								</div>
							</div>
						</div>
					)}

					<div ref={chatEndRef} />
				</div>

				{/* Suggested Questions */}
				{messages.length === 0 &&
					milestone.suggestedQuestions?.length > 0 && (
						<div className='px-4 py-2 border-t border-slate-100'>
							<div className='flex gap-2 overflow-x-auto pb-1 no-scrollbar'>
								{milestone.suggestedQuestions.map((q, i) => (
									<button
										type='button'
										key={i}
										onClick={() => sendMessage(q)}
										className='shrink-0 text-[11px] text-cyan-800 bg-cyan-50 border border-cyan-200/90 rounded-full px-3 py-1.5 active:scale-95 transition-transform whitespace-nowrap'>
										{q}
									</button>
								))}
							</div>
						</div>
					)}

				{/* Input Area */}
				<div className='px-3 pt-3 pb-[env(safe-area-inset-bottom,24px)] border-t border-slate-100 bg-slate-50/95'>
					<div className='flex items-end gap-2 mb-4'>
						<textarea
							ref={inputRef}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder='अपना सवाल लिखें...'
							rows={1}
							disabled={isLoading}
							className='flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none max-h-24 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-colors disabled:opacity-50'
						/>
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => sendMessage()}
							disabled={!input.trim() || isLoading}
							className={`w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity`}>
							<Send size={16} />
						</motion.button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

/* ─── Main Page ─── */
export default function CareerTimelinePage() {
	const router = useRouter();
	const params = useParams();
	const career = careers[params.career];
	const [activeId, setActiveId] = useState(null);

	if (!career) {
		return (
			<div className='min-h-screen bg-gradient-to-b from-slate-100 via-white to-sky-50/30 flex items-center justify-center text-slate-800'>
				<div className='text-center'>
					<p className='text-lg font-medium text-slate-900'>Career path not found</p>
					<button
						type='button'
						onClick={() => router.push('/education')}
						className='mt-4 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 shadow-sm'>
						वापस जाएं
					</button>
				</div>
			</div>
		);
	}

	const toggleMilestone = (id) => {
		setActiveId((prev) => (prev === id ? null : id));
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-slate-100 via-white to-sky-50/30 text-slate-800 pb-4'>
			{/* Header */}
			<div className='sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						type='button'
						onClick={() => router.push('/education')}
						className='w-9 h-9 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center justify-center active:scale-90 transition-transform shadow-sm'>
						<ArrowLeft size={18} />
					</button>
					<div className='flex items-center gap-2 min-w-0'>
						<span className='text-xl'>{career.emoji}</span>
						<div className='min-w-0'>
							<h1 className='text-base font-bold truncate text-slate-900'>
								{career.title}
							</h1>
							<p className='text-[10px] text-slate-500'>
								{career.milestones.length} चरण • 10वीं से शुरू
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Career Hero */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='px-5 pt-5 pb-2'>
				<div
					className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${career.cardBg} border ${career.cardBorder ?? 'border-slate-200/90'} shadow-[0_10px_40px_-12px_rgba(15,23,42,0.08)] ring-1 ring-white/70 p-5`}>
					<div
						className={`absolute -top-16 -right-14 w-44 h-44 rounded-full bg-gradient-to-br ${career.gradient} opacity-[0.28] blur-3xl`}
					/>
					<div
						className={`absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-gradient-to-tr ${career.gradient} opacity-[0.18] blur-3xl`}
					/>
					<div className='relative'>
						<div className='text-4xl mb-2'>{career.emoji}</div>
						<h2 className='text-xl font-bold text-slate-900'>{career.title}</h2>
						<p className='text-xs text-slate-500 mt-1'>
							{career.titleEn}
						</p>
						<p className='text-sm text-slate-600 mt-2 leading-relaxed'>
							{career.description}
						</p>
						<div className='flex items-center gap-2 mt-3'>
							<div
								className={`text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${career.gradient} text-white shadow-sm`}>
								{career.milestones.length} चरण
							</div>
							<div className='text-[10px] text-slate-700 px-2.5 py-1 rounded-full border border-white/70 bg-white/55 backdrop-blur-[2px] shadow-sm'>
								AI सहायक उपलब्ध
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Timeline Label */}
			<div className='px-5 pt-4 pb-3'>
				<div
					className={`inline-flex items-center gap-2.5 rounded-full border ${career.cardBorder} bg-gradient-to-r ${career.cardBg} px-3.5 py-2 shadow-sm ring-1 ring-white/70`}>
					<div
						className={`h-5 w-1.5 rounded-full bg-gradient-to-b ${career.gradient} shadow-sm`}
					/>
					<span className='text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent'>
						करियर रोडमैप
					</span>
					<span
						className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${career.gradient} text-white shadow-sm`}>
						{career.milestones.length} चरण
					</span>
				</div>
			</div>

			{/* Timeline */}
			<div className='px-5 pb-12'>
				<div className='flex flex-col gap-5'>
					{career.milestones.map((milestone, index) => (
						<TimelineNode
							key={milestone.id}
							milestone={milestone}
							index={index}
							isActive={activeId === milestone.id}
							isLast={index === career.milestones.length - 1}
							onToggle={() => toggleMilestone(milestone.id)}
							gradient={career.gradient}
							cardBg={career.cardBg}
							cardBorder={career.cardBorder}
						/>
					))}

					{/* End marker */}
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							delay: career.milestones.length * 0.1 + 0.5,
							type: 'spring',
						}}
						className={`flex items-center gap-3 rounded-2xl border ${career.cardBorder} bg-gradient-to-br ${career.cardBg} p-3.5 shadow-sm ring-1 ring-white/60`}>
						<div
							className={`w-12 h-12 rounded-full bg-gradient-to-br ${career.gradient} flex items-center justify-center shadow-lg shadow-black/15 text-white ring-2 ring-white/50`}>
							<span className='text-lg'>🎉</span>
						</div>
						<div className='min-w-0'>
							<p
								className={`text-sm font-bold bg-gradient-to-r ${career.gradient} bg-clip-text text-transparent`}>
								लक्ष्य प्राप्त!
							</p>
							<p className='text-[11px] text-slate-600 mt-0.5'>
								आप {career.title} बनने की राह पर हैं
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
