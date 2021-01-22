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
}
