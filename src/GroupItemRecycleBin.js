import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    flexGrow: 1,
  },
  imageNumber: {
    marginLeft: '6px',
    color: '#808080',
    fontSize: '0.9em'
  }
}));

export default function GroupItemRecycleBin({
  group,
  editing,
  selected,
  onSelect,
}) {
  const classes = useStyles();
  const handleClick = () => {
    if (!editing) {
      onSelect();
    }
  }

  return (
    <div>
      <div className={classes.item} onClick={handleClick}>
        <IconButton disabled size="small" aria-label="icon">
          <DeleteOutlinedIcon />
        </IconButton>
        <Typography className={classes.text}>{group.name} <span className={classes.imageNumber}>{group.image_number}</span></Typography>
        {selected && !editing && (
          <CheckIcon color="inherit" />
        )}
      </div>
      <Divider />
    </div>
  )
}
