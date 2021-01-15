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
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
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
import { BannersToolbar } from './components';
import api from '../../server/api';
import {
	Container,
	DivRow,
	DivRow2,
	Box,
	IsPrincialAtivo,
	AtivoOn,
	AtivoOff,
	IsPrincialPausado,
	PausadoOn,
	PausadoOff,
	Box2,
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
}));

const Banners = () => {
	const classes = useStyles();
	const [banners, setBanners] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [alert, setalert] = React.useState(false);
	const [isAtivo, setIsAtivo] = React.useState('false');
	const [title, settitle] = React.useState('');
	const [subtitle, setsubtitle] = React.useState('');
	const [desc, setdesc] = React.useState('');
	const [link, setlink] = React.useState('');
	const [files, setFiles] = useState([]);
	const [id, setID] = useState([]);

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

	const handleDeleteBanner = banner => {
		setFiles(banner.uri_img);
		setID(banner.id);
		handleClickOpen2();
	};

	const handleEditBanner = banner => {
		settitle(banner.nome_promocao);
		setsubtitle(banner.subtitle);
		setlink(banner.link);
		setFiles(banner.uri_img);
		setdesc(banner.description);
		setID(banner.id);
		setIsAtivo(banner.ativo);
		handleClickOpen();
	};

	const banner = useSelector(state => state.banners);

	useEffect(() => {
		getBanners();
	}, [banner]);

	const getBanners = () => {
		api.get('banners').then(response => {
			setBanners(response.data);
		});
	};

	const handleDelBanners = () => {
		api.delete(`banners/${id}`).then(response => {
			const resp = response.data;
			if (resp === 'Successes') {
				handleClose2();
				getBanners();
			}
		});
	};

	const handleChangeToPause = () => {
		setIsAtivo('false');
	};

	const handleChangeToActive = () => {
		setIsAtivo('true');
	};

	const handleSaveChanges = () => {
		const nome_promocao = title;
		const description = desc;
		const ativo = isAtivo;
		api
			.put(`banners/${id}`, {
				nome_promocao,
				subtitle,
				description,
				link,
				ativo,
			})
			.then(response => {
				const resp = response.data;
				if (resp === 'Successes') {
					handleClose();
					getBanners();
				}
			});
	};

	return (
		<div className={classes.root}>
			<BannersToolbar />
			<br />
			<Header>
				<TitleHeader>Banners</TitleHeader>
			</Header>
			<br />
			{banners.map(banner => (
				<>
					<Container>
						<DivRow>
							<img
								heigth="100%"
								src={`http://app1.cabonnet.com.br:3333/promos/${banner.uri_img}`}
								width="100%"
							/>

							<DivRow2>
								<Box2>
									<Title>{banner.nome_promocao}</Title>
								</Box2>
								{banner.ativo === 'true' ? (
									<Box>
										<IsPrincialAtivo>
											<AtivoOn>Ativo</AtivoOn>
										</IsPrincialAtivo>
									</Box>
								) : (
									<Box>
										<IsPrincialPausado>
											<PausadoOn>Pausado</PausadoOn>
										</IsPrincialPausado>
									</Box>
								)}
								<Box>
									{' '}
									<IconButton
										onClick={() => handleEditBanner(banner)}
										aria-label="edit"
									>
										<CreateIcon fontSize="small" style={{ color: '#4287f5' }} />
									</IconButton>
									<IconButton
										onClick={() => handleDeleteBanner(banner)}
										aria-label="delete"
									>
										<DeleteIcon fontSize="small" style={{ color: 'red' }} />
									</IconButton>
								</Box>
								<Box2>
									<URL>Link do banner:&nbsp;</URL>

									<Link>Clique aqui</Link>
								</Box2>
								<Box />
								<Box />
							</DivRow2>
						</DivRow>
					</Container>
					<br />
				</>
			))}

			<Dialog
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
				onClose={handleClose}
				open={open}
			>
				{alert && (
					<Alert severity="error">
						Todos os campos precisam estar preenchidos!
					</Alert>
				)}

				<DialogTitle id="form-dialog-title">Editar Banner</DialogTitle>
				<DialogContent>
					<Grid
						container
						// m={3}
						spacing={4}
					>
						<Grid item lg={12} md={6} xl={6} xs={6}>
							{isAtivo === 'true' ? (
								<Box>
									<IsAtivoOn disabled={true}>
										<AtivoOn>Ativo</AtivoOn>
									</IsAtivoOn>
									&nbsp;&nbsp;&nbsp;
									<IsPausadoOff onClick={handleChangeToPause}>
										<PausadoOff>Pausar</PausadoOff>
									</IsPausadoOff>
								</Box>
							) : (
								<Box>
									<IsAtivoOff onClick={handleChangeToActive}>
										<AtivoOff>Ativar</AtivoOff>
									</IsAtivoOff>
									&nbsp;&nbsp;&nbsp;
									<IsPausadoOn disabled={true}>
										<PausadoOn>Pausado</PausadoOn>
									</IsPausadoOn>
								</Box>
							)}

							<TextField
								autoFocus
								fullWidth
								id="Title"
								label="Titulo*"
								margin="dense"
								onChange={event => settitle(event.target.value)}
								type="text"
								value={title}
							/>
							<TextField
								fullWidth
								id="SubTitle"
								label="Sub Titulo"
								margin="dense"
								onChange={event => setsubtitle(event.target.value)}
								type="text"
								value={subtitle}
							/>
							<TextField
								fullWidth
								id="Desc"
								label="Descrição"
								margin="dense"
								onChange={event => setdesc(event.target.value)}
								type="text"
								value={desc}
							/>
							<TextField
								fullWidth
								id="link"
								label="Link da promo"
								margin="dense"
								onChange={event => setlink(event.target.value)}
								type="text"
								value={link}
							/>
						</Grid>
						<Grid item lg={12} md={6} xl={6} xs={6}>
							<DialogContentText>Prévia</DialogContentText>
							<Paper className={classes.paper}>
								<img
									heigth="100%"
									src={`http://app1.cabonnet.com.br:3333/promos/${files}`}
									width="100%"
								/>
							</Paper>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<ButtonAct color="primary" onClick={handleClose}>
						Cancelar
					</ButtonAct>
					<ButtonAct color="primary" onClick={handleSaveChanges}>
						Salvar
					</ButtonAct>
				</DialogActions>
			</Dialog>

			<Dialog
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
				onClose={handleClose2}
				open={open2}
			>
				<DialogTitle id="form-dialog-title">Deletar Banner</DialogTitle>
				<DialogContent>
					<Paper className={classes.paper}>
						<img
							heigth="100%"
							src={`http://app1.cabonnet.com.br:3333/promos/${files}`}
							width="100%"
						/>
					</Paper>
				</DialogContent>
				<DialogActions>
					<ButtonAct color="primary" onClick={handleClose2}>
						Cancelar
					</ButtonAct>
					<ButtonAct color="primary" onClick={handleDelBanners}>
						Deletar
					</ButtonAct>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Banners;
