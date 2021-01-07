/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ReactPlayer from 'react-player';
import api from '../../server/api';
import { VideosToolbar } from './components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  iframe: {
    width: '100%',
    minHeight: 640,
    border: 0
  },
  boxTitle: {},
  title: {
    marginTop: 10
  }
}));

const Videos = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);

  const video = useSelector(state => state.video);
  console.log(video);

  useEffect(() => {
    getVideo();
    // getPlataform()
  }, [video]);

  // const plataform = useSelector(state => state.plataform);
  // console.log('Get ->', plataform);

  const getVideo = () => {
    api.get('videos').then(response => {
      setVideos(response.data);
    });
  };

  return (
    <div className={classes.root}>
      <VideosToolbar />
      <br />
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <Paper className={classes.paper}>
            <div className={classes.boxTitle}>
              <h1 className={classes.title}>&nbsp;Videos</h1>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {videos.map(video => (
        <>
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
                <ReactPlayer
                  heigth={200}
                  url={`https://www.youtube.com/watch?v=${video.url_video}`}
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

          <br />
        </>
      ))}
    </div>
  );
};

export default Videos;
