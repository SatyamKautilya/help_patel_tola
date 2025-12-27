import mongoose from 'mongoose';

const healthtopicsSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},

		topic: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

healthtopicsSchema.index({ topic: 1, createdAt: -1 });

export default mongoose.models.HealthTopics ||
	mongoose.model('HealthTopics', healthtopicsSchema);
