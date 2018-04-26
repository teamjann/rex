// React
import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
// Modules
import { Dropdown, Menu, Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
// Components
import Home from './Home';
import EntryDetail from './Entry/EntryDetail';
import BrowseDetail from './Browse/BrowseDetail';
import EntryListView from './EntryListView';
import BrowseView from './BrowseView';
import Landing from './Landing';
import Auth from './Authentication/Auth';

class App extends Component {
  state = {
    isAuthenticated: true,
<<<<<<< HEAD
    username: '',
=======
    firstName: 'Nick',
>>>>>>> 794aa70f9a910c07323e80d30fe1ee96d2d5793e
  };

  handleAuth({ isAuthenticated, firstName }) {
    this.setState({ isAuthenticated, firstName });
  }

  // On Mount, gets authentication from server, sets state of isAuthenticated
<<<<<<< HEAD
  // componentDidMount() {
  //   const self = this;
  //   axios
  //     .get('/auth')
  //     .then(res => {
  //       self.handleAuth(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
=======
  componentDidMount() {
    // const self = this;
    // axios
    //   .get('/auth')
    //   .then(res => {
    //     self.handleAuth(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
>>>>>>> 794aa70f9a910c07323e80d30fe1ee96d2d5793e

  render() {
    const { firstName, isAuthenticated } = this.state;

    // If state authenticated, loads homepage, otherwise login / signup
    if (isAuthenticated) {
      return (
        <div>
          <Route exact path="/" render={() => <Home firstName={firstName} />} />
          <Route path="/browse/:bookId" component={BrowseDetail} />
          <Route path="/entry/:bookId" component={EntryDetail} />
          <Route exact path="/entry" component={EntryListView} />
          <Route exact path="/browse" component={BrowseView} />
        </div>
      );
    } else {
      return <Auth handleAuth={this.handleAuth.bind(this)} />;
    }
  }
}

export default App;
