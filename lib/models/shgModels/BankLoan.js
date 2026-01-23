import mongoose from 'mongoose';

const BankLoanSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		bankName: String,
		principal: Number,
		interestRate: Number,

		tenureMonths: Number,
		issuedDate: Date,

		status: {
			type: String,
			enum: ['ONGOING', 'CLOSED'],
			default: 'ONGOING',
		},
	},
	{ timestamps: true },
);

export default mongoose.models.BankLoan ||
	mongoose.model('BankLoan', BankLoanSchema);
