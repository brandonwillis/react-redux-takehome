import { configureStore } from '@reduxjs/toolkit';
import clientInfoReducer from '../features/clientInfo/clientInfoSlice';
import biologicalInfoReducer from '../features/biologicalInfo/biologicalInfoSlice';
import matchingCriteriaReducer from '../features/matchingCriteria/matchingCriteriaSlice';

export default configureStore({
  reducer: {
    clientInfo: clientInfoReducer,
    biologicalInfo: biologicalInfoReducer,
    matchingCriteria: matchingCriteriaReducer
  },
});
