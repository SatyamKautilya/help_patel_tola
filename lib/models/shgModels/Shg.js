import mongoose from 'mongoose';

const ContributionHistorySchema = new mongoose.Schema(
	{
		oldAmount: { type: Number, required: true },
		newAmount: { type: Number, required: true },

		effectiveFrom: { type: Date, required: true },

		decidedBy: { type: String }, // meeting id / admin id
		reason: { type: String },
	},
	{ _id: false },
);

const ShgSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },

		village: String,
		block: String,
		district: String,

		formationDate: Date,

		// 🔹 current effective contribution
		monthlyContribution: { type: Number, required: true },

		// 🔹 history of permanent changes
		contributionHistory: [ContributionHistorySchema],

		status: {
			type: String,
			enum: ['ACTIVE', 'INACTIVE'],
			default: 'ACTIVE',
		},

		createdBy: String,
	},
	{ timestamps: true },
);

export default mongoose.models.Shg || mongoose.model('Shg', ShgSchema);
