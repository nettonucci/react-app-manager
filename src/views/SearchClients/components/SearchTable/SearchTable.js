/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import { makeStyles } from '@material-ui/styles';
import palette from 'theme/palette';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchAction from '../../../../store/actions/searchClients';
import {
	Card,
	CardActions,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import { IsAtivo, Ativo, IsPausado, Pausado, InputPage } from './styles';

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		padding: 0,
	},
	inner: {
		minWidth: 1050,
	},
	nameContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
	actions: {
		justifyContent: 'flex-end',
	},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	},
}));

const ClientsTable = props => {
	const { className, user, openModalSearch, ...rest } = props;
	const classes = useStyles();

	console.log(user);

	const seeMore = () => {
		console.log('see');
		openModalSearch(user.data);
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardActions className={classes.actions}></CardActions>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						{user.load ? (
							<div
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									// backgroundColor: '#f1f',
									width: 70,
									marginLeft: '50%',
									padding: 10,
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
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>Nome</TableCell>
										<TableCell>Cidade</TableCell>
										<TableCell>CPF/CNPJ</TableCell>
										<TableCell>Forma de pagamento</TableCell>
										<TableCell>Base</TableCell>
										<TableCell>Classificação</TableCell>
										<TableCell>Ação</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{user.data.map(user => (
										<TableRow
											className={classes.tableRow}
											hover
											key={user.idassinante}
										>
											<TableCell>{user.idassinante}</TableCell>
											<TableCell>
												<div className={classes.nameContainer}>
													<Typography variant="body1">
														{user.nomeassinante}
													</Typography>
												</div>
											</TableCell>
											<TableCell>{user.nomecidade}</TableCell>
											<TableCell>{user.cpfcnpj}</TableCell>
											<TableCell>{user.formapagamento}</TableCell>
											<TableCell>{user.nomebase}</TableCell>
											<TableCell>
												{user.descricaoclassificacao === null
													? 'STANDARD'
													: user.descricaoclassificacao}
											</TableCell>
											<TableCell>
												<IconButton aria-label="edit" onClick={seeMore}>
													<VisibilityIcon
														fontSize="small"
														style={{ color: '#4287f5' }}
													/>
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</div>
				</PerfectScrollbar>
			</CardContent>
			<CardActions className={classes.actions}></CardActions>
		</Card>
	);
};

ClientsTable.propTypes = {
	className: PropTypes.string,
	users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	user: state.searchClientsFatores,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(SearchAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientsTable);
