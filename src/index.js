import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import './style/styles.scss';
import App from './App';
import MobileDetect from "./hoc/MobileDetect/MobileDetect";
import * as serviceWorker from './serviceWorker';
import JavascriptTimeAgo from 'javascript-time-ago';

// The desired locales.
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

// Initialize the desired locales.
JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(ru);

const app = (
  <Provider store={store}>
    <Router>
      <MobileDetect>
        <App/>
      </MobileDetect>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
