import mongoose from 'mongoose';

const ShgMemberSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
		},

		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null,
		},

		memberCode: { type: String, required: true },
		name: { type: String, required: true },

		role: {
			type: String,
			enum: ['PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER'],
			default: 'MEMBER',
		},

		hasMobileAccess: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true },

		joinedAt: Date,
	},
	{ timestamps: true },
);

ShgMemberSchema.index({ shgId: 1, userId: 1 });

export default mongoose.models.ShgMember ||
	mongoose.model('ShgMember', ShgMemberSchema);
