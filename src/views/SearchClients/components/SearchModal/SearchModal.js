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

import { BoxDiv } from './styles';

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

const SearchModal = ({ modal, closeEditUser, saveEditUser }) => {
	const [alert, setalert] = React.useState(false);
	const [values, setValues] = useState({
		id: '',
		name: '',
		email: '',
		title: '',
		id_base: '',
		photo: '',
	});

	useEffect(() => {
		setValues({
			id: modal.data.id,
			name: modal.data.name,
			email: modal.data.email,
			title: modal.data.title,
			id_base: modal.data.id_base,
			photo: modal.data.photo,
			ativo: modal.data.ativo,
		});
	}, [modal]);

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
			value: 'Desenvolvedor',
			label: 'Desenvolvedor',
		},
	];

	const bases = [
		{
			value: 1,
			label: 'TVC Assis',
		},
		{
			value: 3,
			label: 'IFASTNET',
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

	const handleEditUser = event => {
		event.preventDefault();
		const data = values;
		saveEditUser(data);
		closeEditUser();
		// setValues({
		// 	id: '',
		// 	name: '',
		// 	email: '',
		// 	title: '',
		// 	id_base: '',
		// 	photo: '',
		// 	ativo: '',
		// });
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Dialog
				aria-labelledby="max-width-dialog-title"
				fullWidth={true}
				maxWidth="xs"
				onClose={closeEditUser}
				open={true}
			>
				<DialogTitle id="form-dialog-title">Informações do cliente</DialogTitle>
				<DialogContent>
					<Divider />
					<CardContent>
						<BoxDiv>
							<p>Base</p>
							<p>Oi</p>
							<p>Nome</p>
							<p>Oi</p>
							<p>CPF/CNPJ</p>
							<p>Oi</p>
							<p>RG</p>
							<p>Oi</p>
							<p>Nascimento</p>
							<p>Oi</p>
						</BoxDiv>
						<BoxDiv>
							<p>Forma de pagamento</p>
							<p>Oi</p>
							<p>Dia de vencimento</p>
							<p>Oi</p>
							<p>Classificaçao</p>
							<p>Oi</p>
							<p>Nascimento</p>
							<p>Oi</p>
						</BoxDiv>
					</CardContent>
					<Divider />
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={closeEditUser}>
						Cancelar
					</Button>
					<Button color="primary" type="submit">
						Salvar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

SearchModal.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = state => ({
	modal: state.editUser,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(UsersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
