import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Device from '@/models/Device';

export async function POST(req) {
	try {
		/* --------------------------------------------------
       1. Basic App-Level Security
    -------------------------------------------------- */
		const appKey = req.headers.get('x-app-key');
		if (appKey !== process.env.APP_KEY) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		/* --------------------------------------------------
       2. Parse & Validate Payload
    -------------------------------------------------- */
		const {
			deviceId,
			assetId,
			pushToken,
			platform = 'android',
			village,
		} = await req.json();

		if (!deviceId || !assetId || !pushToken) {
			return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
		}

		/* --------------------------------------------------
       3. Connect DB
    -------------------------------------------------- */
		await dbConnect();

		/* --------------------------------------------------
       4. Upsert Device (Idempotent)
       - assetId = stable identity
       - token can change safely
    -------------------------------------------------- */
		await Device.updateOne(
			{ assetId }, // 👈 key identity
			{
				$set: {
					deviceId,
					pushToken,
					platform,
					village: village || 'tamohar',
					enabled: true,
					lastSeen: new Date(),
				},
				$setOnInsert: {
					createdAt: new Date(),
					groups: ['general'], // default group
				},
			},
			{ upsert: true },
		);

		/* --------------------------------------------------
       5. Success Response
    -------------------------------------------------- */
		return NextResponse.json({
			success: true,
			message: 'Device registered successfully',
		});
	} catch (error) {
		console.error('REGISTER DEVICE ERROR:', error);

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
