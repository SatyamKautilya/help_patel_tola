import { NextResponse } from 'next/server';

// import User from '@/models/User';
import Shg from '@/lib/models/shgModels/Shg';
import ShgMember from '@/lib/models/shgModels/ShgMember';
import Transaction from '@/lib/models/shgModels/Transaction';
import Loan from '@/lib/models/shgModels/Loan';
import LoanRepayment from '@/lib/models/shgModels/LoanRepayment';
import BankLoan from '@/lib/models/shgModels/BankLoan';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
	await connectToDatabase();
	const { searchParams } = new URL(req.url);
	const name = searchParams.get('name');

	const body = await req.json();

	switch (name) {
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

		default:
			return NextResponse.json(
				{ error: 'Invalid API action' },
				{ status: 400 },
			);
	}
}

async function createSHG(data) {
	const shg = await Shg.create({
		name: data.name,
		village: data.village,
		block: data.block,
		district: data.district,
		state: data.state,
		monthlyContribution: data.monthlyContribution,
		formationDate: data.formationDate,
		createdBy: data.createdBy,
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
async function monthlyDeposit(data) {
	const txn = await Transaction.create({
		shgId: data.shgId,
		fromAccount: `MEMBER_SAVINGS_${data.memberId}`,
		toAccount: 'SHG_CASH',
		amount: data.amount,
		type: 'MONTHLY_DEPOSIT',
		memberId: data.memberId,
		date: new Date(),
		meta: { month: data.month },
	});

	return NextResponse.json(txn);
}
async function lumpSumContribution(data) {
	const txns = [];

	for (const memberId of data.memberIds) {
		txns.push({
			shgId: data.shgId,
			fromAccount: `MEMBER_SAVINGS_${memberId}`,
			toAccount: 'SHG_CASH',
			amount: data.amountPerMember,
			type: 'LUMP_SUM_CONTRIBUTION',
			memberId,
			date: new Date(),
			meta: { reason: data.reason },
		});
	}

	const result = await Transaction.insertMany(txns);
	return NextResponse.json(result);
}

async function createLoan(data) {
	const loan = await Loan.create({
		shgId: data.shgId,
		memberId: data.memberId,
		principal: data.principal,
		interestRate: data.interestRate,
		tenureMonths: data.tenureMonths,
		issuedDate: new Date(),
		approvedBy: data.approvedBy,
	});

	await Transaction.create({
		shgId: data.shgId,
		fromAccount: 'SHG_CASH',
		toAccount: `MEMBER_LOAN_${data.memberId}`,
		amount: data.principal,
		type: 'LOAN_DISBURSEMENT',
		memberId: data.memberId,
		date: new Date(),
		meta: { loanId: loan._id },
	});

	return NextResponse.json(loan);
}

async function loanRepayment(data) {
	const repayment = await LoanRepayment.create({
		loanId: data.loanId,
		shgId: data.shgId,
		memberId: data.memberId,
		amount: data.amount,
		principalComponent: data.principal,
		interestComponent: data.interest,
		paymentDate: new Date(),
		receivedBy: data.receivedBy,
	});

	await Transaction.create({
		shgId: data.shgId,
		fromAccount: 'MEMBER_CASH',
		toAccount: 'SHG_CASH',
		amount: data.amount,
		type: 'LOAN_REPAYMENT',
		memberId: data.memberId,
		date: new Date(),
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
		fromAccount: 'BANK',
		toAccount: 'SHG_CASH',
		amount: data.principal,
		type: 'BANK_LOAN_RECEIVED',
		date: new Date(),
		meta: { bankLoanId: loan._id },
	});

	return NextResponse.json(loan);
}
async function openingBalance(data) {
	const txn = await Transaction.create({
		shgId: data.shgId,
		fromAccount: data.fromAccount,
		toAccount: data.toAccount,
		amount: data.amount,
		type: 'OPENING_BALANCE',
		memberId: data.memberId || null,
		date: new Date(),
		meta: { note: 'Onboarding opening balance' },
	});

	return NextResponse.json(txn);
}
