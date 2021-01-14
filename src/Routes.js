/* eslint-disable no-unused-expressions */
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './auth';
import PropTypes from 'prop-types';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import { RouteWithLayout } from './components';

import {
	Dashboard as DashboardView,
	Banners as BannersView,
	UserList as UserListView,
	Typography as TypographyView,
	Videos as VideosView,
	Account as AccountView,
	Settings as SettingsView,
	SignUp as SignUpView,
	SignIn as SignInView,
	NotFound as NotFoundView,
} from './views';

const PrivateRoute = props => {
	const { layout: Layout, component: Component, ...rest } = props;
	return (
		<Route
			{...rest}
			render={matchProps =>
				isAuthenticated() ? (
					<Layout>
						<Component {...matchProps} />
					</Layout>
				) : (
					<Redirect to={{ pathname: '/', state: { from: props.location } }} />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
	path: PropTypes.string,
};

const Routes = () => (
	<Switch>
		<Redirect exact from="/" to="/sign-in" />
		<PrivateRoute
			component={DashboardView}
			exact
			layout={MainLayout}
			path="/dashboard"
		/>
		<PrivateRoute
			component={UserListView}
			exact
			layout={MainLayout}
			path="/users"
		/>
		<PrivateRoute
			component={BannersView}
			exact
			layout={MainLayout}
			path="/banners"
		/>
		<PrivateRoute
			component={TypographyView}
			exact
			layout={MainLayout}
			path="/typography"
		/>
		<PrivateRoute
			component={VideosView}
			exact
			layout={MainLayout}
			path="/videos"
		/>
		<PrivateRoute
			component={AccountView}
			exact
			layout={MainLayout}
			path="/account"
		/>
		<PrivateRoute
			component={SettingsView}
			exact
			layout={MainLayout}
			path="/settings"
		/>
		<PrivateRoute
			component={SignUpView}
			exact
			layout={MinimalLayout}
			path="/sign-up"
		/>
		<RouteWithLayout
			component={SignInView}
			exact
			layout={MinimalLayout}
			path="/sign-in"
		/>
		<RouteWithLayout
			component={NotFoundView}
			exact
			layout={MinimalLayout}
			path="/not-found"
		/>
		<Redirect to="/not-found" />
	</Switch>
);

export default Routes;
