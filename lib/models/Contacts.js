import mongoose from 'mongoose';

const contactsSchema = new mongoose.Schema(
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
		role: {
			type: String,
			default: '',
		},
		mobile: {
			type: String,
			default: '0000000000',
		},
		visibilityGroups: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true },
);

contactsSchema.index({ role: 1, createdAt: -1 });

export default mongoose.models.Contacts ||
	mongoose.model('Contacts', contactsSchema);
