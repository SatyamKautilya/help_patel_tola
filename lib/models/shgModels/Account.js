import mongoose from 'mongoose';
const AccountSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		type: {
			type: String,
			enum: [
				'SHG_CASH',
				'MEMBER_SAVINGS',
				'MEMBER_LOAN',
				'BANK_LOAN',
				'INTEREST_INCOME',
			],
			required: true,
		},

		name: { type: String, required: true },
	},
	{ timestamps: true },
);

export default mongoose.models.Account ||
	mongoose.model('Account', AccountSchema);
