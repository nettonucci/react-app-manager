export const getSearchClients = data => ({
	type: 'REQUEST_SEARCH_CLIENTS',
	data,
});

export const SearchClientsFatores = cpf => ({
	type: 'REQUEST_SEARCH_CLIENTS_FATORES',
	cpf,
});

export const openModalSearch = user => ({
	type: 'OPEN_MODAL_SEARCH',
	user,
});

export const closeModalSearch = () => ({
	type: 'CLOSE_MODAL_SEARCH',
});
