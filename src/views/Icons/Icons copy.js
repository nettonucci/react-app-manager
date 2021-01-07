import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ReactPlayer from 'react-player';
import api from '../../server/api';
import { VideosToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  iframe: {
    width: '100%',
    minHeight: 640,
    border: 0
  }
}));

const Icons = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    plataform();
    // getPlataform()
  }, []);

  // const plataform = useSelector(state => state.plataform);
  // console.log('Get ->', plataform);

  const plataform = () => {
    api.post('videos').then(response => {
      setVideos(response.data);
    });
  };

  return (
    <div className={classes.root}>
      <VideosToolbar />
      {videos.map(video => (
        <>
          <ReactPlayer
            heigth={300}
            url={`https://www.youtube.com/watch?v=${video.url_video}`}
            width="50%"
          />
          <br />
        </>
      ))}
    </div>
  );
};

export default Icons;
