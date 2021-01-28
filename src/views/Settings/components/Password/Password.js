import React, { useState } from 'react';
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

const useStyles = makeStyles(() => ({
	root: {},
}));

const Password = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	const [values, setValues] = useState({
		oldpassword: '',
		newpassword: '',
		confirm: '',
	});

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSave = event => {
		event.preventDefault();

		if (values.newpassword !== values.confirm) {
			console.log('entrou');
			window.alert('Suas senhas novas não batem');
			return;
		}
		console.log(values);
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
						name="oldpassword"
						onChange={handleChange}
						type="password"
						value={values.password}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Senha nova"
						name="newpassword"
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

export default Password;
