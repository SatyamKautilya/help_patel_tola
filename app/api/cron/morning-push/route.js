import { NextResponse } from 'next/server';
import { sendPushNotifications } from '@/lib/sendPush';
import Device from '@/lib/models/Device';
import { connectToDatabase } from '@/lib/mongodb';
import { getDailyHealthSuvichar } from '@/lib/healthSuvicharMessages';

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
	const dailyHealthMessage = getDailyHealthSuvichar();

	await sendPushNotifications(tokens, {
		title: '🌞 शुभ प्रभात तमोहर',
		body: `आज का स्वास्थ्य सुविचार: ${dailyHealthMessage}`,
	});

	return NextResponse.json({
		success: true,
		sent: tokens.length,
	});
}
