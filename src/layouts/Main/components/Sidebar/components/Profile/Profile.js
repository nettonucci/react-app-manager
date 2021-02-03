import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProfileAction from '../../../../../../store/actions/perfil';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'fit-content',
	},
	avatar: {
		width: 70,
		height: 70,
	},
	name: {
		marginTop: theme.spacing(1),
	},
}));

const Profile = props => {
	const { className, perfilRequest, perfil, ...rest } = props;

	const classes = useStyles();

	console.log('Perfil', perfil);

	useEffect(() => {
		const email = localStorage.getItem('email_usuario_logado');
		perfilRequest(email);
	}, []);

	const user = {
		name: perfil[0].name,
		avatar: perfil[0].photo,
		bio: perfil[0].title,
	};

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Avatar
				alt={user.name}
				className={classes.avatar}
				component={RouterLink}
				src={`http://app1.cabonnet.com.br:3333/promos/${user.avatar}`}
				to="/settings"
			/>
			<Typography className={classes.name} variant="h4">
				{user.name}
			</Typography>
			<Typography variant="body2">{user.bio}</Typography>
		</div>
	);
};

Profile.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = state => ({
	perfil: state.perfil,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(ProfileAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
