import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import Hidden from '@material-ui/core/Hidden';

import Tags from './Tags';

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: 250,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 2),
    [theme.breakpoints.up('lg')]: {
      width: '50vw',
      height: '80vh',
    },
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
}));

/**
 * props:
 *   imageData [object]: {
 *     "id": [int],
 *     "url": [str],
 *     "tags": [array[str]],
 *   }
 */
export default function ImageCard({
  imageData,
}){
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          className={classes.cardImage}
          image={imageData.url}
          title={`img-${imageData.id}`}
        />
      </CardActionArea>
      <CardContent>
        <Tags tags={imageData.tags} />
      </CardContent>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby={`image-${imageData.id}`}
        aria-describedby={`image-${imageData.id}`}
      >
        <Grid
          container
          className={classes.modalContent}
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.closeIcon}>
            <IconButton aria-label="close modal" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="large"/>
            </IconButton>
          </Grid>
          <Grid item>
            <img src={imageData.url} alt={`img-${imageData.id}`} />
            <Tags tags={imageData.tags} />
          </Grid>
          <Grid item container justify="space-around">
            <Grid item>
              <IconButton aria-label="tag" color="inherit" onClick={() => console.log('click tag')}>
                <CreateIcon fontSize="large" />
                {/* md and mddown hidden */}
                <Hidden mdDown>打标签</Hidden>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="delete" color="inherit" onClick={() => console.log('click delete')}>
                <DeleteIcon fontSize="large" />
                <Hidden mdDown>删除</Hidden>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="share" color="inherit" onClick={() => console.log('click share')}>
                <ShareIcon fontSize="large" />
                <Hidden mdDown>分享</Hidden>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </Card>
  );
}
