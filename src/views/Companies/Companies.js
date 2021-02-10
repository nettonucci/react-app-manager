import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CompaniesAction from '../../store/actions/companies';
import {
	Avatar,
	Card,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import { IsAtivo, Ativo, IsPausado, Pausado } from './styles';

// import { UserToolbar, ModalToolbar } from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3),
	},
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

const Companies = ({ className, getCompanies, companies, ...rest }) => {
	const classes = useStyles();

	useEffect(() => {
		getCompanies();
	}, []);

	return (
		<div className={classes.root}>
			<Card {...rest} className={clsx(className)}>
				{/* <CardActions className={classes.actions}>
    <IconButton
        aria-label="Back"
        onClick={handlePageChangeToBack}
        disabled={page === 1 ? true : totalPage === 1 ? true : false}
    >
        <ArrowBackIosIcon fontSize="small" />
    </IconButton>
    <InputPage
        id="outlined-number"
        value={totalPage === 1 ? 1 : page}
        type="number"
        variant="outlined"
        onChange={handleChange}
        disabled={totalPage === 1 ? true : false}
    />
    &nbsp;- {totalPage}
    <IconButton
        aria-label="Next"
        onClick={handlePageChangeToNext}
        disabled={page === totalPage ? true : totalPage === 1 ? true : false}
    >
        <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
</CardActions> */}
				<CardContent className={classes.content}>
					<PerfectScrollbar>
						<div className={classes.inner}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>CNPJ</TableCell>
										<TableCell>Razão social</TableCell>
										<TableCell>Nome fantasia</TableCell>
										<TableCell>Situação</TableCell>
										<TableCell>Editar</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{companies.map(company => (
										<TableRow
											className={classes.tableRow}
											hover
											key={company.id}
										>
											<TableCell>{company.cnpj}</TableCell>

											<TableCell>{company.razao_social}</TableCell>
											<TableCell>{company.nome_fantasia}</TableCell>
											<TableCell>
												{company.ativo === true ? (
													<IsAtivo>
														<Ativo>Aceita</Ativo>
													</IsAtivo>
												) : (
													<IsPausado>
														<Pausado>Pendente</Pausado>
													</IsPausado>
												)}
											</TableCell>
											<TableCell>
												<IconButton aria-label="edit">
													<CreateIcon
														fontSize="small"
														style={{ color: '#4287f5' }}
													/>
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</PerfectScrollbar>
				</CardContent>
				{/* <CardActions className={classes.actions}>
    <IconButton
        aria-label="Back"
        onClick={handlePageChangeToBack}
        disabled={page === 1 ? true : totalPage === 1 ? true : false}
    >
        <ArrowBackIosIcon fontSize="small" />
    </IconButton>
    <InputPage
        id="outlined-number"
        value={totalPage === 1 ? 1 : page}
        type="number"
        variant="outlined"
        onChange={handleChange}
        disabled={totalPage === 1 ? true : false}
    />
    &nbsp;- {totalPage}
    <IconButton
        aria-label="Next"
        onClick={handlePageChangeToNext}
        disabled={page === totalPage ? true : totalPage === 1 ? true : false}
    >
        <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
</CardActions> */}
			</Card>
		</div>
	);
};

Companies.propTypes = {
	className: PropTypes.string,
	users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	companies: state.companies,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(CompaniesAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
