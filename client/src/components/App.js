import React, { Component } from 'react';
import './App.css';
import { Button, Icon, Label } from 'semantic-ui-react';

class App extends Component {
  componentDidMount() {
    fetch('/hello')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log('server not working', err));
  }

  render() {
    return (
      <div>
        <h1>Rex</h1>
      </div>
    );
  }
}

export default App;
