import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

export default function Copyright() {
  return (
    <Grid container direction="column" alignItems='center' spacing={1}>
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          Copyright © gutianci 2020.
        </Typography>
      </Grid>
      <Grid item>
        <Link
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          color="textSecondary"
        >
          京ICP备20030760号
        </Link>
      </Grid>
      <Grid item>
        <Link
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13068202000127"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          color="textSecondary"
        >
          <img src="/police.png" style={{ float: 'left' }} alt="Chinese Public Security Badge"/>
          <span style={{ marginLeft: '5px' }}>冀公网安备 13068202000127 号</span>
        </Link>
      </Grid>
    </Grid>
  );
}
