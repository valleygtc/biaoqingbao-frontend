import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ImageCard from './ImageCard';
import { imageList } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}));

export default function ImageWall() {
  const classes = useStyles();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={isBigScreen ? 4 : 2}>
        {imageList.map((image) => (
          <GridListTile key={image.id} cols={1}>
            <ImageCard imageData={image} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
