export const getClients = () => ({
	type: 'REQUEST_GET_USERS',
});

export const editUser = data => ({
	type: 'EDIT_USER',
	data,
});

export const closeEditUser = data => ({
	type: 'CLOSE_EDIT_USER',
	data,
});
