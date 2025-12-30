export const getTextById = (arr, id) => {
	return Array.isArray(arr) ? arr.find((obj) => obj.id === id)?.text : '';
};
