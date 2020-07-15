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
import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';
import Tags from './Tags';
import Move2GroupSelect from './Move2GroupSelect';

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
  header: {
    position: 'relative',
    margin: 0,
    padding: theme.spacing(2),
  },
  groupContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const handleDetailDialogOpen = () => {
    setDetailDialogOpen(true);
  };
  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  }
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const handleTagDialogOpen = () => {
    setTagDialogOpen(true);
  }
  const handleTagDialogClose = () => {
    setTagDialogOpen(false);
  }

  return (
    <Card>
      <CardActionArea onClick={handleDetailDialogOpen}>
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
        maxWidth="sm"
        fullScreen={fullScreen}
        open={detailDialogOpen}
        onClose={handleDetailDialogClose}
        aria-labelledby="check-image"
      >
        <MuiDialogTitle id="check-image" disableTypography className={classes.header}>
          <Typography variant="h6">查看图片</Typography>
          <div className={classes.groupContainer}>
            <Move2GroupSelect
              groups={['全部', '中老年表情包', 'xxxxxx']}
              imageGroup={imageData.group}
              onSelectGroup={(value) => console.log(`handle select group: ${value}`)}
            />
          </div>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleDetailDialogClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <img src={imageData.url} alt={`img-${imageData.id}`} />
          <Tags tags={imageData.tags} />
        </DialogContent>
        <DialogActions>
          <IconButton aria-label="tag" color="inherit" onClick={handleTagDialogOpen}>
            <CreateIcon fontSize="large" />
            {/* sm and smdown hidden */}
            <Hidden smDown>打标签</Hidden>
          </IconButton>
          <IconButton aria-label="delete" color="inherit" onClick={handleDeleteDialogOpen}>
            <DeleteIcon fontSize="large" />
            <Hidden smDown>删除</Hidden>
          </IconButton>
          <IconButton aria-label="share" color="inherit" onClick={() => console.log('click share')}>
            <ShareIcon fontSize="large" />
            <Hidden smDown>分享</Hidden>
          </IconButton>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        classes={{
          paperFullWidth: classes.paperFullWidth,
          scrollPaper: classes.scrollPaper,
        }}
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-image-confirm-dialog"
      >
        <DialogTitleWithCloseIcon id="delete-image-confirm-dialog" onClose={handleDeleteDialogClose}>
          确认要删除该图片？
        </DialogTitleWithCloseIcon>
        <DialogContent dividers>
          <Button fullWidth variant="contained" color="primary" onClick={() => console.log('handle delete image')}>
            删除
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={tagDialogOpen}
        onClose={handleTagDialogClose}
        aria-labelledby="tag-image"
      >
        <DialogTitleWithCloseIcon id="tag-image" onClose={handleTagDialogClose}>
          添加标签
        </DialogTitleWithCloseIcon>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <TextField fullWidth required id="标签" label="标签" margin="normal"/>
          </form>
        </DialogContent>
        <MuiDialogActions>
          <Button variant="contained" color="primary" onClick={() => console.log('handle tag confirm')}>确认</Button>
        </MuiDialogActions>
      </Dialog>
    </Card>
  );
}
