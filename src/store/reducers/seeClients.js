const INITIAL_STATE = {
	data: [],
	open: false,
};

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'OPEN_MODAL_SEARCH') {
		console.log('Redux', action.user);
		return { data: action.user, open: true };
	}
	if (action.type === 'CLOSE_MODAL_SEARCH') {
		return INITIAL_STATE;
	}

	return state;
}
