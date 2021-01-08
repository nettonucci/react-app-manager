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
import CreateIcon from '@material-ui/icons/Create';
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
    backgroundColor: '#fff',
    height: '100%'
  },
  videoTitle: {
    fontWeight: 'bold',
    marginLeft: 10
  },
  videoURL: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: 50
  },
  url: {
    marginLeft: 10,
    color: '#5f5f5f',
    fontWeight: 'bold',
  },
  link:{
    marginLeft: 10,
    color: '#4287f5',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
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
              <div className={classes.videoOpt}>
                <ReactPlayer
                  
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${video.url_video}`}
                  width="100%"
                />
              </div>
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >
              <div className={classes.videoOpt}>
                <a className={classes.videoTitle}>{video.nome_video}</a>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={()=>delVideo(video)}
                >
                  <CreateIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={()=>delVideo(video)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <div className={classes.videoURL}>
                  <p className={classes.url}>URL:</p>
                  <a
                    className={classes.link}
                    href={`https://www.youtube.com/watch?v=${video.url_video}`}
                    target="_blank"
                  >https://www.youtube.com/watch?v=${video.url_video}</a>
                </div>
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
