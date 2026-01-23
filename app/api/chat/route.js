import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
	const { messages, context } = await req.json();

	const stream = await openai.chat.completions.create({
		model: 'gpt-5.2', // fast + cheap
		stream: true,
		messages: [
			{
				role: 'system',
				content: context || 'You are a helpful assistant.',
			},
			...messages,
		],
	});

	const encoder = new TextEncoder();

	const readableStream = new ReadableStream({
		async start(controller) {
			for await (const chunk of stream) {
				const content = chunk.choices[0]?.delta?.content;
				if (content) {
					controller.enqueue(encoder.encode(content));
				}
			}
			controller.close();
		},
	});

	return new Response(readableStream, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}
