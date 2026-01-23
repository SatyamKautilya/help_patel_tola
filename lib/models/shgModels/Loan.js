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

		principal: { type: Number, required: true },
		interestRate: { type: Number, required: true },

		interestType: {
			type: String,
			enum: ['SIMPLE', 'NONE'],
			default: 'SIMPLE',
		},

		tenureMonths: Number,

		status: {
			type: String,
			enum: ['REQUESTED', 'APPROVED', 'ONGOING', 'CLOSED', 'DEFAULTED'],
			default: 'ONGOING',
		},

		issuedDate: Date,

		approvedBy: {
			count: Number,
			date: Date,
		},
	},
	{ timestamps: true },
);

LoanSchema.index({ shgId: 1, memberId: 1 });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
