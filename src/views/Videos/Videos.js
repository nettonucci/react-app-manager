/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoAction from '../../store/actions/videos';
import { VideosToolbar } from './components';
import api from '../../server/api';
import {
	Container,
	DivRow,
	DivRow2,
	Box,
	IsPrincial,
	Box2,
	Button,
	Link,
	URL,
	Title,
	Header,
	TitleHeader,
} from './styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4),
	},
	iframe: {
		width: '100%',
		minHeight: 640,
		border: 0,
	},
	boxTitle: {},
	title: {
		marginTop: 10,
	},
	videoOpt: {
		backgroundColor: '#fff',
		height: '100%',
	},
	videoTitle: {
		fontWeight: 'bold',
		marginLeft: 10,
	},
	videoURL: {
		marginTop: 10,
		backgroundColor: '#fff',
		width: '100%',
		height: 50,
	},
	url: {
		marginLeft: 10,
		color: '#5f5f5f',
		fontWeight: 'bold',
	},
	link: {
		marginLeft: 10,
		color: '#4287f5',
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	boxButton: {
		backgroundColor: '#f1f',
		width: 100,
	},
	boxVideoTitle: {
		backgroundColor: '#ff1',
		width: 100,
	},
	divRow: {
		flexDirection: 'row',
		backgroundColor: '#000',
	},
}));

const Videos = ({ videos, getVideos, putIsPrincipalVideos }) => {
	const classes = useStyles();

	useEffect(() => {
		getVideos();
	}, []);

	const delVideo = video => {
		console.log(video);
	};

	const handleAddisPrincipal = video => {
		const { id } = video;
		putIsPrincipalVideos(id);
	};

	return (
		<div className={classes.root}>
			<VideosToolbar />
			<br />
			<Header>
				<TitleHeader>Videos</TitleHeader>
			</Header>
			<br />
			{videos.map(video => (
				<>
					<Container>
						<DivRow>
							<ReactPlayer
								height="100%"
								url={`https://www.youtube.com/watch?v=${video.url_video}`}
								width="100%"
							/>

							<DivRow2>
								<Box2>
									<Title>{video.nome_video}</Title>
								</Box2>
								{video.isPrincipal ? (
									<Box>
										<IsPrincial>Video Principal</IsPrincial>
									</Box>
								) : (
									<Box />
								)}
								<Box>
									{' '}
									<IconButton aria-label="edit">
										<CreateIcon fontSize="small" style={{ color: '#4287f5' }} />
									</IconButton>
									{video.isPrincipal !== true && (
										<IconButton aria-label="delete">
											<DeleteIcon fontSize="small" style={{ color: 'red' }} />
										</IconButton>
									)}
								</Box>
								<Box2>
									<URL>URL:&nbsp;</URL>

									<Link
										href={`https://www.youtube.com/watch?v=${video.url_video}`}
										target="_blank"
									>
										Clique aqui
									</Link>
								</Box2>
								<Box />
								<Box />
								{video.isPrincipal !== true ? (
									<Box2>
										<Button onClick={() => handleAddisPrincipal(video)}>
											Tornar Principal
										</Button>
									</Box2>
								) : (
									<Box />
								)}
							</DivRow2>
						</DivRow>
					</Container>
					<br />
				</>
			))}
		</div>
	);
};

const mapStateToProps = state => ({
	videos: state.videos,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(VideoAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
