import crypto from 'crypto';
import { cookies } from 'next/headers';
import AdminSession from '@/lib/models/AdminSession';
import Users from '@/lib/models/Users';
import { connectToDatabase } from '@/lib/mongodb';

const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_DAYS = 14;
const SCRYPT_KEYLEN = 64;

function hashToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex');
}

export function createPasswordHash(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const derivedKey = crypto
		.scryptSync(password, salt, SCRYPT_KEYLEN)
		.toString('hex');
	return `${salt}:${derivedKey}`;
}

export function verifyPassword(password, passwordHash = '') {
	try {
		const [salt, stored] = passwordHash.split(':');
		if (!salt || !stored) return false;
		const derived = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
		return crypto.timingSafeEqual(Buffer.from(stored), Buffer.from(derived));
	} catch {
		return false;
	}
}

export async function createSessionForUser(userId) {
	await connectToDatabase();
	const token = crypto.randomBytes(32).toString('hex');
	const tokenHash = hashToken(token);
	const expiresAt = new Date(
		Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
	);

	await AdminSession.create({
		tokenHash,
		userId,
		expiresAt,
	});

	return { token, expiresAt };
}

export async function getSessionUser() {
	await connectToDatabase();
	const cookieStore = cookies();
	const token = cookieStore.get(SESSION_COOKIE)?.value;
	if (!token) return null;

	const tokenHash = hashToken(token);
	const session = await AdminSession.findOne({ tokenHash }).lean();
	if (!session) return null;

	if (new Date(session.expiresAt) < new Date()) {
		await AdminSession.deleteOne({ _id: session._id });
		return null;
	}

	const user = await Users.findOne({ id: session.userId }).lean();
	if (!user) return null;
	return user;
}

export async function clearCurrentSession() {
	await connectToDatabase();
	const cookieStore = cookies();
	const token = cookieStore.get(SESSION_COOKIE)?.value;
	if (!token) return;
	const tokenHash = hashToken(token);
	await AdminSession.deleteOne({ tokenHash });
}

export const authCookieConfig = (expiresAt) => ({
	name: SESSION_COOKIE,
	options: {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		expires: expiresAt,
	},
});
