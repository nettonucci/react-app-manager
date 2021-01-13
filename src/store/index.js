import { createStore, combineReducers } from 'redux';

import plataformReducer from './plataformReducer';
import videoReducer from './videoReducer';
import clientsReducer from './clientsReducer';
import clientsSearchReducer from './clientsSearchReducer';
import clientsEraseFilterReducer from './clientsEraseFilterReducer'

const rootReducer = combineReducers({
  plataform: plataformReducer,
  video: videoReducer,
  clients: clientsReducer,
  clientsSearch: clientsSearchReducer,
  eraseFilter: clientsEraseFilterReducer,
});

export default createStore(rootReducer);
