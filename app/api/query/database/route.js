import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

import Titleandtexts from '@/lib/models/Titleandtexts';
import { generateChatResponse } from '@/lib/openai';
import GovtSchemes from '@/lib/models/GovtSchemes';
import Feedback from '@/lib/models/Feedback';
import Users from '@/lib/models/Users';
import JoinRequest from '@/lib/models/JoinRequest';
import Device from '@/lib/models/Device';
import { sendPushNotifications } from '@/lib/sendPush';
import Contacts from '@/lib/models/Contacts';
import TamoharMeeting from '@/lib/models/TamoharMeeting';
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
		const check = searchParams.get('check');

		if (check === 'isPatelTolaMember') {
			const assetId = searchParams.get('assetId');

			const userDetails = await Users.findOne({ id: assetId }).lean();

			const belongsToPatelTola =
				Array.isArray(userDetails?.userGroups) &&
				userDetails.userGroups.includes('PatelTola');
			if (userDetails && belongsToPatelTola) {
				return NextResponse.json({ isPatelTolaMember: true });
			} else {
				return NextResponse.json({ isPatelTolaMember: false });
			}
		}
		if (name === 'join-request') {
			const joinRequests = await JoinRequest.find({ status: 'pending' }).sort({
				createdAt: -1,
			});
			return NextResponse.json({ joinRequests });
		}
		if (name === 'getgovtschemes') {
			const govtSchemes = await GovtSchemes.find().sort({ createdAt: -1 });
			return NextResponse.json({ govtSchemes });
		}
		if (name === 'texts') {
			const titleandtexts = await Titleandtexts.find().sort({ createdAt: -1 });
			return NextResponse.json({ titleandtexts });
		}
		if (name === 'feedback') {
			const feedback = await Feedback.find().sort({ createdAt: -1 });
			return NextResponse.json({ feedback });
		}
		if (name === 'total-users') {
			const totalUsers = await Users.countDocuments();
			return NextResponse.json({ totalUsers });
		}
		if (name === 'today-users') {
			// IST offset in minutes
			const IST_OFFSET = 5.5 * 60;

			// Current UTC time
			const nowUTC = new Date();

			// Convert to IST
			const nowIST = new Date(nowUTC.getTime() + IST_OFFSET * 60 * 1000);

			// Start of IST day
			const startOfISTDay = new Date(
				nowIST.getFullYear(),
				nowIST.getMonth(),
				nowIST.getDate(),
			);

			// End of IST day
			const endOfISTDay = new Date(
				nowIST.getFullYear(),
				nowIST.getMonth(),
				nowIST.getDate() + 1,
			);

			// Convert IST boundaries back to UTC
			const startUTC = new Date(
				startOfISTDay.getTime() - IST_OFFSET * 60 * 1000,
			);
			const endUTC = new Date(endOfISTDay.getTime() - IST_OFFSET * 60 * 1000);

			const todayUser = await Users.countDocuments({
				lastSeen: {
					$gte: startUTC,
					$lt: endUTC,
				},
			});
			console.log(todayUser, 'today user');
			return NextResponse.json({ todayUser });
		}

		if (name === 'total-feedbacks') {
			const totalFeedbacks = await Feedback.countDocuments();
			return NextResponse.json({ totalFeedbacks });
		}
		if (name === 'last-ten-feedbacks') {
			const lastTenFeedbacks = await Feedback.find()
				.sort({ createdAt: -1 })
				.limit(10);
			return NextResponse.json({ lastTenFeedbacks });
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
					'',
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

		if (name === 'setgovtschemes') {
			const { form: content } = body;

			if (!content?.name) {
				return NextResponse.json(
					{ error: 'content name is required' },
					{ status: 400 },
				);
			}

			const govtSchemes = await GovtSchemes.create({
				id: content.name, // custom id
				name: content.name,
				eligibility: content.eligibility,
				details: content.details,
				benefits: content.benefits,
				howToEnroll: content.howToEnroll,
			});

			return NextResponse.json(govtSchemes);
		}
		if (name === 'feedback') {
			const { form: content } = body;

			if (!content?.sender) {
				return NextResponse.json(
					{ error: 'content name is required' },
					{ status: 400 },
				);
			}

			const feedback = await Feedback.create({
				sender: content.sender,
				message: content.message,
			});

			return NextResponse.json(feedback);
		}
		if (name === 'register-for-village') {
			const { villageCode, assetId, userName } = body;
			console.log(body, 'body');
			if (!villageCode) {
				return NextResponse.json(
					{ error: 'villageCode is required' },
					{ status: 400 },
				);
			}

			// Add your village registration logic here
			const existingRequest = await JoinRequest.findOne({ assetId: assetId });
			if (!existingRequest) {
				const register = await JoinRequest.create({
					id: assetId,
					assetId, // use assetId as id
					villageId: villageCode,
					name: userName,
					status: 'pending',
					createdAt: new Date(),
				});
			}
			// For example, update user document or create a registration record

			return NextResponse.json({ message: 'पंजीकरण सफल!' });
		}
		if (name === 'update-join-request-status') {
			const { assetId, status } = body;
			if (!assetId || !status) {
				return NextResponse.json(
					{ error: 'assetId and status are required' },
					{ status: 400 },
				);
			}
			const updatedRequest = await JoinRequest.findOneAndUpdate(
				{ assetId: assetId },
				{ status: status },
				{ new: true },
			);
			if (status === 'approved') {
				const updatedUser = await Users.findOneAndUpdate(
					{ id: assetId },
					{ $push: { userGroups: 'PatelTola' }, isTaggedToVillage: true },
					{ new: true },
				);
				const updatedDevice = await Device.findOneAndUpdate(
					{ assetId: assetId },
					{ $push: { groups: 'PatelTola' } },
					{ new: true },
				);
				``;
				console.log(updatedDevice, 'updatedUser');
			}

			return NextResponse.json(updatedRequest);
		}
		if (name === 'user-by-assetId') {
			const { assetId } = body;
			if (!assetId) {
				return NextResponse.json(
					{ error: 'assetId is required' },
					{ status: 400 },
				);
			}
			const user = await Users.findOne({ id: assetId }).lean();
			return NextResponse.json({ user });
		}
		if (name === 'get-contacts') {
			const { visibilityGroups } = body;
			if (!visibilityGroups || !Array.isArray(visibilityGroups)) {
				return NextResponse.json(
					{ error: 'visibilityGroups array is required' },
					{ status: 400 },
				);
			}
			const contacts = await Contacts.find({
				visibilityGroups: { $in: [...visibilityGroups, 'general'] },
			});
			return NextResponse.json({ contacts });
		}
		if (name === 'send-notification') {
			const { title, message, village } = body;
			if (!title || !message) {
				return NextResponse.json(
					{ error: 'title and message are required' },
					{ status: 400 },
				);
			}
			const devices = await Device.find({
				enabled: true,
				groups: village,
				pushToken: { $exists: true, $ne: null },
			});

			const tokens = devices.map((d) => d.pushToken);

			if (tokens.length === 0) {
				return NextResponse.json(
					{ error: 'No devices found for the specified village' },
					{ status: 404 },
				);
			}
			// Send notifications
			await sendPushNotifications(tokens, {
				title: title,
				body: message,
				sound: 'default',
				priority: 'high',
				data: {
					type: 'VILLAGE_NOTIFICATION',
					screen: 'Notifications',
				},
			});
			return NextResponse.json({ success: true, sentTo: tokens.length });
		}
		if (name === 'get-tamohar-meeting-by-id') {
			const { id } = body;
			const meeting = await TamoharMeeting.findById(id).lean();
			return NextResponse.json(meeting);
		}
		if (name === 'get-tamohar-meetings') {
			const { visibilityGroups } = body;

			const meetings = await TamoharMeeting.find({
				visibilityGroups,
			})
				.sort({ date: -1 })
				.lean();
			return NextResponse.json({ meetings });
		}

		return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
	} catch (error) {
		console.error('API POST Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
