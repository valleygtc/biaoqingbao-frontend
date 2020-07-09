import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
  return (
    <div
      style={{
        height: '10vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" noWrap>
        &copy; 2020 gutianci
      </Typography>
    </div>
  );
}
