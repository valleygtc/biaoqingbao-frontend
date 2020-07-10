import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import Hidden from '@material-ui/core/Hidden';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';
import Tags from './Tags';

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: 250,
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
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

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
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="check-image"
      >
        <DialogTitleWithCloseIcon id="check-image" onClose={handleClose}>查看图片</DialogTitleWithCloseIcon>
        <DialogContent dividers>
          <img src={imageData.url} alt={`img-${imageData.id}`} />
          <Tags tags={imageData.tags} />
        </DialogContent>
        <DialogActions>
          <IconButton aria-label="tag" color="inherit" onClick={() => console.log('click tag')}>
            <CreateIcon fontSize="large" />
            {/* sm and smdown hidden */}
            <Hidden smDown>打标签</Hidden>
          </IconButton>
          <IconButton aria-label="delete" color="inherit" onClick={() => console.log('click delete')}>
            <DeleteIcon fontSize="large" />
            <Hidden smDown>删除</Hidden>
          </IconButton>
          <IconButton aria-label="share" color="inherit" onClick={() => console.log('click share')}>
            <ShareIcon fontSize="large" />
            <Hidden smDown>分享</Hidden>
          </IconButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
