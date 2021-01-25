import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import {
	Card,
	CardActions,
	Avatar,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4),
	},
	nameContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

const Account = () => {
	const classes = useStyles();

	const users = [
		{
			id: 1,
			name: 'Netto Nucci',
			email: 'nettonucci@gmail.com',
			title: 'Desenvolvedor',
			base: 'Ifast',
			photo: null,
		},
	];

	return (
		<div className={classes.root}>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Nome</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Função</TableCell>
									<TableCell>Base</TableCell>
									<TableCell>Editar</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map(user => (
									<TableRow className={classes.tableRow} hover key={user.id}>
										<TableCell>{user.id}</TableCell>
										<TableCell>
											<div className={classes.nameContainer}>
												<Avatar
													alt="Person"
													className={classes.avatar}
													src={`http://app1.cabonnet.com.br:3333/promos/${user.photo}`}
													to="/settings"
												/>
												<Typography variant="body1">{user.name}</Typography>
											</div>
										</TableCell>

										<TableCell>{user.email}</TableCell>
										<TableCell>{user.title}</TableCell>
										<TableCell>
											{user.base === null ? '-' : user.base}
										</TableCell>
										<TableCell>
											<IconButton
												// onClick={() => handleEditBanner(banner)}
												aria-label="edit"
											>
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
		</div>
	);
};

export default Account;
