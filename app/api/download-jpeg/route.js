export const runtime = 'nodejs';

import { randomUUID } from 'crypto';

function sanitizeFileName(name = 'download.jpg') {
	return String(name)
		.replace(/[^\w.\-]+/g, '_')
		.replace(/_+/g, '_')
		.replace(/^_+|_+$/g, '') || 'download.jpg';
}

const STORE_TTL_MS = 5 * 60 * 1000;
const MAX_STORE_ITEMS = 20;
const tempStore = new Map();

function cleanupStore() {
	const now = Date.now();
	for (const [token, item] of tempStore.entries()) {
		if (!item?.expiresAt || item.expiresAt <= now) {
			tempStore.delete(token);
		}
	}
	while (tempStore.size > MAX_STORE_ITEMS) {
		const firstKey = tempStore.keys().next().value;
		if (!firstKey) break;
		tempStore.delete(firstKey);
	}
}

export async function GET(req) {
	try {
		cleanupStore();
		const { searchParams } = new URL(req.url);
		const token = String(searchParams.get('token') || '');
		if (!token) {
			return new Response('token is required', { status: 400 });
		}

		const file = tempStore.get(token);
		if (!file) {
			return new Response('File not found or expired', { status: 404 });
		}
		tempStore.delete(token);

		return new Response(file.buffer, {
			status: 200,
			headers: {
				'Content-Type': file.contentType || 'image/jpeg',
				'Content-Disposition': `attachment; filename="${file.fileName}"`,
				'Cache-Control': 'no-store',
				'Content-Length': String(file.buffer.length),
			},
		});
	} catch {
		return new Response('Failed to download image', { status: 500 });
	}
}

export async function POST(req) {
	try {
		cleanupStore();
		const rawName = req.headers.get('x-file-name') || 'download.jpg';
		const fileName = sanitizeFileName(rawName);
		const contentType = req.headers.get('content-type') || 'image/jpeg';
		if (!contentType.startsWith('image/')) {
			return new Response('Only image payload is allowed', { status: 400 });
		}

		const arrayBuffer = await req.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer || []);
		if (!buffer.length) {
			return new Response('Empty image payload', { status: 400 });
		}
		if (buffer.length > 8 * 1024 * 1024) {
			return new Response('Image too large', { status: 413 });
		}

		const token = randomUUID();
		tempStore.set(token, {
			buffer,
			fileName,
			contentType,
			expiresAt: Date.now() + STORE_TTL_MS,
		});

		return Response.json({
			success: true,
			token,
			downloadUrl: `/api/download-jpeg?token=${encodeURIComponent(token)}`,
		});
	} catch {
		return new Response('Failed to prepare download', { status: 500 });
	}
}
