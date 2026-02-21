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

			case 'monthly-deposit':
				return monthlyDeposit(body);

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

	/* 1️⃣ Get active SHG memberships of user */
	const memberships = await ShgMember.find({
		userId: userId,
		isActive: true,
	}).select('shgId role ');

	if (memberships.length === 0) return NextResponse.json([]);

	const shgIds = memberships.map((m) => m.shgId);

	/* 2️⃣ Fetch SHG basic details */
	const shgs = await Shg.find({
		_id: { $in: shgIds },
		status: 'ACTIVE',
	}).select('name village totalMembers');

	/* 3️⃣ Get active member count per SHG */

	/* 4️⃣ Merge everything */
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
	const member = await ShgMember.create({
		shgId: data.shgId,
		userId: data.userId || null,
		name: data.name,
		memberCode: data.memberCode,
		role: data.role,
		hasMobileAccess: !!data.userId,
		joinedAt: new Date(),
	});

	return NextResponse.json(member);
}

async function getOnboardingDraft(data) {
	const { createdBy } = data;
	if (!createdBy) {
		return NextResponse.json({ error: 'createdBy is required' }, { status: 400 });
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
		meta: { loanId: loan._id },
	});

	return NextResponse.json(loan);
}

async function loanRepayment(data) {
	const loan = await Loan.findById(data.loanId);
	const paymentDate = data.paymentDate ? new Date(data.paymentDate) : new Date();
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

	await Transaction.create({
		shgId: data.shgId,
		fromAccount: AccountType.MEMBER_CASH,
		toAccount: AccountType.SHG_CASH,
		amount: data.amount,
		type: TransactionType.LOAN_REPAYMENT,
		memberId: data.memberId,
		date: paymentDate,
		meta: { loanId: data.loanId },
	});

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

	const txn = await Transaction.create({
		shgId: data.shgId,
		fromAccount: AccountType[data.fromAccount],
		toAccount: AccountType[data.toAccount],
		amount: data.amount,
		type: TransactionType.OPENING_BALANCE,
		memberId: data.memberId || null,
		date: new Date(),
		meta: { note: 'Onboarding opening balance' },
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
	}).select('_id name memberCode role hasMobileAccess joinedAt');
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
	const transactions = await Transaction.find({
		shgId: shgObjectId,
		memberId: memberObjectId,
	}).sort({ date: 1 });
	// Calculate summary
	let totalSavings = 0;
	let totalLoansDisbursed = 0;
	let totalLoanRepayments = 0;
	let totalPenalties = 0;
	transactions.forEach((tx) => {
		switch (tx.type) {
			case TransactionType.MONTHLY_DEPOSIT:
			case TransactionType.LUMP_SUM_CONTRIBUTION:
				totalSavings += tx.amount;
				break;
			case TransactionType.LOAN_DISBURSEMENT:
				totalLoansDisbursed += tx.amount;
				break;

			case TransactionType.LOAN_REPAYMENT:
				totalLoanRepayments += tx.amount;
				break;

			case TransactionType.PENALTY_CHARGE:
				totalPenalties += tx.amount;
				break;
			default:
				break;
		}
	});
	const summary = {
		totalSavings,
		totalLoansDisbursed,
		totalLoanRepayments,
		totalPenalties,
	};
	return NextResponse.json({
		transactions: transactions.slice(0, 20),
		summary,
	});
}

async function ListActiveLoans(data) {
	const { shgId } = data;
	if (!shgId) throw new Error('shgId is required');

	const shgObjectId = new Types.ObjectId(String(shgId));
	const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

	/* ---------------- 1️⃣ Fetch active loans ---------------- */
	const loans = await Loan.find({
		shgId: shgObjectId,
		status: LoanRepaymentStatus.ONGOING,
	}).lean();

	if (!loans.length) {
		return NextResponse.json({ loans: [] });
	}

	/* ---------------- 2️⃣ Fetch members ---------------- */
	const memberIds = loans.map((l) => l.memberId);

	const members = await ShgMember.find({
		_id: { $in: memberIds },
	}).select('_id name');

	const memberMap = Object.fromEntries(
		members.map((m) => [String(m._id), m.name]),
	);

	const loanIds = loans.map((l) => l._id);

	/* ---------------- 3️⃣ Aggregate repayments ---------------- */
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

	/* ---------------- 4️⃣ Interest paid THIS MONTH ---------------- */
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

	/* ---------------- 5️⃣ Enrich loans ---------------- */
	const enrichedLoans = loans.map((loan) => {
		const principal = loan.principal;

		const principalPaid = principalPaidMap[String(loan._id)] || 0;

		const outstandingPrincipal = Math.max(principal - principalPaid, 0);

		// Full interest for the month
		const fullMonthlyInterest =
			outstandingPrincipal * (loan.interestRate / 100);

		// Interest already paid this month
		const interestPaidThisMonth =
			interestPaidThisMonthMap[String(loan._id)] || 0;

		// 🔥 FIX: remaining interest only
		const remainingMonthlyInterest = Math.max(
			fullMonthlyInterest - interestPaidThisMonth,
			0,
		);

		return {
			_id: loan._id,
			memberId: loan.memberId,
			memberName: memberMap[String(loan.memberId)] || '—',

			principal,
			interestRate: loan.interestRate,

			outstandingPrincipal,
			monthlyInterest: Number(remainingMonthlyInterest.toFixed(2)),
		};
	});

	return NextResponse.json({ loans: enrichedLoans });
}

