import mongoose from 'mongoose';
import { z } from 'zod';

const joinRequestSchema = new mongoose.Schema({
	villageId: {
		type: z.string(),
		required: true,
	},
	assetId: {
		type: String,
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
