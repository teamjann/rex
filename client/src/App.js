import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewRec from './Home/NewRec.js';
import FindRec from './Home/FindRec.js';
// import components

class App extends Component {
  componentDidMount() {
    fetch('/hello')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log('server not working', err));
  }

  render() {
    return (
      <div className="main">
        <NewRec />
        <FindRec />
      </div>

    );
  }
}

export default App;
