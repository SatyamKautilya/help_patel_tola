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
function TimelineNode({ milestone, index, isActive, isLast, onToggle, gradient }) {
	return (
		<div className='relative flex gap-4'>
			{/* Vertical line + dot */}
			<div className='flex flex-col items-center'>
				<motion.button
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
					whileTap={{ scale: 0.85 }}
					onClick={onToggle}
					className={`relative z-10 w-11 h-11 rounded-full border-2 flex items-center justify-center text-lg shrink-0 transition-all duration-300 ${
						isActive
							? `border-transparent bg-gradient-to-br ${gradient} shadow-lg shadow-cyan-500/20 timeline-node-active`
							: 'border-white/20 bg-slate-800/80'
					}`}>
					<span className='text-base'>{milestone.emoji}</span>
					{isActive && (
						<motion.div
							layoutId='activeRing'
							className={`absolute inset-[-4px] rounded-full border-2 border-cyan-400/40`}
							transition={{ type: 'spring', stiffness: 300 }}
						/>
					)}
				</motion.button>
				{!isLast && (
					<motion.div
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
						className='w-[2px] flex-1 min-h-[24px] origin-top bg-gradient-to-b from-white/20 to-white/5'
					/>
				)}
			</div>

			{/* Content */}
			<div className='flex-1 pb-6 min-w-0'>
				<motion.button
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 + 0.35 }}
					onClick={onToggle}
					className='w-full text-left group'>
					<div className='flex items-start justify-between gap-2'>
						<div className='min-w-0'>
							<span className='text-[10px] font-semibold text-white/30 uppercase tracking-widest'>
								चरण {milestone.step}
							</span>
							<h3
								className={`text-[15px] font-bold leading-snug mt-0.5 transition-colors ${
									isActive ? 'text-white' : 'text-white/70'
								}`}>
								{milestone.title}
							</h3>
							<p className='text-xs text-cyan-400/60 mt-0.5'>
								{milestone.period}
							</p>
						</div>
						<motion.div
							animate={{ rotate: isActive ? 180 : 0 }}
							transition={{ duration: 0.2 }}
							className='mt-2 shrink-0'>
							<ChevronDown size={16} className='text-white/30' />
						</motion.div>
					</div>
					{!isActive && (
						<p className='text-xs text-white/35 mt-1.5 line-clamp-2 leading-relaxed'>
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
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

/* ─── Milestone Detail (expanded view) ─── */
function MilestoneDetail({ milestone, gradient }) {
	const [showAI, setShowAI] = useState(false);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: 'auto' }}
				exit={{ opacity: 0, height: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className='overflow-hidden'>
				<div className='mt-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 space-y-4'>
					{/* Summary */}
					<p className='text-sm text-white/60 leading-relaxed'>
						{milestone.summary}
					</p>

					{/* Details */}
					<div className='text-sm text-white/50 leading-relaxed whitespace-pre-line'>
						{milestone.details}
					</div>

					{/* Tips */}
					{milestone.tips?.length > 0 && (
						<div className='space-y-2'>
							<div className='flex items-center gap-1.5 text-amber-400/80'>
								<Lightbulb size={14} />
								<span className='text-xs font-semibold uppercase tracking-wider'>
									सुझाव
								</span>
							</div>
							<ul className='space-y-1.5'>
								{milestone.tips.map((tip, i) => (
									<li
										key={i}
										className='flex items-start gap-2 text-xs text-white/45 leading-relaxed'>
										<CheckCircle2
											size={13}
											className='text-emerald-400/50 mt-0.5 shrink-0'
										/>
										<span>{tip}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Important Info */}
					{milestone.importantInfo && (
						<div className='flex items-start gap-2 p-3 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/10'>
							<Info
								size={14}
								className='text-cyan-400/60 mt-0.5 shrink-0'
							/>
							<p className='text-xs text-cyan-300/50 leading-relaxed'>
								{milestone.importantInfo}
							</p>
						</div>
					)}

					{/* AI Button */}
					<motion.button
						whileTap={{ scale: 0.97 }}
						onClick={() => setShowAI(true)}
						className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold text-sm shadow-lg transition-all active:shadow-md`}>
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
			className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end'
			onClick={onClose}>
			<motion.div
				initial={{ y: '100%' }}
				animate={{ y: 0 }}
				exit={{ y: '100%' }}
				transition={{ type: 'spring', damping: 28, stiffness: 300 }}
				onClick={(e) => e.stopPropagation()}
				className='w-full max-h-[88vh] bg-slate-900 rounded-t-3xl flex flex-col border-t border-white/10 overflow-hidden'>
				{/* Drag Handle */}
				<div className='flex justify-center pt-2 pb-1'>
					<div className='w-10 h-1 rounded-full bg-white/20' />
				</div>

				{/* Header */}
				<div className='flex items-center justify-between px-4 py-2.5 border-b border-white/5'>
					<div className='flex items-center gap-2 min-w-0'>
						<div
							className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-sm`}>
							<Bot size={15} />
						</div>
						<div className='min-w-0'>
							<h3 className='text-sm font-bold text-white truncate'>
								AI सहायक
							</h3>
							<p className='text-[10px] text-white/30 truncate'>
								{milestone.title} के बारे में पूछें
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform'>
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
							<p className='text-sm text-white/40 mb-1'>
								{milestone.title}
							</p>
							<p className='text-xs text-white/20'>
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
										: 'bg-white/[0.06] text-white/70 rounded-bl-md'
								}`}>
								{msg.role === 'assistant' ? (
									<div className='prose prose-invert prose-sm max-w-none [&_p]:text-[13px] [&_p]:text-white/70 [&_p]:leading-relaxed [&_li]:text-[13px] [&_li]:text-white/60 [&_strong]:text-white/80 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-sm [&_ul]:my-1 [&_ol]:my-1 [&_p]:my-1'>
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
							<div className='max-w-[85%] rounded-2xl rounded-bl-md px-3.5 py-2.5 bg-white/[0.06] text-[13px] leading-relaxed'>
								<div className='prose prose-invert prose-sm max-w-none [&_p]:text-[13px] [&_p]:text-white/70 [&_p]:leading-relaxed [&_li]:text-[13px] [&_li]:text-white/60 [&_strong]:text-white/80 [&_p]:my-1'>
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
							<div className='rounded-2xl rounded-bl-md px-4 py-3 bg-white/[0.06]'>
								<div className='flex gap-1.5'>
									<div className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:0ms]' />
									<div className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:150ms]' />
									<div className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:300ms]' />
								</div>
							</div>
						</div>
					)}

					<div ref={chatEndRef} />
				</div>

				{/* Suggested Questions */}
				{messages.length === 0 &&
					milestone.suggestedQuestions?.length > 0 && (
						<div className='px-4 py-2 border-t border-white/5'>
							<div className='flex gap-2 overflow-x-auto pb-1 no-scrollbar'>
								{milestone.suggestedQuestions.map((q, i) => (
									<button
										key={i}
										onClick={() => sendMessage(q)}
										className='shrink-0 text-[11px] text-cyan-300/60 bg-cyan-500/[0.08] border border-cyan-500/10 rounded-full px-3 py-1.5 active:scale-95 transition-transform whitespace-nowrap'>
										{q}
									</button>
								))}
							</div>
						</div>
					)}

				{/* Input Area */}
				<div className='px-3 py-3 border-t border-white/5 bg-slate-900/95'>
					<div className='flex items-end gap-2'>
						<textarea
							ref={inputRef}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder='अपना सवाल लिखें...'
							rows={1}
							disabled={isLoading}
							className='flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none resize-none max-h-24 focus:border-white/20 transition-colors disabled:opacity-50'
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
			<div className='min-h-screen bg-slate-900 flex items-center justify-center text-white'>
				<div className='text-center'>
					<p className='text-lg'>Career path not found</p>
					<button
						onClick={() => router.push('/education')}
						className='mt-4 px-4 py-2 bg-white/10 rounded-xl text-sm'>
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
		<div className='min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white'>
			{/* Header */}
			<div className='sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5'>
				<div className='flex items-center gap-3 px-4 py-3'>
					<button
						onClick={() => router.push('/education')}
						className='w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform'>
						<ArrowLeft size={18} />
					</button>
					<div className='flex items-center gap-2 min-w-0'>
						<span className='text-xl'>{career.emoji}</span>
						<div className='min-w-0'>
							<h1 className='text-base font-bold truncate'>
								{career.title}
							</h1>
							<p className='text-[10px] text-white/30'>
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
					className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${career.cardBg} border border-white/[0.06] p-5`}>
					<div
						className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${career.gradient} opacity-10 blur-3xl`}
					/>
					<div className='relative'>
						<div className='text-4xl mb-2'>{career.emoji}</div>
						<h2 className='text-xl font-bold'>{career.title}</h2>
						<p className='text-xs text-white/40 mt-1'>
							{career.titleEn}
						</p>
						<p className='text-sm text-white/50 mt-2 leading-relaxed'>
							{career.description}
						</p>
						<div className='flex items-center gap-2 mt-3'>
							<div
								className={`text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${career.gradient} text-white`}>
								{career.milestones.length} चरण
							</div>
							<div className='text-[10px] text-white/25 px-2.5 py-1 rounded-full border border-white/10'>
								AI सहायक उपलब्ध
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Timeline Label */}
			<div className='px-5 pt-4 pb-2'>
				<div className='flex items-center gap-2'>
					<div
						className={`w-1 h-4 rounded-full bg-gradient-to-b ${career.gradient}`}
					/>
					<span className='text-xs font-bold text-white/40 uppercase tracking-wider'>
						करियर रोडमैप
					</span>
				</div>
			</div>

			{/* Timeline */}
			<div className='px-5 pb-12'>
				{career.milestones.map((milestone, index) => (
					<TimelineNode
						key={milestone.id}
						milestone={milestone}
						index={index}
						isActive={activeId === milestone.id}
						isLast={index === career.milestones.length - 1}
						onToggle={() => toggleMilestone(milestone.id)}
						gradient={career.gradient}
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
					className='flex items-center gap-3 mt-2'>
					<div
						className={`w-11 h-11 rounded-full bg-gradient-to-br ${career.gradient} flex items-center justify-center shadow-lg`}>
						<span className='text-base'>🎉</span>
					</div>
					<div>
						<p className='text-sm font-bold text-white/60'>
							लक्ष्य प्राप्त!
						</p>
						<p className='text-[11px] text-white/25'>
							आप {career.title} बनने की राह पर हैं
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
