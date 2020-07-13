import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body2" noWrap>
        &copy; 2020 gutianci
      </Typography>
    </div>
  );
}
