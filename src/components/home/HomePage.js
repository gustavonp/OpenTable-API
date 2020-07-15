import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as cityActions from '../../redux/actions/cityActions';
import SearchForm from '../SearchForm';
import { bindActionCreators } from 'redux';
import RestaurantList from './RestaurantList';

export function HomePage({ restaurantsList, apiCallsInProgress, ...props}){
  const [city, setCity] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(restaurantsList.length !== 0){

    }
  }, [restaurantsList])

  function handleChange({ target }) {
    if(target.name === 'city'){
      setCity({...city, [target.name] : target.value, page: 1, showing: 25});
    }
  }
  
  function handleSearch(event){
    event.preventDefault();
    props.actions.loadCity(city)
    .catch(error =>{
      setErrors({onSave: error.message});
    })
  }

  function goToPage(pageValues){
    setCity({...city, page: pageValues.page, showing: pageValues.perPage});
    let newCity = {...city, page: pageValues.page, showing: pageValues.perPage}

    props.actions.loadCity(newCity)
    .catch(error =>{
      setErrors({onSave: error.message});
    })
  }

  return(
    <div>
      <header>
        <h1>OpenTable Reservations</h1>
      </header>
      <section className='search'>
        <SearchForm
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSearch}
          isValidName={city}
        />
      </section>
        {restaurantsList.length !== 0 ? (
        <section className='searchBody'>
          <RestaurantList 
            restaurants={restaurantsList.restaurants} 
            pagination={{
              page: restaurantsList.current_page,
              perPage: restaurantsList.per_page,
              total: restaurantsList.total_entries,
            }}
            isLoading={apiCallsInProgress}
            goToPage={goToPage}
          />
          </section>
          ) : (
            <center>
              <div className='openTable' />
            </center>
        )}
    </div>
  );
}



function mapStateToProps(state){
  return{
    restaurantsList: state.restaurantsList,
    apiCallsInProgress: state.apiCallsInProgress
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      loadCity: bindActionCreators(cityActions.loadCity, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);