import * as types from './occurrenceActions';

// notifications reducers
export const occurrences = (state = {}, action) => {
  switch (action.type) {
  case types.OCCURRENCE_SCAN_REQUEST:
    return { ...state, scanning: true };

  case types.OCCURRENCE_SCAN_SUCCESS:
    return {...state, scanning: false, result: action.payload};

  case types.OCCURRENCE_SCAN_FAILURE:
    return {...state, scanning: false, error: action.error};


  case types.OCCURRENCE_DOWNLOAD_REQUEST:
      return { ...state, scanning: true, file:undefined };
  
    case types.OCCURRENCE_DOWNLOAD_SUCCESS:
      return {...state, scanning: false, file: action.payload};
  
    case types.OCCURRENCE_DOWNLOAD_FAILURE:
      return {...state, scanning: false, error: action.error};

  case types.DRUG_DICTIONARY_REQUEST:
    return { ...state, drugs: [], loading: true };

  case types.DRUG_DICTIONARY_SUCCESS:
    return {...state, drugs: action.payload, loading: false, drugsError: null };

  case types.DRUG_DICTIONARY_FAILURE:
    return {...state, loading: false, drugsError: action.error };

  default:
    return state;
  }
};
