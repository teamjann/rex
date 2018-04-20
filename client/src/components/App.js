import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Home';
import EntryDetail from './Entry/EntryDetail';
import BrowseDetail from './Browse/BrowseDetail';
import { Button, Container } from 'semantic-ui-react';
import { Dropdown, Menu } from 'semantic-ui-react';
import EntryListView from './EntryListView';
import BrowseView from './BrowseView';
import Auth from './Auth';

const NewRecommendationButton = () => <Button>Enter New Recommendation </Button>;

class App extends Component {
  state = {
    isAuthenticated: false,
    userId: ''
  }

  handleAuth({isAuthenticated, userId}) {
    this.setState({isAuthenticated, userId});
    console.log({isAuthenticated, userId});
  }

  render() {
    if (this.state.isAuthenticated) {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/browsedetail" component={BrowseDetail} />
            <Route exact path="/entrydetail" component={EntryDetail} />
            <Route exact path="/entry" component={EntryListView} />
            <Route exact path="/browse" component={BrowseView} />
          </Switch>
        </div>
      );
    } else {
      return <Auth handleAuth={this.handleAuth.bind(this)}/>;
    }
  }
}

export default App;
