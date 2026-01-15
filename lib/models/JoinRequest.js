const mongoose = require('mongoose');
const { string } = require('zod');

const joinRequestSchema = new mongoose.Schema({
	villageId: {
		type: string,
		required: true,
		validate: {
			validator: function (value) {
				return value >= 1 && value <= 10;
			},
			message: 'Village ID must be between 1 and 10',
		},
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
