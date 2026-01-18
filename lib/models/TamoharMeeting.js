import mongoose from 'mongoose';

/**
 * Sub-schema: चर्चा (Discussion Section)
 */
const CharchaSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 100,
			trim: true,
		},
		details: {
			type: String,
			required: true,
			maxlength: 500,
			trim: true,
		},
		findings: {
			type: String,
			maxlength: 300,
			trim: true,
		},
	},
	{ _id: false },
);

/**
 * Sub-schema: Suggestions / Appraisal
 */
const SuggestionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 50,
			trim: true,
		},
		suggestion: {
			type: String,
			required: true,
			maxlength: 200,
			trim: true,
		},
	},
	{ _id: false },
);

/**
 * Main Schema: Tamohar Meeting
 */
const TamoharMeetingSchema = new mongoose.Schema(
	{
		meetingName: {
			type: String,
			required: true,
			maxlength: 20,
			trim: true,
			// example: "तमोहर - बैठक 1"
		},

		theme: {
			type: String,
			required: true,
			// example: "health"
		},

		meetingDate: {
			type: Date,
			required: true,
			// example: 31/12/2025
		},

		place: {
			type: String,
			required: true,
			maxlength: 30,
			trim: true,
			// example: "खेरमाई मंदिर पटेल टोला"
		},

		aim: {
			type: String,
			required: true,
			maxlength: 200,
			trim: true,
			// उद्देश्य
		},

		charcha: {
			type: [CharchaSchema],
			default: [],
			// चर्चा भाग 1, 2, 3...
		},

		interventionStrategy: {
			type: [
				{
					type: String,
					maxlength: 50,
					trim: true,
				},
			],
			default: [],
		},

		decisions: {
			type: [
				{
					type: String,
					maxlength: 50,
					trim: true,
				},
			],
			default: [],
		},

		executionPlan30Days: {
			type: [
				{
					type: String,
					maxlength: 100,
					trim: true,
				},
			],
			default: [],
		},

		suggestionsFromAttendees: {
			type: [SuggestionSchema],
			default: [],
		},

		attendees: {
			type: [
				{
					type: String,
					maxlength: 50,
					trim: true,
				},
			],
			default: [],
		},
		visibilityGroups: {
			type: [String],
			required: true,
			default: [],
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	},
);

export default mongoose.models.TamoharMeeting ||
	mongoose.model('TamoharMeeting', TamoharMeetingSchema);
