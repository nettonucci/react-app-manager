/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */

const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'ERASE_SEARCH_CLIENTS') {
    return [...state, 'ok'];
  }
  return state;
}

export const eraseSearchClients = (list) => ({
  type: 'ERASE_SEARCH_CLIENTS',
  list,
});
