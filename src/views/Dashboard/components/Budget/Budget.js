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
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
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
    backgroundColor: theme.palette.secondary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  load: {
    marginLeft: '40%',
    marginTop: 10
  }
}));

const Budget = props => {
  const { className, ...rest } = props;

  const [user, setUsers] = useState(0);
  const [load, setload] = useState(false);

  useEffect(() => {
    countAtivo();
  }, []);

  const countAtivo = () => {
    setload(true);
    api.get('contadorclientesativos').then(response => {
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
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                USUÁRIOS ATIVOS
              </Typography>
              <Typography variant="h3">{user}</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <ArrowUpwardIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <div className={classes.difference}>
            <IconButton
              onClick={countAtivo}
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

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
