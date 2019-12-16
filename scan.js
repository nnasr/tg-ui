import React, { useState, useEffect } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as occurenceActions from './occurrenceActions';

// Material UI
import {Grid, Typography, TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

// Common components
import {OpButton, OpRowNarrow, OpChipTextField} from '@openpharma/op-js-lib-react';

// 3rd party libraries
import FileDownload from "js-file-download";

const styles = theme => ({
  button: {
    background: `linear-gradient(to right, #C7B5D0 0%,#8194D8 30px,#6E1C93 30px,#6D89E8 100%)`,
    color: 'white',
    borderRadius: 11,
    padding: '6px 4px',
    '&:disabled': {
      color: 'white',
      background: `linear-gradient(to right, #A2A6A3 0%,#A2A6A3 30px,#8C8F8D 30px,#B9BDBA 100%)`
    },
    '&:hover': {
      opacity: 0.5
    }
  }
});


const OccurrenceScan = (props) => {

  const {classes, scanning, analysisFile} = props;
  const [draft, setDraft] = useState(true);
  const [analyzed, setAnalyzed] = useState(false);
  const [file, setFile] = useState(undefined);
  const [columnInput, setColumnInput] = useState(undefined);
  const [numberOccurrences, setNumberOccurrences] = useState(undefined);
  const [columnOutput, setColumnOutput] = useState(undefined);
  const [drugNames, setDrugNames] = useState(undefined);
  const [suggestions, setSuggestions] = useState(undefined);
  const [downloadRequested, setDownloadRequested] = useState(false);

  useEffect(() => {
    if(!suggestions && !props.suggestions) {
      props.actions.getDrugDictionary();
    } else if (!suggestions && props.suggestions && props.suggestions.length) {
      setSuggestions(props.suggestions.map(s => {return {label: s}}))
    }

    if(!draft && !analyzed && !props.error && props.analysis) {
      setAnalyzed(true);
    }

    if(file && downloadRequested && analysisFile) {
      FileDownload(analysisFile, `${file.name}_analysis.xlsx`);
      setDownloadRequested(false);
    }
    
  }, [suggestions, props.suggestions, props.actions, props.error, props.analysis, analyzed, draft, downloadRequested, analysisFile, file])

  const submitScan = () => {
    if(draft) {
      setDraft(false);
      props.actions.scanOccurrence(file, columnInput, columnOutput, numberOccurrences, drugNames);
    } else {
      console.log('Download request');
      props.actions.downloadOccurrence(file, columnInput, columnOutput, numberOccurrences, drugNames);
      setDownloadRequested(true);
    }
    
  };

  const isFormIncomplete = () => {
    return !(file && columnInput && numberOccurrences && columnOutput  && columnOutput.length > 0 && drugNames && drugNames.length > 0)
  }

  return <Grid container justify="center" alignItems="center" spacing={24}>
    <Grid item>
      <Typography variant="h2" >Occurrence Scan</Typography>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" alignItems="center" spacing={24}>
        <OpRowNarrow>
          <Grid container justify="center" alignItems="center" spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <TextField
                name="file"
                type="file"
                disabled={scanning}
                variant="outlined"
                label="Select Data file"
                style={{width: '100%'}}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  accept: "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }}
                onChange={(e) => {
                  setDraft(true);
                  setFile(e.target.files[0]);
                }}
              />
          
            </Grid>
            <Grid item xs={3}></Grid>
            
          </Grid>
        </OpRowNarrow>
        <OpRowNarrow>
          <Grid container justify="center" alignItems="center" spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={4}>
              <TextField
                name="input"
                variant="outlined"
                disabled={scanning}
                label="Column input"
                helperText="Put exact same column name"
                style={{width: '100%'}}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(e) => {
                  setDraft(true);
                  setColumnInput(e.target.value)}
                  }/>
            </Grid>
            <Grid item xs={2}>
              <TextField
                name="numberOccurrences"
                type="number"
                disabled={scanning}
                variant="outlined"
                style={{width: '100%'}}
                label="Number of Occurrences"
                helperText="Number of minimum occurrences"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(e) => {
                  setDraft(true);
                  setNumberOccurrences(e.target.value)}
                }
              />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </OpRowNarrow>
        
        <OpRowNarrow>
          <Grid container justify="center" alignItems="center" spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <OpChipTextField
                label="Column Output" 
                helperText="Put exact same column names"
                disabled={scanning}
                onChange={(items) => {
                  setDraft(true);
                  setColumnOutput(items);
                }}
              />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </OpRowNarrow>
        <OpRowNarrow>
          <Grid container justify="center" alignItems="center" spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <OpChipTextField 
                suggestions={suggestions || []}
                label="Drug names"
                placeholder="Enter drug names"
                disabled={scanning}
                onChange={(items) => {
                  setDraft(true);
                  setDrugNames(items);
                }}/>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </OpRowNarrow>
        <Grid item >
          <OpButton rounded disabled={scanning || isFormIncomplete()} onClick={submitScan} className={classes.button} >
            {
              draft ? 
              <React.Fragment><SearchIcon/><span style={{padding: `0 10px`}}>Search</span></React.Fragment>
              :
              <React.Fragment><SearchIcon/><span style={{padding: `0 10px`}}>Download</span></React.Fragment>
            }
            
          </OpButton>
        </Grid>
      </Grid>
    </Grid>
  </Grid>;
}


function mapStateToProps(state) {
  return {
    analysis: state.occurrences.result,
    analysisFile: state.occurrences.file,
    scanning: state.occurrences.scanning,
    error: state.occurrences.error,
    suggestions: state.occurrences.drugs,
    suggestionError: state.occurrences.drugsError
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(occurenceActions, dispatch)
  };
}
  

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OccurrenceScan));
