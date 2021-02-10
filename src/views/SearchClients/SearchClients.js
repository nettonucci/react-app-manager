import React from 'react';
import { SearchToolbar, SearchTable, SearchModal } from './components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(2),
	},
}));

const SearchClients = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<SearchToolbar />
			<SearchTable />
			<SearchModal />
		</div>
	);
};

export default SearchClients;
