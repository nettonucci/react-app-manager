export const isAuthenticated = () => {
	const token = localStorage.getItem('token_usuario_logado');

	if (token) {
		return true;
	} else {
		console.log('entrou aqui');
		return false;
	}
};
