import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from './home/HomePage';
import RestaurantPage from './restaurant/RestaurantPage';   //eslint-disable-line import/no-named-as-default
import PageNotFound from './PageNotFound';

function App(){
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/restaurant/:id" component={RestaurantPage} />
      <Route component={PageNotFound}/>
    </Switch>
  )
}

export default App