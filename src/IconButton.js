import React from 'react';
import MuiIconButton from '@material-ui/core/IconButton';

// IconButton with no hover effect.
export default (props) => {
  return (
    <MuiIconButton style={{ backgroundColor: 'transparent' }} {...props} />
  );
};
