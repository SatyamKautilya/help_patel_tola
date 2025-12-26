import mongoose from 'mongoose';

const cropsSchema = new mongoose.Schema(
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

cropsSchema.index({ role: 1, createdAt: -1 });

export default mongoose.models.Crops || mongoose.model('Crops', cropsSchema);
