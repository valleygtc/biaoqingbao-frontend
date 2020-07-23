import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { changePage, changeSearchTag, getImageList } from './mainSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    border: '1px solid gray',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(1, 2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

function SearchBar({
  changePage,
  changeSearchTag,
  getImageList,
}) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  }
  const handleResetValue = () => {
    setValue('');
    changePage(1);
    changeSearchTag('');
    getImageList();
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // on press Enter
      changePage(1);
      changeSearchTag(value);
      getImageList();
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        fullWidth
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        endAdornment={(
          <InputAdornment position="start">
            <IconButton aria-label="close" onClick={handleResetValue}>
              <CancelIcon />
            </IconButton>
          </InputAdornment>
        )}
        value={value}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

const mapDispatchToProps = { changePage, changeSearchTag, getImageList };

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
