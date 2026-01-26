import mongoose from 'mongoose';

const ShgMemberSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		userId: {
			type: String,
			ref: 'User',
			default: null,
		},

		memberCode: { type: String, required: true },
		name: { type: String, required: true },
		mobileNumber: { type: String, default: null },
		role: {
			type: String,
			enum: ['PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER'],
			default: 'MEMBER',
		},

		hasMobileAccess: { type: Boolean, default: false },

		// 🔹 membership lifecycle
		isActive: { type: Boolean, default: true },
		joinedAt: { type: Date, default: Date.now },
		leftAt: { type: Date, default: null },

		// 🔹 audit
		addedBy: { type: String }, // adminId / shgMemberId
	},
	{ timestamps: true },
);

ShgMemberSchema.index({ shgId: 1, userId: 1 });

export default mongoose.models.ShgMember ||
	mongoose.model('ShgMember', ShgMemberSchema);
