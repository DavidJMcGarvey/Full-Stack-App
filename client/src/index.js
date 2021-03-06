import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/global.css';

import App from './App';
import { Provider } from './Context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // Provider gives <App /> access to context
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
