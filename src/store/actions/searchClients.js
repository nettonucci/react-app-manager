export const getSearchClients = data => ({
	type: 'REQUEST_SEARCH_CLIENTS',
	data,
});

export const SearchClientsFatores = cpf => ({
	type: 'REQUEST_SEARCH_CLIENTS_FATORES',
	cpf,
});
