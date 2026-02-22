import mongoose from 'mongoose';

const SnapshotReportSchema = new mongoose.Schema(
	{
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: true,
			index: true,
		},
		month: {
			type: String,
			required: true,
			match: /^\d{4}-\d{2}$/,
		},
		generatedAt: {
			type: Date,
			required: true,
		},
		triggerType: {
			type: String,
			enum: ['ON_DEMAND', 'SCHEDULED'],
			default: 'ON_DEMAND',
		},
		storageProvider: {
			type: String,
			enum: ['vercel-blob', 'dummy-cloud'],
			required: true,
		},
		cloudPath: {
			type: String,
			required: true,
		},
		cloudUrl: {
			type: String,
			required: true,
		},
		jsonCloudPath: {
			type: String,
			default: null,
		},
		jsonCloudUrl: {
			type: String,
			default: null,
		},
		snapshot: {
			type: Object,
			default: {},
		},
	},
	{ timestamps: true },
);

SnapshotReportSchema.index({ shgId: 1, month: 1 }, { unique: true });

export default mongoose.models.SnapshotReport ||
	mongoose.model('SnapshotReport', SnapshotReportSchema);
