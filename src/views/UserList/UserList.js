/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import api from '../../server/api';

import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  const clients = useSelector((state) => state.clients);

  useEffect(() => {
    console.log(clients);
    setUsers(clients);
  }, [clients]);
  

  useEffect(() => {
    GetUsers();
  }, []);

  const GetUsers = () => {
    api.get('clientsweb').then((response) => {
      setUsers(response.data);
    });
  };

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
