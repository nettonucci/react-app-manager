const INITIAL_STATE = [
	{
		name: null,
		title: null,
		email: null,
		photo: null,
	},
];

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_USER_PROFILE') {
		return action.profile;
	}
	return state;
}
