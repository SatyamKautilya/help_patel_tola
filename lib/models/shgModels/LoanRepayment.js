import mongoose from 'mongoose';

const LoanRepaymentSchema = new mongoose.Schema(
	{
		loanId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Loan',
			required: true,
		},

		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		memberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ShgMember',
			required: true,
		},

		amount: { type: Number, required: true, min: 0.01 },

		// 🔹 breakdown
		principalComponent: { type: Number, default: 0 },
		interestComponent: { type: Number, default: 0 },

		// 🔹 interest audit
		interestRateApplied: { type: Number }, // % used for this payment
		interestRuleSource: {
			type: String,
			enum: ['DEFAULT', 'OVERRIDE', 'PERMANENT_CHANGE'],
			default: 'DEFAULT',
		},

		// 🔹 time context
		month: { type: String }, // e.g. "2026-03"
		paymentDate: { type: Date, required: true },

		// 🔹 audit
		receivedBy: { type: String },
		isReversed: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

LoanRepaymentSchema.index({ loanId: 1 });
LoanRepaymentSchema.index({ memberId: 1 });
LoanRepaymentSchema.index({ shgId: 1, month: 1 });

export default mongoose.models.LoanRepayment ||
	mongoose.model('LoanRepayment', LoanRepaymentSchema);
