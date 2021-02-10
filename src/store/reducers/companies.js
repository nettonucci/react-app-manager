const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_COMPANIES') {
		return action.companies;
	}
	return state;
}
