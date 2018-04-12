import React, { Component } from 'react';
import { Route, Link, Router, Switch } from 'react-router-dom';
import Home from './Home';
import BookInfoEntry from './Entry/BookInfoEntry';
import BrowseDetail from './Browse/BrowseDetail';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
