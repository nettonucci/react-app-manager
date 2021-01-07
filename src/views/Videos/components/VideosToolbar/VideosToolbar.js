/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import api from '../../../../server/api';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { getVideos } from '../../../../store/videoReducer';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const VideosToolbar = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [alert, setalert] = React.useState(false);
  const [video_url, setvideo_url] = React.useState('');
  const [video_title, setvideo_title] = React.useState('');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setvideo_url('');
    setvideo_title('');
    setalert(false);
  };

  const handleAddVideo = () => {
    if (video_url !== '' && video_title !== '') {
      const URL = video_url;
      const title = video_title;
      api
        .post('videos', {
          URL,
          title
        })
        .then(response => {
          handleClose();
          setvideo_url('');
          setvideo_title('');
          setalert(false);

          const list = 'new';
          dispatch(getVideos(list));
        });
    } else {
      setalert(true);
    }
  };

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />

        <Button
          color="secondary"
          onClick={handleClickOpen}
          variant="contained"
        >
          ADD VIDEO
        </Button>
      </div>
      <Dialog
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        open={open}
      >
        {alert && (
          <Alert severity="error">
            Todos os campos precisam estar preenchidos!
          </Alert>
        )}

        <DialogTitle id="form-dialog-title">Adicionar Video</DialogTitle>
        <DialogContent>
          <Grid
            container
            // m={3}
            spacing={4}
          >
            <Grid
              item
              lg={12}
              md={6}
              xl={6}
              xs={6}
            >
              <DialogContentText>
                Adicione um novo video no app, ele ficara localizado nos Videos
                Uteis no menu do app.
              </DialogContentText>
              <TextField
                autoFocus
                fullWidth
                id="URL"
                label="URL do Video"
                margin="dense"
                onChange={event => setvideo_url(event.target.value)}
                type="text"
                value={video_url}
              />
              <TextField
                fullWidth
                id="Title"
                label="Titulo"
                margin="dense"
                onChange={event => setvideo_title(event.target.value)}
                type="text"
                value={video_title}
              />
            </Grid>
            <Grid
              item
              lg={12}
              md={6}
              xl={6}
              xs={6}
            >
              <DialogContentText>Prévia</DialogContentText>
              {video_url === '' ? (
                <img
                  heigth="100"
                  src="/images/files/youtube-logo.jpg"
                  width="100%"
                />
              ) : (
                <ReactPlayer
                  heigth="100"
                  url={video_url}
                  width="100%"
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={handleAddVideo}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

VideosToolbar.propTypes = {
  className: PropTypes.string
};

export default VideosToolbar;
