export const runtime = 'nodejs';

function sanitizeFileName(name = 'download.jpg') {
	return String(name)
		.replace(/[^\w.\-]+/g, '_')
		.replace(/_+/g, '_')
		.replace(/^_+|_+$/g, '') || 'download.jpg';
}

export async function POST(req) {
	try {
		const form = await req.formData();
		const dataUrl = String(form.get('dataUrl') || '');
		const fileName = sanitizeFileName(String(form.get('fileName') || 'download.jpg'));

		const match = dataUrl.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
		if (!match) {
			return new Response('Invalid JPEG payload', { status: 400 });
		}

		const buffer = Buffer.from(match[1], 'base64');
		return new Response(buffer, {
			status: 200,
			headers: {
				'Content-Type': 'image/jpeg',
				'Content-Disposition': `attachment; filename="${fileName}"`,
				'Cache-Control': 'no-store',
				'Content-Length': String(buffer.length),
			},
		});
	} catch {
		return new Response('Failed to download image', { status: 500 });
	}
}

