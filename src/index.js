import React from 'react';
import ReactDOM from 'react-dom';
import store from './core/store'
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from "./Components/App/App"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  </React.StrictMode>
)