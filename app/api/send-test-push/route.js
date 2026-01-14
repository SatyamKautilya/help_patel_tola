import { NextResponse } from 'next/server';
import { sendPushNotifications } from '@/lib/sendPush';
import Device from '@/lib/models/Device';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
	try {
		// 🔐 Protect this route
		if (req.headers.get('x-app-key') !== process.env.APP_KEY) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const {
			title,
			body,
			data = {},
			priority = 'high',
			sound = 'default',
		} = await req.json();

		await connectToDatabase();

		// 🧲 Fetch enabled devices
		const devices = await Device.find({
			enabled: true,
			pushToken: { $exists: true, $ne: null },
		});

		const tokens = devices.map((d) => d.pushToken);

		if (!tokens.length) {
			return NextResponse.json({
				success: false,
				message: 'No active devices found',
			});
		}

		await sendPushNotifications(tokens, {
			title: title || '🌞 शुभ प्रभात तमोहर',
			body: body || 'यह आपकी पहली वास्तविक notification है',
			sound,
			priority,
			data: {
				type: data.type || 'GENERAL',
				screen: data.screen || 'Home',
				...data,
			},
		});

		return NextResponse.json({
			success: true,
			sentTo: tokens.length,
		});
	} catch (err) {
		console.error('Notification error:', err);
		return NextResponse.json({ error: 'Internal error' }, { status: 500 });
	}
}
