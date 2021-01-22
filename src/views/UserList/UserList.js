/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(2),
	},
}));

const UserList = ({ users }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<UsersToolbar />
			<div className={classes.content}>
				<UsersTable users={users} />
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	users: state.users,
});

export default connect(mapStateToProps)(UserList);
