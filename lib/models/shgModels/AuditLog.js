const AuditLogSchema = new mongoose.Schema(
	{
		entity: String,
		entityId: String,
		action: String,
		performedBy: String,
		remarks: String,
	},
	{ timestamps: true },
);

export default mongoose.models.AuditLog ||
	mongoose.model('AuditLog', AuditLogSchema);
