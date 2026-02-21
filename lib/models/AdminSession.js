import mongoose from 'mongoose';

const adminSessionSchema = new mongoose.Schema(
	{
		tokenHash: {
			type: String,
			required: true,
			unique: true,
		},
		userId: {
			type: String,
			required: true,
			index: true,
		},
		expiresAt: {
			type: Date,
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.models.AdminSession ||
	mongoose.model('AdminSession', adminSessionSchema);
