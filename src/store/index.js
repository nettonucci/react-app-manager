import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import plataformReducer from './plataformReducer';
import alerts from './reducers/alert';
import banners from './reducers/banner';
import videos from './reducers/videos';
import clients from './reducers/clients';
import pages from './reducers/page';
import login from './reducers/login';
import perfil from './reducers/perfil';
import users from './reducers/user';
import editUser from './reducers/editUser';
import companies from './reducers/companies';
import searchClientsFatores from './reducers/searchClientsFatores';

import rootSaga from './sagas/root';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	combineReducers({
		plataform: plataformReducer,
		users,
		videos,
		banners,
		alerts,
		clients,
		pages,
		login,
		perfil,
		editUser,
		searchClientsFatores,
		companies,
	}),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
