import React from 'react';
import PropTypes from 'prop-types';
import './restaurantList.css';
import { Link, useHistory } from 'react-router-dom';


const PageListing = ({total, paginationValues, onClick}) => {
  let pages = [];
  for(let i = 1; i <= total; i++){
    pages.push(i);
  }

  return(
    <div className='pagination'>
      <center style={{margin:'inherit'}}>
      <ul>
        {paginationValues.page > 1 ? (
        <li onClick={() => onClick({ ...paginationValues, page : paginationValues.page - 1 }  )} >Previous</li>
        ) : <li className='unabled'>Previous</li>
        }

        {pages.map(page => {
          return (
            <li key={page} onClick={() => onClick({ ...paginationValues, page : page })} >
              {page == paginationValues.page ?(
                <b>{page}</b>
              ):(
                <>{page}</>
              )}
            </li>
          );
              
        })}

        {paginationValues.page < total ? (
        <li onClick={() => onClick({ ...paginationValues, page : paginationValues.page + 1 }  )} >Next</li>
        ) : <li className='unabled'>Next</li>}
      </ul>
      </center>
    </div>
  );
}

const SelectPerPage = ({perPage, paginationValues, onChange}) => {

  function handleChange(event) {
    onChange({ ...paginationValues, perPage : event.target.value });    
  }

  let optionArray = [5, 25, 50, 100];
  return (
    <div className='displayTotal'>
      <label>Showing: </label>
      <select defaultValue={perPage} onChange={handleChange} className='perPage'>
        {optionArray.map(opt => {
          return <option 
                  key={opt} 
                  value={opt}
                  >{opt}</option>
        })}
      </select>
    </div>
  )
}

const RestaurantList = (props) => {
  const totalOfPages = Math.floor(props.pagination.total/props.pagination.perPage);
  let firstsResultNumber = ((props.pagination.perPage) * (props.pagination.page - 1) + 1);
  let lastResultNumber = props.pagination.perPage * props.pagination.page;  

  function priceToSymbol(price){
    let priceSign = ''
    do{
      priceSign += '$';
    }while(priceSign.length != price);
    return priceSign;
  }

  const history = useHistory();

  const handleClick = (id) =>{
    let path = `/restaurant/${id}`;
    history.push(path);
  }

  return (
  <>
    <div className='total'>
      {firstsResultNumber} - {lastResultNumber} of {props.pagination.total} restaurants found.
    </div>

    <SelectPerPage perPage={props.pagination.perPage} paginationValues={props.pagination} onChange={props.goToPage} />

    <PageListing total={totalOfPages} paginationValues={props.pagination} onClick={props.goToPage} /><br/>


    {props.isLoading === 0 ? (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {props.restaurants.map((restaurant) => {
          return(
            <tr key={restaurant.id} onClick={() => handleClick(restaurant.id)} className='cursor'>
              <td>
                {restaurant.name}
              </td>
              <td>
                {restaurant.address}
              </td>
              <td className='price'>
                {priceToSymbol(restaurant.price)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    ) : ( <p>Loading</p> )}
  </>
  );
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  perPage: PropTypes.number,
  goToPage: PropTypes.func.isRequired
}

export default RestaurantList;