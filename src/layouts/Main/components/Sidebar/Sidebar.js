import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import BusinessIcon from '@material-ui/icons/Business';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 64,
			height: 'calc(100% - 64px)',
		},
	},
	root: {
		backgroundColor: theme.palette.white,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		padding: theme.spacing(2),
	},
	divider: {
		margin: theme.spacing(2, 0),
	},
	nav: {
		marginBottom: theme.spacing(2),
	},
}));

const Sidebar = props => {
	const { open, variant, onClose, className, perfil, ...rest } = props;

	const classes = useStyles();

	const pages = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <DashboardIcon />,
		},
		{
			title: 'Clientes',
			href: '/clients',
			icon: <PeopleIcon />,
		},
		{
			title: 'Empresas',
			href: '/companies',
			icon: <BusinessIcon />,
		},
		{
			title: 'Banners',
			href: '/banners',
			icon: <ViewCarouselIcon />,
		},
		{
			title: 'Videos',
			href: '/videos',
			icon: <VideoLibraryIcon />,
		},
		{
			title: 'Alertas',
			href: '/alerts',
			icon: <NotificationImportantIcon />,
		},
		// {
		// 	title: 'Authentication',
		// 	href: '/sign-in',
		// 	icon: <LockOpenIcon />,
		// },
		//
		// {
		//   title: 'Account',
		//   href: '/account',
		//   icon: <AccountBoxIcon />
		// },
		// {
		//   title: 'Settings',
		//   href: '/settings',
		//   icon: <SettingsIcon />
		// }
	];

	const pagesDev = [
		{
			title: 'Usuários',
			href: '/users',
			icon: <AccountCircleIcon />,
		},
		{
			title: 'Busca de clientes',
			href: '/searchclients',
			icon: <SearchIcon />,
		},
		// {
		// 	title: 'Settings',
		// 	href: '/settings',
		// 	icon: <LockOpenIcon />,
		// },
	];

	return (
		<Drawer
			anchor="left"
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}
		>
			<div {...rest} className={clsx(classes.root, className)}>
				<Profile />
				<Divider className={classes.divider} />
				<SidebarNav className={classes.nav} pages={pages} />
				{perfil[0].title === 'Desenvolvedor' && (
					<>
						<Divider className={classes.divider} />
						Dev menu
						<SidebarNav className={classes.nav} pages={pagesDev} />
					</>
				)}
			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	perfil: state.perfil,
});

export default connect(mapStateToProps)(Sidebar);
