/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useState, useMemo } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AlertAction from '../../../../store/actions/alert';
import './styles.css';

import { ButtonColor } from './styles';

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

const Typography = ({ createAlerts }) => {
	const [title, setTitle] = useState('Titulo');
	const [title_color, setTitle_color] = useState('#000');
	const [subtitle, setSubtitle] = useState('Subtitulo');
	const [subtitle_color, setSubtitle_color] = useState('#000');
	const [description, setDescription] = useState('Descrição');
	const [description_color, setDescription_color] = useState('#000');
	const [thumbnail, setThumbnail] = useState(null);
	const [text_button, setText_button] = useState('OK');
	const [button_color, setButton_color] = useState('#000');
	const [id_base, setId_base] = useState(6);
	const [bkg_color, setBkg_color] = useState('#fff');
	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);
	const [open4, setOpen4] = React.useState(false);
	const [open5, setOpen5] = React.useState(false);
	const [open6, setOpen6] = React.useState(false);
	const [alert, setalert] = React.useState(false);
	const dispatch = useDispatch();

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	const handleClickOpen = () => {
		setOpen(true);
		setId_base(6);
		setThumbnail(null);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickChangeTitleColor = () => {
		setOpen2(true);
	};

	const handleCloseChangeTitleColor = () => {
		setOpen2(false);
	};

	const handleClickChangeSubtitleColor = () => {
		setOpen3(true);
	};

	const handleCloseChangeSubtitleColor = () => {
		setOpen3(false);
	};

	const handleClickChangeDescriptionColor = () => {
		setOpen4(true);
	};

	const handleCloseChangeDescriptionColor = () => {
		setOpen4(false);
	};

	const handleClickChangeButtonColor = () => {
		setOpen5(true);
	};

	const handleCloseChangeButtonColor = () => {
		setOpen5(false);
	};

	const handleClickChangeBgColor = () => {
		setOpen6(true);
	};

	const handleCloseChangeBgColor = () => {
		setOpen6(false);
	};

	const handleAddAlert = () => {
		console.log(typeof id_base);
		if (
			title !== '' &&
			title_color !== '' &&
			subtitle !== '' &&
			subtitle_color !== '' &&
			description !== '' &&
			description_color !== '' &&
			thumbnail !== null &&
			text_button !== '' &&
			button_color !== '' &&
			id_base !== ''
		) {
			const data = new FormData();
			data.append('thumbnail', thumbnail);
			data.append('title', title);
			data.append('title_color', title_color);
			data.append('subtitle', subtitle);
			data.append('subtitle_color', subtitle_color);
			data.append('description', description);
			data.append('description_color', description_color);
			data.append('text_button', text_button);
			data.append('button_color', button_color);
			data.append('id_base', id_base);
			createAlerts(data);

			setOpen(false);
			setTitle('Titulo');
			setTitle_color('#000');
			setSubtitle('Subtitulo');
			setSubtitle_color('#000');
			setDescription('Descrição');
			setDescription_color('#000');
			setThumbnail(null);
			setText_button('OK');
			setButton_color('#fff');
			setalert(false);
		} else {
			setalert(true);
			return;
		}
	};

	const handleChange = event => {
		setId_base(event.target.value);
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.row}>
				<span className={classes.spacer} />

				<Button color="secondary" onClick={handleClickOpen} variant="contained">
					ADD ALERTA
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
				<DialogTitle id="form-dialog-title">Adicionar Alerta</DialogTitle>
				<DialogContent>
					<Grid
						container
						// m={3}
						spacing={4}
					>
						<Grid item xs={7}>
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
								<Grid item xs={2}>
									<ButtonColor onClick={handleClickChangeTitleColor}>
										Cor
									</ButtonColor>
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
								<Grid item xs={2}>
									<ButtonColor onClick={handleClickChangeSubtitleColor}>
										Cor
									</ButtonColor>
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
								<Grid item xs={2}>
									<ButtonColor onClick={handleClickChangeDescriptionColor}>
										Cor
									</ButtonColor>
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
								<Grid item xs={2}>
									<ButtonColor onClick={handleClickChangeButtonColor}>
										Cor
									</ButtonColor>
								</Grid>
							</Grid>
							<Grid
								container
								// m={3}
								spacing={4}
							>
								<Grid item xs={10}>
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
										<InputLabel id="demo-simple-select-outlined-label">
											Base*
										</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={id_base}
											onChange={handleChange}
											label="Base"
										>
											<MenuItem value={6}>Todas</MenuItem>
											<MenuItem value={1}>TVC Assis</MenuItem>
											<MenuItem value={2}>R&R</MenuItem>
											<MenuItem value={4}>TVC Tupã</MenuItem>
											<MenuItem value={5}>Giga TV</MenuItem>
										</Select>
									</FormControl>
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
								<label
									id="thumbnail"
									style={{
										backgroundImage: `url(${preview})`,
									}}
									className={thumbnail ? 'has-thumbnail' : ''}
								>
									<input
										type="file"
										onChange={event => setThumbnail(event.target.files[0])}
									/>
									<img src="/images/camera.svg" alt="Select img" />
									<p>*</p>
								</label>
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
					<Button color="primary" onClick={handleAddAlert}>
						Adicionar
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				aria-labelledby="form-dialog-title"
				maxWidth="md"
				onClose={handleCloseChangeTitleColor}
				open={open2}
			>
				<DialogTitle id="form-dialog-title">Cor do titulo</DialogTitle>
				<DialogContent>
					<ChromePicker
						color={title_color}
						onChangeComplete={color => setTitle_color(color.hex)}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleCloseChangeTitleColor}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				aria-labelledby="form-dialog-title"
				maxWidth="md"
				onClose={handleCloseChangeSubtitleColor}
				open={open3}
			>
				<DialogTitle id="form-dialog-title">Cor do subtitulo</DialogTitle>
				<DialogContent>
					<ChromePicker
						color={subtitle_color}
						onChangeComplete={color => setSubtitle_color(color.hex)}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleCloseChangeSubtitleColor}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				aria-labelledby="form-dialog-title"
				maxWidth="md"
				onClose={handleCloseChangeDescriptionColor}
				open={open4}
			>
				<DialogTitle id="form-dialog-title">Cor da descrição</DialogTitle>
				<DialogContent>
					<ChromePicker
						color={description_color}
						onChangeComplete={color => setDescription_color(color.hex)}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleCloseChangeDescriptionColor}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				aria-labelledby="form-dialog-title"
				maxWidth="md"
				onClose={handleCloseChangeButtonColor}
				open={open5}
			>
				<DialogTitle id="form-dialog-title">Cor do botão</DialogTitle>
				<DialogContent>
					<ChromePicker
						color={button_color}
						onChangeComplete={color => setButton_color(color.hex)}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleCloseChangeButtonColor}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				aria-labelledby="form-dialog-title"
				maxWidth="md"
				onClose={handleCloseChangeBgColor}
				open={open6}
			>
				<DialogTitle id="form-dialog-title">Cor do funudo</DialogTitle>
				<DialogContent>
					<ChromePicker
						color={bkg_color}
						onChangeComplete={color => setBkg_color(color.hex)}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleCloseChangeBgColor}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

Typography.propTypes = {
	className: PropTypes.string,
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(AlertAction, dispatch);

export default connect(null, mapDispatchToProps)(Typography);
