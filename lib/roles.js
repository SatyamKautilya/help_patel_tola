export const ROLE_OPTIONS = [
	'super_admin',
	'approver',
	'content_editor',
	'notification_sender',
	'shg_onboarder',
];

export const PERMISSIONS = {
	view_stats: ['super_admin'],
	manage_approvals: ['super_admin', 'approver'],
	edit_content: ['super_admin', 'content_editor'],
	send_notifications: ['super_admin', 'notification_sender'],
	onboard_shgs: ['super_admin', 'shg_onboarder'],
	manage_access: ['super_admin'],
};

export function getRolesForVillage(user, villageCode) {
	const globalGroups = Array.isArray(user?.userGroups) ? user.userGroups : [];
	const villageRoles = Array.isArray(user?.villageRoles) ? user.villageRoles : [];
	const scopedRoles = villageRoles
		.filter((entry) => entry?.villageCode === villageCode)
		.map((entry) => entry.role);
	const adminRole = user?.isAdmin ? ['super_admin'] : [];
	return Array.from(new Set([...globalGroups, ...scopedRoles, ...adminRole]));
}

export function hasPermission(roles, action) {
	const allowed = PERMISSIONS[action] || [];
	return roles.some((role) => allowed.includes(role));
}
