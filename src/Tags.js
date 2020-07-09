import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

/**
 * props:
 *   tags: [array[str]]
 */
export default function Tags({
  tags,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tags.map((t, i) => {
        return (
          <Chip key={i} label={t} onClick={() => console.log(`click tag: ${t}`)} />
        )})}
    </div>
  );
}
