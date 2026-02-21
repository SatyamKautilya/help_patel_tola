import { NextResponse } from 'next/server';
import { authCookieConfig, clearCurrentSession } from '@/lib/auth';

export async function POST() {
	try {
		await clearCurrentSession();
		const response = NextResponse.json({ success: true });
		const cookie = authCookieConfig(new Date(0));
		response.cookies.set(cookie.name, '', cookie.options);
		return response;
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}
