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

		amount: { type: Number, required: true },
		principalComponent: Number,
		interestComponent: Number,

		paymentDate: { type: Date, required: true },
		receivedBy: String,
	},
	{ timestamps: true },
);

export default mongoose.models.LoanRepayment ||
	mongoose.model('LoanRepayment', LoanRepaymentSchema);
