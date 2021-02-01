import styled from 'styled-components';

import { Button } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';

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
`;

export const InputPage = styled(TextField)`
display: flex;
align-items: center;
justify-content: center;
width: 70px;
height: 30px;
border-radius: 3px;
align-items: center;
color: #fff;

`;

export const IsAtivo = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100px;
height: 30px;
border-radius: 20px;
background-color: #C8FFA5;
align-items: center;

`;

export const Ativo = styled.a`
    color: #307436;
    font-weight: bold;
`;

export const IsPausado = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100px;
height: 30px;
border-radius: 20px;
background-color: #FFD2A5;
align-items: center;

`;

export const Pausado = styled.a`
    color: #744D30;
    font-weight: bold;
`;


