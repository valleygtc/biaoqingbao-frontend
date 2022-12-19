import React from 'react';
import MuiIconButton from '@material-ui/core/IconButton';

// IconButton with no hover effect.
export default React.forwardRef((props, ref) => {
  return (
    <MuiIconButton style={{ backgroundColor: 'transparent' }} ref={ref} {...props} />
  );
});
