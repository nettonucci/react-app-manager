/* eslint-disable no-console */
/* eslint-disable block-scoped-var */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchAction from '../../../../store/actions/searchClients';
import * as ClientsAction from '../../../../store/actions/clients';

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
	formControl: {
		margin: theme.spacing(1),
		minWidth: 140,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: '25ch',
	},
}));

const SearchToolbar = props => {
	const { className, getSearchClients, getClients, clients, ...rest } = props;
	const [por, setPor] = React.useState('');
	const [visible, setVisible] = React.useState(false);
	const [pesquisa, setPesquisa] = React.useState('');

	const handleChange = event => {
		setPesquisa(event.target.value);
	};

	const handleClickSearch = event => {};

	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<FormControl
				className={clsx(classes.margin, classes.textField)}
				variant="outlined"
			>
				<InputLabel htmlFor="outlined-adornment-password">CPF/CNPJ</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type="text"
					value={pesquisa}
					onChange={handleChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickSearch}
								edge="end"
							>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					}
					labelWidth={70}
				/>
			</FormControl>
		</div>
	);
};

SearchToolbar.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = state => ({
	clients: state.clients,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ ...SearchAction, ...ClientsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchToolbar);
