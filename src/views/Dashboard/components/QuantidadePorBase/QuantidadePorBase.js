/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar, Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import palette from 'theme/palette';
import api from '../../../../server/api';
import {
  Card,
  IconButton,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RefreshIcon from '@material-ui/icons/Refresh';

import { options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  load: {
    alignSelf: 'center',
    marginLeft: '50%',
    marginTop: 10
  }
}));

const QuantidadePorBase = props => {
  const { className, ...rest } = props;
  const [assis, setAssis] = useState(0);
  const [giga, setGiga] = useState(0);
  const [rr, setRr] = useState(0);
  const [tupa, setTupa] = useState(0);
  const [load, setload] = useState(false);

  useEffect(() => {
    base();
  }, []);

  const base = () => {
    setload(true);
    api.get('clientesbase').then(response => {
      const base = response.data;
      setRr(base[0].RR);
      setGiga(base[0].Giga_TV);
      setAssis(base[0].TVC_Assis);
      setTupa(base[0].TVC_Tupã);
    });
    setTimeout(() => {
      setload(false);
    }, 1000);
    // setload(false)
  };

  const data = {
    labels: ['TVC Assis', 'R&R', 'Giga TV', 'TVC Tupã'],
    datasets: [
      {
        label: 'Clientes',
        backgroundColor: palette.secondary.main,
        data: [assis, rr, giga, tupa]
      }
    ]
  };

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton
            onClick={base}
            size="small"
          >
            <RefreshIcon />
          </IconButton>
        }
        title="Quantidade por base"
      />

      <Divider />
      {load ? (
        <div className={classes.load}>
          <Spinner
            animating
            color={palette.secondary.main}
            size={40}
            speed={1}
          />
        </div>
      ) : (
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar
              data={data}
              options={options}
            />
          </div>
        </CardContent>
      )}

      <Divider />
    </Card>
  );
};

QuantidadePorBase.propTypes = {
  className: PropTypes.string
};

export default QuantidadePorBase;
