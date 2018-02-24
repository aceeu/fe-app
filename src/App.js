import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './store';
import { ListViewContainer } from './view/list';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ListViewContainer/>
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
