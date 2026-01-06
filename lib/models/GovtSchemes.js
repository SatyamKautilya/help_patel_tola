const mongoose = require('mongoose');

const govtSchemesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	eligibility: {
		type: String,
		required: true,
		trim: true,
	},
	details: {
		type: String,
		required: true,
		trim: true,
	},
	benefits: {
		type: String,
		required: true,
		trim: true,
	},
	howToEnroll: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.GovtSchemes ||
	mongoose.model('GovtSchemes', govtSchemesSchema);
