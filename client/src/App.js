import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Newrec from './Newrec.js';
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
        <Newrec />
      </div>
    );
  }
}

export default App;
