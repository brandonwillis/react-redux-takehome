import { configureStore } from '@reduxjs/toolkit';
import clientInfoReducer from '../containers/clientInfo/clientInfoSlice';
import biologicalInfoReducer from '../containers/biologicalInfo/biologicalInfoSlice';
import matchingCriteriaReducer from '../containers/matchingCriteria/matchingCriteriaSlice';

export default configureStore({
  reducer: {
    clientInfo: clientInfoReducer,
    biologicalInfo: biologicalInfoReducer,
    matchingCriteria: matchingCriteriaReducer
  },
});
