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
import * as UsersAction from '../../../../store/actions/users';
import {
	Avatar,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
} from '@material-ui/core';

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
	avatar: {
		width: 100,
		height: 100,
		margin: 10,
		alignSelf: 'center',
	},
}));

const ModalToolbar = ({ modal, closeEditUser }) => {
	const [alert, setalert] = React.useState(false);
	const [values, setValues] = useState({
		nome: '',
		senha: '',
		email: '',
		funcao: '',
		base: '',
	});

	// console.log('Open Modal:', modal.data.name);

	const states = [
		{
			value: 'Administrador',
			label: 'Administrador',
		},
		{
			value: 'Moderador',
			label: 'Moderador',
		},
		{
			value: 'Desnvolvedor',
			label: 'Desnvolvedor',
		},
	];

	const bases = [
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

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleAddUser = () => {
		console.log(values);
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Dialog
				aria-labelledby="form-dialog-title"
				onClose={closeEditUser}
				open={modal.open}
			>
				{alert && (
					<Alert severity="error">Campos com (*) são obrigatórios</Alert>
				)}
				<DialogTitle id="form-dialog-title">Editar Usuário</DialogTitle>
				<DialogContent>
					<form autoComplete="off" noValidate>
						<Divider />
						<CardContent>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Avatar
									alt="Person"
									className={classes.avatar}
									src={`http://app1.cabonnet.com.br:3333/promos/${modal.data.photo}`}
								/>
							</div>
							<div style={{ marginBottom: 10 }}>
								<TextField
									fullWidth
									label="Nome"
									margin="dense"
									name="nome"
									onChange={handleChange}
									required
									value={modal.data.name}
									variant="outlined"
								/>
							</div>
							{/* <div style={{ marginBottom: 10 }}> */}
							<TextField
								fullWidth
								label="Email"
								margin="dense"
								name="email"
								onChange={handleChange}
								required
								value={modal.data.email}
								variant="outlined"
								style={{ marginBottom: 10 }}
							/>
							{/* </div> */}
							{/* <div style={{ marginBottom: 10 }}> */}
							<TextField
								fullWidth
								label="Função"
								margin="dense"
								name="funcao"
								onChange={handleChange}
								required
								select
								// eslint-disable-next-line react/jsx-sort-props
								SelectProps={{ native: true }}
								value={modal.data.title}
								variant="outlined"
								style={{ marginBottom: 10 }}
							>
								{states.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
							{/* </div> */}
							{/* <div style={{ marginBottom: 10 }}> */}
							<TextField
								fullWidth
								label="Base"
								margin="dense"
								name="base"
								onChange={handleChange}
								required
								select
								// eslint-disable-next-line react/jsx-sort-props
								SelectProps={{ native: true }}
								value={values.state}
								variant="outlined"
								style={{ marginBottom: 10 }}
							>
								{bases.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
							{/* </div> */}
						</CardContent>
						<Divider />
					</form>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={closeEditUser}>
						Cancelar
					</Button>
					<Button color="primary">Adicionar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

ModalToolbar.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = state => ({
	modal: state.editUser,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(UsersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalToolbar);
