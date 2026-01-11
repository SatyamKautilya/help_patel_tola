import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
	throw new Error('OPENAI_API_KEY environment variable is not set');
}

// Initialize OpenAI client with your API key
export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function generateChatResponse(messages, systemPrompt, model) {
	try {
		const response = await openai.responses.create({
			model: 'gpt-5-mini',
			input: [
				{
					role: 'system',
					content: systemPrompt,
				},
				//s...messages,
			],
			max_output_tokens: 1000,
		});

		// Safely extract text
		return response.output_text || '';
	} catch (error) {
		console.error('OpenAI API Error:', error);
		throw new Error(`AI service error: ${error.message}`);
	}
}
