import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ButtonWithLoader({
  loading,
  ...otherProps
}) {
  // TODO: 改 loading 时的颜色，不要用 disable 这种颜色，用一种轻一点的 primary 颜色。
  return (
    <Button
      startIcon={loading ? <CircularProgress size="1rem" color="inherit" /> : null}
      disabled={loading}
      {...otherProps}
    >
      提交
    </Button>
  )
}
