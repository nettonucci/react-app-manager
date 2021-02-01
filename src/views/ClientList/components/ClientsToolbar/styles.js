/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { Button } from '@material-ui/core';

export const ButtonEraseFlter = styled(Button)`
cursor: pointer;
display: flex;
  align-items: center;
  justify-content: center;
width: 150px;
height: 40px;
border-radius: 3px;
background-color: #ff0000;
align-items: center;
color: #fff;
transition: 0.5s all ease-out;
  &:hover {
    background-color: #660000;
    color: white;
  }
`