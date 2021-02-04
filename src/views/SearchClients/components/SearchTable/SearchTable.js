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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ClientsAction from '../../../../store/actions/clients';
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
	const { className, clients, getClients, totalPage, ...rest } = props;
	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardActions className={classes.actions}></CardActions>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
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
							{/* <TableBody>
								{clients.data.map(user => (
									<TableRow className={classes.tableRow} hover key={user.id}>
										<TableCell>{user.id}</TableCell>
										<TableCell>
											<div className={classes.nameContainer}>
												<Typography variant="body1">
													{user.nomeassinante}
												</Typography>
											</div>
										</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.cpfcnpj}</TableCell>
										<TableCell>
											{user.status_fator === 'true' ? (
												<IsAtivo>
													<Ativo>Sim</Ativo>
												</IsAtivo>
											) : (
												<IsPausado>
													<Pausado>Não</Pausado>
												</IsPausado>
											)}
										</TableCell>
										<TableCell>
											{user.base === null ? '-' : user.base}
										</TableCell>
										<TableCell>
											{user.plataforma === 'android' ? (
												<AndroidIcon />
											) : user.plataforma === 'ios' ? (
												<AppleIcon />
											) : (
												'-'
											)}
										</TableCell>
										<TableCell>
											{user.avaliou_app === true ? (
												<IsAtivo>
													<Ativo>Sim</Ativo>
												</IsAtivo>
											) : (
												<IsPausado>
													<Pausado>Não</Pausado>
												</IsPausado>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody> */}
						</Table>
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
	totalPage: state.pages,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(ClientsAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientsTable);
