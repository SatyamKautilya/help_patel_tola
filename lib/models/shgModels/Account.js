import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		// 🔹 what kind of account this is
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

		// 🔹 who owns this account
		ownerType: {
			type: String,
			enum: ['SHG', 'MEMBER'],
			required: true,
		},

		// 🔹 only for member-owned accounts
		memberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ShgMember',
			default: null,
		},

		// 🔹 display name (UI only)
		name: { type: String, required: true },

		// 🔹 lifecycle
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true },
);

// 🔹 prevent duplicate logical accounts
AccountSchema.index({ shgId: 1, type: 1, memberId: 1 }, { unique: true });

export default mongoose.models.Account ||
	mongoose.model('Account', AccountSchema);
