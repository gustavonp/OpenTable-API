import React from 'react';
import PropTypes from 'prop-types';

function TextInput(props){
  let wrapperClass = 'form-group';
  if (props.error.length > 0){
    wrapperClass += ' has-error';
  }

  return(
    <div className={wrapperClass}>
      <input
        id={props.id}
        placeholder={`${props.label} Search`}
        type='text'
        onChange={props.onChange}
        name={props.name}
        className='form-control'
        value={props.value}
      />
      
      { props.errors && <div className='alert alert-danger'>{props.errors}</div> }
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  errors: PropTypes.string
};

TextInput.defaultProps = {
  error: ''
}

export default TextInput;