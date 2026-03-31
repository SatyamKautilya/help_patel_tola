export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

// import User from '@/models/User';
import Shg from '@/lib/models/shgModels/Shg';
import ShgMember from '@/lib/models/shgModels/ShgMember';
import Transaction from '@/lib/models/shgModels/Transaction';
import Loan from '@/lib/models/shgModels/Loan';
import LoanRepayment from '@/lib/models/shgModels/LoanRepayment';
import BankLoan from '@/lib/models/shgModels/BankLoan';
import { connectToDatabase } from '@/lib/mongodb';
import Users from '@/lib/models/Users';
import mongoose, { Types } from 'mongoose';
import {
	TransactionType,
	AccountType,
	LoanRepaymentStatus,
} from '@/lib/models/enum.js';
import LumpSumDeposit from '@/lib/models/shgModels/LumpSumDeposit';
import SnapshotReport from '@/lib/models/shgModels/SnapshotReport';
import { put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
	try {
		await connectToDatabase();
		const { searchParams } = new URL(req.url);
		const name = searchParams.get('name');

		const body = await req.json();

		switch (name) {
			case 'fetch-by-mobile':
				return fetchByMobile(body);

			case 'create-shg':
				return createSHG(body);

			case 'add-member':
				return addMember(body);
			case 'link-member-user':
				return linkMemberUser(body);

			case 'monthly-deposit':
				return monthlyDeposit(body);
			case 'save-expense':
				return saveExpense(body);

			case 'lump-sum':
				return lumpSumContribution(body);

			case 'create-loan':
				return createLoan(body);

			case 'loan-repayment':
				return loanRepayment(body);

			case 'bank-loan':
				return createBankLoan(body);

			case 'opening-balance':
				return openingBalance(body);

			case 'get-shg-by-user-id':
				return getShgByUserId(body);

			case 'monthly-contribution-due':
				return monthlyContributionDue(body);
			case 'save-monthly-savings':
				return saveBulkMonthlySavings(body);
			case 'get-onboarding-draft':
				return getOnboardingDraft(body);
			case 'save-onboarding-draft':
				return saveOnboardingDraft(body);
			case 'complete-onboarding':
				return completeOnboarding(body);

			case 'list-members':
				return allShgMembers(body);

			case 'save-penalty':
				return saveBulkPenaltyCharges(body);
			case 'member-passbook':
				return MemberPassbook(body);
			case 'list-active-loans':
				return ListActiveLoans(body);
			case 'collect-repayment':
				return collectRepayment(body);
			case 'collect-lump-sum':
				return lumpSumContribution(body);
			case 'dashboard-summary':
				return dashboardSummary(body);
			case 'generate-shg-snapshot':
				return generateShgSnapshot(body);
			case 'list-shg-snapshots':
				return listShgSnapshots(body);
			case 'get-shg-snapshot-data':
				return getShgSnapshotData(body);
			case 'generate-monthly-snapshots':
				return generateMonthlySnapshots(body);
			case 'list-revertable-transactions':
				return listRevertableTransactions(body);
			case 'revert-transaction':
				return revertTransaction(body);
			case 'list-monthly-transactions':
				return listMonthlyTransactions(body);
			default:
				return NextResponse.json(
					{ error: 'Invalid API action' },
					{ status: 400 },
				);
		}
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

export async function getShgByUserId(data) {
	const { userId } = data;

	if (!userId) {
		throw new Error('userId is required');
	}

	/* 1ï¸âƒ£ Get active SHG memberships of user */
	let memberships = await ShgMember.find({
		userId: userId,
		isActive: true,
	}).select('shgId role ');

	if (memberships.length === 0) {
		await autoAttachMemberByMobile(userId);
		memberships = await ShgMember.find({
			userId: userId,
			isActive: true,
		}).select('shgId role ');
	}

	if (memberships.length === 0) return NextResponse.json([]);

	const shgIds = memberships.map((m) => m.shgId);

	/* 2ï¸âƒ£ Fetch SHG basic details */
	const shgs = await Shg.find({
		_id: { $in: shgIds },
		status: 'ACTIVE',
	}).select('name village totalMembers');

	/* 3ï¸âƒ£ Get active member count per SHG */

	/* 4ï¸âƒ£ Merge everything */
	const result = shgs.map((shg) => {
		const membership = memberships.find(
			(m) => m.shgId.toString() === shg._id.toString(),
		);

		return {
			shgId: shg._id,
			name: shg.name,
			memberId: membership._id,
			village: shg.village,
			totalMembers: shg.totalMembers || 0,
			role: membership?.role || 'MEMBER',
		};
	});

	return NextResponse.json(result);
}

export async function saveBulkMonthlySavings(payload) {
	const { shgId, month, contributions } = payload;

	if (!shgId || !Array.isArray(contributions)) {
		throw new Error('Invalid payload');
	}

	const shgObjectId = new Types.ObjectId(String(shgId));

	const baseMonth = month ? new Date(`${month}-01`) : new Date();

	const transactions = [];

	for (const entry of contributions) {
		if (!entry.memberId || !entry.amount || entry.amount <= 0) {
			continue; // skip invalid or zero entries
		}

		transactions.push({
			shgId: shgObjectId,
			fromAccount: `MEMBER_SAVINGS_${entry.memberId}`,
			toAccount: AccountType.SHG_CASH,
			amount: Number(entry.amount),
			type: TransactionType.MONTHLY_DEPOSIT,
			memberId: new Types.ObjectId(String(entry.memberId)),
			date: new Date(), // actual collection date
			meta: {
				month: baseMonth.toISOString().slice(0, 7), // YYYY-MM
			},
			createdBy: 'SYSTEM', // or logged-in admin
		});
	}

	if (transactions.length === 0) {
		return NextResponse.json({
			success: false,
			message: 'No valid contributions found',
		});
	}

	const result = await Transaction.insertMany(transactions);

	return NextResponse.json({
		success: true,
		month: baseMonth.toISOString().slice(0, 7),
		totalMembers: result.length,
		totalAmount: result.reduce((sum, t) => sum + t.amount, 0),
		transactionIds: result.map((t) => t._id),
	});
}

async function fetchByMobile(data) {
	const user = await Users.findOne({
		mobileNumber: data.mobile,
		isActive: true,
	})?.lean();
	return NextResponse.json(user);
}
async function createSHG(data) {
	const shg = await Shg.create({
		name: data.name,
		village: data.village,
		block: data.block,
		district: data.district,
		monthlyContribution: data.monthlyContribution,
		formationDate: data.formationDate,
		totalMembers: data.totalMembers,
		createdBy: data.createdBy,
		status: data.status || 'DRAFT',
		onboardingStep: data.onboardingStep || 1,
		onboardingDraft: data.onboardingDraft || {},
	});

	return NextResponse.json(shg);
}

async function addMember(data) {
	const normalizedMobile = String(data.mobileNumber || '').trim();
	let resolvedUserId = data.userId || null;

	if (!resolvedUserId && normalizedMobile) {
		const existingUser = await Users.findOne({
			mobileNumber: normalizedMobile,
			isActive: true,
		})
			.select('_id')
			.lean();
		resolvedUserId = existingUser?._id || null;
	}

	const member = await ShgMember.create({
		shgId: data.shgId,
		userId: resolvedUserId,
		name: data.name,
		memberCode: data.memberCode,
		mobileNumber: normalizedMobile || null,
		role: data.role,
		hasMobileAccess: !!resolvedUserId,
		joinedAt: new Date(),
	});

	return NextResponse.json(member);
}

async function autoAttachMemberByMobile(userId) {
	if (!userId) return { matched: 0, modified: 0 };

	const user = await Users.findOne({ _id: userId, isActive: true })
		.select('_id mobileNumber')
		.lean();

	const mobileNumber = String(user?.mobileNumber || '').trim();
	if (!mobileNumber) return { matched: 0, modified: 0 };

	const attachResult = await ShgMember.updateMany(
		{
			mobileNumber,
			isActive: true,
			$or: [{ userId: null }, { userId: { $exists: false } }],
		},
		{
			$set: {
				userId: user._id,
				hasMobileAccess: true,
			},
		},
	);

	return {
		matched: attachResult.matchedCount || 0,
		modified: attachResult.modifiedCount || 0,
	};
}

async function linkMemberUser(data) {
	const { shgId, memberId, mobileNumber } = data || {};

	if (!shgId || !memberId || !mobileNumber) {
		return NextResponse.json(
			{ error: 'shgId, memberId and mobileNumber are required' },
			{ status: 400 },
		);
	}

	const normalizedMobile = String(mobileNumber).trim();
	const user = await Users.findOne({
		mobileNumber: normalizedMobile,
		isActive: true,
	})
		.select('_id mobileNumber')
		.lean();

	if (!user?._id) {
		return NextResponse.json(
			{ error: 'No active app user found for this mobile number' },
			{ status: 404 },
		);
	}

	const updatedMember = await ShgMember.findOneAndUpdate(
		{
			_id: memberId,
			shgId: shgId,
			isActive: true,
		},
		{
			$set: {
				userId: user._id,
				hasMobileAccess: true,
				mobileNumber: normalizedMobile,
			},
		},
		{ new: true },
	).lean();

	if (!updatedMember) {
		return NextResponse.json(
			{ error: 'Active member not found for this SHG' },
			{ status: 404 },
		);
	}

	return NextResponse.json({ success: true, member: updatedMember });
}

async function getOnboardingDraft(data) {
	const { createdBy } = data;
	if (!createdBy) {
		return NextResponse.json(
			{ error: 'createdBy is required' },
			{ status: 400 },
		);
	}

	const shg = await Shg.findOne({
		createdBy,
		status: 'DRAFT',
	})
		.sort({ updatedAt: -1 })
		.lean();

	if (!shg) {
		return NextResponse.json({ shg: null, members: [] });
	}

	const members = await ShgMember.find({ shgId: shg._id, isActive: true })
		.sort({ createdAt: 1 })
		.lean();

	return NextResponse.json({ shg, members });
}

async function saveOnboardingDraft(data) {
	const { shgId, onboardingStep, onboardingDraft } = data;
	if (!shgId) {
		return NextResponse.json({ error: 'shgId is required' }, { status: 400 });
	}

	const shg = await Shg.findByIdAndUpdate(
		shgId,
		{
			$set: {
				status: 'DRAFT',
				onboardingStep: onboardingStep || 1,
				onboardingDraft: onboardingDraft || {},
			},
		},
		{ new: true },
	).lean();

	return NextResponse.json({ shg });
}

async function completeOnboarding(data) {
	const { shgId } = data;
	if (!shgId) {
		return NextResponse.json({ error: 'shgId is required' }, { status: 400 });
	}

	const shg = await Shg.findByIdAndUpdate(
		shgId,
		{
			$set: {
				status: 'ACTIVE',
				onboardingStep: 4,
			},
			$unset: { onboardingDraft: '' },
		},
		{ new: true },
	).lean();

	return NextResponse.json({ shg });
}
async function monthlyDeposit(data) {
	const txn = await Transaction.create({
		shgId: data.shgId,
		fromAccount: `MEMBER_SAVINGS_${data.memberId}`,
		toAccount: AccountType.SHG_CASH,
		amount: data.amount,
		type: TransactionType.MONTHLY_DEPOSIT,
		memberId: data.memberId,
		date: new Date(),
		meta: { month: data.month },
	});

	return NextResponse.json(txn);
}

async function saveExpense(data) {
	const { shgId, amount, expenseDate, reason, createdBy } = data || {};

	if (!shgId || !amount || Number(amount) <= 0) {
		return NextResponse.json(
			{ error: 'shgId and valid amount are required' },
			{ status: 400 },
		);
	}

	const txDate = expenseDate ? new Date(expenseDate) : new Date();
	if (Number.isNaN(txDate.getTime())) {
		return NextResponse.json({ error: 'Invalid expenseDate' }, { status: 400 });
	}

	const txn = await Transaction.create({
		shgId,
		fromAccount: AccountType.SHG_CASH,
		toAccount: AccountType.EXTERNAL,
		amount: Number(amount),
		type: TransactionType.OPENING_BALANCE,
		date: txDate,
		meta: {
			category: 'MANUAL_EXPENSE',
			reason: String(reason || '').trim() || null,
		},
		source: 'ADMIN',
		createdBy: createdBy || 'SYSTEM',
	});

	return NextResponse.json({ success: true, transaction: txn });
}
// async function lumpSumContribution(data) {
//   const txns = [];

//   for (const memberId of data.memberIds) {
//     txns.push({
//       shgId: data.shgId,
//       fromAccount: `MEMBER_SAVINGS_${memberId}`,
//       toAccount: AccountType.SHG_CASH,
//       amount: data.amountPerMember,
//       type: TransactionType.LUMP_SUM_CONTRIBUTION,
//       memberId,
//       date: new Date(),
//       meta: { reason: data.reason },
//     });
//   }

//   const result = await Transaction.insertMany(txns);
//   return NextResponse.json(result);
// }

async function createLoan(data) {
	const issuedDate = data.issuedDate ? new Date(data.issuedDate) : new Date();
	const loan = await Loan.create({
		shgId: data.shgId,
		memberId: data.memberId,
		principal: data.principal,
		interestRate: data.interestRate,
		loanReason: data.reason || '',
		tenureMonths: data.tenureMonths,
		issuedDate,
		approvedBy: data.approvedBy,
	});

	await Transaction.create({
		shgId: data.shgId,
		fromAccount: AccountType.SHG_CASH,
		toAccount: `MEMBER_LOAN_${data.memberId}`,
		amount: data.principal,
		type: TransactionType.LOAN_DISBURSEMENT,
		memberId: data.memberId,
		date: issuedDate,
		meta: { loanId: loan._id, reason: data.reason || '' },
	});

	return NextResponse.json(loan);
}

async function loanRepayment(data) {
	const loan = await Loan.findById(data.loanId);
	const paymentDate = data.paymentDate
		? new Date(data.paymentDate)
		: new Date();
	const month = data.month || paymentDate.toISOString().slice(0, 7);
	const repayment = await LoanRepayment.create({
		loanId: data.loanId,
		shgId: data.shgId,
		memberId: data.memberId,
		amount: data.amount,
		principalComponent: data.principal,
		interestComponent: data.interest,
		month,
		paymentDate,
		receivedBy: data.receivedBy,
	});

	// Create separate transaction entries for principal and interest
	const txnDocs = [];
	const principalAmount = Number(data.principal || 0);
	const interestAmount = Number(data.interest || 0);

	if (principalAmount > 0) {
		txnDocs.push({
			shgId: data.shgId,
			fromAccount: AccountType.MEMBER_CASH,
			toAccount: AccountType.SHG_CASH,
			amount: principalAmount,
			type: TransactionType.LOAN_REPAYMENT,
			memberId: data.memberId,
			date: paymentDate,
			meta: { loanId: data.loanId, loanRepaymentId: repayment._id, month },
		});
	}

	if (interestAmount > 0) {
		txnDocs.push({
			shgId: data.shgId,
			fromAccount: AccountType.MEMBER_CASH,
			toAccount: AccountType.INTEREST_INCOME,
			amount: interestAmount,
			type: TransactionType.INTEREST_PAYMENT,
			memberId: data.memberId,
			date: paymentDate,
			meta: { loanId: data.loanId, loanRepaymentId: repayment._id, month },
		});
	}

	if (txnDocs.length > 0) {
		await Transaction.insertMany(txnDocs);
	}

	/* Auto-close loan if outstanding principal becomes zero */
	if (loan) {
		const principalAgg = await LoanRepayment.aggregate([
			{ $match: { loanId: loan._id, isReversed: false } },
			{
				$group: {
					_id: null,
					totalPrincipalPaid: { $sum: '$principalComponent' },
				},
			},
		]);
		const totalPrincipalPaid = principalAgg[0]?.totalPrincipalPaid || 0;
		const outstanding = Math.max(
			Number(loan.principal || 0) - totalPrincipalPaid,
			0,
		);
		if (outstanding === 0) {
			await Loan.updateOne(
				{ _id: loan._id },
				{ status: LoanRepaymentStatus.CLOSED, closedAt: new Date() },
			);
		}
	}

	return NextResponse.json(repayment);
}
async function createBankLoan(data) {
	const loan = await BankLoan.create({
		shgId: data.shgId,
		bankName: data.bankName,
		principal: data.principal,
		interestRate: data.interestRate,
		tenureMonths: data.tenureMonths,
		issuedDate: new Date(),
	});

	await Transaction.create({
		shgId: data.shgId,
		fromAccount: AccountType.BANK,
		toAccount: AccountType.SHG_CASH,
		amount: data.principal,
		type: TransactionType.BANK_LOAN_RECEIVED,
		date: new Date(),
		meta: { bankLoanId: loan._id },
	});

	return NextResponse.json(loan);
}
async function openingBalance(data) {
	// const existing = await Transaction.findOne({
	// 	shgId: data.shgId,
	// 	type: 'OPENING_BALANCE',
	// 	memberId: data.memberId || null,
	// });

	// if (existing) {
	// 	throw new Error('Opening balance already set for this SHG');
	// }

	const fromAccount = AccountType[data.fromAccount] || data.fromAccount;
	const toAccount = AccountType[data.toAccount] || data.toAccount;
	const txnDate = data?.date ? new Date(data.date) : new Date();
	const txnMeta = {
		note: 'Onboarding opening balance',
		...(data?.meta || {}),
	};

	const txn = await Transaction.create({
		shgId: data.shgId,
		fromAccount,
		toAccount,
		amount: data.amount,
		type: TransactionType.OPENING_BALANCE,
		memberId: data.memberId || null,
		date: txnDate,
		meta: txnMeta,
	});

	return NextResponse.json(txn);
}

async function monthlyContributionDue(data) {
	try {
		const { shgId, month } = data;

		// Fetch all active members of the SHG
		if (!shgId) {
			return NextResponse.json({ error: 'shgId is required' }, { status: 400 });
		}

		const shgObjectId = shgId;

		/* Month range */
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

		/* SHG */
		const shg = await Shg.findById(shgObjectId);
		if (!shg) {
			return NextResponse.json({ error: 'SHG not found' }, { status: 404 });
		}

		const expectedPerMember = shg.monthlyContribution;

		/* Members */
		const members = await ShgMember.find({
			shgId: shgObjectId,
			isActive: true,
		}).select('_id name');

		/* Transactions */
		const txns = await Transaction.find({
			shgId: shgObjectId,
			isReversed: false,
			type: {
				$in: [
					TransactionType.MONTHLY_DEPOSIT,
					TransactionType.LUMP_SUM_CONTRIBUTION,
				],
			},
			'meta.month': month || baseDate.toISOString().slice(0, 7),
		}).select('memberId amount');

		/* Aggregate paid per member */
		const paidMap = {};
		txns.forEach((tx) => {
			if (!tx.memberId) return;
			const key = tx.memberId.toString();
			paidMap[key] = (paidMap[key] || 0) + tx.amount;
		});

		/* Build member rows */
		const memberRows = members.map((m) => {
			const paid = paidMap[m._id.toString()] || 0;
			const due = Math.max(expectedPerMember - paid, 0);

			return {
				memberId: m._id,
				name: m.name,
				expected: expectedPerMember,
				paid,
				due,
			};
		});

		/* Summary */
		const totalExpected = expectedPerMember * members.length;
		const totalCollected = Object.values(paidMap).reduce((a, b) => a + b, 0);

		return NextResponse.json({
			shgId,
			month: month || `${baseDate.getFullYear()}-${baseDate.getMonth() + 1}`,
			monthlyContribution: expectedPerMember,
			summary: {
				totalMembers: members.length,
				totalExpected,
				totalCollected,
				totalDue: Math.max(totalExpected - totalCollected, 0),
			},
			members: memberRows,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
async function allShgMembers(data) {
	const { shgId } = data;
	if (!shgId) {
		throw new Error('shgId is required');
	}
	const members = await ShgMember.find({
		shgId: shgId,
		isActive: true,
	}).select(
		'_id name memberCode role hasMobileAccess joinedAt mobileNumber userId',
	);
	return NextResponse.json({ members });
}

async function saveBulkPenaltyCharges(data) {
	const { shgId, month, penalties } = data;

	if (!shgId || !Array.isArray(penalties)) {
		throw new Error('Invalid payload');
	}

	const shgObjectId = new Types.ObjectId(String(shgId));
	const baseMonth = month ? new Date(`${month}-01`) : new Date();
	const transactionsList = [];

	for (const entry of penalties) {
		if (!entry.memberId || !entry.amount || entry.amount <= 0) {
			continue; // skip invalid or zero entries
		}

		transactionsList.push({
			shgId: shgObjectId,
			fromAccount: `MEMBER_PENALTY_${entry.memberId}`,
			toAccount: AccountType.SHG_CASH,
			amount: Number(entry.amount),
			type: TransactionType.PENALTY_CHARGE,
			memberId: new Types.ObjectId(String(entry.memberId)),
			date: new Date(),
			meta: {
				month: baseMonth.toISOString().slice(0, 7),
				penaltyType: entry.penaltyType,
				reason: entry.reason || null,
			},
			createdBy: 'SYSTEM',
		});
	}

	if (transactionsList.length === 0) {
		return NextResponse.json({
			success: false,
			message: 'No valid penalty charges found',
		});
	}

	const result = await Transaction.insertMany(transactionsList);

	return NextResponse.json({
		success: true,
		month: baseMonth.toISOString().slice(0, 7),
		totalMembers: result.length,
		totalAmount: result.reduce((sum, t) => sum + t.amount, 0),
		transactionIds: result.map((t) => t._id),
	});
}

async function MemberPassbook(data) {
	const { shgid, memberId } = data;
	if (!shgid || !memberId) {
		throw new Error('shgid and memberId are required');
	}

	const shgObjectId = new Types.ObjectId(String(shgid));
	const memberObjectId = new Types.ObjectId(String(memberId));
	const [
		transactions,
		shgLumpSumAgg,
		memberOwnLumpSumAgg,
		openingBalanceLumpSumAgg,
		activeMemberCount,
		activeLoans,
		repaymentAgg,
	] = await Promise.all([
		Transaction.find({
			shgId: shgObjectId,
			memberId: memberObjectId,
			isReversed: false,
		}).sort({ date: -1 }),
		Transaction.aggregate([
			{
				$match: {
					shgId: shgObjectId,
					type: TransactionType.LUMP_SUM_CONTRIBUTION,
					isReversed: false,
				},
			},
			{
				$group: {
					_id: null,
					totalLumpSum: { $sum: '$amount' },
				},
			},
		]),
		// Member's own individual LUMP_SUM_CONTRIBUTION transactions
		Transaction.aggregate([
			{
				$match: {
					shgId: shgObjectId,
					memberId: memberObjectId,
					type: TransactionType.LUMP_SUM_CONTRIBUTION,
					isReversed: false,
				},
			},
			{
				$group: {
					_id: null,
					totalLumpSum: { $sum: '$amount' },
				},
			},
		]),
		// Opening balance lump sum (shared pool from onboarding)
		Transaction.aggregate([
			{
				$match: {
					shgId: shgObjectId,
					isReversed: false,
					type: TransactionType.OPENING_BALANCE,
					'meta.category': 'TOTAL_LUMP_SUM_PAYMENTS_TILL_DATE',
				},
			},
			{
				$group: {
					_id: null,
					totalLumpSum: { $sum: '$amount' },
				},
			},
		]),
		ShgMember.countDocuments({ shgId: shgObjectId, isActive: true }),
		Loan.find({
			shgId: shgObjectId,
			memberId: memberObjectId,
			status: { $ne: LoanRepaymentStatus.CLOSED },
		})
			.select('_id principal')
			.lean(),
		LoanRepayment.aggregate([
			{
				$match: {
					shgId: shgObjectId,
					memberId: memberObjectId,
					isReversed: false,
				},
			},
			{
				$group: {
					_id: '$loanId',
					totalPrincipalPaid: { $sum: '$principalComponent' },
				},
			},
		]),
	]);

	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

	// Calculate summary
	let totalMonthlySavingsPaid = 0;
	let totalLoansDisbursed = 0;
	let totalLoanRepayments = 0;
	let totalPenalties = 0;

	transactions.forEach((tx) => {
		switch (tx.type) {
			case TransactionType.MONTHLY_DEPOSIT:
				totalMonthlySavingsPaid += tx.amount;
				break;
			case TransactionType.OPENING_BALANCE:
				// Include onboarding initial member savings in savings totals.
				if (
					String(tx.toAccount || '') === 'MEMBER_SAVINGS' ||
					tx?.meta?.category === 'TOTAL_SAVINGS_TILL_DATE' ||
					tx?.memberId
				) {
					totalMonthlySavingsPaid += tx.amount;
				}
				break;
			case TransactionType.LOAN_DISBURSEMENT:
				totalLoansDisbursed += tx.amount;
				break;

			case TransactionType.LOAN_REPAYMENT:
			case TransactionType.INTEREST_PAYMENT:
				totalLoanRepayments += tx.amount;
				break;

			case TransactionType.PENALTY_CHARGE:
				totalPenalties += tx.amount;
				break;
			default:
				break;
		}
	});

	const totalShgLumpSum = Number(shgLumpSumAgg?.[0]?.totalLumpSum || 0);
	const memberOwnLumpSum = Number(memberOwnLumpSumAgg?.[0]?.totalLumpSum || 0);
	const sharedPoolLumpSum = Number(
		openingBalanceLumpSumAgg?.[0]?.totalLumpSum || 0,
	);
	// Shared pool (from onboarding) divided equally + member's own individual contributions
	const perMemberSharedPoolShare =
		activeMemberCount > 0 ? sharedPoolLumpSum / activeMemberCount : 0;
	const perMemberLumpSumShare = perMemberSharedPoolShare + memberOwnLumpSum;
	const totalSavings = totalMonthlySavingsPaid + perMemberLumpSumShare;

	/* Calculate outstanding loan from Loan + LoanRepayment (only active loans, principal only) */
	const principalPaidMap = Object.fromEntries(
		repaymentAgg.map((r) => [String(r._id), r.totalPrincipalPaid || 0]),
	);
	let outstandingLoan = 0;
	let activeLoanDisbursed = 0;
	for (const loan of activeLoans) {
		const principal = Number(loan.principal || 0);
		activeLoanDisbursed += principal;
		const paid = Number(principalPaidMap[String(loan._id)] || 0);
		outstandingLoan += Math.max(principal - paid, 0);
	}

	const summary = {
		totalSavings: Number(totalSavings.toFixed(2)),
		totalMonthlySavingsPaid: Number(totalMonthlySavingsPaid.toFixed(2)),
		lumpSumShare: Number(perMemberLumpSumShare.toFixed(2)),
		totalLoansDisbursed: activeLoanDisbursed,
		totalLoanRepayments,
		outstandingLoan: Number(outstandingLoan.toFixed(2)),
		totalPenalties,
	};
	return NextResponse.json({
		transactions: transactions.filter(
			(tx) => new Date(tx.date) >= sixMonthsAgo,
		),
		summary,
	});
}

async function ListActiveLoans(data) {
	const { shgId } = data;
	if (!shgId) throw new Error('shgId is required');

	const shgObjectId = new Types.ObjectId(String(shgId));
	const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

	/* ---------------- 1ï¸âƒ£ Fetch active loans ---------------- */
	const loans = await Loan.find({
		shgId: shgObjectId,
		status: LoanRepaymentStatus.ONGOING,
	}).lean();

	if (!loans.length) {
		return NextResponse.json({ loans: [] });
	}

	/* ---------------- 2ï¸âƒ£ Fetch members ---------------- */
	const memberIds = loans.map((l) => l.memberId);

	const members = await ShgMember.find({
		_id: { $in: memberIds },
	}).select('_id name');

	const memberMap = Object.fromEntries(
		members.map((m) => [String(m._id), m.name]),
	);

	const loanIds = loans.map((l) => l._id);

	/* ---------------- 3ï¸âƒ£ Aggregate repayments ---------------- */
	const repaymentAgg = await LoanRepayment.aggregate([
		{
			$match: {
				loanId: { $in: loanIds },
				isReversed: false,
			},
		},
		{
			$group: {
				_id: '$loanId',
				totalPrincipalPaid: { $sum: '$principalComponent' },
				totalInterestPaid: { $sum: '$interestComponent' },
			},
		},
	]);

	const principalPaidMap = Object.fromEntries(
		repaymentAgg.map((r) => [String(r._id), r.totalPrincipalPaid || 0]),
	);

	/* ---------------- 4ï¸âƒ£ Interest paid THIS MONTH ---------------- */
	const interestThisMonthAgg = await LoanRepayment.aggregate([
		{
			$match: {
				loanId: { $in: loanIds },
				month: currentMonth,
				isReversed: false,
			},
		},
		{
			$group: {
				_id: '$loanId',
				interestPaidThisMonth: {
					$sum: '$interestComponent',
				},
			},
		},
	]);

	const interestPaidThisMonthMap = Object.fromEntries(
		interestThisMonthAgg.map((r) => [
			String(r._id),
			r.interestPaidThisMonth || 0,
		]),
	);

	/* ---------------- 5ï¸âƒ£ Enrich loans ---------------- */
	const enrichedLoans = loans.map((loan) => {
		const principal = loan.principal;

		const principalPaid = principalPaidMap[String(loan._id)] || 0;

		const outstandingPrincipal = Math.max(principal - principalPaid, 0);

		// Full interest for the month
		let fullMonthlyInterest =
			outstandingPrincipal * (loan.interestRate / 100);

		// 📌 Minimum 1-month interest rule:
		// If loan was issued this month, charge at least 1 full month interest on original principal
		const issuedMonth = loan.issuedDate
			? new Date(loan.issuedDate).toISOString().slice(0, 7)
			: loan.createdAt
				? new Date(loan.createdAt).toISOString().slice(0, 7)
				: null;
		const minimumInterest = principal * (loan.interestRate / 100);
		if (issuedMonth === currentMonth && fullMonthlyInterest < minimumInterest) {
			fullMonthlyInterest = minimumInterest;
		}

		// Interest already paid this month
		const interestPaidThisMonth =
			interestPaidThisMonthMap[String(loan._id)] || 0;

		// ðŸ”¥ FIX: remaining interest only
		const remainingMonthlyInterest = Math.max(
			fullMonthlyInterest - interestPaidThisMonth,
			0,
		);

		return {
			_id: loan._id,
			memberId: loan.memberId,
			memberName: memberMap[String(loan.memberId)] || '-',

			principal,
			interestRate: loan.interestRate,

			outstandingPrincipal,
			monthlyInterest: Number(remainingMonthlyInterest.toFixed(2)),
		};
	});

	return NextResponse.json({ loans: enrichedLoans });
}

async function collectRepayment(data) {
	const { shgId, loanId, memberId, amount, principal, interest, receivedBy, forceOverride } =
		data;

	if (
		!shgId ||
		!loanId ||
		!memberId ||
		amount == null ||
		principal == null ||
		interest == null
	) {
		throw new Error('Missing required fields');
	}

	const totalAmount = Number(amount);
	const principalComponent = Number(principal);
	const interestComponent = Number(interest);

	if (totalAmount <= 0 || principalComponent < 0 || interestComponent < 0) {
		throw new Error('Invalid repayment values');
	}

	/* ---------------- 1ï¸âƒ£ Basic consistency ---------------- */
	if (
		Number((principalComponent + interestComponent).toFixed(2)) !==
		Number(totalAmount.toFixed(2))
	) {
		throw new Error('principal + interest must equal total amount');
	}

	const currentMonth = new Date().toISOString().slice(0, 7);

	/* ---------------- 2ï¸âƒ£ Fetch loan ---------------- */
	const loan = await Loan.findOne({
		_id: new Types.ObjectId(String(loanId)),
		shgId: new Types.ObjectId(String(shgId)),
		memberId: new Types.ObjectId(String(memberId)),
		status: LoanRepaymentStatus.ONGOING,
	}).lean();

	if (!loan) {
		throw new Error('Active loan not found');
	}

	/* ---------------- 3ï¸âƒ£ Calculate outstanding principal ---------------- */
	const principalAgg = await LoanRepayment.aggregate([
		{
			$match: {
				loanId: loan._id,
				isReversed: false,
			},
		},
		{
			$group: {
				_id: null,
				totalPrincipalPaid: { $sum: '$principalComponent' },
			},
		},
	]);

	const totalPrincipalPaid = principalAgg[0]?.totalPrincipalPaid || 0;

	const outstandingPrincipal = Math.max(loan.principal - totalPrincipalPaid, 0);

	if (outstandingPrincipal === 0) {
		throw new Error('Loan already closed');
	}

	/* ---------------- 4ï¸âƒ£ Monthly interest calculation ---------------- */
	/* ---------------- Minimum-1-month interest + monthly calculation ---- */
	let fullMonthlyInterest = outstandingPrincipal * (loan.interestRate / 100);

	// Minimum 1-month interest rule:
	// If loan was issued this month, charge at least 1 full month interest on original principal
	const issuedMonth = loan.issuedDate
		? new Date(loan.issuedDate).toISOString().slice(0, 7)
		: loan.createdAt
			? new Date(loan.createdAt).toISOString().slice(0, 7)
			: null;
	const minimumInterest = loan.principal * (loan.interestRate / 100);
	if (issuedMonth === currentMonth && fullMonthlyInterest < minimumInterest) {
		fullMonthlyInterest = minimumInterest;
	}

	/* ---------------- Interest already paid THIS MONTH ---------------- */
	const interestMonthAgg = await LoanRepayment.aggregate([
		{
			$match: {
				loanId: loan._id,
				month: currentMonth,
				isReversed: false,
			},
		},
		{
			$group: {
				_id: null,
				interestPaidThisMonth: { $sum: '$interestComponent' },
			},
		},
	]);

	const interestPaidThisMonth = interestMonthAgg[0]?.interestPaidThisMonth || 0;

	const remainingInterestThisMonth = Math.max(
		fullMonthlyInterest - interestPaidThisMonth,
		0,
	);

	/* ---------------- Business validations ---------------- */

	// Principal cannot exceed outstanding
	if (principalComponent > outstandingPrincipal) {
		throw new Error('Principal exceeds outstanding amount');
	}

	// Interest mismatch: return a warning so the frontend can show a confirmation popup
	if (!forceOverride && interestComponent !== Number(remainingInterestThisMonth.toFixed(2))) {
		return NextResponse.json({
			interestMismatch: true,
			expectedInterest: Number(remainingInterestThisMonth.toFixed(2)),
			enteredInterest: interestComponent,
			outstandingPrincipal,
			message: `अपेक्षित ब्याज ₹${remainingInterestThisMonth.toFixed(2)} है, लेकिन ₹${interestComponent.toFixed(2)} दर्ज किया गया है। क्या आप जारी रखना चाहते हैं?`,
		});
	}

	// If principal is being paid and not force-overriding, interest must be fully settled first
	if (
		!forceOverride &&
		principalComponent > 0 &&
		remainingInterestThisMonth > 0 &&
		interestComponent < remainingInterestThisMonth
	) {
		throw new Error('Monthly interest must be fully paid first');
	}

	/* ---------------- 7ï¸âƒ£ Atomic write ---------------- */
	const session = await Loan.startSession();
	session.startTransaction();

	try {
		const repayment = await LoanRepayment.create(
			[
				{
					loanId: loan._id,
					shgId: loan.shgId,
					memberId: loan.memberId,

					amount: totalAmount,
					principalComponent,
					interestComponent,

					interestRateApplied: loan.interestRate,
					interestRuleSource: 'DEFAULT',

					month: currentMonth,
					paymentDate: new Date(),
					receivedBy: receivedBy || 'SYSTEM',
				},
			],
			{ session },
		);

		// Create separate transaction entries for principal and interest
		const txnDocs = [];

		if (principalComponent > 0) {
			txnDocs.push({
				shgId: loan.shgId,
				fromAccount: AccountType.MEMBER_CASH,
				toAccount: AccountType.SHG_CASH,
				amount: principalComponent,
				type: TransactionType.LOAN_REPAYMENT,
				memberId: loan.memberId,
				date: new Date(),
				meta: {
					loanId: loan._id,
					loanRepaymentId: repayment[0]._id,
					month: currentMonth,
				},
			});
		}

		if (interestComponent > 0) {
			txnDocs.push({
				shgId: loan.shgId,
				fromAccount: AccountType.MEMBER_CASH,
				toAccount: AccountType.INTEREST_INCOME,
				amount: interestComponent,
				type: TransactionType.INTEREST_PAYMENT,
				memberId: loan.memberId,
				date: new Date(),
				meta: {
					loanId: loan._id,
					loanRepaymentId: repayment[0]._id,
					month: currentMonth,
				},
			});
		}

		if (txnDocs.length > 0) {
			await Transaction.create(txnDocs, { session, ordered: true });
		}

		/* ---------------- 8ï¸âƒ£ Auto-close loan ---------------- */
		if (principalComponent === outstandingPrincipal) {
			await Loan.updateOne(
				{ _id: loan._id },
				{
					status: LoanRepaymentStatus.CLOSED,
					closedAt: new Date(),
				},
				{ session },
			);
		}

		await session.commitTransaction();
		session.endSession();

		return NextResponse.json(repayment[0]);
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		throw err;
	}
}

async function lumpSumContribution(data) {
	const { shgId, date, purpose, deposits, receivedBy } = data;

	if (!shgId || !Array.isArray(deposits) || deposits.length === 0) {
		throw new Error('Invalid request data');
	}

	const shgObjectId = new Types.ObjectId(String(shgId));
	const depositDate = date ? new Date(date) : new Date();

	// Basic validation
	deposits.forEach((d) => {
		if (!d.memberId || d.amount == null || Number(d.amount) <= 0) {
			throw new Error('Invalid deposit entry');
		}
	});

	const session = await mongoose.connection.startSession();

	session.startTransaction();

	try {
		/* ---------------- 1ï¸âƒ£ Create LumpSumDeposit entries ---------------- */
		const lumpSumDocs = deposits.map((d) => ({
			shgId: shgObjectId,
			memberId: new Types.ObjectId(String(d.memberId)),
			amount: Number(d.amount),
			purpose,
			receivedBy: receivedBy || 'SYSTEM',
			createdAt: depositDate,
			updatedAt: depositDate,
		}));

		const savedDeposits = await LumpSumDeposit.create(lumpSumDocs, {
			session,
			ordered: true,
		});

		/* ---------------- 2ï¸âƒ£ Create Transaction entries ---------------- */
		const transactionDocs = savedDeposits.map((dep) => ({
			shgId: dep.shgId,
			fromAccount: AccountType.MEMBER_CASH,
			toAccount: AccountType.SHG_CASH,
			amount: dep.amount,
			type: TransactionType.LUMP_SUM_CONTRIBUTION,
			memberId: dep.memberId,
			date: depositDate,
			source: receivedBy || 'SYSTEM',
			meta: {
				lumpSumDepositId: dep._id,
				purpose,
			},
		}));

		await Transaction.create(transactionDocs, { session, ordered: true });

		await session.commitTransaction();
		session.endSession();

		return NextResponse.json({
			success: true,
			count: savedDeposits.length,
			totalAmount: savedDeposits.reduce((sum, d) => sum + d.amount, 0),
		});
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		throw err;
	}
}

async function listRevertableTransactions(data) {
	const { shgId, limit = 50 } = data || {};
	if (!shgId) {
		return NextResponse.json({ error: 'shgId is required' }, { status: 400 });
	}

	const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
	const shgObjectId = new Types.ObjectId(String(shgId));
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const txns = await Transaction.find({
		shgId: shgObjectId,
		isReversed: false,
		$or: [
			{ date: { $gte: thirtyDaysAgo } },
			{ createdAt: { $gte: thirtyDaysAgo } },
		],
	})
		.sort({ date: -1, createdAt: -1 })
		.limit(safeLimit)
		.select(
			'_id shgId type amount date memberId fromAccount toAccount meta createdAt',
		)
		.lean();

	const memberIds = txns
		.map((t) => t.memberId)
		.filter(Boolean)
		.map((id) => String(id));

	const members = await ShgMember.find({ _id: { $in: memberIds } })
		.select('_id name memberCode')
		.lean();
	const memberMap = Object.fromEntries(
		members.map((m) => [
			String(m._id),
			{ name: m.name, memberCode: m.memberCode },
		]),
	);

	const transactions = txns.map((t) => ({
		...t,
		memberName: t.memberId ? memberMap[String(t.memberId)]?.name || null : null,
		memberCode: t.memberId
			? memberMap[String(t.memberId)]?.memberCode || null
			: null,
	}));

	return NextResponse.json({ transactions });
}

async function findLinkedRepaymentForTxn(txn, session) {
	const loanId = txn?.meta?.loanId;
	if (!loanId) return null;

	if (txn?.meta?.loanRepaymentId) {
		const direct = await LoanRepayment.findOne({
			_id: txn.meta.loanRepaymentId,
			isReversed: false,
		}).session(session);
		if (direct) return direct;
	}

	const fallback = await LoanRepayment.findOne({
		loanId: loanId,
		shgId: txn.shgId,
		memberId: txn.memberId || null,
		amount: Number(txn.amount),
		isReversed: false,
	})
		.sort({ paymentDate: -1, createdAt: -1 })
		.session(session);

	return fallback;
}

async function revertTransaction(data) {
	const { shgId, transactionId, reason, revertedBy } = data || {};
	if (!shgId || !transactionId) {
		return NextResponse.json(
			{ error: 'shgId and transactionId are required' },
			{ status: 400 },
		);
	}

	const shgObjectId = new Types.ObjectId(String(shgId));
	const txObjectId = new Types.ObjectId(String(transactionId));

	const session = await mongoose.connection.startSession();
	session.startTransaction();

	try {
		const txn = await Transaction.findOne({
			_id: txObjectId,
			shgId: shgObjectId,
			isReversed: false,
		}).session(session);

		if (!txn) {
			throw new Error('Transaction not found or already reversed');
		}

		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
		const txnDate = txn.date || txn.createdAt;
		if (!txnDate || new Date(txnDate) < thirtyDaysAgo) {
			throw new Error(
				'Only transactions from the last 30 days can be reverted',
			);
		}

		if (txn.type === TransactionType.LOAN_DISBURSEMENT) {
			const loanId = txn?.meta?.loanId;
			if (!loanId) throw new Error('Linked loanId missing in transaction meta');

			const activeRepaymentCount = await LoanRepayment.countDocuments({
				loanId,
				isReversed: false,
			}).session(session);

			if (activeRepaymentCount > 0) {
				throw new Error(
					'Repayment exists for this loan. Revert repayments first.',
				);
			}

			await Loan.updateOne(
				{ _id: loanId },
				{
					$set: {
						principal: 0,
						status: LoanRepaymentStatus.CLOSED,
						closedAt: new Date(),
					},
				},
				{ session },
			);
		}

		if (txn.type === TransactionType.LOAN_REPAYMENT || txn.type === TransactionType.INTEREST_PAYMENT) {
			const repayment = await findLinkedRepaymentForTxn(txn, session);
			if (!repayment) {
				throw new Error('Linked loan repayment not found');
			}

			await LoanRepayment.updateOne(
				{ _id: repayment._id },
				{ $set: { isReversed: true } },
				{ session },
			);

			// Also reverse the sibling transaction (principal ↔ interest) that shares the same loanRepaymentId
			const siblingType = txn.type === TransactionType.LOAN_REPAYMENT
				? TransactionType.INTEREST_PAYMENT
				: TransactionType.LOAN_REPAYMENT;
			const siblingTxn = await Transaction.findOne({
				shgId: txn.shgId,
				'meta.loanRepaymentId': repayment._id,
				type: siblingType,
				isReversed: false,
			}).session(session);

			if (siblingTxn) {
				await Transaction.updateOne(
					{ _id: siblingTxn._id },
					{
						$set: {
							isReversed: true,
							meta: {
								...(siblingTxn.meta || {}),
								revertedAt: new Date().toISOString(),
								revertedBy: revertedBy || 'SYSTEM',
								revertReason: String(reason || '').trim() || 'Sibling transaction reverted',
							},
						},
					},
					{ session },
				);
			}

			const loan = await Loan.findById(repayment.loanId).session(session);
			if (loan) {
				const principalAgg = await LoanRepayment.aggregate([
					{
						$match: {
							loanId: loan._id,
							isReversed: false,
						},
					},
					{
						$group: {
							_id: null,
							totalPrincipalPaid: { $sum: '$principalComponent' },
						},
					},
				]).session(session);

				const paid = Number(principalAgg?.[0]?.totalPrincipalPaid || 0);
				const outstanding = Math.max(Number(loan.principal || 0) - paid, 0);
				if (outstanding > 0 && loan.status === LoanRepaymentStatus.CLOSED) {
					await Loan.updateOne(
						{ _id: loan._id },
						{
							$set: { status: LoanRepaymentStatus.ONGOING },
							$unset: { closedAt: '' },
						},
						{ session },
					);
				}
			}
		}

		if (txn.type === TransactionType.BANK_LOAN_RECEIVED) {
			const bankLoanId = txn?.meta?.bankLoanId;
			if (!bankLoanId)
				throw new Error('Linked bankLoanId missing in transaction meta');

			await BankLoan.updateOne(
				{ _id: bankLoanId },
				{
					$set: {
						principal: 0,
						status: 'CLOSED',
						closedAt: new Date(),
					},
				},
				{ session },
			);
		}

		if (txn.type === TransactionType.LUMP_SUM_CONTRIBUTION) {
			const lumpSumDepositId = txn?.meta?.lumpSumDepositId;
			if (lumpSumDepositId) {
				await LumpSumDeposit.updateOne(
					{ _id: lumpSumDepositId },
					{ $set: { isReversed: true } },
					{ session },
				);
			}
		}

		await Transaction.updateOne(
			{ _id: txn._id },
			{
				$set: {
					isReversed: true,
					meta: {
						...(txn.meta || {}),
						revertedAt: new Date().toISOString(),
						revertedBy: revertedBy || 'SYSTEM',
						revertReason: String(reason || '').trim() || null,
					},
				},
			},
			{ session },
		);

		await session.commitTransaction();
		session.endSession();

		return NextResponse.json({ success: true });
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return NextResponse.json(
			{ error: err.message || 'Failed to revert transaction' },
			{ status: 400 },
		);
	}
}

function monthKeyFromDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function parseMonthStart(month) {
	if (!month) {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	}
	const d = new Date(`${month}-01T00:00:00`);
	if (Number.isNaN(d.getTime())) {
		throw new Error('Invalid month format. Expected YYYY-MM');
	}
	return d;
}

function toPdfText(value) {
	return String(value ?? '')
		.replace(/\\/g, '\\\\')
		.replace(/\(/g, '\\(')
		.replace(/\)/g, '\\)');
}

function toAscii(value = '') {
	return String(value).replace(/[^\x20-\x7E]/g, '?');
}

function toUtf16Hex(value) {
	const str = String(value ?? '');
	let hex = 'FEFF';
	for (let i = 0; i < str.length; i += 1) {
		hex += str.charCodeAt(i).toString(16).padStart(4, '0').toUpperCase();
	}
	return hex;
}

function pdfTextUnicode({ x, y, size = 10, font = 'F2', text = '' }) {
	return `BT 0 0 0 rg /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm <${toUtf16Hex(text)}> Tj ET`;
}

function pdfTextAscii({ x, y, size = 10, font = 'F1', text = '' }) {
	return `BT 0 0 0 rg /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${toPdfText(toAscii(text))}) Tj ET`;
}

function buildSnapshotOnePagePdf(snapshot) {
	const pageWidth = 595;
	const pageHeight = 842;
	const left = 34;
	const right = pageWidth - 34;
	let y = pageHeight - 44;

	const commands = [];
	const line = (x1, y1, x2, y2) =>
		commands.push(`${x1} ${y1} m ${x2} ${y2} l S`);
	const rect = (x, yy, w, h) => commands.push(`${x} ${yy} ${w} ${h} re S`);
	const textH = (x, yy, text, size = 10) =>
		commands.push(pdfTextUnicode({ x, y: yy, text, size, font: 'F2' }));
	const textA = (x, yy, text, size = 10) =>
		commands.push(pdfTextAscii({ x, y: yy, text, size, font: 'F1' }));

	commands.push('0.15 0.15 0.2 RG');
	commands.push('0.98 0.98 0.99 rg');
	commands.push(`${left} ${y - 38} ${right - left} 52 re f`);
	commands.push('0.2 0.2 0.25 RG');
	rect(left, y - 38, right - left, 52);
	textH(
		left + 12,
		y - 10,
		'\u092e\u093e\u0938\u093f\u0915 SHG \u0930\u093f\u092a\u094b\u0930\u094d\u091f',
		14,
	);
	textH(
		left + 12,
		y - 26,
		`\u0938\u092e\u0942\u0939: ${snapshot.shgName || '-'}`,
		10,
	);
	textH(right - 170, y - 26, `\u092e\u093e\u0939: ${snapshot.month}`, 10);
	textA(
		right - 170,
		y - 40,
		`Generated: ${new Date(snapshot.generatedAt).toLocaleString('en-IN')}`,
		8,
	);
	y -= 56;

	textH(
		left,
		y - 4,
		'\u0938\u0926\u0938\u094d\u092f-\u0935\u093e\u0930 \u0938\u093e\u0930\u093e\u0902\u0936',
		11,
	);
	y -= 14;
	const mTableTop = y;
	const mRowH = 16;
	const mCols = [left, left + 36, left + 236, left + 338, left + 442, right];
	const mHead = [
		'\u0915\u094d\u0930.',
		'\u0938\u0926\u0938\u094d\u092f',
		'\u092c\u091a\u0924',
		'\u0932\u092e\u094d\u092a\u0938\u092e',
		'\u092c\u0915\u093e\u092f\u093e \u090b\u0923',
	];
	const visibleMembers = snapshot.memberWise.slice(0, 12);
	const mRows = visibleMembers.length + 1;
	const mTableHeight = mRows * mRowH;

	rect(left, mTableTop - mTableHeight, right - left, mTableHeight);
	for (let i = 1; i < mCols.length - 1; i += 1)
		line(mCols[i], mTableTop, mCols[i], mTableTop - mTableHeight);
	for (let r = 1; r < mRows; r += 1)
		line(left, mTableTop - r * mRowH, right, mTableTop - r * mRowH);
	commands.push('0.95 0.97 1 rg');
	commands.push(`${left} ${mTableTop - mRowH} ${right - left} ${mRowH} re f`);
	commands.push('0.2 0.2 0.25 RG');

	for (let i = 0; i < mHead.length; i += 1) {
		textH(mCols[i] + 4, mTableTop - 12, mHead[i], 9);
	}
	visibleMembers.forEach((m, idx) => {
		const yy = mTableTop - (idx + 1) * mRowH - 12;
		textA(mCols[0] + 5, yy, String(idx + 1), 8);
		textH(mCols[1] + 4, yy, String(m.name || '-'), 8);
		textA(mCols[2] + 4, yy, `Rs ${Number(m.savings || 0).toFixed(2)}`, 8);
		textA(mCols[3] + 4, yy, `Rs ${Number(m.lumpSum || 0).toFixed(2)}`, 8);
		textA(
			mCols[4] + 4,
			yy,
			`Rs ${Number(m.outstandingLoan || 0).toFixed(2)}`,
			8,
		);
	});
	y = mTableTop - mTableHeight - 18;

	if (snapshot.memberWise.length > visibleMembers.length) {
		textH(
			left,
			y,
			`\u0928\u094b\u091f: \u0915\u0941\u0932 ${snapshot.memberWise.length} \u0938\u0926\u0938\u094d\u092f, PDF \u092e\u0947\u0902 \u092a\u0939\u0932\u0947 ${visibleMembers.length} \u0926\u0930\u094d\u0936\u093e\u090f \u0917\u090f\u0964`,
			8,
		);
		y -= 14;
	}

	textH(
		left,
		y,
		'\u0938\u092e\u0942\u0939 \u0915\u093e \u0915\u0941\u0932 \u0935\u093f\u0924\u094d\u0924\u0940\u092f \u0938\u093e\u0930\u093e\u0902\u0936',
		11,
	);
	y -= 14;
	const totals = [
		['\u0915\u0941\u0932 \u092c\u091a\u0924', snapshot.shgTotals.totalSavings],
		[
			'\u0915\u0941\u0932 \u0932\u092e\u094d\u092a\u0938\u092e',
			snapshot.shgTotals.totalLumpSum,
		],
		[
			'\u0915\u0941\u0932 \u092c\u094d\u092f\u093e\u091c',
			snapshot.shgTotals.totalInterest,
		],
		['\u0915\u0941\u0932 \u0926\u0902\u0921', snapshot.shgTotals.totalPenalty],
		[
			'\u0915\u0941\u0932 \u092c\u0915\u093e\u092f\u093e \u090b\u0923',
			snapshot.shgTotals.totalOutstandingLoan,
		],
		[
			'\u0915\u0941\u0932 \u0916\u0930\u094d\u091a',
			snapshot.shgTotals.totalExpense,
		],
		['\u0915\u0941\u0932 \u0928\u0915\u0926', snapshot.shgTotals.totalCash],
		[
			'\u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u0915\u0926',
			snapshot.shgTotals.totalAvailableCash,
		],
	];
	const tTop = y;
	const tRowH = 18;
	const tCols = [left, left + 350, right];
	const tHeight = totals.length * tRowH;
	rect(left, tTop - tHeight, right - left, tHeight);
	line(tCols[1], tTop, tCols[1], tTop - tHeight);
	for (let r = 1; r < totals.length; r += 1)
		line(left, tTop - r * tRowH, right, tTop - r * tRowH);
	totals.forEach((t, idx) => {
		const yy = tTop - idx * tRowH - 12;
		textH(left + 5, yy, t[0], 9);
		textA(tCols[1] + 5, yy, `Rs ${Number(t[1] || 0).toFixed(2)}`, 9);
	});
	y = tTop - tHeight - 14;
	textH(
		left,
		y,
		'\u092f\u0939 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u092e\u093e\u0938\u093f\u0915 \u0938\u094d\u0928\u0948\u092a\u0936\u0949\u091f \u0939\u0947\u0924\u0941 \u0938\u094d\u0935\u091a\u093e\u0932\u093f\u0924 \u0930\u0942\u092a \u0938\u0947 \u0924\u0948\u092f\u093e\u0930 \u0915\u0940 \u0917\u0908 \u0939\u0948\u0964',
		8,
	);

	const content = commands.join('\n');
	const objects = [];
	objects.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj');
	objects.push('2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj');
	objects.push(
		'3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 5 0 R >> endobj',
	);
	objects.push(
		'4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
	);
	objects.push(
		`5 0 obj << /Length ${Buffer.byteLength(content, 'utf8')} >> stream\n${content}\nendstream endobj`,
	);
	objects.push(
		'6 0 obj << /Type /Font /Subtype /Type0 /BaseFont /Mangal /Encoding /Identity-H /DescendantFonts [7 0 R] >> endobj',
	);
	objects.push(
		'7 0 obj << /Type /Font /Subtype /CIDFontType2 /BaseFont /Mangal /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor 8 0 R /DW 1000 /CIDToGIDMap /Identity >> endobj',
	);
	objects.push(
		'8 0 obj << /Type /FontDescriptor /FontName /Mangal /Flags 32 /ItalicAngle 0 /Ascent 880 /Descent -120 /CapHeight 700 /StemV 80 /MissingWidth 500 >> endobj',
	);

	let pdf = '%PDF-1.4\n';
	const offsets = [0];
	for (const obj of objects) {
		offsets.push(Buffer.byteLength(pdf, 'utf8'));
		pdf += `${obj}\n`;
	}
	const xrefStart = Buffer.byteLength(pdf, 'utf8');
	pdf += `xref\n0 ${objects.length + 1}\n`;
	pdf += '0000000000 65535 f \n';
	for (let i = 1; i <= objects.length; i++) {
		pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
	}
	pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
	return Buffer.from(pdf, 'utf8');
}

async function buildShgSnapshotData(shgId, month) {
	const shgObjectId = new Types.ObjectId(String(shgId));
	const monthStart = parseMonthStart(month);
	const monthEnd = new Date(
		monthStart.getFullYear(),
		monthStart.getMonth() + 1,
		0,
		23,
		59,
		59,
		999,
	);

	const [shg, members, transactions, loans, repayments] = await Promise.all([
		Shg.findById(shgObjectId).select('_id name village').lean(),
		ShgMember.find({ shgId: shgObjectId, isActive: true })
			.select('_id name memberCode')
			.sort({ createdAt: 1 })
			.lean(),
		Transaction.find({ shgId: shgObjectId, isReversed: false }).lean(),
		Loan.find({
			shgId: shgObjectId,
			status: { $ne: LoanRepaymentStatus.CLOSED },
		})
			.select('_id memberId principal status')
			.lean(),
		LoanRepayment.find({ shgId: shgObjectId, isReversed: false })
			.select('loanId memberId principalComponent interestComponent')
			.lean(),
	]);

	if (!shg) {
		throw new Error('SHG not found');
	}

	const memberMap = Object.fromEntries(members.map((m) => [String(m._id), m]));
	const savingsByMember = {};
	const lumpSumByMember = {}; // individual LUMP_SUM_CONTRIBUTION per member

	let totalSavings = 0;
	let totalLumpSum = 0;
	let sharedPoolLumpSum = 0; // opening balance lump sum (shared equally)
	let totalIndividualLumpSum = 0; // sum of individual LUMP_SUM_CONTRIBUTION transactions
	let totalInterest = 0;
	let totalPenalty = 0;
	let totalExpense = 0;

	for (const tx of transactions) {
		const memberKey = tx.memberId ? String(tx.memberId) : null;

		if (tx.type === TransactionType.MONTHLY_DEPOSIT) {
			totalSavings += Number(tx.amount || 0);
			if (memberKey)
				savingsByMember[memberKey] =
					(savingsByMember[memberKey] || 0) + Number(tx.amount || 0);
		}

		if (tx.type === TransactionType.LUMP_SUM_CONTRIBUTION) {
			const amt = Number(tx.amount || 0);
			totalLumpSum += amt;
			totalIndividualLumpSum += amt;
			if (memberKey)
				lumpSumByMember[memberKey] = (lumpSumByMember[memberKey] || 0) + amt;
		}

		if (tx.type === TransactionType.PENALTY_CHARGE) {
			totalPenalty += Number(tx.amount || 0);
		}

		if (tx.type === TransactionType.OPENING_BALANCE) {
			if (
				tx?.meta?.category === 'TOTAL_SAVINGS_TILL_DATE' ||
				String(tx.toAccount || '') === AccountType.MEMBER_SAVINGS
			) {
				totalSavings += Number(tx.amount || 0);
				if (memberKey)
					savingsByMember[memberKey] =
						(savingsByMember[memberKey] || 0) + Number(tx.amount || 0);
			} else if (
				tx?.meta?.category === 'TOTAL_INTEREST_INCOME_TILL_DATE' ||
				String(tx.toAccount || '') === AccountType.INTEREST_INCOME
			) {
				totalInterest += Number(tx.amount || 0);
			} else if (tx?.meta?.category === 'TOTAL_PENALTY_INCOME_TILL_DATE') {
				totalPenalty += Number(tx.amount || 0);
			} else if (
				tx?.meta?.category === 'TOTAL_LUMP_SUM_PAYMENTS_TILL_DATE' ||
				(String(tx.fromAccount || '') === AccountType.EXTERNAL &&
					String(tx.toAccount || '') === AccountType.SHG_CASH)
			) {
				const amt = Number(tx.amount || 0);
				totalLumpSum += amt;
				sharedPoolLumpSum += amt; // this is the shared pool from onboarding
			} else if (
				tx?.meta?.category === 'TOTAL_EXPENDITURE_TILL_DATE' ||
				tx?.meta?.category === 'MANUAL_EXPENSE' ||
				(String(tx.fromAccount || '') === AccountType.SHG_CASH &&
					String(tx.toAccount || '') === AccountType.EXTERNAL)
			) {
				totalExpense += Number(tx.amount || 0);
			}
		}
	}

	const activeLoanIds = new Set(loans.map((l) => String(l._id)));
	const principalRepaidByLoan = {};
	let totalPrincipalRepaid = 0;
	for (const rep of repayments) {
		const p = Number(rep.principalComponent || 0);
		const i = Number(rep.interestComponent || 0);
		totalInterest += i;
		const loanKey = String(rep.loanId);
		principalRepaidByLoan[loanKey] = (principalRepaidByLoan[loanKey] || 0) + p;
		if (activeLoanIds.has(loanKey)) {
			totalPrincipalRepaid += p;
		}
	}

	const outstandingByMember = {};
	let totalLoanDisbursed = 0;
	for (const loan of loans) {
		const principal = Number(loan.principal || 0);
		totalLoanDisbursed += principal;
		const paid = Number(principalRepaidByLoan[String(loan._id)] || 0);
		const outstanding = Math.max(principal - paid, 0);
		const memberKey = String(loan.memberId);
		outstandingByMember[memberKey] =
			(outstandingByMember[memberKey] || 0) + outstanding;
	}

	const totalOutstandingLoan = Math.max(
		totalLoanDisbursed - totalPrincipalRepaid,
		0,
	);
	const totalCash = totalSavings + totalLumpSum + totalInterest + totalPenalty;
	const totalAvailableCash = totalCash - totalOutstandingLoan - totalExpense;

	// Per-member lumpSum = equal share of shared pool (onboarding) + member's own individual contributions
	const perMemberSharedPoolShare =
		members.length > 0 ? sharedPoolLumpSum / members.length : 0;

	const memberWise = members.map((member) => {
		const key = String(member._id);
		const memberOwnLumpSum = lumpSumByMember[key] || 0;
		const memberTotalLumpSum = perMemberSharedPoolShare + memberOwnLumpSum;
		return {
			memberId: member._id,
			name: member.name,
			memberCode: member.memberCode,
			savings: Number((savingsByMember[key] || 0).toFixed(2)),
			lumpSum: Number(memberTotalLumpSum.toFixed(2)),
			outstandingLoan: Number((outstandingByMember[key] || 0).toFixed(2)),
		};
	});

	return {
		shgId: shg._id,
		shgName: shg.name,
		village: shg.village,
		month: monthKeyFromDate(monthStart),
		generatedAt: new Date().toISOString(),
		range: {
			start: monthStart.toISOString(),
			end: monthEnd.toISOString(),
		},
		memberWise,
		shgTotals: {
			totalSavings: Number(totalSavings.toFixed(2)),
			totalLumpSum: Number(totalLumpSum.toFixed(2)),
			totalInterest: Number(totalInterest.toFixed(2)),
			totalPenalty: Number(totalPenalty.toFixed(2)),
			totalOutstandingLoan: Number(totalOutstandingLoan.toFixed(2)),
			totalExpense: Number(totalExpense.toFixed(2)),
			totalCash: Number(totalCash.toFixed(2)),
			totalAvailableCash: Number(totalAvailableCash.toFixed(2)),
		},
	};
}

async function saveSnapshotToDummyCloud(snapshot) {
	const baseDir = path.join(process.cwd(), 'dummy-cloud', 'shg-snapshots');
	const folder = path.join(baseDir, String(snapshot.shgId), snapshot.month);
	await fs.mkdir(folder, { recursive: true });

	const pdfBuffer = buildSnapshotOnePagePdf(snapshot);
	const pdfPath = path.join(folder, 'snapshot.pdf');
	const jsonPath = path.join(folder, 'snapshot.json');
	await fs.writeFile(pdfPath, pdfBuffer);
	await fs.writeFile(jsonPath, JSON.stringify(snapshot, null, 2), 'utf8');

	return {
		storage: 'dummy-cloud',
		folder,
		pdfPath,
		jsonPath,
		pdfBlobPath: `shg-snapshots/${snapshot.shgId}/${snapshot.month}/snapshot.pdf`,
		jsonBlobPath: `shg-snapshots/${snapshot.shgId}/${snapshot.month}/snapshot.json`,
		cloudUrl: `dummy://shg-snapshots/${snapshot.shgId}/${snapshot.month}/snapshot.pdf`,
		jsonCloudUrl: `dummy://shg-snapshots/${snapshot.shgId}/${snapshot.month}/snapshot.json`,
	};
}

async function saveSnapshotMetadata({ snapshot, storage, triggerType }) {
	await SnapshotReport.findOneAndUpdate(
		{
			shgId: new Types.ObjectId(String(snapshot.shgId)),
			month: snapshot.month,
		},
		{
			$set: {
				generatedAt: new Date(snapshot.generatedAt),
				triggerType: triggerType || 'ON_DEMAND',
				storageProvider: storage.storage,
				cloudPath: storage.pdfBlobPath || storage.pdfPath || '',
				cloudUrl: storage.cloudUrl,
				jsonCloudPath: storage.jsonBlobPath || storage.jsonPath || null,
				jsonCloudUrl: storage.jsonCloudUrl || null,
				snapshot,
			},
		},
		{ upsert: true, new: true, setDefaultsOnInsert: true },
	);
}

async function saveSnapshotToCloudStorage(
	snapshot,
	{ triggerType = 'ON_DEMAND' } = {},
) {
	const blobBasePath = `shg-snapshots/${snapshot.shgId}/${snapshot.month}`;
	const pdfBuffer = buildSnapshotOnePagePdf(snapshot);
	const jsonBuffer = Buffer.from(JSON.stringify(snapshot, null, 2), 'utf8');
	const hasBlobToken = Boolean(
		process.env.BLOB_READ_WRITE_TOKEN ||
		process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
	);

	let storage;
	if (hasBlobToken) {
		const pdfBlobPath = `${blobBasePath}/snapshot.pdf`;
		const jsonBlobPath = `${blobBasePath}/snapshot.json`;
		const [pdfUpload, jsonUpload] = await Promise.all([
			put(pdfBlobPath, pdfBuffer, {
				access: 'public',
				contentType: 'application/pdf',
				addRandomSuffix: false,
				allowOverwrite: true,
			}),
			put(jsonBlobPath, jsonBuffer, {
				access: 'public',
				contentType: 'application/json',
				addRandomSuffix: false,
				allowOverwrite: true,
			}),
		]);

		storage = {
			storage: 'vercel-blob',
			pdfBlobPath,
			jsonBlobPath,
			cloudUrl: pdfUpload.url,
			downloadUrl: pdfUpload.downloadUrl,
			jsonCloudUrl: jsonUpload.url,
		};
	} else {
		storage = await saveSnapshotToDummyCloud(snapshot);
	}

	await saveSnapshotMetadata({ snapshot, storage, triggerType });
	return storage;
}

async function generateShgSnapshot(data) {
	const { shgId, month } = data || {};
	if (!shgId) {
		return NextResponse.json({ error: 'shgId is required' }, { status: 400 });
	}

	try {
		const snapshot = await buildShgSnapshotData(shgId, month);
		const storage = await saveSnapshotToCloudStorage(snapshot, {
			triggerType: 'ON_DEMAND',
		});
		const proxyUrl = `/api/shg/snapshot-pdf?shgId=${encodeURIComponent(String(shgId))}&month=${encodeURIComponent(String(snapshot.month))}`;
		const responseStorage = {
			...storage,
			proxyUrl,
			cloudUrl: null,
		};
		return NextResponse.json({
			success: true,
			snapshot,
			storage: responseStorage,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: error.message || 'Failed to generate snapshot' },
			{ status: 400 },
		);
	}
}

async function listShgSnapshots(data) {
	const { shgId } = data || {};
	if (!shgId) {
		return NextResponse.json({ error: 'shgId is required' }, { status: 400 });
	}

	const shgObjectId = new Types.ObjectId(String(shgId));

	const reports = await SnapshotReport.find({ shgId: shgObjectId })
		.select('month generatedAt cloudUrl storageProvider cloudPath')
		.sort({ month: -1 })
		.lean();

	if (reports.length > 0) {
		return NextResponse.json({
			snapshots: reports.map((r) => ({
				month: r.month,
				generatedAt: r.generatedAt,
				cloudUrl: null,
				proxyUrl: `/api/shg/snapshot-pdf?shgId=${encodeURIComponent(String(shgId))}&month=${encodeURIComponent(String(r.month))}`,
				storageProvider: r.storageProvider,
				path: r.cloudPath,
			})),
		});
	}

	// Backward compatibility: read old local dummy folders if metadata docs are not available.
	const shgDir = path.join(
		process.cwd(),
		'dummy-cloud',
		'shg-snapshots',
		String(shgId),
	);
	try {
		const monthDirs = await fs.readdir(shgDir, { withFileTypes: true });
		const snapshots = [];
		for (const d of monthDirs) {
			if (!d.isDirectory()) continue;
			const jsonPath = path.join(shgDir, d.name, 'snapshot.json');
			try {
				const raw = await fs.readFile(jsonPath, 'utf8');
				const dataObj = JSON.parse(raw);
				snapshots.push({
					month: d.name,
					generatedAt: dataObj.generatedAt,
					cloudUrl: `dummy://shg-snapshots/${shgId}/${d.name}/snapshot.pdf`,
					proxyUrl: null,
					storageProvider: 'dummy-cloud',
					path: `shg-snapshots/${shgId}/${d.name}/snapshot.pdf`,
				});
			} catch {
				// ignore malformed files
			}
		}
		snapshots.sort((a, b) => String(b.month).localeCompare(String(a.month)));
		return NextResponse.json({ snapshots });
	} catch {
		return NextResponse.json({ snapshots: [] });
	}
}

async function getShgSnapshotData(data) {
	const { shgId, month } = data || {};
	if (!shgId || !month) {
		return NextResponse.json(
			{ error: 'shgId and month are required' },
			{ status: 400 },
		);
	}

	const report = await SnapshotReport.findOne({
		shgId: new Types.ObjectId(String(shgId)),
		month: String(month),
	})
		.select('snapshot month generatedAt')
		.lean();

	if (!report?.snapshot) {
		return NextResponse.json(
			{ error: 'Snapshot not found for selected month' },
			{ status: 404 },
		);
	}

	return NextResponse.json({
		success: true,
		month: report.month,
		generatedAt: report.generatedAt,
		snapshot: report.snapshot,
	});
}

async function generateMonthlySnapshots(data) {
	const { month, force = false } = data || {};
	const runDate = month ? parseMonthStart(month) : new Date();

	if (!force && runDate.getDate() !== 31) {
		return NextResponse.json(
			{
				error: 'Monthly snapshot run is allowed only on 31st unless force=true',
			},
			{ status: 400 },
		);
	}

	const shgs = await Shg.find({ status: 'ACTIVE' }).select('_id').lean();
	const results = [];
	for (const shg of shgs) {
		try {
			const snapshot = await buildShgSnapshotData(
				shg._id,
				monthKeyFromDate(runDate),
			);
			const storage = await saveSnapshotToCloudStorage(snapshot, {
				triggerType: 'SCHEDULED',
			});
			results.push({ shgId: shg._id, success: true, storage });
		} catch (e) {
			results.push({ shgId: shg._id, success: false, error: e.message });
		}
	}

	return NextResponse.json({
		success: true,
		month: monthKeyFromDate(runDate),
		totalShgs: shgs.length,
		results,
	});
}

async function dashboardSummary(data) {
	const { shgId } = data;
	if (!shgId) {
		throw new Error('shgId is required');
	}

	const shgObjectId = new Types.ObjectId(String(shgId));
	const shgDoc = await Shg.findById(shgObjectId).select('name').lean();

	/* Fetch all transactions, loans and repayments for this SHG */
	const [transactions, loans, repayments] = await Promise.all([
		Transaction.find({
			shgId: shgObjectId,
			isReversed: false,
		}).lean(),
		Loan.find({
			shgId: shgObjectId,
			status: { $ne: LoanRepaymentStatus.CLOSED },
		})
			.select('_id principal status')
			.lean(),
		LoanRepayment.find({
			shgId: shgObjectId,
			isReversed: false,
		})
			.select('loanId principalComponent interestComponent amount')
			.lean(),
	]);

	/* Calculate totals */
	let totalMonthlySavings = 0;
	let totalLumpSum = 0;
	let totalInterestCollected = 0;
	let totalPrincipalRepaid = 0;
	let totalPenalty = 0;
	let totalLoanGiven = 0;
	let totalExpense = 0;

	/* Repayment split: principal reduces outstanding, interest is income */
	const activeLoanIds = new Set(loans.map((l) => String(l._id)));
	repayments.forEach((repayment) => {
		const principal = Number(repayment?.principalComponent || 0);
		const interest = Number(repayment?.interestComponent || 0);
		if (principal > 0 || interest > 0) {
			totalInterestCollected += interest;
			/* Only count principal repaid for active (non-closed) loans */
			if (repayment?.loanId && activeLoanIds.has(String(repayment.loanId))) {
				totalPrincipalRepaid += principal;
			}
			return;
		}
		/* Legacy fallback when split components are absent:
		   keep amount as interest-only to avoid over-reducing outstanding principal. */
		totalInterestCollected += Number(repayment?.amount || 0);
	});

	transactions.forEach((tx) => {
		switch (tx.type) {
			case TransactionType.MONTHLY_DEPOSIT:
				totalMonthlySavings += tx.amount;
				break;
			case TransactionType.OPENING_BALANCE:
				// Include onboarding initial data buckets saved via OPENING_BALANCE.
				if (
					tx?.meta?.category === 'TOTAL_SAVINGS_TILL_DATE' ||
					String(tx.toAccount || '') === AccountType.MEMBER_SAVINGS
				) {
					totalMonthlySavings += tx.amount;
				} else if (
					tx?.meta?.category === 'TOTAL_INTEREST_INCOME_TILL_DATE' ||
					String(tx.toAccount || '') === AccountType.INTEREST_INCOME
				) {
					totalInterestCollected += tx.amount;
				} else if (tx?.meta?.category === 'TOTAL_PENALTY_INCOME_TILL_DATE') {
					totalPenalty += tx.amount;
				} else if (
					tx?.meta?.category === 'TOTAL_LUMP_SUM_PAYMENTS_TILL_DATE' ||
					(String(tx.fromAccount || '') === AccountType.EXTERNAL &&
						String(tx.toAccount || '') === AccountType.SHG_CASH)
				) {
					// Fallback for older onboarding rows where category was not persisted.
					totalLumpSum += tx.amount;
				} else if (
					tx?.meta?.category === 'TOTAL_EXPENDITURE_TILL_DATE' ||
					(String(tx.fromAccount || '') === AccountType.SHG_CASH &&
						String(tx.toAccount || '') === AccountType.EXTERNAL)
				) {
					totalExpense += tx.amount;
				}
				break;
			case TransactionType.LUMP_SUM_CONTRIBUTION:
				totalLumpSum += tx.amount;
				break;
			case TransactionType.LOAN_REPAYMENT:
			case TransactionType.INTEREST_PAYMENT:
				// Loan principal repayments & interest are accounted via LoanRepayment records above.
				break;
			case TransactionType.PENALTY_CHARGE:
				totalPenalty += tx.amount;
				break;
			case TransactionType.BANK_LOAN_RECEIVED:
				totalExpense += tx.amount;
				break;
			default:
				break;
		}
	});

	const totalLoanDisbursed = loans.reduce(
		(sum, loan) => sum + Number(loan?.principal || 0),
		0,
	);
	const totalLoanOutstanding = Math.max(
		totalLoanDisbursed - totalPrincipalRepaid,
		0,
	);
	totalLoanGiven = totalLoanOutstanding;

	const totalAvailableCash =
		totalMonthlySavings +
		totalLumpSum +
		totalInterestCollected +
		totalPenalty -
		totalLoanOutstanding -
		totalExpense;

	return NextResponse.json({
		shgName: shgDoc?.name || '',
		totalMonthlySavings,
		totalLumpSum,
		totalPrincipalRepaid,
		totalInterestCollected,
		totalPenalty,
		totalLoanGiven,
		totalLoanDisbursed,
		totalExpense,
		totalAvailableCash,
		lastUpdated: new Date().toISOString(),
	});
}

async function listMonthlyTransactions(data) {
	const { shgId, month } = data || {};
	if (!shgId || !month) {
		return NextResponse.json({ error: 'shgId and month are required' }, { status: 400 });
	}

	const shgObjectId = new Types.ObjectId(String(shgId));
	const monthStart = parseMonthStart(month);
	const monthEnd = new Date(
		monthStart.getFullYear(),
		monthStart.getMonth() + 1,
		0,
		23,
		59,
		59,
		999
	);

	const txns = await Transaction.find({
		shgId: shgObjectId,
		isReversed: false,
		date: { $gte: monthStart, $lte: monthEnd },
	})
		.sort({ date: 1, createdAt: 1 })
		.select('_id type amount date memberId fromAccount toAccount meta')
		.lean();

	const memberIds = txns
		.map((t) => t.memberId)
		.filter(Boolean)
		.map((id) => String(id));

	const members = await ShgMember.find({ _id: { $in: memberIds } })
		.select('_id name')
		.lean();
	const memberMap = Object.fromEntries(
		members.map((m) => [String(m._id), m.name])
	);

	// Fetch loan repayment breakdown for LOAN_REPAYMENT transactions
	const loanRepaymentIds = txns
		.filter((t) => t.type === 'LOAN_REPAYMENT' && t.meta?.loanRepaymentId)
		.map((t) => t.meta.loanRepaymentId);

	let repaymentMap = {};
	if (loanRepaymentIds.length > 0) {
		const repayments = await LoanRepayment.find({
			_id: { $in: loanRepaymentIds },
		})
			.select('_id principalComponent interestComponent')
			.lean();
		repaymentMap = Object.fromEntries(
			repayments.map((r) => [
				String(r._id),
				{
					principalComponent: r.principalComponent || 0,
					interestComponent: r.interestComponent || 0,
				},
			])
		);
	}

	const transactions = txns.map((t) => {
		const base = {
			...t,
			memberName: t.memberId ? memberMap[String(t.memberId)] || '-' : '-',
		};
		// Attach loan repayment breakdown if available
		if (t.type === 'LOAN_REPAYMENT' && t.meta?.loanRepaymentId) {
			const breakdown = repaymentMap[String(t.meta.loanRepaymentId)];
			if (breakdown) {
				base.principalComponent = breakdown.principalComponent;
				base.interestComponent = breakdown.interestComponent;
			}
		}
		return base;
	});

	return NextResponse.json({ transactions });
}

