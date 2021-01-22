const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_BANNERS') {
		return action.banners;
	}
	return state;
}
