/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */

const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_BANNERS') {
		return [...state, action.list];
	}
	return state;
}

export const getBanners = list => ({
	type: 'GET_BANNERS',
	list,
});
