import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
	deviceId: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},

	assetId: {
		type: String,
		required: true,
		index: true,
	},

	pushToken: {
		type: String,
		required: true,
		index: true,
	},

	platform: {
		type: String,
		default: 'android',
	},

	groups: {
		type: [String], // 👈 group targeting
		default: [],
		index: true,
	},

	village: {
		type: String,
		index: true,
	},

	enabled: {
		type: Boolean,
		default: true,
	},

	lastSeen: {
		type: Date,
		default: Date.now,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Device || mongoose.model('Device', DeviceSchema);
