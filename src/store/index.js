import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import plataformReducer from './plataformReducer';
import clientsReducer from './clientsReducer';
import clientsSearchReducer from './clientsSearchReducer';
import clientsEraseFilterReducer from './clientsEraseFilterReducer';
import alerts from './reducers/alert';
import banners from './reducers/banner';
import videos from './reducers/videos';

import rootSaga from './sagas/root';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	combineReducers({
		plataform: plataformReducer,
		clients: clientsReducer,
		clientsSearch: clientsSearchReducer,
		eraseFilter: clientsEraseFilterReducer,
		videos,
		banners,
		alerts,
	}),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
