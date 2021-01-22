export const getAlerts = list => ({
	type: 'REQUEST_GET_ALERTS',
	list,
});

export const createAlerts = data => ({
	type: 'REQUEST_CREATE_ALERTS',
	data,
});
