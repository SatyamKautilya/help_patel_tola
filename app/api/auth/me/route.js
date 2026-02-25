import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

/* Prevent Next.js from caching this route – it must read cookies on every request */
export const dynamic = 'force-dynamic';

function sanitizeUser(user = {}) {
	const { passwordHash, ...safe } = user;
	return safe;
}

const NO_CACHE_HEADERS = {
	'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
	Pragma: 'no-cache',
	Expires: '0',
};

export async function GET() {
	try {
		const user = await getSessionUser();
		if (!user) {
			return NextResponse.json(
				{ user: null },
				{ status: 401, headers: NO_CACHE_HEADERS },
			);
		}

		return NextResponse.json(
			{ user: sanitizeUser(user) },
			{ headers: NO_CACHE_HEADERS },
		);
	} catch (error) {
		console.error('Auth me error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500, headers: NO_CACHE_HEADERS },
		);
	}
}
