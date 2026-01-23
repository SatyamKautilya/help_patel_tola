import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		fromAccount: { type: String, required: true },
		toAccount: { type: String, required: true },

		amount: { type: Number, required: true },

		type: {
			type: String,
			enum: [
				'MONTHLY_DEPOSIT',
				'LOAN_DISBURSEMENT',
				'LOAN_REPAYMENT',
				'INTEREST_PAYMENT',
				'BANK_LOAN_RECEIVED',
				'BANK_LOAN_REPAYMENT',
				'OPENING_BALANCE',
				'LUMP_SUM_CONTRIBUTION',
			],
			required: true,
		},

		memberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ShgMember',
			default: null,
		},

		meta: Object,
		date: { type: Date, required: true },

		createdBy: String,
	},
	{ timestamps: true },
);

TransactionSchema.index({ shgId: 1, date: -1 });
TransactionSchema.index({ memberId: 1 });

export default mongoose.models.Transaction ||
	mongoose.model('Transaction', TransactionSchema);
