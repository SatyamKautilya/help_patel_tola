import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Users from '@/lib/models/Users';
import VillageList from '@/lib/models/VillageList';
import { createPasswordHash, getSessionUser } from '@/lib/auth';

const ADMIN_GROUP = 'super_admin';

function sanitizeUser(user = {}) {
	const { passwordHash, ...safe } = user;
	return safe;
}

function hasSuperAdminAccess(user) {
	const groups = Array.isArray(user?.userGroups) ? user.userGroups : [];
	return user?.isAdmin || groups.includes(ADMIN_GROUP);
}

export async function GET() {
	try {
		await connectToDatabase();
		const currentUser = await getSessionUser();
		if (!currentUser) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		if (!hasSuperAdminAccess(currentUser)) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const [users, villages] = await Promise.all([
			Users.find({ isActive: true })
				.sort({ updatedAt: -1 })
				.select('-passwordHash')
				.lean(),
			VillageList.find({}).sort({ villageName: 1 }).lean(),
		]);

		return NextResponse.json({ users, villages });
	} catch (error) {
		console.error('Admin users GET error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function POST(request) {
	try {
		await connectToDatabase();
		const currentUser = await getSessionUser();
		if (!currentUser) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		if (!hasSuperAdminAccess(currentUser)) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const body = await request.json();
		const mobileNumber = String(body?.mobileNumber || '').trim();
		const id = String(body?.id || '').trim();

		if (!mobileNumber || !id) {
			return NextResponse.json(
				{ error: 'id and mobileNumber are required' },
				{ status: 400 },
			);
		}

		const villageRoles = Array.isArray(body?.villageRoles)
			? body.villageRoles
					.filter((entry) => entry?.villageCode && entry?.role)
					.map((entry) => ({
						villageCode: String(entry.villageCode).trim(),
						role: String(entry.role).trim(),
					}))
			: [];

		const taggedVillage = Array.from(
			new Set(villageRoles.map((entry) => entry.villageCode).filter(Boolean)),
		);

		let updates = {
			id,
			name: String(body?.name || '').trim() || mobileNumber,
			mobileNumber,
			isAdmin: !!body?.isAdmin,
			userGroups: Array.isArray(body?.userGroups) ? body.userGroups : [],
			villageRoles,
			taggedVillage,
			isActive: true,
		};

		const password = String(body?.password || '').trim();
		if (password) {
			updates.passwordHash = createPasswordHash(password);
		}

		const existingActiveByMobile = await Users.findOne({
			mobileNumber,
			isActive: true,
			id: { $ne: id },
		})
			.select(
				'id userGroups villageRoles taggedVillage isAdmin passwordHash hindiName villageName name',
			)
			.lean();
		if (existingActiveByMobile?.id) {
			const hasProvidedGroups = Array.isArray(body?.userGroups);
			const hasProvidedVillageRoles = Array.isArray(body?.villageRoles);
			if (!hasProvidedGroups) {
				updates.userGroups = existingActiveByMobile.userGroups || [];
			}
			if (!hasProvidedVillageRoles) {
				updates.villageRoles = existingActiveByMobile.villageRoles || [];
				updates.taggedVillage = existingActiveByMobile.taggedVillage || [];
			}
			if (!body?.isAdmin) {
				updates.isAdmin = !!existingActiveByMobile.isAdmin;
			}
			if (!password && existingActiveByMobile.passwordHash) {
				updates.passwordHash = existingActiveByMobile.passwordHash;
			}
			if (!body?.name) {
				updates.name =
					existingActiveByMobile.name ||
					existingActiveByMobile.hindiName ||
					updates.name;
			}
			if (!body?.villageName && existingActiveByMobile.villageName) {
				updates.villageName = existingActiveByMobile.villageName;
			}
			await Users.updateOne(
				{ id: existingActiveByMobile.id },
				{ $set: { isActive: false } },
			);
		}

		const user = await Users.findOneAndUpdate(
			{ id },
			{ $set: updates },
			{ upsert: true, new: true, setDefaultsOnInsert: true },
		).lean();

		return NextResponse.json({ user: sanitizeUser(user) });
	} catch (error) {
		console.error('Admin users POST error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 },
		);
	}
}
