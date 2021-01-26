const INITIAL_STATE = {
	data: [],
	open: false,
};

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'EDIT_USER') {
		return { data: action.data, open: true };
	}
	if (action.type === 'CLOSE_EDIT_USER') {
		return INITIAL_STATE;
	}

	return state;
}
