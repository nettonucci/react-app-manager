import axios from 'axios';

const api = axios.create({
  baseURL: 'http://app1.cabonnet.com.br:3333',
  headers: {
    chave: '3cIH8c0wXxdeVqp3SDU6Rx8mZoIzXz6ADWRK5IDBDdI'
  }
});

export default api;
