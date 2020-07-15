import * as types from '../actions/actionTypes';

export default function cityReducer(state = [], action) {    
    switch(action.type){
      case types.LOAD_CITY_SUCCESS:
        return action.city;  
    default:
      return state;
  }
}