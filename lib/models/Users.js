import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},

		name: {
			type: String,
			required: true,
		},
		villageName: {
			type: String,
			required: true,
		},
		lastSeen: {
			type: Date, // ✅ CORRECT
			required: true,
		},
		userGroups: {
			type: [String],
			default: [],
		},
		isTaggedToVillage: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

usersSchema.index({ id: 1, createdAt: -1, lastSeen: 1 });

export default mongoose.models.Users || mongoose.model('Users', usersSchema);
