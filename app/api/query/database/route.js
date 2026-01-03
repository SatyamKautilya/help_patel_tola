import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

import Titleandtexts from '@/lib/models/Titleandtexts';
import { generateChatResponse } from '@/lib/openai';
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

		const { searchParams } = new URL(request.url);
		// GET /api/subcategory/farming - Get farming subcategory details

		const name = searchParams.get('name');

		if (name === 'texts') {
			const titleandtexts = await Titleandtexts.find().sort({ createdAt: -1 });
			return NextResponse.json({ titleandtexts });
		}
	} catch (error) {
		console.error('API GET Error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function POST(request) {
	try {
		await connectToDatabase();

		const { searchParams } = new URL(request.url);
		const name = searchParams.get('name');

		let body = {};
		try {
			body = await request.json();
		} catch {}

		if (name === 'findhospital') {
			const { message } = body;
			let response = {};
			if (!message) {
				return NextResponse.json(
					{ error: 'message is required' },
					{ status: 400 },
				);
			}

			let specialityIds = [];

			// AI fallback
			if (specialityIds.length === 0) {
				const specialityPrompt = `
Identify medical speciality IDs from the text. 
Return ONLY an object {msg:your one liner suggestion in hindi,specialityId: JSON array from this list:
MG, SG, MC, MO, SN, SB, SE, SM, ER, MP, ST, IN }

Text:
"${message}"
`;

				const aiResponse = await generateChatResponse(
					undefined,
					`
Identify medical speciality IDs from the text. 
Return ONLY an object {msg:your one liner suggestion in the same language user used, specialityId: JSON array from this list:
MG, SG, MC, MO, SN, SB, SE, SM, ER, MP, ST, IN }
don't provide empty string
Text:
"${message}"
`,
				);

				try {
					response = aiResponse;
					// const match = aiResponse.match(/\[.*?\]/);
					// specialityIds = match ? JSON.parse(match[0]) : [];
				} catch {
					response = { msg: 'none', specialityId: [] };
				}
			}

			return NextResponse.json({ response });
		}

		return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
	} catch (error) {
		console.error('API POST Error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
