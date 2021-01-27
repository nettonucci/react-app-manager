export const getClients = () => ({
	type: 'REQUEST_GET_USERS',
});

export const editUser = data => ({
	type: 'EDIT_USER',
	data,
});

export const closeEditUser = () => ({
	type: 'CLOSE_EDIT_USER',
});

export const createUser = data => ({
	type: 'REQUEST_CREATE_USER',
	data,
});

export const saveEditUser = data => ({
	type: 'REQUEST_EDIT_USER',
	data,
});
