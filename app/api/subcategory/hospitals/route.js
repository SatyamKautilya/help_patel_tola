import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import Contacts from '@/lib/models/Contacts';
import Crops from '@/lib/models/Crops';
import Healthtopics from '@/lib/models/Healthtopics';

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

		const healthtopics = await Healthtopics.find({
			...(name ? { id: name } : {}),
		}).sort({
			createdAt: 1,
		});

		return NextResponse.json({ healthtopics });
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
			const { name, role, mobile } = body;
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
				createdAt: new Date(),
			});
			return NextResponse.json({ contact }, { status: 201 });
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
