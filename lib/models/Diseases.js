import mongoose from 'mongoose';

const diseasesSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		diseaseId: {
			type: String,
			required: true,
			index: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
		imgUrl: {
			type: String,
			default: '/',
		},
	},
	{ timestamps: true },
);

diseasesSchema.index({ categoryId: 1, createdAt: -1 });

export default mongoose.models.Diseases ||
	mongoose.model('Diseases', diseasesSchema);
