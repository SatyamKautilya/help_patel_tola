import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import Contacts from '@/lib/models/Contacts';
import Crops from '@/lib/models/Crops';
import Healthtopics from '@/lib/models/Healthtopics';
import { Hospital } from 'lucide-react';
import Hospitallists from '@/lib/models/HospitalLists';

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

		if (name === 'hospitals') {
			const hospitallists = await Hospitallists.find().sort({ createdAt: -1 });
			return NextResponse.json({ hospitallists });
		} else {
			const healthtopics = await Healthtopics.find({
				...(name ? { id: name } : {}),
			}).sort({
				createdAt: 1,
			});

			return NextResponse.json({ healthtopics });
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
			const { hospitalId, experience } = body;
			if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
				throw new Error('Invalid hospital ID');
			}
			{
				const updatedHospital = await Hospital.findByIdAndUpdate(
					hospitalId,
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

				return updatedHospital;
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