async function collectRepayment(data) {
	const { shgId, loanId, memberId, amount, principal, interest, receivedBy } =
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

	/* ---------------- 1️⃣ Basic consistency ---------------- */
	if (
		Number((principalComponent + interestComponent).toFixed(2)) !==
		Number(totalAmount.toFixed(2))
	) {
		throw new Error('principal + interest must equal total amount');
	}

	const currentMonth = new Date().toISOString().slice(0, 7);

	/* ---------------- 2️⃣ Fetch loan ---------------- */
	const loan = await Loan.findOne({
		_id: new Types.ObjectId(String(loanId)),
		shgId: new Types.ObjectId(String(shgId)),
		memberId: new Types.ObjectId(String(memberId)),
		status: LoanRepaymentStatus.ONGOING,
	}).lean();

	if (!loan) {
		throw new Error('Active loan not found');
	}

	/* ---------------- 3️⃣ Calculate outstanding principal ---------------- */
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

	/* ---------------- 4️⃣ Monthly interest calculation ---------------- */
	const fullMonthlyInterest = outstandingPrincipal * (loan.interestRate / 100);

	/* ---------------- 5️⃣ Interest already paid THIS MONTH ---------------- */
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

	/* ---------------- 6️⃣ Business validations ---------------- */

	// ❗ Interest cannot exceed remaining interest for this month
	if (interestComponent > remainingInterestThisMonth) {
		throw new Error(
			`Interest exceeds remaining monthly interest ₹${remainingInterestThisMonth.toFixed(
				2,
			)}`,
		);
	}

	// ❗ Principal cannot exceed outstanding
	if (principalComponent > outstandingPrincipal) {
		throw new Error('Principal exceeds outstanding amount');
	}

	// ❗ If principal is being paid, interest must be fully settled first
	if (
		principalComponent > 0 &&
		remainingInterestThisMonth > 0 &&
		interestComponent < remainingInterestThisMonth
	) {
		throw new Error('मासिक ब्याज पहले पूरा भरना अनिवार्य है');
	}

	/* ---------------- 7️⃣ Atomic write ---------------- */
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

		await Transaction.create(
			[
				{
					shgId: loan.shgId,
					fromAccount: AccountType.MEMBER_CASH,
					toAccount: AccountType.SHG_CASH,
					amount: totalAmount,
					type: TransactionType.LOAN_REPAYMENT,
					memberId: loan.memberId,
					date: new Date(),
					meta: { loanId: loan._id },
				},
			],
			{ session },
		);

		/* ---------------- 8️⃣ Auto-close loan ---------------- */
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
		/* ---------------- 1️⃣ Create LumpSumDeposit entries ---------------- */
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

		/* ---------------- 2️⃣ Create Transaction entries ---------------- */
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

async function dashboardSummary(data) {
	const { shgId } = data;
	if (!shgId) {
		throw new Error('shgId is required');
	}

	const shgObjectId = new Types.ObjectId(String(shgId));

	/* Fetch all transactions for this SHG */
	const transactions = await Transaction.find({
		shgId: shgObjectId,
	}).lean();

	/* Calculate totals */
	let totalMonthlySavings = 0;
	let totalLumpSum = 0;
	let totalInterestCollected = 0;
	let totalPenalty = 0;
	let totalLoanGiven = 0;
	let totalExpense = 0;

	transactions.forEach((tx) => {
		switch (tx.type) {
			case TransactionType.MONTHLY_DEPOSIT:
				totalMonthlySavings += tx.amount;
				break;
			case TransactionType.LUMP_SUM_CONTRIBUTION:
				totalLumpSum += tx.amount;
				break;
			case TransactionType.LOAN_REPAYMENT:
				totalInterestCollected += tx.interestComponent || 0;
				break;
			case TransactionType.PENALTY_CHARGE:
				totalPenalty += tx.amount;
				break;
			case TransactionType.LOAN_DISBURSEMENT:
				totalLoanGiven += tx.amount;
				break;
			case TransactionType.BANK_LOAN_RECEIVED:
				totalExpense += tx.amount;
				break;
			default:
				break;
		}
	});

	const totalAvailableCash =
		totalMonthlySavings +
		totalLumpSum +
		totalInterestCollected +
		totalPenalty -
		totalLoanGiven -
		totalExpense;

	return NextResponse.json({
		totalMonthlySavings,
		totalLumpSum,
		totalInterestCollected,
		totalPenalty,
		totalLoanGiven,
		totalExpense,
		totalAvailableCash,
		lastUpdated: new Date().toISOString(),
	});
}
