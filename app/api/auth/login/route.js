import { NextResponse } from 'next/server';
import Users from '@/lib/models/Users';
import {
	authCookieConfig,
	createSessionForUser,
	verifyPassword,
} from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';

function sanitizeUser(user = {}) {
	const { passwordHash, ...safe } = user;
	return safe;
}

export async function POST(request) {
	try {
		await connectToDatabase();
		const body = await request.json();
		const mobileNumber = String(body?.mobileNumber || '').trim();
		const password = String(body?.password || '');

		if (!mobileNumber || !password) {
			return NextResponse.json(
				{ error: 'mobileNumber and password are required' },
				{ status: 400 },
			);
		}

		const user = await Users.findOne({ mobileNumber }).lean();
		if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
			return NextResponse.json(
				{ error: 'Invalid mobile number or password' },
				{ status: 401 },
			);
		}

		const { token, expiresAt } = await createSessionForUser(user.id);
		const response = NextResponse.json({ user: sanitizeUser(user) });
		const cookie = authCookieConfig(expiresAt);
		response.cookies.set(cookie.name, token, cookie.options);
		return response;
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}
