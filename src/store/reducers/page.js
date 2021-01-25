const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_CLIENTS_PAGES') {
		return action.pages;
	}
	return state;
}
