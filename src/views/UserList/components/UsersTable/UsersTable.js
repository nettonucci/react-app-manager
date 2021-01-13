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
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import { useDispatch } from 'react-redux';
import { getClients } from '../../../../store/clientsReducer';
import {
	Card,
	CardActions,
	CardContent,
	Avatar,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TablePagination,
} from '@material-ui/core';
import api from '../../../../server/api';

import { getInitials } from 'helpers';
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

const UsersTable = props => {
	const { className, users, ...rest } = props;

	const classes = useStyles();
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [por, setPor] = React.useState('');
	const [visible, setVisible] = React.useState(false);
	const [pesquisa, setPesquisa] = React.useState('');
	const dispatch = useDispatch();

	const clients = useSelector(state => state.clientsSearch);
	const clients2 = useSelector(state => state.eraseFilter);

	useEffect(() => {
		// console.log('Aqui',clients);
		setTotalPage(1);
		setPage(1);
	}, [clients]);

	useEffect(() => {
		GetUsers();
	}, [clients2]);

	useEffect(() => {
		GetUsers();
	}, []);

	const GetUsers = () => {
		api.get(`clientsweb?page=${page}`).then(response => {
			const { count } = response.data[1][0];
			const totalPages = Math.ceil(count / 20);
			setTotalPage(totalPages);
			const list = response.data[0];
			dispatch(getClients(list));
		});
	};

	const handlePageChangeToNext = () => {
		api.get(`clientsweb?page=${page + 1}`).then(response => {
			const list = response.data[0];
			dispatch(getClients(list));
		});
		setPage(page + 1);
	};

	const handlePageChangeToBack = () => {
		api.get(`clientsweb?page=${page - 1}`).then(response => {
			const list = response.data[0];
			dispatch(getClients(list));
		});
		setPage(page - 1);
	};

	const handleChange = event => {
		const pageInsert = parseInt(event.target.value);
		console.log(pageInsert);
		if (pageInsert < 1 || pageInsert > totalPage) {
			window.alert(
				`A pagina não pode ser menor que 1 e maior que ${totalPage}`
			);
			return;
		}
		api.get(`clientsweb?page=${pageInsert}`).then(response => {
			const { count } = response.data[1][0];
			const totalPages = Math.ceil(count / 20);
			setTotalPage(totalPages);
			const list = response.data[0];
			dispatch(getClients(list));
		});
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
								{users.map(user => (
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

UsersTable.propTypes = {
	className: PropTypes.string,
	users: PropTypes.array.isRequired,
};

export default UsersTable;
