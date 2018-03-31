import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { store,  actions_constants } from './store';
import PropTypes from 'prop-types';
import { TopContainer } from './view/top-container';
import { get } from './communicate';

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
    const fetchdata = async () => {
      let data = await get('/data');
      store.dispatch({
        type: actions_constants.FETCH_RECORDS,
        data
      });
    }
    fetchdata();
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
