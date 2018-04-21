import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import { Dropdown, Menu } from 'semantic-ui-react';
import axios from 'axios';

import Home from './Home';
import BrowseDetail from './Browse/BrowseDetail';
import EntryDetail from './Entry/EntryDetail';
import EntryListView from './EntryListView';
import BrowseView from './BrowseView';
import Auth from './Auth';

const NewRecommendationButton = () => <Button>Enter New Recommendation </Button>;

class App extends Component {
  state = {
    uuid: ''
  }

  handleAuth({ uuid }) {
    this.setState({ uuid });
  }

  componentDidMount() {
    const self = this;
    axios
      .get('/auth')
      .then((res) => {
        self.handleAuth(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.uuid) {
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
