import React from 'react';

import {Grid, Typography} from '@material-ui/core';

const Data = (props) => {
    const {title, data} = props;

  return <Grid container justify="center" alignItems="center" spacing={24}>
    <Grid item>
      <Typography variant="title">{title}</Typography>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="space-evenly" alignItems="center" style={{padding: 10}}>
        {data && data.map( (item, i) => 
          <Grid key={`data_${i}`}item xs={6}>
            <Typography>{item.label}:{item.size}</Typography>
          </Grid>
        )}
        {data && data.length % 2 !==0 && <Grid item xs={6}/>}
      </Grid>
    </Grid>
  </Grid>;
}

export default Data;
