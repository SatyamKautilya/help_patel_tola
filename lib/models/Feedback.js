const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	sender: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Feedback ||
	mongoose.model('Feedback', feedbackSchema);
