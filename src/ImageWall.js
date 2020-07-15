import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ImageCard from './ImageCard';

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

/**
 * props:
 *   imageList [array[object]]
 */
export default function ImageWall({
  imageList,
}) {
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
