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
  const [video_url, setvideo_url] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        onClose={handleClose}
        open={open}
      >
        
        <DialogTitle id="form-dialog-title">Adicionar Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adicione um novo video no app, ele ficara localizado nos Videos
            Uteis no menu do app.
          </DialogContentText>
          <ReactPlayer
            heigth="100"
            url={video_url}
            width="100%"
          />
          <br />
          <TextField
            autoFocus
            fullWidth
            id="name"
            label="URL do Video"
            margin="dense"
            onChange={event => setvideo_url(event.target.value)}
            type="text"
            value={video_url}
          />
          <TextField
            fullWidth
            id="name"
            label="Titulo"
            margin="dense"
            type="text"
          />
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
            onClick={handleClose}
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
