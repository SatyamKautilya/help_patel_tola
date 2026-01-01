import mongoose from 'mongoose';

const sopsSchema = new mongoose.Schema(
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
		symtoms: {
			type: String,
			required: false,
		},
		steps: {
			type: [String],
			required: false,
		},
		dos: {
			type: [String],
			required: false,
		},
		donts: {
			type: [String],
			required: false,
		},
	},
	{ timestamps: true },
);

sopsSchema.index({ createdAt: -1 });

export default mongoose.models.Sops || mongoose.model('Sops', sopsSchema);
