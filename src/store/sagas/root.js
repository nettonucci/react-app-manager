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
function* searchClientsFatores(action) {
	yield put({
		type: 'SEARCH_CLIENT_FATORES_LOAD',
	});
	const response = yield call(api.get, `/fatoresweb?cpffinal=${action.cpf}`);
	console.log(response.data);
	if (response.data.length === 0) {
		window.alert('Nenhum cliente encontrato para este CPF/CNPJ!');
		yield put({
			type: 'SEARCH_CLIENT_FATORES',
			data: [],
		});
		return;
	}
	const response2 = yield call(api.post, '/assinantesweb', response.data[0]);
	yield put({
		type: 'SEARCH_CLIENT_FATORES',
		data: response2.data,
	});
}

function* loginRequest(action) {
	yield put({
		type: 'LOAD_LOGIN',
		load: true,
	});
	const { history } = action.cred;
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	const response = yield call(api.post, '/sessionweb', action.cred);
	if (response.data !== false) {
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
		}
	} else {
		console.log('entrou');
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

function* chgPass(action) {
	const response = yield call(api.put, `/userschgpass`, action.data);
	if (response.data.result === 'Successfully') {
		window.alert('Senha alterada com sucesso!');
	} else {
		window.alert('Senha atual incorreta!');
	}
	return;
}

function* getUsers() {
	const token = localStorage.getItem('token_usuario_logado');
	const response = yield call(api.get, '/users');
	yield (api.defaults.headers.Authorization = `Bearer ${token}`);
	yield put({
		type: 'GET_USER',
		users: response.data,
	});

	return;
}

function* createUsers(action) {
	yield call(api.post, '/users', action.data);
	yield getUsers();
	return;
}

function* editUsers(action) {
	yield call(api.put, '/users', action.data);
	yield getUsers();
	return;
}

function* getCompanies() {
	const response = yield call(api.get, '/empresas');
	yield put({
		type: 'GET_COMPANIES',
		companies: response.data,
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
	yield takeLatest('REQUEST_SEARCH_CLIENTS_FATORES', searchClientsFatores);

	yield takeLatest('REQUEST_LOGIN', loginRequest);

	yield takeLatest('REQUEST_PERFIL', perfilRequest);
	yield takeLatest('CHANGE_PASS_REQUEST', chgPass);

	yield takeLatest('REQUEST_GET_USERS', getUsers);
	yield takeLatest('REQUEST_CREATE_USER', createUsers);
	yield takeLatest('REQUEST_EDIT_USER', editUsers);

	yield takeLatest('REQUEST_GET_COMPANIES', getCompanies);
}
