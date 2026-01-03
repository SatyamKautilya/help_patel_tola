import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		storySegment: [
			{
				heading: {
					type: String,
					required: true,
				},
				description: {
					type: String,
				},
			},
		],
	},
	{ timestamps: true },
);

successStorySchema.index({ createdAt: -1 });

export default mongoose.models.SuccessStories ||
	mongoose.model('SuccessStories', successStorySchema);
