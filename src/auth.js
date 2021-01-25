export const isAuthenticated = () => {
	const token = localStorage.getItem('token_usuario_logado');

	if (token) {
		return true;
	} else {
		console.log('entrou aqui');
		return false;
	}
};

export const isAuthenticatedDev = () => {
	const token = localStorage.getItem('token_usuario_logado');
	const permissao = localStorage.getItem('permissao_usuario_logado');

	if (token && permissao === 'Desenvolvedor') {
		return true;
	} else {
		return false;
	}
};
