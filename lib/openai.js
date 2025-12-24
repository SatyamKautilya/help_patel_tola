import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

// Initialize OpenAI client with your API key
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateChatResponse(messages, systemPrompt, categoryContext = '') {
  try {
    const fullSystemPrompt = systemPrompt + (categoryContext ? `\n\nContext: The user is currently viewing the ${categoryContext} category. Provide responses relevant to this topic.` : '');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using GPT-4o-mini for cost-effectiveness
      messages: [
        {
          role: 'system',
          content: fullSystemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`AI service error: ${error.message}`);
  }
}
