import React from 'react';

// redux
import { connect } from 'react-redux';

import Scan from '../components/Occurrence/scan';
import Data from '../components/Occurrence/data';

// Library imports
import {Grid, Paper, LinearProgress, Typography} from '@material-ui/core';
import {OpTable} from '@openpharma/op-js-lib-react'

const OccurrenceScan = (props) => {  
  return (
    <React.Fragment>
      {
        props.scanning && <LinearProgress/>
      }
      <Scan/>
      <Grid style={{marginTop: 24}} container justify="center" alignItems="flex-start" spacing={24} >
        {
          props.analysis 
          && props.analysis.preview 
          && props.analysis.preview.length > 0
          && <Grid item xs={5}>
          <Paper>
            <Data title="Preview data" />
            {
              props.analysis 
              && props.analysis.preview 
              && props.analysis.preview.length > 0
              ? <OpTable
                    tableName="Preview Data"
                    headers={Object.keys(props.analysis.preview[0])}
                    rows={props.analysis.preview}
                    moreActionsEnabled={false}
                    checkboxEnabled={false}
                  />
                  :
                  <Typography variant="body2" align="center">No data available</Typography>
            }
          </Paper>
        </Grid>
        }
        
        {
          props.analysis && props.analysis.stats && props.analysis.stats.length > 0 && <Grid item xs={5}>
          <Paper>
            <Data title="Statistics"
              data={
                props.analysis 
                && props.analysis.stats 
                && props.analysis.stats.map(entry => {
                  return {
                    label: entry["Drugs"],
                    size: entry["Count"]
                  }
                })
              }
            />
          </Paper>
        </Grid>
        }
        
      </Grid>
    </React.Fragment>
  );
}



function mapStateToProps(state) {
  return {
    analysis: state.occurrences.result,
    scanning: state.occurrences.scanning,
    error: state.occurrences.error,
    suggestions: state.occurrences.drugs,
    suggestionError: state.occurrences.drugsError
  };
}
  

export default connect(mapStateToProps)(OccurrenceScan);
