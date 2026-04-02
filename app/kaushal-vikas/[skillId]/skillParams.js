export function normalizeSkillId(raw) {
	if (typeof raw === 'string') return raw;
	if (Array.isArray(raw) && raw.length > 0) return raw[0];
	return undefined;
}
