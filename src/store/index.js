import { createStore, combineReducers } from 'redux';

import plataformReducer from './plataformReducer';
import videoReducer from './videoReducer';
import clientsReducer from './clientsReducer';

const rootReducer = combineReducers({
  plataform: plataformReducer,
  video: videoReducer,
  clients: clientsReducer,
});

export default createStore(rootReducer);
