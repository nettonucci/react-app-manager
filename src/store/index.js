import { createStore, combineReducers } from 'redux';

import plataformReducer from './plataformReducer';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
  plataform: plataformReducer,
  video: videoReducer
});

export default createStore(rootReducer);
