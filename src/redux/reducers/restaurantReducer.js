import * as types from '../actions/actionTypes';

export default function restaurantReducer(state = [], action) {    
    switch(action.type){
      case types.LOAD_RESTAURANT_SUCCESS:
        return action.restaurant;
    default:
      return state;
  }
}