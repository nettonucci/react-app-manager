/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {
  Container, DivRow, DivRow2, Box, IsPrincial, Box2, Button, Link, URL, Title,
} from "./styles";

const Typography = () => (
  <Container>
    <DivRow>

      <ReactPlayer

        height="100%"
        url="https://www.youtube.com/watch?v=75fK0iwhxdE"
        width="100%"
      />

      <DivRow2>
        <Box2><Title>Video 1</Title></Box2>
        <Box><IsPrincial>Video Principal</IsPrincial></Box>
        <Box>
          {' '}
          <IconButton
            aria-label="edit"
          >
            <CreateIcon
              fontSize="small"
              style={{ color: 'green' }}
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
          <URL>URL:&nbsp;</URL>

          <Link>Clique aqui</Link>

        </Box2>
        <Box />
        <Box />
        <Box2><Button>Tornar Principal</Button></Box2>
      </DivRow2>

    </DivRow>

  </Container>
);

export default Typography;
