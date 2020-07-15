import * as types from './actionTypes';
import * as cityApi from '../../api/cityApi';
import { beginApiCall, apiCallError } from './apiStatusActions';
// import your api call

export function loadCitySuccess(city){
  return { type: types.LOAD_CITY_SUCCESS, city}
}

//thunks
export function loadCity(city){  

  return function (dispatch){
    dispatch(beginApiCall());
    return cityApi
      .getRestaurants(city)
      .then(restaurantList =>{

        dispatch(loadCitySuccess(restaurantList));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      })
  }
}