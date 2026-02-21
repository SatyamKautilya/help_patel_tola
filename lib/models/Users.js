import mongoose from 'mongoose';

const villageRoleSchema = new mongoose.Schema(
	{
		villageCode: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{ _id: false },
);

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
		taggedVillage: {
			type: [String],
			default: [],
		},
		mobileNumber: {
			type: String,
			default: '',
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		hindiName: {
			type: String,
			default: '',
		},
		passwordHash: {
			type: String,
			default: '',
		},
		villageRoles: {
			type: [villageRoleSchema],
			default: [],
		},
	},
	{ timestamps: true },
);

usersSchema.index({ id: 1, createdAt: -1, lastSeen: 1 });
usersSchema.index({ 'villageRoles.villageCode': 1, 'villageRoles.role': 1 });
usersSchema.index(
	{ mobileNumber: 1, isActive: 1 },
	{
		unique: true,
		partialFilterExpression: {
			isActive: true,
			mobileNumber: { $type: 'string', $ne: '' },
		},
	},
);

export default mongoose.models.Users || mongoose.model('Users', usersSchema);
