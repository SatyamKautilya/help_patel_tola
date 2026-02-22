import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import SnapshotReport from '@/lib/models/shgModels/SnapshotReport';
import { Types } from 'mongoose';

export const runtime = 'nodejs';

export async function GET(req) {
	try {
		await connectToDatabase();
		const { searchParams } = new URL(req.url);
		const shgId = searchParams.get('shgId');
		const month = searchParams.get('month');

		if (!shgId || !month) {
			return NextResponse.json({ error: 'shgId and month are required' }, { status: 400 });
		}

		const report = await SnapshotReport.findOne({
			shgId: new Types.ObjectId(String(shgId)),
			month: String(month),
		})
			.select('cloudUrl cloudPath')
			.lean();

		if (!report?.cloudUrl) {
			return NextResponse.json({ error: 'Snapshot PDF not found' }, { status: 404 });
		}

		const fileResp = await fetch(report.cloudUrl);
		if (!fileResp.ok) {
			return NextResponse.json({ error: 'Failed to fetch snapshot from blob storage' }, { status: 502 });
		}

		const arrayBuffer = await fileResp.arrayBuffer();
		return new NextResponse(arrayBuffer, {
			status: 200,
			headers: {
				'content-type': 'application/pdf',
				'cache-control': 'no-store',
				'content-disposition': `inline; filename=\"snapshot-${month}.pdf\"`,
			},
		});
	} catch (err) {
		return NextResponse.json({ error: err.message || 'Failed to load snapshot PDF' }, { status: 500 });
	}
}
