import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { withRouter } from 'react-router-dom';
import api from '../../../../server/api';

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'none',
	},
	flexGrow: {
		flexGrow: 1,
	},
	signOutButton: {
		marginLeft: theme.spacing(1),
	},
}));

const Topbar = props => {
	const { className, onSidebarOpen, ...rest } = props;

	const classes = useStyles();

	const [notifications] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem('token_usuario_logado');
		if (token) {
			api.defaults.headers.Authorization = `Bearer ${token}`;
			api.get('/token').then(response => {
				const resposta = response.data;
				if (resposta === 'Token valid') {
					return;
				} else {
					localStorage.removeItem('email_usuario_logado');
					localStorage.removeItem('token_usuario_logado');
					props.history.push('/');
				}
			});
		} else {
			localStorage.removeItem('email_usuario_logado');
			localStorage.removeItem('token_usuario_logado');
			props.history.push('/');
		}
	});

	const logout = () => {
		localStorage.removeItem('email_usuario_logado');
		localStorage.removeItem('token_usuario_logado');
		props.history.push('/');
	};

	return (
		<AppBar
			{...rest}
			className={clsx(classes.root, className)}
			color="secondary"
		>
			<Toolbar>
				<RouterLink to="/">
					<img alt="Logo" src="/images/logos/logoSmall.png" />
				</RouterLink>
				<div className={classes.flexGrow} />
				<Hidden mdDown>
					<IconButton color="inherit">
						<Badge
							badgeContent={notifications.length}
							color="primary"
							variant="dot"
						>
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton
						className={classes.signOutButton}
						color="inherit"
						onClick={logout}
					>
						<InputIcon />
					</IconButton>
				</Hidden>
				<Hidden lgUp>
					<IconButton color="inherit" onClick={onSidebarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func,
};

export default withRouter(Topbar);
