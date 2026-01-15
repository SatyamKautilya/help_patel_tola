const mongoose = require('mongoose');
const { string } = require('zod');

const joinRequestSchema = new mongoose.Schema({
	villageId: {
		type: string,
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

module.exports = JoinRequest;
