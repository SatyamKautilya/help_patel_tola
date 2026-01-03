import mongoose from 'mongoose';

const successstorySchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		storySegment: [
			{
				heading: String,
				desc: String,
			},
		],
	},
	{ timestamps: true },
);

successstorySchema.index({ createdAt: -1 });

export default mongoose.models.Successstorys ||
	mongoose.model('Successstorys', successstorySchema);
