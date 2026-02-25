export const runtime = 'nodejs';

import { randomUUID } from 'crypto';
import { put } from '@vercel/blob';

function sanitizeFileName(name = 'download.file') {
	return (
		String(name)
			.replace(/[^\w.\-]+/g, '_')
			.replace(/_+/g, '_')
			.replace(/^_+|_+$/g, '') || 'download.file'
	);
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
		const src = String(searchParams.get('src') || '');
		const downloadName = sanitizeFileName(
			String(searchParams.get('name') || 'download.file'),
		);

		if (src) {
			let parsed;
			try {
				parsed = new URL(src);
			} catch {
				return new Response('Invalid source URL', { status: 400 });
			}
			if (parsed.protocol !== 'https:') {
				return new Response('Invalid source protocol', { status: 400 });
			}

			const fileResp = await fetch(src);
			if (!fileResp.ok) {
				return new Response('Source file unavailable', { status: 404 });
			}
			const buffer = Buffer.from(await fileResp.arrayBuffer());
			const contentType =
				fileResp.headers.get('content-type') || 'application/octet-stream';
			return new Response(buffer, {
				status: 200,
				headers: {
					'Content-Type': contentType,
					'Content-Disposition': `attachment; filename="${downloadName}"`,
					'Cache-Control': 'no-store',
					'Content-Length': String(buffer.length),
				},
			});
		}

		const token = String(searchParams.get('token') || '');
		if (!token) {
			return new Response('token or src is required', { status: 400 });
		}

		const file = tempStore.get(token);
		if (!file) {
			return new Response('File not found or expired', { status: 404 });
		}
		tempStore.delete(token);

		return new Response(file.buffer, {
			status: 200,
			headers: {
				'Content-Type': file.contentType || 'application/octet-stream',
				'Content-Disposition': `attachment; filename="${file.fileName}"`,
				'Cache-Control': 'no-store',
				'Content-Length': String(file.buffer.length),
			},
		});
	} catch {
		return new Response('Failed to download file', { status: 500 });
	}
}

export async function POST(req) {
	try {
		cleanupStore();
		const rawName = req.headers.get('x-file-name') || 'download.file';
		let decodedFileName = rawName;
		try {
			decodedFileName = decodeURIComponent(rawName);
		} catch {
			decodedFileName = rawName;
		}
		const fileName = sanitizeFileName(decodedFileName);
		const contentType =
			req.headers.get('content-type') || 'application/octet-stream';
		const isAllowedContentType =
			contentType.startsWith('image/') || contentType === 'application/pdf';
		if (!isAllowedContentType) {
			return new Response('Only image or PDF payload is allowed', {
				status: 400,
			});
		}

		const arrayBuffer = await req.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer || []);
		if (!buffer.length) {
			return new Response('Empty file payload', { status: 400 });
		}
		if (buffer.length > 8 * 1024 * 1024) {
			return new Response('File too large', { status: 413 });
		}

		const hasBlobToken = Boolean(
			process.env.BLOB_READ_WRITE_TOKEN ||
			process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
		);
		if (hasBlobToken) {
			const uploadPath = `tmp-downloads/${Date.now()}-${randomUUID()}-${fileName}`;
			const upload = await put(uploadPath, buffer, {
				access: 'public',
				contentType,
				addRandomSuffix: false,
				allowOverwrite: true,
			});
			const upstreamUrl = upload.downloadUrl || upload.url;
			const downloadUrl = `/api/download-jpeg?src=${encodeURIComponent(
				upstreamUrl,
			)}&name=${encodeURIComponent(fileName)}`;

			return Response.json({
				success: true,
				downloadUrl,
				storage: 'vercel-blob',
			});
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
			storage: 'memory',
		});
	} catch {
		return new Response('Failed to prepare file download', { status: 500 });
	}
}
