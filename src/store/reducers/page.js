const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_USERS_PAGES') {
		return action.pages;
	}
	return state;
}
