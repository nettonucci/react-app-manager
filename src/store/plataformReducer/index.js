/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://app1.cabonnet.com.br:3333',
  headers: {
    chave: '3cIH8c0wXxdeVqp3SDU6Rx8mZoIzXz6ADWRK5IDBDdI'
  }
});

let INITIAL_STATE = [];

// api.get('porcentagemplataforma').then(response => {
//   let android = 0;
//   let ios = 0;
//   let total = 0;
//   let porcentagem;
//   const resposta = response.data;
//   total = resposta.length;
//   resposta.forEach(function(plataforma) {
//     if (plataforma.plataforma === 'ios') {
//       ios++;
//     }
//     if (plataforma.plataforma === 'android') {
//       android++;
//     }
//   });
//   ios = (ios * 100) / total;
//   android = (android * 100) / total;

//   ios = ios.toFixed(2);
//   android = android.toFixed(2);
//   porcentagem = [{ android, ios }];
//   console.log(porcentagem);
//   INITIAL_STATE = porcentagem;
// });

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'GET_PLATAFORM') {
    return action.porcentagem;
  }
  return state;
}

export const getPlataform = porcentagem => {
  return {
    type: 'GET_PLATAFORM',
    porcentagem
  };
};
