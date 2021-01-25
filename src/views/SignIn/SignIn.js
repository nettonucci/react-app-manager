/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import palette from 'theme/palette';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginAction from '../../store/actions/login';
import { DivLoad } from './styles';
import api from '../../server/api';
import {
	Grid,
	Button,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'é necessário' },
		email: true,
		length: {
			maximum: 64,
		},
	},
	password: {
		presence: { allowEmpty: false, message: 'é necessário' },
		length: {
			maximum: 128,
		},
	},
};

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
	},
	grid: {
		height: '100%',
	},
	quoteContainer: {
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	quote: {
		backgroundColor: theme.palette.neutral,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: 'url(/images/auth.png)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	quoteInner: {
		textAlign: 'center',
		flexBasis: '600px',
	},
	quoteText: {
		color: theme.palette.white,
		fontWeight: 300,
	},
	name: {
		marginTop: theme.spacing(3),
		color: theme.palette.white,
	},
	bio: {
		color: theme.palette.white,
	},
	contentContainer: {},
	content: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	contentHeader: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(5),
		paddingBototm: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	logoImage: {
		marginLeft: theme.spacing(4),
	},
	contentBody: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'center',
		},
	},
	form: {
		paddingLeft: 100,
		paddingRight: 100,
		paddingBottom: 125,
		flexBasis: 700,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
	},
	title: {
		marginTop: theme.spacing(3),
	},
	socialButtons: {
		marginTop: theme.spacing(3),
	},
	socialIcon: {
		marginRight: theme.spacing(1),
	},
	sugestion: {
		marginTop: theme.spacing(2),
	},
	textField: {
		marginTop: theme.spacing(2),
	},
	signInButton: {
		margin: theme.spacing(2, 0),
	},
}));

const SignIn = props => {
	const { history, loginRequest, load } = props;

	const classes = useStyles();

	const [formState, setFormState] = useState({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	useEffect(() => {
		const token = localStorage.getItem('token_usuario_logado');
		if (token) {
			api.defaults.headers.Authorization = `Bearer ${token}`;
			api.get('/token').then(response => {
				const resposta = response.data;
				if (resposta === 'Token valid') {
					history.push('/dashboard');
				} else {
					return;
				}
			});
		} else {
			return;
		}
	}, []);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {},
		}));
	}, [formState.values]);

	const handleSubmitRedux = event => {
		event.preventDefault();
		const email = formState.values.email;
		const password = formState.values.password;
		const cred = { email, password, history };
		loginRequest(cred);
	};

	const handleChange = event => {
		event.persist();

		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
			},
			touched: {
				...formState.touched,
				[event.target.name]: true,
			},
		}));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	return (
		<div className={classes.root}>
			<Grid className={classes.grid} container>
				<Grid className={classes.quoteContainer} item lg={5}>
					<div className={classes.quote}>
						<div className={classes.quoteInner}>
							<Typography className={classes.quoteText} variant="h1">
								Gerencie o App Cabonnet facilmente, utilizando recursos
								amigáveis e muito intuitivo
							</Typography>
							<div className={classes.person}>
								<Typography className={classes.name} variant="body2">
									POR
								</Typography>
								<Typography className={classes.name} variant="body1">
									Netto Nucci
								</Typography>
								<Typography className={classes.bio} variant="body2">
									Desenvolvedor
								</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid className={classes.content} item lg={7} xs={12}>
					<div className={classes.content}>
						<div className={classes.contentBody}>
							<form className={classes.form} onSubmit={handleSubmitRedux}>
								{load.loading ? (
									<div
										style={{
											alignItems: 'center',
											justifyContent: 'center',
											// backgroundColor: '#f1f',
											width: 70,
											marginLeft: '50%',
										}}
									>
										<Spinner
											animating
											color={palette.secondary.main}
											size={40}
											speed={1}
										/>
									</div>
								) : (
									<>
										<Typography className={classes.title} variant="h2">
											Entrar
										</Typography>

										<Typography
											align="center"
											className={classes.sugestion}
											color="textSecondary"
											variant="body1"
										>
											Insira seu Email e Senha
										</Typography>
										<TextField
											className={classes.textField}
											error={hasError('email')}
											fullWidth
											helperText={
												hasError('email') ? formState.errors.email[0] : null
											}
											label="Email"
											name="email"
											onChange={handleChange}
											type="text"
											value={formState.values.email || ''}
											variant="outlined"
										/>
										<TextField
											className={classes.textField}
											error={hasError('password')}
											fullWidth
											helperText={
												hasError('password')
													? formState.errors.password[0]
													: null
											}
											label="Senha"
											name="password"
											onChange={handleChange}
											type="password"
											value={formState.values.password || ''}
											variant="outlined"
										/>
										<Button
											className={classes.signInButton}
											color="primary"
											disabled={!formState.isValid}
											fullWidth
											size="large"
											type="submit"
											variant="contained"
										>
											Entrar
										</Button>
									</>
								)}
							</form>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

SignIn.propTypes = {
	history: PropTypes.object,
};

const mapStateToProps = state => ({
	load: state.login,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(LoginAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
