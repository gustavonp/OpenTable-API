import React from 'react';
import TextInput from './common/TextInput';
import PropTypes from 'prop-types';

function SearchForm(props){  

  let isDisabled = props.isValidName.city === undefined || props.isValidName.city.length === 0 ? true : false;

  return (
    <center>
      <form onSubmit={props.onSubmit}>
        <TextInput
          id='city'
          label='City'
          onChange={props.onChange}
          name='city'
          value={props.city}
          errors={props.errors.city}
        />
    
        <input type='submit' value='Search' disabled={isDisabled} />
      </form>
    </center>
  )
}

SearchForm.propTypes = {
  isValidName: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  city: PropTypes.object,
  misc: PropTypes.object,
  errors: PropTypes.object
}

export default SearchForm;