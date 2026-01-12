import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Device from '@/models/Device';
import { sendPushNotifications } from '@/lib/sendPush';

export async function POST(req) {
	try {
		// 🔐 Protect this route
		if (req.headers.get('x-app-key') !== process.env.APP_KEY) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const { title, body } = await req.json();

		await dbConnect();

		// 🧲 Fetch enabled devices
		const devices = await Device.find({ enabled: true });

		const tokens = devices.map((d) => d.pushToken);

		await sendPushNotifications(tokens, {
			title: title || '🌞 शुभ प्रभात तमोहर',
			body: body || 'यह आपकी पहली वास्तविक notification है',
		});

		return NextResponse.json({
			success: true,
			sentTo: tokens.length,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Internal error' }, { status: 500 });
	}
}
