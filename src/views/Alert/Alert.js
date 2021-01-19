/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import { AlertToolbar } from './components';
import api from '../../server/api';
import './styles.css';
import {
	Container,
	DivRow,
	DivRow2,
	IsPrincialAtivo,
	AtivoOn,
	AtivoOff,
	IsPrincialPausado,
	PausadoOn,
	PausadoOff,
	Box2,
	BoxStyled,
	ButtonAct,
	Link,
	URL,
	Title,
	Header,
	TitleHeader,
	IsAtivoOn,
	IsAtivoOff,
	IsPausadoOn,
	IsPausadoOff,
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
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
}));

const Banners = () => {
	const classes = useStyles();
	const [alerts, setAlerts] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [alert, setalert] = React.useState(false);
	const [ativo, setAtivo] = React.useState('false');
	const [desc, setdesc] = React.useState('');
	const [link, setlink] = React.useState('');
	const [files, setFiles] = useState({});
	const [id, setID] = useState([]);
	const [title, setTitle] = useState('Titulo');
	const [title_color, setTitle_color] = useState('#000');
	const [subtitle, setSubtitle] = useState('Subtitulo');
	const [subtitle_color, setSubtitle_color] = useState('#000');
	const [description, setDescription] = useState('Descrição');
	const [description_color, setDescription_color] = useState('#000');
	const [thumbnail, setThumbnail] = useState(null);
	const [text_button, setText_button] = useState('OK');
	const [button_color, setButton_color] = useState('#fff');
	const [id_base, setId_base] = useState(3);
	const [bkg_color, setBkg_color] = useState('#fff');

	const handleEditAlert = alert => {
		console.log(alert);
		setFiles(alert);
		setTitle(alert.title);
		setTitle_color(alert.title_color);
		setSubtitle(alert.subtitle);
		setSubtitle_color(alert.subtitle_color);
		setDescription(alert.description);
		setDescription_color(alert.description_color);
		setThumbnail(alert.uri_img);
		setText_button(alert.text_button);
		setButton_color(alert.button_color);
		setAtivo(alert.ativo);
		handleClickOpen();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};

	const banner = useSelector(state => state.banners);

	useEffect(() => {
		getAlert();
	}, [banner]);

	const getAlert = () => {
		const web = true;
		api.get('modalalert?web=true').then(response => {
			console.log(response.data);
			setAlerts(response.data);
		});
	};

	const handleDelBanners = () => {
		api.delete(`banners/${id}`).then(response => {
			const resp = response.data;
			if (resp === 'Successes') {
				handleClose2();
				getAlert();
			}
		});
	};

	const handleChangeToPause = () => {
		setAtivo(false);
	};

	const handleChangeToActive = () => {
		setAtivo(true);
	};

	const handleSaveChanges = () => {};

	return (
		<div className={classes.root}>
			<AlertToolbar />
			<br />
			<Header>
				<TitleHeader>Alertas</TitleHeader>
			</Header>
			<br />
			<GridList className={classes.gridList} cols={2.5}>
				{alerts.map(alert => (
					<Box
						boxShadow={3}
						m={1}
						p={1}
						style={{
							width: '300px',
							height: 'auto',
							backgroundColor: bkg_color,
							borderRadius: 5,
							cursor: 'pointer',
						}}
						onClick={() => handleEditAlert(alert)}
					>
						{alert.ativo ? (
							<Alert
								icon={<PlayArrowIcon fontSize="inherit" />}
								severity="success"
							>
								Alerta ativado!
							</Alert>
						) : (
							<Alert icon={<PauseIcon fontSize="inherit" />} severity="error">
								Alerta desativado!
							</Alert>
						)}

						<br />
						<p
							style={{
								color: alert.title_color,
								fontWeight: 'bold',
								fontSize: 20,
								textAlign: 'center',
							}}
						>
							{alert.title}
						</p>
						<br />
						<div
							style={{
								width: '250px',
								height: 'auto',
								// backgroundColor: '#f1f',
								borderRadius: 5,
								wordWrap: 'break-word',
								marginBottom: 5,
							}}
						>
							<p
								style={{
									color: alert.subtitle_color,
									fontWeight: 'bold',
									fontSize: 16,
									marginLeft: 10,
								}}
							>
								{alert.subtitle}
							</p>
						</div>
						<div
							style={{
								width: '250px',
								height: 'auto',
								// backgroundColor: '#f1f',
								borderRadius: 5,
								wordWrap: 'break-word',
							}}
						>
							<p
								style={{
									color: alert.description_color,
									fontWeight: 'bold',
									fontSize: 13,
									marginLeft: 10,
								}}
							>
								{alert.description}
							</p>
						</div>
						<img
							src={`http://app1.cabonnet.com.br:3333/promos/${alert.uri_img}`}
							style={{ height: 180 }}
						/>
						<Box
							boxShadow={3}
							bgcolor="background.paper"
							m={1}
							p={1}
							style={{
								width: '95%',
								height: '30px',
								backgroundColor: alert.button_color,
								borderRadius: 5,
							}}
						>
							<p
								style={{
									color: '#fff',
									fontWeight: 'bold',
									fontSize: 16,
									textAlign: 'center',
								}}
							>
								{alert.text_button}
							</p>
						</Box>
					</Box>
				))}
			</GridList>

			<Dialog
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
				onClose={handleClose}
				open={open}
			>
				{alert && (
					<Alert severity="error">Campos com (*) são obrigatórios</Alert>
				)}
				<DialogTitle id="form-dialog-title">Editar Alerta</DialogTitle>
				<DialogContent>
					<Grid
						container
						// m={3}
						spacing={4}
					>
						<Grid item xs={7}>
							{ativo === true ? (
								<BoxStyled>
									<IsAtivoOn disabled={true}>
										<AtivoOn>Ativo</AtivoOn>
									</IsAtivoOn>
									&nbsp;&nbsp;&nbsp;
									<IsPausadoOff onClick={handleChangeToPause}>
										<PausadoOff>Desativar</PausadoOff>
									</IsPausadoOff>
								</BoxStyled>
							) : (
								<BoxStyled>
									<IsAtivoOff onClick={handleChangeToActive}>
										<AtivoOff>Ativar</AtivoOff>
									</IsAtivoOff>
									&nbsp;&nbsp;&nbsp;
									<IsPausadoOn disabled={true}>
										<PausadoOn>Desativado</PausadoOn>
									</IsPausadoOn>
								</BoxStyled>
							)}
							<Grid
								container
								// m={3}
								spacing={4}
							>
								<Grid item xs={10}>
									<TextField
										autoFocus
										fullWidth
										id="title"
										label="Titulo*"
										margin="dense"
										onChange={event => setTitle(event.target.value)}
										type="text"
										value={title}
									/>
								</Grid>
							</Grid>
							<Grid
								container
								// m={3}
								spacing={4}
							>
								<Grid item xs={10}>
									<TextField
										fullWidth
										id="subtitle"
										label="Subtitulo*"
										margin="dense"
										onChange={event => setSubtitle(event.target.value)}
										type="text"
										value={subtitle}
									/>
								</Grid>
							</Grid>
							<Grid
								container
								// m={3}
								spacing={4}
							>
								<Grid item xs={10}>
									<TextField
										fullWidth
										id="description"
										label="Descrição*"
										margin="dense"
										onChange={event => setDescription(event.target.value)}
										type="text"
										value={description}
									/>
								</Grid>
							</Grid>
							<Grid
								container
								// m={3}
								spacing={4}
							>
								<Grid item xs={10}>
									<TextField
										fullWidth
										id="text_button"
										label="Texto do botão*"
										margin="dense"
										onChange={event => setText_button(event.target.value)}
										type="text"
										value={text_button}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={5}>
							<DialogContentText>Prévia:</DialogContentText>

							<Box
								boxShadow={3}
								m={1}
								p={1}
								style={{
									width: '300px',
									height: 'auto',
									backgroundColor: bkg_color,
									borderRadius: 5,
								}}
							>
								<br />
								<p
									style={{
										color: title_color,
										fontWeight: 'bold',
										fontSize: 20,
										textAlign: 'center',
									}}
								>
									{title}
								</p>
								<br />
								<div
									style={{
										width: '250px',
										height: 'auto',
										// backgroundColor: '#f1f',
										borderRadius: 5,
										wordWrap: 'break-word',
										marginBottom: 5,
									}}
								>
									<p
										style={{
											color: subtitle_color,
											fontWeight: 'bold',
											fontSize: 16,
											marginLeft: 10,
										}}
									>
										{subtitle}
									</p>
								</div>
								<div
									style={{
										width: '250px',
										height: 'auto',
										// backgroundColor: '#f1f',
										borderRadius: 5,
										wordWrap: 'break-word',
									}}
								>
									<p
										style={{
											color: description_color,
											fontWeight: 'bold',
											fontSize: 13,
											marginLeft: 10,
										}}
									>
										{description}
									</p>
								</div>
								<img
									src={`http://app1.cabonnet.com.br:3333/promos/${thumbnail}`}
									style={{ height: 180 }}
								/>
								<Box
									boxShadow={3}
									bgcolor="background.paper"
									m={1}
									p={1}
									style={{
										width: '95%',
										height: '30px',
										backgroundColor: button_color,
										borderRadius: 5,
									}}
								>
									<p
										style={{
											color: '#fff',
											fontWeight: 'bold',
											fontSize: 16,
											textAlign: 'center',
										}}
									>
										{text_button}
									</p>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleClose}>
						Cancelar
					</Button>
					<Button color="primary">Salvar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Banners;
