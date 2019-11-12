import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import examples from './examples';

if (process.env.NODE_ENV == 'production') {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
} else {
    examples();
}
