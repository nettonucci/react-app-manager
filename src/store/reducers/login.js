const INITIAL_STATE = {
	loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'LOAD_LOGIN') {
		return { loading: action.load };
	}
	return state;
}
