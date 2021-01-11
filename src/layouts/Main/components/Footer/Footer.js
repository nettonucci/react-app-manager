import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://www.linkedin.com/in/jose-nucci-netto-082b68185/"
          target="_blank"
        >
          Netto Nucci
        </Link>
        . 2021
      </Typography>
      <Typography variant="caption">
      Formando em ciência da computação, atuo na área desde 2020, utilizo tecnologia JavaScript para meus desenvolvimentos ...
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
