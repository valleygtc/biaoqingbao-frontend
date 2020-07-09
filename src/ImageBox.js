import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  media: {
    height: 250,
  },
});

/**
 * props:
 *   imageData [object]: {
 *     "id": [int],
 *     "url": [str],
 *     "tags": [array[str]],
 *   }
 */
export default function ImageBox({
  imageData,
}){
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageData.url}
          title={`img-${imageData.id}`}
        />
      </CardActionArea>
      <CardContent>
        标签Foo
      </CardContent>
    </Card>
  );
}
