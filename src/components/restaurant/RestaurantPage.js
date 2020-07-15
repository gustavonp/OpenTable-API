import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as restaurantActions from '../../redux/actions/restaurantActions';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

export function RestaurantPage({restaurant, restaurantId, ...props}){
  const [errors, setErrors] = useState({});

  useEffect(() => {
      if(restaurant.id === undefined){
        props.actions.loadRestaurant(restaurantId)
          .catch(error =>{
            setErrors({onSave: error.message});
          })
      }
    }, [restaurant])

    function priceToSymbol(price){
      let priceSign = ''
      do{
        priceSign += '$';
      }while(priceSign.length != price);
      return priceSign;
    }

  return(
    <div>
      {restaurant.id !== undefined ? (
        <>
        <header>
          <h1>{restaurant.name}</h1>
        </header>

        <br/>

        <div className='searchBody'>

          <p><b>{restaurant.name}</b></p>
          <p>Adress: {restaurant.address} - {restaurant.city} - {restaurant.state} - {restaurant.country}</p>
          <p>Phone: {restaurant.phone}</p>
          <p>Price level: <b className='price'>{priceToSymbol(restaurant.price)}</b></p>

          <BrowserView>
            <a target='_blank' className='aButton' href={restaurant.reserve_url}>Make a reservation</a>
          </BrowserView>
          <MobileView>
            <a target='_blank' className='aButton' href={restaurant.mobile_reserve_url}>Make a reservation</a>
          </MobileView>

          <p><a href={`http://google.com/maps/search/${restaurant.lat}++${restaurant.lng}`} target='_blank'>Location</a></p>
        </div>
        </>
      ): (
        <p>empty :c</p>
      )}
    </div>
  );
}


function mapStateToProps(state, ownProps){

  const restaurantId = ownProps.match.params.id;

  return{
    restaurantId: restaurantId,
    restaurant: state.restaurant,
    apiCallsInProgress: state.apiCallsInProgress
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      loadRestaurant: bindActionCreators(restaurantActions.loadRestaurant, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);