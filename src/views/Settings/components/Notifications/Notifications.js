import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
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
	const { className, ...rest } = props;
	const [thumbnail, setThumbnail] = useState(null);

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form>
				<CardHeader subheader="Edite seu perfil" title="Perfil" />
				<Divider />
				<CardContent>
					<Grid container spacing={6} wrap="wrap">
						<Grid className={classes.item} item md={6} sm={6} xs={12}>
							<Typography gutterBottom variant="h6">
								Informações
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										defaultChecked //
									/>
								}
								label="Email"
							/>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										defaultChecked //
									/>
								}
								label="Push Notifications"
							/>
							<FormControlLabel
								control={<Checkbox color="primary" />}
								label="Text Messages"
							/>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										defaultChecked //
									/>
								}
								label="Phone calls"
							/>
						</Grid>
						<Grid className={classes.item} item md={4} sm={6} xs={12}>
							<Typography gutterBottom variant="h6">
								Foto
							</Typography>
							<label
								id="thumbnail"
								style={{ backgroundImage: `url(${preview})` }}
								className={thumbnail ? 'has-thumbnail' : ''}
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

export default Notifications;
