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
	const [ativo, setAtivo] = React.useState(false);
	const [files, setFiles] = useState({});
	const [id, setID] = useState([]);

	const handleEditAlert = alert => {
		setFiles(alert);
		setAtivo(alert.ativo);
		handleClickOpen();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setFiles({});
	};

	const alert = useSelector(state => state.alert);

	useEffect(() => {
		getAlert();
	}, [alert]);

	const getAlert = () => {
		api.get('modalalert?web=true').then(response => {
			console.log(response.data);
			setAlerts(response.data);
		});
	};

	const handleChangeToPause = () => {
		setAtivo(false);
	};

	const handleChangeToActive = () => {
		setAtivo(true);
	};

	const handleSaveChanges = () => {
		api.put(`modalalert/${files.id}`, { ativo }).then(response => {
			handleClose();
			getAlert();
		});
	};

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
							backgroundColor: '#fff',
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
								Alerta ativado! Base: {alert.base}
							</Alert>
						) : (
							<Alert icon={<PauseIcon fontSize="inherit" />} severity="error">
								Alerta desativado! Base: {alert.base}
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
						<div style={{ textAlign: 'center' }}>
							<img
								src={`http://app1.cabonnet.com.br:3333/promos/${alert.uri_img}`}
								style={{ height: 180 }}
							/>
						</div>
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
				open={open}
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Editar Alerta</DialogTitle>
				<DialogContent>
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

					<DialogContentText>Prévia:</DialogContentText>

					<Box
						boxShadow={3}
						m={1}
						p={1}
						style={{
							width: '300px',
							height: 'auto',
							backgroundColor: '#fff',
							borderRadius: 5,
						}}
					>
						<br />
						<p
							style={{
								color: files.title_color,
								fontWeight: 'bold',
								fontSize: 20,
								textAlign: 'center',
							}}
						>
							{files.title}
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
									color: files.subtitle_color,
									fontWeight: 'bold',
									fontSize: 16,
									marginLeft: 10,
								}}
							>
								{files.subtitle}
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
									color: files.description_color,
									fontWeight: 'bold',
									fontSize: 13,
									marginLeft: 10,
								}}
							>
								{files.description}
							</p>
						</div>
						<img
							src={`http://app1.cabonnet.com.br:3333/promos/${files.uri_img}`}
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
								backgroundColor: files.button_color,
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
								{files.text_button}
							</p>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleClose}>
						Cancelar
					</Button>
					<Button color="primary" onClick={handleSaveChanges}>
						Salvar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Banners;
