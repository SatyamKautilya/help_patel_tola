import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

function sanitizeUser(user = {}) {
	const { passwordHash, ...safe } = user;
	return safe;
}

export async function GET() {
	try {
		const user = await getSessionUser();
		if (!user) {
			return NextResponse.json({ user: null }, { status: 401 });
		}

		return NextResponse.json({ user: sanitizeUser(user) });
	} catch (error) {
		console.error('Auth me error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}
