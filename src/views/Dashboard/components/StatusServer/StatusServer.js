/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import palette from 'theme/palette';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  IconButton
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import api from '../../../../server/api';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.success.main
  },
  root2: {
    height: '100%',
    backgroundColor: theme.palette.error.main
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700,
    color: '#fff'
  },
  status: {
    color: '#fff'
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.white,
    height: 56,
    width: 56
  },
  avatar2: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white,
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
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  load: {
    marginLeft: '40%',
    marginTop: 10
  }
}));

const StatusServer = props => {
  const { className, ...rest } = props;
  const [status, setStatus] = useState('Off-Line');
  const [load, setload] = useState(false);

  useEffect(() => {
    statusServer();
  }, []);

  const statusServer = () => {
    setload(true);
    api.get('statusservidor').then(response => {
      if (response.status === 200) {
        setStatus('On-Line');
      }
    });
    setload(false);
    // setTimeout(() => {
    //   setload(false);
    // }, 300);
  };

  const classes = useStyles();

  return (
    <>
      {status == 'Off-Line' ? (
        <Card
          {...rest}
          className={clsx(classes.root2, className)}
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
                    STATUS DO SERVIDOR
                  </Typography>
                  <Typography
                    className={classes.status}
                    variant="h3"
                  >
                    {status}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar2}>
                    <ThumbDownIcon className={classes.icon} />
                  </Avatar>
                </Grid>
              </Grid>
              <div className={classes.difference}>
                <IconButton
                  onClick={statusServer}
                  size="small"
                >
                  <RefreshIcon style={{ color: '#fff' }} />
                </IconButton>
              </div>
            </CardContent>
          )}
        </Card>
      ) : (
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
                    STATUS DO SERVIDOR
                  </Typography>
                  <Typography
                    className={classes.status}
                    variant="h3"
                  >
                    {status}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <ThumbUpIcon className={classes.icon} />
                  </Avatar>
                </Grid>
              </Grid>
              <div className={classes.difference}>
                <IconButton
                  onClick={statusServer}
                  size="small"
                >
                  <RefreshIcon style={{ color: '#fff' }} />
                </IconButton>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};

StatusServer.propTypes = {
  className: PropTypes.string
};

export default StatusServer;
