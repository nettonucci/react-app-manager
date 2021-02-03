export const perfilRequest = email => ({
	type: 'REQUEST_PERFIL',
	email,
});

export const changePassRequest = data => ({
	type: 'CHANGE_PASS_REQUEST',
	data,
});
