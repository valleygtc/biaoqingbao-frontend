import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ImageCard from './ImageCard';
import { imageList } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '33.3%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
    padding: '2px',
  }
}));

export default function ImageWall() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root} disableGutters>
      {imageList.map((image) => (
        <div key={image.id} className={classes.card}>
          <ImageCard imageData={image} />
        </div>
      ))}
    </Container>
  );
}
