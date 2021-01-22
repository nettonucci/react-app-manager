export const getBanners = () => ({
	type: 'REQUEST_GET_BANNERS',
});

export const createBanners = data => ({
	type: 'REQUEST_CREATE_BANNERS',
	data,
});

export const updateBanners = data => ({
	type: 'REQUEST_UPDATE_BANNERS',
	data,
});

export const deleteBanners = id => ({
	type: 'REQUEST_DELETE_BANNERS',
	id,
});
