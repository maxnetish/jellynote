/**
 * Init polyfills
 */
const PromisePolyfill = require('core-js/es6/promise');
const FetchPolyfill = require('whatwg-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import {JellynoteApp} from './react-app';

console.info(`Webapp loaded React Dom: ${ReactDOM.version}`);
console.log('Admin mode');

ReactDOM.render(
    document.getElementById('react-app')
);
