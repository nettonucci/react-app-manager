import { createStore, combineReducers } from 'redux';

import plataformReducer from './plataformReducer';
import videoReducer from './videoReducer';
import clientsReducer from './clientsReducer';
import clientsSearchReducer from './clientsSearchReducer';
import clientsEraseFilterReducer from './clientsEraseFilterReducer';
import BannersReducer from './BannersReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
	plataform: plataformReducer,
	video: videoReducer,
	clients: clientsReducer,
	clientsSearch: clientsSearchReducer,
	eraseFilter: clientsEraseFilterReducer,
	banners: BannersReducer,
	alert: alertReducer,
});

export default createStore(rootReducer);
