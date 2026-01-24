import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
	{
		// 🔹 scope
		shgId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shg',
			required: false, // some actions may be global
		},

		// 🔹 what was affected
		entityType: {
			type: String,
			enum: [
				'SHG',
				'SHG_MEMBER',
				'LOAN',
				'LOAN_REPAYMENT',
				'TRANSACTION',
				'BANK_LOAN',
				'USER',
			],
			required: true,
		},

		entityId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},

		// 🔹 what happened
		action: {
			type: String,
			enum: [
				'CREATE',
				'UPDATE',
				'DELETE',
				'APPROVE',
				'CLOSE',
				'REVERSE',
				'CHANGE_INTEREST',
				'CHANGE_CONTRIBUTION',
				'ADD_MEMBER',
				'REMOVE_MEMBER',
			],
			required: true,
		},

		// 🔹 audit detail (optional but powerful)
		oldValue: { type: Object },
		newValue: { type: Object },

		remarks: { type: String },

		// 🔹 who did it
		performedBy: { type: String }, // userId / shgMemberId
		source: {
			type: String,
			enum: ['SYSTEM', 'ADMIN', 'MEMBER'],
			default: 'SYSTEM',
		},
	},
	{ timestamps: true },
);

AuditLogSchema.index({ shgId: 1, createdAt: -1 });
AuditLogSchema.index({ entityType: 1, entityId: 1 });

export default mongoose.models.AuditLog ||
	mongoose.model('AuditLog', AuditLogSchema);
