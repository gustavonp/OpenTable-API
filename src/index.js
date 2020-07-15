import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/App';
import './index.css';

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App/>
    </Router>
  </ReduxProvider>, document.getElementById('root')
);