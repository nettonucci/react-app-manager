/* eslint-disable no-console */
/* eslint-disable block-scoped-var */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';
import { SearchInput } from 'components';
import { useDispatch } from 'react-redux';
import api from '../../../../server/api';
import { getClients } from '../../../../store/clientsReducer';
import { ButtonEraseFlter } from './styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const UsersToolbar = (props) => {
  const { className, ...rest } = props;
  const [por, setPor] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [pesquisa, setPesquisa] = React.useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setPor(event.target.value);
  };

  const handleChange2 = (event) => {
    setPesquisa(event.target.value);
  };

  const handleClickShowPassword = () => {
    let valor;
    if (por !== '' && pesquisa !== '') {
      if (por === 'nomeassinante') {
        valor = pesquisa.toUpperCase();
        api.post('clientsweb', { por, valor }).then((response) => {
          // console.log(response.data);
          const list = response.data;
          if (list.length === 0) {
            window.alert('Nenhum dado encontrato!');
            setPor('');
            setPesquisa('');
            return;
          }
          dispatch(getClients(list));
          setVisible(true);
        });
        setPor('');
        setPesquisa('');
        return;
      }
      valor = pesquisa;
      api.post('clientsweb', { por, valor }).then((response) => {
        // console.log(response.data);
        const list = response.data;
        if (list.length === 0) {
          window.alert('Nenhum dado encontrato!');
          setPor('');
          setPesquisa('');
          return;
        }
        dispatch(getClients(list));
        setVisible(true);
      });
      setPor('');
      setPesquisa('');
    } else if (por === '' && pesquisa === '') {
      window.alert('É necessario preencher todos os campos!');
    } else if (por === '') {
      window.alert('É necessario escolher qual método da busca!');
    } else if (pesquisa === '') {
      window.alert('É necessario preencher o campo de pesquisa!');
    }
  };

  const handleClickEraseFilter = () => {
    api.get('clientsweb').then((response) => {
      const list = response.data;
      dispatch(getClients(list));
      setVisible(false);
    });
  }

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >

      <div className={classes.row}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Pesquisar por</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={por}
            onChange={handleChange}
            label="Pesquisar por"
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="nomeassinante">Nome</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="cpfcnpj">CPF/CNPJ</MenuItem>
          </Select>

        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Pesquisar</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={pesquisa}
            onChange={handleChange2}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )}
            labelWidth={70}
          />
        </FormControl>
        {visible && (
        <ButtonEraseFlter onClick={handleClickEraseFilter}>
          Limpar filtro
        </ButtonEraseFlter>
        )}

      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
};

export default UsersToolbar;
