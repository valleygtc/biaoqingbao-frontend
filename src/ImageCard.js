import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Tags from './Tags';
import DetailDialog from './DetailDialog';

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: 250,
  },
  paperFullWidth: {
    width: '100%',
    margin: 0,
  },
  scrollPaper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  },
}));

/**
 * props:
 *   imageData [object]: {
 *     "id": [int],
 *     "url": [str],
 *     "tags": [array[str]],
 *     "group": [str],
 *   }
 */
export default function ImageCard({
  imageData,
}){
  const classes = useStyles();

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  return (
    <Card>
      <CardActionArea onClick={() => setDetailDialogOpen(true)}>
        <CardMedia
          className={classes.cardImage}
          image={imageData.url}
          title={`img-${imageData.id}`}
        />
      </CardActionArea>
      <CardContent>
        <Tags tags={imageData.tags} />
      </CardContent>
      <DetailDialog
        imageData={imageData}
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
      />
    </Card>
  );
}
