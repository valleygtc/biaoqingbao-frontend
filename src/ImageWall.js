import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ImageBox from './ImageBox';
import { imageList } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ImageWall() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={2}>
        {imageList.map((image) => (
          <GridListTile key={image.id} cols={1}>
            <ImageBox imageData={image} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
