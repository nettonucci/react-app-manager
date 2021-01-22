export const getVideos = list => ({
	type: 'REQUEST_GET_VIDEOS',
	list,
});

export const putIsPrincipalVideos = id => ({
	type: 'REQUEST_ISPRINCIPAL_VIDEOS',
	id,
});

export const createVideo = data => ({
	type: 'REQUEST_CREATE_VIDEOS',
	data,
});
