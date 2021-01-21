export const getAlerts = list => ({
	type: 'REQUEST_GET_BANNERS',
	list,
});

export const createAlerts = data => ({
	type: 'REQUEST_CREATE_BANNERS',
	data,
});
