import mongoose from 'mongoose';

const InterestRateHistorySchema = new mongoose.Schema(
	{
		oldRate: { type: Number, required: true },
		newRate: { type: Number, required: true },

		effectiveFrom: { type: Date, required: true },

		decidedBy: { type: String }, // meeting id / admin id
		reason: { type: String },
	},
	{ _id: false },
);

const LoanSchema = new mongoose.Schema(
	{
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

		// 🔹 principal is the base truth for outstanding
		principal: { type: Number, required: true, min: 0.01 },

		// 🔹 current default interest rate (effective from `effectiveInterestRateFrom`)
		interestRate: { type: Number, required: true, min: 0 },

		interestType: {
			type: String,
			enum: ['SIMPLE', 'NONE'],
			default: 'SIMPLE',
		},

		// 🔹 permanent interest changes history
		interestRateHistory: [InterestRateHistorySchema],

		// 🔹 from when the current interestRate applies
		effectiveInterestRateFrom: { type: Date },

		tenureMonths: Number,

		status: {
			type: String,
			enum: ['REQUESTED', 'APPROVED', 'ONGOING', 'CLOSED', 'DEFAULTED'],
			default: 'ONGOING',
		},

		issuedDate: { type: Date },

		closedAt: { type: Date, default: null },

		approvedBy: {
			count: Number,
			date: Date,
		},
	},
	{ timestamps: true },
);

LoanSchema.index({ shgId: 1, memberId: 1 });
LoanSchema.index({ status: 1 });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
