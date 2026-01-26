import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Shg from '@/lib/models/shgModels/Shg';
import ShgMember from '@/lib/models/shgModels/ShgMember';
import Transaction from '@/lib/models/shgModels/Transaction';

export async function GET(req) {
	try {
		await connectToDatabase();

		const { searchParams } = new URL(req.url);
		const shgId = searchParams.get('shgId');
		const month = searchParams.get('month'); // YYYY-MM

		if (!shgId) {
			return NextResponse.json({ error: 'shgId is required' }, { status: 400 });
		}

		/* Resolve month range */
		const baseDate = month ? new Date(`${month}-01`) : new Date();

		const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
		const end = new Date(
			baseDate.getFullYear(),
			baseDate.getMonth() + 1,
			0,
			23,
			59,
			59,
		);

		/* Fetch SHG */
		const shg = await Shg.findById(shgId);
		if (!shg) {
			return NextResponse.json({ error: 'SHG not found' }, { status: 404 });
		}

		const expected = shg.monthlyContribution;

		/* Fetch active members */
		const members = await ShgMember.find({
			shgId,
			isActive: true,
		}).select('_id name');

		/* Fetch transactions for the month */
		const txns = await Transaction.find({
			shgId,
			type: { $in: ['MONTHLY_DEPOSIT', 'LUMP_SUM_CONTRIBUTION'] },
			date: { $gte: start, $lte: end },
		}).select('memberId amount');

		/* Aggregate paid amount per member */
		const paidMap = {};
		for (const tx of txns) {
			if (!tx.memberId) continue;
			const key = tx.memberId.toString();
			paidMap[key] = (paidMap[key] || 0) + tx.amount;
		}

		/* Build response */
		const result = members.map((m) => {
			const paid = paidMap[m._id.toString()] || 0;
			return {
				memberId: m._id,
				name: m.name,
				expected,
				paid,
				due: Math.max(expected - paid, 0),
			};
		});

		return NextResponse.json(result);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
