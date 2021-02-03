import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Button,
	TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProfileAction from '../../../../store/actions/perfil';

const useStyles = makeStyles(() => ({
	root: {},
}));

const Password = props => {
	const { className, changePassRequest, ...rest } = props;

	const classes = useStyles();

	const [values, setValues] = useState({
		oldpass: '',
		newpass: '',
		confirm: '',
		email: '',
	});

	useEffect(() => {
		const email = localStorage.getItem('email_usuario_logado');
		setValues({
			...values,
			email: email,
		});
	}, []);

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSave = event => {
		event.preventDefault();
		if (
			values.newpass === '' ||
			values.oldpass === '' ||
			values.confirm === ''
		) {
			window.alert('Todos os campos precisam estar preenchidos!');
			return;
		}

		if (values.newpass !== values.confirm) {
			window.alert('Suas senhas novas não batem');
			return;
		}
		const data = values;
		changePassRequest(data);
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form onSubmit={handleSave}>
				<CardHeader subheader="Alterar senha" title="Senha" />
				<Divider />
				<CardContent>
					<TextField
						fullWidth
						label="Senha atual"
						name="oldpass"
						onChange={handleChange}
						type="password"
						value={values.password}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Senha nova"
						name="newpass"
						onChange={handleChange}
						style={{ marginTop: '1rem' }}
						type="password"
						value={values.password}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Confirmar senha"
						name="confirm"
						onChange={handleChange}
						style={{ marginTop: '1rem' }}
						type="password"
						value={values.confirm}
						variant="outlined"
					/>
				</CardContent>
				<Divider />
				<CardActions>
					<Button color="primary" variant="outlined" type="submit">
						Alterar
					</Button>
				</CardActions>
			</form>
		</Card>
	);
};

Password.propTypes = {
	className: PropTypes.string,
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(ProfileAction, dispatch);

export default connect(null, mapDispatchToProps)(Password);
