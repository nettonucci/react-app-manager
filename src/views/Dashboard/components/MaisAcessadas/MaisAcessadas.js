/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import api from '../../../../server/api';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar, Doughnut, Pie, HorizontalBar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import palette from 'theme/palette';
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
    height: 800,
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

const MaisAcessadas = props => {
  const { className, ...rest } = props;
  const [load, setload] = useState(false);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create('chartdiv', am4charts.XYChart3D);

    api.get('acessocount').then(response => {
      const dados = response.data;
      chart.data = dados;
    });
    /* Chart code */
    // Themes begin

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'acesso';
    categoryAxis.renderer.labels.template.visible = false;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Logs';
    valueAxis.title.fontWeight = 'bold';

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = 'QTD';
    series.dataFields.categoryX = 'acesso';
    series.name = 'QTD';
    series.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color('#FFFFFF');

    columnTemplate.adapter.add('fill', function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    columnTemplate.adapter.add('stroke', function(stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;
    setload(false);
  }, [load]);

  const logs = () => {
    setload(true);
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
            onClick={logs}
            size="small"
          >
            <RefreshIcon />
          </IconButton>
        }
        title="Logs"
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
          <div
            id="chartdiv"
            style={{ width: '100%', height: '500px' }}
          />
        </CardContent>
      )}

      <Divider />
    </Card>
  );
};

MaisAcessadas.propTypes = {
  className: PropTypes.string
};

export default MaisAcessadas;
