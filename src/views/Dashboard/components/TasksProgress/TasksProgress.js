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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  },
  load: {
    marginLeft: '40%',
    marginTop: 10
  }
}));

const TasksProgress = props => {
  const { className, ...rest } = props;
  const [user, setUsers] = useState(0);
  const [load, setload] = useState(false);

  useEffect(() => {
    countInativo();
  }, []);

  const countInativo = () => {
    setload(true);
    api.get('contadorclientesinativos').then(response => {
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
                USUÁRIOS INATIVOS
              </Typography>
              <Typography variant="h3">{user}</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <ArrowDownwardIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <div className={classes.difference}>
            <IconButton
              onClick={countInativo}
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

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
