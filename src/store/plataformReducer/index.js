/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */

let INITIAL_STATE = [{ android: 0, ios: 0 }];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'GET_PLATAFORM') {
    return action.porcentagem;
  }
  return state;
}

export const getPlataform = porcentagem => {
  return {
    type: 'GET_PLATAFORM',
    porcentagem
  };
};
