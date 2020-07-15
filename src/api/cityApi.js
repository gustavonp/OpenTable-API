import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'http://opentable.herokuapp.com/api/restaurants?city=';
const baseRestaurantUrl = 'http://opentable.herokuapp.com/api/restaurants/';

export function getRestaurants(city){
  const stringUrlQuery = `&per_page=${city.showing}&page=${city.page}`;
  const cityQuery = city.city;
  return fetch(baseUrl + cityQuery + stringUrlQuery)
    .then(handleResponse)
    .catch(handleError);
}

export function getRestaurant(restaurant){
  const desiredId = restaurant;
  return fetch(baseRestaurantUrl + desiredId)
    .then(handleResponse)
    .catch(handleError);
}