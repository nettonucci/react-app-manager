import { createStore, combineReducers } from 'redux';

import plataformReducer from './plataformReducer';

const rootReducer = combineReducers({
  plataform: plataformReducer
});

export default createStore(rootReducer);
