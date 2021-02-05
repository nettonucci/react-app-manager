const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'SEARCH_CLIENT_FATORES') {
		return action.data;
	}

	return state;
}
