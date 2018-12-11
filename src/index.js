import 'whatwg-fetch';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
