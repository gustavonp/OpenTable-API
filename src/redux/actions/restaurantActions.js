import * as types from './actionTypes';
import * as cityApi from '../../api/cityApi';
import { beginApiCall, apiCallError } from './apiStatusActions';
// import your api call

export function loadRestaurantSuccess(restaurant){
  return { type: types.LOAD_RESTAURANT_SUCCESS, restaurant}
}

//thunks
export function loadRestaurant(restaurant){  
  return function (dispatch){
    dispatch(beginApiCall());
    return cityApi
      .getRestaurant(restaurant)
      .then(restaurant =>{
        dispatch(loadRestaurantSuccess(restaurant));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      })
  }
}