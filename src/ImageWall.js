import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SearchBar from './SearchBar';
import ImageCard from './ImageCard';
import Pagination from './Pagination';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '33.3%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
    padding: '2px',
  }
}));

/**
 * props:
 *   imageList [array[object]]
 */
function ImageWall({
  compactMode,
  imageList,
}) {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item>
        <SearchBar onSearch={(text) => console.log(`handle search: ${text}`)} />
      </Grid>
      <Grid item container className={classes.cardContainer}>
        {imageList.map((image) => (
          <div key={image.id} className={classes.card} style={compactMode ? {width: '25%'} : null}>
            <ImageCard imageData={image} />
          </div>
        ))}
      </Grid>
      <Grid item>
        <Pagination />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  compactMode: state.main.compactMode,
  imageList: state.main.imageList,
});

export default connect(
  mapStateToProps
)(ImageWall);
