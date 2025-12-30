export const getTextById = (arr, id) => {
	return Array.isArray(arr) ? arr.find((obj) => obj.id === id)?.text : '';
};

export const filterhospitals = (mainResp, specialityIds) => {
	if (
		specialityIds === undefined ||
		(Array.isArray(specialityIds) && specialityIds?.length === 0)
	) {
		return mainResp;
	}
	return mainResp.filter((hospital) =>
		hospital.specialityId?.some((id) => specialityIds.includes(id)),
	);
};
