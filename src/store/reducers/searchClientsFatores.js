const INITIAL_STATE = {
	data: [],
	load: false,
};

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'SEARCH_CLIENT_FATORES_LOAD') {
		return { ...state, load: true };
	}
	if (action.type === 'SEARCH_CLIENT_FATORES') {
		return { data: action.data, load: false };
	}

	return state;
}
