import React, { Component } from 'react';
import './App.css';
import { Button, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
// import components
import BrowseView from './BrowseView';

// // Styled component example
// const HomeSection = styled.section`
//   padding: 10px;
//   margin: 20px 50px;
//   width: 100%;
//   max-width: 800px;
//   height: 800px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: blue;
//   border: 1px solid black;
//   border-radius: 50px;
// `;

class App extends Component {
  state = {
    showBooks: false,
  };

  componentDidMount() {
    fetch('/hello')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log('server not working', err));
  }

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

        {this.state.showBooks && <BrowseView />}
      </div>
    );
  }
}

export default App;
