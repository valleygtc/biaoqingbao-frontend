import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

export default function Copyright() {
  return (
    <Grid container direction="column" alignItems='center' spacing={1}>
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          Copyright © gutianci 2020.
        </Typography>
      </Grid>
      <Grid item>
        <a
          style={{
            textDecoration: 'none',
          }}
          target="_blank"
          href="https://beian.miit.gov.cn/"
        >
          <Typography variant="body2" color="textSecondary">
            京ICP备20030760号
          </Typography>
        </a>
      </Grid>
      <Grid item>
        <a
          style={{
            textDecoration: 'none',
          }}
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13068202000127"
        >
          <img src="/police.png" style={{ float: 'left' }} alt="police-picture"/>
          <Typography style={{
            float: 'left',
            margin: '0px 0px 0px 5px',
          }} variant="body2" color="textSecondary">
            冀公网安备 13068202000127 号
          </Typography>
        </a>
      </Grid>
    </Grid>
  );
}
