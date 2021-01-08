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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

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
  },
  videoOpt: {
    backgroundColor: '#f1f',
    height: '100%'
  },
  title: {
    fontWeight: 'bold'
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

  const delVideo = video => {
    console.log(video);
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
      <br />
      {videos.map(video => (
        <>
          <Grid
            container
            direction="row"
            spacing={0}
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
                  heigth={150}
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
              <div className={classes.videoOpt}>
                <a className={classes.title}>{video.nome_video}</a>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={()=>delVideo(video)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </Grid>
          </Grid>

          <br />
        </>
      ))}
    </div>
  );
};

export default Videos;
