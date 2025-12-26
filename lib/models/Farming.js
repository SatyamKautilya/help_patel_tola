const mongoose = require('mongoose');

const farmingSchema = new mongoose.Schema(
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
		img: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);
farmingSchema.index({ id: 1, createdAt: -1 });

export default mongoose.models.Farming ||
	mongoose.model('Farming', farmingSchema);
