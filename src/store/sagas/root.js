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

function* getUsers(action) {
	const response = yield call(api.get, `/clientsweb?page=${action.page}`);

	yield put({
		type: 'GET_USERS',
		users: response.data[0],
		filtro: false,
	});
	const { count } = response.data[1][0];
	const totalPages = Math.ceil(count / 20);
	yield put({
		type: 'GET_USERS_PAGES',
		pages: totalPages,
	});
}

function* searchUsers(action) {
	const response = yield call(api.post, '/clientsweb', action.data);
	if (response.data.length === 0) {
		window.alert('Nenhum resultado encontrato para este filtro!');
		getUsers();
		return;
	}
	yield put({
		type: 'GET_USERS',
		users: response.data,
		filtro: true,
	});
	yield put({
		type: 'GET_USERS_PAGES',
		pages: 1,
	});
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

	yield takeLatest('REQUEST_GET_USERS', getUsers);
	yield takeLatest('REQUEST_SEARCH_USERS', searchUsers);
}
