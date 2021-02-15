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
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									Base
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.nomebase}
								</p>
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									Nome
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.nomeassinante}
								</p>
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									CPF/CNPJ
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.cpfcnpj}
								</p>
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									RG
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.inscrest_rg}
								</p>
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									Nascimento
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.datanascimento}
								</p>
							</BoxPaper>
							<BoxPaper>
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									Forma de pagamento
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.formapagamento}
								</p>
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									Dia de vencimento
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.diavencimento}
								</p>
								<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
									Classificaçao
								</p>
								<p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 5 }}>
									{user.descricaoclassificacao}
								</p>
							</BoxPaper>
							<p style={{ color: '#618CF3', fontSize: 16, marginBottom: 5 }}>
								Contratos
							</p>
							{user.contratos.map(contrato => (
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography className={classes.heading}>
											{contrato.logradouro}
										</Typography>
									</AccordionSummary>

									<BoxPaper>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Id do contrato
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.idcontrato}
										</p>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Situação do contrato
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.descricaosituacao}
										</p>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Forma de pagamento
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.formapagamento}
										</p>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Dia de vencimento
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.diavencimento}
										</p>
									</BoxPaper>
									<BoxPaper>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Logradouro
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.logradouro}
										</p>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Numero
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.numero}
										</p>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Bairro
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.bairro}
										</p>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											CEP
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
											{contrato.cep}
										</p>
										<p
											style={{
												color: '#618CF3',
												fontSize: 16,
												marginBottom: 5,
											}}
										>
											Complemento
										</p>
										<p
											style={{
												color: '#7E7E7E',
												fontSize: 14,
												marginBottom: 5,
											}}
										>
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
												<p
													style={{
														color: '#618CF3',
														fontSize: 16,
														marginBottom: 5,
													}}
												>
													Nome do pacote
												</p>
												<p
													style={{
														color: '#7E7E7E',
														fontSize: 14,
														marginBottom: 5,
													}}
												>
													{pacote.nomepacote}
												</p>
												<p
													style={{
														color: '#618CF3',
														fontSize: 16,
														marginBottom: 5,
													}}
												>
													Tipo do pacote
												</p>
												<p
													style={{
														color: '#7E7E7E',
														fontSize: 14,
														marginBottom: 5,
													}}
												>
													{pacote.tipopacote}
												</p>
												<p
													style={{
														color: '#618CF3',
														fontSize: 16,
														marginBottom: 5,
													}}
												>
													Valor do pacote
												</p>
												<p
													style={{
														color: '#7E7E7E',
														fontSize: 14,
														marginBottom: 5,
													}}
												>
													{pacote.valorpacote}
												</p>
												<p
													style={{
														color: '#618CF3',
														fontSize: 16,
														marginBottom: 5,
													}}
												>
													Situação do pacote
												</p>
												<p
													style={{
														color: '#7E7E7E',
														fontSize: 14,
														marginBottom: 5,
													}}
												>
													{pacote.situacaopacote}
												</p>
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
