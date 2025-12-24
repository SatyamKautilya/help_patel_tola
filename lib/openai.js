// Mock OpenAI client for demonstration
// Note: The Emergent LLM key integration requires the emergentintegrations package
// which is not publicly available. This is a mock implementation for testing.

export async function generateChatResponse(messages, systemPrompt, categoryContext = '') {
  try {
    // Mock response for demonstration
    const userMessage = messages[messages.length - 1]?.content || '';
    const fullSystemPrompt = systemPrompt + (categoryContext ? `\n\nContext: The user is currently viewing the ${categoryContext} category. Provide responses relevant to this topic.` : '');
    
    // Simulate AI-like responses based on category context
    let response = '';
    
    if (categoryContext.toLowerCase().includes('health')) {
      response = `As your health assistant, I'd be happy to help! ${userMessage.toLowerCase().includes('tip') ? 'Here are some tips: 1) Stay hydrated, 2) Exercise regularly, 3) Get 7-8 hours of sleep, 4) Eat a balanced diet, 5) Manage stress through meditation or yoga.' : 'I can provide information about nutrition, exercise, mental health, and general wellness. What specific health topic interests you?'}`;
    } else if (categoryContext.toLowerCase().includes('economy')) {
      response = `Regarding ${categoryContext}, I can help you understand economic concepts. ${userMessage.toLowerCase().includes('invest') ? 'Investment basics include diversification, understanding risk tolerance, and long-term planning.' : 'Feel free to ask about budgeting, saving, investing, or economic trends.'}`;
    } else if (categoryContext.toLowerCase().includes('education')) {
      response = `In the realm of ${categoryContext}, ${userMessage.toLowerCase().includes('learn') ? 'effective learning strategies include active recall, spaced repetition, and practical application of knowledge.' : 'I can guide you on learning methods, study techniques, and educational resources.'}`;
    } else if (categoryContext.toLowerCase().includes('moral')) {
      response = `When it comes to ${categoryContext}, ${userMessage.toLowerCase().includes('right') ? 'ethical decisions often require considering consequences, intentions, and universal principles.' : 'I can help explore ethical frameworks, values, and moral reasoning.'}`;
    } else if (categoryContext.toLowerCase().includes('employment')) {
      response = `For ${categoryContext} matters, ${userMessage.toLowerCase().includes('job') ? 'key job search strategies include networking, tailoring your resume, practicing interviews, and continuous skill development.' : 'I can assist with career planning, job search strategies, and professional development.'}`;
    } else {
      response = `I'm here to help! ${userMessage ? `Regarding your question: "${userMessage}", I'd be happy to provide assistance.` : 'What would you like to know?'} Feel free to ask me anything about Health, Economy, Education, Moral Values, or Employment.`;
    }
    
    return response;
  } catch (error) {
    console.error('Chat Response Error:', error);
    throw new Error(`Chat service error: ${error.message}`);
  }
}
