const INITIAL_STATE = {
	data: [],
	filtro: false,
};

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_USERS') {
		return { data: action.users, filtro: action.filtro };
	}
	return state;
}
