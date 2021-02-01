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
	const [page, setPage] = useState(1);

	useEffect(() => {
		getClients(page);
	}, []);

	const handlePageChangeToNext = () => {
		getClients(page + 1);
		setPage(page + 1);
	};

	const handlePageChangeToBack = () => {
		getClients(page - 1);
		setPage(page - 1);
	};

	const handleChange = event => {
		const pageInsert = parseInt(event.target.value);
		if (pageInsert < 1 || pageInsert > totalPage) {
			window.alert(
				`A pagina não pode ser menor que 1 e maior que ${totalPage}`
			);
			return;
		}
		getClients(pageInsert);
		setPage(pageInsert);
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardActions className={classes.actions}>
				<IconButton
					aria-label="Back"
					onClick={handlePageChangeToBack}
					disabled={page === 1 ? true : false}
				>
					<ArrowBackIosIcon fontSize="small" />
				</IconButton>
				<InputPage
					id="outlined-number"
					value={page}
					type="number"
					variant="outlined"
					onChange={handleChange}
					disabled={totalPage === 1 ? true : false}
				/>
				&nbsp;- {totalPage}
				<IconButton
					aria-label="Next"
					onClick={handlePageChangeToNext}
					disabled={page === totalPage ? true : false}
				>
					<ArrowForwardIosIcon fontSize="small" />
				</IconButton>
			</CardActions>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>CPF/CNPJ</TableCell>
									<TableCell>Autenticado</TableCell>
									<TableCell>Base</TableCell>
									<TableCell>Plataforma</TableCell>
									<TableCell>Avaliou App</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
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
							</TableBody>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>
			<CardActions className={classes.actions}>
				<IconButton
					aria-label="Back"
					onClick={handlePageChangeToBack}
					disabled={page === 1 ? true : false}
				>
					<ArrowBackIosIcon fontSize="small" />
				</IconButton>
				<InputPage
					id="outlined-number"
					value={page}
					type="number"
					variant="outlined"
					onChange={handleChange}
					disabled={totalPage === 1 ? true : false}
				/>
				&nbsp;- {totalPage}
				<IconButton
					aria-label="Next"
					onClick={handlePageChangeToNext}
					disabled={page === totalPage ? true : false}
				>
					<ArrowForwardIosIcon fontSize="small" />
				</IconButton>
			</CardActions>
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
