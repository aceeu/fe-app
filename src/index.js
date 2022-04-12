import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Example, startExample } from './examples';

if (process.env.NODE_ENV === 'production') {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
} else {
    startExample()
    ReactDOM.render(<Example />, document.getElementById('root'))

    setTimeout(() => {
        const element = document.querySelector('body>iframe')
        element.parentElement.removeChild(element)
    }, 1000)
}
