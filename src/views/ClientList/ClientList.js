/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

import { ClientsToolbar, ClientsTable } from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(2),
	},
}));

const ClientList = ({ clients }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ClientsToolbar />
			<div className={classes.content}>
				<ClientsTable clients={clients} />
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	clients: state.clients,
});

export default connect(mapStateToProps)(ClientList);
