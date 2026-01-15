import mongoose from 'mongoose';

const joinRequestSchema = new mongoose.Schema({
	villageId: {
		type: String, // ✅ correct
		required: true,
	},
	assetId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const JoinRequest =
	mongoose.models.JoinRequest ||
	mongoose.model('JoinRequest', joinRequestSchema);

export default JoinRequest;
