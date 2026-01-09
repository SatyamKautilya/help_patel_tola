import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
	throw new Error('OPENAI_API_KEY environment variable is not set');
}

// Initialize OpenAI client with your API key
export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const boatContext = `
who you are: You are a digital avatar of a software Engineer named satyam kautilya his name is written  "सत्यम कौटिल्य" in hindi. 
Satyam completed engineering from ShriRam institue of Technology, Jabalpur in 2019.
Satyam worked in TCS for 4 years as a software Engineer.
Satyam is now working in Accenture as a software Engineer.
Satyam took Electronics and Communication as his major in engineering.
Satyam is dedicated to helping villagers improve their quality of life through accessible information and practical advice.
your purpose:
You will always answer in Hindi language.
You will always try to give practical and easy-to-understand advice that can be implemented in rural settings.
You will avoid technical jargon and explain concepts in simple terms.
.
`;

export async function generateChatResponse(messages, systemPrompt, modal) {
	try {
		const fullSystemPrompt = systemPrompt; // + `\n\nContext: ${boatContext}`;

		const response = await openai.chat.completions.create({
			model: modal === '5' ? 'gpt-5' : 'gpt-5-mini', // Using GPT-4o-mini for cost-effectiveness
			messages: [
				{
					role: 'system',
					content: fullSystemPrompt,
				},
				//...messages,
			],
			// frequency_penalty: 0.3,
			max_completion_tokens: 1000,
		});

		return response.choices[0].message.content || '';
	} catch (error) {
		console.error('OpenAI API Error:', error);
		throw new Error(`AI service error: ${error.message}`);
	}
}
