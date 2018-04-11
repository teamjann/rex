import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
// import components

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
  componentDidMount() {
    fetch('/hello')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log('server not working', err));
  }

  render() {
    return (
      <div>
        <Button as="div" labelPosition="right">
          <Button icon>
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic pointing="left">
            2,048
          </Label>
        </Button>
      </div>
    );
  }
}

export default App;