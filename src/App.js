import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './store';
import PropTypes from 'prop-types';
import { TopContainer } from './view/top-container';

export const loggedUser = 'loggedUser'; // потом надо заменить на пользователя который был залогинен

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to family expenses</h1>
        </header>
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
