/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useState, useMemo } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
} from '@material-ui/core';
import * as UsersAction from '../../../../store/actions/users';
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

const UserToolbar = ({ createUser }) => {
	const [open, setOpen] = React.useState(false);
	const [alert, setalert] = React.useState(false);
	const [alert2, setalert2] = React.useState(false);
	const [repass, setRepass] = useState('');
	const [values, setValues] = useState({
		name: '',
		pass: '',
		email: '',
		title: '',
		id_base: '',
	});

	const states = [
		{
			value: 'Selecione',
			label: 'Selecione',
		},
		{
			value: 'Administrador',
			label: 'Administrador',
		},
		{
			value: 'Moderador',
			label: 'Moderador',
		},
		{
			value: 'Desenvolvedor',
			label: 'Desenvolvedor',
		},
	];

	const bases = [
		{
			value: 'Selecione',
			label: 'Selecione',
		},
		{
			value: 3,
			label: 'IFASTNET',
		},
		{
			value: 1,
			label: 'TVC Assis',
		},
		{
			value: 2,
			label: 'R&R',
		},
		{
			value: 4,
			label: 'TVC Tupã',
		},
		{
			value: 5,
			label: 'Giga TV',
		},
	];

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setalert(false);
		setalert2(false);
		setValues({
			name: '',
			pass: '',
			email: '',
			title: '',
			id_base: '',
		});
	};

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleAddUser = event => {
		event.preventDefault();

		if (values.title === 'Selecione' || values.title === '') {
			setalert(true);
			return;
		}
		if (values.id_base === 'Selecione' || values.id_base === '') {
			setalert(true);
			return;
		}
		if (values.pass !== repass) {
			setalert2(true);
			return;
		}

		const data = values;
		createUser(data);
		handleClose();
		setValues({ ...values, name: '', pass: '', email: '' });
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.row}>
				<span className={classes.spacer} />

				<Button color="secondary" onClick={handleClickOpen} variant="contained">
					ADD USER
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
				{alert2 && <Alert severity="error">As senhas não batem!!</Alert>}
				<form onSubmit={handleAddUser}>
					<DialogTitle id="form-dialog-title">Adicionar Usuário</DialogTitle>
					<DialogContent>
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={12} xs={12}>
									<TextField
										fullWidth
										label="Nome"
										margin="dense"
										name="name"
										onChange={handleChange}
										required
										value={values.name}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={12} xs={12}>
									<TextField
										fullWidth
										label="Email"
										margin="dense"
										name="email"
										onChange={handleChange}
										required
										value={values.email}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Senha"
										margin="dense"
										name="pass"
										onChange={handleChange}
										type="password"
										required
										value={values.pass}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Confirmar senha"
										margin="dense"
										name="pass"
										onChange={event => setRepass(event.target.value)}
										type="password"
										required
										value={repass}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Função"
										margin="dense"
										name="title"
										onChange={handleChange}
										required
										select
										// eslint-disable-next-line react/jsx-sort-props
										SelectProps={{ native: true }}
										value={values.title}
										variant="outlined"
									>
										{states.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</TextField>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Base"
										margin="dense"
										name="id_base"
										onChange={handleChange}
										required
										select
										// eslint-disable-next-line react/jsx-sort-props
										SelectProps={{ native: true }}
										value={values.id_base}
										variant="outlined"
									>
										{bases.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</TextField>
								</Grid>
							</Grid>
						</CardContent>
						<Divider />
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={handleClose}>
							Cancelar
						</Button>
						<Button color="primary" type="submit">
							Adicionar
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

UserToolbar.propTypes = {
	className: PropTypes.string,
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(UsersAction, dispatch);

export default connect(null, mapDispatchToProps)(UserToolbar);
