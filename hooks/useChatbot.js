import { useState } from 'react';

const MAX_MEMORY = 10;
export function useChatbot(context) {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);

	async function sendMessage(text) {
		setLoading(true);
		const newMessages = [...messages, { role: 'user', content: text }];

		// 👇 ONLY KEEP LAST 10
		const trimmedMessages = newMessages.slice(-MAX_MEMORY);

		setMessages(trimmedMessages);

		const res = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				messages: trimmedMessages,
				context,
			}),
		});

		const reader = res.body?.getReader();
		const decoder = new TextDecoder();

		let assistantMessage = '';

		setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			assistantMessage += decoder.decode(value);

			setMessages((prev) => {
				const updated = [...prev];
				updated[updated.length - 1] = {
					role: 'assistant',
					content: assistantMessage,
				};
				return updated;
			});
		}

		setLoading(false);
	}

	return { messages, sendMessage, loading };
}
