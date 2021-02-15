/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useState, useMemo } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchAction from '../../../../store/actions/searchClients';
import {
	Avatar,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
	Paper,
} from '@material-ui/core';

import './styles.css';

import { BoxDiv, BoxPaper } from './styles';

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
	banner: {
		height: '100',
		width: '100',
		backgroundColor: '#f1f',
	},
	avatar: {
		width: 100,
		height: 100,
		margin: 10,
		alignSelf: 'center',
	},
}));

const SearchModal = ({ modal, closeModalSearch, closeEditUser }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Dialog
				aria-labelledby="max-width-dialog-title"
				fullWidth={true}
				maxWidth="xs"
				onClose={closeEditUser}
				open={modal.open}
			>
				<DialogTitle id="form-dialog-title">Informações do cliente</DialogTitle>
				<DialogContent>
					<Divider />
					{modal.data.map(user => (
						<CardContent>
							<BoxPaper>
								<p>Base</p>
								<p>{user.nomebase}</p>
								<p>Nome</p>
								<p>{user.nomeassinante}</p>
								<p>CPF/CNPJ</p>
								<p>{user.cpfcnpj}</p>
								<p>RG</p>
								<p>{user.inscrest_rg}</p>
								<p>Nascimento</p>
								<p>{user.datanascimento}</p>
							</BoxPaper>
							<BoxPaper>
								<p>Forma de pagamento</p>
								<p>{user.formapagamento}</p>
								<p>Dia de vencimento</p>
								<p>{user.diavencimento}</p>
								<p>Classificaçao</p>
								<p>{user.descricaoclassificacao}</p>
							</BoxPaper>
							{user.contratos.map(contrato => (
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography className={classes.heading}>
											Contrato {contrato.logradouro}
										</Typography>
									</AccordionSummary>

									<BoxPaper>
										<p>Id do contrato</p>
										<p>{contrato.idcontrato}</p>
										<p>Situação do contrato</p>
										<p>{contrato.descricaosituacao}</p>
										<p>Forma de pagamento</p>
										<p>{contrato.formapagamento}</p>
										<p>Dia de vencimento</p>
										<p>{contrato.diavencimento}</p>
									</BoxPaper>
									<BoxPaper>
										<p>Logradouro</p>
										<p>{contrato.logradouro}</p>
										<p>Numero</p>
										<p>{contrato.numero}</p>
										<p>Bairro</p>
										<p>{contrato.bairro}</p>
										<p>CEP</p>
										<p>{contrato.cep}</p>
										<p>Complemento</p>
										<p>
											{contrato.complemento === ''
												? 'Não informado'
												: contrato.complemento}
										</p>
									</BoxPaper>

									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1a-content"
											id="panel1a-header"
										>
											<Typography className={classes.heading}>
												Pacotes
											</Typography>
										</AccordionSummary>
										{console.log(contrato.pacotes)}
										{contrato.pacotes.map(pacote => (
											<BoxPaper>
												<p>Nome do pacote</p>
												<p>{pacote.nomepacote}</p>
												<p>Tipo do pacote</p>
												<p>{pacote.tipopacote}</p>
												<p>Valor do pacote</p>
												<p>{pacote.valorpacote}</p>
												<p>Situação do pacote</p>
												<p>{pacote.situacaopacote}</p>
											</BoxPaper>
										))}
									</Accordion>
								</Accordion>
							))}
						</CardContent>
					))}

					<Divider />
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={closeModalSearch}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

SearchModal.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = state => ({
	modal: state.seeClients,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(SearchAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
