import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Tags from './Tags';
import DetailDialog from './DetailDialog';
import { useHeapedDialog } from './hooks';

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: 0,
    paddingTop: '100%', // 1:1 ratio
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
 *     "tags": [array[object]], { "id": <int>, "text": <str> }
 *     "group": [object] or null, { "id": <int>, "name": <str> }
 *   }
 *   compactMode [bool]
 */
function ImageCard({
  imageData,
  compactMode,
}){
  const classes = useStyles();

  const { open, handleOpen, handleClose } = useHeapedDialog(`image-detail-${imageData.id}`);

  return (
    <Card>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          className={classes.cardImage}
          image={imageData.url}
          title={`img-${imageData.id}`}
        />
      </CardActionArea>
      {compactMode
        ? null
        : (
          <CardContent>
            <Tags imageId={imageData.id} tags={imageData.tags} />
          </CardContent>
        )}
      <DetailDialog
        imageData={imageData}
        open={open}
        onClose={handleClose}
      />
    </Card>
  );
}

const mapStateToProps = (state) => ({
  compactMode: state.config.compactMode,
});

export default connect(
  mapStateToProps,
  null,
)(ImageCard);
