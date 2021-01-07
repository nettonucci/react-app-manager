/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import api from '../../server/api';
import Paper from '@material-ui/core/Paper';

import { BannersToolbar, ProductCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const Banners = () => {
  const classes = useStyles();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    api.get('banners').then(response => {
      setBanners(response.data);
    });
  };

  return (
    <div className={classes.root}>
      <BannersToolbar />
      <br />
      {banners.map(banner => (
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <Paper className={classes.paper}>
              <img
                heigth="100%"
                src={`http://app1.cabonnet.com.br:3333/promos/${banner.uri_img}`}
                width="100%"
              />
            </Paper>
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <Paper className={classes.paper}>OLa</Paper>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default Banners;
