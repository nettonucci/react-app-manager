import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../server/api';

function* getAlerts() {
	const response = yield call(api.get, '/modalalert?web=true');
	yield put({
		type: 'GET_ALERTS',
		alerts: response.data,
	});
}

function* createAlerts(action) {
	yield call(api.post, '/modalalert', action.data);
	yield getAlerts();
}

function* getBanners() {
	const response = yield call(api.get, '/banners');
	yield put({
		type: 'GET_BANNERS',
		banners: response.data,
	});
}

function* createBanners(action) {
	yield call(api.post, '/banners', action.data);
	yield getBanners();
}

function* updateBanners(action) {
	yield call(api.put, `/banners/${action.data.id}`, action.data);
	yield getBanners();
}

function* deleteBanners(action) {
	yield call(api.delete, `/banners/${action.id}`);
	yield getBanners();
}

function* getVideos() {
	const response = yield call(api.get, '/videos');
	yield put({
		type: 'GET_VIDEOS',
		videos: response.data,
	});
}

function* isPrincipalVideo(action) {
	yield call(api.patch, `/videos/${action.id}`);
	yield getVideos();
}

function* createVideo(action) {
	yield call(api.post, '/videos', action.data);
	yield getVideos();
}

function* getClients(action) {
	const response = yield call(api.get, `/clientsweb?page=${action.page}`);

	yield put({
		type: 'GET_CLIENTS',
		users: response.data[0],
		filtro: false,
	});
	const { count } = response.data[1][0];
	const totalPages = Math.ceil(count / 20);
	yield put({
		type: 'GET_CLIENTS_PAGES',
		pages: totalPages,
	});
}

function* searchClients(action) {
	const response = yield call(api.post, '/clientsweb', action.data);
	if (response.data.length === 0) {
		window.alert('Nenhum resultado encontrato para este filtro!');
		getClients();
		return;
	}
	yield put({
		type: 'GET_CLIENTS',
		users: response.data,
		filtro: true,
	});
	yield put({
		type: 'GET_CLIENTS_PAGES',
		pages: 1,
	});
}

function* loginRequest(action) {
	yield put({
		type: 'LOAD_LOGIN',
		load: true,
	});
	const { history } = action.cred;
	const response = yield call(api.post, '/sessionweb', action.cred);
	const { token, email, title } = response.data[0];
	if (token) {
		yield put({
			type: 'GET_USER_PROFILE',
			profile: response.data,
		});
		localStorage.setItem('email_usuario_logado', email);
		localStorage.setItem('permissao_usuario_logado', title);
		localStorage.setItem('token_usuario_logado', token);
		history.push('/dashboard');
		yield put({
			type: 'LOAD_LOGIN',
			load: false,
		});
	} else {
		window.alert('Usuario e/ou senha incorreto(s)');
		yield put({
			type: 'LOAD_LOGIN',
			load: false,
		});
	}
	return;
}

function* perfilRequest(action) {
	const response = yield call(api.get, `/profile?email=${action.email}`);
	yield put({
		type: 'GET_USER_PROFILE',
		profile: response.data,
	});

	return;
}

function* getUsers() {
	const response = yield call(api.get, '/users');
	yield put({
		type: 'GET_USER',
		users: response.data,
	});

	return;
}

export default function* root() {
	yield takeLatest('REQUEST_GET_ALERTS', getAlerts);
	yield takeLatest('REQUEST_CREATE_ALERTS', createAlerts);

	yield takeLatest('REQUEST_GET_BANNERS', getBanners);
	yield takeLatest('REQUEST_CREATE_BANNERS', createBanners);
	yield takeLatest('REQUEST_UPDATE_BANNERS', updateBanners);
	yield takeLatest('REQUEST_DELETE_BANNERS', deleteBanners);

	yield takeLatest('REQUEST_GET_VIDEOS', getVideos);
	yield takeLatest('REQUEST_ISPRINCIPAL_VIDEOS', isPrincipalVideo);
	yield takeLatest('REQUEST_CREATE_VIDEOS', createVideo);

	yield takeLatest('REQUEST_GET_CLIENTS', getClients);
	yield takeLatest('REQUEST_SEARCH_CLIENTS', searchClients);

	yield takeLatest('REQUEST_LOGIN', loginRequest);

	yield takeLatest('REQUEST_PERFIL', perfilRequest);

	yield takeLatest('REQUEST_GET_USERS', getUsers);
}
