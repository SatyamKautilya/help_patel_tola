import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

import Healthtopics from '@/lib/models/Healthtopics';
import Hospitallists from '@/lib/models/Hospitallists';

import mongoose from 'mongoose';
import Titleandtexts from '@/lib/models/Titleandtexts';
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
			const titleandtextss = await Titleandtexts.find().sort({ createdAt: -1 });
			return NextResponse.json({ titleandtextss });
		}
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
		const { searchParams } = new URL(request.url);
		// GET /api/subcategory/farming - Get farming subcategory details

		const name = searchParams.get('name');
		if (name === 'feedback') {
			const { hospitalId, form: experience } = body;

			{
				const updatedHospital = await Hospitallists.findOneAndUpdate(
					{ id: hospitalId }, // 👈 match your custom `id` field
					{
						$push: {
							experiences: {
								...experience,
								createdAt: new Date(),
							},
						},
					},
					{ new: true }, // returns updated document
				);
				if (!updatedHospital) {
					throw new Error('Hospital not found');
				}

				return NextResponse.json(updatedHospital);
			}
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
