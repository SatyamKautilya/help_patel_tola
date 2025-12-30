import mongoose from 'mongoose';

const titleandtextsSchema = new mongoose.Schema(
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
	},
	{ timestamps: true },
);

titleandtextsSchema.index({ name: 1, createdAt: -1 });

export default mongoose.models.Titleandtexts ||
	mongoose.model('Titleandtexts', titleandtextsSchema);
