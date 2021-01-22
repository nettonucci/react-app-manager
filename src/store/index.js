import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import plataformReducer from './plataformReducer';
import videoReducer from './videoReducer';
import clientsReducer from './clientsReducer';
import clientsSearchReducer from './clientsSearchReducer';
import clientsEraseFilterReducer from './clientsEraseFilterReducer';
import alerts from './reducers/alert';
import banners from './reducers/banner';

import rootSaga from './sagas/root';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	combineReducers({
		plataform: plataformReducer,
		video: videoReducer,
		clients: clientsReducer,
		clientsSearch: clientsSearchReducer,
		eraseFilter: clientsEraseFilterReducer,
		banners,
		alerts,
	}),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
