import { combineReducers } from 'redux';
import city from './cityReducer';
import restaurant from './restaurantReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  restaurantsList: city,
  restaurant,
  apiCallsInProgress
});

export default rootReducer;