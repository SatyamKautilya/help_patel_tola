import mongoose from 'mongoose';

const hospitallistsSchema = new mongoose.Schema(
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
		address: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		speciality: {
			type: [String],
			required: true,
		},
		experiences: {
			type: [
				{
					name: String,
					feedback: String,
					rating: Number,
					createdAt: {
						type: Date,
						default: Date.now,
					},
				},
			],
			required: false,
		},
	},
	{ timestamps: true },
);

hospitallistsSchema.index({ name: 1, createdAt: -1 });

export default mongoose.models.Hospitallists ||
	mongoose.model('Hospitallists', hospitallistsSchema);
