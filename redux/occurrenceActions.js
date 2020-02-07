import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const OCCURRENCE_SCAN_REQUEST = 'OCCURRENCE_SCAN_REQUEST';
export const OCCURRENCE_SCAN_SUCCESS = 'OCCURRENCE_SCAN_SUCCESS';
export const OCCURRENCE_SCAN_FAILURE = 'OCCURRENCE_SCAN_FAILURE';

export const OCCURRENCE_DOWNLOAD_REQUEST = 'OCCURRENCE_DOWNLOAD_REQUEST';
export const OCCURRENCE_DOWNLOAD_SUCCESS = 'OCCURRENCE_DOWNLOAD_SUCCESS';
export const OCCURRENCE_DOWNLOAD_FAILURE = 'OCCURRENCE_DOWNLOAD_FAILURE';

export const DRUG_DICTIONARY_REQUEST = 'DRUG_DICTIONARY_REQUEST';
export const DRUG_DICTIONARY_SUCCESS = 'DRUG_DICTIONARY_SUCCESS';
export const DRUG_DICTIONARY_FAILURE = 'DRUG_DICTIONARY_FAILURE';

// action creator to analyse XLS request
export const scanOccurrence = (file, input, output, numberOfOccurrences, drugList) => dispatch => {
  // Set it loading
  dispatch({
    type: OCCURRENCE_SCAN_REQUEST
  });

  const formData = new FormData();
  formData.append("file", file);

  // Make the request
  axios({
    method: 'POST',
    url: API_ROOT + '/occurrences/scan',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "multipart/form-data",
      'Accept': 'application/json'
    },
    data: formData,
    params: {
      targetOccurrenceColumn: input,
      numberOfOccurrences,
      outputOccurrenceColumns: output.join(","),
      bagOfWordsContents: drugList.join(",")
    }
  })
    .then(response => {
      dispatch({
        type: OCCURRENCE_SCAN_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({
        type: OCCURRENCE_SCAN_FAILURE,
        error
      })
    });
};


// action creator to analyse XLS request
export const downloadOccurrence = (file, input, output, numberOfOccurrences, drugList) => dispatch => {
  // Set it loading
  dispatch({
    type: OCCURRENCE_DOWNLOAD_REQUEST
  });

  const formData = new FormData();
  formData.append("file", file);

  // Make the request
  axios({
    method: 'POST',
    url: API_ROOT + '/occurrences/download',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "multipart/form-data",
      'Accept': 'application/json'
    },
    data: formData,
    params: {
      targetOccurrenceColumn: input,
      numberOfOccurrences,
      outputOccurrenceColumns: output.join(","),
      bagOfWordsContents: drugList.join(",")
    },
		responseType: "blob"
  })
    .then(response => {
      dispatch({
        type: OCCURRENCE_DOWNLOAD_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({
        type: OCCURRENCE_DOWNLOAD_FAILURE,
        error
      })
    });
};

// action creator to send notifications request
export const getDrugDictionary = () => dispatch => {
  // Set it loading
  dispatch({
    type: DRUG_DICTIONARY_REQUEST
  });
  
  // Make the request
  axios({
    method: 'GET',
    url: API_ROOT + '/drugs/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(response => {
      dispatch({
        type: DRUG_DICTIONARY_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({
        type: DRUG_DICTIONARY_FAILURE,
        error
      })
    });
};
