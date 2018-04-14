import React, { Component } from 'react';
// import { Button, Icon, Label } from 'semantic-ui-react';
import './App.css';
// import components
import BrowseView from './BrowseView';

class App extends Component {
  state = {
    showBooks: true,
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ showBooks: !this.state.showBooks });
          }}
        >
          Show books component
        </button>

        {this.state.showBooks && <BrowseView category="books" />}
      </div>
    );
  }
}

export default App;
