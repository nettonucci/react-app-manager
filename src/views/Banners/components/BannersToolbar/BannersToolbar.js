/* eslint-disable quotes */
import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import api from '../../../../server/api';
import { Alert } from '@material-ui/lab';
import { getBanners } from '../../../../store/BannersReducer';
import './styles.css';
import Paper from '@material-ui/core/Paper';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	marginLeft: 8,
	width: 400,
	height: 300,
	padding: 4,
	boxSizing: 'border-box',
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
};

const img = {
	display: 'block',
	width: 400,
	height: 300,
	resizeMode: 'cover',
};

const useStyles = makeStyles(theme => ({
	root: {},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	},
	spacer: {
		flexGrow: 1,
	},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
	searchInput: {
		marginRight: theme.spacing(1),
	},
	banner: {
		height: '100',
		width: '100',
		backgroundColor: '#f1f',
	},
}));

const BannersToolbar = props => {
	const { className, ...rest } = props;
	const [open, setOpen] = React.useState(false);
	const [alert, setalert] = React.useState(false);
	const [nome_promocao, setnome_promocao] = React.useState('');
	const [subtitle, setsubtitle] = React.useState('');
	const [description, setdescription] = React.useState('');
	const [link, setlink] = React.useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const dispatch = useDispatch();

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setThumbnail(null);
		setalert(false);
		setnome_promocao('');
		setsubtitle('');
		setdescription('');
		setlink('');
	};

	const handleAddBanner = () => {
		if (
			nome_promocao !== '' &&
			subtitle !== '' &&
			description !== '' &&
			thumbnail !== null
		) {
			const data = new FormData();
			data.append('thumbnail', thumbnail);
			data.append('nome_promocao', nome_promocao);
			data.append('subtitle', subtitle);
			data.append('description', description);
			data.append('link', link);

			api.post('/banners', data).then(response => {
				console.log(response.data);
				const resp = response.data;
				if (resp === 'Successes') {
					setOpen(false);
					setThumbnail(null);
					setalert(false);
					setnome_promocao('');
					setsubtitle('');
					setdescription('');
					setlink('');
					const list = 'new';
					dispatch(getBanners(list));
				}
			});
		} else {
			setalert(true);
		}
	};

	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<div className={classes.row}>
				<span className={classes.spacer} />

				<Button color="secondary" onClick={handleClickOpen} variant="contained">
					ADD BANNER
				</Button>
			</div>
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

				<DialogTitle id="form-dialog-title">Adicionar Banner</DialogTitle>
				<DialogContent>
					<Grid
						container
						// m={3}
						spacing={4}
					>
						<Grid item lg={12} md={6} xl={6} xs={6}>
							<DialogContentText>
								Adicione um novo Banner no app, ele ficara localizado na tela
								principal do App.
							</DialogContentText>
							<TextField
								autoFocus
								fullWidth
								id="Title"
								label="Titulo*"
								margin="dense"
								onChange={event => setnome_promocao(event.target.value)}
								type="text"
								value={nome_promocao}
							/>
							<TextField
								fullWidth
								id="SubTitle"
								label="Sub Titulo*"
								margin="dense"
								onChange={event => setsubtitle(event.target.value)}
								type="text"
								value={subtitle}
							/>
							<TextField
								fullWidth
								id="Desc"
								label="Descrição*"
								margin="dense"
								onChange={event => setdescription(event.target.value)}
								type="text"
								value={description}
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
							<p>Banner*</p>
							<br />
							<DialogContentText>Prévia:</DialogContentText>

							<label
								id="thumbnail"
								style={{ backgroundImage: `url(${preview})` }}
								className={thumbnail ? 'has-thumbnail' : ''}
							>
								<input
									type="file"
									onChange={event => setThumbnail(event.target.files[0])}
								/>
								<img src="/images/camera.svg" alt="Select img" />
							</label>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleClose}>
						Cancelar
					</Button>
					<Button color="primary" onClick={handleAddBanner}>
						Adicionar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

BannersToolbar.propTypes = {
	className: PropTypes.string,
};

export default BannersToolbar;
