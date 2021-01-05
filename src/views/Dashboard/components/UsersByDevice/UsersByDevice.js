/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import api from '../../../../server/api';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPlataform } from '../../../../store/plataformReducer';
import { makeStyles, useTheme } from '@material-ui/styles';
import palette from 'theme/palette';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import AndroidIcon from '@material-ui/icons/Android';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  },
  load: {
    marginLeft: '45%',
    marginTop: 10
  }
}));

const UsersByDevice = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();
  const [ios, setIos] = useState(0);
  const [android, setAndroid] = useState(0);
  const [load, setload] = useState(false);

  useEffect(() => {
    plataform();
    // getPlataform()
  }, []);

  // const plataform = useSelector(state => state.plataform);
  // console.log('Get ->', plataform);

  const plataform = () => {
    setload(true);
    api.get('porcentagemplataforma').then(response => {
      const plataforma = response.data;
      setIos(plataforma[0].ios);
      setAndroid(plataforma[0].android);
    });
    setTimeout(() => {
      setload(false);
    }, 1000);
  };

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [android, ios],
        backgroundColor: [
          theme.palette.secondary.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Android', 'IOS']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Android',
      value: android,
      icon: <AndroidIcon />,
      color: theme.palette.secondary.main
    },
    {
      title: 'IOS',
      value: ios,
      icon: <PhoneIphoneIcon />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton
            onClick={plataform}
            size="small"
          >
            <RefreshIcon />
          </IconButton>
        }
        title="Porcentagem de aparelhos"
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
            <Doughnut
              data={data}
              options={options}
            />
          </div>
          <div className={classes.stats}>
            {devices.map(device => (
              <div
                className={classes.device}
                key={device.title}
              >
                <span className={classes.deviceIcon}>{device.icon}</span>
                <Typography variant="body1">{device.title}</Typography>
                <Typography
                  style={{ color: device.color }}
                  variant="h2"
                >
                  {device.value}%
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
