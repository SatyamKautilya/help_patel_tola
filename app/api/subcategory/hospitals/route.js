import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

import Healthtopics from '@/lib/models/Healthtopics';
import Hospitallists from '@/lib/models/Hospitallists';

import mongoose from 'mongoose';
import Sops from '@/lib/models/Sops';
import Successstorys from '@/lib/models/Successstorys';
import Users from '@/lib/models/Users';
// Helper function to get path segments
function getPathSegments(request) {
	const url = new URL(request.url);
	const path = url.pathname.replace('/api/', '').replace('/api', '');
	return path ? path.split('/').filter(Boolean) : [];
}

export const revalidate = 300;
// GET handler
export async function GET(request) {
	try {
		await connectToDatabase();

		const { searchParams } = new URL(request.url);
		// GET /api/subcategory/farming - Get farming subcategory details

		const name = searchParams.get('name');

		if (name === 'content') {
			const records = await Successstorys.find().sort({ createdAt: -1 });

			return NextResponse.json(records);
		}

		if (name === 'hospitals') {
			const hospitallists = await Hospitallists.find().sort({ createdAt: -1 });
			return NextResponse.json({ hospitallists });
		} else if (name === 'sops') {
			const sops = await Sops.find({}).sort({
				createdAt: 1,
			});

			return NextResponse.json({ sops });
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
		if (name === 'sops') {
			const { form: sop } = body;

			if (!sop?.name) {
				return NextResponse.json(
					{ error: 'SOP name is required' },
					{ status: 400 },
				);
			}

			const newSop = await Sops.create({
				id: sop.name, // custom id
				...sop,
			});

			return NextResponse.json(newSop);
		}
		if (name === 'content') {
			const { form: content } = body;

			if (!content?.name) {
				return NextResponse.json(
					{ error: 'content name is required' },
					{ status: 400 },
				);
			}

			const successstory = await Successstorys.create({
				id: content.name, // custom id
				subtitle: content.subtitle,
				storySegment: content.storySegment,
			});

			return NextResponse.json(successstory);
		}
		if (name === 'users') {
			const { form: content } = body;

			if (!content?.name) {
				return NextResponse.json(
					{ error: 'content name is required' },
					{ status: 400 },
				);
			}

			const user = await Users.findOneAndUpdate(
				{ id: content.appInstanceId }, // search condition
				{
					$set: {
						name: content.name,
						villageName: content.villageName,
						lastSeen: content.lastSeen,
					},
				},
				{
					upsert: true, // 🔥 create if not exists
					new: true, // return updated document
					setDefaultsOnInsert: true,
				},
			);

			return NextResponse.json(user);
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
