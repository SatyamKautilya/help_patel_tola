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
// export async function generateScheduleResponse(
// 	crop,
// 	systemPrompt,
// 	categoryContext = '',
// ) {
// 	const cropcontext = `
// your response will be used to render in ui.
// follow the below format strictly.
// use for seed selection use sygenta, vnr and seminis products only.
// for fungicide and pesticide use bayer, syngenta and adama products.
// duedate will depend on the crop selected.
// generate time/ showing time for Rabi season which is jan to june.
// this is the example of data model:

// {
//   "_id": {
//     "$oid": "694e3846107d8d483455d794"
//   },
//   "id": "tomato",
//   "name": "टमाटर",
//   "time": "जनवरी अंत/फरवरी प्रारम्भ से जून / जुलाई",
//   "variety": ["साहो", "1057"],
//   "sprays": [
//     {
// 			"method": "drenching",
// 			"duedate": " दूसरे दिन",
// 			"type": "सिस्टेमेटिक फफूंदनाशक",
// 			"name": "बाविस्टीन",
// 			"target": "जड़ सड़न/ तना गलन",
// 			"chemical": "कार्बेन्डाजीम",
// 			"quantity": "3ग्राम/लिटर"
// 		},
// 		{
// 			"method": "drenching",
// 			"duedate": " 7वे दिन",
// 			"type": "सिस्टेमेटिक फफूंदनाशक",
// 			"name": "बायर एलिएट",
// 			"target": "जड़ सड़न/ तना गलन",
// 			"chemical": "फोसेटईल एएल",
// 			"quantity": "3 ग्राम/लिटर"
// 		},
// 		{
// 			"duedate": "10-15वे दिन",
// 			"type": "सिस्टेमेटिक कीटनाशक",
// 			"name": "बायर कोन्फ़िडोर",
// 			"target": "मैनी/सफ़ेद मक्खी/  माइनर",
// 			"chemical": "एमिडाक्लोप्रिड",
// 			"quantity": "8 मिली/15लिटर"
// 		},
// 		{
// 			"duedate": "10-15वे दिन",
// 			"type": "कोंटक्त फफूंदनाशक",
// 			"name": "एम 45",
// 			"target": "शुरुआती फफूंद रोग",
// 			"chemical": "मॅन्कोजेब",
// 			"quantity": "20 ग्राम/15लिटर"
// 		},
// 		{
// 			"duedate": "20-25वे दिन",
// 			"type": "ऑल कीटनाशक",
// 			"name": "सीजेंटा अलिका",
// 			"target": "मैनी/सफ़ेद मक्खी/माइनर/इल्ली",
// 			"chemical": "थियामेथोक्सम/लॅम्ब्डा-सायहॅलोथ्रिन",
// 			"quantity": "20 मिली/15लिटर"
// 		},
// 		{
// 			"duedate": "20-25वे दिन",
// 			"type": "फफूंदनाशक",
// 			"name": "सीजेंटा फोलियो गोल्ड",
// 			"target": "अरली ब्लाइट/ पावडरी मिल्डेव/ अन्य फफूंद रोग",
// 			"chemical": "मेटलेक्सिल एम/क्लोरोथलोनिल",
// 			"quantity": "30 मिली/15लिटर"
// 		},
// 		{
// 			"duedate": "30-35वे दिन",
// 			"type": "सिस्टेमेटिक कीटनाशक",
// 			"name": "बायर कोन्फ़िडोर",
// 			"target": "मैनी/सफ़ेद मक्खी/  माइनर",
// 			"chemical": "एमिडाक्लोप्रिड",
// 			"quantity": "8 मिली/15लिटर"
// 		},
// 		{
// 			"duedate": "30-35वे दिन",
// 			"type": "सिस्टेमेटिक फफूंदनाशक",
// 			"name": "सीजेंटा अमिस्टार",
// 			"target": "अरली ब्लाइट/अन्य फफूंद रोग",
// 			"chemical": "अजॉक्सिस्ट्रोबिन",
// 			"quantity": "20 मिली/15लिटर"
// 		},
// 		{
// 			"duedate": "40-45वे दिन",
// 			"type": "सिस्टेमेटिक कीटनाशक",
// 			"name": "मोवेण्टो एनर्जि",
// 			"target": "मैनी/सफ़ेद मक्खी/माइनर/लाल मकड़ी",
// 			"chemical": "स्पीरोटेट्रामेट + एमिडाक्लोप्रिड",
// 			"quantity": "20 मिली/15लिटर"
// 		},
// 		{
// 			"duedate": "40-45वे दिन",
// 			"type": "सिस्टेमेटिक फफूंदनाशक",
// 			"name": "सीजेंटा कवच",
// 			"target": "लेट ब्लाइट/ डाउनी मिल्ड्यू",
// 			"chemical": "क्लोरोथलोनिल",
// 			"quantity": "20मिली/15लिटर"
// 		},

//   ],
//   "additionalInfo": [
//     "अत्याधिक पानी नहीं दें।",
//     "ड्रिप द्वारा हर 3-5 दिन मे उर्वरक दें।"
//   ]
// }
// `;

// 	try {
// 		const fullSystemPrompt =
// 			systemPrompt + `\n\nContext: ${cropcontext} for crop ${crop}`;

// 		const response = await openai.chat.completions.create({
// 			model: 'gpt-5-nano', // Using GPT-4o-mini for cost-effectiveness
// 			messages: [
// 				{
// 					role: 'system',
// 					content: fullSystemPrompt,
// 				},
// 				//...messages,
// 			],
// 		});

// 		return response.choices[0].message.content || '';
// 	} catch (error) {
// 		console.error('OpenAI API Error:', error);
// 		throw new Error(`AI service error: ${error.message}`);
// 	}
// }

export async function generateChatResponse(
	messages,
	systemPrompt,
	categoryContext = '',
) {
	try {
		const fullSystemPrompt = systemPrompt + `\n\nContext: ${boatContext}`;

		const response = await openai.chat.completions.create({
			model: 'gpt-5-nano', // Using GPT-4o-mini for cost-effectiveness
			messages: [
				{
					role: 'system',
					content: fullSystemPrompt,
				},
				//...messages,
			],
			max_completion_tokens: 1000,
		});

		return response.choices[0].message.content || '';
	} catch (error) {
		console.error('OpenAI API Error:', error);
		throw new Error(`AI service error: ${error.message}`);
	}
}
