import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProfileAction from '../../../../store/actions/perfil';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Grid,
	Divider,
	FormControlLabel,
	Checkbox,
	Typography,
	TextField,
	Button,
} from '@material-ui/core';
import './styles.css';

const useStyles = makeStyles(() => ({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column',
	},
}));

const Notifications = props => {
	const { className, perfil, ...rest } = props;
	const [thumbnail, setThumbnail] = useState(null);

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	console.log('Edit Perfil', perfil[0].name);

	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form>
				<CardHeader subheader="Edite seu perfil" title="Perfil" />
				<Divider />
				<CardContent>
					<Grid container spacing={6} wrap="wrap">
						<Grid className={classes.item} item md={8} sm={6} xs={12}>
							<Typography gutterBottom variant="h6">
								Informações
							</Typography>
							<TextField
								fullWidth
								disabled
								label="Nome"
								margin="dense"
								name="name"
								type="text"
								variant="outlined"
								value={perfil[0].name}
							/>

							<TextField
								fullWidth
								disabled
								label="Email"
								margin="dense"
								name="email"
								type="email"
								variant="outlined"
								style={{ marginTop: '1rem' }}
								value={perfil[0].email}
							/>
							<TextField
								fullWidth
								disabled
								label="Função"
								margin="dense"
								name="title"
								type="text"
								variant="outlined"
								style={{ marginTop: '1rem' }}
								value={perfil[0].title}
							/>
							<TextField
								fullWidth
								disabled
								label="Base"
								margin="dense"
								name="id_base"
								type="texte"
								variant="outlined"
								style={{ marginTop: '1rem' }}
								value={perfil[0].base}
							/>
						</Grid>
						<Grid className={classes.item} item md={4} sm={6} xs={12}>
							<Typography gutterBottom variant="h6">
								Foto
							</Typography>
							<label
								id="thumbnail"
								style={
									!thumbnail
										? {
												backgroundImage: `url(http://app1.cabonnet.com.br:3333/web/${perfil[0].photo})`,
										  }
										: { backgroundImage: `url(${preview})` }
								}
								className={perfil[0].photo || thumbnail ? 'has-thumbnail' : ''}
							>
								<input
									type="file"
									onChange={event => setThumbnail(event.target.files[0])}
								/>
								<img src="/images/camera.svg" alt="Select img" />
							</label>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions>
					<Button color="primary" variant="outlined">
						Salvar
					</Button>
				</CardActions>
			</form>
		</Card>
	);
};

Notifications.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = state => ({
	perfil: state.perfil,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(ProfileAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
