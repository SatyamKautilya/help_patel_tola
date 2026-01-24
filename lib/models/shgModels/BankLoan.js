import mongoose from 'mongoose';

const BankInterestRateHistorySchema = new mongoose.Schema(
	{
		oldRate: { type: Number, required: true },
		newRate: { type: Number, required: true },
		effectiveFrom: { type: Date, required: true },
		reason: { type: String },
	},
	{ _id: false },
);

const BankLoanSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		bankName: { type: String, required: true },

		// 🔹 principal received from bank
		principal: { type: Number, required: true, min: 0.01 },

		// 🔹 current interest rate
		interestRate: { type: Number, min: 0 },

		// 🔹 interest rate change history (optional but recommended)
		interestRateHistory: [BankInterestRateHistorySchema],

		// 🔹 from when current interestRate applies
		effectiveInterestRateFrom: { type: Date },

		tenureMonths: Number,

		issuedDate: { type: Date },

		status: {
			type: String,
			enum: ['ONGOING', 'CLOSED'],
			default: 'ONGOING',
		},

		closedAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

BankLoanSchema.index({ shgId: 1 });
BankLoanSchema.index({ status: 1 });

export default mongoose.models.BankLoan ||
	mongoose.model('BankLoan', BankLoanSchema);
