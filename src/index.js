import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'index.scss';
import Application from 'components/Application';

if (process.env.REACT_APP_API_BASE_URL) {
  // Configure axios to use the React app's base URL for API requests
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(<Application />, document.getElementById('root'));
