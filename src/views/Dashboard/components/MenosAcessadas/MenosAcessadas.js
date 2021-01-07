/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar, Doughnut, Pie, HorizontalBar } from 'react-chartjs-2';
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

const MenosAcessadas = props => {
  const { className, ...rest } = props;
  const [datas, setData] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
  const [load, setload] = useState(false);
  useEffect(() => {
    base();
  }, []);

  const base = () => {
    setload(true);
    api.get('acessocount').then(response => {
      const data = response.data;
      console.log(data);
      const divider = response.data.length / 2;
      setData(data);
    });
    setTimeout(() => {
      setload(false);
    }, 1000);
    // setload(false)
  };

  const data = {
    labels: [
      datas[0].acesso,
      datas[1].acesso,
      datas[2].acesso,
      datas[3].acesso,
      datas[4].acesso,
      datas[5].acesso,
      datas[6].acesso,
      datas[7].acesso,
      datas[8].acesso,
      datas[9].acesso,
      datas[34].acesso,
      datas[35].acesso,
      datas[36].acesso,
      datas[37].acesso,
      datas[38].acesso,
      datas[39].acesso,
      datas[40].acesso,
      datas[41].acesso,
      datas[42].acesso,
      datas[43].acesso
    ],
    datasets: [
      {
        label: 'Logs',
        backgroundColor: palette.secondary.main,
        data: [
          datas[0].QTD,
          datas[1].QTD,
          datas[2].QTD,
          datas[3].QTD,
          datas[4].QTD,
          datas[5].QTD,
          datas[6].QTD,
          datas[7].QTD,
          datas[8].QTD,
          datas[9].QTD,
          datas[34].QTD,
          datas[35].QTD,
          datas[36].QTD,
          datas[37].QTD,
          datas[38].QTD,
          datas[39].QTD,
          datas[40].QTD,
          datas[41].QTD,
          datas[42].QTD,
          datas[43].QTD
        ]
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
        title="Top Logs"
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
            <HorizontalBar
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

MenosAcessadas.propTypes = {
  className: PropTypes.string
};

export default MenosAcessadas;
