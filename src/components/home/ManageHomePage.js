import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as cityActions from '../../redux/actions/cityActions';
import newSearch from '../common/mockData';
// import PropTypes from 'prop-types';
import RestaurantList from './RestaurantList';
import SearchForm from '../SearchForm';

export function ManageHomePage({
  restaurantsList,
  totalEntries,
  perPage,
  currentPage,
  loadCity,
  ...props }) {
    const [city, setCity] = useState(props.searchedCity);
    const [errors, setErrors] = useState({});
    const [pagination, setPagination] = useState({});  

    // console.log(props);
    
    
    useEffect(() =>{
      if(totalEntries === 0){
        loadCity({ city: props.searchedCity, page: 1, showing: 25})
        .catch(error =>{
          alert('loading restaurants failed: ' + error);
        });
      }else{
        setPagination({
          page: currentPage,
          perPage: perPage,
          total: totalEntries
        });
      }
    }, [totalEntries])

    function handleChange({ target }) {
      setCity({...city, [target.name] : target.value});
    }

    function handleSearch(event){
      event.preventDefault();
      loadCity(city)
      .catch(error =>{
        setErrors({onSave: error.message});
      })
    }

    return(
      <div>
        <h1>Restaurant search</h1>
        <SearchForm
          city={props.searchedCity}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSearch}
        />
        {totalEntries !== 0 ? (
          <RestaurantList restaurants={restaurantsList} pagination={pagination} />
        ) : (
          <p>Search for a city</p>
        ) }
  
      </div>
    );
}

function mapStateToProps(state, ownProps){
  const city = ownProps.match.params.city;

  console.log(ownProps.match);
  

  const restaurants = state.restaurants.length == 0 ? newSearch() : state.restaurants;
  
  return{
    searchedCity: city,
    restaurantsList: restaurants.restaurants,
    totalEntries: restaurants.total_entries,
    perPage: restaurants.per_page,
    currentPage: restaurants.current_page
  }
}

const mapDispatchToProps = {
  loadCity: cityActions.loadCity,
  // jumpToPage: cityActions.jumpToPage,
  // entriesPerPage: cityActions.entriesPerPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHomePage);