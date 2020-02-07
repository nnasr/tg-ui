import {combineReducers} from 'redux';

import {occurrences} from '../../Occurrence/occurrenceReducers';

// root reducer
const index = combineReducers({
  occurrences
});

export default index;
