import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  IconButton
} from '@material-ui/core';
import StarRateIcon from '@material-ui/icons/StarRate';
import RefreshIcon from '@material-ui/icons/Refresh';
import api from '../../../../server/api';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import palette from 'theme/palette';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.white,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  load: {
    marginLeft: '40%',
    marginTop: 10
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  }
}));

const TotalProfit = props => {
  const { className, ...rest } = props;
  const [user, setUsers] = useState(0);
  const [load, setload] = useState(false);

  useEffect(() => {
    countAval();
  }, []);

  const countAval = () => {
    setload(true);
    api.get('contadorclientesaval').then(response => {
      setUsers(response.data);
    });
    setTimeout(() => {
      setload(false);
    }, 1000);
  };

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      {load ? (
        <div className={classes.load}>
          <Spinner
            animating
            color={palette.secondary.main}
            size={40}
            speed={1}
          />
        </div>
      ) : (
        <CardContent>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography
                className={classes.title}
                color="inherit"
                gutterBottom
                variant="body2"
              >
                AVALIAÇÕES
              </Typography>
              <Typography
                color="inherit"
                variant="h3"
              >
                {user}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <StarRateIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <div className={classes.difference}>
            <IconButton
              onClick={countAval}
              size="small"
            >
              <RefreshIcon />
            </IconButton>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
