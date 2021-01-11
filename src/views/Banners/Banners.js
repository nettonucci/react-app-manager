/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import { BannersToolbar } from './components';
import api from '../../server/api';
import {
  Container, DivRow, DivRow2, Box, IsPrincialAtivo, Ativo, IsPrincialPausado, Pausado, Box2, Button, Link, URL, Title, Header, TitleHeader,
} from "./styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  iframe: {
    width: '100%',
    minHeight: 640,
    border: 0,
  },
  boxTitle: {},
  title: {
    marginTop: 10,
  },
  videoOpt: {
    backgroundColor: '#fff',
    height: '100%',
  },
  videoTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  videoURL: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
  },
  url: {
    marginLeft: 10,
    color: '#5f5f5f',
    fontWeight: 'bold',
  },
  link: {
    marginLeft: 10,
    color: '#4287f5',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  boxButton: {
    backgroundColor: '#f1f',
    width: 100,
  },
  boxVideoTitle: {
    backgroundColor: '#ff1',
    width: 100,
  },
  divRow: {
    flexDirection: 'row',
    backgroundColor: '#000',
  },

}));

const Banners = () => {
  const classes = useStyles();
  const [banners, setBanners] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [alert, setalert] = React.useState(false);
  const [title, settitle] = React.useState('');
  const [subtitle, setsubtitle] = React.useState('');
  const [desc, setdesc] = React.useState('');
  const [link, setlink] = React.useState('');
  const [files, setFiles] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleEditBanner = banner => {
    settitle(banner.nome_promocao)
    setsubtitle(banner.subtitle)
    setlink(banner.link)
    setFiles(banner.uri_img)
    handleClickOpen()
  }

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    api.get('banners').then((response) => {
      setBanners(response.data);
    });
  };

  return (
    <div className={classes.root}>
      <BannersToolbar />
      <br />
      <Header>
        <TitleHeader>Banners</TitleHeader>
      </Header>
      <br />
      {banners.map((banner) => (
        <>
          <Container>
            <DivRow>

              <img
                heigth="100%"
                src={`http://app1.cabonnet.com.br:3333/promos/${banner.uri_img}`}
                width="100%"
              />

              <DivRow2>
                <Box2><Title>{banner.nome_promocao}</Title></Box2>
                {banner.ativo === "true" ? <Box><IsPrincialAtivo><Ativo>Ativo</Ativo></IsPrincialAtivo></Box> : <Box><IsPrincialPausado><Pausado>Pausado</Pausado></IsPrincialPausado></Box>}
                <Box>
                  {' '}
                  <IconButton
                    onClick={() => handleEditBanner(banner)}
                    aria-label="edit"
                  >
                    <CreateIcon
                      fontSize="small"
                      style={{ color: '#4287f5' }}
                    />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                  >
                    <DeleteIcon
                      fontSize="small"
                      style={{ color: 'red' }}
                    />
                  </IconButton>

                </Box>
                <Box2>
                  <URL>Link do banner:&nbsp;</URL>

                  <Link>
                    Clique aqui
                  </Link>

                </Box2>
                <Box />
                <Box />

              </DivRow2>

            </DivRow>

          </Container>
          <br />
        </>
      ))}


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

        <DialogTitle id="form-dialog-title">Editar Banner</DialogTitle>
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
              <img
                heigth="100%"
                src={`http://app1.cabonnet.com.br:3333/promos/${files}`}
                width="100%"
              />
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
            // onClick={handleAddBanner}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Banners;
