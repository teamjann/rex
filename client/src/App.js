import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

// import components
import Home from './Home';
import BookInfoEntry from './Entry/BookInfoEntry';
import List from './Browse/List';

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
    clicked: 0,
  };
  render() {
    return (
      <div onClick={() => this.setState({ clicked: this.state.clicked + 1 })}>
        {this.state.clicked === 0 && <Home />}
        {this.state.clicked === 1 && <BookInfoEntry />}
        {this.state.clicked === 2 && <List />}
      </div>
    );
  }
}

export default App;
