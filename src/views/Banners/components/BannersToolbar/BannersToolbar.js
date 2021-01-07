/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
import api from '../../../../server/api';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  marginLeft: 8,
  width: 400,
  height: 300,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 400,
  height: 300,
  resizeMode: 'cover'
};

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
  },
  banner: {
    height: '100',
    width: '100',
    backgroundColor: '#f1f'
  }
}));

const BannersToolbar = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [alert, setalert] = React.useState(false);
  const [title, settitle] = React.useState('');
  const [subtitle, setsubtitle] = React.useState('');
  const [desc, setdesc] = React.useState('');
  const [link, setlink] = React.useState('');
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map(file => (
    <div
      key={file.name}
      style={thumb}
    >
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFiles([]);
    setalert(false);
  };

  const handleDeleteFoto = () => {};

  const handleAddBanner = () => {
    console.log("Banner ->", files)
    console.log("Title ->", title)
    console.log("Sub Title ->",subtitle)
    console.log("Desc ->", desc)
    console.log("Link ->",link)
    // if (video_url !== '' && video_title !== '') {
    //   const URL = video_url;
    //   const title = video_title;
    //   api
    //     .post('videos', {
    //       URL,
    //       title
    //     })
    //     .then(response => {
    //       handleClose();
    //       setvideo_url('');
    //       setvideo_title('');
    //       setalert(false);

    //       const list = 'new';
    //       dispatch(getVideos(list));
    //     });
    // } else {
    //   setalert(true);
    // }
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
          ADD BANNER
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

        <DialogTitle id="form-dialog-title">Adicionar Banner</DialogTitle>
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
                Adicione um novo Banner no app, ele ficara localizado na tela
                principal do App.
              </DialogContentText>
              <TextField
                autoFocus
                fullWidth
                id="Title"
                label="Titulo*"
                margin="dense"
                onChange={event => settitle(event.target.value)}
                type="text"
                value={title}
              />
              <TextField
                fullWidth
                id="SubTitle"
                label="Sub Titulo"
                margin="dense"
                onChange={event => setsubtitle(event.target.value)}
                type="text"
                value={subtitle}
              />
              <TextField
                fullWidth
                id="Desc"
                label="Descrição"
                margin="dense"
                onChange={event => setdesc(event.target.value)}
                type="text"
                value={desc}
              />
              <TextField
                fullWidth
                id="link"
                label="Link da promo"
                margin="dense"
                onChange={event => setlink(event.target.value)}
                type="text"
                value={link}
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
              <Paper className={classes.paper}>
                <section className="container">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Paper className={classes.paper}>
                      <p align="center">
                        Arraste aqui o Banner ou clique para escolher um!
                      </p>
                    </Paper>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </section>
              </Paper>
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
            onClick={handleAddBanner}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

BannersToolbar.propTypes = {
  className: PropTypes.string
};

export default BannersToolbar;
