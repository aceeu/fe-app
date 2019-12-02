import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './store';
import PropTypes from 'prop-types';
import { TopContainer } from './view/top-container';

class App extends Component {
  render() {
    return (
      <div className="App">
         <TopContainer/>
      </div>
    );
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe (
      () => this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getChildContext() {
    return  {
      store
    }
  }
}

App.childContextTypes = {
  store: PropTypes.object.isRequired
}

export default App;
