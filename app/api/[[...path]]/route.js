import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import Subcategory from '@/lib/models/Subcategory';
import ChatMessage from '@/lib/models/ChatMessage';
import { generateChatResponse } from '@/lib/openai';
import { v4 as uuidv4 } from 'uuid';
import Diseases from '@/lib/models/Diseases';
import Contacts from '@/lib/models/Contacts';

import Crops from '@/lib/models/Crops';

// Helper function to get path segments
function getPathSegments(request) {
	const url = new URL(request.url);
	const path = url.pathname.replace('/api/', '').replace('/api', '');
	return path ? path.split('/').filter(Boolean) : [];
}

// GET handler
export async function GET(request) {
	try {
		await connectToDatabase();

		const segments = getPathSegments(request);
		const { searchParams } = new URL(request.url);
		// GET /api/subcategory/farming - Get farming subcategory details

		if (segments[0] === 'subcategory' && segments[1]?.includes('crops')) {
			const { searchParams } = new URL(request.url);
			const name = searchParams.get('name');

			const crops = await Crops.find({ ...(name ? { id: name } : {}) }).sort({
				createdAt: 1,
			});

			return NextResponse.json({ crops });
		}
		if (segments[0] === 'subcategory' && segments[1] === 'contacts') {
			const contacts = await Contacts.find({}).sort({ createdAt: 1 });
			return NextResponse.json({ contacts });
		}
		if (segments[0] === 'diseases' && segments.length === 1) {
			const diseases = await Diseases.find({}).sort({ createdAt: 1 });
			return NextResponse.json({ diseases });
		}
		// GET /api/categories - Get all categories
		if (segments[0] === 'categories' && segments.length === 1) {
			const categories = await Category.find({}).sort({ createdAt: 1 });
			return NextResponse.json({ categories });
		}

		// GET /api/subcategories?categoryId=X - Get subcategories by category
		if (segments[0] === 'subcategories' && segments.length === 1) {
			const categoryId = searchParams.get('categoryId');
			if (!categoryId) {
				return NextResponse.json(
					{ error: 'categoryId is required' },
					{ status: 400 },
				);
			}
			const subcategories = await Subcategory.find({ categoryId }).sort({
				createdAt: 1,
			});
			return NextResponse.json({ subcategories });
		}

		// GET /api/chat/history?sessionId=X - Get chat history
		if (segments[0] === 'chat' && segments[1] === 'history') {
			const sessionId = searchParams.get('sessionId');
			const userId = searchParams.get('userId');

			if (!sessionId || !userId) {
				return NextResponse.json(
					{ error: 'sessionId and userId are required' },
					{ status: 400 },
				);
			}

			const messages = await ChatMessage.find({ sessionId, userId })
				.sort({ timestamp: 1 })
				.lean();

			return NextResponse.json({ messages });
		}

		// GET /api/seed - Seed initial data

		return NextResponse.json({ message: 'API is working' });
	} catch (error) {
		console.error('API GET Error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}

// POST handler
export async function POST(request) {
	try {
		await connectToDatabase();
		const segments = getPathSegments(request);
		const body = await request.json();
		console.log(segments, body);
		if (
			segments[0] === 'subcategory' &&
			segments[1] === 'contacts' &&
			segments[2] === 'add'
		) {
			const { name, role, mobile, visibilityGroups } = body;
			if (!name || !role || !mobile) {
				return NextResponse.json(
					{ error: 'name, role, and mobile are required' },
					{ status: 400 },
				);
			}
			const contact = await Contacts.create({
				id: uuidv4(),
				name,
				role,
				mobile,
				visibilityGroups,
				createdAt: new Date(),
			});
			return NextResponse.json({ contact }, { status: 201 });
		}

		// POST /api/chat - Context-aware chatbot
		if (segments[0] === 'chat' && segments.length === 1) {
			const { message, sessionId, userId, categoryId, categoryName } = body;

			if (!message || !sessionId || !userId) {
				return NextResponse.json(
					{ error: 'message, sessionId, and userId are required' },
					{ status: 400 },
				);
			}

			// Get previous messages for context
			const previousMessages = await ChatMessage.find({ sessionId, userId })
				.sort({ timestamp: 1 })
				.limit(10)
				.lean();

			const conversationHistory = previousMessages.map((msg) => ({
				role: msg.sender === 'user' ? 'user' : 'assistant',
				content: msg.content,
			}));

			const systemPrompt = `You are a helpful AI assistant for a mobile application focused on various life topics including Health, Economy, Education, Moral Values, and Employment. Provide clear, concise, and helpful responses.`;

			// Generate AI response with category context
			const aiResponse = await generateChatResponse(
				[
					...conversationHistory,
					{
						role: 'user',
						content: message,
					},
				],
				systemPrompt,
				categoryName || '',
			);

			// Save user message
			await ChatMessage.create({
				id: uuidv4(),
				sessionId,
				userId,
				categoryId: categoryId || '',
				sender: 'user',
				content: message,
				timestamp: new Date(),
			});

			// Save bot response
			await ChatMessage.create({
				id: uuidv4(),
				sessionId,
				userId,
				categoryId: categoryId || '',
				sender: 'bot',
				content: aiResponse,
				timestamp: new Date(),
			});

			return NextResponse.json({ response: aiResponse });
		}

		return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
	} catch (error) {
		console.error('API POST Error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}
