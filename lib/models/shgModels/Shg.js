const ShgSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },

		village: String,
		block: String,
		district: String,
		state: String,

		formationDate: Date,
		monthlyContribution: { type: Number, required: true },

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
