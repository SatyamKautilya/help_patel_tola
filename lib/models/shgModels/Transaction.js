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

		amount: { type: Number, required: true, min: 0.01 },

		type: {
			type: String,
			enum: [
				'MONTHLY_DEPOSIT',
				'LUMP_SUM_CONTRIBUTION',
				'LOAN_DISBURSEMENT',
				'LOAN_REPAYMENT',
				'INTEREST_PAYMENT',
				'BANK_LOAN_RECEIVED',
				'BANK_LOAN_REPAYMENT',
				'OPENING_BALANCE',
				'PENALTY_CHARGE',
			],
			required: true,
		},

		memberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ShgMember',
			default: null,
		},

		// 🔹 optional linkage to domain entities
		relatedEntity: {
			type: {
				type: String,
				enum: ['LOAN', 'BANK_LOAN', 'ONBOARDING', 'ADJUSTMENT'],
			},
			id: {
				type: mongoose.Schema.Types.ObjectId,
			},
		},

		meta: { type: Object, default: {} },

		date: { type: Date, required: true },

		// 🔹 audit
		source: {
			type: String,
			enum: ['SYSTEM', 'ADMIN', 'MEMBER'],
			default: 'SYSTEM',
		},

		createdBy: { type: String },

		// 🔹 safety
		isReversed: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

TransactionSchema.index({ shgId: 1, date: -1 });
TransactionSchema.index({ memberId: 1 });
TransactionSchema.index({ 'relatedEntity.id': 1 });

export default mongoose.models.Transaction ||
	mongoose.model('Transaction', TransactionSchema);
