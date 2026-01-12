import { NextResponse } from 'next/server';
import { sendPushNotifications } from '@/lib/sendPush';
import Device from '@/lib/models/Device';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req) {
	// 🔐 Secure cron
	if (
		req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`
	) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	await connectToDatabase();

	const devices = await Device.find({ enabled: true });
	const tokens = devices.map((d) => d.pushToken);

	await sendPushNotifications(tokens, {
		title: '🌞 शुभ प्रभात तमोहर',
		body: 'आज का विचार: स्वास्थ्य ही सच्चा धन है',
	});

	return NextResponse.json({
		success: true,
		sent: tokens.length,
	});
}
