/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */

const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'GET_SEARCH_CLIENTS') {
    return action.list;
  }
  return state;
}

export const getSearchClients = (list) => ({
  type: 'GET_SEARCH_CLIENTS',
  list,
});
